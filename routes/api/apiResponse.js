var fs = require('fs');

var response = function(data, type='other'){
    this.type = type;
    this.data = data;
};

response.prototype.print = function(){
    console.log(this.data);
};

module.exports = response
