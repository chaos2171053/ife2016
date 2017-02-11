define(function() {
    /**
     * 指挥官构造函数
     */
    var Commander = function(){
    // 判断是否存在指挥官实例
    if(typeof Commander.instance === 'object'){
        return Commander.instance;
    }

    this.name = "Chaos2171053";
    this.bus = null;

     // 缓存
     Commander.instance = this;

    // 隐式返回this
};

/**
 * 指挥官只能发送命令，且为单播模式
 * @param  {object} msg 指令
 */
Commander.prototype.send = function(msg) {
    this.bus.send(msg);
};

    return {
        Commander : Commander
        };
});