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
      
      // Build 270 image
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
        
        // Background 360 build
        if ($('.views-field-field-270-background canvas').length > 0) {
          $('.views-field-field-270-background canvas').remove();
        }
        
        $('.views-field-field-270-background', asepticBlock).attr('id', 'three-' + index);
        var materialPath = $('.views-field-field-270-background .field-content', asepticBlock).text();
        if (materialPath.length > 0) {
          var container = 'three-' + index;
          build360Img(container, materialPath);
          
          if ($(asepticBlock).hasClass('nid-10')) {
            $('.views-field-field-parts .entity.data', asepticBlock).fadeIn();
          }
          if ($(asepticBlock).hasClass('nid-11')) {
            $('.views-field-field-parts .entity.data', asepticBlock).fadeIn();
          } 

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
            var part = $($('.views-field-field-parts .entity', step));
            $('.views-field-field-parts', step).addClass('active');
            $('.field-name-field-video', part).addClass('active');
            $('video', part)[0].play();
            
            //$('.field-item', part).append('<div class="close"></div>');
          }
        }
        
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

function build360Img(containerId, materialPath) {
  //"use strict";
  var texture_placeholder;
  var camera,
    scene,
    container = document.getElementById(containerId), // Inject scene into this
    renderer,
    onPointerDownPointerX,
    onPointerDownPointerY,
    onPointerDownLon,
    onPointerDownLat,
    fov = 70, // Field of View
    isUserInteracting = false,
    lon = 0,
    lat = 0,
    phi = 0,
    theta = 0,
    onMouseDownMouseX = 0,
    onMouseDownMouseY = 0,
    onMouseDownLon = 0,
    onMouseDownLat = 0,
    width = window.innerWidth, // int || window.innerWidth
    height = window.innerHeight, // int || window.innerHeight
    ratio = width / height;
    var projector, mouse = { x: 0, y: 0 };
    var target = new THREE.Vector3();
    var targetList = [];
    var texture = THREE.ImageUtils.loadTexture(materialPath, new THREE.UVMapping(), function() {
      init();
      animate();
    });
  function init() {
    
    var mesh;
    var point = {};
    
    camera = new THREE.PerspectiveCamera(fov, ratio, 1, 1000);
    camera.updateProjectionMatrix();

    scene = new THREE.Scene();
    
    texture_placeholder = document.createElement( 'canvas' );
		texture_placeholder.width = 128;
		texture_placeholder.height = 128;

		var context = texture_placeholder.getContext( '2d' );
		context.fillRect( 0, 0, texture_placeholder.width, texture_placeholder.height );
    
    var mesh = new THREE.Mesh(new THREE.SphereGeometry(500, 60, 40), new THREE.MeshBasicMaterial({map: texture}));
    mesh.scale.x = -1;
    scene.add(mesh);
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    projector = new THREE.Projector();
    document.addEventListener('mousedown', onDocumentMouseDown, false);
    document.addEventListener('mousewheel', onDocumentMouseWheel, false);
    document.addEventListener('DOMMouseScroll', onDocumentMouseWheel, false);
    document.addEventListener('mousemove', onDocumentMouseMove, false);
    document.addEventListener('mouseup', onDocumentMouseUp, false);
    document.addEventListener( 'touchstart', onDocumentTouchStart, false );
		document.addEventListener( 'touchmove', onDocumentTouchMove, false );
    window.addEventListener('resize', onWindowResized, false);
    onWindowResized(false);
    
    var element = jQuery(container).parent();
    jQuery('.views-field-nothing .field-name-field-position', element).each(function(ind, elem) {
      if (jQuery(jQuery('.views-field-nothing .field-name-field-title', element).get(ind)).text() !== 'data') {
//        var pointMaterial = loadTexture('./sites/default/modules/custom/thp/images/icon_hxg.png');
        var pointMaterial = THREE.ImageUtils.loadTexture('./sites/default/modules/custom/thp/images/icon_hxg.png');
//        var pointMaterial = new THREE.MeshBasicMaterial({ //CHANGED to MeshBasicMaterial
//          map:THREE.ImageUtils.loadTexture('./sites/default/modules/custom/thp/images/icon_hxg.png')
//        });
        var pointGeometry = new THREE.PlaneGeometry(50, 50);
        point = new THREE.Mesh(pointGeometry, pointMaterial);

        var str_po = jQuery(elem).text();
        var arr_po = str_po.split(',').map(function(item) {
          return parseInt(item, 10);
        });

        point.position.x = arr_po[0];
        point.position.y = arr_po[1];
        point.position.z = arr_po[2];

        point.name = ind;
        scene.add(point);

        targetList.push(point);
        
//        var loader = new THREE.ImageLoader();
//        loader.load('./sites/default/modules/custom/thp/images/icon_hxg.png', function ( texture ) {
//          var geometry = new THREE.PlaneGeometry(10,10);
//          var material = new THREE.MeshBasicMaterial({map: texture});
//          var mesh = new THREE.Mesh(geometry, material);
//          scene.add(mesh);
//        });
      }
    });
  }
  function onWindowResized(event) {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.projectionMatrix.makePerspective(fov, window.innerWidth / window.innerHeight, 1, 1100);
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
    camera.projectionMatrix.makePerspective(fov, ratio, 1, 1100);
  }
  function onDocumentMouseDown(event) {
    event.preventDefault();
    onPointerDownPointerX = event.clientX;
    onPointerDownPointerY = event.clientY;
    onPointerDownLon = lon;
    onPointerDownLat = lat;
    isUserInteracting = true;
    
    // update the mouse variable
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    
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
      
      // Add 9 type line  
      jQuery('#block-views-aseptic-block .views-row.views-row-10 .views-field-field-parts.active .entity:first-child .field-name-field-image svg').remove();
      if (jQuery('#block-views-aseptic-block .views-row.views-row-10 .views-field-field-parts.active .entity:first-child .field-name-field-image svg').length < 1) {
        var nineType = run9Type();
        jQuery('#block-views-aseptic-block .views-row.views-row-10 .views-field-field-parts.active .entity:first-child .field-name-field-image').prepend(nineType);
      }
    }
  }
  function onDocumentMouseMove(event) {
    
    if (isUserInteracting === true) {
			lon = (event.clientX - onPointerDownPointerX) * -0.175 + onPointerDownLon;
      lat = (event.clientY - onPointerDownPointerY) * -0.175 + onPointerDownLat;
		}
    // update the mouse variable
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    
    
  }
  function onDocumentMouseUp(event) {
      isUserInteracting = false;
//      document.removeEventListener('mousemove', onDocumentMouseMove, false);
//      document.removeEventListener('mouseup', onDocumentMouseUp, false);
  }
  function onDocumentMouseWheel(event) {
      // WebKit
      if (event.wheelDeltaY) {
          fov -= event.wheelDeltaY * 0.05;
          // Opera / Explorer 9
      } else if (event.wheelDelta) {
          fov -= event.wheelDelta * 0.05;
          // Firefox
      } else if (event.detail) {
          fov += event.detail * 1.0;
      }
      if (fov < 45 || fov > 90) {
          fov = (fov < 45) ? 45 : 90;
      }
      camera.projectionMatrix.makePerspective(fov, ratio, 1, 1100);
  }
  
  function onDocumentTouchStart( event ) {

		if ( event.touches.length == 1 ) {

			event.preventDefault();

			onPointerDownPointerX = event.touches[ 0 ].pageX;
			onPointerDownPointerY = event.touches[ 0 ].pageY;

			onPointerDownLon = lon;
			onPointerDownLat = lat;

		}

	}
  
	function onDocumentTouchMove( event ) {

		if ( event.touches.length == 1 ) {

			event.preventDefault();

			lon = ( onPointerDownPointerX - event.touches[0].pageX ) * 0.1 + onPointerDownLon;
			lat = ( event.touches[0].pageY - onPointerDownPointerY ) * 0.1 + onPointerDownLat;

		}

	}
  
  function loadTexture( path ) {

		var texture = new THREE.Texture( texture_placeholder );
		var material = new THREE.MeshBasicMaterial( { map: texture, overdraw: 0.5, side: THREE.DoubleSide } );

		var image = new Image();
		image.onload = function () {

			texture.image = this;
			texture.needsUpdate = true;

		};
		image.src = path;

		return material;

	}
  
  function animate() {
      requestAnimationFrame(animate);
      render();
  }
  function render() {
      if (isUserInteracting === false) {
          //lon += .05;
      }
      lat = Math.max(-85, Math.min(85, lat));
      phi = THREE.Math.degToRad(90 - lat);
      theta = THREE.Math.degToRad(lon);
      camera.position.x = 100 * Math.sin(phi) * Math.cos(theta);
      camera.position.y = 100 * Math.cos(phi);
      camera.position.z = 100 * Math.sin(phi) * Math.sin(theta);
      var log = ("x: " + camera.position.x);
      log = log + ("<br/>y: " + camera.position.y);
      log = log + ("<br/>z: " + camera.position.z);
      log = log + ("<br/>fov: " + fov);
      //document.getElementById('log').innerHTML = log;
      camera.lookAt(scene.position);
      renderer.render(scene, camera);
  }
}