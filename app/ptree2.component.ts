///<reference path="./../typings/globals/core-js/index.d.ts"/>
import { Component, Input, OnInit, EventEmitter, OnDestroy  } from '@angular/core';
import{TreeNode} from 'primeng/primeng';
import{NodeService} from './nodeService';
@Component({
    selector: 'my-ptree2',
    templateUrl: 'app/ptree2.component.html'
})
export class Ptree2Component  implements OnInit{
   
    filesTree4: TreeNode[] ;
    selectedNodes: TreeNode[] ;

    constructor(private nodeService:NodeService){
  
  this.nodeService.getFiles().then(files => this.filesTree4 = files);
  this.nodeService.getSelectedNodes().then(files => this.selectedNodes = files);
        
    }

    ngOnInit() {
       
    }

    
}