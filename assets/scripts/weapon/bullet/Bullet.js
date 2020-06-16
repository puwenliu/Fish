// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
var MathUtil = require("../../util/MathUtil")

var Bullet = cc.Class({
    extends: cc.Component,

    properties: {
        vDir_ : cc.Vec2,
        dir:{
            get(){
                return this.vDir_;
            },
            set(value){
                this.vDir_ = value;
            }
        },

        degree_ : cc.Integer,
        degree:{
            get(){
                return this.degree_;
            },
            set(value)
            {
                this.degree_ = value;
                this.vDir_ = MathUtil.degreesToVectors(value)
            }
        },

        speed_ :  cc.Integer,
        speed:{
            get(){
                return this.speed_;
            },
            set(value){
                this.speed_ = value;
            }
        },

        length_ :{
            default:cc.Vec2.ZERO
        }
        
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    update (dt) {
        this.length_.x = 0;
        this.length_.y = 0;
        this.length_ = this.vDir_.mul(dt);
        this.node.x += this.length_.x * this.speed_;
        this.node.y += this.length_.y * this.speed_;
    },
});
