/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


(function ($, Drupal, window, document) {

  'use strict';

  // To understand behaviors, see https://drupal.org/node/756722#behaviors
  Drupal.behaviors.custom = {
    attach: function (context, settings) {
      // Try it button
      if ($('.node-2 .bnt-try').length > 0) {
        // Try it button
        for (var i = 0; i < 50; i++) {
          if (i < 10) {
            i = '0' + i;
          }
          $('.node-2 .bnt-try .img_exper1 a').append('<div class="item' + i + '"></div>');
          $('.node-2 .bnt-try .img_exper1 .item' + i).css('background', 'url("./sites/default/modules/custom/thp/images/tryitbnt/heloo_000' + i + '.png") center center no-repeat');
        }
        
        $('.node-2 .bnt-try .img_exper1').hover(function(){
          tryAnimateForward(49, 10);
        }, function(){
          tryAnimateBack(49, 3);
        });
      }
      
      /*
      * Tryit button twikle
      */  
      function tryAnimateForward(maxLoops, speed) {
        var counter = 0;
        $('.node-2 .bnt-try .img_exper1 a img').css('opacity','0.2');
        (function next() {
          if (counter++ >= maxLoops) return;

          setTimeout(function() {
             $('.node-2 .bnt-try .img_exper1 a > div').hide();
             $('.node-2 .bnt-try .img_exper1 a .item' + counter).show();
             next();
          }, speed);
          
          if (counter === maxLoops) $('.node-2 .bnt-try .img_exper1 a img').css('opacity','0');
        })();
      }
      
      function tryAnimateBack(maxLoops, speed) {
        var counter = maxLoops;

        (function next() {
          if (counter-- <= 0) return;

          setTimeout(function() {
             $('.node-2 .bnt-try .img_exper1 a > div').hide();
             $('.node-2 .bnt-try .img_exper1 a .item' + counter).show();
             next();
          }, speed);
          
          if (counter === 0) $('.node-2 .bnt-try .img_exper1 a img').css('opacity','1');
        })();
      }
      
      // Loading bar
      Pace.on('start', function(){
        $('body .layout-center').hide();
      });
      
      var myVar = setInterval(function(){ checkLoad() }, 300);
      function checkLoad() {
        var d = Pace.bar.progress;
        if (d > 70) {
          $('body .layout-center').show();
          clearInterval(myVar);
        }
      }
      
//      Pace.on('done', function(){
//        $('body .layout-center').show();
//      });
      
      $('.field_270_background .views-field-body').append('<div class="nav">Kéo trái phải để trải nghiệm</div>');
      
      /*
      // Sound pending
      if ($('.page-node-4, .page-node-21, .page-node-22').length > 0) {
        var audio = new Audio('./sites/default/modules/custom/thp/js/ventilation_loop.wav');
        audio.loop = true;
        if ($('.page-node-4').length < 1) {
          audio.play();
          $('#volume-bnt').addClass('active');
        }
        
        $('#volume-bnt').click(function(){
          $(this).toggleClass('active');
          if ($(this).hasClass('active')) {
            audio.play();
          }else {
            audio.pause();
          }
        });
        
        $('.page-node-4 #block-views-aseptic-block-1 .views-row').on('click', function(){
          
          if ($(this).hasClass('views-row-9') || $(this).hasClass('views-row-first') || $(this).hasClass('views-row-last')) {
            audio.pause();
            $('#volume-bnt').removeClass('active').css('pointer-events','none');
          }else {
            audio.play();
            $('#volume-bnt').addClass('active').css('pointer-events','inherit');
          }
          
        });
      }*/
      
      $('.view-footer .click-remain').click(function(){
        $('.close').trigger('click');
        $(this).parent().css({'z-index': '-1'});
      });
      
      //Video bacthanh view
//      $('#bthanh-bnt').click(function(){
//        
//        var video = '';
//        video += '<div class="bt-video">';
//        video += '<table style="width:100%; height:100%"><tr><td style="text-align:center"><div>';
//        video += '<div class="close"></div>';
//        video += '<video controls="controls" autoplay style="width:600px; height:auto"><source src="./sites/default/files/pvbt.mp4" type="video/mp4"></video>';
//        video += '</div></td></tr></table>';
//        video += '</div>';
//        
//        $('body').append(video);
//        
//        $('.bt-video .close').click(function(){
//          $('.bt-video').remove();
//        });
//      });
      
      if ($('.page-node-26').length > 0) {
        $('.view-video').trigger('click');
      }
      
    }
  }

})(jQuery, Drupal, this, this.document);