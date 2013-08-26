// Song Module
(function($){
	$.fn.Video = function() {
		this.each(function() {
			$(this).click(function() {
			  loadAnotherVideo(this.href);
			  $('a.video').removeClass('active');
			  $(this).addClass('active');
			  return false;
			});
		});
	};
})( jQuery );

function loadAnotherVideo(filename) {
    var video = document.getElementsByTagName('video')[0];
    var sources = video.getElementsByTagName('source');
	sources[0].src = filename + '.webm';
    sources[1].src = filename + '.mp4';
    sources[2].src = filename + '.ogg';
    video.load();
}

function VideoControls() {
	var video = document.getElementsByTagName('video')[0],
		play = jQuery('#play'),
		pause = jQuery('#pause');

	function Play()
	{
		video.play();
		play.css({ opacity: 1.0 });
		pause.css({ opacity: 0.7 });
	}

	function Pause()
	{
		video.pause();
		play.css({ opacity: 0.7 });
		pause.css({ opacity: 1.0 });
	}

	play.click(function() {
		Play();
		return false;
	});

	pause.click(function() {
		Pause();
		return false;
	});
}

function Frames() {
	"use strict";
	var photos = jQuery('#photosFrame'),
		downloads = jQuery('#downloadFrame'),
		home = jQuery('#songsFrame'),
		currentframe = home,
		active = false;

	function Slide(href)
	{
		var newframe = GetFrame(href);

		if(active){
			photos.stop(false,true);
			downloads.stop(false,true);
			home.stop(false,true);
		}

		if(active == true || newframe==currentframe){ return; }

		active = true;

		var currentframe_end_top = 0,
			currentframe_end_left = 0,
			newframe_start_top = -2000,
			newframe_start_left = -2000,
			newframe_end_top = 0,
			newframe_end_left = 0,
			newframe;

		if(currentframe==home){ // Current Frame == Home
			currentframe_end_top = '-300%';
			currentframe_end_left = 0;
			newframe_start_top = '150%';
			newframe_start_left = 0;
		}
		else if(newframe==home) // Destination Home
		{
			currentframe_end_top = '-300%',
			currentframe_end_left = 0,
			newframe_start_top = '150%',
			newframe_start_left = 0
		}
		else if(newframe==downloads) // Destination Download
		{
			currentframe_end_top = 0;
			currentframe_end_left = '-300%';
			newframe_start_top = 0;
			newframe_start_left = '150%';
		}
		else if(newframe==photos) // Destination Photos
		{
			currentframe_end_top = 0;
			currentframe_end_left = '150%';
			newframe_start_top = 0;
			newframe_start_left = '-300%';
		} else {

		}

		newframe.css({
			top: newframe_start_top,
			left: newframe_start_left
		});
		currentframe.animate({top: currentframe_end_top, left: currentframe_end_left}, '-300%', 'easeOutBounce', function(){});
		newframe.animate({top: newframe_end_top, left: newframe_end_left}, '-300%', 'easeOutBounce', function(){
			currentframe = newframe;
			SetHash(currentframe);
			active = false;
		});
	}

	function GetFrame(href){
		href = href.split('#');
		if(href[1]=='download'){
			return downloads;
		} else if(href[1]=='photos'){
			return photos;
		} else {
			return home;
		}
	}

	function SetHash(frame){
		if(frame==downloads){
			setHash('download');
		} else if(frame==photos){
			setHash('photos');
		} else {
			setHash('home');
		}
	}

	function getHash()
	{
		return window.location.hash;
	}

	function setHash(value)
	{
		window.location.hash = value;
	}

	// if hashtag present
	if(window.location.hash){
		Slide(document.URL);
	}

	$('#nav a').click(function() {
		Slide(this.href);
		return false;
	});

	$('.backtotop').click(function() {
		var $homeVideo = $(".main-video");
		var $smallVideo = $(".small-video");
		var $toggle = $(".backtotop");
		Slide('');
		$homeVideo.removeClass("sky-high");
		$smallVideo.removeClass("sky-high");
		$toggle.removeClass("show-toggle");
	});
}

// Run
(function(w,d) {
	// Home Song Module
		jQuery('a.video').Video();
	// Photos Carousel
		jQuery('#featured').orbit({advanceSpeed: 6000});
	// Frames
		var frames = new Frames();
	// Video Controls
		var controls = new VideoControls();
})(window,document);

// slide video up on overlay link
jQuery(document).ready(function($){
    $("#nav").find("a").on('click', function(e) {
        e.preventDefault();
        var $homeVideo = $(".main-video");
        var $smallVideo = $(".small-video");
        var $toggle = $(".backtotop");
        $homeVideo.addClass("sky-high");
        $smallVideo.addClass("sky-high");
        $toggle.addClass("show-toggle");
    })
});

jQuery(document).ready(function($){
        var $homeVideo = $(".main-video");
        var $smallVideo = $(".small-video");
        var $toggle = $(".backtotop");
        var $downloads = $("#downloadFrame");
        var $photos = $("#photosFrame");
        // toggle classes on the respective sections
        if (window.location.href == 'http://localhost:5656/landinraw/#photos') {
            $homeVideo.addClass('sky-high');
            $smallVideo.addClass('sky-high');
            $toggle.addClass('show-toggle');
            $photos.addClass('show-photos-frame');
            $downloads.addClass('show-download-frame');
        } else if (window.location.href == 'http://localhost:5656/landinraw/#download') {
        	$homeVideo.addClass('sky-high');
            $smallVideo.addClass('sky-high');
            $toggle.addClass('show-toggle');
            $photos.addClass('show-photos-frame');
            $downloads.addClass('show-download-frame');
        } else if (window.location.href == 'http://localhost:5656/landinraw/#home') {
        	$homeVideo.removeClass('sky-high');
            $smallVideo.removeClass('sky-high');
            $toggle.removeClass('show-toggle');
            $photos.removeClass('show-photos-frame');
            $downloads.removeClass('show-download-frame');
        }
});
