




          var myShape = document.getElementById("myElementToAnimate"),
              animateMotion =
                document.createElementNS("http://www.w3.org/2000/svg",
                                         "animateMotion");

              animateMotion.setAttribute("dur", "8s");
              animateMotion.setAttribute("d", "M 0 0 L 100 100");
              animateMotion.setAttribute("repeatCount", "indefinite");
              animateMotion.setAttribute("begin", "indefinite");

              myShape.appendChild(animateMotion);
              animateMotion.beginElement();




              animateMotion.addEventListener("beginEvent", function() {
                  console.log("start of animation");
              });

              animateMotion.addEventListener("endEvent", function() {
                  console.log("end of animation");
              });

              animateMotion.addEventListener("repeatEvent", function() {
                  console.log("new iteration");
              });
