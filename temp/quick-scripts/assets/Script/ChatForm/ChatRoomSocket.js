(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/ChatForm/ChatRoomSocket.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '89496TsUbNOjaF1jA47znLH', 'ChatRoomSocket', __filename);
// Script/ChatForm/ChatRoomSocket.js

"use strict";

// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
var io = require('socket.io-client');
cc.Class({
    extends: cc.Component,

    properties: {
        avatar: cc.Sprite,
        nameUser: cc.Label,
        atlasImg: cc.SpriteAtlas
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        var jsonString = cc.sys.localStorage.getItem("playerData");
        this.userData = JSON.parse(jsonString);
        cc.log(this.userData);
        this.setAvatarName(this.userData.name, this.userData.imgName);
    },
    start: function start() {},

    setAvatarName: function setAvatarName(nameUser, imgName) {
        //cc.log(this.avatar.imageAtlas);
        //if (socketId !== this.socket.id) return;
        for (var x in this.atlasImg.getSpriteFrames()) {
            if (this.atlasImg.getSpriteFrames()[x].name === imgName) {
                this.avatar.spriteFrame = this.atlasImg.getSpriteFrames()[x];
            }
        }
        this.nameUser.string = nameUser;
    }

});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=ChatRoomSocket.js.map
        