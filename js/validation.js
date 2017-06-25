    function Validation(){
        this.currentFormKeyId = "";
    }
    Validation.prototype = InteractDB.prototype;
    Validation.prototype.setDataToBeSaved = function(){
            var dataFormat = {};
            dataFormat.items = this.items;
            dataFormat.name = this.currentFormName;
            this.dataToBeSaved = dataFormat;
        }
        Validation.prototype.getDataToBeSaved = function(){
            return this.dataToBeSaved;
        }
      Validation.prototype.setCurrentFormKeyId = function(form){
            this.currentFormKeyId = form;
            return this;
        }
        Validation.prototype.getCurrentFormKeyId = function(){
            return this.currentFormKeyId;
        }
    
    Validation.prototype.formDataMulti = function(d){
              var formDup = {}, date, items = [], tempData = {};
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
              items[n] = formDup;
             }
             this.dataToBeSaved.items = items;
             this.dataToBeSaved.name = this.currentFormName;
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

