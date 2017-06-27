function BaseForm(m){
      this.numOfitems = m || 1;
      this.items = [];
      this.qty = ["Pc", "gms", "kg"];
      this.dataFormat = {"items":[], "name": ""};
      this.currentFormName = "checklist";
      this.currentFormUinqName = "";
      this.currentForm = "";
      this.appendCLItem = 0;
      this.formInputTypes = ["text", "number", "select"];
      this.dataToBeSaved = {};
  }
  BaseForm.prototype = Display.prototype;
     BaseForm.prototype.setAppendCLItem = function(){
          this.appendCLItem++;
          return this;
      }
      BaseForm.prototype.getAppendCLItem = function(){
          return this.appendCLItem;
      }
      BaseForm.prototype.setNumOfItems = function(num){
          this.numOfitems++;
          return this;
      }
      BaseForm.prototype.removeItem = function(num){
          this.numOfitems--;
          this.appendCLItem--;
          return this;
      }
      BaseForm.prototype.getNumOfItems = function(){
          return this.numOfitems;
      }
  
      BaseForm.prototype.appendBaseForms = function(items){
          items = items || [];
          document.getElementById("checklistArea").setAttribute("style", "display: block;");
         // var classSize = disp.getElementSizeByClassName("checkbox");
          for(var n = this.appendCLItem; n < this.numOfitems; n++){
          var div = document.createElement("div");
              div["className"] = "form-group col-sm-12 checklist";
              div["innerHTML"] = this.htmlItems(n, items[n]);
              document.getElementById("checklistList").appendChild(div);
          //disp.setHTMLUpdateById("checklistList", "appendChild", div);
          //    +'<div class="col-sm-1"><input type="checkbox" name="isSelected'+i+'" id="isSelected'+i+'" class="form-control"/></div>'
          }
          return this;
      
      }
  BaseForm.prototype.getCurrentFormUinqName = function(){
      return this.currentFormUinqName;
  }
  BaseForm.prototype.getFormElements = function(){
      return this.formElements;
  }
  BaseForm.prototype.setCurrentFormUinqName = function(name){
      this.currentFormUinqName = name;
  }
  BaseForm.prototype.setCurrentForm = function(name){
       this.currentForm =  name;
  }
   BaseForm.prototype.getCurrentForm = function(name){
       return this.currentForm;
  }
  BaseForm.prototype.getInputKeyValue = function(form, types){
      var eleArr = []; 
      console.log(form.length)
   for(var i = 0; i < form.length; i++){
       var ele = {};
             if(types.indexOf(form[i].type)  > -1){
             ele.name = form[i].name;
             ele.value = form[i].value;
             eleArr.push(ele);
         }
     }
     return eleArr;
  }
