module.exports = {
    'get-canvas-children': function (event) {
        var background = cc.find('Canvas/background');
        var bornPoints = new Array()
        var childCnt = Math.floor( background.childrenCount / 2 )
        for(var i = 1; i <= childCnt; i ++)
        {
            //begin arrow
            var bA = background.getChildByName("arrow" + i);
            //end arrow
            var eA = background.getChildByName("arrow" + i + "_");
            if(bA && eA)
            {
                //全部变换到-180->180范围内
                var a = Math.min(bA.rotation, eA.rotation);
                var b = Math.max(bA.rotation, eA.rotation);
                a = a % 360;
                b = b % 360;
                if(a <= -180){
                    a += 360;
                }
                else if(a >= 180){
                    a -= 360
                }
                if(b <= -180){
                    b += 360;
                }
                else if(b >= 180){
                    b -= 360
                }

                var minAngle = Math.min(a, b);
                var maxAngle = Math.max(a, b);

                var item = {}
                item.x = bA.x;
                item.y = bA.y;
                item.minAngle = minAngle;
                item.maxAngle = maxAngle;

                bornPoints.push(item)
            }
        }
        var jsonStr = JSON.stringify(bornPoints);
        var path = Editor.Project.path + "/export/bornPoint.json"
        Editor.assetdb.createOrSave( "db://assets/editor/export/bornPoint.json", jsonStr, function ( err, meta ) {
            // do something
          }
        );
        if (event.reply) {
            event.reply(background.children.length);
        }
    }
};