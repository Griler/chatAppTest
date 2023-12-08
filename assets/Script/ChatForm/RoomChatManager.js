// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
const io = require('Test');
const constants = require("constants");
cc.Class({
    extends: cc.Component,

    properties: {
        chatEditBox: cc.EditBox,
        chatTextLayout: cc.Prefab,
        chatTextLayoutFriend: cc.Prefab,
        labelPrefab: cc.Prefab,
        srcollViewChat: cc.ScrollView,
        atlasImg:cc.SpriteAtlas
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.socket = io.createSoketIo();
        this.wordsInMessage;
        this.data = {
            imgNameData: "",
            nameUserData: "",
            chatMessage: "",
            socketId: "",
        }
        this.socket.on('chatMessage', (e) => {
            cc.log(this.socket.id)
            cc.log(e);
            this.chatData = JSON.parse(e.message);
                this.createChatTextFriend(this.chatData.nameUserData, this.chatData.imgNameData,
                this.chatData.chatMessage, this.chatData.socketId)
        });
    },
    sendMessageToServer() {
        const nameUser = this.node.getChildByName('AvatarLayout')
            .getChildByName("Name").getComponent(cc.Label).string;
        const imgName = this.node.getChildByName('AvatarLayout')
            .getChildByName("Avatar").getComponent(cc.Sprite).spriteFrame.name;
        this.data.imgNameData = imgName;
        this.data.nameUserData = nameUser;
        this.data.chatMessage = this.chatEditBox.string;
        this.data.socketId = this.socket.id;
        let jsonString = JSON.stringify(this.data);
        if (this.chatEditBox.string !== '') {
            this.socket.emit('chatMessage',
                {message: jsonString});
            this.chatEditBox.blur();
            this.chatEditBox.focus();
        }
    },
    setFocus() {
        this.chatEditBox.focus();
    },
    createChatText() {
        if (this.chatEditBox.string !== '') {
            this.wordsInMessage = this.chatEditBox.string.split(" ");
            const chatTextNode = cc.instantiate(this.chatTextLayout);
            chatTextNode.getChildByName('Info')
                .getChildByName("Avatar").getComponent(cc.Sprite).spriteFrame =
                this.node.getChildByName('AvatarLayout')
                    .getChildByName("Avatar").getComponent(cc.Sprite).spriteFrame;
            chatTextNode.getChildByName('ChatString')
                .getChildByName("Name").getComponent(cc.Label).string =
                this.node.getChildByName('AvatarLayout')
                    .getChildByName("Name").getComponent(cc.Label).string
            for (let index = 0; index < this.wordsInMessage.length; index++) {
                {
                    const labelNode = cc.instantiate(this.labelPrefab);
                    const labelComponent = labelNode.getComponent(cc.Label);
                    labelComponent.string = `${this.wordsInMessage[index]} `;
                    labelNode.position = cc.v2(150, 0);
                    labelNode.angle = cc.v2(0, 0);
                    labelNode.setParent(chatTextNode.getChildByName("ChatString")
                        .getChildByName("chatText"));
                }
            }
            chatTextNode.setParent(this.srcollViewChat.content);
            //this.node.addChild(chatTextNode);
            this.chatEditBox.string = '';
            this.srcollViewChat.scrollToBottom();
        }
    },
    // update (dt) {},
    createChatTextFriend(nameUserData, imgNameData, chatMessage, soketID) {
        if (soketID !== this.socket.id) {
            cc.log("hello1");
            this.wordsInMessage = chatMessage.split(" ");
            const chatTextNode = cc.instantiate(this.chatTextLayoutFriend);
            chatTextNode.getChildByName('Info')
                .getChildByName("Avatar")
                .getComponent(cc.Sprite)
                .spriteFrame = this.setAvatar(imgNameData);
            chatTextNode.getChildByName('ChatString')
                .getChildByName("Name").getComponent(cc.Label).string = nameUserData;
            for (let index = 0; index < this.wordsInMessage.length; index++) {
                {
                    const labelNode = cc.instantiate(this.labelPrefab);
                    const labelComponent = labelNode.getComponent(cc.Label);
                    labelComponent.string = `${this.wordsInMessage[index]} `;
                    labelNode.position = cc.v2(150, 0);
                    labelNode.angle = cc.v2(0, 0);
                    labelNode.setParent(chatTextNode.getChildByName("ChatString")
                        .getChildByName("chatText"));
                }
            }
            chatTextNode.setParent(this.srcollViewChat.content);
            //this.node.addChild(chatTextNode);
            this.chatEditBox.string = '';
            this.srcollViewChat.scrollToBottom();
        }
    },
    setAvatar: function (imgName) {
        //cc.log(this.avatar.imageAtlas);
        for (let x in this.atlasImg.getSpriteFrames()) {
            if (this.atlasImg.getSpriteFrames()[x].name === imgName) {
                return this.atlasImg.getSpriteFrames()[x];
            }
        }
    },


});
