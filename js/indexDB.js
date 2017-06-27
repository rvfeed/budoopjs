function IndexDBModal(){
   var db;
    this.IntiateDb = function(fn){
            console.log(fn)
             var that = this;
                        //prefixes of implementation that we want to test
            window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
         
        //prefixes of window.IDB objects
        window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
        window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange
         
        if (!window.indexedDB) {
            window.alert("Your browser doesn't support a stable version of IndexedDB.")    }
        var request = window.indexedDB.open("budget", 1);
        request.onerror = function(event) {
          console.log("error: ");
        };
        request.onsuccess = function(event) {
          db = request.result;
          if(fn) fn(that);
        };
        request.onupgradeneeded = function(event) {
          var db = event.target.result;
          var objectStore = db.createObjectStore("budget", {keyPath: "id"});
        }

    }

    this.add = function(data, fn) {
         var that = this;
         var request = db.transaction(["budget"], "readwrite")
             .objectStore("budget")
             .add(data);
             request.onsuccess = function(event) {
                    fn("data has been added to your database.");
             }
             request.onerror = function(event) {         
                    fn("Unable to add data is aready exist in your database! ");       
            }
             
    }
    this.delete = function(data, fn) {
         var that = this;
         var request = db.transaction(["budget"], "readwrite")
             .objectStore("budget")
             .delete(data.id);
             request.onsuccess = function(event) {
                    fn("data has been deleted from your database.");
             }
             request.onerror = function(event) {         
                    fn("Unable to delete data from your database! ");       
            }
             
    }
     this.deleteAll = function(fn) {
         var that = this;
         var request = db.transaction(["budget"], "readwrite")
             .objectStore("budget")
             .clear();
             request.onsuccess = function(event) {
                    fn("All the data has been deleted from your database.");
             }
             request.onerror = function(event) {         
                    fn("Unable to delete data from your database! ");       
            }
             
    }
  
    this.update = function(data, fn) {
         var that = this;
         var request = db.transaction(["budget"], "readwrite")
             .objectStore("budget").openCursor().onsuccess = function(event) {
        var cursor = event.target.result;
        if(cursor) {
            if(cursor.value.id === data.id){
            var updateData = data;
            var request = cursor.update(updateData);
            request.onsuccess = function() {
             fn("data has been updated to your database.");
            } 
            };
             cursor.continue();
        }
       
             }
      
             
    }
    
    this.read = function(dt, callback) {
            var transaction = db.transaction(["budget"]);
            var objectStore = transaction.objectStore("budget");
            var request = objectStore.get(dt);        
            request.onerror = function(event) {
                console.log("okkErr")
                if(callback) callback([]);
            };
            request.onsuccess = function(event) {
                console.log("okkSucc")
            //  if(request.result)
              if(callback) callback((request.result)?request.result|| []:[]);
            };
    }
    
    this.readAll = function(callback, page) {
            var objectStore = db.transaction("budget").objectStore("budget");
       var temp = [];
       var count = 1;
            objectStore.openCursor().onsuccess = function(event) {
              var cursor = event.target.result;
             
              if (cursor) {
                  if(cursor.key.indexOf(page) > -1){
                       console.log(cursor.value.data);
                    for(var x in cursor.value.data){
                     count++;
                        temp.push({"res": cursor.value.data[x], "id": cursor.key});
                    }
                  }
                   
                    //alert("Name for id " + cursor.key + " is " + cursor.value.name + ", Age: " + cursor.value.age + ", Email: " + cursor.value.email);
                    if(count <= 10)
                        cursor.continue();
                    else
                        callback(temp);
              }
              else {
                 // var display = new Display();
                  console.dir(temp)
                  callback(temp);
                  //  alert("No more entries!");
              }
            };     
    }
}
var indexDb = new IndexDBModal();