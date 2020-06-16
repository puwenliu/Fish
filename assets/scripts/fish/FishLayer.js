// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

var JsonConfig = require("../data/JsonConfig")
var MathUtil = require("../util/MathUtil")
var ConstDefine = require("../data/ConstDefine")
var NormalFish = require("NormalFish")
var FishDefine = require("FishDefine")
var WeaponLayer = require("WeaponLayer")

var FISH_STATE = ConstDefine.FISH_STATE
var DESIGN_WIDTH = ConstDefine.DESIGN_WIDTH
var DESIGN_HEIGHT = ConstDefine.DESIGN_HEIGHT

cc.Class({
    extends:cc.Component,
    
    properties: {
        aiConfig_:{
            default:null
        },

        bornPointConfig_:{
            default:null
        },

        activeFishes_:{
            default:null
        },

        unActiveFishes_:{
            default:null,
            type:Array
        },

        fishCnt_:0

    },

    onLoad(){
        this.init();
        
    },

    onCollisionEnter: function (other, self) {
        console.log(other);
    },

    init(){
        this.activeFishes_ = {}; //属性中初始化的一个值，现在给定义成数组   活跃的鱼
        this.unActiveFishes_ = {}; //属性中初始化的一个数组              不活跃的鱼

        this.schedule(function(){
            this.update3Second(); // 启动调度器（创建鱼）
        }, 0.3);

        this.aiConfig_ = JsonConfig.getInstance().getAiConfig(); //aiConfig_ = "config/pathes"
        this.bornPointConfig_ = JsonConfig.getInstance().getBornPointConfig();
    },

    createFish(){
        var index = MathUtil.random(0, 3)
        var config = FishDefine[index] //确定鱼种类的配置
        var path = "rawres/fish/" + index.toString() + "/" + config.moveAtlas //plist资源
        cc.loader.loadRes(path, cc.SpriteAtlas, (err, atlas) =>{ //开始加载
            var fish = null //定义这条鱼
            var fishCom = this.getUnActiveFish(index); // 获得不活跃的鱼(鱼一共分为4种)
            
            //------------------------ 如果没有不活跃的鱼，创建一条鱼，并且让 fishCom = 这条鱼
            //------------------------ 如果有不活跃的鱼，fishCom = 这条鱼
            if(fishCom == null){
                fish = new cc.Node(); //创建一条鱼的节点
                fish.name = "fish"
                fish.parent = this.node;

                var sprite = fish.addComponent(cc.Sprite); //添加一个精灵组件
                sprite.sizeMode = cc.Sprite.SizeMode.RAW; //精灵尺寸调整模式 (RAW自动适配为精灵原图尺寸\CUSTOM\TRIMMED)
                sprite.trim = false; //是否使用裁剪模式
                cc.loader.loadRes("prefabs/fish/xueqiu", cc.Prefab, (err, prefab) =>{
                    if (err) {
                        cc.error(err.message || err);
                        return;
                    } else {
                        var xueqiu = cc.instantiate(prefab); //创建炮台的预制体 cannon_1（instantiate 克隆指定的任意类型的对象）
                        xueqiu.parent = fish
                    }
                })
                var animation = fish.addComponent(cc.Animation); //添加一个动画组件
                var spriteFrames = atlas.getSpriteFrames();
                //使用一组精灵序列帧图片来创建动画剪辑
                var clip = cc.AnimationClip.createWithSpriteFrames(spriteFrames, config.moveFrameCnt);
                clip.wrapMode = cc.WrapMode.Loop; //动画的循环模式 Loop循环播放
                clip.name = "move"; //动画剪辑起名字
                animation.addClip(clip); //添加动画剪辑
                animation.play("move"); //播放名字move的动画剪辑
            }
            else
            {
                fish = fishCom.node // 获得不活跃的鱼的节点
            }
            
            //----------- 如果这条鱼没有这个则添加这个普通鱼NormalFish组件 ---------------
            //----------- 普通鱼NormalFish组件继承自fish类 ---------------
            //----------- fish类的update时刻监控recycleFish()回收利用鱼函数 ---------------
            //----------- recycleFish()回收利用鱼函数调用顺序 ---------------
            //1、FishLayer调度器检测鱼有没有出屏幕，出则把 鱼的状态变为unActive
            //1、fish类的update函数监控 鱼的状态 ，如果这条鱼状态是unActive，则调用FishLayer的recycleFish()回收利用鱼函数
            fishCom = fish.getComponent(NormalFish);
            if(fishCom == null){
                fishCom = fish.addComponent(NormalFish);
            }
            fishCom.fishLayer = this; //把fish类的fishLayer属性引用此FishLayer类
            fishCom.id = this.fishCnt_; //这种鱼的数量作为这条鱼的id，每0.5s调度器创建出一条鱼
            this.fishCnt_++;

            //--------------- 设置这条鱼的出生点和速度等 ---------------
            var length = this.bornPointConfig_.length;
            var born_index = MathUtil.random(0, length - 1);
            var bornPoint = this.bornPointConfig_[born_index];
            fish.setPosition(bornPoint.x, bornPoint.y);
            fishCom.baseSpeed = 100 //bornPoint.speed;

            var angle = 0;
            
            if(bornPoint.maxAngle - bornPoint.minAngle > 180){
                angle = MathUtil.random(bornPoint.maxAngle, bornPoint.minAngle + 360);
            }
            else{
                angle = MathUtil.random(bornPoint.minAngle, bornPoint.maxAngle);
            }
            fishCom.angle = angle;
            // fish.rotation = angle;
            fish.angle = angle;
            if(Math.cos(angle * Math.PI / 180) < 0)
            {
                var sprite = fish.getComponent(cc.Sprite);
                fish.scaleY = -1
            }

            //------------------ 鱼路线 ------------------------------
            length = this.aiConfig_.pathList.length; //aiConfig_ = "config/pathes" 目前有17个
            var index1 = MathUtil.random(0, length - 1);
            var ai = this.aiConfig_.pathList[index1]
            fishCom.ai = ai;
            fish.score = config.score
            fishCom.kind = index;
            fishCom.curLifeTime = 0;
            fishCom.updateAi();
            fishCom.setState(FISH_STATE.MOVE);
            fishCom.enabled = true;

            //------------------- 通过id（//这种鱼的数量作为这条鱼的id） 添加到活跃的鱼 --------------------
            this.activeFishes_[fishCom.id] = fishCom;
        })
    },

    update(dt){
        this.checkFishOutOfScreen(); //调度器检测鱼有没有出屏幕
    },

    update3Second(){
        var max = Object.keys(this.activeFishes_)
        if ( max.length > 20) return;
        this.createFish();
    },

    checkFishOutOfScreen(){ //调度器检测鱼有没有出屏幕 
        var x, y = 0;
        var element = null; // 待检查鱼
        var keys = Object.keys(this.activeFishes_); // Object.keys() 方法会返回一个由一个给定对象的自身可枚举属性组成的数组，数组中属性名的排列顺序和使用 for...in 循环遍历该对象时返回的顺序一致 。
        for(var i = 0; i < keys.length; i ++){
            element = this.activeFishes_[keys[i]];
            if (element.node.x < -100 || element.node.x > DESIGN_WIDTH + 100 || element.node.y < -100 || element.node.y > DESIGN_HEIGHT + 100) {
                element.setState(FISH_STATE.UNACTIVE); //这条鱼状态属性变为不活跃状态
            }
        }
    },

    recycleFish(fish){ //fish类update中如果fish对象状态是unActive，则调用这个函数
        delete this.activeFishes_[fish.id] //活跃鱼组按id去除
        if (this.unActiveFishes_[fish.kind] == null) { //不活跃鱼先检查4种鱼中这种种类存不存在，不存在就创建
            this.unActiveFishes_[fish.kind] = new Array();
        }
        this.unActiveFishes_[fish.kind].push(fish); //添加不活跃鱼
    },

    getUnActiveFish(kind){ //获得不活跃的鱼，如果不活跃鱼的表的表不是空
        if(this.unActiveFishes_[kind] && this.unActiveFishes_[kind].length > 0)
        {
            var fish = this.unActiveFishes_[kind][this.unActiveFishes_[kind].length - 1];
            //splice() 方法向/从数组中添加/删除项目，然后返回被删除的项目。
            //arrayObject.splice(index,howmany,item1,.....,itemX)
            //index 必需。整数，规定添加/删除项目的，使用负数可从数组结尾处规定位置。 例如index=2，就是说删除第3个位置的元素
            //howmany 必需。要删除的项目数量。如果设置为 0，则不会删除项目。 
            //item1, ..., itemX 可选。向数组添加的新项目。 
            //删除不活跃鱼表的最后那个鱼
            this.unActiveFishes_[kind].splice(this.unActiveFishes_[kind].length - 1, 1);
            
            return fish
        }
        return null;
    }

});
