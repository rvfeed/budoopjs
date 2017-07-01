
function ChecklistItem(m){
      this.numOfitems = m || 0;
      this.items = [];
      this.qty = ["Pc", "gms", "kg"];
      this.dataFormat = {"items":[], "name": ""};
      this.currentFormName = "checklist";
      this.currentForm = "checklist";
      this.currentFormUinqName = "checklist";
      this.allFormElements = [];
      this.allFormElementsNum = [];
      this.appendCLItem = 0;
      this.formElements = ["itemDate", "formName", "itemName", "itemQty", "itemQtyType"];
      this.dataToBeSaved = {};
  }
  ChecklistItem.prototype = BaseForm.prototype;

  ChecklistItem.prototype.htmlItems = function(i, v){
      if(!Object.keys(v).length){
          v = {itemName: "", itemQty: "", itemName: ""};
      }
          var itemHtml = '<td width="40%"><input type="text" name="itemName'+i+'" value="'+v.itemName+'" id="itemName'+i+'" class="form-control" required/></td>'+
                          '<td width="25%"><input type="number" name="itemQty'+i+'" value="'+v.itemQty+'" id="itemQty'+i+'" class="form-control"/></td>'+
                          '<td width="25%"><select class="form-control" name="itemQtyType'+i+'" id="itemQtyType'+i+'">';
                           this.qty.forEach(function(q){
                                if(v.itemQtyType == q)
                                    itemHtml = itemHtml+'<option selected="selected">'+q+'</option>';
                                else
                                     itemHtml = itemHtml+'<option>'+q+'</option>';
                            });
                          itemHtml =  itemHtml+'</select></td>'+
                         '<td width="10%" style="padding: 15px"><span class="glyphicon glyphicon-trash" onclick="removeChildItem('+i+')"></span></td>';
            return itemHtml;
        }
  function addCheckItem(){
       clist.setNumOfItems().appendBaseForms().setAppendCLItem();
  }
  
  function removeChildItem(num){
      clist.removeItem(clist.currentForm+""+num);
  }
  

  function saveCheckList(){
    var date = disp.getHTMLValueById('itemDate').replaceAll("/", "");
    clist.setCurrentFormKeyId("checklist"+date);
    clist.currentFormUinqName = disp.getHTMLValueById("checkListName").camelCase().replaceAll(" ", "-");
    clist.currentFormName = disp.getHTMLValueById("checkListName").camelCase();
        clist.formDataMulti(document.checklist);
        clist.dbOperation(disp.action, clist.dataToBeSaved, function(msg){
                 disp.showMessage(msg);
        }); 
  }
 