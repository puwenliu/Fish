// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

var TouchListener = cc.Class({
    extends: cc.Component,

    properties: {
        label_:{
            default:null,
            type:cc.Node
        },

        touchPos_:{
            default:cc.Vec2.ZERO,
        },
        touchPos:{
            get(){
                return this.touchPos_;
            },
            set(value){
                this.touchPos_ = value;
            }
        },

        touchFlag_:{
            default:false
        },
        touchFlag:{
            get(){
                return this.touchFlag_;
            },
            set(value){
                this.touchFlag_ = value;
            }
        },

        weaponLayer_:{
            default:null
        },
        weaponLayer:{
            set(value){
                this.weaponLayer_ = value;
            }
        }
    },

    onLoad () {
        TouchListener.instance_ = this;  //初始化instance_为此touch类
    },

    start () { //注册监听
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStartCallback, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEndCallback, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEndCallback, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMoveCallback, this);
    },

    onTouchStartCallback(event){
        this.touchFlag = true; //触摸中
        var location = event.getLocation();
        var p = this.node.convertTouchToNodeSpace(event) //获得相对于炮台的触摸点
        this.touchPos_.x = p.x;
        this.touchPos_.y = p.y;
    },

    onTouchEndCallback(event){
        this.touchFlag = false; //触摸结束
        if(this.weaponLayer_){ //this.weaponLayer_没在TouchListener类中初始化
            this.weaponLayer_.touchEnd(); //触摸结束 调用weaponLayer类的touchEnd()函数,使fireTimer开火时间初始化为0.25
        }
    },

    onTouchMoveCallback(event){
        var location = event.getLocation();
        var p = this.node.convertTouchToNodeSpace(event)
        this.touchPos_.x = p.x;
        this.touchPos_.y = p.y;
    }
});


TouchListener.instance_ = null; //定义instance_属性
TouchListener.getInstance = function(){
    return TouchListener.instance_;
}

module.exports = TouchListener;