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
      var stopTimeout;
      var url = window.location.href;
      
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
        var preInd;
        $('#block-views-aseptic-block-1 .views-row').click(function(){
          if (!$(this).hasClass('active')) {
            preInd = $('#block-views-aseptic-block-1').find('.active').index();
            
            $('#block-views-aseptic-block-1 .views-row').removeClass('active');
            $(this).addClass('active');

            var ind = $(this).index();
            $('#block-views-aseptic-block .views-row, #block-views-aseptic-block-2 .views-row').removeClass('active').find('.active').removeClass('active');
            $($('#block-views-aseptic-block .views-row').get(ind)).addClass('active');
            
            // Auto point click
            if ($('.field-name-field-title.auto', $($('#block-views-aseptic-block .views-row').get(ind))).length > 0) {
              $('.field-name-field-title.auto', $($('#block-views-aseptic-block .views-row').get(ind))).trigger('click');
            }

            clearTimeout(stopTimeout);
            
            if ($(this).hasClass('views-row-first')) {
              $('.svg-circle .pw:first-child').trigger('click');
            }
            
            // Blink Menu
            if ($(this).hasClass('views-row-last')) {
              blink();
            }
            
            // Count number
            if ($($('#block-views-aseptic-block .views-row').get(ind)).find('.iCounter')) {
              var counter = $($('#block-views-aseptic-block .views-row').get(ind)).find('.iCounter');
              
              if ($(counter[0]).attr('id')) {
                countNumber($(counter[0]).attr('id'), parseInt(($(counter[0]).text()).replace('.','')), 2);
              }
            }
            
            // Hard code for 2 last process
            $('#block-views-aseptic-block-1 .views-row').removeClass('follow');
            if ($.inArray(ind, [2,1]) !== -1) {
              $('#block-views-aseptic-block-1 .views-row-4').addClass('follow');
            }
          }
          
          // Close button on aseptic process page
          if (preInd !== -1) {
            $('#block-views-aseptic-block .views-row.views-row-first .views-field-body .bnt.close span').css('display','block').click(function(){
              if (preInd !== 0) {
                $('#block-views-aseptic-block-1 .views-row.views-row-' + (preInd+1)).trigger('click');
                
              }
            });
          }      
        });
        
        $('#block-views-aseptic-block-1 .views-row.views-row-first').trigger('click');
        
        if (url.indexOf('day-chuyen-san-xuat-nha-may-number-one') !== -1) {
          var args = getUrlVars();
          if (!$.isEmptyObject(args) && args.rel !== 'auto') {
            $(document).ready(function(){
              $('#block-views-aseptic-block-1 .views-row-' + args.rel).trigger('click');
            });
          }
        } 
      }
      
      // Bottle Menu click
      if ($('#block-views-bottle-block-1 .views-row').length > 0) {
        $('#block-views-bottle-block-1 .views-row').click(function(){
          if (!$(this).hasClass('active')) {
            $('#block-views-bottle-block-1 .views-row').removeClass('active');
            $(this).addClass('active');

            var ind = $(this).index();
            $('#block-views-bottle-block .views-row').removeClass('active').find('.active').removeClass('active');
            $($('#block-views-bottle-block .views-row').get(ind)).addClass('active');
            
            clearTimeout(stopTimeout);
            
            if ($(this).hasClass('views-row-first')) {
              $('.svg-circle .pw:first-child').trigger('click');
            }
            
            // Count number
            if ($($('#block-views-bottle-block .views-row').get(ind)).find('.iCounter')) {
              var counter = $($('#block-views-bottle-block .views-row').get(ind)).find('.iCounter');
              
              if ($(counter[0]).attr('id')) {
                countNumber($(counter[0]).attr('id'), parseInt(($(counter[0]).text()).replace('.','')), 2);
              }
            }
          }
          
        });
        
        $('#block-views-bottle-block-1 .views-row.views-row-first').trigger('click');
        setTimeout(function() {
          $('#block-views-bottle-block-1 .views-row.views-row-2').trigger('click');
        }, 100);
        
        if (url.indexOf('day-chuyen-san-xuat-nha-may-number-one') !== -1) {
          var args = getUrlVars();
          if (!$.isEmptyObject(args) && args.rel !== 'auto') {
            $(document).ready(function(){
              $('#block-views-bottle-block-1 .views-row-' + args.rel).trigger('click');
            });
          }
        }
      }
      
      // Label Menu click
      if ($('#block-views-label-block-1 .views-row').length > 0) {
        $('#block-views-label-block-1 .views-row').click(function(){
          if (!$(this).hasClass('active')) {
            $('#block-views-label-block-1 .views-row').removeClass('active');
            $(this).addClass('active');

            var ind = $(this).index();
            $('#block-views-label-block .views-row').removeClass('active').find('.active').removeClass('active');
            $($('#block-views-label-block .views-row').get(ind)).addClass('active');
            
            clearTimeout(stopTimeout);
            
            if ($(this).hasClass('views-row-first')) {
              $('.svg-circle .pw:first-child').trigger('click');
            }
            
            // Count number
            if ($($('#block-views-label-block .views-row').get(ind)).find('.iCounter')) {
              var counter = $($('#block-views-label-block .views-row').get(ind)).find('.iCounter');
              
              if ($(counter[0]).attr('id')) {
                countNumber($(counter[0]).attr('id'), parseInt(($(counter[0]).text()).replace('.','')), 2);
              }
            }
          }
          
        });
        
        $('#block-views-label-block-1 .views-row.views-row-first').trigger('click');
        
        if (url.indexOf('day-chuyen-san-xuat-nha-may-number-one') !== -1) {
          var args = getUrlVars();
          if (!$.isEmptyObject(args) && args.rel !== 'auto') {
            $(document).ready(function(){
              $('#block-views-label-block-1 .views-row-' + args.rel).trigger('click');
            });
          }
        }
      }
      
      // Reorder parts title, position
      // Draw line
      var blocks = ['#block-views-aseptic-block', '#block-views-aseptic-block-2', '#block-views-bottle-block', '#block-views-label-block', '#block-views-label-block-2'];
      $(blocks).each(function(indBlock, block){
        if ($(block + ' .views-row').length > 0) {
          var titleExtraTypes = ['data', 'video', 'link'];
          $(block + ' .views-row').each(function(index, element) {
            if ($('.views-field-field-parts .entity', element).length > 0) {
              
              $('.views-field-field-parts .entity', element).each(function(ind, elem){
                var title = $('.field-name-field-title', elem).text();
                var titleIndex = titleExtraTypes.indexOf(title);
                
                if (titleIndex !== -1) {
                  $('.field-name-field-title', elem).addClass(titleExtraTypes[titleIndex] + ' extra');
                  $(elem).addClass(titleExtraTypes[titleIndex] + ' extra');
                  if (titleIndex === 0) {
                    $('.field-name-field-title', elem).hide();
                  }
                  if (titleIndex === 1) {
                    $('.field-name-field-video .field-item', elem).append('<div class="close"></div>');
                  }
                  
                  if ($('.field-name-field-description', elem).length > 0) {
                    $('.field-name-field-title', elem).addClass($('.field-name-field-description', elem).text());
                    $(elem).addClass($('.field-name-field-description', elem).text());
                  }
                  
                } else {
                  $(elem).append('<div class="close"></div>');
                }

                $('.views-field-nothing .field-content', element).append($('.field-name-field-title', elem));
                $('.views-field-nothing', element).append($('.field-name-field-position', elem));
                
              });
              
            }
          });
        }
      });
      
      // Close click
      $('.close').on('click', function(){
        $('.views-field-field-parts .entity').removeClass('active');
        $('.views-field-field-parts .entity').parent().find('.active').removeClass('active');
        
        var video = $(this).parent().find('video');
        if (video.length !== 0) {
          $(video)[0].pause();
        }
        
        setTimeout(function() {
          $('.views-field-field-parts').removeClass('active');
        }, 300);
        
        //Show label menu process
        $('#block-views-label-block-1').fadeIn(1200);
        
        // Reshow tootip left menu
        var step = $(this).parents('.views-row');
        var stepInd;
        if (step.hasClass('follow')) {
          //Array all class
          var clArr = step.attr('class').split(" ");
          //Remove "follow" string
          var followId = clArr[6].substring(7);
          if (followId !== "") {
            stepInd = $('#block-views-aseptic-block .' + followId).index();
          }else {
            // In case of views-row-last
            followId = clArr[7].substring(7);
            stepInd = $('#block-views-aseptic-block .' + followId).index();
          }
        }else {
          stepInd = $(step).index();
        }
        
        $('.views-field-title .field-content', $('#block-views-aseptic-block-1 .views-row').get(stepInd)).show();
        
        // Hard code for 2 last process
        if ($.inArray(stepInd, [2,1]) !== -1) {
          $('.views-field-title .field-content', $('#block-views-aseptic-block-1 .views-row').get(3)).show();
        }
        
        $('#block-views-aseptic-block .view-footer').css({'z-index': '-1'});
        $('#block-views-aseptic-block-2 .view-footer').css({'z-index': '-1'});
        
        if ($('.entity.auto', step).length > 0) {
          // TODO do it for all case not only for row-11
          $('#block-views-aseptic-block-1 .views-row-11').trigger('click');
          $('#block-views-aseptic-block-1 .views-row-11 .views-field-title .field-content').show();
        }
      });
      
      // Summary aseptic process
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
            $('#block-views-aseptic-block .views-row.views-row-first .views-field-field-parts .entity').removeClass('active');
            element.addClass('active');
          }
        });
        
        Pace.on('done', function(){
          if ($('#block-views-aseptic-block .views-row.views-row-first.active').length > 0) {
            var items = $('#block-views-aseptic-block .views-row.views-row-first .svg-circle .pw');
            //Auto click after the page loaded
            autoClick(items, 3000, '#block-views-aseptic-block-1 .views-row.views-row-last', '#block-views-aseptic-block-1');
          }
        });
        
        // Active first child when load
        $('#block-views-aseptic-block .views-row.views-row-first .views-field-field-parts .entity:first-child').addClass('active');
        $('#block-views-aseptic-block .views-row.views-row-first .field-collection-item-field-parts .field-name-field-description').prepend('<div class="line"></div>');
      }
      
      // Summary bottle process
      if ($('#block-views-bottle-block .views-row.views-row-first .views-field-nothing').length > 0) {
        var width = $('#block-views-bottle-block .views-row.views-row-first .views-field-nothing').width();
        var height = $('#block-views-bottle-block .views-row.views-row-first .views-field-nothing').height();
        var x = '';
        var path = 'M';
        var circles = '';
        
        $('#block-views-bottle-block .views-row.views-row-first .views-field-nothing .field-name-field-title').each(function(index, element) {
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
        $('#block-views-bottle-block .views-row.views-row-first .views-field-nothing').prepend(svg);
        
        // Click proccess
        $('#block-views-bottle-block .views-row.views-row-first .svg-circle .pw').click(function() {
          if (!$(this).hasClass('active')) {
            var ind = $(this).index();

            $('.svg-circle .pw').removeClass('active');
            $(this).addClass('active');

            $('.svg-circle .pw .point').hide();
            $('.point', this).show();
            
            var element = $($('#block-views-bottle-block .views-row.views-row-first .views-field-field-parts .entity').get(ind));
            $('#block-views-bottle-block .views-row.views-row-first .views-field-field-parts .entity').removeClass('active');
            element.addClass('active');
          }
        });
        
        if ($('#block-views-bottle-block .views-row.views-row-first.active').length > 0) {
          var items = $('#block-views-bottle-block .views-row.views-row-first .svg-circle .pw');
          //autoClick(items, 3000, '#block-views-bottle-block-1 .views-row.views-row-11', '#block-views-bottle-block-1'); 
        }
        
        // Active first child when load
        $('#block-views-bottle-block .views-row.views-row-first .views-field-field-parts .entity:first-child').addClass('active');
        $('#block-views-bottle-block .views-row.views-row-first .field-collection-item-field-parts .field-name-field-description').prepend('<div class="line"></div>');
      }
      
      // TODO: Summary label process
      
      function autoClick(items, speed, nextpage, disable) {
        var counter = 0;
        (function next() {
          if (counter++ >= items.length+1) {
            $(disable).css('pointer-events','auto');
            //$('#block-views-aseptic-block .views-row.views-row-first .views-field-nothing').css('pointer-events','auto');
            return;
          }else {
            if (url.indexOf('day-chuyen-san-xuat-nha-may-number-one') !== -1) {
              var args = getUrlVars();
              if ((!$.isEmptyObject(args) && args.rel === 'auto') || $.isEmptyObject(args)) {
                $(document).ready(function(){
                  $(disable).css('pointer-events','none');
                  //$('#block-views-aseptic-block .views-row.views-row-first .views-field-nothing').css('pointer-events','none');
                });
              }
            }
          }
          
          stopTimeout = setTimeout(function() {
            $(items[counter]).trigger('click'); 
            next();
            if (counter == items.length+2) {
              //more time in the end
              setTimeout(function() {
                $(nextpage).trigger('click');
              }, 2000);
            }
          }, speed, nextpage);
        })();
      }

      function blink() {
        $('#block-views-aseptic-block-1 .views-row').each(function(index, element){
          $('.views-field-field-menu-icon img', element)
                  .delay(7800 - 600*index).animate({opacity:0.4},1)
                  .delay(200).animate({opacity:1, width:'50%'},200)
                  .delay(100).animate({width:'37%'},200);
        });
      }
      
      // Introduction button click
      $('#question-bnt .left-item-inner').click(function(){
        $('#block-views-aseptic-block-1 .views-row-last').trigger('click');
        $('#block-views-aseptic-block .views-row-last .views-field-body').show();
        
        $('#block-views-aseptic-block-1').css('pointer-events','auto');
        $('#block-views-aseptic-block .views-row.views-row-first .views-field-nothing').css('pointer-events','auto');
      });
      
      // Click next page in body
      $('#block-views-aseptic-block .views-row-first .views-field-body .next').click(function(){
        $('#block-views-aseptic-block-1 .views-row-last').trigger('click');
        $('#block-views-aseptic-block .views-row-last .views-field-body').show();
        
        $('#block-views-aseptic-block-1').css('pointer-events','auto');
        $('#block-views-aseptic-block .views-row.views-row-first .views-field-nothing').css('pointer-events','auto');
      });
      
      // 2D position
      $('.aseptic').each(function(index, element){
        if ($('.views-field-field-fix-background', element).length > 0) {
          $('.views-field-nothing .field-name-field-position', element).each(function(ind, elem){
            
            var str_po = $(elem).text();
            var arr_po = str_po.split(',').map(function(item) {
              return parseInt(item, 10);
            });
            
            var title = $($(elem).parent().find('.field-name-field-title').get(ind));
            title.css({
              left: arr_po[0] + 'px',
              top: arr_po[1] + 'px'
            });
            
            // Draw line animate
            if (title.text() === 'data') {
              var style = [
                    "fill:none",
                    "stroke:black",
                    "stroke-width:1",
                    "stroke-linejoin:round",
                    "stroke-linecap:round",
                    "stroke-dasharray:1000",
                    "animation: dash 3s ease-in-out forwards",
                    "stroke:#000000"
                  ];
              // Line animate for nid-9
              if ($(element).hasClass('nid-9')) {
                var pathTag = pathAnimate('M748 49 V153 H720 M530 153 H150 V140', style);
                var svgLine = "<svg class='dash-line' width='770' height='160' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' xml:space='preserve'>";
                svgLine += pathTag;
                svgLine += "</svg>";
                
                $($('.views-field-field-parts .entity', element).get(ind)).append(svgLine);
                $($('.views-field-field-parts .entity', element).get(ind)).css({
                  'left': (arr_po[0] - $($('.views-field-field-parts .entity', element).get(ind)).width() + 79) + 'px',
                  'top': (arr_po[1] + 185) + 'px'
                });
                
              }
              
              // Line animate for nid-12
              style = [
                "fill:none",
                "stroke:black",
                "stroke-width:1",
                "stroke-linejoin:round",
                "stroke-linecap:round",
                "stroke-dasharray:1000",
                "animation: dash 3s ease-in-out forwards",
                "stroke:#f1e601"
              ];
              if ($(element).hasClass('nid-12')) {
                var pathTag = pathAnimate('M0 40 V150 H190', style);
                var svgLine = "<svg class='dash-line' width='770' height='360' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' xml:space='preserve'>";
                svgLine += pathTag;
                svgLine += "</svg>";
                
                $($('.views-field-field-parts .entity', element).get(ind)).append(svgLine);
                $($('.views-field-field-parts .entity', element).get(ind)).css({
                  'left': (arr_po[0] + 101) + 'px',
                  'top': (arr_po[1] + 161) + 'px'
                });
                
              }
            }else {
              goTop(title, arr_po[1], 5);
            }
          });
        }
      });
    }
  };
  
  function goTop(element, cur, far) {
    $(element).animate( {top: cur+far},
                        {duration: 1000,
                          complete: function() {
                            goTop(element, cur, -far);
                          }
                        }
                      );
  }
  
  function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,    
    function(m,key,value) {
      vars[key] = value;
    });
    return vars;
  }
  
  /*
   * path String: html5 path format. Ex. M200 0 L40 25 L100 200
   */
  function pathAnimate(path, style) {
    if (!style) {
      style = [
        "fill:none",
        "stroke:black",
        "stroke-width:1",
        "stroke-linejoin:round",
        "stroke-linecap:round",
        "stroke-dasharray:1000",
        "animation: dash 3s ease-in-out forwards",
        "stroke:#FFFFFF"
      ];
    }
    
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
  
  function countNumber(tagId, countTo, duration) {
    var options = {
      useEasing : false, 
      useGrouping : true, 
      separator : '.', 
      decimal : ',', 
      prefix : '', 
      suffix : '' 
    };
    var counter = new CountUp(tagId, 0, countTo, 0, duration, options);
    counter.start();
  }
  
})(jQuery, Drupal, this, this.document);