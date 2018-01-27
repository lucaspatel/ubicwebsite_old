var tweetIndex = 0;

var tweets = [];
var tweetDates = [];
var updatesFinal = "";

function navScroll() {
  var $nav = $("#nav");
  var isMouseIn = false;

  // run after initialization of navbar
  $(window).scroll(function() {

    // HANDLE NAVBAR
    if ($(document).scrollTop() > 50 && !isMouseIn) {
      $nav.removeClass('navbar-lg');
      $nav.addClass('navbar-md');
    } else {
      $nav.removeClass('navbar-md');
      $nav.addClass('navbar-lg');
    }

    // MOUSEOVER NAVBAR EFFECT
    $nav.mouseenter(function() {
      $nav.removeClass('navbar-md');
      $nav.addClass('navbar-lg');
      isMouseIn = true;
    });

    $nav.mouseleave(function() {
      if ($(document).scrollTop() > 50) {
        $nav.removeClass('navbar-lg');
        $nav.addClass('navbar-md');
      }
      isMouseIn = false;
    });

    timelineScroll();
  });
}

// hide and reveal timeline elements by scroll
function timelineScroll() {
  var $timeline_block = $('.cd-timeline-block');
  // run after initialization of navbar

  //hide timeline blocks which are outside the viewport
  $timeline_block.each(function() {
    if ($(this).offset().top > $(window).scrollTop() + $(window).height() * 0.75) {
      $(this).find('.cd-timeline-img, .cd-timeline-content, .pointer').removeClass('bounce-in').addClass('is-hidden');
    }
  });

  // reveal timeline blocks inside viewport
  $timeline_block.each(function() {
    if ($(this).offset().top <= $(window).scrollTop() + $(window).height() * 0.75 && $(this).find('.cd-timeline-img').hasClass('is-hidden')) {
      $(this).find('.cd-timeline-img, .cd-timeline-content, .pointer').removeClass('is-hidden').addClass('bounce-in');
    }
  });
}

/**
 * Parse Twitter feed through retrieving tweets using custom Google Script that generates xml sheet.
 */
function parseTwitterRSS() {

  $.get('https://script.google.com/macros/s/AKfycbzu7bVSXrtsFL63OFkPPH5XwI3V8XzOm6JAiNf6zr1gac8y4Xg/exec?520445386310164480', function(data) {
    // find each item (tweet)
    $(data).find("item").each(function() {

      // limit to past 20 tweets
      if (tweets.length > 20)
        return;

      // reference to found item (tweet)
      var el = $(this);
      var title = el.find("title").text();
      var dateText = el.find("pubDate").text().split(' ');
      var date = "";

      // console.log(title);

      // date = day of the week, and date
      for (var index = 0; index < 4; index += 1)
        date = date + dateText[index] + " ";

      // add dash
      date += "- ";

      // save tweet text
      tweets[tweets.length] = title;
      tweetDates[tweetDates.length] = date;
    });

    // setup feed
    setupTwitterFeed();
    scrollUpdates();
  });
}

// set up text in #updates
function setupTwitterFeed() {
  for (var i = 0; i < tweets.length; i++) {
    // add date
    updatesFinal += tweetDates[i];

    // add message minus bar separator if last
    if (i != tweets.length - 1)
      updatesFinal += tweets[i] + "  |  ";
    else
      updatesFinal += tweets[i];
  }

  $("#update").html("<div id=\"update-inner\"><code>" + updatesFinal + "</code></div>");
}

// scroll #updates div with twitter feed
function scrollUpdates() {
  $updateInner = $("#update-inner");
  var marginLeft = $updateInner.width();
  $updateInner.css("margin-left", marginLeft);
  var boolEnter = false;
  $("#update").hover(function() {
    boolEnter = true;
  }, function() {
    boolEnter = false;
  });

  setInterval(function() {
    if (!boolEnter) {
      $updateInner.css("margin-left", marginLeft + "px");
      marginLeft -= 3;
      // console.log(marginLeft);
    }
  }, 20);
}

// allow smooth scroll on anchors
smoothScroll.init({
  speed: 500, // Integer. How fast to complete the scroll in milliseconds
  easing: 'easeOutCubic', // Easing pattern to use
  updateURL: false, // Boolean. Whether or not to update the URL with the anchor hash on scroll
  offset: 30, // Integer. How far to offset the scrolling anchor location in pixels
  callbackBefore: function(toggle, anchor) {}, // Function to run before scrolling
  callbackAfter: function(toggle, anchor) {} // Function to run after scrolling
});

