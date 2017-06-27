  
      function Display(tData, tHead){
            this.tableData = tData || ["itemName", "itemPrice", "itemDate"];
            this.tableHead = tHead || ["Name", "Price", "Date"];
            this.oldDate = false;
            this.enteredDate = new Date().getTime();
            this.action = "add";
 
  
      }
       Display.prototype = Validation.prototype; 
       Display.prototype.formAction = function(c, data){
             var self = this;
             var form = this.getCurrentForm();
              // BaseForm.prototype.setCurrentFormUinqName.call(self, form);
               if(c == "update"){
                    self.setCurrentFormKeyId(this.getCurrentForm());
                   data.id = form;
                   self.setFormUpdateData("add", data, function(msg){
                       window.location.href = form+".html";
                   });
                   return;
               }else{
                   self.setCurrentFormKeyId(data.id);
                  self.dbOperation(c, data, function(msg){
                       self.showMessage(msg, "infoMsg");
                       opdb.readAllRecords(function(res) {
                           self.showData(res);
                       });
                 }); 
               }
                
           }
  
  Display.prototype.setHTMLUpdateById = function(id, prop, value){
       document.getElementById(id)[prop] = value;
   }
   
  Display.prototype.setHiddenProp = function(prop, value){
       this[prop] = value;
       }
   
   Display.prototype.getHTMLValueById = function(id){
       return document.getElementById(id).value || false;
   }
   
   
   
    Display.prototype.showData = function(data){
               var tbodyData = this.tableData;
               var thHead = this.tableHead;
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
                     var x= data[i].res;
                     
                     for(var n in tbodyData){
                        td[n] = document.createElement("td");
                        var dd = x[tbodyData[n]];
                        if(tbodyData[n] == "itemQty"){
                            try{
                                textnode[n] = document.createTextNode(x.items.length);     
                            }
                            catch(err){
                                console.log("Old data present in the databse");
                                textnode[n] = document.createTextNode(0);;
                            }
                        }else if(tbodyData[n] == "itemPrice"){
                            var price = 0;
                                try{
                                 x.items.forEach(function(item){
                                        price = price + parseInt(item.itemPrice);
                                });    
                            }
                            catch(err){
                                console.log("Old data present in the databse");
                            }
                         
                             textnode[n] = document.createTextNode(price);
                        }else if(tbodyData[n] == "itemDate"){
                          dd = moment(new Date(x.items[tbodyData[n]])).format("MMM Do, YY");
                          textnode[n] = document.createTextNode(dd);
                          }else if(tbodyData[n] == "DELETE" || tbodyData[n] == "UPDATE") {
                              var button = document.createElement("a");
                               button["className"] = "btn";
                               button["href"] = "javascript:void(0)";
                                if(tbodyData[n] == "DELETE")
                                    button["innerHTML"] = '<span class="glyphicon glyphicon-trash"></span>';
                                else
                                    button["innerHTML"] = '<span class="glyphicon glyphicon-pencil"></span>';
                               var input = x;
                               input.id = data[i].id;
                              button["onclick"] = function(c, d){ 
                                  return function(){
                                      that.formAction(c, d);
                                  }
                              }(tbodyData[n].toLowerCase(), input)
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
        Display.prototype.getResultHead = function(){
               return this.tableHead;
           }
           Display.prototype.getResultBody = function(){
               return this.tableData;
           }
           Display.prototype.setResultBody = function(arr){
               this.tableData = arr || this.tableData;
               return this;
           }
           Display.prototype.setResultHead = function(arr){
               this.tableHead = arr || this.tableHead;
               return this;
           }
           Display.prototype.getProperty = function(prop){
               return this[prop];
           }
         Display.prototype.updateForm = function(form){
          var that = this;
          this.getFormUpdateData(function(res){
              if(res.id){
                that.numOfitems = res.data[that.currentFormName].items.length;
                that.setHTMLUpdateById("itemDate", "value", res.data[that.currentFormName].checkListDate)
                that.appendBaseForms(res.data[that.currentFormName].items);
                that.appendCLItem = that.numOfitems;
                opdb.deleteRecord(res, function(msg){
                     console.log(msg);
                });
              }
              else{
                 that.appendBaseForms().setAppendCLItem();    
              }
         });
      }
      Display.prototype.setFormUpdateData = function(op, data, callback){
          var that = this;
                   this.deleteRecord(data, function(msg){
                       console.log(msg);
                        that.dbOperation(op, data, function(msg){
                        callback(msg);
                  });
              });
     }
     Display.prototype.getFormUpdateData = function(callback){
               this.readRecord(function(data){
                   callback(data);
               })
     }
      Display.prototype.getElementSizeByClassName = function(prop, value){
             var classSize = document.getElementsByClassName(prop) || [];
         return classSize.length;
   }
    Display.prototype.removedChild = function(id, value){
        var eid = document.getElementById(id);
            eid.removeChild(eid.childNodes[value]);
   }
     
     Display.prototype.showMessage = function(msg, id){
              var className = "alert alert-warning";
              if(msg.indexOf("unable") === -1)  className = "alert alert-success";
              this.setHTMLUpdateById(id,"className", className);
              this.setHTMLUpdateById(id,"innerHTML", msg); 
        }
          Display.prototype.emptyDivById = function(id){
             document.getElementById(id).innerHTML = "";
   }
   var disp = new Display();