  
      function Display(tData, tHead){
            var tableData = tData || ["itemName", "itemPrice", "itemDate"];
            var tableHead = tHead || ["Name", "Price", "Date"];
            var self = this;
            this.oldDate = false;
            this.enteredDate = new Date().getTime();
            this.action = "add";
           this.getResultHead = function(){
               return tableHead;
           }
           this.getResultBody = function(){
               return tableData;
           }
           this.setResultBody = function(arr){
               tableData = arr || tableData;
               return this;
           }
           this.setResultHead = function(arr){
               tableHead = arr || tableHead;
               return this;
           }
           this.getProperty = function(prop){
               return this[prop];
           }
          
           var formAction = function(c, data, form){
               if(c == "update"){
                   data.id = "index";
                   self.setFormUpdateData("add", data, function(msg){
                       window.location.href = form+".html";
                   });
                   return;
               }else{
                  opdb.dbOperation(c, data, function(msg){
                       self.showMessage(msg, "infoMsg");
                       opdb.readAllRecords(function(res) {
                           disp.showData(res);
                       });
                 }); 
               }
                
           }
        this.updateForm = function(form){
          var that = this;
          this.getFormUpdateData(form, function(res){
              if(res.length){
                   that.getResultBody().forEach(function(id){
                    that.setHTMLUpdateById(id, "value",res[0].data[id]);
                });
                that.setHiddenProp("action", "update");
                that.setHiddenProp("enteredDate", res[0].data["enteredDate"]);
                that.setHiddenProp("oldDate",res[0].data["itemDate"]);
                opdb.deleteRecord({"id":form}, function(msg){
                     console.log(msg);
                });
              }
         });
      }
     
  
    this.setHTMLUpdateById = function(id, prop, value){
       document.getElementById(id)[prop] = value;
   }
   this.setHiddenProp = function(prop, value){
       this[prop] = value;
   }
   this.getHTMLValueById = function(id){
       return document.getElementById(id).value || false;
   }
           this.showData = function(data, tbody, thead){
               var tbodyData = this.setResultBody(tbody).getResultBody();
               var thHead = this.setResultHead(thead).getResultHead();
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
                              var button = document.createElement("a");
                               button["className"] = "btn";
                               button["href"] = "javascript:void(0)";
                                if(tbodyData[n] == "DELETE")
                                    button["innerHTML"] = '<span class="glyphicon glyphicon-trash"></span>';
                                else
                                    button["innerHTML"] = '<span class="glyphicon glyphicon-pencil"></span>';
                               var input = {"id": x.itemDate, "enteredDate": x.enteredDate, "data": x}
                              button["onclick"] = function(c, d, form){ 
                                  return function(){
                                      formAction(c, d, form);
                                  }
                              }(tbodyData[n].toLowerCase(), input, "index")
                              button.attributes["class"] = "btn";
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
       Display.prototype.setFormUpdateData = function(op, data, callback){
                   opdb.deleteRecord(data, function(msg){
                       console.log(msg);
                        opdb.dbOperation(op, data, function(msg){
                        callback(msg);
                   });
               });
           }
            Display.prototype.getFormUpdateData = function(form, callback){
               opdb.readRecord(form , function(data){
                   callback(data);
               })
           }

     
          Display.prototype.showMessage = function(msg, id){
              var className = "alert alert-warning";
              if(msg.indexOf("unable") === -1)  className = "alert alert-success";
              this.setHTMLUpdateById(id,"className", className);
              this.setHTMLUpdateById(id,"innerHTML", msg); 
        }