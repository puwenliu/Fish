// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

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
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    // update (dt) {},

    fireAnim(){ //开火动画
        //先获得WeaponLayer类createCannon()创建的"entity"预制体对象
        //在获得这个预制体的动画脚本组件
        var anim = this.node.getChildByName("entity").getComponent(cc.Animation)
        anim.play("fire")

        //获得这个预制体的子节点(火花node)
        var spark = this.node.getChildByName("spark")
        spark.active = true
        anim = spark.getComponent(cc.Animation)
        var animState = anim.play("spark_1")
        if(animState){
            //当火花动画播放完，spark.active = false
            animState.on("finished", (event) => {
                spark.active = false;
            }, this);
        }
    }
});
