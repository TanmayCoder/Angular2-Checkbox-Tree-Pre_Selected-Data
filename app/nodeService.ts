import{Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {TreeNode} from 'primeng/primeng';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class NodeService {
    
    constructor(private http: Http) {}

    getFiles() {
        return this.http.get('./files/files.json')
                    .toPromise()
                    .then(res => <TreeNode[]> res.json().data);
    }
    getSelectedNodes(){
        return this.http.get('./files/selectedFiles.json')
                    .toPromise()
                    .then(res => <TreeNode[]> res.json().data);
    }

    getSelectedMenus(){
        return this.http.get('./files/SelectedMenus.json')
                    .toPromise()
                    .then(res => <number[]> res.json());
    }

     getMenus() {
        return this.http.get('./files/menus.json')
                    .toPromise()
                    .then(res => <TreeNode[]> res.json());
    }
}