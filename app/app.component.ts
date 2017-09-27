///<reference path="./../typings/globals/core-js/index.d.ts"/>
import { Component, Input, OnInit, EventEmitter, OnDestroy ,DoCheck } from '@angular/core';
import{TreeNode} from 'primeng/primeng';
import{NodeService} from './nodeService';
@Component({
    selector: 'my-app',
    templateUrl: 'app/app.component.html'
})
export class AppComponent  implements OnInit{
  
    data: any[] = [];
    hash = {};
    selectedNodeNames: any=[];
    selectedNodes: any=[1,5,6,82,83,129];
    isMenuDataSubscribed:boolean=false;
    isSelectedMenuDataSubscribed:boolean=false;
    constructor(private nodeService:NodeService){
       this.nodeService.getMenus().then(files => {this.data = files; this.isMenuDataSubscribed=true;
        this.hash = this.buildDataHierarchy(this.data);
       this.setupSelectedNodes(this.data);
           });
    }
   
  buildDataHierarchy(data: any[]): any {

        let id = 1;
        let hash = {};
        let setNodeID = (node : any, parentId: number) => {
            hash[id] = node;
            node['selected'] = false;
            node['nodeId'] = id;
            node['parentNodeId'] = parentId;
            node['children']=node.Menus?node.Menus:[];
            if (node.children!=null&&node.children.length){
                const parentId = id;
                node.children.forEach(function(node: any){
                    id++;
                    setNodeID(node, parentId);
                });
            }
            else{node.children=[];}
            id++;
        }
        data.forEach(function(node: any){
            setNodeID(node, 0);
        });
        return hash;
    }
setupSelectedNodes(data: any[]){
    let __this=this;
     data.forEach(function(node: any){
           //place the logic of selection here
           let index=__this.findIndexInSelection(node);
           if(index>=0){
               __this.setNodeSelected(node);
           }
        });
    }   
 findIndexInSelection(node:any) {
              let index = -1;
             if (this.selectedNodes) {
                for (let i = 0; i < this.selectedNodes.length; i++) {
                    if (this.selectedNodes[i] == node.MenuId) {
                        index = i;
                        break;
                    }
                }
            }
        
             return index;
          };

