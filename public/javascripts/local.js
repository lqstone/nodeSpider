var Local = function(){
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
			gameDiv: document.getElementById('game'),
			nextDiv: document.getElementById('next'),
			timeDiv: document.getElementById('time'),
			scoreDiv: document.getElementById('score'),
			resultDiv: document.getElementById('gameover'),
		}
		game = new Game();
		bindKeyEvent();
		game.init(doms, generateType(), generateDir());
		game.performNext(generateType(), generateDir());
		timer = setInterval(move, INTERVAL);
	}
	var move = function(){
		timeFunc();
		if(!game.down()){
			game.fixed();
			var line = game.checkClear();
			if(line){
				game.addScore(line);
			}
			var gameOver = game.checkGameOver();
			if(gameOver){
				stop();
				game.gameover(false);
			}else{
				game.performNext(generateType(), generateDir());
			}
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
				// game.addTailLine(generateBottomLine(4));
			}
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
        document.onkeydown = function(e) {
            if (e.keyCode == 71) {
                start();
                time = 0;
                game.setTime(time);
                $('#game').removeClass('gameover')
            }
        }
    }
	// over
	var stop = function(){
		if(timer){
			clearInterval(timer);
			timer = null;
		}
		document.onkeydown = null;
        restart();
        $('#game').addClass("gameover");
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
	}
	// 绑定事件
	var bindKeyEvent = function(){
		document.onkeydown = function(e){
			if(e.keyCode == 38){ //up
				game.rotate();
			}else if(e.keyCode == 39){ //right
				game.right();
			}else if(e.keyCode == 40){ //down
				game.down();
			}else if(e.keyCode == 37){ //left
				game.left();
			}else if(e.keyCode == 32){ //space
				game.fall();
			}
		}
	}
	this.start = start;
}
