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
      $('.views-field-field-background-360-images .field-content').hide();
      var materialPaths = {};
      
      $('#block-views-aseptic-block-1 .views-row').click(function() {
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
        if ($('.views-field-field-background-360-images canvas').length > 0) {
          $('.views-field-field-background-360-images canvas').remove();
        }
        $('.views-field-field-background-360-images', asepticBlock).attr('id', 'three-' + index);
        var materialPaths = $('.views-field-field-background-360-images .field-content', asepticBlock).text();
        if (materialPaths.length > 0) {
          var container = 'three-' + index;
          build360Img(container, materialPaths.split(","));
        }
      });
      
      // Point clicked
      $('.field-name-field-title').click(function(){
        var index = $(this).index();
        var step = $(this).parents('.views-row');
        
        $('.views-field-field-parts', step).addClass('active');
        $($('.views-field-field-parts .entity', step).get(index)).addClass('active');
      });
      
    }
  };

})(jQuery, Drupal, this, this.document);

function build360Img(container, materialPaths) {

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
	init(container1, materialPaths);
  var projector, mouse = { x: 0, y: 0 };
	animate();

	//-----------------//

	function init(container, materialPaths) {
    
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

		var materials = [];
		for (i = 0; i < materialPaths.length; i++) {
		    materials.push(loadTexture(materialPaths[i]));
		}

		mesh = new THREE.Mesh( new THREE.BoxGeometry( 300, 300, 300, 7, 7, 7 ), new THREE.MultiMaterial( materials ) );
		mesh.scale.x = - 1;
    mesh.name = 'wall';
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
		//document.addEventListener( 'mousewheel', onDocumentMouseWheel, false );
		document.addEventListener( 'MozMousePixelScroll', onDocumentMouseWheel, false);

		document.addEventListener( 'touchstart', onDocumentTouchStart, false );
		document.addEventListener( 'touchmove', onDocumentTouchMove, false );

		window.addEventListener( 'resize', onWindowResize, false );
    
    jQuery('.views-field-nothing .field-name-field-position', jQuery(container).parent()).each(function(index, element){
      var pointMaterial = loadTexture('./sites/default/modules/custom/thp/images/icon_hxg.png');
      var pointGeometry = new THREE.PlaneGeometry(50, 50);
      point = new THREE.Mesh(pointGeometry, pointMaterial);
      
      var str_po = jQuery(element).text();
      var arr_po = str_po.split(',').map(function(item) {
        return parseInt(item, 10);
      });
      
      point.position.x = arr_po[0];
      point.position.y = arr_po[1];
      point.position.z = arr_po[2];
      
      point.name = index;
      scene.add(point);

      targetList.push(point);
    });
    
	}

	//-----------------//

	function onWindowResize() {

		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();

		renderer.setSize( window.innerWidth, window.innerHeight );

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

	//----------------//

	function onDocumentMouseDown( event ) {
    
		event.preventDefault();

		isUserInteracting = true;

		onPointerDownPointerX = event.clientX;
		onPointerDownPointerY = event.clientY;

		onPointerDownLon = lon;
		onPointerDownLat = lat;
    
    //console.log("Click.");
	
    // update the mouse variable
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

    // find intersections

    // create a Ray with origin at the mouse position
    //   and direction into the scene (camera direction)
    var vector = new THREE.Vector3( mouse.x, mouse.y, 1 );
    projector.unprojectVector( vector, camera );
    var ray = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize() );

    // create an array containing all objects in the scene with which the ray intersects
    var intersects = ray.intersectObjects(targetList);
//    console.log(targetList);
//    console.log(intersects);
    // if there is one (or more) intersections
    if ( intersects.length > 0 ) {
      
      console.log("Hit @ " + toString( intersects[0].point ) );
      console.log(intersects[0]);
      jQuery(jQuery('.field-name-field-title', jQuery('#' + container).parent()).get(intersects[0].object.name)).trigger('click');
    }
	}

	//-----------------------//
	function onDocumentMouseMove( event ) {
		if ( isUserInteracting === true ) {
      
			lon = ( onPointerDownPointerX - event.clientX ) * 0.1 + onPointerDownLon;
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

		camera.updateProjectionMatrix();

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

	function animate() {

		requestAnimationFrame( animate );
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
		camera.lookAt( target );

		renderer.render( scene, camera );

	}
}
