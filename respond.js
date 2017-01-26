var http = require('http');

http.ServerResponse.prototype.respond = function(content,status){

    if(typeof(status) == "undefined"){
        if(typeof(content) == "number"){
           status = content;
           content = undefined;
        }
        else{
          status = 200;
        }
    }

    if(status != 200){

      content = {
        "code" : status,
        "status" : http.STATUS_CODES[status],
        "message" : content.toString()

      };
    }

     if (typeof(content) != "object"){

        content = {
          "result" : content
        };
     }

     this.send(JSON.stringify(content)+'\n',status);


}
