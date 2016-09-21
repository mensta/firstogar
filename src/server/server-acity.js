var WebSocket = require('ws');
var fs = require('fs');
var serverconfig = require('./serverconfig');
var nombredelosbots = 'ttp://Fstyle.ga';
var socks = require('socks');
var init1 = new Buffer(5);
init1.writeUInt8(254, 0);
init1.writeUInt32LE(1, 1);
var init2 = new Buffer(5);
init2.writeUInt8(255, 0);
init2.writeUInt32LE(1332175218, 1);
var buffer2 = new Buffer(21)
var irax = 7000;
var iray = 7000;
var amount = 3; //no pongas muchos o te banearan
var botcount = [];
buffer2.writeUInt8(16, 0);
buffer2.writeDoubleLE(irax, 1, true);
buffer2.writeDoubleLE(iray, 9, true);
buffer2.writeUInt32LE(0, 17, true);

var paqueteparaentrar = (function conseguirelpaquete(nombre){
	var buffer = new Buffer(1 + 2 * nombredelosbots.length);
	buffer.writeUInt8(0,0);
	for (var i =0; i < nombredelosbots.length; i++){
		buffer.writeUInt16LE(nombredelosbots.charCodeAt(i), 1 + i * 2);
	}
	return buffer;

}) ("thegexi.tk");

function escribirstring8(str,L){
	var i = 1;
	var dataView = new DataView(new ArrayBuffer(str.length +1))
	dataView.setUint8(0,255)
	for (; i < str.length; i++) {
		dataView.setUint8(i, str.charCodeAt(i));
	}
return dataView;
}

function crearBot(id){
	console.log("starting // BUILDING BOTS");
	var opciones = {
		headers:{
			"Origin": "http://agario.city/play.php"
		}
	}
	var ws = new WebSocket(serverconfig.server,null,opciones);
	ws.binaryType = 'nodebuffer';
	ws.on('open', function() {
		console.log('Conectado');
		send(init1);
		send(init2);
		setTimeout(function(){
			botcount++
			console.log('BOT_' + botcount + ' SPAWNED SUCCESS IN '+ serverconfig.server + ' BOTS TARGET: X: ' + irax + ' Y: '+ iray);
			var split = new Buffer([17]);
			send(split);
			send(paqueteparaentrar);
			ws.close();
      send(buffer2);
		}, 10);
	});
	ws.on('close',function(){
		console.log('Cerrado');
		if(continueSpam = true) setTimeout(crearBot, 10);
	});
	ws.on('error', function(){

	});
	function send(mensaje){
		try{
			ws.send(mensaje)
		} catch(e){

		}
	}
}

	setTimeout(function() {
	continueSpam = true;
    for (var i = 0; i < amount; i++) {
        setTimeout(function() {
			crearBot(i)
		}, (i*11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111))
	}
}, 10)