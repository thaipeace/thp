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
            'background': 'url("'+ imageUrl +'")',
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
	init(container1, materialPaths);
  var particleMaterial;
	animate();

	//-----------------//

	function init(container, materialPaths) {

		var container, mesh;

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
		scene.add( mesh );

		for ( var i = 0, l = mesh.geometry.vertices.length; i < l; i ++ ) {

			var vertex = mesh.geometry.vertices[ i ];

			vertex.normalize();
			vertex.multiplyScalar( 550 );

		}

		renderer = new THREE.CanvasRenderer();
		renderer.setPixelRatio( window.devicePixelRatio );
		renderer.setSize( window.innerWidth, window.innerHeight );
		container.appendChild( renderer.domElement );

		document.addEventListener( 'mousedown', onDocumentMouseDown, false );
		document.addEventListener( 'mousemove', onDocumentMouseMove, false );
		document.addEventListener( 'mouseup', onDocumentMouseUp, false );
		//document.addEventListener( 'mousewheel', onDocumentMouseWheel, false );
		document.addEventListener( 'MozMousePixelScroll', onDocumentMouseWheel, false);

		document.addEventListener( 'touchstart', onDocumentTouchStart, false );
		document.addEventListener( 'touchmove', onDocumentTouchMove, false );

		window.addEventListener( 'resize', onWindowResize, false );
    
    var floorTexture = new THREE.ImageUtils.loadTexture('./sites/default/modules/custom/thp/images/icon_hxg.png');
    var floorMaterial = new THREE.MeshBasicMaterial( { map: floorTexture, side: THREE.DoubleSide } );
    var floorGeometry = new THREE.PlaneGeometry(50, 50);
    var floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.position.set(50, 50 , 450);
    scene.add(floor);
    
    console.log(scene);
	}

	//-----------------//

	function onWindowResize() {

		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();

		renderer.setSize( window.innerWidth, window.innerHeight );

	}

	function loadTexture( path ) {

		var texture = new THREE.Texture( texture_placeholder );
		var material = new THREE.MeshBasicMaterial( { map: texture, overdraw: 0.5 } );

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
    
    //console.log(onPointerDownPointerX);
    //console.log(onPointerDownLon);

	}

	//-----------------------//
	function onDocumentMouseMove( event ) {

		if ( isUserInteracting === true ) {
      
			lon = ( onPointerDownPointerX - event.clientX ) * 0.1 + onPointerDownLon;
//			lat = ( event.clientY - onPointerDownPointerY ) * 0.1 + onPointerDownLat;
      //console.log(event.clientX);
      // Control point when load
//      console.log(lon);
//      console.log(onPointerDownLon);
//      console.log(onPointerDownPointerX); bfcgj
//      var n = (lon-90)%360;
//      if (n<-15 || n>15) {
        //jQuery('.views-row.active .field-name-field-title').addClass('hide');
        
        //var abc = (camera.position.x > 0)?:;
//        if (camera.position.x > 0) {
//          var con = Math.abs((event.clientX/window.innerWidth));
//        }else {
//          var con = Math.abs((event.clientX/window.innerWidth));
//        }
        
        
//        var a = (window.innerWidth/2) - 90 - 170 - (camera.position.x);
        //console.log(a);
//        console.log(camera.position.x);
        
//        jQuery('.views-row.active .field-name-field-title').css('left', a);
//      }else {
        //jQuery('.views-row.active .field-name-field-title').removeClass('hide');
//      }
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
    //console.log(target.y);
		target.y = -92.8;
		target.z = 500 * Math.sin( phi ) * Math.sin( theta );

		camera.position.copy( target ).negate();
		camera.lookAt( target );

		renderer.render( scene, camera );

	}
}