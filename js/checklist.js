
function ChecklistItem(m){
      this.numOfitems = m || 1;
      this.items = [];
      this.qty = ["Pc", "gms", "kg"];
      this.dataFormat = {"items":[], "name": ""};
      this.currentFormName = "checklist";
      this.currentForm = "checklist";
      this.currentFormUinqName = "checklist";
      this.appendCLItem = 0;
      this.formElements = ["itemDate", "formName", "itemName", "itemQty", "itemQtyType"];
      this.dataToBeSaved = {};
  }
  ChecklistItem.prototype = BaseForm.prototype;

  ChecklistItem.prototype.htmlItems = function(i, v){
      v = v || {itemName: "", itemQty: "", itemName: ""};
          var itemHtml = '<div class="col-sm-5"><input type="text" name="itemName'+i+'" value="'+v.itemName+'" id="itemName'+i+'" class="form-control" required/></div>'+
                          '<div class="col-sm-1"><input type="number" name="itemQty'+i+'" value="'+v.itemQty+'" id="itemQty'+i+'" class="form-control"/></div>'+
                          '<div class="col-sm-1"><select class="form-control" name="itemQtyType'+i+'" id="itemQtyType'+i+'">';
                           this.qty.forEach(function(q){
                                if(v.itemQtyType == q)
                                    itemHtml = itemHtml+'<option selected="selected">'+q+'</option>';
                                else
                                     itemHtml = itemHtml+'<option>'+q+'</option>';
                            });
                          itemHtml =  itemHtml+'</select></div>'+
                         '<div class="col-sm-5" style="padding: 15px"><span class="glyphicon glyphicon-trash" onclick="removeChildItem('+i+')"></span></div>';
            return itemHtml;
        }
  function addCheckItem(){
       clist.setNumOfItems().appendBaseForms().setAppendCLItem();
  }
  
  function removeChildItem(num){
      clist.removeItem();
      disp.removedChild("checklistList", num);
  }
  

  function saveCheckList(){
    var date = disp.getHTMLValueById('itemDate').replaceAll("/", "");
    clist.setCurrentFormKeyId("checklist"+date.replaceAll("'", ""));
    clist.currentFormUinqName = disp.getHTMLValueById("checkListName").camelCase().replaceAll(" ", "");
    clist.currentFormName = disp.getHTMLValueById("checkListName").camelCase();
        clist.formDataMulti(document.checklist);
        clist.dbOperation(disp.action, clist.dataToBeSaved, function(msg){
                 disp.showMessage(msg, "infoMsg");
        }); 
  }
 