String.prototype.toString = function(){           
    return "'"+this+"'";
}
var valid = new Validation();
 var indexDb = new IndexDBModal();
       indexDb.IntiateDb();
function save(){
    var formSize = document.budget.length-1;                        
    if(!valid.formValidation(document.budget)) return false;               
}
