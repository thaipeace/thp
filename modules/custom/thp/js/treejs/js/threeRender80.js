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


  var camera, scene, renderer;
  var texture_placeholder;
  
  var isUserInteracting = false,
  onMouseDownMouseX = 0, onMouseDownMouseY = 0,
  lon = 0, onMouseDownLon = 0,
  lat = 0, onMouseDownLat = 0,
  phi = 0, theta = 0;
  
  target = new THREE.Vector3();
  var targetList = [];

  init();
  animate();

  function init() {

    var container, mesh;
    container = document.getElementById(containerId);

    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1100 );
    camera.target = new THREE.Vector3( 0, 0, 0 );

    scene = new THREE.Scene();

    var geometry = new THREE.SphereGeometry( 500, 60, 40 );
    geometry.scale( - 1, 1, 1 );

    var material = new THREE.MeshBasicMaterial( {
      map: new THREE.TextureLoader().load(materialPath)
    } );

    mesh = new THREE.Mesh( geometry, material );

    scene.add( mesh );

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( renderer.domElement );

    document.addEventListener( 'mousedown', onDocumentMouseDown, false );
    document.addEventListener( 'mousemove', onDocumentMouseMove, false );
    document.addEventListener( 'mouseup', onDocumentMouseUp, false );
    document.addEventListener( 'wheel', onDocumentMouseWheel, false );

    //

    document.addEventListener( 'dragover', function ( event ) {

      event.preventDefault();
      event.dataTransfer.dropEffect = 'copy';

    }, false );

    document.addEventListener( 'dragenter', function ( event ) {

      document.body.style.opacity = 0.5;

    }, false );

    document.addEventListener( 'dragleave', function ( event ) {

      document.body.style.opacity = 1;

    }, false );

    document.addEventListener( 'drop', function ( event ) {

      event.preventDefault();

      var reader = new FileReader();
      reader.addEventListener( 'load', function ( event ) {

        material.map.image.src = event.target.result;
        material.map.needsUpdate = true;

      }, false );
      reader.readAsDataURL( event.dataTransfer.files[ 0 ] );

      document.body.style.opacity = 1;

    }, false );

    //
    
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

        point.name = ind;
        scene.add(point);

        targetList.push(point);
      }
    });

    window.addEventListener( 'resize', onWindowResize, false );

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

  function onDocumentMouseDown( event ) {

    event.preventDefault();

    isUserInteracting = true;

    onPointerDownPointerX = event.clientX;
    onPointerDownPointerY = event.clientY;

    onPointerDownLon = lon;
    onPointerDownLat = lat;

  }

  function onDocumentMouseMove( event ) {

    if ( isUserInteracting === true ) {

      lon = ( onPointerDownPointerX - event.clientX ) * 0.1 + onPointerDownLon;
      lat = ( event.clientY - onPointerDownPointerY ) * 0.1 + onPointerDownLat;

    }

  }

  function onDocumentMouseUp( event ) {

    isUserInteracting = false;

  }

  function onDocumentMouseWheel( event ) {

    camera.fov += event.deltaY * 0.05;
    camera.updateProjectionMatrix();

  }

  function animate() {

    requestAnimationFrame( animate );
    update();

  }

  function update() {

    if ( isUserInteracting === false ) {

      //lon += 0.1;

    }

    lat = Math.max( - 85, Math.min( 85, lat ) );
    phi = THREE.Math.degToRad( 90 - lat );
    theta = THREE.Math.degToRad( lon );

    camera.target.x = 500 * Math.sin( phi ) * Math.cos( theta );
    camera.target.y = 500 * Math.cos( phi );
    camera.target.z = 500 * Math.sin( phi ) * Math.sin( theta );

    camera.lookAt( camera.target );

    /*
    // distortion
    camera.position.copy( camera.target ).negate();
    */

    renderer.render( scene, camera );

  }


}