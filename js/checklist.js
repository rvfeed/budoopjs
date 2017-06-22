function ChecklistItem(m){
      this.numOfitems = m || 0;
      var htmlChecklist = function(i){
          return '<div class="col-sm-5"><input type="text" name="itemName'+i+'" value="test" id="itemName'+i+'" class="form-control" required/></div>'+
                          '<div class="col-sm-1"><input type="text" name="itemQty'+i+'" value="2" id="itemQty'+i+'" class="form-control"/></div>'+
                          '<div class="col-sm-1"><select class="form-control" name="itemQtyType'+i+'" id="itemQtyType'+i+'"><option>Pc</option><option>gms</option><option>kg</option></select></div>'+
                         '<div class="col-sm-5" style="padding: 15px"><span class="glyphicon glyphicon-trash" onclick="removeChildItem('+i+')"></span></div>';
      };
      this.formName = "checklist";
      this.appendCLItem = 0;
      this.formElements = ["itemDate", "formName", "itemName", "itemQty", "itemQtyType"]
      this.setHtmlChecklist = function(i){
          htmlChecklist(i);
          return this;
      }
      this.getHtmlChecklist = function(){
          return htmlChecklist;
      }
       this.setAppendCLItem = function(){
          this.appendCLItem++;
          this.numOfitems++
          return this;
      }
      this.getAppendCLItem = function(){
          return this.appendCLItem;
      }
      this.setNumOfItems = function(num){
          this.numOfitems = num;
          return this;
      }
      this.getNumOfItems = function(){
          return this.numOfitems;
      }
      this.appendChecklistItems = function(){
          document.getElementById("checklistArea").setAttribute("style", "display: block;");
          var classSize = disp.getElementSizeByClassName("checkbox");
          for(var n =0+this.appendCLItem; n < this.numOfitems; n++){
          var div = document.createElement("div");
              div["className"] = "form-group col-sm-12 checklist";
              div["innerHTML"] = htmlChecklist(n);
              document.getElementById("checklistList").appendChild(div);
          //disp.setHTMLUpdateById("checklistList", "appendChild", div);
          //    +'<div class="col-sm-1"><input type="checkbox" name="isSelected'+i+'" id="isSelected'+i+'" class="form-control"/></div>'
          }
      
      }
      this.save = function(){
          
      }
  }
  ChecklistItem.prototype = Validation.prototype;
   var clist = new ChecklistItem(1);
   clist.appendChecklistItems();
   
  function appendChecklistItem(){
        var n = disp.getHTMLValueById('noOfItems');
        disp.emptyDivById("checklistList");
        clist.setNumOfItems(n);
        clist.appendChecklistItems();
  }
  
  function addCheckItem(){
      clist.setAppendCLItem();
       clist.appendChecklistItems();
  }
  
  function removeChildItem(num){
      disp.removedChild("checklistList", num);
  }
  
  String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};
  function saveCheckList(){
       var arr = ["itemDate", "itemName", "itemQty", "itemQtyType"];
    disp.setResultBody(arr);
    var date = disp.getHTMLValueById('itemDate').replaceAll("/", "");
    clist.setCurrentFormKeyId("checklist"+date.replaceAll("'", ""));
    clist.formName = disp.getHTMLValueById("checkListName");
        clist.formDataMulti(document.checklist);
        opdb.dbOperation(disp.action, clist.dataToBeSaved, function(msg){
                 disp.showMessage(msg, "infoMsg");
        }); 
  }
 