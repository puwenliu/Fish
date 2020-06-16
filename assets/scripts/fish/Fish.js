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

var FISH_STATE = ConstDefine.FISH_STATE

var SECOND_ONE_FRAME = 0.03

cc.Class({
    extends: cc.Component,

    properties: {
        id_:{
            default:0
        },
        id:{
            get(){
                return this.id_;
            },
            set(value){
                this.id_ = value;
            }
        },

        kind_:{
            default:0
        },
        kind:{
            get(){
                return this.kind_;
            },
            set(value){
                this.kind_ = value;
            }
        },

         //游动速度
        speed_:{
            default: 0,
            
        },
        speed:{
            get() {
                return this.speed_
            },
            set(value) {
                this.speed_ = value;
            }
        },

        //基准速度
        baseSpeed_:{
            default:0
        },
        baseSpeed:{
            get(){
                return this.baseSpeed_;
            },
            set(value){
                this.baseSpeed_ = value;
            }
        },
        
        //角度(顺时针为正)
        angle_: {
            default: 0,
        },
        angle:{
            get() {
                return this.angle_;
            },
            set(value) {
                this.angle_ = value;
            }
        },

        //当前生命时长
        curLifeTime_: {
            default: 0,
        },
        curLifeTime:{
            get(){
                return this.curLifeTime_;
            },
            set(value){
                this.curLifeTime_ = value;
            }
        },

        //上一帧生命时长
        lastFrameLifeTime_:{
            default: 0,
        },
        lastFrameLifeTime:{
            get(){
                return this.lastFrameLifeTime_;
            },
            set(value){
                this.lastFrameLifeTime_ = value;
            }
        },

        //出生时间
        bornTime_:{
            default: 0,
        },
        bornTime:{
            get(){
                return this.bornTime_;
            },
            set(value){
                this.bornTime_ = value;
            }
        },

        //ai配置
        ai_:{
            default:null,
        },
        ai:{
            get(){
                return this.ai_;
            },
            set(value){
                this.ai_ = value;
            }
        },

        //状态
        state_:{
            default:FISH_STATE.UNACTIVE
        },
        state:{
            get(){
                return this.state_;
            },
            set(value){
                this.state_ = value;
            }
        },

        //下一个ai时间点，到这个时间点后，需要切换aiStep，更新角速度，及速度倍数
        nextAiTime_:{
            default:-1
        },

        //当前ai角速度
        angleV_:{
            default:0
        },

        //帧时间累加量，大于等于SECOND_ONE_FRAME则执行一次游动
        frameTime_:{
            default:0
        },

        //路径是否走完标记
        pathOverFlag_:false,

        fishLayer_:{
            default:null
        },
        fishLayer:{
            set(value){
                this.fishLayer_ = value;
            }
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.reset();
    },

    start () {

    },

    reset(){
        this.frameTime_ = 0;
        this.nextAiTime_ = -1;
        this.curLifeTime_ = 0;
        this.pathOverFlag_ = false
    },

    update (dt) {
        switch(this.state_){
            case FISH_STATE.MOVE:
                this.updateMove(dt);
                break;
            case FISH_STATE.UNACTIVE:
                this.updateUnactive();
                break;
            default:
                break;
        }
    },

    updateMove(dt){
        if(this.ai_ == null) return;
        
        //不足一个SECOND_ONE_FRAME时长，直接返回
        this.frameTime_ += dt;
        if(this.frameTime_ < SECOND_ONE_FRAME) return;
        var cnt = Math.floor(this.frameTime_ / SECOND_ONE_FRAME)
        this.frameTime_ -= cnt * SECOND_ONE_FRAME;
        
        for (var index = 0; index < cnt; index++) {
            this.move();
            this.curLifeTime_ += SECOND_ONE_FRAME; 
            if (this.pathOverFlag_ == false && this.curLifeTime_ >= this.nextAiTime_) {
                this.updateAi();
            }
        }
    },

    updateAi(){
        if(this.ai_ == null)
        {
            cc.log("invalid ai");
        }

        var t = 0;
        this.pathOverFlag_ = true;
        for (let index = 0; index < this.ai_.pointList.length; index++) {
            const element = this.ai_.pointList[index];
            t += element.time;
            this.nextAiTime_ = t;
            this.speed_ = element.speedScale * this.baseSpeed_;
            this.angleV_ = element.r / element.time;
            if (t >= this.curLifeTime_) {
                this.pathOverFlag_ = false;
                break;
            }
        }
    },

    move(){
        //注意：先移动再旋转，前后端要一致！！！！！！！！！！！！！！！！
        this.node.x += Math.cos(-Math.PI / 180 * this.angle_) * this.speed_ * SECOND_ONE_FRAME;
        this.node.y += Math.sin(-Math.PI / 180 * this.angle_) * this.speed_ * SECOND_ONE_FRAME;
        this.angle_ += this.angleV_ * SECOND_ONE_FRAME;
        this.node.angle = this.angle_;
    },

    setState(state){
        this.state_ = state;
        switch(this.state_){
            case FISH_STATE.UNACTIVE:
                this.unactiveState();
                break;
            case FISH_STATE.MOVE:
                this.moveState();
                break;
        }
    },

    unactiveState(){
        this.reset();
    },

    moveState(){

    },

    updateUnactive(){
        this.enabled = false;
        this.fishLayer_.recycleFish(this);
    }
});
