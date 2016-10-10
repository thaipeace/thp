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
      if (!isMobile()) {
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
      }



      // Aseptic Menu click
      if ($('#block-views-aseptic-block-1 .views-row').length > 0) {
        var preInd;
        $('#block-views-aseptic-block-1 .views-row').click(function(){

          if (!$(this).hasClass('active')) {
            preInd = $('#block-views-aseptic-block-1').find('.active').index();

            $('#block-views-aseptic-block-1 .views-row').removeClass('active');
            $(this).addClass('active');

            //Hide aseptic menu after click - pho
            $('#block-views-aseptic-block-1').removeClass('active');

            var ind = $(this).index();
            $('#block-views-aseptic-block .views-row, #block-views-aseptic-block-2 .views-row').removeClass('active').find('.active').removeClass('active');
            $($('#block-views-aseptic-block .views-row').get(ind)).addClass('active');
            
            // Auto point click
            if ($('.field-name-field-title.auto', $($('#block-views-aseptic-block .views-row').get(ind))).length > 0) {
              $('.field-name-field-title.auto', $($('#block-views-aseptic-block .views-row').get(ind))).trigger('click');
            }
            
            //Remove title from steps
            $('.entity.entity-field-collection-item.field-collection-item-field-parts.clearfix.active').removeClass('active');
            $(".introduce-title").addClass('hidden');
            $(".swipe-title").addClass('hidden');
            $('.aseptic-process').removeClass('active');
            $('#block-views-aseptic-block .wp_experience').removeClass('active');
            clearTimeout(stopTimeout);
            //Display text
            if($(this).attr('class').indexOf('views-row-first') !== -1){

              $('.aseptic-footer').removeClass('active');
              $(".introduce-title").removeClass('hidden');
              $(".swipe-title").removeClass('hidden');
              $('#process1').addClass('active');
            }
            else{
              $('.aseptic-footer').addClass('active');
              var text = $(this).find('.views-field-title').html();
              $('.footer-text').html(text);
            }

            //Display icon
            var imgSrc = $('#block-views-aseptic-block-1 .views-row.active .field-content img').attr('src');
            $('.footer-left-btn').html('<img src="'+ imgSrc + '">');

            if ($(this).hasClass('views-row-first')) {
              $('.svg-circle .pw:first-child').trigger('click');
            }

            // Count number
            if ($($('#block-views-aseptic-block .views-row').get(ind)).find('.iCounter')) {
              var counter = $($('#block-views-aseptic-block .views-row').get(ind)).find('.iCounter');

              if ($(counter[0]).attr('id')) {
                countNumber($(counter[0]).attr('id'), parseInt(($(counter[0]).text()).replace('.','')), 2);
              }
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
      var blocks = ['#block-views-aseptic-block', '#block-views-aseptic-block-2', '#block-views-bottle-block', '#block-views-label-block'];
      $(blocks).each(function(indBlock, block){
        if ($(block + ' .views-row').length > 0) {
          var titleExtraTypes = ['data', 'video', 'link']; //['data','video'];
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
        var stepInd = $(step).index();
        $('.views-field-title .field-content', $('#block-views-aseptic-block-1 .views-row').get(stepInd)).show();
        
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

        if ($('#block-views-aseptic-block .views-row.views-row-first.active').length > 0) {
          var items = $('#block-views-aseptic-block .views-row.views-row-first .svg-circle .pw');
          // autoClick(items, 4000, '#block-views-aseptic-block-1 .views-row.views-row-11', '#block-views-aseptic-block-1');
        }

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
          // autoClick(items, 3000, '#block-views-bottle-block-1 .views-row.views-row-11', '#block-views-bottle-block-1');
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
              }, 2000)
            }
          }, speed, nextpage);
        })();
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
          var counter = 0;
          $('.views-field-nothing .field-name-field-position', element).each(function(ind, elem){

            var str_po = $(elem).text();
            var arr_po = str_po.split(',').map(function(item) {
              return parseInt(item, 10);
            });

            var title = $($(elem).parent().find('.field-name-field-title').get(ind));
            //Random left and top based on screen height
            var screenHeight = $(window).height();
            var left, top;
            // if(counter == 3){
            //   if(screenHeight > 414){
            //     left = Math.floor(Math.random() * 67*(counter+1)) + 67*counter;
            //     top = Math.floor(Math.random() * 20*(counter+1)) + 20*(counter);
            //   }
            //   else{
            //     left = Math.floor(Math.random() * 68*(counter+1)) + 68*counter;
            //     top = Math.floor(Math.random() * 10*(counter+1)) + 10*(counter);
            //   }
            // }
            // else{
            //   if(screenHeight > 414){
            //     left = Math.floor(Math.random() * 50*(counter+1)) + 50*counter + 20;
            //     top = Math.floor(Math.random() * 30*(counter+1)) + 30*(counter) + 30;
            //   }
            //   else{
            //     left = Math.floor(Math.random() * 55*(counter+1)) + 55*counter + 20;
            //     top = Math.floor(Math.random() * 15*(counter+1)) + 15*(counter) + 10;
            //   }
            // }
            if(screenHeight > 414){
              left = (counter+1)*50;
              top = (counter+1)*70;
            }
            else{
              left = (counter+1)*80;
              top = (counter+1)*30;
            }


            title.css({
              left:left + 'px',
              top: top + 'px'
            });
            counter++;

            // Draw line animate
            // if (title.text() === 'data') {
            //   var style = [
            //         "fill:none",
            //         "stroke:black",
            //         "stroke-width:1",
            //         "stroke-linejoin:round",
            //         "stroke-linecap:round",
            //         "stroke-dasharray:1000",
            //         "animation: dash 3s ease-in-out forwards",
            //         "stroke:#000000"
            //       ];
            //   // Line animate for nid-9
            //   if ($(element).hasClass('nid-9')) {
            //     var pathTag = pathAnimate('M748 49 V153 H720 M530 153 H150 V140', style);
            //     var svgLine = "<svg class='dash-line' width='770' height='160' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' xml:space='preserve'>";
            //     svgLine += pathTag;
            //     svgLine += "</svg>";
            //
            //     $($('.views-field-field-parts .entity', element).get(ind)).append(svgLine);
            //     $($('.views-field-field-parts .entity', element).get(ind)).css({
            //       'left': (arr_po[0] - $($('.views-field-field-parts .entity', element).get(ind)).width() + 79) + 'px',
            //       'top': (arr_po[1] + 185) + 'px'
            //     });
            //
            //   }
            //
            //   // Line animate for nid-12
            //   style = [
            //     "fill:none",
            //     "stroke:black",
            //     "stroke-width:1",
            //     "stroke-linejoin:round",
            //     "stroke-linecap:round",
            //     "stroke-dasharray:1000",
            //     "animation: dash 3s ease-in-out forwards",
            //     "stroke:#f1e601"
            //   ];
            //   if ($(element).hasClass('nid-12')) {
            //     var pathTag = pathAnimate('M0 40 V150 H190', style);
            //     var svgLine = "<svg class='dash-line' width='770' height='360' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' xml:space='preserve'>";
            //     svgLine += pathTag;
            //     svgLine += "</svg>";
            //
            //     $($('.views-field-field-parts .entity', element).get(ind)).append(svgLine);
            //     $($('.views-field-field-parts .entity', element).get(ind)).css({
            //       'left': (arr_po[0] + 101) + 'px',
            //       'top': (arr_po[1] + 161) + 'px'
            //     });
            //
            //   }
            // }else {
              goTop(title, top, 10);
            //}
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

  function isMobile(){
    return (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino|android|ipad|playbook|silk/i.test(navigator.userAgent||navigator.vendor||window.opera)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test((navigator.userAgent||navigator.vendor||window.opera).substr(0,4)));
  }

})(jQuery, Drupal, this, this.document);
