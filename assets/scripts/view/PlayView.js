// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

var FishLayer = require("../fish/FishLayer")
var WeaponLayer = require("../weapon/WeaponLayer")

cc.Class({
    extends: cc.Component,

    properties: {
        fishLayer_:{
            default:null,
            type:FishLayer,
        },
        fishLayer:{
            get(){
                return this.fishLayer_;
            }
        },

        weaponLayer_:{
            default:null,
            type:WeaponLayer
        },
        weaponLayer:{
            get(){
                return this.weaponLayer_;
            }
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.init(); // 初始化界面
    },

    start () {
        
    },

    // update (dt) {},

    init(){
        this.initFishLayer(); //初始化鱼
        this.initWeaponLayer();
    },

    initFishLayer(){
        var fishLayerNode = new cc.Node("FishLayer");
        this.fishLayer_ = fishLayerNode.addComponent(FishLayer);
        fishLayerNode.parent = this.node
    },

    initWeaponLayer(){
        var weaponLayerNode = new cc.Node("WeaponLayer");
        this.weaponLayer_ = weaponLayerNode.addComponent(WeaponLayer);
        weaponLayerNode.parent = this.node;
    }
});
