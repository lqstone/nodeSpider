/**
 * Created by liuqiao on 2017/10/18.
 */
var socketio = require('socket.io');
var io;
var Users = require('./config.js')
var userList = [];
// 外部接口
exports.listen = function(server) {
    io = socketio(server);
    io.on('connection', function (socket) {
        //login
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
