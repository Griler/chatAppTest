(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/ChatForm/Test.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '45e9e5QGYhEpLDhmzs5qpt+', 'Test', __filename);
// Script/ChatForm/Test.js

'use strict';

var io = require('socket.io-client');
var socket = void 0;
function createSoketIo() {
    socket = io('https://serverchat-om1r.onrender.com');
    return socket;
}
module.exports = {
    createSoketIo: createSoketIo
};

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
        //# sourceMappingURL=Test.js.map
        