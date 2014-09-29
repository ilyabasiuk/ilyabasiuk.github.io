
var perfomansceTestHelper = function (options) {
    var
    addBtn = options.addButton,
    clearBtn = options.clearButton,
    templ = options.canvas.querySelector("g"),
    count = 0,
    init = function() {
        addBtn.addEventListener("click", add);
        clearBtn.addEventListener("click", clear)
    },
    add = function() {
        var label = templ.cloneNode(true);
        label.style.display = "";
        options.canvas.appendChild(label);
        label.appendChild(createRndAnimation());
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
    createRndAnimation = function() {
      var width = options.canvas.width.baseVal.value,
          height = options.canvas.height.baseVal.value;
          getRnd = function(min, max)  {
              return Math.floor((Math.random() * max) + min);
          },
          startPosX = getRnd(0, width),
          startPosY =  getRnd(0, height);

         return createMotionAnimation(startPosX, startPosY, getRnd(0, width), getRnd(0, height), getRnd(5,20));
    },
    createMotionAnimation = function(startPosX, startPosY, horizontalOffset, verticalOffset, duration) {
        var animation = document.createElementNS('http://www.w3.org/2000/svg', 'animateMotion')
        animation.setAttribute('end', 'indefinite');
        animation.setAttribute('dur', duration + 's');
        animation.setAttribute('repeatCount', 'indefinite');
        animation.setAttribute('path', 'M ' + startPosX +' '+ startPosY +' L ' + horizontalOffset + ' ' + verticalOffset);

        return animation;
    };

    init();
    return {

    };
};
///  <animateMotion  end="indefinite" dur="10s" fill="freeze" repeatCount =  "indefinite" path="M 0 0 L 100 100">              </animateMotion>
