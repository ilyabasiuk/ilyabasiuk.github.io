
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
          height = options.canvas.height.baseVal.value,
          tmplBox = templ.getBBox();
          getRnd = function(min, max)  {
              return Math.floor((Math.random() * max) + min);
          },
          startPosX = getRnd(-tmplBox.x, width -tmplBox.x +tmplBox.width) ,
          startPosY =  getRnd(-tmplBox.y, height - tmplBox.x + tmplBox.height);

         return createMotionAnimation(startPosX, startPosY, getRnd(-tmplBox.x, width -tmplBox.x +tmplBox.width), getRnd(-tmplBox.y, height - tmplBox.x + tmplBox.height), getRnd(5,20));
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
