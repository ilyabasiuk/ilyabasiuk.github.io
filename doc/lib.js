var lib = function() {
    var canvas,
        width = 600,
        height = 400,
        margin = 50,
        colorise = function() {
          canvas.rect(margin, margin, width-2*margin, height -2*margin).attr({"fill": "none","stroke" : "black"});
        },
        adoptX = function(x) {
          return x+margin;
        },
        adoptY = function(y) {
          return y+margin;
        },
        drawCircle = function(x,y,r,attrs) {
          x = adoptX(x);
          y = adoptY(y);
          return canvas.circle(x,y,r).attr(attrs);
        },
        angles = [0, 2.5132741228718345, 3.7699111843077517],
        radiuses = [1,1,1],
        initialRotationAngle = -90,
        getPathString = function (x, y, radius, bearing) {
            var currentAngles = angles.slice(),
                currentRadiuses = radiuses.slice(),
                points = [], px, py,
                baseAngle = (bearing + initialRotationAngle) * Math.PI/180;
            for (i = 0; i < currentAngles.length; i++){
                currentAngles[i] += baseAngle;
                px = x + currentRadiuses[i] * radius * Math.cos(currentAngles[i]);
                py = y + currentRadiuses[i] * radius * Math.sin(currentAngles[i]);

                points.push(Math.round(px).toString() + " " + Math.round(py).toString());
            }

            return "M" + points.join("L") + "Z";
        };
    return {
      createScene : function() {
         canvas = Snap(width, height);
        //  width = canvas.width();
        //  height = canvas.height();
        colorise();
      },
      vehicle : function(x,y,bearing, color) {
        (!color) && (color = "#1300bd");
        var stroke = "#000000",
            vehicle;
        x = adoptX(x);
        y = adoptY(y);
        vehicle = canvas.path(getPathString(x,y,17, bearing)).attr({fill:color, stroke:stroke});
        //vehicle.transform("t"+x+" " +y+"r " + bearing);
        return vehicle;
      },
      historicStatus: function(x,y) {
        return drawCircle(x,y,3,{fill: "green"});
      },
      calculatedPoint: function(x,y) {
        return drawCircle(x,y,3,{fill: "yellow"});
      },
      circle: function(x,y,r,attrs) {
        return drawCircle(x,y,r,attrs);
      }
    }
}();
