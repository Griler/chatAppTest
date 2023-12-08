// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
const io = require('../ChatForm/Test');
cc.Class({
    extends: cc.Component,
    properties: {
        editBoxName: cc.EditBox,
        avatar: cc.Sprite
    },
    onLoad() {
        this.playerData = {
            name: '',
            imgName: ''
        }
        this.warningLabel = this.node.getChildByName("WarningLabel");
    },
    start() {

    },
    checkNameEditBox() {
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
    loginButton() {
        if (this.editBoxName.string === '') {
            this.warningLabel.active = true;
            this.warningLabel.getComponent(cc.Label).string = "Please Input Name";
        } else {
            this.playerData.imgName = this.avatar.spriteFrame.name;
            this.jsonString = JSON.stringify(this.playerData);
            cc.log(this.jsonString);
            cc.sys.localStorage.setItem('playerData', this.jsonString);
            const chatRoom = this.node.parent.parent.getChildByName("ChatRoom");
            chatRoom.active = true;
            this.node.parent.active = false;
        }
    }
    // update (dt) {},
});