    setNodeSelected(node: any) {//
     
          let setChildNodes=(node:any,select:boolean)=>{
                 let index = this.findIndexInSelection(node);
                   let __this=this;
                   if (index>=0 && node.children && node.children.length) {
                        let selectedCount = 0;
                        node.children.forEach(function (child: any) {
                             let index = __this.findIndexInSelection(child);
                            if(index>=0){
                                 child.selected = node.selected;
                                 child.partialSelection=false;
                                  selectedCount++;
                            }
                            setChildNodes(child,select);
                        });
                        if(selectedCount==node.children.length)
                        {
                            node.selected=true;
                            node.partialSelection=false;
                        }
                        else if(selectedCount>0 && selectedCount!=node.children.length)
                        {
                             node.selected=false;
                            node.partialSelection=true;
                        }
                        else if(selectedCount==0)
                        {
                            node.selected=false;
                            node.partialSelection=false;
                        }
                        

                   }
                   else if(index>=0 && !(node.children && node.children.length))
                    {
                        node.selected=true;
                        node.partialSelection = false;
                    }
        
                   
          }
 
          
                    setChildNodes(node, false);
                  
                this.updateSelected();                 
            }
  
   
onNodeExpanded(event:any)
{
    alert (event.node.Title+"is expanded and node.expanded is "+event.node.expanded);

    this.collapseOtherNodes(event.node);
}
    collapseOtherNodes(expandedNode:any){
        let __this=this;
        this.data.forEach(function (node:any){
            if(node.MenuId!=expandedNode.MenuId)
            {
                node.expanded=false;
            }
            else{
                node.expanded=true;
            }
        });
    }
    nodeSelected(node: any) {debugger;
     let isSelected=(node:any)=>{
         return (node.selected || node.partialSelection);
     }
          let updateChildNodes=(node:any,select:boolean)=>{
                 var index = this.findIndexInSelection(node);
                    if (select && index == -1) {
                        this.selectedNodes = this.selectedNodes || [];
                        this.selectedNodes.push(node.MenuId);
                    }
                    else if (!select && index > -1) {
                        if(!isSelected(node))
                        {
                        this.selectedNodes.splice(index, 1);
                        }
                    }
                    node.partialSelection = false;
                   let __this=this;
                   if (node.children && node.children.length) {
                    node.children.forEach(function (child: any) {
                     child.selected = node.selected;
                         if(node.selected){ 
                             let nodeIndex=__this.findIndexInSelection(child);
                             if(nodeIndex==-1){
                            __this.selectedNodes = __this.selectedNodes || [];
                            __this.selectedNodes.push(child.MenuId);
                             }
                         }
                         else{
                            let childIndex=__this.findIndexInSelection(child);
                            if(childIndex>=0){
                            __this.selectedNodes.splice(childIndex, 1);
                        }
                    }
                    
                     if (child.children.length) {
                         updateChildNodes(child,select);
                        }
                    });
                   }
                   
          }
          let updateParentNodes=(node:any,select:boolean)=>{//
                 if (node.children && node.children.length) {
                    let selectedCount = 0;
                    let childPartialSelected = false;
                    let __this=this;
                    node.children.forEach(function (child: any) {
                       if (__this.findIndexInSelection(child) != -1) {
                            selectedCount++;
                        }
                        else if (child.partialSelection) {
                            childPartialSelected = true;
                        }
                    });
                   
                    if (select && selectedCount == node.children.length) {
                        let index = this.findIndexInSelection(node);
                            if (index == -1) {
                                this.selectedNodes = this.selectedNodes || [];
                                this.selectedNodes.push(node.MenuId);
                            }
                       
                        node.partialSelection = false;
                        node.selected=true;
                    }
                    else {
                        if (!select) {
                            let index = this.findIndexInSelection(node);
                            if (index >= 0) {
                                this.selectedNodes.splice(index, 1);
                            }
                        }
                        if (childPartialSelected || selectedCount > 0 && selectedCount != node.children.length)
                          {
                            node.partialSelection = true;
                            let index = this.findIndexInSelection(node);
                            if(index==-1)
                            {
                             this.selectedNodes = this.selectedNodes || [];
                            this.selectedNodes.push(node.MenuId);
                            }  
                         }
                        else{
                            node.partialSelection = false;
                        }
                        if(selectedCount==0)
                        {
                            node.selected=false;
                        }
                    }
                }
                var parent = node.parent;
                if (parent) {
                    updateParentNodes(parent, select);
                }
          }
          
        
            let index = this.findIndexInSelection(node);
            let selected = (index >= 0);
           
            
             if (selected) {
                    updateChildNodes(node, false);
                    if (node.parent) {
                        updateParentNodes(node.parent, false);
                    }
                }
                else 
                {
                    updateChildNodes(node, true);
                    if (node.parent) {
                        updateParentNodes(node.parent, true);
                    }
                }
                this.updateSelected();                 
            }
  
   

    updateSelected(){//
        this.selectedNodeNames = [];
        for (let node in this.hash) {
            if (this.hash[node].selected||this.hash[node].partialSelection) {
                let currentNode = this.hash[node];
                let nodeLabel = currentNode['Title'];
                let nodeId = currentNode['MenuId'].toString();
                
                while (currentNode.parentNodeId !==0){
                    currentNode = this.hash[currentNode.parentNodeId];
                    nodeLabel =  nodeLabel;
                }
                this.selectedNodeNames.push(nodeId +" - "+nodeLabel);
            }
        }
    }

    ngOnInit() {
       
    }

   
}