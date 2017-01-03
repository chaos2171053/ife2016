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