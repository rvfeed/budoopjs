     function Display(){
     }
         Display.prototype.showData = function(data){
               var tbodyData = ["", "itemName", "itemPrice", "itemDate", "DELETE"];
               var thHead = ["#", "Item Name", "Item Price", "Item Date"];
               var table = document.createElement("table");
               var thead = document.createElement("thead");
               var tbody = document.createElement("tbody");
                var tr = document.createElement("tr");
                var th = {}, textnode = {};
               var that = this;
                document.getElementById("result").innerHTML = "";
                for(var i in thHead){
                    th[i] = document.createElement("th");
                    th[i]["scope"] = "row";
                    textnode[i] = document.createTextNode(thHead[i]);
                    th[i].appendChild(textnode[i]);
                     tr.appendChild(th[i]);                }
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
                          dd = moment(new Date(x[tbodyData[n]])).format("MMM Do, YYYY");
                          textnode[n] = document.createTextNode(dd);
                          }else if(tbodyData[n] == ""){
                           dd = parseInt(i)+1;
                           textnode[n] = document.createTextNode(dd);
                          }else if(tbodyData[n] == "DELETE" || tbodyData[n] == "UPDATE") {
                              var button = document.createElement("button");
                               button["className"] = "btn";
                               var input = {"id": x.itemDate, "enteredDate": x.enteredDate}
                              button["onclick"] = function(c, d, e){ 
                                  return function(){
                                      opdb.dbOperation(c, d, function(msg){
                                            that.showMessage(msg, "infoMsg");
                                    });
                                  }
                              }(tbodyData[n].toLowerCase(), input)
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
        Display.prototype.showMessage = function(msg, id){
                         if(msg.indexOf("unable") === -1){
                            document.getElementById(id).className = "alert alert-success";
                        }else{
                            document.getElementById(id).className = "alert alert-warning";   
                        }
                       document.getElementById(id).innerHTML = msg
        }