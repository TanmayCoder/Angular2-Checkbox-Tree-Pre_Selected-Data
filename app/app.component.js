"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
///<reference path="./../typings/globals/core-js/index.d.ts"/>
var core_1 = require("@angular/core");
var nodeService_1 = require("./nodeService");
var AppComponent = (function () {
    function AppComponent(nodeService) {
        var _this = this;
        this.nodeService = nodeService;
        this.data = [];
        this.hash = {};
        this.selectedNodeNames = [];
        this.selectedNodes = [1, 5, 6, 82, 83, 129];
        this.isMenuDataSubscribed = false;
        this.isSelectedMenuDataSubscribed = false;
        this.nodeService.getMenus().then(function (files) {
            _this.data = files;
            _this.isMenuDataSubscribed = true;
            _this.hash = _this.buildDataHierarchy(_this.data);
            _this.setupSelectedNodes(_this.data);
        });
    }
    AppComponent.prototype.buildDataHierarchy = function (data) {
        var id = 1;
        var hash = {};
        var setNodeID = function (node, parentId) {
            hash[id] = node;
            node['selected'] = false;
            node['nodeId'] = id;
            node['parentNodeId'] = parentId;
            node['children'] = node.Menus ? node.Menus : [];
            if (node.children != null && node.children.length) {
                var parentId_1 = id;
                node.children.forEach(function (node) {
                    id++;
                    setNodeID(node, parentId_1);
                });
            }
            else {
                node.children = [];
            }
            id++;
        };
        data.forEach(function (node) {
            setNodeID(node, 0);
        });
        return hash;
    };
    AppComponent.prototype.setupSelectedNodes = function (data) {
        var __this = this;
        data.forEach(function (node) {
            //place the logic of selection here
            var index = __this.findIndexInSelection(node);
            if (index >= 0) {
                __this.setNodeSelected(node);
            }
        });
    };
    AppComponent.prototype.findIndexInSelection = function (node) {
        var index = -1;
        if (this.selectedNodes) {
            for (var i = 0; i < this.selectedNodes.length; i++) {
                if (this.selectedNodes[i] == node.MenuId) {
                    index = i;
                    break;
                }
            }
        }
        return index;
    };
    ;
    AppComponent.prototype.setNodeSelected = function (node) {
        var _this = this;
        var setChildNodes = function (node, select) {
            var index = _this.findIndexInSelection(node);
            var __this = _this;
            if (index >= 0 && node.children && node.children.length) {
                var selectedCount_1 = 0;
                node.children.forEach(function (child) {
                    var index = __this.findIndexInSelection(child);
                    if (index >= 0) {
                        child.selected = node.selected;
                        child.partialSelection = false;
                        selectedCount_1++;
                    }
                    setChildNodes(child, select);
                });
                if (selectedCount_1 == node.children.length) {
                    node.selected = true;
                    node.partialSelection = false;
                }
                else if (selectedCount_1 > 0 && selectedCount_1 != node.children.length) {
                    node.selected = false;
                    node.partialSelection = true;
                }
                else if (selectedCount_1 == 0) {
                    node.selected = false;
                    node.partialSelection = false;
                }
            }
            else if (index >= 0 && !(node.children && node.children.length)) {
                node.selected = true;
                node.partialSelection = false;
            }
        };
        setChildNodes(node, false);
        this.updateSelected();
    };
    AppComponent.prototype.onNodeExpanded = function (event) {
        alert(event.node.Title + "is expanded and node.expanded is " + event.node.expanded);
        this.collapseOtherNodes(event.node);
    };
    AppComponent.prototype.collapseOtherNodes = function (expandedNode) {
        var __this = this;
        this.data.forEach(function (node) {
            if (node.MenuId != expandedNode.MenuId) {
                node.expanded = false;
            }
            else {
                node.expanded = true;
            }
        });
    };
    AppComponent.prototype.nodeSelected = function (node) {
        var _this = this;
        debugger;
        var isSelected = function (node) {
            return (node.selected || node.partialSelection);
        };
        var updateChildNodes = function (node, select) {
            var index = _this.findIndexInSelection(node);
            if (select && index == -1) {
                _this.selectedNodes = _this.selectedNodes || [];
                _this.selectedNodes.push(node.MenuId);
            }
            else if (!select && index > -1) {
                if (!isSelected(node)) {
                    _this.selectedNodes.splice(index, 1);
                }
            }
            node.partialSelection = false;
            var __this = _this;
            if (node.children && node.children.length) {
                node.children.forEach(function (child) {
                    child.selected = node.selected;
                    if (node.selected) {
                        var nodeIndex = __this.findIndexInSelection(child);
                        if (nodeIndex == -1) {
                            __this.selectedNodes = __this.selectedNodes || [];
                            __this.selectedNodes.push(child.MenuId);
                        }
                    }
                    else {
                        var childIndex = __this.findIndexInSelection(child);
                        if (childIndex >= 0) {
                            __this.selectedNodes.splice(childIndex, 1);
                        }
                    }
                    if (child.children.length) {
                        updateChildNodes(child, select);
                    }
                });
            }
        };
        var updateParentNodes = function (node, select) {
            if (node.children && node.children.length) {
                var selectedCount_2 = 0;
                var childPartialSelected_1 = false;
                var __this_1 = _this;
                node.children.forEach(function (child) {
                    if (__this_1.findIndexInSelection(child) != -1) {
                        selectedCount_2++;
                    }
                    else if (child.partialSelection) {
                        childPartialSelected_1 = true;
                    }
                });
                if (select && selectedCount_2 == node.children.length) {
                    var index_1 = _this.findIndexInSelection(node);
                    if (index_1 == -1) {
                        _this.selectedNodes = _this.selectedNodes || [];
                        _this.selectedNodes.push(node.MenuId);
                    }
                    node.partialSelection = false;
                    node.selected = true;
                }
                else {
                    if (!select) {
                        var index_2 = _this.findIndexInSelection(node);
                        if (index_2 >= 0) {
                            _this.selectedNodes.splice(index_2, 1);
                        }
                    }
                    if (childPartialSelected_1 || selectedCount_2 > 0 && selectedCount_2 != node.children.length) {
                        node.partialSelection = true;
                        var index_3 = _this.findIndexInSelection(node);
                        if (index_3 == -1) {
                            _this.selectedNodes = _this.selectedNodes || [];
                            _this.selectedNodes.push(node.MenuId);
                        }
                    }
                    else {
                        node.partialSelection = false;
                    }
                    if (selectedCount_2 == 0) {
                        node.selected = false;
                    }
                }
            }
            var parent = node.parent;
            if (parent) {
                updateParentNodes(parent, select);
            }
        };
        var index = this.findIndexInSelection(node);
        var selected = (index >= 0);
        if (selected) {
            updateChildNodes(node, false);
            if (node.parent) {
                updateParentNodes(node.parent, false);
            }
        }
        else {
            updateChildNodes(node, true);
            if (node.parent) {
                updateParentNodes(node.parent, true);
            }
        }
        this.updateSelected();
    };
    AppComponent.prototype.updateSelected = function () {
        this.selectedNodeNames = [];
        for (var node in this.hash) {
            if (this.hash[node].selected || this.hash[node].partialSelection) {
                var currentNode = this.hash[node];
                var nodeLabel = currentNode['Title'];
                var nodeId = currentNode['MenuId'].toString();
                while (currentNode.parentNodeId !== 0) {
                    currentNode = this.hash[currentNode.parentNodeId];
                    nodeLabel = nodeLabel;
                }
                this.selectedNodeNames.push(nodeId + " - " + nodeLabel);
            }
        }
    };
    AppComponent.prototype.ngOnInit = function () {
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        templateUrl: 'app/app.component.html'
    }),
    __metadata("design:paramtypes", [nodeService_1.NodeService])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map