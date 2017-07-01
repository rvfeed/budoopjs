function InteractDB(){};
    InteractDB.prototype.findItemIndex = function(lhs, rhs, res){
        return res.findIndex(function(ele){
                return ele[lhs] == rhs
            });
    }
    InteractDB.prototype.isSameDate = function(oldDate, newDate){
        return oldDate === newDate;
    }
    
    InteractDB.prototype.updateRecord = function(uid, updateKey, updateVal, uname, eDate, done){
        var that = this;
        indexDb.read(uid, function(res){
            var index = that.findItemIndex("enteredDate", eDate, res.data[uname].items);
            console.log(index);
            if(index !== -1){
                res.data[uname].items[index].purchased = updateVal;
            }
            indexDb.update(res, function(msg){
                disp.showMessage(msg, "infoMsg");
                done(true);
            })
            
        });
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
            if(this.previousFormName && this.previousFormName != this.getCurrentFormUinqName()){
                delete res.data[this.previousFormName];
            }
            temp[this.getCurrentFormUinqName()] = input;
         res =   $.extend({}, res.data, temp);
           // res = temp;
        }else if(op == "delete"){
                console.log(res.data[input.uName]);
                delete res.data[input.uName];
                if( Object.keys(res.data).length > 0) op = "update"
                res = res.data;
            }
        return {"data":{"id": this.getCurrentFormKeyId(), "data": res}, "action": op};
    }
      //used for readAll operations
     InteractDB.prototype.readAllRecords = function(cb){
         var that = this;
         console.log(that);
        indexDb.readAll(function(res){
               that.showData(res);
        }, that.getCurrentForm());
    }
    //used foe read and readAll operations
     InteractDB.prototype.deleteRecord = function(input, cb){
        indexDb.delete(input, function(res){
            console.log(res);
            cb(res);
        });
    }
    
    //used to clear the db
     InteractDB.prototype.deleteAll = function(cb){
        indexDb.deleteAll(function(res){
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
                        if(operation == "delete"){
                            that.readAllRecords(function(res){
                                that.showData(res);
                            });
                        }
                   
            });
        });
    }

var opdb = new InteractDB();