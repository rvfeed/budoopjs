function InteractDB(){
    this.getFinalData = function(res, input, op){
        var opr = op;
          if(opr == "add"){
                res.push(input);
          }
        if(res.length > 1){
            op = "update";
            if(opr == "add"){
                return {"data":{"id":input.id, "data": res}, "action": op};
            }
            
            for(var m in res){
                if(res[m].enteredDate == input.enteredDate){
                    res.splice(m, 1)
                }
            }
        }
        return {"data":{"id":input.id, "data": res}, "action": op};
    }
}
    
    //used foe read and readAll operations
     InteractDB.prototype.readRecords = function(operation, input, cb){
        indexDb[operation](input, function(res){
            console.log(res);
            cb(res);
        });
    }
    
    //used for add, update and delete operations
    InteractDB.prototype.dbOperation = function(operation, input, done){
        var that = this;
        that.readRecords("read", input.id, function(res){
           var result = that.getFinalData(res, input, operation)
            indexDb[result.action](result.data, function(msg){
                   done(msg);
                   if(operation !== "add"){
                       that.readRecords("readAll", "", function(res) {
                           disp.showData(res);
                       });
                   }
            });
        });
    }

