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
      //Init fix some styles
      $($('.breadcrumb__item').children()[0]).html('<img src="sites/default/files/logodrthanh_0.png" alt="Home" class="header__logo-image">');
      $('#block-block-2 .block-wrapper .menu1 .title').html('nhà máy <br/> tân hiệp phát');

      $('#menu-bnt').click(function(){
        var $block2 = $('#block-block-2');
        var $logo = $('img.header__logo-image');
        var $fbBtn = $('#fb-bnt');
        var $questionBtn= $('#question-bnt');

        //Behavior for menu button
        if($block2.attr('class') && $block2.attr('class').indexOf('active') === -1 ){
          //Expand menu
          $(this).addClass('active');
          $block2.addClass('active');
          $logo.addClass('active');
          $fbBtn.addClass('active');
          $questionBtn.addClass('active');
        }
        else{
          //Collapse menu
          $(this).removeClass('active');
          $block2.removeClass('active');
          $logo.removeClass('active');
          $fbBtn.removeClass('active');
          $questionBtn.removeClass('active');
        }


      });
    }


  }

})(jQuery, Drupal, this, this.document);
