function BaseForm(m){
      this.numOfitems = m || 1;
      this.items = [];
      this.qty = ["Pc", "gms", "kg"];
      this.dataFormat = {"items":[], "name": ""};
      this.currentFormName = "checklist";
      this.currentFormUinqName = "";
      this.currentForm = "";
      this.appendCLItem = 0;
      this.allFormElements = [];
      this.allFormElementsNum = [];
      this.dataToBeSaved = {};
  }
  BaseForm.prototype = Display.prototype;
  
  BaseForm.prototype.formInputTypes = ["text", "number", "select"];
  BaseForm.prototype.previousFormName = false;
  BaseForm.prototype.dynamicTableName = false;
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
      BaseForm.prototype.removeItem = function(cls){
          var s = document.getElementsByClassName(cls)[0].style;
          s.opacity = 1;
        (function fade(){(s.opacity-=.2)<0?s.display="none":setTimeout(fade,40)})();
       /*   while (elements.length > 0) elements[0].remove();*/
      }
      BaseForm.prototype.getNumOfItems = function(){
          return this.numOfitems;
      }
  
      BaseForm.prototype.appendBaseForms = function(i, item){
          item = item || {};
          i = i || this.numOfitems;
          var div = document.createElement("tr");
              div["className"] = "form-group mybudget "+this.currentForm+""+i;
              div["innerHTML"] = this.htmlItems(i, item);
              document.getElementById("checklistList").appendChild(div);
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
  
   BaseForm.prototype.setformInputTypes = function(name){
       this.formInputTypes =  name;
  }
   BaseForm.prototype.getformInputTypes = function(){
       return this.formInputTypes;
  }
   BaseForm.prototype.getAllFormElements = function(){
       return this.allFormElements;
  }
   BaseForm.prototype.setAllFormElements = function(element){
       if(this.allFormElements.indexOf(element) === -1)
            this.allFormElements.push(element);
  }
    BaseForm.prototype.setAllFormElementsNum = function(element){
       if(this.allFormElementsNum.indexOf(element) === -1)
            this.allFormElementsNum.push(element);
  }
  BaseForm.prototype.setInputKeyValue = function(form){
      for(var i = 0; i < form.length; i++){
             if(this.getformInputTypes().indexOf(form[i].type)  > -1){
                this.setAllFormElements(form[i].name);
                console.log(form[i]);
                var temp = form[i].name.replaceAll("[a-z]", "");
                console.log(form[i].name);
                if(temp !== "")
                    this.setAllFormElementsNum(temp);
             }
      }
    return this.setAllFormElements;
  }
  
function deleteAll(){
    opdb.deleteAll(function(msg){
       disp.showMessage(msg) ;
    });
}