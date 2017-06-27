function BaseForm(m){
      this.numOfitems = m || 1;
      this.items = [];
      this.qty = ["Pc", "gms", "kg"];
      this.dataFormat = {"items":[], "name": ""};
      this.currentFormName = "checklist";
      this.currentFormUinqName = "";
      this.appendCLItem = 0;
      this.formElements = ["itemDate", "formName", "itemName", "itemQty", "itemQtyType"];
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
