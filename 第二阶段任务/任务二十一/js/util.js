/**
 * @param {object} element element object
 * @param {string} type 事件
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
 * @param {object} element element object
 * @param {string} type 事件
 * @param {function} handler 处理方法
 */
 function removeHandler(element,type,handler){
   if(element.removeEventListener){
     element.removeEventListener(type,handler,false);
   }else if(element.detachEvent){
     element.detachEvent('on'+type,handler);
   }else{
     element['on'+type]=null;
   }
 }

/**
 * @param {string} argument 标签的id或者classname
 * @param  {string} type 获取的是id还是classname
 * @return {<HTMLElement>} 返回匹配的元素
 */
 function $(argument,type) {
  switch (type){
    case "id":{
      return document.getElementById(argument);
      break;
    }
    case "className":{
      return document.getElementsByClassName(argument);
      break;
    }
    case "tagName":{
      return document.getElementsByTagName(argument);
      break;
    }

  }
 }

/**
 * 获取对象
 * @param  {[type]} event [description]
 * @return {[type]}       [description]
 */
 function getEvent(event){
  return event?event:window.event;
}

/**
 * 判断对象类别
 * @param  {[type]} event [description]
 * @return {[type]}       [description]
 */
function getType(event){
  return event.type;
}

/**
 * 获取点击的对象
 * @param  {[type]} event [description]
 * @return {[type]}       [description]
 */
function getElement(event){
  return event.target || event.srcElement;
}

/**
 * 阻止默认事件
 * @param  {[type]} event [description]
 * @return {[type]}       [description]
 */
function preventDefault(event){
  if(event.preventDefault){
    event.preventDefault();
  }else{
    event.returnValue=false;
  }
}

/**
 * 防止冒泡
 * @param  {[type]} event [description]
 * @return {[type]}       [description]
 */
function stopPropagation(event){
 if(event.stopPropagation){
   event.stopPropagation();
 }else{
   event.cancelBubble=true;
 }
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


/**
 * 去除首尾空格
 * @param  {string} word 字符串
 * @return {string}     字符串
 */
function trim(word) {
    return word.replace(/^\s+|\s+$/g,"");
}
