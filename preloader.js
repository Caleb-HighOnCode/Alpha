var h = window.innerHeight;
$('.page-overlay').css('height', h);
var al = 0;
var pageLoaded = false;
var startTime = Date.now();

function progressSim() {
  var currentTime = Date.now();
  var elapsedTime = currentTime - startTime;
  var maxProgress = Math.min(elapsedTime / 30, 100);
  al = Math.floor(maxProgress);

  document.querySelector('.page-overlay > .text > p').innerHTML = al + '%';
  if (al >= 100 && pageLoaded) {
    clearTimeout(sim);
    $('.page-overlay').fadeOut(500, function() {
      $('.inside').fadeIn(500);
    });
  }
}

var sim = setInterval(progressSim, 0);
$('.inside').hide();

var isLast = function(word) {
  return $(word).next().length > 0 ? false : true;
};

var getNext = function(word) {
  return $(word).next();
};

var getVisible = function() {
  return document.getElementsByClassName('is-visible');
};

var getFirst = function() {
  var node = $('.words-wrapper').children().first();
  return node;
};

var switchWords = function(current, next) {
  $(current).removeClass('is-visible').addClass('is-hidden');
  $(next).removeClass('is-hidden').addClass('is-visible');
};

var getStarted = function() {
  // We start by getting the visible element and its sibling
  var first = getVisible();
  var next = getNext(first);

  // If our element has a sibling, it's not the last of the list. We switch the classes
  if (next.length !== 0) {
    switchWords(first, next);
  } else {
    // The element is the last of the list. We remove the visible class of the current element
    $(first).removeClass('is-visible').addClass('is-hidden');

    // And we get the first element of the list, and we give it the visible class. And it starts again.
    var newEl = getFirst();
    $(newEl).removeClass('is-hidden').addClass('is-visible');
  }
};

var init = function() {
  setInterval(function() {
    getStarted();
  }, 500);
};

$(window).on('load', function() {
  pageLoaded = true;
});

setTimeout(function() {
  if (al < 100) {
    $('.page-overlay').fadeOut(500, function() {
      $('.inside').fadeIn(500);
    });
  }
}, 5500);

init();
 