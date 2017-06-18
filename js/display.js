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
                var table = document.createElement("table");
                 var thead = document.createElement("thead");
                var tr = document.createElement("tr");
                var th = {}, textnode = {}, thHead = ["Item Name", "Item Price", "Item Date"];
                for(var i in thHead){
                    th[i] = document.createElement("th");
                    th[i]["scope"] = "row";
                    textnode[i] = document.createTextNode(thHead[i]);
                    th[i].appendChild(textnode[i]);
                     tr.appendChild(th[i]);
                }
                 thead.appendChild(tr);
                 table.appendChild(thead);
                var tbody = document.createElement("tbody");
                var td = {}, textnode = {}, tbodyData = ["itemName", "itemPrice", "itemDate"];
                for(var i in data){
                    var tr = document.createElement("tr");
                     var x= data[i];
                     for(var n in tbodyData){
                        td[n] = document.createElement("td");
                        var dd = x[tbodyData[n]];
                        if(tbodyData[n] == "itemDate")
                          dd = moment(new Date(x[tbodyData[n]])).format("MMM Do, YYYY");
                        textnode[n] = document.createTextNode(dd);
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