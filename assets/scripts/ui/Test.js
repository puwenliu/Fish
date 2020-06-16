// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

var proto = require("../../proto/proto")
//var TKLobby = require("../../proto/TKLobby")
//var TKLobbyProtocol = TKLobby.cn.jj.service.msg.protocol
var ws = null;
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

        inputBox:{
            default:null,
            type:cc.EditBox
        },

        receiveTxt:{
            default:null,
            type:cc.Label
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        
    },

    // update (dt) {},

    onClickConnect(){
        ws = new WebSocket ("ws://192.168.20.240:4649/Echo");
        ws.onopen = function (event) {
            console.log("Send Text WS was opened.");
        };
        ws.onmessage = (event) => {
            console.log("response text msg: " + event.data);
            var self = this;
            if(cc.sys.platform == cc.sys.DESKTOP_BROWSER)
            {
                var reader = new FileReader();
                reader.readAsArrayBuffer(event.data);
                reader.onload = function(){
                    var buf = new Uint8Array(reader.result);
                    var data = proto.addressbook.Person.decode(buf)
                    if(data != null)
                    {
                        self.receiveTxt.string = data.name
                    }
                }
            }
            else if(event.data instanceof ArrayBuffer)
            {
                var buf = new Uint8Array(event.data);
                var data = proto.addressbook.Person.decode(buf)
                if(data != null)
                {
                    self.receiveTxt.string = data.name
                }
            }
        };
        ws.onerror = function (event) {
            console.log("Send Text fired an error");
        };
        ws.onclose = function (event) {
            console.log("WebSocket instance closed.");
        };
       
        setTimeout(function () {
            if (ws.readyState === WebSocket.OPEN) {
                ws.send("Hello WebSocket, I'm a text message.");
            }
            else {
                console.log("WebSocket instance wasn't ready...");
            }
        }, 3);
    },


    Uint8ArrayToString(fileData){
        var dataString = "";
        for (var i = 0; i < fileData.length; i++) {
        dataString += String.fromCharCode(fileData[i]);
        }
    
        return dataString
    },

    onClickSend(){
        wxDownloader
        cc.log(path)
        var person = proto.addressbook.Person.create()
        person.name = "wzw"
        person.id = 123
/*         var unit8Array = proto.addressbook.Person.encode(person).finish()
        var buffer = new ArrayBuffer(unit8Array.length)
        for(var i = 0; i < unit8Array.length; i ++)
        {
            buffer[i] = unit8Array[i]
        } */
        //var blob = new Blob([buffer]);
        //ws.send(buffer);

        var uint8Array = proto.addressbook.Person.encode(person).finish()
        ws.send(uint8Array.buffer.slice(uint8Array.byteOffset, uint8Array.byteLength + uint8Array.byteOffset));

        //var a = TKLobbyProtocol.LobbyReqMsg.create()
        //cc.log(a)
    },

    onClickHttp(){
        var url = "http://192.168.20.240:88/readme.txt"
        cc.loader.load(url,function (err,txt) {
            if(err)
            {
                cc.log(err.errorMessage)
                return
            }
            cc.log(txt)
        });

    },

    onClickSubpackage()
    {
        cc.loader.downloader.loadSubpackage('subpackage1', function (err) {
            if (err) {
                return cc.log(error);
            }
            console.log("sub package loaded...............222222222222222")
        });
    }
});
