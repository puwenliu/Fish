// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

var ConstDefine = {}

ConstDefine.DESIGN_WIDTH = 1280
ConstDefine.DESIGN_HEIGHT = 720
ConstDefine.FISH_MAX_NUM = 30
//鱼的状态
ConstDefine.FISH_STATE = {
    UNACTIVE: 1,
    MOVE: 2
}

//炮轴心距离底边的高度
ConstDefine.CANNON_CENTER_H = 50

ConstDefine.CANNON_POS = [
    new cc.Vec2(640, 0)
];

module.exports = ConstDefine;