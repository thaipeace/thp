/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


(function ($, Drupal, window, document) {

  'use strict';

  // To understand behaviors, see https://drupal.org/node/756722#behaviors
  Drupal.behaviors.build360Bg = {
    attach: function (context, settings) {  
      
      // Build 360image
      $('.views-field-field-270-background .field-content').hide();
      
      $('#block-views-aseptic-block-1 .views-row').click(function() {
        $('#block-views-aseptic-block').addClass('active');
        $('#block-views-aseptic-block-2').removeClass('active');
        
        var index = $(this).index();
        var asepticBlock = $('#block-views-aseptic-block .views-row').get(index);
        
        // Drag background
        if ($('.views-field-field-drag-background', asepticBlock).length > 0) {
          var imageUrl = $('.views-field-field-drag-background .field-content', asepticBlock).text();
          $(asepticBlock).css({
            'background': 'url("'+ imageUrl +'") 0 0 no-repeat',
          });
          $(asepticBlock).backgroundDraggable({axis: 'x'});
        }
        
        // Fix background
        if ($('.views-field-field-fix-background', asepticBlock).length > 0) {
          var imageUrl = $('.views-field-field-fix-background .field-content', asepticBlock).text();
          $(asepticBlock).css({
            'background': 'url("'+ imageUrl +'") center center no-repeat',
            'background-size': 'cover'
          });
        }
        
        /** Background 360 build **/
        // Remove unsee canvas
        if ($('.views-field-field-270-background canvas').length > 0) {
          $('.views-field-field-270-background canvas').remove();
        }

        $('.views-field-field-270-background', asepticBlock).attr('id', 'three-' + index);
        var materialPath = $('.views-field-field-270-background .field-content', asepticBlock).text();
        if (materialPath.length > 0) {
          var container = 'three-' + index;
          build360Img(container, materialPath);

          // Appear some special data
          if (jQuery(asepticBlock).hasClass('nid-10')) {
            jQuery('.views-field-field-parts .entity.data', asepticBlock).fadeIn();
          }
          if (jQuery(asepticBlock).hasClass('nid-11')) {
            jQuery('.views-field-field-parts .entity.data', asepticBlock).fadeIn();
          }

        }
        
      });
      
      // Point clicked
      $('.field-name-field-title').click(function(){
        var index = $(this).index();
        var step = $(this).parents('.views-row');
        var stepInd;
        if (step.hasClass('follow')) {
          //Array all class
          var clArr = step.attr('class').split(" ");
          //Remove "follow" string
          
          var followId = clArr[6].substring(7);
          if (followId === "") {
            // In case of views-row last
            followId = clArr[8].substring(7);
          }
          stepInd = $('#block-views-aseptic-block .' + followId).index();
        }else {
          stepInd = $(step).index();
        }
        
        if (!$(this).hasClass('extra')) {
          $('.views-field-field-parts', step).addClass('active');
          $($('.views-field-field-parts .entity', step).get(index)).addClass('active');
        }else {
          if ($(this).hasClass('data')) {
            return false;
          }else if ($(this).hasClass('video')) {
            var part = $($('.views-field-field-parts .entity', step).get(index));
            $('.views-field-field-parts', step).addClass('active');
            $('.field-name-field-video', part).addClass('active');
            
            if (step.hasClass('active')) {
              $('video', part)[0].play();
            }
          }else if ($(this).hasClass('link')) {
            var ent = $($('.views-field-field-parts .entity', step).get(index));
            $('.field-name-field-description .field-item .bnt span', ent).trigger('click');
          }
        }
        
        $('.views-field-title .field-content', $('#block-views-aseptic-block-1 .views-row').get(stepInd)).hide();
        // Hard code for 2 last process
        if ($.inArray(stepInd, [2,1]) !== -1) {
          $('.views-field-title .field-content', $('#block-views-aseptic-block-1 .views-row').get(3)).hide();
        }
        
        $('#block-views-aseptic-block .view-footer').css({'z-index': '1'});
        $('#block-views-aseptic-block-2 .view-footer').css({'z-index': '1'});
      });
      
      // Click to step
      $('#block-views-aseptic-block').addClass('active');
      $('.bnt span').click(function(){
        
        var step = $(this).attr('rel');
        if (step !== 'external') {
          if (step.indexOf('#block-views-aseptic-block-1') !== -1) {
          
            $('#block-views-aseptic-block').addClass('active');
            $('#block-views-aseptic-block-2').removeClass('active');
            $(step).trigger('click');
          }else {

            $('#block-views-aseptic-block').removeClass('active');
            $('#block-views-aseptic-block-2').addClass('active');

            $('#block-views-aseptic-block-2 .views-row').removeClass('active');
            $(step).addClass('active');

            // Fix background
            if ($('.views-field-field-fix-background', step).length > 0) {
              var imageUrl = $('.views-field-field-fix-background .field-content', step).text();
              $(step).css({
                'background': 'url("'+ imageUrl +'") center center no-repeat',
                'background-size': 'cover'
              });
            }

            // Background 360 build
            if ($('.views-field-field-270-background canvas', step).length > 0) {
              $('.views-field-field-270-background canvas', step).remove();
            }

            $('.views-field-field-270-background', step).attr('id', 'threeExt-' + step[40]);
            var materialPath = $('.views-field-field-270-background .field-content', step).text();
            if (materialPath.length > 0) {
              var container = 'threeExt-' + step[40];
              build360Img(container, materialPath);
            }
          }
        }else {
          window.location = $(this).attr('href');
        }
      });
    }
  };

})(jQuery, Drupal, this, this.document);

