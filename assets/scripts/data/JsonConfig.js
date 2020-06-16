// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
let _instance = null
var JsonConfig = cc.Class({

    properties: {
        // //出生点配置
        // bornPointConfig_:{
        //     default:null,
        //     type:cc.JsonAsset
        // },
        // bornPointConfig:{
        //     get(){
        //         return this.bornPointConfig_;
        //     },
        //     set(value){
        //         this.bornPointConfig_ = value;
        //     }
        // },

        // // //ai配置
        // aiConfig_:{
        //     default:null,
        //     type:cc.JsonAsset
        // },
        // aiConfig:{
        //     get(){
        //         return this.aiConfig_;
        //     },
        //     // set(value){
        //     //     this.aiConfig_ = value;
        //     // }
        // },
        aiConfig_:[],
        bornPointConfig_:[],
        jsonIndex_:0,

        jsonRes_:[],

        jsonObjs_:[],

        //加载结束回调
        loadOverCallback_:{
            default:null
        }
    },

    // statics: {

    //     get instance()
    //     {
    //         if(!_instance){
    //             _instance = new JsonConfig();
    //         }
    //         return _instance;
    //     }
    // },
    recursiveLoadRes(resPath){
        var self = this;
        cc.loader.loadRes(resPath, function (err, object) {
            if (err) {
                console.log(err);
                return;
            }
            cc.log(object.name);
            self.jsonObjs_.push(object.json) //属性中定义的数组，此时向这数组添加个"config/pathes"
            self.jsonIndex_ ++; //属性中定义的数值，此时+1表示加载一个完成

            if(self.jsonIndex_ == self.jsonRes_.length){ //全部加载完成
                self.configLoaded();
                return;
            }

            self.recursiveLoadRes(self.jsonRes_[self.jsonIndex_]) //递归
        });
    },

    init(callback){ // game 1、进来第一次初始化
        this.loadOverCallback_ = callback; //设置回调，让加载完资源再开始游戏
        this.jsonRes_ = ["config/pathes", "config/bornPoint"]; //属性中初始化的一个数组，有两个字符串
        this.recursiveLoadRes(this.jsonRes_[this.jsonIndex_]); //属性中定义的数值0，用来索引数组，开始跌归加载
    },

    getAiConfig(){
        return this.aiConfig_;
    },

    getBornPointConfig(){
        return this.bornPointConfig_;
    },

    configLoaded(){
        cc.log("load over!!!!!");
        this.aiConfig_ = this.jsonObjs_[0];
        this.bornPointConfig_ = this.jsonObjs_[1];
        if(this.loadOverCallback_) this.loadOverCallback_(); //回调
    }
});

let instance_ = null;
JsonConfig.getInstance = function(){
    if (!instance_) {
        instance_ = new JsonConfig();
    }
    return instance_;
}

module.exports = JsonConfig;