(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/LoginForm/LoginForm.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'ad105GH8bdOBaHlbv2Tgm64', 'LoginForm', __filename);
// Script/LoginForm/LoginForm.js

'use strict';

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
        editBoxName: cc.EditBox,
        avatar: cc.Sprite
    },
    onLoad: function onLoad() {
        this.playerData = {
            name: '',
            imgName: ''
        };
        this.warningLabel = this.node.getChildByName("WarningLabel");
    },
    start: function start() {},
    checkNameEditBox: function checkNameEditBox() {
        if (this.editBoxName.string === '') {
            this.warningLabel.active = true;
            this.warningLabel.getComponent(cc.Label).string = "Please Input Name";
        } else {
            this.playerData.name = this.editBoxName.string;
            this.playerData.imgName = this.avatar.spriteFrame;
            this.warningLabel.active = false;
            /*            cc.log(this.player.name);
                        cc.log(this.player.imgName);*/
        }
    },
    loginButton: function loginButton() {
        if (this.editBoxName.string === '') {
            this.warningLabel.active = true;
            this.warningLabel.getComponent(cc.Label).string = "Please Input Name";
        } else {
            this.playerData.imgName = this.avatar.spriteFrame.name;
            this.jsonString = JSON.stringify(this.playerData);
            cc.log(this.jsonString);
            cc.sys.localStorage.setItem('playerData', this.jsonString);
            var chatRoom = this.node.parent.parent.getChildByName("ChatRoom");
            chatRoom.active = true;
            this.node.parent.active = false;
        }
    }
    // update (dt) {},

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
        //# sourceMappingURL=LoginForm.js.map
        