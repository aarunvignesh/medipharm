import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

import { coreComponent } from "./core/component/core.component";
 
@NgModule({
    imports:[
        BrowserModule,
        FroalaEditorModule.forRoot(), 
        FroalaViewModule.forRoot()
    ],
    declarations: [
        coreComponent
    ],
    bootstrap: [
        coreComponent
    ]
})
export class AppModule{}