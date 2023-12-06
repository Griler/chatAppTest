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
cc.Class({
    extends: cc.Component,

    properties: {
        avatar:cc.Sprite,
        nameUser:cc.Label,
        atlasImg:cc.SpriteAtlas
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        //Kết nối với máy chủ Socket.IO
        this.socket = io('http://localhost:4000');
        // Bắt sự kiện khi kết nối thành công
        this.socket.on('connect', () => {
            cc.log('Connected to server');
        });
        this.socket.on('userData', (e) => {
            this.userData = JSON.parse(e.message);
            cc.log(this.userData);
            this.setAvatarName(this.userData.name,this.userData.imgName)
        });
    },
    start () {
    },
    setAvatarName:function (nameUser,imgName) {
        //cc.log(this.avatar.imageAtlas);
        for (let x in this.atlasImg.getSpriteFrames()) {
            if (this.atlasImg.getSpriteFrames()[x].name === imgName) {
                this.avatar.spriteFrame = this.atlasImg.getSpriteFrames()[x];
            }
        }
        this.nameUser.string = nameUser;
    }
});
