(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/ChatForm/RoomChatManager.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '7a067hKIEJHaKxfMn4Id7Hw', 'RoomChatManager', __filename);
// Script/ChatForm/RoomChatManager.js

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
var io = require('Test');
var constants = require("constants");
cc.Class({
    extends: cc.Component,

    properties: {
        chatEditBox: cc.EditBox,
        chatTextLayout: cc.Prefab,
        chatTextLayoutFriend: cc.Prefab,
        labelPrefab: cc.Prefab,
        srcollViewChat: cc.ScrollView,
        atlasImg: cc.SpriteAtlas
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        var _this = this;

        this.socket = io.createSoketIo();
        this.wordsInMessage;
        this.data = {
            imgNameData: "",
            nameUserData: "",
            chatMessage: "",
            socketId: ""
        };
        this.socket.on('chatMessage', function (e) {
            cc.log(_this.socket.id);
            cc.log(e);
            _this.chatData = JSON.parse(e.message);
            _this.createChatTextFriend(_this.chatData.nameUserData, _this.chatData.imgNameData, _this.chatData.chatMessage, _this.chatData.socketId);
        });
    },
    sendMessageToServer: function sendMessageToServer() {
        var nameUser = this.node.getChildByName('AvatarLayout').getChildByName("Name").getComponent(cc.Label).string;
        var imgName = this.node.getChildByName('AvatarLayout').getChildByName("Avatar").getComponent(cc.Sprite).spriteFrame.name;
        this.data.imgNameData = imgName;
        this.data.nameUserData = nameUser;
        this.data.chatMessage = this.chatEditBox.string;
        this.data.socketId = this.socket.id;
        var jsonString = JSON.stringify(this.data);
        if (this.chatEditBox.string !== '') {
            this.socket.emit('chatMessage', { message: jsonString });
            this.chatEditBox.blur();
            this.chatEditBox.focus();
        }
    },
    setFocus: function setFocus() {
        this.chatEditBox.focus();
    },
    createChatText: function createChatText() {
        if (this.chatEditBox.string !== '') {
            this.wordsInMessage = this.chatEditBox.string.split(" ");
            var chatTextNode = cc.instantiate(this.chatTextLayout);
            chatTextNode.getChildByName('Info').getChildByName("Avatar").getComponent(cc.Sprite).spriteFrame = this.node.getChildByName('AvatarLayout').getChildByName("Avatar").getComponent(cc.Sprite).spriteFrame;
            chatTextNode.getChildByName('ChatString').getChildByName("Name").getComponent(cc.Label).string = this.node.getChildByName('AvatarLayout').getChildByName("Name").getComponent(cc.Label).string;
            for (var index = 0; index < this.wordsInMessage.length; index++) {
                {
                    var labelNode = cc.instantiate(this.labelPrefab);
                    var labelComponent = labelNode.getComponent(cc.Label);
                    labelComponent.string = this.wordsInMessage[index] + " ";
                    labelNode.position = cc.v2(150, 0);
                    labelNode.angle = cc.v2(0, 0);
                    labelNode.setParent(chatTextNode.getChildByName("ChatString").getChildByName("chatText"));
                }
            }
            chatTextNode.setParent(this.srcollViewChat.content);
            //this.node.addChild(chatTextNode);
            this.chatEditBox.string = '';
            this.srcollViewChat.scrollToBottom();
        }
    },

    // update (dt) {},
    createChatTextFriend: function createChatTextFriend(nameUserData, imgNameData, chatMessage, soketID) {
        if (soketID !== this.socket.id) {
            cc.log("hello1");
            this.wordsInMessage = chatMessage.split(" ");
            var chatTextNode = cc.instantiate(this.chatTextLayoutFriend);
            chatTextNode.getChildByName('Info').getChildByName("Avatar").getComponent(cc.Sprite).spriteFrame = this.setAvatar(imgNameData);
            chatTextNode.getChildByName('ChatString').getChildByName("Name").getComponent(cc.Label).string = nameUserData;
            for (var index = 0; index < this.wordsInMessage.length; index++) {
                {
                    var labelNode = cc.instantiate(this.labelPrefab);
                    var labelComponent = labelNode.getComponent(cc.Label);
                    labelComponent.string = this.wordsInMessage[index] + " ";
                    labelNode.position = cc.v2(150, 0);
                    labelNode.angle = cc.v2(0, 0);
                    labelNode.setParent(chatTextNode.getChildByName("ChatString").getChildByName("chatText"));
                }
            }
            chatTextNode.setParent(this.srcollViewChat.content);
            //this.node.addChild(chatTextNode);
            this.chatEditBox.string = '';
            this.srcollViewChat.scrollToBottom();
        }
    },

    setAvatar: function setAvatar(imgName) {
        //cc.log(this.avatar.imageAtlas);
        for (var x in this.atlasImg.getSpriteFrames()) {
            if (this.atlasImg.getSpriteFrames()[x].name === imgName) {
                return this.atlasImg.getSpriteFrames()[x];
            }
        }
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
        //# sourceMappingURL=RoomChatManager.js.map
        