    function Validation(){
        this.currentFormKeyId = "";
        this.dataToBeSaved = {};
        this.setDataToBeSave = function(val){
            this.dataToBeSaved = val;
            return this;
        }
        this.setDataToBeSave = function(val){
            return this.dataToBeSaved = val;
        }
      
        
    }
      Validation.prototype.setCurrentFormKeyId = function(form){
            this.currentFormKeyId = form;
            return this;
        }
        Validation.prototype.getCurrentFormKeyId = function(){
            return this.currentFormKeyId;
        }
    
    Validation.prototype.formDataMulti = function(d){
              var formDup = {}, date, arr = [], ex ={};
              console.log(d);
              for(var n = 0; n < this.numOfitems; n++){
              this.formElements.forEach(function(e){
                  if(e == "formName") return;
                   if(e == "itemDate"){
                        date = d[e].value;
                        formDup[e] = d[e].value
                    }else{
                        var f = e+""+n;
                        console.log(f+"----"+d[f].value);
                        formDup[e] = d[f].value
                    }
                    
              });
              formDup.enteredDate = new Date().getTime();
              arr[n] = formDup;
              }

             this.dataToBeSaved[this.formName] = arr;
             ex.id = this.getCurrentFormKeyId();
        }
   Validation.prototype.formData = function(d){
              var formDup = {}, date, ele = this.formElements, arr = [];
              ele.forEach(function(e){
                   if(e == "itemDate"){
                        date = d[e].value;
                        formDup[e] = d[e].value
                    }
              });
              formDup[e] = d[e].value
              formDup.enteredDate = new Date().getTime();
              formDup.id = this.getCurrentFormKeyId();
              this.dataToBeSaved = arr.push(formDup);
        }
   
    Validation.prototype.formValidation = function(d){
                var that = this;
                var form = this.formElements;
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
           String.prototype.getNumber = function(){
            return this.valueOf();
        }
        
   function search(){
        document.getElementById("result").innerHTML = "";
         opdb.readRecord(disp.getHTMLValueById("search") , function(res){
            disp.showData(res);
        });
       } 
       
var valid = new Validation();
var indexDb = new IndexDBModal();
var opdb = new InteractDB();
var disp = new Display();

