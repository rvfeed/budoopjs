String.prototype.toString = function(){           
    return "'"+this+"'";
}

function save(){
    var formSize = document.budget.length-1;                        
    valid.formValidation(document.budget, function(formDup){
          opdb.dbOperation("add", formDup, function(msg){
                 disp.showMessage(msg, "infoMsg");
          });
    });
}
