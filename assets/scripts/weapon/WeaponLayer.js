// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
var ConstDefine = require("../data/ConstDefine")
var TouchListener = require("../ui/TouchListener")
var Cannon = require("./cannon/Cannon")
var Bullet = require("./bullet/Bullet")
var FishLayer = require("../fish/FishLayer")
var CANNON_POS = ConstDefine.CANNON_POS
var NormalFish = require("NormalFish")

var FIRE_INTERVAL = 0.25
var FISH_STATE = ConstDefine.FISH_STATE
var DESIGN_WIDTH = ConstDefine.DESIGN_WIDTH
var DESIGN_HEIGHT = ConstDefine.DESIGN_HEIGHT

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        touchListener_:
        {
            default:null,
            type:TouchListener
        },

        FishLayer:
        {
            default:null,
            type:cc.Node
        },
        selfCannon_:{
            default:null
        },
        bulletCont: 0,
        fireTimer_:FIRE_INTERVAL,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.bulletArray = {}
        this.touchListener_ = TouchListener.getInstance(); //获得TouchListener类
        this.touchListener_.weaponLayer = this; //给TouchListener类的weaponLayer属性为weaponLayer类
        this.createCannon(); //创建炮台
    },

    start () {
        this.callBack = (cr1, cr2)=>{
            let com = cr1.node.parent.getComponent(NormalFish)
            com.setState(FISH_STATE.UNACTIVE); //这条鱼状态属性变为不活跃状态
            let score = cr1.node.parent.score
            this.game.gainScore(score)
            cr2.node.destroy();
            cr1.node.parent.destroy()
           
           
        }
    },

    touchEnd(){
        this.fireTimer_ = FIRE_INTERVAL //炮弹开火时间0.25
    },

    update (dt) {
        if(this.touchListener_.touchFlag){ //如果在触摸中
            var vec1 = this.touchListener_.touchPos.sub(CANNON_POS[0].add(cc.v2(0, ConstDefine.CANNON_CENTER_H)));
            var angle = -cc.Vec2.RIGHT.signAngle(vec1);
            var degree = 180 / Math.PI * angle;
            this.selfCannon_.node.setRotation(degree)

            this.fireTimer_ += dt; //开火 = 0.25 + dt
            if(this.fireTimer_ >= FIRE_INTERVAL){
                this.fireTimer_ -= FIRE_INTERVAL;  //开火 = 0.25 + dt - 0.25
                this.selfCannon_.fireAnim(); //炮台开火
                this.createBullet(degree); // 发射子弹
            }
        }
    },

    createCannon(){//这个炮台的预制体挂着fire开火动画脚本
        cc.loader.loadRes("prefabs/cannon/cannon_1", (err, prefab) => {
            var cannon = cc.instantiate(prefab); //创建炮台的预制体 cannon_1（instantiate 克隆指定的任意类型的对象）
            cannon.parent = this.node
            this.selfCannon_ = cannon.addComponent(Cannon) //给这个炮台的预制体 cannon_1添加炮台组件(有一个控制开火动画的函数)
            cannon.setPosition(CANNON_POS[0].add(cc.v2(0, ConstDefine.CANNON_CENTER_H)));
        })
    },

    createBullet(degree){
        let _this = this;
        cc.loader.loadRes("prefabs/bullet/bullet_1", (err, prefab) => {

            var bullet = cc.instantiate(prefab); //创建子弹的预制体
            var bulletCom = bullet.addComponent(Bullet) //给这个子弹的预制体添加炮弹脚本
            bullet.zIndex = -1
            bullet.setPosition(CANNON_POS[0].add(cc.v2(0, ConstDefine.CANNON_CENTER_H)));
            bullet.setRotation(degree);
            bulletCom.degree = degree;
            bulletCom.speed = 800;
            bullet.parent = this.node

        })
    },
    init(game){
        this.game = game
    },
    collisionEnterCallBack () {

    },
});
