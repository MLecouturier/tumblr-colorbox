/*
 * tumblr-colorbox - Image lightbox
 * using jquery Colorbox
 *
 * Copyright (c) June 2012 29 Steps
 *
 * Version: beta
 *
 * Licensed under the MIT license
 *   http://www.opensource.org/licenses/mit-license.php
 */

/*
  * partly based on code from tumblrbox.js

*/

;(function() {
  
  if(typeof(window.console) === "undefined" || typeof(window.console.log) === "undefined") {
    window.console = {
      debug: function() {},
      log: function() {},
      warn: function() {},
      error: function() {}
    }
  }
  //console.debug('tumblr-colorbox');
  

  
  // Global variables
  var otherlib = false;
  
  if(typeof jQuery != 'undefined') {
    //console.debug('This page is already using jQuery v'+jQuery.fn.jquery);
  } else if (typeof $ == 'function') {
    //console.debug('This page is using another $ library');
    otherlib = true;
  }
  
  // more or less stolen form jquery core and adapted by paul irish
  function load_file(url, success) {
    var script;
    if(url.match(/\.js$/)) {
      script = document.createElement('script');
      script.src = url;
      script.type = 'text/javascript';
    } else {
      script = document.createElement('link');
      script.rel = 'stylesheet';
      script.type = 'text/css';
      script.href = url;
    }
    var head = document.getElementsByTagName('head')[0],
        done = false;
    // Attach handlers for all browsers
    script.onload=script.onreadystatechange = function() {
      if(!done && (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete') ) {
        done = true;
        if(success) {
          success();
        }
        script.onload = script.onreadystatechange = null;
        //head.removeChild(script);
      }
    };
    head.appendChild(script);
  }
  load_file('https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js', function() {
    if(typeof jQuery=='undefined') {
      console.debug('Sorry, but jQuery wasn\'t able to load');
    } else {
	
      $ = jQuery.noConflict();
      //console.debug('loaded '+$.fn.jquery);
      load_file('http://29-steps-uk.github.com/tumblr-colorbox/javascripts/jquery.colorbox.js', function() {
        
				var tumblr_pics = $('a[href*=".media.tumblr.com/tumblr"]>img[src*=".media.tumblr.com/tumblr"]').parent();

				$.each(tumblr_pics, function(){
					//console.log($(this))
					
					var rel;
					var img_title;
					
					if($(this).attr('class') == 'photoset_photo' ){
					  //console.log('found photoset photo')
					  rel = $(this).attr('id');
					 }else{
						rel = 'nofollow';
					}
					
					img_title = $(this).find('img').attr('alt');
					
					$(this).colorbox({
						rel: rel,
						photo: true,
						transition:"elastic",
						scrolling: false,
						scalePhotos: true,
						title: img_title
					});
					
					
				});
					
					
				//console.debug(tumblr_pics.length+' tumblr pictures colorboxed');
				
        
      });
    
       
     }// end if
  });
  
  // Add CSS
  load_file('http://29-steps-uk.github.com/tumblr-colorbox/stylesheets/colorbox.css');
  
})();

