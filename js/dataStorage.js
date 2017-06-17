function DataStorage(){
    this.data = [];            
}           
DataStorage.prototype.searchData = function(input){                
    return this.data[input.toString()];
}