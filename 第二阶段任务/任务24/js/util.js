/**
 * 获取节点
 * @param  {string} argument HTML节点id
 * @return {obj}          HTML节点
 */
function $(argument) {
      return document.getElementById(argument);
 }

/**
 * 事件监听
 * @param {HTMLObject} element object
 * @param {string} type    事件类型
 * @param {function} handler 处理方法
 */
function addEventHandler(element,type,handler){
   if(element.addEventListener){
     element.addEventListener(type,handler,false);
   }else if(element.attachEvent){
     element.attachEvent('on'+type,handler);
   }else{
     element['on'+type]=handler;
   }
 }

 /**
  * 去除首尾空格
  * @param  {string} str 字符串
  * @return {string}     字符串
  */
 function trim(str){
 	return str.replace(/(^\s*)|(\s*$)/g,"");
 }


 /**
 * 事件代理
 * @param  {[type]} element   [description]
 * @param  {[type]} tag       [description]
 * @param  {[type]} eventName [description]
 * @param  {[type]} listener  [description]
 * @return {[type]}           [description]
 */
function delegateEvent(element, tag, eventName, listener) {
   addEventHandler(element, eventName, function (e) {
        var event = e || window.event;
        var target = event.target || event.srcElement;

        if (target && target.tagName === tag.toUpperCase()) {
            listener.call(target, event);
        }
    });
}