# 行星与飞船
在自学前端完成百度前端学院2016第二阶段任务中，在任务要求的基础上，实现的小游戏。

## Introdution

* [遇到的问题及解决方法](https://github.com/chaos2171053/ife2016)
* [在线 demo](https://chaos2171053.github.io/ife2016/%E7%AC%AC%E4%BA%8C%E9%98%B6%E6%AE%B5%E4%BB%BB%E5%8A%A1/%E4%BB%BB%E5%8A%A128/task28.html)


## Technology Stack
- JavaScript
- CSS
- HTML
- Canvas
- requireJS

## Details

* **模块化**
    
    使用 requireJS 模块化 JavaScript 代码。

* **模拟真实太空环境**

    1、指挥官可以选择不同能源系统、动力系统的飞船；<br>
    2、飞船可以自己充电、放电；<br>
    3、飞船和行星之间通过介质Bus传播，模拟了丢包率为10%；<br>
    4、模拟信号传输格式为二进制，飞船和指挥中心有各自的编码、解码系统；<br>
    5、指挥官发送的指令为广播形式，飞船发送自己的状态为单播形式。
    

    
    


