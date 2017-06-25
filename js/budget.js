String.prototype.toString = function(){           
    return "'"+this+"'";
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




