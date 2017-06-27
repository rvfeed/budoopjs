String.prototype.isNumber = function(){
        return !isNaN(this.valueOf());
}
String.prototype.getNumber = function(){
           return this.valueOf();
        }
String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
 };
String.prototype.camelCase = function(){
    return this.split(" ").map(function(w){
        return w.charAt(0).toUpperCase()+w.substr(1, w.lenth);
    }).join(" ");
}