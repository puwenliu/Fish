// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

var FishDefine = {
    [0] : {
        "moveAtlas" : "dieyu_move",
        "moveFrameCnt" : 8,
        "score" : 1
    },
    [1] : {
        "moveAtlas" : "xiahuyu_move",
        "moveFrameCnt" : 12,
        "score" : 5
    },
    [2] : {
        "moveAtlas" : "xiangtun_move",
        "moveFrameCnt" : 10,
        "score" : 10
    },
    [3] : {
        "moveAtlas" : "tuziyu_move",
        "moveFrameCnt" : 12,
        "score" : 12
        
    }
}

module.exports = FishDefine;