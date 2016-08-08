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
      $('#menu-bnt').click(function(){
        if ($('#block-block-2.active').length < 1) {
          $('#block-block-2').addClass('active').show("slide", {direction: "left" }, 300);
          $(this).addClass('active');
        }else {
          $('#block-block-2').removeClass('active').hide("slide", {direction: "left" }, 300);
          $(this).removeClass('active');
        }
      });
      
      // Aseptic Menu click
      $('#block-views-aseptic-block-1 .views-row').click(function(){
        if (!$(this).hasClass('active')) {
          $('#block-views-aseptic-block-1 .views-row').removeClass('active');
          $(this).addClass('active');

          var ind = $(this).index();
          $('#block-views-aseptic-block .views-row').css('left','100vw');
          $($('#block-views-aseptic-block .views-row').get(ind)).animate({'left':'0'}, 500, 'swing');
        }
        
      });
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
  function pathAnimate(path, style, width, height) {
    var svg = '';
    
    svg = "<svg width='" + width + "' height='" + height + "' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' xml:space='preserve'>";
    svg += "<path d='" + path + "' style='" + style.join(";") + "' />";
    svg += "</svg>";

    return svg;
   }

})(jQuery, Drupal, this, this.document);