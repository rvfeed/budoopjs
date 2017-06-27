  
      function Display(tData, tHead){
            this.tableData = tData || ["itemName", "itemPrice", "itemDate"];
            this.tableHead = tHead || ["Name", "Price", "Date"];
            var self = this;
            this.oldDate = false;
            this.enteredDate = new Date().getTime();
            this.action = "add";
           this.getResultHead = function(){
               return this.tableHead;
           }
           this.getResultBody = function(){
               return this.tableData;
           }
           this.setResultBody = function(arr){
               this.tableData = arr || this.tableData;
               return this;
           }
           this.setResultHead = function(arr){
               this.tableHead = arr || this.tableHead;
               return this;
           }
           this.getProperty = function(prop){
               return this[prop];
           }
          
           var formAction = function(c, data, form){
               BaseForm.prototype.setCurrentFormUinqName.call(self, "checklist");
               //self.setCurrentFormUinqName("checklist");
               if(c == "update"){
                    self.setCurrentFormKeyId(form);
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
                           disp.showData(res);
                       });
                 }); 
               }
                
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
           this.showData = function(data, tbody, thead, page){
               console.log("pppppppppppp")
               var tbodyData = tbody;
               var thHead = thead;
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
                            textnode[n] = document.createTextNode(x.items.length); 
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
                              button["onclick"] = function(c, d, form){ 
                                  return function(){
                                      formAction(c, d, form);
                                  }
                              }(tbodyData[n].toLowerCase(), input, page)
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
       Display.prototype = Validation.prototype; 
         Display.prototype.updateForm = function(form){
          var that = this;
          this.getFormUpdateData(function(res){
              if(res.id){
                that.numOfitems = res.data[that.currentFormName].items.length;
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