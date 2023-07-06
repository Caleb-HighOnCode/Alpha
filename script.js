
// Cursor effect



(function ($) {
  "use strict";

  $(function () {
      var header = $(".start-style");
      $(window).scroll(function () {
          var scroll = $(window).scrollTop();

          if (scroll >= 10) {
              header.removeClass('start-style').addClass("scroll-on");
          } else {
              header.removeClass("scroll-on").addClass('start-style');
          }
      });
  });

  //Menu On Hover

  $('body').on('mouseenter mouseleave', '.nav-item', function (e) {
      if ($(window).width() > 750) {
          var _d = $(e.target).closest('.nav-item'); _d.addClass('show');
          setTimeout(function () {
              _d[_d.is(':hover') ? 'addClass' : 'removeClass']('show');
          }, 1);
      }
  });

})(jQuery);



// Landing page script
console.clear();

gsap.registerPlugin(ScrollTrigger);

const additionalY = { val: 0 };
let additionalYAnim;
let offset = 0;
const cols = gsap.utils.toArray(".overall .gallery .col");

cols.forEach((col, i) => {
    const images = col.childNodes;

    // DUPLICATE IMAGES FOR LOOP
    images.forEach((image) => {
        var clone = image.cloneNode(true);
        col.appendChild(clone);
        col.appendChild(clone);
        col.appendChild(clone);
    });

    // SET ANIMATION
    images.forEach((item) => {
        let columnHeight = item.parentElement.clientHeight;
        let direction = i % 2 !== 0 ? "+=" : "-="; // Change direction for odd columns

        gsap.to(item, {
            y: direction + Number(columnHeight / 2),
            duration: 20,
            repeat: -1,
            ease: "none",
            modifiers: {
                y: gsap.utils.unitize((y) => {
                    if (direction == "+=") {
                        offset += additionalY.val;
                        y = (parseFloat(y) - offset) % (columnHeight * 0.5);
                    } else {
                        offset += additionalY.val;
                        y = (parseFloat(y) + offset) % -Number(columnHeight * 0.5);
                    }

                    return y;
                })
            }
        });
    });
});


const imagesScrollerTrigger = ScrollTrigger.create({
  trigger: "section",
  start: "top 50%",
  end: "bottom 50%",
  onUpdate: function (self) {
      const velocity = self.getVelocity();
      if (velocity > 0) {
          if (additionalYAnim) additionalYAnim.kill();
          additionalY.val = -velocity / 2000;
          additionalYAnim = gsap.to(additionalY, { val: 0 });
      }
      if (velocity < 0) {
          if (additionalYAnim) additionalYAnim.kill();
          additionalY.val = -velocity / 3000;
          additionalYAnim = gsap.to(additionalY, { val: 0 });
      }
  }
});


// scrolldown butto script

$(function () {
  $('a[href*=#]').on('click', function (e) {
      e.preventDefault();
      $('html, body').animate({ scrollTop: $($(this).attr('href')).offset().top }, 100, 'linear');
  });
});


//footer animation

/* ---- particles.js config ---- */



particlesJS("particles-js", {
"particles": {
"number": {
"value": 250,
"density": {
"enable": true,
"value_area":1000
}
},
"color": {
"value": ["#fff"],
},

"shape": {
"type": "circle",
"stroke": {
"width": 0,
"color": "#fff"
},
"polygon": {
"nb_sides": 5
},
},
"opacity": {
"value": 0.6,
"random": false,
"anim": {
"enable": true,
"speed": 2,
"opacity_min": 0.1,
"sync": false
}
},
"size": {
"value": 2,
"random": true,
"anim": {
"enable": false,
"speed": 40,
"size_min": 0.1,
"sync": false
}
},
"line_linked": {
"enable": true,
"distance": 120,
"color": "#667",
"opacity": 0.4,
"width": 1
},
},
"interactivity": {
"detect_on": "canvas",
"events": {
"onhover": {
"enable": true,
"mode": "grab"
},
"onclick": {
"enable": false
},
"resize": true
},
"modes": {
"grab": {
"distance": 150,
"line_linked": {
  "opacity": 1
}
},
"bubble": {
"distance": 400,
"size": 40,
"duration": 2,
"opacity": 8,
"speed": 10
},
"repulse": {
"distance": 200,
"duration": 0.4
},
"push": {
"particles_nb": 4
},
"remove": {
"particles_nb": 2
}
}
},
"retina_detect": true
});