$(document).ready(function() {
  navScroll();
  parseTwitterRSS();
  // scrollUpdates();
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJmdW5jdGlvbnMuanMiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIHR3ZWV0SW5kZXggPSAwO1xuXG52YXIgdHdlZXRzID0gW107XG52YXIgdHdlZXREYXRlcyA9IFtdO1xudmFyIHVwZGF0ZXNGaW5hbCA9IFwiXCI7XG5cbmZ1bmN0aW9uIG5hdlNjcm9sbCgpIHtcbiAgdmFyICRuYXYgPSAkKFwiI25hdlwiKTtcbiAgdmFyIGlzTW91c2VJbiA9IGZhbHNlO1xuXG4gIC8vIHJ1biBhZnRlciBpbml0aWFsaXphdGlvbiBvZiBuYXZiYXJcbiAgJCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbigpIHtcblxuICAgIC8vIEhBTkRMRSBOQVZCQVJcbiAgICBpZiAoJChkb2N1bWVudCkuc2Nyb2xsVG9wKCkgPiA1MCAmJiAhaXNNb3VzZUluKSB7XG4gICAgICAkbmF2LnJlbW92ZUNsYXNzKCduYXZiYXItbGcnKTtcbiAgICAgICRuYXYuYWRkQ2xhc3MoJ25hdmJhci1tZCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICAkbmF2LnJlbW92ZUNsYXNzKCduYXZiYXItbWQnKTtcbiAgICAgICRuYXYuYWRkQ2xhc3MoJ25hdmJhci1sZycpO1xuICAgIH1cblxuICAgIC8vIE1PVVNFT1ZFUiBOQVZCQVIgRUZGRUNUXG4gICAgJG5hdi5tb3VzZWVudGVyKGZ1bmN0aW9uKCkge1xuICAgICAgJG5hdi5yZW1vdmVDbGFzcygnbmF2YmFyLW1kJyk7XG4gICAgICAkbmF2LmFkZENsYXNzKCduYXZiYXItbGcnKTtcbiAgICAgIGlzTW91c2VJbiA9IHRydWU7XG4gICAgfSk7XG5cbiAgICAkbmF2Lm1vdXNlbGVhdmUoZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoJChkb2N1bWVudCkuc2Nyb2xsVG9wKCkgPiA1MCkge1xuICAgICAgICAkbmF2LnJlbW92ZUNsYXNzKCduYXZiYXItbGcnKTtcbiAgICAgICAgJG5hdi5hZGRDbGFzcygnbmF2YmFyLW1kJyk7XG4gICAgICB9XG4gICAgICBpc01vdXNlSW4gPSBmYWxzZTtcbiAgICB9KTtcblxuICAgIHRpbWVsaW5lU2Nyb2xsKCk7XG4gIH0pO1xufVxuXG4vLyBoaWRlIGFuZCByZXZlYWwgdGltZWxpbmUgZWxlbWVudHMgYnkgc2Nyb2xsXG5mdW5jdGlvbiB0aW1lbGluZVNjcm9sbCgpIHtcbiAgdmFyICR0aW1lbGluZV9ibG9jayA9ICQoJy5jZC10aW1lbGluZS1ibG9jaycpO1xuICAvLyBydW4gYWZ0ZXIgaW5pdGlhbGl6YXRpb24gb2YgbmF2YmFyXG5cbiAgLy9oaWRlIHRpbWVsaW5lIGJsb2NrcyB3aGljaCBhcmUgb3V0c2lkZSB0aGUgdmlld3BvcnRcbiAgJHRpbWVsaW5lX2Jsb2NrLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgaWYgKCQodGhpcykub2Zmc2V0KCkudG9wID4gJCh3aW5kb3cpLnNjcm9sbFRvcCgpICsgJCh3aW5kb3cpLmhlaWdodCgpICogMC43NSkge1xuICAgICAgJCh0aGlzKS5maW5kKCcuY2QtdGltZWxpbmUtaW1nLCAuY2QtdGltZWxpbmUtY29udGVudCwgLnBvaW50ZXInKS5yZW1vdmVDbGFzcygnYm91bmNlLWluJykuYWRkQ2xhc3MoJ2lzLWhpZGRlbicpO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gcmV2ZWFsIHRpbWVsaW5lIGJsb2NrcyBpbnNpZGUgdmlld3BvcnRcbiAgJHRpbWVsaW5lX2Jsb2NrLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgaWYgKCQodGhpcykub2Zmc2V0KCkudG9wIDw9ICQod2luZG93KS5zY3JvbGxUb3AoKSArICQod2luZG93KS5oZWlnaHQoKSAqIDAuNzUgJiYgJCh0aGlzKS5maW5kKCcuY2QtdGltZWxpbmUtaW1nJykuaGFzQ2xhc3MoJ2lzLWhpZGRlbicpKSB7XG4gICAgICAkKHRoaXMpLmZpbmQoJy5jZC10aW1lbGluZS1pbWcsIC5jZC10aW1lbGluZS1jb250ZW50LCAucG9pbnRlcicpLnJlbW92ZUNsYXNzKCdpcy1oaWRkZW4nKS5hZGRDbGFzcygnYm91bmNlLWluJyk7XG4gICAgfVxuICB9KTtcbn1cblxuLyoqXG4gKiBQYXJzZSBUd2l0dGVyIGZlZWQgdGhyb3VnaCByZXRyaWV2aW5nIHR3ZWV0cyB1c2luZyBjdXN0b20gR29vZ2xlIFNjcmlwdCB0aGF0IGdlbmVyYXRlcyB4bWwgc2hlZXQuXG4gKi9cbmZ1bmN0aW9uIHBhcnNlVHdpdHRlclJTUygpIHtcblxuICAkLmdldCgnaHR0cHM6Ly9zY3JpcHQuZ29vZ2xlLmNvbS9tYWNyb3Mvcy9BS2Z5Y2J6dTdiVlNYcnRzRkw2M09Ga1BQSDVYd0kzVjhYek9tNkpBaU5mNnpyMWdhYzh5NFhnL2V4ZWM/NTIwNDQ1Mzg2MzEwMTY0NDgwJywgZnVuY3Rpb24oZGF0YSkge1xuICAgIC8vIGZpbmQgZWFjaCBpdGVtICh0d2VldClcbiAgICAkKGRhdGEpLmZpbmQoXCJpdGVtXCIpLmVhY2goZnVuY3Rpb24oKSB7XG5cbiAgICAgIC8vIGxpbWl0IHRvIHBhc3QgMjAgdHdlZXRzXG4gICAgICBpZiAodHdlZXRzLmxlbmd0aCA+IDIwKVxuICAgICAgICByZXR1cm47XG5cbiAgICAgIC8vIHJlZmVyZW5jZSB0byBmb3VuZCBpdGVtICh0d2VldClcbiAgICAgIHZhciBlbCA9ICQodGhpcyk7XG4gICAgICB2YXIgdGl0bGUgPSBlbC5maW5kKFwidGl0bGVcIikudGV4dCgpO1xuICAgICAgdmFyIGRhdGVUZXh0ID0gZWwuZmluZChcInB1YkRhdGVcIikudGV4dCgpLnNwbGl0KCcgJyk7XG4gICAgICB2YXIgZGF0ZSA9IFwiXCI7XG5cbiAgICAgIC8vIGNvbnNvbGUubG9nKHRpdGxlKTtcblxuICAgICAgLy8gZGF0ZSA9IGRheSBvZiB0aGUgd2VlaywgYW5kIGRhdGVcbiAgICAgIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCA0OyBpbmRleCArPSAxKVxuICAgICAgICBkYXRlID0gZGF0ZSArIGRhdGVUZXh0W2luZGV4XSArIFwiIFwiO1xuXG4gICAgICAvLyBhZGQgZGFzaFxuICAgICAgZGF0ZSArPSBcIi0gXCI7XG5cbiAgICAgIC8vIHNhdmUgdHdlZXQgdGV4dFxuICAgICAgdHdlZXRzW3R3ZWV0cy5sZW5ndGhdID0gdGl0bGU7XG4gICAgICB0d2VldERhdGVzW3R3ZWV0RGF0ZXMubGVuZ3RoXSA9IGRhdGU7XG4gICAgfSk7XG5cbiAgICAvLyBzZXR1cCBmZWVkXG4gICAgc2V0dXBUd2l0dGVyRmVlZCgpO1xuICAgIHNjcm9sbFVwZGF0ZXMoKTtcbiAgfSk7XG59XG5cbi8vIHNldCB1cCB0ZXh0IGluICN1cGRhdGVzXG5mdW5jdGlvbiBzZXR1cFR3aXR0ZXJGZWVkKCkge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHR3ZWV0cy5sZW5ndGg7IGkrKykge1xuICAgIC8vIGFkZCBkYXRlXG4gICAgdXBkYXRlc0ZpbmFsICs9IHR3ZWV0RGF0ZXNbaV07XG5cbiAgICAvLyBhZGQgbWVzc2FnZSBtaW51cyBiYXIgc2VwYXJhdG9yIGlmIGxhc3RcbiAgICBpZiAoaSAhPSB0d2VldHMubGVuZ3RoIC0gMSlcbiAgICAgIHVwZGF0ZXNGaW5hbCArPSB0d2VldHNbaV0gKyBcIiAgfCAgXCI7XG4gICAgZWxzZVxuICAgICAgdXBkYXRlc0ZpbmFsICs9IHR3ZWV0c1tpXTtcbiAgfVxuXG4gICQoXCIjdXBkYXRlXCIpLmh0bWwoXCI8ZGl2IGlkPVxcXCJ1cGRhdGUtaW5uZXJcXFwiPjxjb2RlPlwiICsgdXBkYXRlc0ZpbmFsICsgXCI8L2NvZGU+PC9kaXY+XCIpO1xufVxuXG4vLyBzY3JvbGwgI3VwZGF0ZXMgZGl2IHdpdGggdHdpdHRlciBmZWVkXG5mdW5jdGlvbiBzY3JvbGxVcGRhdGVzKCkge1xuICAkdXBkYXRlSW5uZXIgPSAkKFwiI3VwZGF0ZS1pbm5lclwiKTtcbiAgdmFyIG1hcmdpbkxlZnQgPSAkdXBkYXRlSW5uZXIud2lkdGgoKTtcbiAgJHVwZGF0ZUlubmVyLmNzcyhcIm1hcmdpbi1sZWZ0XCIsIG1hcmdpbkxlZnQpO1xuICB2YXIgYm9vbEVudGVyID0gZmFsc2U7XG4gICQoXCIjdXBkYXRlXCIpLmhvdmVyKGZ1bmN0aW9uKCkge1xuICAgIGJvb2xFbnRlciA9IHRydWU7XG4gIH0sIGZ1bmN0aW9uKCkge1xuICAgIGJvb2xFbnRlciA9IGZhbHNlO1xuICB9KTtcblxuICBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcbiAgICBpZiAoIWJvb2xFbnRlcikge1xuICAgICAgJHVwZGF0ZUlubmVyLmNzcyhcIm1hcmdpbi1sZWZ0XCIsIG1hcmdpbkxlZnQgKyBcInB4XCIpO1xuICAgICAgbWFyZ2luTGVmdCAtPSAzO1xuICAgICAgLy8gY29uc29sZS5sb2cobWFyZ2luTGVmdCk7XG4gICAgfVxuICB9LCAyMCk7XG59XG5cbi8vIGFsbG93IHNtb290aCBzY3JvbGwgb24gYW5jaG9yc1xuc21vb3RoU2Nyb2xsLmluaXQoe1xuICBzcGVlZDogNTAwLCAvLyBJbnRlZ2VyLiBIb3cgZmFzdCB0byBjb21wbGV0ZSB0aGUgc2Nyb2xsIGluIG1pbGxpc2Vjb25kc1xuICBlYXNpbmc6ICdlYXNlT3V0Q3ViaWMnLCAvLyBFYXNpbmcgcGF0dGVybiB0byB1c2VcbiAgdXBkYXRlVVJMOiBmYWxzZSwgLy8gQm9vbGVhbi4gV2hldGhlciBvciBub3QgdG8gdXBkYXRlIHRoZSBVUkwgd2l0aCB0aGUgYW5jaG9yIGhhc2ggb24gc2Nyb2xsXG4gIG9mZnNldDogMzAsIC8vIEludGVnZXIuIEhvdyBmYXIgdG8gb2Zmc2V0IHRoZSBzY3JvbGxpbmcgYW5jaG9yIGxvY2F0aW9uIGluIHBpeGVsc1xuICBjYWxsYmFja0JlZm9yZTogZnVuY3Rpb24odG9nZ2xlLCBhbmNob3IpIHt9LCAvLyBGdW5jdGlvbiB0byBydW4gYmVmb3JlIHNjcm9sbGluZ1xuICBjYWxsYmFja0FmdGVyOiBmdW5jdGlvbih0b2dnbGUsIGFuY2hvcikge30gLy8gRnVuY3Rpb24gdG8gcnVuIGFmdGVyIHNjcm9sbGluZ1xufSk7XG5cbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xuICBuYXZTY3JvbGwoKTtcbiAgcGFyc2VUd2l0dGVyUlNTKCk7XG4gIC8vIHNjcm9sbFVwZGF0ZXMoKTtcbn0pOyJdLCJmaWxlIjoiZnVuY3Rpb25zLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=