    function Validation(){         
        }
      var indexDb = new IndexDBModal();
        Validation.prototype.formValidation = function(d){
                var formDup = {};
            
                for( var x = 0; x < d.length-1; x++){
                    if(d[x].value == ""){
                        alert("Please enter "+d[x].name);
                        d[x].focus();
                        return false;
                        break;
                    }                   
                    if(d[x].name == "itemDate"){
                        var date = d[x].value;                         
                    }
                    formDup[d[x].name] = d[x].value
                }                
                formDup.id = date;
                formDup.enteredDate = new Date().getTime();
                indexDb.read(date, function(result){
                    var res = result.length;
                    var op = "add";
                    result.push(formDup)               
                    result = {"id":date, "data": result}; 
                    if(res !== 0) op = "update";
                        indexDb[op](result, function(msg){
                        console.log(msg)
                        if(msg.indexOf("unable") === -1){
                            document.getElementById("infoMsg").className = "alert alert-success";
                        }else{
                            document.getElementById("infoMsg").className = "alert alert-warning";   
                        }
                       document.getElementById("infoMsg").innerHTML = msg; 
                    });  
                    
                });                   
                return true;
            }  