function build360Img(container, materialPath) {

	var container1 = document.getElementById(container);

	//------------------------------//
	var camera, scene, renderer;
	var texture_placeholder;
	var isUserInteracting = false,
	onMouseDownMouseX = 0,
	onMouseDownMouseY = 0,
	lon = 90,
	onMouseDownLon = 0,
	lat = 0,
	onMouseDownLat = 0,
	phi = 0,
	theta = 0,
	target = new THREE.Vector3();
  var targetList = [];
	init(container1, materialPath);
  var projector, mouse = { x: 0, y: 0 };
	animate();

	//-----------------//
	function init(container, materialPath) {
    
		var container, mesh;
    var element = jQuery(container).parent();
    var point = {};
    
    camera = new THREE.PerspectiveCamera(1130, window.innerWidth / window.innerHeight, 1, 1100 );
		camera.fov = 42;
    
    camera.updateProjectionMatrix();
    
		scene = new THREE.Scene();
    
		texture_placeholder = document.createElement( 'canvas' );
		texture_placeholder.width = 128;
		texture_placeholder.height = 128;

		var context = texture_placeholder.getContext( '2d' );
		context.fillStyle = 'rgb( 200, 200, 200 )';
		context.fillRect( 0, 0, texture_placeholder.width, texture_placeholder.height );
    
    var geometry = new THREE.SphereGeometry( 800, 60, 40 );
    geometry.scale( - 1, 1, 1 );
    
    var map = new THREE.TextureLoader().load(materialPath);
    var material = new THREE.MeshBasicMaterial({
      map: map
    });

    mesh = new THREE.Mesh( geometry, material );
    
    scene.add(mesh);
    
		for ( var i = 0, l = mesh.geometry.vertices.length; i < l; i ++ ) {

			var vertex = mesh.geometry.vertices[ i ];

			vertex.normalize();
			vertex.multiplyScalar( 550 );

		}

		//renderer = new THREE.CanvasRenderer();
    renderer = new THREE.WebGLRenderer();
		renderer.setPixelRatio( window.devicePixelRatio );
		renderer.setSize( window.innerWidth, window.innerHeight );
		container.appendChild( renderer.domElement );
    
    projector = new THREE.Projector();
    
		document.addEventListener( 'mousedown', onDocumentMouseDown, false );
		document.addEventListener( 'mousemove', onDocumentMouseMove, false );
		document.addEventListener( 'mouseup', onDocumentMouseUp, false );
		document.addEventListener( 'mousewheel', onDocumentMouseWheel, false );
		document.addEventListener( 'MozMousePixelScroll', onDocumentMouseWheel, false);

		document.addEventListener( 'touchstart', onDocumentTouchStart, false );
		document.addEventListener( 'touchmove', onDocumentTouchMove, false );

		window.addEventListener( 'resize', onWindowResize, false );
    
    jQuery('.views-field-nothing .field-name-field-position', element).each(function(ind, elem) {
      if (jQuery(jQuery('.views-field-nothing .field-name-field-title', element).get(ind)).text() !== 'data') {
        var pointMaterial = loadTexture('./sites/default/modules/custom/thp/images/icon_hxg.png');
        var pointGeometry = new THREE.PlaneGeometry(50, 50);
        point = new THREE.Mesh(pointGeometry, pointMaterial);

        var str_po = jQuery(elem).text();
        var arr_po = str_po.split(',').map(function(item) {
          return parseInt(item, 10);
        });

        point.position.x = arr_po[0];
        point.position.y = arr_po[1];
        point.position.z = arr_po[2];
        point.rotateY(arr_po[3]?arr_po[3]:0);

        point.name = ind;
        scene.add(point);

        targetList.push(point);
  
      }
      
      jQuery('.views-field-body .nav').show();
    });
    
    // Add word
//    var spritey = makeTextSprite(
//                "World!",
//                {fontsize: 32, fontface: "Georgia", borderColor: {r:0, g:0, b:255, a:1.0}}
//              );
//      spritey.position.set(190,50,450);
      // @Todo for hover
      //scene.add(spritey);
    
	}

	//-----------------//
  function onPointClick() {
    console.log('aabbcc');
  }
  
	function onWindowResize() {

		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();

		renderer.setSize( window.innerWidth, window.innerHeight );

	}

	function loadTexture( path ) {

		var texture = new THREE.Texture( texture_placeholder );
		var material = new THREE.MeshBasicMaterial( { map: texture, overdraw: 0.5, side: THREE.DoubleSide, transparent: true} );

		var image = new Image();
		image.onload = function () {

			texture.image = this;
			texture.needsUpdate = true;

		};
		image.src = path;

		return material;

	}

	//----------------//

	function onDocumentMouseDown( event ) {
    
		event.preventDefault();

		isUserInteracting = true;

		onPointerDownPointerX = event.clientX;
		onPointerDownPointerY = event.clientY;

		onPointerDownLon = lon;
		onPointerDownLat = lat;
	
    // update the mouse variable
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

    // find intersections

    // create a Ray with origin at the mouse position
    // and direction into the scene (camera direction)
    var vector = new THREE.Vector3( mouse.x, mouse.y, 1 );
    projector.unprojectVector( vector, camera );
    var ray = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize() );

    // create an array containing all objects in the scene with which the ray intersects
    var intersects = ray.intersectObjects(targetList);

    // if there is one (or more) intersections
    if ( intersects.length > 0 ) {
      jQuery(jQuery('.field-name-field-title', jQuery('#' + container).parent()).get(intersects[0].object.name)).trigger('click');
      jQuery('#block-views-aseptic-block .view-footer').css({'z-index': '1'});
      jQuery('#block-views-aseptic-block-2 .view-footer').css({'z-index': '1'});
      
      // Add 9 type line  
      jQuery('#block-views-aseptic-block .views-row.views-row-13 .views-field-field-parts.active .entity.active:first-child .field-name-field-image svg').remove();
      if (jQuery('#block-views-aseptic-block .views-row.views-row-13 .views-field-field-parts.active .entity.active:first-child .field-name-field-image svg').length < 1) {
        var nineType = run9Type();
        jQuery('#block-views-aseptic-block .views-row.views-row-13 .views-field-field-parts.active .entity.active:first-child .field-name-field-image').prepend(nineType);
      }
    }
	}
  
  function run9Type() {
    var style = [
      "fill:none",
      "stroke-width:1",
      "stroke-linejoin:round",
      "stroke-linecap:round",
      "stroke-dasharray: 1500, 1500",
      "animation: dash 5s ease-in-out forwards",
      "stroke:#FFFFFF"
    ];
    var path = 'M694 5 L470 5 L470 252 L2 252 L2 370 L389 370';
    var pathTag = pathAnimate(path, style);
    var svgLine = "<svg class='dash-line' width='694px' height='377px' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' xml:space='preserve'>";
    svgLine += pathTag;
    svgLine += "</svg>";
    
    return svgLine;
  }

	//-----------------------//
	function onDocumentMouseMove(event) {
		if (isUserInteracting === true) {
			lon = (onPointerDownPointerX - event.clientX) * 0.1 + onPointerDownLon;
      
      var turn = ( event.clientY - onPointerDownPointerY ) * 0.1 + onPointerDownLat;
      if (turn >= -25 && turn <= 18) {
        lat = turn;
      }
		}
    
    /*** TODO it's not good yet ***/
    /*
    var panoItems = [
      '#block-views-aseptic-block .views-row.aseptic.nid-10 .views-field-field-parts .entity.data',
      '#block-views-aseptic-block .views-row.aseptic.nid-11 .views-field-field-parts .entity.data'
    ];
    
    // Pano show and hide
    jQuery.each(panoItems, function(index, panoItem){
      hideShowPano(panoItem);
    });
    */
    
    // update the mouse variable
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    
    var vector = new THREE.Vector3(mouse.x, mouse.y, 1);
    projector.unprojectVector(vector, camera);
    var ray = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());

    // create an array containing all objects in the scene with which the ray intersects
    var intersects = ray.intersectObjects(targetList);

    // if there is one (or more) intersections
    if (intersects.length > 0) {
      
    }else {
      
      
    }
	}

	//-------------------------------//

	function onDocumentMouseUp( event ) {
		isUserInteracting = false;
    
    var panoItems = [
      '#block-views-aseptic-block .views-row.aseptic.nid-10 .views-field-field-parts .entity.data',
      '#block-views-aseptic-block .views-row.aseptic.nid-11 .views-field-field-parts .entity.data',
    ];
    
    var l = (lon-90)%360;
    jQuery.each(panoItems, function(index, panoItem){
      if (l > -20 && l < 20) {
        jQuery(panoItem).fadeIn();
      }else {
        jQuery(panoItem).fadeOut();
      }
    });
    
    (l < -20 || l > 20)?$('.views-field-body .nav').fadeOut():true;
    
	}


	//----------------------------//

	function onDocumentMouseWheel( event ) {

	// WebKit

    if ( event.wheelDeltaY ) {
      camera.fov -= event.wheelDeltaY * 0.05;

    // Opera / Explorer 9
    } else if ( event.wheelDelta ) {
      camera.fov -= event.wheelDelta * 0.05;

    // Firefox
    } else if ( event.detail ) {
      camera.fov -= event.detail * 0.05;
    }
    
    if (camera.fov > 24 && camera.fov < 66) {
      camera.updateProjectionMatrix();
    }
    

	}

	//----------------------------//

	function onDocumentTouchStart( event ) {

		if ( event.touches.length == 1 ) {

			event.preventDefault();

			onPointerDownPointerX = event.touches[ 0 ].pageX;
			onPointerDownPointerY = event.touches[ 0 ].pageY;

			onPointerDownLon = lon;
			onPointerDownLat = lat;

		}

	}

	//-----------------------------------------//

	function onDocumentTouchMove( event ) {

		if ( event.touches.length == 1 ) {

			event.preventDefault();

			lon = ( onPointerDownPointerX - event.touches[0].pageX ) * 0.1 + onPointerDownLon;
			lat = ( event.touches[0].pageY - onPointerDownPointerY ) * 0.1 + onPointerDownLat;

		}

	}

	//--------------------------//
  function twSetup(far) {
    var tw1, tw2;
    jQuery.each(targetList, function(index, point){
      tw1 = new TWEEN.Tween(point.position).to({
            x: point.position.x,
            y: point.position.y + far,
            z: point.position.z}, 1500 )
  
      tw2 = new TWEEN.Tween(point.position).to({
            x: point.position.x,
            y: point.position.y - far,
            z: point.position.z}, 1500 )
      
      tw1.chain(tw2);
      tw2.chain(tw1);
      
      tw1.start();
    });
  }
  
  twSetup(5);
  
	function animate() {
    requestAnimationFrame(animate); // keep looping
    TWEEN.update();
		update();
	}

	//----------------------------------//

	function update() {
		if ( isUserInteracting === false ) {
			//lon += 0.1;
		}

		lat = Math.max( - 85, Math.min( 85, lat ) );
		phi = THREE.Math.degToRad( 90 - lat );
		theta = THREE.Math.degToRad( lon );
    
    target.x = 500 * Math.sin( phi ) * Math.cos( theta );
    target.y = 500 * Math.cos( phi );
    target.z = 500 * Math.sin( phi ) * Math.sin( theta );
    
		camera.position.copy(target).negate();
    camera.position.y = target.y + 220;
    
    target.y = target.y + 50;
		camera.lookAt(target);
    
		renderer.render( scene, camera );

	}
  
  function makeTextSprite( message, parameters ) {
    if ( parameters === undefined ) parameters = {};

    var fontface = parameters.hasOwnProperty("fontface") ? 
      parameters["fontface"] : "Arial";

    var fontsize = parameters.hasOwnProperty("fontsize") ? 
      parameters["fontsize"] : 18;

    var borderThickness = parameters.hasOwnProperty("borderThickness") ? 
      parameters["borderThickness"] : 4;

    var borderColor = parameters.hasOwnProperty("borderColor") ?
      parameters["borderColor"] : { r:0, g:0, b:0, a:1.0 };

    var backgroundColor = parameters.hasOwnProperty("backgroundColor") ?
      parameters["backgroundColor"] : { r:255, g:255, b:255, a:1.0 };
      
    //var spriteAlignment = THREE.SpriteAlignment.topLeft;
    
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    context.font = "Bold " + fontsize + "px " + fontface;

    // get size data (height depends only on font size)
    var metrics = context.measureText( message );
    var textWidth = metrics.width;

    // background color
    context.fillStyle   = "rgba(" + backgroundColor.r + "," + backgroundColor.g + ","
                    + backgroundColor.b + "," + backgroundColor.a + ")";
    // border color
    context.strokeStyle = "rgba(" + borderColor.r + "," + borderColor.g + ","
                    + borderColor.b + "," + borderColor.a + ")";

    context.lineWidth = borderThickness;
    roundRect(context, borderThickness/2, borderThickness/2, textWidth + borderThickness, fontsize * 1.4 + borderThickness, 6);
    // 1.4 is extra height factor for text below baseline: g,j,p,q.

    // text color
    context.fillStyle = "rgba(0, 0, 0, 1.0)";

    context.fillText( message, borderThickness, fontsize + borderThickness);

    // canvas contents will be used for a texture
    var texture = new THREE.Texture(canvas) 
    texture.needsUpdate = true;

    var spriteMaterial = new THREE.SpriteMaterial( 
      { map: texture } );
    var sprite = new THREE.Sprite( spriteMaterial );
    sprite.scale.set(100,50,1.0);
    return sprite;	
  }

  // function for drawing rounded rectangles
  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x+r, y);
    ctx.lineTo(x+w-r, y);
    ctx.quadraticCurveTo(x+w, y, x+w, y+r);
    ctx.lineTo(x+w, y+h-r);
    ctx.quadraticCurveTo(x+w, y+h, x+w-r, y+h);
    ctx.lineTo(x+r, y+h);
    ctx.quadraticCurveTo(x, y+h, x, y+h-r);
    ctx.lineTo(x, y+r);
    ctx.quadraticCurveTo(x, y, x+r, y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();   
  }
}


/*
* path String: html5 path format. Ex. M200 0 L40 25 L100 200
*/
function pathAnimate(path, style) {
 var defaultStyle = [
   "fill:none",
   "stroke-width:1",
   "stroke-linejoin:round",
   "stroke-linecap:round",
   "stroke-dasharray: 1000",
   "animation: dash 7s linear forwards",
   "stroke:#FFFFFF"
 ];

 if (pathAnimate.arguments.length === 2) {
   defaultStyle = style;
 }

 var pathTag = '';
 pathTag = "<path d='" + path + "' style='" + defaultStyle.join(";") + "' />";

 return pathTag;
}