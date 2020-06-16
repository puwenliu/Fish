cc.Class({
    extends: cc.Component,

    properties: {
    },

    // use this for initialization
    onLoad: function () {
       
    },

    init (callBack) {

    },

    // contact 是碰撞对象,本次碰撞的信息
    // selfCollider: 是自己的碰撞器组件
    // otherCollider: 碰撞到的碰撞器组件;
    // 我们可以有碰撞器组件，来获取我们的碰撞的节点对象
    // 碰撞开始
    onCollisionEnter: function (selfCollider, otherCollider) {
        let WeaponLayer = this.node.parent.getComponent("WeaponLayer");
        WeaponLayer.callBack && WeaponLayer.callBack(selfCollider, otherCollider);
       
    },

    
});