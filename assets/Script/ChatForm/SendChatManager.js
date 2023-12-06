// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
const io = require('socket.io-client');
const constants = require("constants");
cc.Class({
    extends: cc.Component,

    properties: {
        chatEditBox: cc.EditBox,
        chatText: cc.Prefab,
        labelPrefab: cc.Prefab,
        srcollViewChat: cc.ScrollView,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.wordsInMessage;
        this.data = {
            imgNameData: "",
            nameUserData: "",
            chatMessage: ""
        }
    },
    start() {
    },
    sendMessageToServer() {
        const nameUser = this.node.getChildByName('AvatarLayout')
            .getChildByName("Name").getComponent(cc.Label).string;
        const imgName = this.node.getChildByName('AvatarLayout')
            .getChildByName("Avatar").getComponent(cc.Sprite).spriteFrame.name;
        this.data.imgNameData = imgName;
        this.data.nameUserData = nameUser;
        this.data.chatMessage = this.chatEditBox.string;
        cc.log(this.data);
        let jsonString = JSON.stringify(this.data);
        cc.log(jsonString);
        this.socket = io('http://localhost:4000');
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
            cc.log("create");
            cc.log(this.chatEditBox.string);
            const chatTextNode = cc.instantiate(this.chatText);
            chatTextNode.getChildByName('Info')
                .getChildByName("Avatar").getComponent(cc.Sprite).spriteFrame =
                this.node.getChildByName('AvatarLayout')
                    .getChildByName("Avatar").getComponent(cc.Sprite).spriteFrame
            chatTextNode.getChildByName('Info')
                .getChildByName("Name").getComponent(cc.Label).string =
                this.node.getChildByName('AvatarLayout')
                    .getChildByName("Name").getComponent(cc.Label).string
            for (let index = 0; index < this.wordsInMessage.length; index++) {
                {
                    const labelNode = cc.instantiate(this.labelPrefab);
                    const labelComponent = labelNode.getComponent(cc.Label);
                    labelComponent.string = `${this.wordsInMessage[index]} `;
                    labelComponent.cacheMode = 2;
                    labelComponent.fontSize = 15;
                    labelComponent.lineHeight = 15;
                    //labelComponent.overflow = 3;
                    labelNode.position = cc.v2(150, 0);
                    labelNode.angle = cc.v2(0, 0);
                    labelNode.setParent(chatTextNode.getChildByName("chatText"));
                }
            }
            chatTextNode.setParent(this.srcollViewChat.content);
            //this.node.addChild(chatTextNode);
            this.chatEditBox.string = '';
            this.srcollViewChat.scrollToBottom(0.005);
        }
    },
    // update (dt) {},
});
