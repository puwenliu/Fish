// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
cc.log("game started!!")
var JsonConfig = require("./data/JsonConfig")
var PlayView = require("./view/PlayView")
var ScoreFX = require("./score/ScoreFX");
var Game = cc.Class({
    extends: cc.Component,
     properties: {
        
        // playView_: {
        //     default: null,
        //     type: PlayView
        // },
        // playView: {
        //     get() {
        //         return this.playView_;
        //     },
        //     set(value) {
        //         this.playView_ = value;
        //     }
        // },
        
        Score:{
            default: null,
            type: cc.Label,
        },
        // _cur_score:cc.Integer,

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {

        // cc.log(this.jsjsjs + "232323232312");
        var self = this;
        Game.instance_ = this;
        JsonConfig.getInstance().init(function () {
            self.init() // 回调时调用
        });
        this.resetScore()
        var manager = cc.director.getCollisionManager();       //开启可碰撞检测
        manager.enabled = true;
        manager.enabledDebugDraw = true;
        this.scorePool = new cc.NodePool('ScoreFX');

    },

    start() {
    },

    resetScore: function () {
        this.score = 0;
        this.Score.string = 'Score: ' + this.score.toString();
    },

    gainScore: function (score,pos) {
        this.score += score;
        // 更新 scoreDisplay Label 的文字
        this.Score.string = 'Score: ' + this.score.toString();
        
        //  // 播放特效
        //  var fx = this.spawnScoreFX();
        //  this.node.addChild(fx.node);
        //  fx.node.setPosition(pos);
        //  fx.play();
    },
    spawnScoreFX: function () {
        var fx;
        if (this.scorePool.size() > 0) {
            fx = this.scorePool.get();
            return fx.getComponent('ScoreFX');
        } else {
            fx = cc.instantiate(this.scoreFXPrefab).getComponent('ScoreFX');
            fx.init(this);
            return fx;
        }
    },

    despawnScoreFX (scoreFX) {
        this.scorePool.put(scoreFX);
    },
    update(dt) {

    },

    //初始化
    init() {
        this.playView_ = new cc.Node("PlayView"); // 创建PlayView节点
        this.playView_.parent = this.node;
        this.playView_.setPosition(-640, -360);
        this.playView_.addComponent(PlayView);
        this.playView_.getChildByName("WeaponLayer").getComponent("WeaponLayer").init(this)
    }
});

Game.instance_ = null;
Game.getInstance = function(){
    return Game.instance_;
}

module.exports = Game;