
var perfomansceTestHelper = function (options) {
    var
    addBtn = options.addButton,
    clearBtn = options.clearButton,
    templ = options.canvas.querySelector("g"),
    count = 0,
    vehicles = [];
    init = function() {
        addBtn.addEventListener("click", add);
        options.canvas.addEventListener("click", add);
        clearBtn.addEventListener("click", clear)

        var vehicle = document.getElementById("vehicle");

var  duration = 10 * 1000,
     toY = -100,
     toX = 100,
     verticalSpeed = toY/duration,
     horisontalSpeed = toX/duration,
     startTime = Date.now();

    },
    move = function (){
      vehicles.forEach(function(vehicle) {
            var timePassed =  Date.now() -  vehicle.data.startTime,
                xOffset = vehicle.data.fromX + vehicle.data.horisontalSpeed * timePassed,
                yOffset =vehicle.data.fromY + vehicle.data.verticalSpeed * timePassed;
            if (xOffset <= vehicle.data.toX) {
             vehicle.shape.setAttribute("transform", "translate (" +  xOffset + ", " + yOffset+")");
           } else {
             vehicle.shape.setAttribute("transform", "translate ("+vehicle.data.fromX+","+vehicle.data.fromY+")");
             vehicle.data.startTime = Date.now();
           }
      });

      requestAnimationFrame(move);
   },
    add = function() {
        var label = templ.cloneNode(true);
        label.style.display = "";
        var animData = createRndAnimation();
        var vehId = "vehicle" + i;
        label.setAttribute("id", vehId);
        options.canvas.appendChild(label);
        vehicles.push({
              data: animData,
              shape: label
        });

        if (count === 0) {
          move();
        }
        count++;
        options.countDisplay.innerText = count;
    },
    clear = function() {
        options.canvas.innerHTML = "";
        count = 0;
        options.countDisplay.innerText = count;
    },
    strToHtml = function(str) {
        var temp = document.createElement('div');
        temp.innerHTML = str;
        var htmlObject = temp.firstChild;
        return htmlObject;
    },
    getRnd = function(min, max)  {
        return Math.floor((Math.random() * max) + min);
    },
    createRndAnimation = function() {
      var width = options.canvas.width.baseVal.value,
          height = options.canvas.height.baseVal.value,
          tmplBox = templ.getBBox();
          curPos = {x: templ.querySelector("circle").getAttribute("cx"), y: templ.querySelector("circle").getAttribute("cy")}
         getRnd = function(min, max)  {
             return Math.random() * (max - min) + min;
         },
         getRndX = function() {
           return  getRnd(0, width - 100) - curPos.x + 100;
         },
         getRndY =  function() {
           return   getRnd(0, height - 100) - curPos.y + 100;
         },
         startPosX = getRndX() ,
         startPosY =  getRndY();

        return createMotionAnimation(startPosX, startPosY, getRndX(), getRndY(), getRnd(5,20));
    },
    i = 0,
    createMotionAnimation = function(startPosX, startPosY, horizontalOffset, verticalOffset, duration) {
      i++;
      console.log(startPosX, startPosY, horizontalOffset, verticalOffset, duration);
      duration = duration  *1000;
      var animData= {
          startTime : Date.now(),
          fromX: startPosX,
          fromY: startPosY,
          horisontalSpeed: (horizontalOffset - startPosX)/duration,
          verticalSpeed: (verticalOffset-startPosX)/duration,
          toX: horizontalOffset,
          toY: verticalOffset

      };

       return animData;
    };

    init();
    return {

    };
};
///  <animateMotion  end="indefinite" dur="10s" fill="freeze" repeatCount =  "indefinite" path="M 0 0 L 100 100">              </animateMotion>
