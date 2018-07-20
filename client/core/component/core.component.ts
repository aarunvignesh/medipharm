import { Component } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
    selector:"core-component",
    styleUrls:[],
    templateUrl: "./../template/core.html"
})
export class coreComponent{
    editorContent:any;
    printContent: any;

    public options: Object = {
        placeholder: "Edit Me",
        events : {
          'froalaEditor.image.beforeUpload' : function (e:any, editor:any, files:any) {
            if (files.length) {
              // Create a File Reader.
              var reader = new FileReader();
         
              // Set the reader to insert images when they are loaded.
              reader.onload = function (e:any) {
                var result = e.target.result;
                editor.image.insert(result, null, null, editor.image.get());
              };
              
              // Read image as base64.
              reader.readAsDataURL(files[0]);
            }
        
            editor.popups.hideAll();
        
            // Stop default upload chain.
            return false;
          }
        }
      }

    constructor(private dom:DomSanitizer){

    }

    print(){
        console.log(this.editorContent);
        this.printContent = this.dom.bypassSecurityTrustHtml(this.editorContent);
        console.log(this.printContent);
    }
    
}