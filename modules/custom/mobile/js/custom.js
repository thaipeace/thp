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
        $('body').hide();
      });
      
      var myVar = setInterval(function(){ checkLoad() }, 50);
      function checkLoad() {
        var d = Pace.bar.progress;
        if (d > 90) {
          $('body .layout-center').show();
          clearInterval(myVar);
        }
      }
      
    }
  }

})(jQuery, Drupal, this, this.document);