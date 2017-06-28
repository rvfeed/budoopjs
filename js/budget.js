function BudgetForm(m){
      this.numOfitems = m || 0;
      this.items = [];
      this.qty = ["Pc", "gms", "kg"];
      this.dataFormat = {"items":[], "name": ""};
      this.currentFormName = "index";
      this.currentForm = "";
      this.currentFormUinqName = "index";
      this.allFormElements = [];
      this.allFormElementsNum = [];
      this.appendCLItem = 0;
      this.formElements = ["itemDate", "formName", "itemName", "itemPrice"];
      this.dataToBeSaved = {};
  }
  BudgetForm.prototype = BaseForm.prototype;

  BudgetForm.prototype.htmlItems = function(i, v){
      if(!Object.keys(v).length){
          v = {itemName: "", itemPrice: ""};
      }
          var itemHtml = '<td width="60%"><input type="text" name="itemName'+i+'" value="'+v.itemName+'" id="itemName'+i+'" class="form-control" required/></td>'+
                          '<td width="40%"><input type="number" name="itemPrice'+i+'" value="'+v.itemPrice+'" id="itemPrice'+i+'" class="form-control"/></td>'+
                         '<td width="10%" style="padding: 15px"><span class="glyphicon glyphicon-trash" onclick="bgFrom.removeItem('+i+')"></span></td>';
            return itemHtml;
        }
  function budgetAddCheckItem(){
       bgFrom.setNumOfItems().appendBaseForms().setAppendCLItem();
  }
  
  function budgetRemoveChildItem(num){
      bgFrom.removeItem(num);
  }
  

  function saveBudget(){
    var date = disp.getHTMLValueById('itemDate').replaceAll("/", "");
    bgFrom.setCurrentFormKeyId(bgFrom.getCurrentForm()+""+date);
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

var bgFrom = new BudgetForm();

