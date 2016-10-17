$(document).ready(function() {

    // Encapsulating the javascript on a jQuery plugin
    $.fn.readmore = function (options) {
      // check if a target was specified
      var target = $(this);
      var options = (options) ? option : {};
      // Configure/customize these variables.
      options.length = (options.length) ? options.length : 500;  // How many characters are shown by default
      options.ellipsestext = (options.ellipsestext) ? options.ellipsestext : "...";
      options.readmoretext = (options.readmoretext) ? options.readmoretext :"Read more >";
      options.lesstext = (options.lesstext) ? options.lesstext :"Show less";

      var count = 0;
      var stop = false;

      target.children().each(function (i){
        var content = $(this).html();
        thisLength = content.length;
        count += thisLength ;
        if (count > options.length) {
          if (!stop){
            stop = true;
            $(this).addClass('readmore-sliced');
            if ($(this).children().length > 1 ) {
              // What the function should do when a child is found
            }else{
              var diff = count - options.length;
              var pos = thisLength - diff;
              var c = content.substr(0, pos);
              var h = content.substr(pos, content.length);

              var html = c + '<span class="readmore-ellipses">' + options.ellipsestext+ '&nbsp;</span> \
                                <span class="readmore-hidden">' + h + '</span>';

              $(this).html( html);
            }
          }else{
            $(this).addClass('readmore-hidden');
          }
        }
      });
      // Setup the style for :: after the read-more

      var morelink = "<p><a href=\"#\" class=\"readmore-morelink \">"+ options.readmoretext + "</a></p>";
      var style = "";
      if (!document.getElementById('readmore-style')){
        style = "<style id=\"readmore-style\"> \.readmore-hidden{ display: none; } \.readmore-show{display:inline!important;} <\/style>";
      }
      $(this).append(morelink + style);

      $(this).on('click', '.readmore-morelink', function(e) {

        var morelink = $('.readmore-morelink');
        if (morelink.text() == options.lesstext) {
          target.find('.readmore-hidden').removeClass('readmore-show');
          target.find('.readmore-ellipses').show();
          morelink.html(options.readmoretext);
        }else {
          target.find('.readmore-hidden').addClass('readmore-show');
          target.find('.readmore-ellipses').hide();
          morelink.html(options.lesstext);
        }
      });
    }


    // Testing
    var sum =0 ;
    var total = 50;



      $('[data-widget="read-more"]').readmore();


    //console.log(sum / total);
});
