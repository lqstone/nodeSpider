var Remote = function(socket){
	// 游戏对象
	var game;
	// start
	var start = function(type, dir){
		var doms = {
			gameDiv: document.getElementById('remote_game'),
			nextDiv: document.getElementById('remote_next'),
			timeDiv: document.getElementById('remote_time'),
			scoreDiv: document.getElementById('remote_score'),
			resultDiv: document.getElementById('remote_gameover'),
		}
		game = new Game();
		game.init(doms, type, dir);
	}
	// 绑定事件
	var bindEvents = function(){
		socket.on('init', function (data) {
			start(data.type, data.dir);
        });
		socket.on('next', function (data) {
			game.performNext(data.type, data.dir);
        });
		socket.on('rotate', function () {
			game.rotate();
        });
		socket.on('right', function () {
			game.right();
        });
		socket.on('down', function () {
			game.down();
            game.checkClear();
        });
		socket.on('left', function () {
			game.left();
        });
		socket.on('fall', function () {
			game.fall();
            game.checkClear();
        });
		socket.on('fixed', function () {
			game.fixed();
            game.checkClear();
        });
		socket.on('line', function (data) {
			game.checkClear();
			game.addScore(data);
        });
		socket.on('time', function (data) {
			game.setTime(data);
        });
		socket.on('lose', function () {
			game.gameover(false);
        });
		socket.on('anotherName', function (data) {
			console.log('anotherName------remote', data)
        });
		socket.on('addTailLine', function (data) {
			game.addTailLine(data);
        });
	}
    bindEvents();
	// this.start = start;
}