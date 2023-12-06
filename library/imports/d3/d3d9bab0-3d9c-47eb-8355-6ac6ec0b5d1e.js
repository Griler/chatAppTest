"use strict";
cc._RF.push(module, 'd3d9bqwPZxH64NVasbsC10e', 'ButtonManager');
// Script/ButtonManager.js

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

cc.Class({
    extends: cc.Component,

    properties: {
        avatar: cc.Sprite,
        avatarGrid: cc.Layout
    },
    start: function start() {},
    onClickShowGridAva: function onClickShowGridAva() {
        if (!this.avatarGrid.node.active) this.avatarGrid.node.active = true;else this.avatarGrid.node.active = false;
    },
    onClickChangeImg: function onClickChangeImg() {
        this.avatar.spriteFrame = this.node.getComponent(cc.Sprite).spriteFrame;
    }
});

cc._RF.pop();