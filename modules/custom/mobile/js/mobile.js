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
      var url = window.location.href;
      var mouseX, mouseY;
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
        $('#ubl1 img').addClass('active');
      }

      // Init add back and next button to factory page
      if($('.node-3')){
        $('.node-3').append('<div class="next-back-wrapper"><img class="btn_next" src="sites/default/modules/custom/mobile/images/btn_next.png"><img class="btn_back" src="sites/default/modules/custom/mobile/images/btn_back.png"><div>');
      }

      // console.log($('.entity.entity-field-collection-item.field-collection-item-field-parts.clearfix[about="/thpv1/field-collection/field-parts/49"]'));
      // $('.entity.entity-field-collection-item.field-collection-item-field-parts.clearfix[about="/thpv1/field-collection/field-parts/49"]').css('display', 'none');

      // if($('#block-views-bottle-block .views-row.views-row-first')){
      //   $('#block-views-bottle-block .views-row.views-row-first').append('<div class="bottle-process active" id="bprocess1">01. Hạt nhựa pet</div><div class="bottle-process" id="bprocess2">02. Phôi chai</div><div class="bottle-process" id="bprocess3">03. Chai nhựa</div>');
      // }
      //Init title for aseptic
      if($('#block-views-aseptic-block')){
        $('#block-views-aseptic-block').append('<h3 class="introduce-title">Tổng quan quy trình</h3>');
        $('#block-views-aseptic-block').append('<h3 class="swipe-title">Trượt ngang để xem tổng quan</h3>');
        $('#block-views-bottle-block .views-row.views-row-first').append('<h3 class="swipe-title">Trượt ngang để xem tổng quan</h3>');
        $('#block-views-aseptic-block').append('<div class="aseptic-process active" id="process1">01. Hạt nhựa pet</div><div class="aseptic-process" id="process2">02. Phôi chai</div><div class="aseptic-process" id="process3">03. Chai nhựa</div><div class="aseptic-process" id="process4">04. Quy trình Aseptic</div><div class="aseptic-process" id="process5">05. Sản phẩm hoàn tất</div>');
        $($('#block-views-aseptic-block  .views-row.views-row-first .svg-circle .pw')[0]).trigger('click');
      }

      $('#block-views-aseptic-block .wp_experience').addClass('active');
      $('#block-views-aseptic-block .wp_experience').append('<div class="wp-next-aseptic">Bắt đầu trải nghiệm<div><img src="sites/default/modules/custom/mobile/images/right-arrow.png"/></div></div>');
      $('#block-views-aseptic-block .wp_experience').append('<div class="line-wrapper"><img src="sites/default/modules/custom/mobile/images/aseptic-line.png"></div>');

      $('.wp-next-aseptic').click(function(){
        $('#block-views-aseptic-block-1 .views-row-11').trigger('click');
        $('#block-views-aseptic-block .views-row, #block-views-aseptic-block-2 .views-row').removeClass('active').find('.active').removeClass('active');
        $('#block-views-aseptic-block').addClass('active');
        $('#block-views-aseptic-block .views-row-11').addClass('active');
        $('#block-views-aseptic-block .views-row-11 .views-field-body').show();

        $('.aseptic-footer').addClass('active');
        var text = $('#block-views-aseptic-block .views-row-11 .views-field-title').html();
        $('.footer-text').html(text);
      })


      //Add foooter
      if($('body.page-node-4')){
        $('body.page-node-4').append('<div class="aseptic-footer"><div class="footer-left-btn"></div><div class="footer-text"></div><div class="footer-right-btn"><img src="sites/default/modules/custom/mobile/images/footer-right-btn.jpg"></div></div>');
        var imgSrc = $('#block-views-aseptic-block-1 .views-row.active .field-content img').attr('src');
        $('.footer-left-btn').html('<img src="'+ imgSrc + '">');
      }

      $('.footer-right-btn').click(function(){
        if($('#block-views-aseptic-block-1').attr('class').indexOf('active') === -1){
          $('#block-views-aseptic-block-1').addClass('active');
        }
        else{
          $('#block-views-aseptic-block-1').removeClass('active');
        }

      })

      $('.field_270_background .views-field-body').append('<div class="nav">Kéo trái phải để trải nghiệm</div>');


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

      $('.btn_next').click(function(){
        var $currentActive = $('.pnt.active');
        var currentPrId = $currentActive.attr('id');
        var idArr = currentPrId.split('');
        idArr.splice(0,3);
        var id = idArr.join('');
        id = +id +1;
        if(id < 13){
          removeUblActive();
          $('.pnt.point'+id).addClass('active');
          $('#ubl'+id+' img').addClass('active')
        }
      })
      $('.btn_back').click(function(){
        var $currentActive = $('.pnt.active');
        var currentPrId = $currentActive.attr('id');
        var idArr = currentPrId.split('');
        idArr.splice(0,3);
        var id = idArr.join('');
        id = +id -1;
        if(id > 0){
          removeUblActive();
          $('.pnt.point'+id).addClass('active');
          $('#ubl'+id+' img').addClass('active');
        }
      })

      //Swipe aseptic to view steps
      $('#block-views-aseptic-block .views-row-1 .entity.entity-field-collection-item ').on('swipeleft', function(){
        onAspeticSwipeleft();
      })
      $('#block-views-aseptic-block .views-row-1 .entity.entity-field-collection-item ').on('swiperight', function(){
        onAsepticSwiperight();
      })
       function onAspeticSwipeleft(){
         var $items = $('#block-views-aseptic-block .views-row.views-row-first .svg-circle .pw');
         var currentIndex = -1;
         for(var i=0; i<$items.length; i++){
           if($($items[i]).attr('class').indexOf('active') != -1){
             currentIndex = i;
           }
         }
           if(currentIndex < ($items.length - 1)){
             $($items[currentIndex + 1]).trigger('click');
             var temp = currentIndex + 1;
             $('#process' + temp).removeClass('active');
             temp += 1;
             $('#process' + temp).addClass('active');
           }
           else{
             $('#block-views-aseptic-block .entity.entity-field-collection-item.field-collection-item-field-parts.clearfix.active').removeClass('active');
             $("#block-views-aseptic-block .introduce-title").addClass('hidden');
             $("#block-views-aseptic-block .swipe-title").addClass('hidden');
             $('#block-views-aseptic-block  .views-row.views-row-first .svg-circle .pw').removeClass('active');
             $('#block-views-aseptic-block .aseptic-process').removeClass('active');
             $('#block-views-aseptic-block .views-row-last').addClass('active');
             $('#block-views-aseptic-block .views-row-last .views-field-body').show();
             $('#block-views-aseptic-block .hexagon.p1').addClass('active');
             $('#block-views-aseptic-block .wp_experience').append('<img class="guide-emp" src="sites/default/modules/custom/mobile/images/nhanvien1.png">');
           }
       }
       function onAsepticSwiperight(){
         var $items = $('#block-views-aseptic-block  .views-row.views-row-first .svg-circle .pw');
         var currentIndex = 0;
         for(var i=0; i<$items.length; i++){
           if($($items[i]).attr('class').indexOf('active') != -1){
             currentIndex = i;
           }
         }
         if(currentIndex > 0){
           $($items[currentIndex - 1]).trigger('click');
           var temp = currentIndex + 1;
           $('#process' + temp).removeClass('active');
           $('#process' + currentIndex).addClass('active');
         }

       }

      //Swipe bottle to view steps
      $('#block-views-bottle-block .views-row-1 .entity.entity-field-collection-item ').on('swipeleft', function(){
        onBottleSwipeleft();
      })
      $('#block-views-bottle-block .views-row-1 .entity.entity-field-collection-item ').on('swiperight', function(){
        onBottleSwiperight();
      })
       function onBottleSwipeleft(){
         var $items = $('#block-views-bottle-block .views-row.views-row-first .svg-circle .pw');
         var currentIndex = -1;
         for(var i=0; i<$items.length; i++){
           if($($items[i]).attr('class').indexOf('active') != -1){
             currentIndex = i;
           }
         }
           if(currentIndex < ($items.length - 1)){
             $($items[currentIndex + 1]).trigger('click');
             var temp = currentIndex + 1;
             $('.bottle-process').removeClass('active');
             temp += 1;
             if($('#bprocess' + temp)){
               $('#bprocess' + temp).addClass('active');
             }
           }
           else{
             $('#block-views-bottle-block .entity.entity-field-collection-item.field-collection-item-field-parts.clearfix.active').removeClass('active');
             $('#block-views-bottle-block .views-row.views-row-first .svg-circle .pw').removeClass('active');
             $('#block-views-bottle-block .bottle-process').removeClass('active');
           }
       }
       function onBottleSwiperight(){
         var $items = $('#block-views-bottle-block .views-row.views-row-first .svg-circle .pw');
         var currentIndex = 0;
         for(var i=0; i<$items.length; i++){
           if($($items[i]).attr('class').indexOf('active') != -1){
             currentIndex = i;
           }
         }
         if(currentIndex > 0){
           $($items[currentIndex - 1]).trigger('click');
           var temp = currentIndex + 1;
           $('#bprocess' + temp).removeClass('active');
           $('#bprocess' + currentIndex).addClass('active');
         }

       }

       $('#block-views-aseptic-block .wp_experience.active').on('swipeleft',function(){
         var $hexagons = $('#block-views-aseptic-block .hexagon');
         var hexaIndex = 0;
         for(var i=0; i<$hexagons.length; i++){
           if($($hexagons[i]).attr('class').indexOf('active') != -1){
             hexaIndex = i;
           }
         }
         if(hexaIndex < $hexagons.length - 1){
           var temp = hexaIndex + 1;
           $('#block-views-aseptic-block .hexagon.p' + temp).removeClass('active');
           temp += 1;
           $('#block-views-aseptic-block .hexagon.p' + temp).addClass('active');
         }
       })

       $('#block-views-aseptic-block .wp_experience.active').on('swiperight',function(){
         var $hexagons = $('#block-views-aseptic-block .hexagon');
         var hexaIndex = 0;
         for(var i=0; i<$hexagons.length; i++){
           if($($hexagons[i]).attr('class').indexOf('active') != -1){
             hexaIndex = i;
           }
         }
         if(hexaIndex > 0){
           var temp = hexaIndex + 1;
           $('#block-views-aseptic-block .hexagon.p' + temp).removeClass('active');
           $('#block-views-aseptic-block .hexagon.p' + hexaIndex).addClass('active');
         }
       })

       $('#block-views-aseptic-block .views-row-first .views-field-body .next').click(function(){
        //  $('#block-views-aseptic-block-1 .views-row-last').trigger('click');
         $('#block-views-aseptic-block .views-row-last .views-field-body').show();

         $('#block-views-aseptic-block-1').css('pointer-events','auto');
         $('#block-views-aseptic-block .views-row.views-row-first .views-field-nothing').css('pointer-events','auto');
       });


       $('#block-views-aseptic-block .views-row.views-row-first .svg-circle .pw').click(function() {
         if (!$(this).hasClass('active')) {
           var ind = $(this).index();

           $('.svg-circle .pw').removeClass('active');
           $(this).addClass('active');

           $('.svg-circle .pw .point').hide();
           $('.point', this).show();

           var element = $($('#block-views-aseptic-block .views-row.views-row-first .views-field-field-parts .entity').get(ind));
           $('#block-views-aseptic-block .views-row.views-row-first .views-field-field-parts .entity').removeClass('active');
           element.addClass('active');
         }
       });
      // Click from factory page
      $('.pnt').click(function(){
        var rel = $($('.pnt.active')[0]).attr('rel');
        if (['bottle', 'label'].indexOf(rel) === -1) {
          window.location = 'experience-instruction-landing?rel=' + rel;
        }else {
          rel==='bottle'?window.location = 'bottle-landing-page':false;
          rel==='label'?window.location = 'label-landing-page':false;
        }
      });
      var windowHeight = $( window ).height();
      if(windowHeight <= 414){
        $('.wp_p1').animate({top: 20}, 2300);
        $('.wp_p2').animate({top: 20}, 2100);
        $('.wp_p3').animate({top: 20}, 1900);
        $('.wp_p4').animate({top: 20}, 1700);
        $('.wp_p5').animate({top: 20}, 1500);
        $('.wp_p6').animate({top: 20}, 1300);
        $('.wp_p7').animate({top: 20}, 1100);
        $('.wp_p8').animate({top: 20}, 900);
        $('.wp_p9').animate({top: 20}, 700);
        $('.wp_p10').animate({top: 20}, 500);
        $('.wp_p11').animate({top: 20}, 300);
        $('.wp_p12').animate({top: 20}, 100);
      }
      else if(windowHeight >= 1024){
        $('.wp_p1').animate({top: -85}, 2300);
        $('.wp_p2').animate({top: -85}, 2100);
        $('.wp_p3').animate({top: -85}, 1900);
        $('.wp_p4').animate({top: -85}, 1700);
        $('.wp_p5').animate({top: -85}, 1500);
        $('.wp_p85').animate({top: -85}, 1300);
        $('.wp_p7').animate({top: -85}, 1100);
        $('.wp_p8').animate({top: -85}, 900);
        $('.wp_p9').animate({top: -85}, 700);
        $('.wp_p10').animate({top: -85}, 500);
        $('.wp_p11').animate({top: -85}, 300);
        $('.wp_p12').animate({top: -85}, 100);
      }
      else{
        $('.wp_p1').animate({top: -6}, 2300);
        $('.wp_p2').animate({top: -6}, 2100);
        $('.wp_p3').animate({top: -6}, 1900);
        $('.wp_p4').animate({top: -6}, 1700);
        $('.wp_p5').animate({top: -6}, 1500);
        $('.wp_p6').animate({top: -6}, 1300);
        $('.wp_p7').animate({top: -6}, 1100);
        $('.wp_p8').animate({top: -6}, 900);
        $('.wp_p9').animate({top: -6}, 700);
        $('.wp_p10').animate({top: -6}, 500);
        $('.wp_p11').animate({top: -6}, 300);
        $('.wp_p12').animate({top: -6}, 100);
      }

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

      // $("body").on("swiperight",function(){
      //   console.log('a');
      // });
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
        for(var i = 1; i <= 12; i++){
          $('.pnt.point'+i).removeClass('active');
        }
        $('.ubl_img').removeClass('active');
      }

      function getUrlVars() {
        var vars = {};
        var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,
        function(m,key,value) {
          vars[key] = value;
        });
        return vars;
      }


    }


  }

})(jQuery, Drupal, this, this.document);
