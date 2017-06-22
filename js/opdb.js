function InteractDB(){
    this.findItemIndex = function(lhs, rhs, res){
        return res.findIndex(function(ele){
                return ele[lhs] == rhs
            });
    }
    this.isSameDate = function(oldDate, newDate){
        return oldDate === newDate;
    }
    this.getFinalData = function(res, input, op){
        if(op == "add" || res.length === 0){
          res.push(input);  
          op = "add";
        } 
        else if(op == "update"){
                res.splice(this.findItemIndex("enteredDate", input.enteredDate, res), 1);
                input.enteredDate = disp.enteredDate;
                res.push(input);
            }
        if(res.length > 1){
            if(op == "delete")
               res.splice(this.findItemIndex("enteredDate", input.enteredDate, res), 1);
            op = "update";
        }
        return {"data":{"id":input.id, "data": res}, "action": op};
    }
}
    
    //used foe read and readAll operations
     InteractDB.prototype.readRecord = function(input, cb){
        indexDb.read(input, function(res){
            cb(res);
        });
    }
      //used for readAll operations
     InteractDB.prototype.readAllRecords = function(cb){
        indexDb.readAll( function(res){
            cb(res);
        });
    }
    //used foe read and readAll operations
     InteractDB.prototype.deleteRecord = function(input, cb){
        indexDb.delete(input, function(res){
            console.log(res);
            cb(res);
        });
    }
    
    
    //used for add, update and delete operations
    InteractDB.prototype.dbOperation = function(operation, input, done){
        var that = this;
        that.readRecord(input.id, function(res){
           var result = that.getFinalData(res, input, operation);
            indexDb[result.action](result.data, function(msg){
                   if(disp.getProperty("oldDate") && input.id !== disp.oldDate){
                       input.id = disp.oldDate;
                       that.dbOperation("delete", input, function(msg){
                           if(result.action == "updated")
                               msg = msg.replace("deleted", "updated");
                          done(msg);
                       })
                   }else
                        done(msg);
                   
            });
        });
    }

