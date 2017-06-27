function BudgetForm(m){
      this.numOfitems = m || 1;
      this.items = [];
      this.qty = ["Pc", "gms", "kg"];
      this.dataFormat = {"items":[], "name": ""};
      this.currentFormName = "budget";
      this.currentFormUinqName = "budget";
      this.appendCLItem = 0;
      this.formElements = ["itemDate", "formName", "itemName", "itemPrice"];
      this.dataToBeSaved = {};
  }
  BudgetForm.prototype = BaseForm.prototype;

  BudgetForm.prototype.htmlItems = function(i, v){
      v = v || {itemName: "", itemPrice: ""};
          var itemHtml = '<div class="col-sm-5"><input type="text" name="itemName'+i+'" value="'+v.itemName+'" id="itemName'+i+'" class="form-control" required/></div>'+
                          '<div class="col-sm-1"><input type="text" name="itemPrice'+i+'" value="'+v.itemPrice+'" id="itemPrice'+i+'" class="form-control"/></div>'+
                         '<div class="col-sm-5" style="padding: 15px"><span class="glyphicon glyphicon-trash" onclick="budgetRemoveChildItem('+i+')"></span></div>';
            return itemHtml;
        }
  function budgetAddCheckItem(){
       bgFrom.setNumOfItems().appendBaseForms().setAppendCLItem();
  }
  
  function budgetRemoveChildItem(num){
      bgFrom.removeItem();
      disp.removedChild("checklistList", num);
  }
  

  function saveBudget(){
    var date = disp.getHTMLValueById('itemDate').replaceAll("/", "");
    bgFrom.setCurrentFormKeyId("budget"+date.replaceAll("'", ""));
        bgFrom.formDataMulti(document.checklist);
        bgFrom.dbOperation(disp.action, bgFrom.dataToBeSaved, function(msg){
                 disp.showMessage(msg, "infoMsg");
        }); 
  }
 
function save(){
    var formSize = document.budget.length-1;                        
    if(valid.formValidation(document.budget)){
        valid.formData(document.budget,  function(formDup){
          opdb.dbOperation(disp.action, formDup, function(msg){
                 disp.showMessage(msg, "infoMsg");
          });
      }); 
    }
}




