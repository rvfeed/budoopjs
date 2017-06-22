  var Display = (function(){
       var tbodyData = ["itemName", "itemPrice", "itemDate"];
       var thHead = ["Name", "Price", "Date"];
       var Display = function(){
            var self = this;
           this.getResultHead = function(){
               return thHead;
           }
           this.getResultBody = function(){
               return tbodyData;
           }
           this.setFormUpdateData = function(op, data, callback){
                   opdb.deleteRecord(data, function(msg){
                       console.log(msg);
                        opdb.dbOperation(op, data, function(msg){
                        callback(msg);
                   });
               });
           }
            this.getFormUpdateData = function(form, callback){
               opdb.readRecords("read",form , function(data){
                   callback(data);
               })
           }
           var formAction = function(c, data, form){
              
               if(c == "update"){
                   data.id = "index";
                   self.setFormUpdateData("add", data, function(msg){
                       window.location.href = form+".html";
                   });
                   return;
               }
                opdb.dbOperation(c, data, function(msg){
                                            self.showMessage(msg, "infoMsg");
                                    });
           }
           this.showData = function(data){
                 var tbodyData = ["itemName", "itemPrice", "itemDate", "DELETE", "UPDATE"];
                 var thHead = ["Name", "Price", "Date", "", ""];
               var table = document.createElement("table"),
                   thead = document.createElement("thead"),
                   tbody = document.createElement("tbody");
                var tr = document.createElement("tr"), th = {}, textnode = {};
               var that = this;
                document.getElementById("result").innerHTML = "";
                for(var i in thHead){
                    th[i] = document.createElement("th");
                    th[i]["scope"] = "row";
                    textnode[i] = document.createTextNode(thHead[i]);
                    th[i].appendChild(textnode[i]);
                     tr.appendChild(th[i]);           
                }
                 thead.appendChild(tr);
                 table.appendChild(thead);
                var td = {}, textnode = {}; 
                for(var i in data){
                    var tr = document.createElement("tr");
                     var x= data[i];
                     for(var n in tbodyData){
                        td[n] = document.createElement("td");
                        var dd = x[tbodyData[n]];
                        if(tbodyData[n] == "itemDate"){
                          dd = moment(new Date(x[tbodyData[n]])).format("MMM Do, YY");
                          textnode[n] = document.createTextNode(dd);
                          }else if(tbodyData[n] == "DELETE" || tbodyData[n] == "UPDATE") {
                              var button = document.createElement("button");
                               button["className"] = "btn";
                               var input = {"id": x.itemDate, "enteredDate": x.enteredDate, "data": x}
                              button["onclick"] = function(c, d, form){ 
                                  return function(){
                                      formAction(c, d, form);
                                  }
                              }(tbodyData[n].toLowerCase(), input, "index")
                              button.attributes["class"] = "btn";
                              var delData = document.createTextNode(tbodyData[n]);
                              button.appendChild(delData);
                              textnode[n] = button;
                          }else{
                              textnode[n] = document.createTextNode(dd);
                          }
                        td[n].appendChild(textnode[n]);
                        tr.appendChild(td[n]); 
                     }
                    tbody.appendChild(tr);
                }
                table.appendChild(tbody);
                document.getElementById("result").appendChild(table);
                document.querySelector("table").setAttribute("class", "table table-striped");
             }
      }

              Display.prototype.getResultBody = function(){
             return tbodyData;
      }
      Display.prototype.updateForm = function(form){
          var that = this;
          this.getFormUpdateData(form, function(res){
              if(res.length){
                   tbodyData.forEach(function(id){
                    that.setHTMLUpdateById(id, "value",res[0].data[id]);
                });
                that.setHTMLUpdateById("action", "value", "update");
                that.setHTMLUpdateById("enteredDate", "value", res[0].data["enteredDate"]);
                opdb.deleteRecord({"id":form}, function(msg){
                     console.log(msg);
                });
              }
         });
      }
     
      return Display;
     }());
    
    Display.prototype.setHTMLUpdateById = function(id, prop, value){
       document.getElementById(id)[prop] = value;
   }
   Display.prototype.getHTMLValueById = function(id){
       return document.getElementById(id).value;
   }
          Display.prototype.showMessage = function(msg, id){
              var className = "alert alert-warning";
              if(msg.indexOf("unable") === -1)  className = "alert alert-success";
              this.setHTMLUpdateById(id,"className", className);
              this.setHTMLUpdateById(id,"innerHTML", msg); 
        }