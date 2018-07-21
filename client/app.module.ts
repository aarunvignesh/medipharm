import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { RouterModule, Routes } from '@angular/router';

import { coreComponent } from "./core/component/core.component";
import { headerComponent } from "./header/component/header.component";
import { editorComponent } from "./editor/component/editor.component";
import { loginComponent } from "./login/component/login.component";


/** Routes */
const appRoutes: Routes = [
    {
        path: '',
        component: editorComponent
    }, {
        path: 'editor',
        component: editorComponent,
        canActivate: []
    }
];
 
@NgModule({
    imports:[
        BrowserModule,
        RouterModule.forRoot(appRoutes, { useHash: false }),
        FroalaEditorModule.forRoot(), 
        FroalaViewModule.forRoot()
    ],
    declarations: [
        coreComponent,
        headerComponent,
        loginComponent,
        editorComponent
    ],
    bootstrap: [
        coreComponent
    ]
})
export class AppModule{}