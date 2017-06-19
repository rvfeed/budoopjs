    function Validation(){
    
            
        }
        String.prototype.isNumber = function(){
            return !isNaN(this.valueOf())
        }
             Validation.prototype.formValidation = function(d, cb){
                var formDup = {};
                var that = this;
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
                     if(d[x].name == "itemPrice"){
                        if(!d[x].value.isNumber()){
                            alert("Please enter valid "+d[x].name);
                        }                         
                    }
                   // alert(d[x].value)
                    formDup[d[x].name] = d[x].value
                }                
                formDup.id = date;
                formDup.enteredDate = new Date().getTime();
                cb(formDup);
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
indexDb.IntiateDb();
