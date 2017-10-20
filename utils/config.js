/**
 * Created by liuqiao on 2017/10/19.
 */
var nameList = [];
exports.addUser = function (name) {
    nameList.push(name);
};
exports.judgeUser = function (name) {
    var index = nameList.indexOf(name);
    if(index > 0){
        return true;
    }
    return false;
};
exports.exitUser = function (name) {
    var index = nameList.indexOf(name);
    if(index > 0){
        nameList(index, 1);
    }
};
exports.userList = function () {
    return nameList;
};