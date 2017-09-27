///<reference path="./../typings/globals/core-js/index.d.ts"/>
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';
import { Http, HttpModule, JsonpModule, RequestOptions, XHRBackend } from '@angular/http';
import { APP_BASE_HREF } from '@angular/common';
import{AppComponent} from './app.component';
import { TreeModule, SharedModule } from 'primeng/primeng';
import {Ptree2Component} from './ptree2.component';
import {NodeService} from './nodeService';

@NgModule({
    imports: [BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        JsonpModule,
		TreeModule,
        SharedModule
	],
     providers: [
         NodeService
     ],
    declarations: [
	    AppComponent,
        Ptree2Component
	],
    bootstrap: [
    AppComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class BootModule { }
