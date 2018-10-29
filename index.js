/**
 * Buid using https://github.com/bikerp/dsp-w215-hnap Tool.
 *
 * @type {exports|module.exports}
 */


module.exports = function(RED) {
  
 var soapclient = require('../hnap/js/soapclient');

 function turn(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        try{
           this.ip = config.ip;
           this.pin = config.pin;

        var LOGIN_USER = "admin";
        var LOGIN_PWD = this.pin;
        var HNAP_URL = "http://" + this.ip + "/HNAP1";


        soapclient.login(LOGIN_USER, LOGIN_PWD, HNAP_URL).done(function (status) {
          if (!status) {
              throw "Login failed!";
          }
          if (status != "success") {
              throw "Login failed!";
          }
        });

           }catch(error){
            node.error("Please check smart plug IP and PIN settings.");

            }

        node.on('input', function(msg) {
       try{
        if(msg.payload["On"]){
          soapclient.on();
	}
        else if(!msg.payload["On"]){
          soapclient.off();
	}
        else 
         node.error("payload should have {\"On\": True} or  {\"On\": False}")
         
        // pass msg.payload to the output
        node.send(msg);
         }catch(error){node.error("invalid msg.payload payload should have {\"On\": True} or  {\"On\": False}");}
	});
   }


RED.nodes.registerType("dsp-w215",turn);


process.on('uncaughtException', function (err) {
  node.error('Caught exception: ', err);
});

}

