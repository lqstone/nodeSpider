/**
 * Created by liuqiao on 2017/10/18.
 */
var socketio = require('socket.io');
var io;
var Users = require('./config.js')
var userList = [];
// 客户端计数
var clientCount = 0;
// 用来存储客户端socket
var socketMap = {};
// 外部接口

exports.listen = function(server) {
    io = socketio(server);
    // Fun
    var bindListener = function (socket, event) {
        socket.on(event, function (data) {
            if(socket.clientNum % 2 == 0){
                if(socketMap[socket.clientNum - 1]){
                    socketMap[socket.clientNum - 1].emit(event, data);
                }
            }else{
                if(socketMap[socket.clientNum + 1]){
                    socketMap[socket.clientNum + 1].emit(event, data);
                }
            }
        });
    }
    io.on('connection', function (socket) {
        //俄罗斯方块
        clientCount = clientCount + 1;
        socket.clientNum = clientCount;
        socketMap[clientCount] = socket;

        socket.on('commingName', function (data) {
            console.log("commingName", data);
            socketMap[socket.clientNum]['name'] = data;
        })

        if(clientCount % 2 == 1){
            socket.emit('waiting', '大屌 好好等待另一位玩家和你玩！');
        }else{
            if(socketMap[socket.clientNum - 1]){
                socket.emit('start', socketMap[socket.clientNum - 1]['name']);
                socketMap[(clientCount - 1)].emit('start');
            }else{
                socket.emit('leave');
            }
        }
        bindListener(socket, 'init');
        bindListener(socket, 'next');
        bindListener(socket, 'rotate');
        bindListener(socket, 'right');
        bindListener(socket, 'left');
        bindListener(socket, 'down');
        bindListener(socket, 'fall');
        bindListener(socket, 'fixed');
        bindListener(socket, 'line');
        bindListener(socket, 'time');
        bindListener(socket, 'lose');
        bindListener(socket, 'anotherName');
        bindListener(socket, 'bottomLines');
        bindListener(socket, 'addTailLine');

        socket.on('disconnect', function (data) {
            if(socket.clientNum % 2 == 0){
                if(socketMap[socket.clientNum - 1]){
                    socketMap[socket.clientNum - 1].emit('leave');
                }
            }else{
                if(socketMap[socket.clientNum + 1]){
                    socketMap[socket.clientNum + 1].emit('leave');
                }
            }
            delete(socketMap[socket.clientNum]);
        });




        //login 聊天
        socket.on('login', function (data) {
            console.log("登录进来了", data);
            socket.username = data;
            if(userList.indexOf(data) < 0){
                userList.push(data);
            }
            io.emit("userList", userList);
            io.emit("userComeName", data);
        })
        //message
        socket.on('clientMessage', function (data) {
            console.log("进来的消息", data);
            var message = {
                name: socket.username,
                mes: data,
            }
            io.emit('serverMessage', message)
        });

        socket.on('disconnect', function () {
            var leaveName = socket.username;
            console.log(leaveName)
            io.emit("userLeaveName", leaveName)
            var index = userList.indexOf(leaveName);
            userList.splice(index, 1);
            console.log("userList", userList)
            io.emit("userLeave", userList)
        })

    });



};
