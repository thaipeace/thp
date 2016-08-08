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
      
      // Summary process
      if ($('#block-views-aseptic-block .views-row.views-row-first .views-field-nothing').length > 0) {
        var width = $('#block-views-aseptic-block .views-row.views-row-first .views-field-nothing').width();
        var height = $('#block-views-aseptic-block .views-row.views-row-first .views-field-nothing').height();
        var x = '';
        var path = 'M';
        var circles = '';
        
        $('#block-views-aseptic-block .views-row.views-row-first .views-field-nothing .field-name-field-title').each(function(index, element) {
          x = getCenterDiv(element);
          circles += '<circle cx="' + x + '" cy="50" r="2" />';
          path += (index === 0)? x + ' 50 ':'L' + x + ' 50 ' ;
        });
        
        var svg = pathAnimate(path, width, height);
        
        $('#block-views-aseptic-block .views-row.views-row-first .views-field-nothing').prepend(svg);
        $('#block-views-aseptic-block .views-row.views-row-first .views-field-nothing .dash-line').prepend(circles);
      }
      
    }
  };
  
  /*
   * width Int, height Int: offset of container
   * path String: html5 path format. Ex. M200 0 L40 25 L100 200
   * style Array: svg path style colection
   *  EX: 
   *  style = [
        "fill:none",
        "stroke:black",
        "stroke-width:1",
        "stroke-linejoin:round",
        "stroke-linecap:round",
        "stroke-dasharray:1000",
        "animation: dash 3s 1 linear forwards",
        "stroke:#000000"
      ];
   */
  function pathAnimate(path, width, height) {
    var style = [
      "fill:none",
      "stroke:black",
      "stroke-width:1",
      "stroke-linejoin:round",
      "stroke-linecap:round",
      "stroke-dasharray:1000",
      "animation: dash 3s 1 linear forwards",
      "stroke:#FFFFFF"
    ];
    
    var svg = '';
    
    svg = "<svg class='dash-line' width='" + width + "' height='" + height + "' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' xml:space='preserve'>";
    svg += "<path d='" + path + "' style='" + style.join(";") + "' />";
    svg += "</svg>";

    return svg;
  }
  
  function getCenterDiv(container) {
    var offset = $(container).offset();
    var width = $(container).width();
    var x = offset.left + width / 2;
    
    return x;
  }

})(jQuery, Drupal, this, this.document);