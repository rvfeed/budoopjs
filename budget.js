 String.prototype.toString = function(){           
            return "'"+this+"'";
        }
      //  console.log(new Object("hi").toString())        
        function DataStorage(){
            this.data = [];            
        }         var store = new DataStorage();
           
        DataStorage.prototype.searchData = function(input){                
                return this.data[input.toString()];
            }
        function Validation(){         
            var form = [];                        
                      
        }
          var valid = new Validation();
        
        Validation.prototype.formValidation = function(d){
                var formDup = {};
                for( var x = 0; x < d.length-1; x++){
                    if(d[x].value == ""){
                        alert("Please enter "+d[x].name);
                        return false;
                        break;
                    }                    
                    formDup[d[x].name] = d[x].value
                    if(d[x].name == "itemDate"){
                        var date = d[x].value;                        
                    }                                                          
                }                
                if(!store.data[date.toString()]) store.data[date.toString()] =  [];                
                   store.data[date.toString()].push(formDup);;
                return true;
            }  
        function Display(){
           var HtmlOutput = function(){               
                return this.itemName + "   "+ this.itemPrice+"   "+ this.itemDate+"\n";     
            }
            return {
                outHTML: function(t){
                        HtmlOutput.call(t)
                } 
            }
        }
        var disp = new Display();
console.dir(disp)
            Display.prototype.tempFunc = function(data){
                for(var x in data){
                    //console.log(data[i][x]);
                    var node = document.createElement("div");
                    var tnode = document.createTextNode(this.outHTML(data[x]));
                    node.appendChild(tnode);
                    document.getElementById("result").appendChild(node);
                }
            }
            Display.prototype.showData = function(data){                
                document.getElementById("result").innerHTML = "";
                for(var i in data){           
                   this.tempFunc(data[i]);             
                }                
            }      
        
          
        function save(){
            var formSize = document.budget.length-1;                        
           if(!valid.formValidation(document.budget)) return false;
           disp.showData(store.data);           
        }
        function search(){
            document.getElementById("result").innerHTML = "";
            disp.tempFunc(store.searchData(document.getElementById("search").value));
        }

        function xyz(a, b, c, d){
            console.dir(Array.prototype.push.call(arguments, 7))
            console.log(arguments)
        }
        xyz(1, 2, 3, 4);