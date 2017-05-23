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
                    
                    if(d[x].name == "itemDate"){
                        var date = d[x].value;                         
                    }

                    formDup[d[x].name] = d[x].value
                }                
                // if(!store.data[date.toString()]) store.data[date.toString()] =  [];                
                //    store.data[date.toString()].push(formDup);;
                formDup.id = date;
                   add(formDup);
                return true;
            }  
        function Display(){
           var HtmlOutput = function(data){               
                return data.itemName + "   "+ data.itemPrice+"   "+ data.itemDate+"\n";     
            }
             this.tempFunc = function(data){
               // for(var x in data){
                    //console.log(data[i][x]);
                    console.log(data)
                    var node = document.createElement("div");
                    var tnode = document.createTextNode(HtmlOutput(data));
                    node.appendChild(tnode);
                    document.getElementById("result").appendChild(node);
               // }
            }
            this.showData = function(data){                
                document.getElementById("result").innerHTML = "";
                for(var i in data){           
                   this.tempFunc(data[i]);             
                }                
            }
            
        }
        
                 
        var disp = new Display();
console.dir(disp)
          
        function save(){
          //  add(); return;
            var formSize = document.budget.length-1;                        
           if(!valid.formValidation(document.budget)) return false;
          readAll();
          // disp.showData(store.data);           
        }
        function search(){
            document.getElementById("result").innerHTML = "";
            disp.tempFunc(store.searchData(document.getElementById("search").value));
        }

        function xyz(a, b, c, d){
            console.dir(Array.prototype.push.call(arguments, 7))
            console.log(arguments)
        }
var db;        
function IntiateDb(){
            //prefixes of implementation that we want to test
window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
 
//prefixes of window.IDB objects
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange
 
if (!window.indexedDB) {
    window.alert("Your browser doesn't support a stable version of IndexedDB.")
}

 

var request = window.indexedDB.open("budget", 1);
 
request.onerror = function(event) {
  console.log("error: ");
};
 
request.onsuccess = function(event) {
  db = request.result;
  console.log("success: "+ db);
};
 
request.onupgradeneeded = function(event) {
        var db = event.target.result;
        var objectStore = db.createObjectStore("budget", {keyPath: "id"});        
    }
//read();
}
IntiateDb();
function add(data) {
        var request = db.transaction(["budget"], "readwrite")
                .objectStore("budget")
                .add(data);
                                 
        request.onsuccess = function(event) {
              //  alert("Kenny has been added to your database.");
        };
         
        request.onerror = function(event) {
            console.log(event)
                alert("Unable to add data\r\nKenny is aready exist in your database! ");       
        }
         
}

function read() {
        var transaction = db.transaction(["budget"]);
        var objectStore = transaction.objectStore("budget");
        var request = objectStore.get("00-03");
        request.onerror = function(event) {
          alert("Unable to retrieve daa from database!");
        };
        request.onsuccess = function(event) {
          // Do something with the request.result!
          if(request.result) {
                alert("Name: " + request.result.name + ", Age: " + request.result.age + ", Email: " + request.result.email);
          } else {
              //  alert("Kenny couldn't be found in your database!"); 
          }
        };
}

function readAll() {
        var objectStore = db.transaction("budget").objectStore("budget");
   var temp = [];
        objectStore.openCursor().onsuccess = function(event) {
          var cursor = event.target.result;
         
          if (cursor) {
                console.log(cursor.value);
                temp.push(cursor.value);
                //alert("Name for id " + cursor.key + " is " + cursor.value.name + ", Age: " + cursor.value.age + ", Email: " + cursor.value.email);
                cursor.continue();
          }
          else {
             // var display = new Display();
              console.dir(temp)
              disp.showData(temp);
              //  alert("No more entries!");
          }
        };     
}

xyz(1, 2, 3, 4);