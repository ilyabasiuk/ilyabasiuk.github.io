
var perfomansceTestHelper = function (options) {
    var
    addBtn = options.addButton,
    clearBtn = options.clearButton,
    templ = options.canvas.querySelector("g"),
    count = 0,
    init = function() {
        addBtn.addEventListener("click", add);
        options.canvas.addEventListener("click", add);
        clearBtn.addEventListener("click", clear)

    },
    add = function() {
        var label = templ.cloneNode(true);
        label.style.display = "";
        var animName = createRndAnimation();
        var vehId = "vehicle" + i;
        label.setAttribute("id", vehId);
        options.canvas.appendChild(label);
        $("#" + vehId).playKeyframe({
            name: animName, // name of the keyframe you want to bind to the selected element
            duration: getRnd(5,20) + 's', // [optional, default: 0, in ms] how long you want it to last in milliseconds
            timingFunction: 'linear', // [optional, default: ease] specifies the speed curve of the animation
            delay: 0, //[optional, default: 0]  how long you want to wait before the animation starts
            iterationCount: 'infinite', //[optional, default:1]  how many times you want the animation to repeat
            direction: 'normal', //[optional, default: 'normal']  which direction you want the frames to flow
            fillMode: 'forwards', //[optional, default: 'forward']  how to apply the styles outside the animation time, default value is forwards
            complete: function(){} //[optional] Function fired after the animation is complete. If repeat is infinite, the function will be fired every time the animation is restarted.
         });

        // options.canvas.appendChild(label);
        // label.appendChild(createRndAnimation());
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
          getRnd = function(min, max)  {
              return Math.floor((Math.random() * max) + min);
          },
          startPosX = getRnd(-tmplBox.x, width -tmplBox.x +tmplBox.width) ,
          startPosY =  getRnd(-tmplBox.y, height - tmplBox.y + tmplBox.height);

         return createMotionAnimation(startPosX, startPosY, getRnd(-tmplBox.x, width -tmplBox.x +tmplBox.width), getRnd(-tmplBox.y, height - tmplBox.y + tmplBox.height), getRnd(5,20));
    },
    i = 0,
    createMotionAnimation = function(startPosX, startPosY, horizontalOffset, verticalOffset, duration) {
      i++;
      var name = 'anim'+i;
       var anim =   $.keyframe.define({
              name: name,
              from: {
                  'transform': 'translate3d('+startPosX+'px,' +startPosY +'px,0px)' //Note that 'transform' will be autoprefixed for you
              },
              to: {
                  'transform': 'translate3d('+horizontalOffset+'px,' +verticalOffset +'px,0px)' //Note that 'transform' will be autoprefixed for you
              }
        });
        var anim =   $.keyframe.define({
               name: name,
               from: {
                   'transform': 'translate('+startPosX+'px,' +startPosY +'px)' //Note that 'transform' will be autoprefixed for you
               },
               to: {
                   'transform': 'translate('+horizontalOffset+'px,' +verticalOffset +'px)' //Note that 'transform' will be autoprefixed for you
               }
         });

       return name;
    };

    init();
    return {

    };
};
///  <animateMotion  end="indefinite" dur="10s" fill="freeze" repeatCount =  "indefinite" path="M 0 0 L 100 100">              </animateMotion>
