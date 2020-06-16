'use strict';

module.exports = {
  load () {
    // execute when package loaded
  },

  unload () {
    // execute when package unloaded
  },

  // register your ipc messages here
  messages: {
    'open' () {
      // open entry panel registered in package.json
      Editor.Panel.open('borneditor');
    },
    'say-hello' () {
      Editor.log('Hello World!');
      // send ipc message to panel
      Editor.Ipc.sendToPanel('borneditor', 'borneditor:hello');
    },
    'clicked' () {
      var nodeID = Editor.Selection.curSelection('node');
      Editor.log('Button clicked!', nodeID);
      Editor.Ipc.sendToPanel(
        'scene',
        'scene:query-node',
        nodeID,
        ( err, nodeInfo ) => {
          Editor.log(nodeInfo)
          var nodeObj = JSON.parse(nodeInfo);
          Editor.log(nodeObj.value)
        }
      );

      Editor.Scene.callSceneScript('borneditor', 'get-canvas-children', function (err, length) {
        Editor.log(`get-canvas-children callback :  length - ${length}`);
      });
    }
  },
};