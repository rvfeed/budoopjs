String.prototype.isNumber = function(){
        return !isNaN(this.valueOf());
}
String.prototype.getNumber = function(){
           return this.valueOf();
        }
String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'gi'), replacement);
 };
String.prototype.camelCase = function(){
    return this.split(" ").map(function(w){
        return w.charAt(0).toUpperCase()+w.substr(1, w.lenth);
    }).join(" ");
}
function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}
function deleteAll(){
    opdb.deleteAll(function(msg){
       disp.showMessage(msg) ;
    });
}
