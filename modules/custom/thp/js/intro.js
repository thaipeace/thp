/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


(function ($, Drupal, window, document) {

  'use strict';

  // To understand behaviors, see https://drupal.org/node/756722#behaviors
  Drupal.behaviors.intro = {
    attach: function (context, settings) {
      
      function timeOut(){
        $('.skip-wrapper').fadeIn('fast');
			};
      setTimeout(timeOut,6000);

      $('#btn_skip').click(function(){
        document.getElementById('videoskip1').pause();
        $('.video1-wrapper').hide();
        $('.skip-wrapper').hide();
        $('.img_logoDr').hide();
        
        $('.video2-wrapper').fadeIn("fast");
        document.getElementById('videoskip2').play();
        document.getElementById('videoskip2').addEventListener(
          'ended',
          function(){
            $('.video2-wrapper').fadeOut(1000, 'swing', function() {
              window.location = 'home';
            });
          },
          false
        );
        
      });
    }
  }

})(jQuery, Drupal, this, this.document);