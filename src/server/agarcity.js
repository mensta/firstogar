var WebSocket = require('ws');
var fs = require('fs');
var serverconfig = require('./serverconfig');
var nombredelosbots = 'TheGexiYT BOTS =)';
var io = require('socket.io').listen(8082);
var init1 = new Buffer(5);
init1.writeUInt8(254, 0);
init1.writeUInt32LE(1, 1, true);
var init2 = new Buffer(5);
init2.writeUInt8(255, 0);
init2.writeUInt32LE(1332715218, 1, true);
var posx = 4000;
var posy = 4000;
var buffer2 = new Buffer(21)
		buffer2.writeUInt8(16, 0);
		buffer2.writeDoubleLE(posx, 1, true);
		buffer2.writeDoubleLE(posy, 9, true);
		buffer2.writeUInt32LE(0, 17, true);
var amount = 1;
var botcount = [];

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


function createAgent(ip,type) {

    data = ip.split(":");

    return new Socks.Agent({
            proxy: {
                ipaddress: data[0],
                port: parseInt(data[1]),
                type: parseInt(type)
            }}
    );
}



function crearBot(id){
	console.log("STARTING! // BUILDING BOTS");
	var opciones = {
		headers:{
			"Origin": "http://agario.city"
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

			console.log('BOT_' + botcount + ' SPAWNED SUCCESS IN '+ serverconfig.server + ' BOTS TARGET: X: ' + "" + ' Y: '+ "");
			//var sjoin = new Buffer([17]);
			//send(sjoin);
			send(paqueteparaentrar);
			send(buffer2);
			
		}, 1000);
		setTimeout(function(){
			console.log("CLOSING SOCKET TO RESPAWN");
			ws.close();
		}, 30000);
	});
	ws.on('close',function(){
		console.log('Cerrado');
		if(continueSpam = true) setTimeout(crearBot, 1000);
	});
	ws.on('error', function(){
		console.log("ERROR CONNECTING... RECONECTING");
		crearBot();
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
		}, (i*111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111))
	}
}, 100)