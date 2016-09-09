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
      if($('.breadcrumb__item')){
        $($('.breadcrumb__item').children()[0]).html('<img src="sites/default/files/logodrthanh_0.png" alt="Home" class="header__logo-image">');
      }

      if($('#block-block-2 .block-wrapper .menu1 .title')){
        $('#block-block-2 .block-wrapper .menu1 .title').html('nhà máy <br/> tân hiệp phát');
      }

      //Init display pnt1
      if($('.pnt.point1')){
        $('.pnt.point1').addClass('active');
      }

      //Init add back and next button to factory page
      // if($('.node-3')){
      //   $('.node-3').append('<div class="next-back-wrapper"><img class="btn_next" src="sites/default/modules/custom/mobile/images/btn_next.png"><img class="btn_back" src="sites/default/modules/custom/mobile/images/btn_back.png"><div>');
      // }


      $('#menu-bnt').click(function(){
        var $block2 = $('#block-block-2');
        var $logo = $('img.header__logo-image');
        var $fbBtn = $('#fb-bnt');
        var $questionBtn= $('#question-bnt');
        var $volume = $('#volume-bnt');

        //Behavior for menu button
        if($block2.attr('class') && $block2.attr('class').indexOf('active') === -1 ){
          //Expand menu
          $(this).addClass('active');
          $block2.addClass('active');
          $logo.addClass('active');
          $fbBtn.addClass('active');
          $questionBtn.addClass('active');
          $volume.addClass('active');
        }
        else{
          //Collapse menu
          $(this).removeClass('active');
          $block2.removeClass('active');
          $logo.removeClass('active');
          $fbBtn.removeClass('active');
          $questionBtn.removeClass('active');
          $volume.removeClass('active');
        }


      });

      //Display preview of steps
      $('.ubl_img').click(function(){
        var parent = $(this).parent()[0];
        onublClick(parent);
      });

      $('.ubl>span').click(function(){
        var parent = $(this).parent()[0];
        onublClick(parent);
      });


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

      $('.wp_p1').animate({top: -10}, 2100);
      $('.wp_p2').animate({top: -10}, 1800);
      $('.wp_p3').animate({top: -10}, 1500);
      $('.wp_p4').animate({top: -10}, 1300);
      $('.wp_p5').animate({top: -10}, 1100);
      $('.wp_p6').animate({top: -10}, 900);
      $('.wp_p7').animate({top: -10}, 700);
      $('.wp_p8').animate({top: -10},500);
      $('.wp_p9').animate({top: -10}, 300);
      $('.wp_p10').animate({top: -10}, 100);
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

      $("body").on("swiperight",function(){
        console.log('a');
      });
      //Helper functions
      function onublClick(parent){
        var parentId = $(parent).attr('id');
        var idArr = parentId.split('');
        idArr.splice(0,3);
        var id = idArr.join('');


        removeUblActive();
        $('.pnt.point'+id).addClass('active');
        $(parent).find('.ubl_img').addClass('active');
      }

      function removeUblActive(){
        for(var i = 1; i <= 10; i++){
          $('.pnt.point'+i).removeClass('active');
        }
        $('.ubl_img').removeClass('active');
      }
    }


  }

})(jQuery, Drupal, this, this.document);
