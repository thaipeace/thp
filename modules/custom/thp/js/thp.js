/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


(function ($, Drupal, window, document) {

  'use strict';

  // To understand behaviors, see https://drupal.org/node/756722#behaviors
  Drupal.behaviors.services = {
    attach: function (context, settings) {

      // Left Menu click
      if ($('#menu-bnt').length > 0) {
        $('#menu-bnt').click(function(){
          if ($('#block-block-2.active').length < 1) {
            $('#block-block-2').addClass('active').show("slide", {direction: "left" }, 300);
            $(this).addClass('active');
          }else {
            $('#block-block-2').removeClass('active').hide("slide", {direction: "left" }, 300);
            $(this).removeClass('active');
          }
        });
      }
      
      // Aseptic Menu click
      if ($('#block-views-aseptic-block-1 .views-row').length > 0) {
        $('#block-views-aseptic-block-1 .views-row').click(function(){
          if (!$(this).hasClass('active')) {
            $('#block-views-aseptic-block-1 .views-row').removeClass('active');
            $(this).addClass('active');

            var ind = $(this).index();
            $('#block-views-aseptic-block .views-row').css('left','100vw');
            $($('#block-views-aseptic-block .views-row').get(ind)).animate({'left':'0'}, 500, 'swing');
          }

        });
        $('#block-views-aseptic-block .views-row-first').css('left', '0');
      }
      
      
      // Reorder parts title
      if ($('#block-views-aseptic-block .views-row').length > 0) {
        $('#block-views-aseptic-block .views-row').each(function(index, element) {
          if ($('.views-field-field-parts .field-collection-item-field-parts', element).length > 0) {
            $('.views-field-field-parts .field-collection-item-field-parts', element).each(function(ind, elem){
              $('.views-field-nothing .field-content', element).append($('.field-name-field-title', elem));
            });
          }
        });
      }
      
      // Try it button
      if ($('.node-2 .bnt-try').length > 0) {
        // Try it button
        for (var i = 0; i < 51; i++) {
          if (i < 10) {
            i = '0' + i;
          }
          $('.node-2 .bnt-try .img_exper1 a').append('<div class="item' + i + '"></div>');
          $('.node-2 .bnt-try .img_exper1 .item' + i).css('background', 'url("/thp/sites/default/modules/custom/thp/images/tryitbnt/heloo_000' + i + '.png") center center no-repeat');
        }
        
        $('.node-2 .bnt-try .img_exper1 a').hover(function(){
          tryAnimate();
        }, function(){});
      }
      
      /*
      * Tryit button twikle
      */  
      function tryAnimate() {
       var maxLoops = 73;
       var counter = 0;

       (function next() {
           if (counter++ >= maxLoops) return;

           setTimeout(function() {
               $('.node-2 .bnt-try .img_exper1 a > div').hide();
               $('.node-2 .bnt-try .img_exper1 a .item' + counter).show();
               next();
           }, 10);
       })();
      }
      
      // Summary process
      if ($('#block-views-aseptic-block .views-row.views-row-first .views-field-nothing').length > 0) {
        var width = $('#block-views-aseptic-block .views-row.views-row-first .views-field-nothing').width();
        var height = $('#block-views-aseptic-block .views-row.views-row-first .views-field-nothing').height();
        var x = '';
        var path = 'M';
        var circles = '';
        
        $('#block-views-aseptic-block .views-row.views-row-first .views-field-nothing .field-name-field-title').each(function(index, element) {
          x = getCenterDiv(element);
          circles += '<div class="pw" style="top:29px;left:' + (x-22) + 'px;"><div class="point"></div><div class="circle"></div></div>';
          path += (index === 0)? x + ' 70 ':'L' + x + ' 70 ' ;
        });
        var svgCir = "<div class='svg-circle'>" + circles + "</div>";
        
        var pathTag = pathAnimate(path);
        var svgLine = "<svg class='dash-line' width='" + width + "' height='" + height + "' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' xml:space='preserve'>";
        svgLine += pathTag;
        svgLine += "</svg>";
        
        var svg = svgCir + svgLine;
        
        $('#block-views-aseptic-block .views-row.views-row-first .views-field-nothing').prepend(svg);
        
        // Click proccess
        $('#block-views-aseptic-block .views-row.views-row-first .svg-circle .pw').click(function() {
          if (!$(this).hasClass('active')) {
            var ind = $(this).index();

            $('.svg-circle .pw').removeClass('active');
            $(this).addClass('active');

            $('.svg-circle .pw .point').hide();
            $('.point', this).show();
            
            var element = $($('#block-views-aseptic-block .views-row.views-row-first .views-field-field-parts .entity').get(ind));
            $('#block-views-aseptic-block .views-row.views-row-first .views-field-field-parts .entity.active .field-name-field-image img').css('animation', 'makezoomout 0.5s ease-in-out forwards');
            $('.field-name-field-image img', element).css('animation', 'makezoomin 0.5s ease-in-out forwards');
            
            $('#block-views-aseptic-block .views-row.views-row-first .views-field-field-parts .entity').removeClass('active');
            $($('#block-views-aseptic-block .views-row.views-row-first .views-field-field-parts .entity').get(ind)).addClass('active');
          }
        });
        
        $('#block-views-aseptic-block .views-row.views-row-first .field-collection-item-field-parts .field-name-field-description').prepend('<div class="line"></div>');
      }
      
    }
  };
  
  /*
   * path String: html5 path format. Ex. M200 0 L40 25 L100 200
   */
  function pathAnimate(path) {
    var style = [
      "fill:none",
      "stroke:black",
      "stroke-width:1",
      "stroke-linejoin:round",
      "stroke-linecap:round",
      "stroke-dasharray:1000",
      "animation: dash 3s 1 ease-in-out forwards",
      "stroke:#FFFFFF"
    ];
    
    var pathTag = '';
    pathTag = "<path d='" + path + "' style='" + style.join(";") + "' />";

    return pathTag;
  }
  
  function getCenterDiv(container) {
    var offset = $(container).offset();
    var width = $(container).width();
    var x = offset.left + width / 2;
    
    return x;
  }

})(jQuery, Drupal, this, this.document);