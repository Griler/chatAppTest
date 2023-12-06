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
        labelPrefab: cc.Prefab
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
    },
    start() {

    },
    createTextChat(){
        for (let i = 0; i < 10; i++) {
            const labelNode = cc.instantiate(this.labelPrefab);
            const labelComponent = labelNode.getComponent(cc.Label);
            labelComponent.string = `${i*100} `;
            labelComponent.cacheMode = 2;
            labelComponent.fontSize = 18;
            labelNode.position = cc.v2(0, 0);
            this.node.addChild(labelNode);
        }
    }
    // update (dt) {},
});
