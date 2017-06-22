    function Validation(){}
    Validation.prototype = Display.prototype;
        Validation.prototype.formData = function(d, cb){
              var formDup = {}, date, ele = this.getResultBody();
              ele.forEach(function(e){
                   if(e == "itemDate"){
                        date = d[e].value;                         
                    }
                    formDup[e] = d[e].value
              });
              formDup.id = date;
              formDup.enteredDate = new Date().getTime();
              cb(formDup);
        }
    Validation.prototype.formValidation = function(d){
                var that = this;
                var form = this.getResultBody();
                for( var x = 0; x < form.length; x++){
                    if(d[form[x]].value == ""){
                        alert("Please enter "+d[form[x]].name);
                        d[x].focus();
                        return false;
                        break;
                    }                   
                     if(d[form[x]].name == "itemPrice"){
                        if(!d[form[x]].value.isNumber()){
                            alert("Please enter valid "+d[form[x]].name);
                            return false;
                        }                         
                    }
                }    
                return true;
            }
        String.prototype.isNumber = function(){
            return !isNaN(this.valueOf())
        }
   function search(){
        document.getElementById("result").innerHTML = "";
         opdb.readRecords("read", document.getElementById("search").value, function(res){
            disp.showData(res);
        });
       } 
       
var valid = new Validation();
var indexDb = new IndexDBModal();
var opdb = new InteractDB();
var disp = new Display();

