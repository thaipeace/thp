/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//Odometer counter
//window.odometerOptions = {
//  format: '(.ddd),dd'
//};
//setTimeout(function(){
//  $('.odometer').html(423234234);
//}, 5000);

(function ($, Drupal, window, document) {

  'use strict';

  // To understand behaviors, see https://drupal.org/node/756722#behaviors
  Drupal.behaviors.home = {
    attach: function (context, settings) {

      // Path default style
      var style = [
        "fill:none",
        "stroke:black",
        "stroke-width:1",
        "stroke-linejoin:round",
        "stroke-linecap:round",
        "stroke-dasharray:1000",
        "animation: dash 5s 1 linear forwards",
        "stroke:#FFFFFF"
      ];


      $(".ubl_img").hover(function(){
        if ($(this).parent().parent().css('z-index') === '0') {
          $('.pnt').css('opacity', 0);
          $('.points > div').css('z-index', 0);

          $(this).parent().parent().find('.pnt').css('opacity', 1);
          $(this).parent().parent().css('z-index', 1);
        }
      });

      $(".ubl_img").click(function(){
        $(this).parent().parent().find('.pnt').trigger('click');
      });

      $('.cloud_topLeft').animate({left:"-200", opacity:"0.5"}, 3000);
      $('.cloud_topRight').animate({right:"-600", opacity:"0.5"}, 2000);
      $('.cloud_bottomLeft').animate({left:"-900", opacity:"0.5"}, 4000);

      // $('.wp_p1').animate({top: screen.height/2.8}, 2100);
      // $('.wp_p2').animate({top: screen.height/2.65}, 1800);
      // $('.wp_p3').animate({top: screen.height/2.8}, 1500);
      // $('.wp_p4').animate({top: screen.height/2.95}, 1300);
      // $('.wp_p5').animate({top: screen.height/2.95}, 1100);
      // $('.wp_p6').animate({top: screen.height/2.8}, 900);
      // $('.wp_p7').animate({top: screen.height/2.95}, 700);
      // $('.wp_p8').animate({top: screen.height/3}, 500);
      // $('.wp_p9').animate({top: screen.height/2.75}, 300);
      // $('.wp_p10').animate({top: screen.height/2.65}, 100);

      //Build connect line
      Pace.on('done', function(){
        // setTimeout(buildFactoryLine,2000);
      });

      function buildFactoryLine() {
        var pathConect = '';
        var pathArr = $('.node-3 .points > div').get().reverse();
        $.each(pathArr, function(index, element){
          var offset = $(element).offset();
          if (index === 0) {
            pathConect += 'M' + (offset.left + 110) + ' ' + (offset.top + 195);
          }else {
            pathConect += ' L' + (offset.left + 110) + ' ' + (offset.top + 195);
          }
        });

        //
        var styleConect = [
          "fill:none",
          "stroke:black",
          "stroke-width:4",
          "stroke-linejoin:round",
          "stroke-linecap:round",
          "stroke-dasharray:1000",
          "animation: dash 5s 1 linear forwards",
          "stroke:#f1e601"
        ];
        var svgConect = pathAnimate(pathConect, styleConect, screen.width, screen.height);
        $('.page-node-3').append(svgConect);
      }


      function pathAnimate(path, style, width, height) {
        var svg = '';
        svg = "<svg width='" + width + "' height='" + height + "' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' xml:space='preserve'>";
        svg += "<path d='" + path + "' style='" + style.join(";") + "' />";
        svg += "</svg>";

        return svg;
      }

      $('.wp_experience').append(pathAnimate('M289 500 L100 500 L100 304', style, 768, screen.height));
      $('.wp_experience').append(pathAnimate('M270 540 L232 540 L232 475', style, 768, screen.height));
      $('.wp_experience').append(pathAnimate('M480 500 L548 500 L548 474', style, 768, screen.height));
      $('.wp_experience').append(pathAnimate('M650 350 L667 350 L667 295', style, 768, screen.height));
      //$('.wp_experience').append(pathAnimate('M768 330 L667 330 L667 295', style, 768, screen.height));

      // Click from factory page
      $('.pnt').click(function(){
        var rel = $(this).attr('rel');
        if (['bottle', 'label'].indexOf(rel) === -1) {
          window.location = 'experience-instruction-landing?rel=' + rel;
        }else {
          rel==='bottle'?window.location = 'bottle-landing-page':false;
          rel==='label'?window.location = 'label-landing-page':false;
        }
      });

      // Click from menu
      $('.menu').click(function(){
        window.location = 'bottle-landing-page?rel=' + $(this).attr('rel');
      });

      // View interview video
      $('.view-video').click(function(){
        $('.video-outer').addClass('active');
        $('.video-outer video')[0].play();
      });
      // Close video
      $('.video-outer .close').click(function(){
        $('.video-outer').removeClass('active');
        $('.video-outer video')[0].pause();
      });
      // Return to home
      $('.home-return').click(function(){
        window.location = './home';
      });
    }
  };

})(jQuery, Drupal, this, this.document);
