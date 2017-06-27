function InteractDB(){};
    InteractDB.prototype.findItemIndex = function(lhs, rhs, res){
        return res.findIndex(function(ele){
                return ele[lhs] == rhs
            });
    }
    InteractDB.prototype.isSameDate = function(oldDate, newDate){
        return oldDate === newDate;
    }
    //used foe read and readAll operations
     InteractDB.prototype.readRecord = function(cb){
        indexDb.read(this.getCurrentFormKeyId(), function(res){
            cb(res);
        });
    }
    InteractDB.prototype.determineAction = function(res, op){
        if(this.getCurrentFormKeyId() == res.id && op == "add"){
            op = "update";
        }
        return op;
    }
    InteractDB.prototype.getFinalData = function(res, input, op){
        var temp = {};
        op = this.determineAction(res, op)
        if(op == "add" || op == "update"){
            console.log(this.getCurrentFormUinqName());
            temp[this.getCurrentFormUinqName()] = input;
         res =   $.extend({}, res.data, temp);
           // res = temp;
        }
        return {"data":{"id": this.getCurrentFormKeyId(), "data": res}, "action": op};
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
        that.readRecord(function(res){
           var result = that.getFinalData(res, input, operation);
            indexDb[result.action](result.data, function(msg){
                        done(msg);
                   
            });
        });
    }

var opdb = new InteractDB();