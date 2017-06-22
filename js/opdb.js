function InteractDB(){
    this.findItemIndex = function(lhs, rhs, res){
        return res.findIndex(function(ele){
                return ele[lhs] == rhs
            });
    }
    this.getFinalData = function(res, input, op){
        if(op == "add"){
          res.push(input);  
        } 
        else if(op == "update"){
                res.splice(this.findItemIndex("enteredDate", input.enteredDate, res), 1);
                input.enteredDate = disp.getHTMLValueById("enteredDate");
                res.push(input);
            }
        if(res.length > 1){
            if(opr == "delete")
               res.splice(this.findItemIndex("enteredDate", input.enteredDate, res), 1);
            op = "update";
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

