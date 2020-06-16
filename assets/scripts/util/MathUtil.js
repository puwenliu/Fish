// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

var MathUtil = {}

/**
 * 产生随机整数，包含下限值，包括上限值
 * @param {Number} lower 下限
 * @param {Number} upper 上限
 * @return {Number} 返回在下限到上限之间的一个随机整数
 */
MathUtil.random = function(lower, upper) {
    return Math.floor(Math.random() * (upper - lower+1)) + lower;
}


MathUtil.vectorsToDegress = function (dirVec) {
    let comVec = cc.v2(1, 0);    // 水平向右的对比向量
    let radian = dirVec.signAngle(vec);    // 求方向向量与对比向量间的弧度
    let degree = cc.misc.radiansToDegrees(radian);    // 将弧度转换为角度
    return degree;
}

MathUtil.degreesToVectors = function (degree) {
    let radian = cc.misc.degreesToRadians(degree);    // 将角度转换为弧度
    let comVec = cc.v2(1, 0);    // 一个水平向右的对比向量
    let dirVec = comVec.rotate(-radian);    // 将对比向量旋转给定的弧度返回一个新的向量
    return dirVec;
}

module.exports = MathUtil;