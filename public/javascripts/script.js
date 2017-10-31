// var logs = function(str){
// 	console.log(str);
// }
// var nextData = [
// 	[2, 2, 0, 0],
// 	[0, 2, 2, 0],
// 	[0, 0, 0, 0],
// 	[0, 0, 0, 0]
// ];

// var gameData = [
// 	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
// 	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
// 	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
// 	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
// 	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
// 	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
// 	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
// 	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
// 	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
// 	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
// 	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
// 	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
// 	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
// 	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
// 	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
// 	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
// 	[0, 0, 0, 0, 2, 2, 0, 0, 0, 0],
// 	[0, 0, 0, 0, 0, 2, 0, 0, 0, 0],
// 	[0, 0, 0, 0, 0, 2, 0, 0, 0, 0],
// 	[0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
// ];

// var nextDivs = [];
// var gameDivs = [];
// logs(gameData.length)

// // 初始化画布
// var initGame = function(){
// 	for(var i = 0; i < gameData.length; i++){
// 		var gameDiv = [];
// 		for(var j = 0; j < gameData[0].length; j++){
// 			var newNode = document.createElement('div');
// 			newNode.className = 'none';
// 			newNode.style.top = (i*20) + 'px';
// 			newNode.style.left = (j*20) + 'px';
// 			document.getElementById('game').appendChild(newNode);
// 			gameDiv.push(newNode)
// 		}
// 		gameDivs.push(gameDiv);
// 	}
// }

// // 初始化next
// var initNext = function(){
// 	for(var i = 0; i < nextData.length; i++){
// 		var nextDiv = [];
// 		for(var j = 0; j < nextData[0].length; j++){
// 			var newNode = document.createElement('div');
// 			newNode.className = 'none';
// 			newNode.style.top = (i*20) + 'px';
// 			newNode.style.left = (j*20) + 'px';
// 			document.getElementById('next').appendChild(newNode);
// 			nextDiv.push(newNode)
// 		}
// 		nextDivs.push(nextDiv);
// 	}
// }

// // 
// var refreshGame = function(){
// 	for(var i = 0; i < gameData.length; i++){
// 		for(var j = 0; j < gameData[0].length; j++){
// 			if(gameData[i][j] == 0){
// 				gameDivs[i][j].className = 'none';
// 			} else if(gameData[i][j] == 1){
// 				gameDivs[i][j].className = 'done';
// 			}  else if(gameData[i][j] == 2){
// 				gameDivs[i][j].className = 'current';
// 			} 
// 		}
// 	}
// }
// // 

// var refreshNext = function(){
// 	for(var i = 0; i < nextData.length; i++){
// 		for(var j = 0; j < nextData[0].length; j++){
// 			if(nextData[i][j] == 0){
// 				nextDivs[i][j].className = 'none';
// 			} else if(nextData[i][j] == 1){
// 				nextDivs[i][j].className = 'done';
// 			}  else if(nextData[i][j] == 2){
// 				nextDivs[i][j].className = 'current';
// 			} 
// 		}
// 	}
// }

// initGame()
// initNext()
// refreshGame()
// refreshNext()
var socket = io('/');
var local = new Local(socket);
var remote = new Remote(socket);
// remote.start(2, 2);
// remote.bindEvents();
// document.onkeydown = function(e) {
//     if (e.keyCode == 71) { //游戏开始
//         local.start();
//         $('#local_game').removeClass('gameAfter');
//         //
//     }
// }

socket.on('waiting', function(str){
	// console.log("dddddddddd", str)
	document.getElementById('waiting').innerHTML = str;
})





























