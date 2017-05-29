 String.prototype.toString = function(){           
            return "'"+this+"'";
        }
      //  console.log(new Object("hi").toString())        
        function DataStorage(){
            this.data = [];            
        }      
           var store = new DataStorage();
           
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
                formDup.id = date;                
                read(date, function(result){   
                    console.log(result);  
                    result.push(formDup)               
                    result = {"id":date, "data": result};                    
                    add(result);
                });                   
                return true;
            }  
        function Display(){
           var HtmlOutput = function(data){   
               console.log(data)            
                return data.itemName + "   "+ data.itemPrice+"   "+ data.itemDate+"\n";     
            }
             this.tempFunc = function(data){
                    var node = document.createElement("div");
                    var tnode = document.createTextNode(HtmlOutput(data));
                    node.appendChild(tnode);
                    document.getElementById("result").appendChild(node);
            }
            this.showData = function(data){   
                console.log(data)             
                document.getElementById("result").innerHTML = "";
                for(var i in data){           
                   this.tempFunc(data[i]);             
                }                
            }
            
        }        
                 
        var disp = new Display();
          
        function save(){
          //  add(); return;
            var formSize = document.budget.length-1;                        
           if(!valid.formValidation(document.budget)) return false;
          
          // disp.showData(store.data);           
        }
        function search(){
            document.getElementById("result").innerHTML = "";
           // alert(document.getElementById("search").value)
           console.log(store.data);
            read(document.getElementById("search").value);
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
  readAll();
};
 
request.onupgradeneeded = function(event) {
        var db = event.target.result;
        var objectStore = db.createObjectStore("budget", {keyPath: "id"});     
        console.log("okkk")
    
    }
//read();
}
IntiateDb();
function add(data) {
        var request = db.transaction(["budget"], "readwrite")
                .objectStore("budget")
                .add(data);
                                 
        request.onsuccess = function(event) {
                console.log("Kenny has been added to your database.");
        };
         
        request.onerror = function(event) {
            console.log(event)
                console.log("Unable to add data\r\nKenny is aready exist in your database! ");       
        }
         
}

function read(dt, callback) {
        var transaction = db.transaction(["budget"]);
        var objectStore = transaction.objectStore("budget");
        var request = objectStore.get(dt);        
        request.onerror = function(event) {
            console.log("okkErr")
            if(callback) callback([]);
        };
        request.onsuccess = function(event) {
            console.log("okkSucc")
          if(request.result)
          if(callback) callback((request.result)?request.result.data|| []:[]);
          // Do something with the request.result!
          if(request.result) {
                disp.showData(request.result.data || []);
          } else {
          if(callback) callback([]);
          }
        };
}

function readAll() {
        var objectStore = db.transaction("budget").objectStore("budget");
   var temp = [];
        objectStore.openCursor().onsuccess = function(event) {
          var cursor = event.target.result;
         
          if (cursor) {
                console.log(cursor.value.data);
                for(var x in cursor.value.data)
                    temp.push(cursor.value.data[x]);
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

