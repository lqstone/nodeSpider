var Local = function(socket){
	// 游戏对象
	var game;
	// 时间间隔
	var INTERVAL = 200;
	var timer = null;
	// count time
	var timeCount = 0;
	var time = 0;
	// 开始设置
	var start = function(){
		var doms = {
			gameDiv: document.getElementById('local_game'),
			nextDiv: document.getElementById('local_next'),
			timeDiv: document.getElementById('local_time'),
			scoreDiv: document.getElementById('local_score'),
			resultDiv: document.getElementById('local_gameover'),
		}
		game = new Game();
		bindKeyEvent();
		var type = generateType();
		var dir = generateDir();
		game.init(doms, type, dir);
		socket.emit('init', { type: type, dir: dir});
        var t = generateType();
        var d = generateDir();
		game.performNext(t, d);
        socket.emit('next', { type: t, dir: d});
		timer = setInterval(move, INTERVAL);
	}
	var move = function(){
		timeFunc();
		if(!game.down()){
			game.fixed();
			socket.emit('fixed');
			var line = game.checkClear();
			if(line){
				game.addScore(line);
				socket.emit('line', line);
				if(line > 1){
					var bottomLines = generateBottomLine(line);
					socket.emit('bottomLines', bottomLines);
				}
			}
			var gameOver = game.checkGameOver();
			if(gameOver){
				game.gameover(false);
				document.getElementById('remote_gameover').innerHTML = '你赢了';
				socket.emit('lose');
                stop();
			}else{
                var t = generateType();
                var d = generateDir();
                game.performNext(t, d);
                socket.emit('next', { type: t, dir: d});
			}
		}else{
			socket.emit('down')
		}
	}
	// count func
	var timeFunc = function(){
		timeCount = timeCount + 1;
		if(timeCount == 5){
			timeCount = 0;
			time +=  1;
			game.setTime(time);
			if(time % 5 == 0){
				// game.addTailLine(generateBottomLine(1));
			}
			socket.emit('time', time);
		}
	}
	var generateType = function(){
		return Math.ceil(Math.random() * 7) - 1;
	}
	var generateDir = function(){
		return Math.ceil(Math.random() * 4) - 1;
	}
	// 重新开始游戏
	var restart = function () {
        // document.onkeydown = function(e) {
        //     if (e.keyCode == 71) {
        //         start();
        //         time = 0;
        //         game.setTime(time);
        //         game.resetScore();
        //         $('#local_game').removeClass('gameover')
        //     }
        // }
    }
	// over
	var stop = function(){
		if(timer){
			clearInterval(timer);
			timer = null;
		}
		document.onkeydown = null;
        // restart();
        // $('#local_game').addClass("gameover");
	};
	// 随机生成
	var generateBottomLine = function(lineNum) {
		var lines = []
		for (var i = 0; i < lineNum; i++) {
			var line = [];
			for (var j = 0; j < 10; j++) {
				line.push(Math.ceil(Math.random()*2) - 1);
			}
			lines.push(line);
		}
		return lines;
	};
	// 获取姓名
	var myName = function () {
		var name = $('#myName').val();
        socket.emit('anotherName', name);
    }
    myName();

	// 绑定事件
	var bindKeyEvent = function(){
		document.onkeydown = function(e){
			if(e.keyCode == 38){ //up
				game.rotate();
				socket.emit('rotate')
			}else if(e.keyCode == 39){ //right
				game.right();
                socket.emit('right')
			}else if(e.keyCode == 40){ //down
				game.down();
                socket.emit('down')
			}else if(e.keyCode == 37){ //left
				game.left();
                socket.emit('left')
			}else if(e.keyCode == 32){ //space
				game.fall();
                socket.emit('fall')
			}
		}
	}
	// this.start = start;
    socket.emit('commingName', $('#myName').val());

	socket.on('start', function (data) {
		document.getElementById('waiting').innerHTML = '';
		$('#anotherName').val(data);
		var i = 4 ;
		setInterval(function () {
			if(i > 0){
                document.getElementById('waiting').innerHTML = '距离游戏开始还有' + i-- + 's';
			}else{
                document.getElementById('waiting').innerHTML = '';
            }
        },1000);
		setTimeout(function () {
            start();
        }, 5000);
    })

	socket.on('lose', function () {
		game.gameover(true);
		stop();
    })
	socket.on('anotherName', function (data) {
		console.log("local_anotherName", data);
		$('#anotherName').val(data);
    })
	socket.on('bottomLines', function (data) {
		game.addTailLine(data);
		socket.emit('addTailLine', data);
    })
	socket.on('leave', function () {
		document.getElementById('local_gameover').innerHTML = "对方掉线了";
		document.getElementById('remote_gameover').innerHTML = "已掉线了";
		stop();
    })
}
