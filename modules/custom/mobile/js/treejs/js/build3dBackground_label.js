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

      $('#block-views-label-block-1 .views-row').click(function() {
        $('#block-views-label-block').addClass('active');

        var index = $(this).index();
        var asepticBlock = $('#block-views-label-block .views-row').get(index);

        // Drag background
        if ($('.views-field-field-drag-background', asepticBlock).length > 0) {
          var imageUrl = $('.views-field-field-drag-background .field-content', asepticBlock).text();
          $(asepticBlock).css({
            'background': 'url("'+ imageUrl +'") 0 0 no-repeat',
          });
          //$(asepticBlock).backgroundDraggable({axis: 'x'});
        }

        // Fix background
        if ($('.views-field-field-fix-background', asepticBlock).length > 0) {
          var imageUrl = $('.views-field-field-fix-background .field-content', asepticBlock).text();
          $(asepticBlock).css({
            'background': 'url("'+ imageUrl +'") center center no-repeat',
            'background-size': 'cover'
          });
        }

        // Background 360 build
        if ($('.views-field-field-270-background canvas').length > 0) {
          $('.views-field-field-270-background canvas').remove();
        }

        $('.views-field-field-270-background', asepticBlock).attr('id', 'three-' + index);
        var materialPaths = $('.views-field-field-270-background .field-content', asepticBlock).text();
        if (materialPaths.length > 0) {
          var container = 'three-' + index;
          build360Img(container, materialPaths.split(","));
          $('.views-field-nothing', asepticBlock).css('cursor', 'pointer');
        }

      });

      // Point clicked
      $('.field-name-field-title').click(function(){
        var index = $(this).index();
        var step = $(this).parents('.views-row');

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
            $('video', part)[0].play();

            //$('.field-item', part).append('<div class="close"></div>');
          }
        }

        $('#block-views-label-block-1').fadeOut(100);
        var indexStep = step.index();
        //$('#block-views-aseptic-block-1')

      });

      // Click to step
      $('#block-views-label-block').addClass('active');
      $('.bnt span').click(function(){
        var step = $(this).attr('rel');
        if (step !== 'external') {
          if (step.indexOf('#block-views-label-block-1') !== -1) {

            $('#block-views-label-block').addClass('active');
            $(step).trigger('click');

          }else {

            $('#block-views-label-block').removeClass('active');
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
	var texture_placeholder,
	isUserInteracting = false,
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
    var point = {};

		camera = new THREE.PerspectiveCamera( 110, window.innerWidth / window.innerHeight, 1, 1100 );
		camera.fov = (120*8) * 0.05;
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

    var material = new THREE.MeshBasicMaterial( {
      map: new THREE.TextureLoader().load(materialPath)
    } );

    mesh = new THREE.Mesh( geometry, material );

    scene.add(mesh);

		for ( var i = 0, l = mesh.geometry.vertices.length; i < l; i ++ ) {

			var vertex = mesh.geometry.vertices[ i ];

			vertex.normalize();
			vertex.multiplyScalar( 550 );

		}

		renderer = new THREE.CanvasRenderer();
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

    var element = jQuery(container).parent();
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

	function onWindowResize() {

		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();

		renderer.setSize( window.innerWidth, window.innerHeight );

	}

	function loadTexture( path ) {

		var texture = new THREE.Texture( texture_placeholder );
		var material = new THREE.MeshBasicMaterial( { map: texture, overdraw: 0.5, side: THREE.DoubleSide, transparent: true } );

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
      var sign = jQuery(jQuery('.field-name-field-title', jQuery('#' + container).parent()).get(intersects[0].object.name)).text();
      if (sign === 'link') {
        jQuery('#block-views-label-block-1 .views-row.views-row-first').trigger('click');
      }else {
        jQuery(jQuery('.field-name-field-title', jQuery('#' + container).parent()).get(intersects[0].object.name)).trigger('click');
      }
    }
	}

	//-----------------------//
	function onDocumentMouseMove(event) {
		if (isUserInteracting === true) {
			lon = (onPointerDownPointerX - event.clientX) * 0.1 + onPointerDownLon;
		}
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
      //console.log('b');

    }
	}

	//-------------------------------//

	function onDocumentMouseUp( event ) {
		isUserInteracting = false;
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

			// event.preventDefault();

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
  //--------------------------//
  function twSetup(far) {
    var tw1, tw2;
    jQuery.each(targetList, function(index, point){
      tw1 = new TWEEN.Tween(point.position).to({
            x: point.position.x,
            y: point.position.y + far,
            z: point.position.z}, 1000 )

      tw2 = new TWEEN.Tween(point.position).to({
            x: point.position.x,
            y: point.position.y - far,
            z: point.position.z}, 1000 )

      tw1.chain(tw2);
      tw2.chain(tw1);

      tw1.start();
    });
  }

  twSetup(10);

	function animate() {

		requestAnimationFrame( animate );
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
		//target.y = 500 * Math.cos( phi );

		target.y = -92.8;
		target.z = 500 * Math.sin( phi ) * Math.sin( theta );

		camera.position.copy( target ).negate();
    camera.position.y = target.y + 220;

    target.y = target.y + 50;
		camera.lookAt( target );

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
