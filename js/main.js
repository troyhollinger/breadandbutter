

$(document).ready(function(){


	function clearSelection() {
	    if(document.selection && document.selection.empty) {
	        document.selection.empty();
	    } else if(window.getSelection) {
	        var sel = window.getSelection();
	        sel.removeAllRanges();
	    }
	}

    $('.noSelect').click(clearSelection);//No text selection on elements with a class of 'noSelect'

	$.fn.clicktoggle = function(a,b) {
		return this.each(function(){
			var clicked = false;
			$(this).click(function(){
				if(clicked) {
					clicked = false;
					return b.apply(this, arguments);
				}
				clicked = true;
				return a.apply(this, arguments);
			})
		});
	};

	// $.fn.hasAttr = function(attribute, value) {  
 //   		return this.attr(name) === value;
	// }

	// if ($('#bg1').hasAttr('slide-order', 1)) {
	// 	console.log("its working");
	// } else {
	// 	console.log("its not working");
	// }

	// console.log($('#bg9').attr('slide-order'));

	function playPause() {
		$(audio).on('play',function() {
			$("#pause-button").attr('src', './img/player-assets/pause.png').addClass('playing');
		}).on('pause ended', function() {
			$("#pause-button").attr('src', './img/player-assets/play.png').removeClass('playing');		
		});	
	}

	function audioPlay(){
		loaded = false;
		manualSeek = false;

		if (i === 1) {
			audio = $("#track1").get(0);
			playPause();
			
		} else if (i === 2) {
			audio = $("#track2").get(0);
			playPause();

		} else if (i === 3) {
			audio = $("#track3").get(0);
			playPause();

		} else if (i === 4) {
			audio = $("#track4").get(0);
			playPause();

		} else if (i === 5) {
			audio = $("#track5").get(0);
			playPause();

		} else if (i === 6) {
			audio = $("#track6").get(0);
			playPause();

		} else if (i === 7) {
			audio = $("#track7").get(0);
			playPause();

		} else if (i === 8) {
			audio = $("#track8").get(0);
			playPause();
		} else if (i === 9) {
			audio = $("#track9").get(0);
			playPause();
		}	

		loadingIndicator = $('#loading');
		positionIndicator = $('#handle');
		timeleft = $('#timeleft');
		timeelapsed = $('#timeelapsed');

		if ((audio.buffered != undefined) && (audio.buffered.length != 0)) {
	  		$(audio).bind('progress', function() {
	    		var loaded = parseInt(((audio.buffered.end(0) / audio.duration) * 100), 10);
	    		loadingIndicator.css({width: loaded + '%'});
	 	 	});
		}
		else {
	  		loadingIndicator.remove();
		}

		$(audio).bind('timeupdate', function() {

			var theTime = audio.currentTime,
				rem = parseInt(audio.duration - theTime, 10),
				pos = (theTime / audio.duration) * 100,
				mins = Math.floor(rem/60,10),
				secs = rem - mins*60,
				elapsed = parseInt(theTime, 10),
				elapsedmins = parseInt((theTime / 60) % 60),
				elapsedsecs = parseInt(theTime % 60);

			timeelapsed.text('-' + elapsedmins + ':' + (elapsedsecs < 10 ? '0' + elapsedsecs : elapsedsecs));	
			timeleft.text('-' + mins + ':' + (secs > 9 ? secs : '0' + secs));

			if (!manualSeek) { positionIndicator.css({left: pos + '%'}); }
			if (!loaded) {
				loaded = true;
						
				$('#gutter').slider({
					value: 0,
					step: 0.01,
					orientation: "horizontal",
					range: "min",
					max: audio.duration,
					animate: false,					
					slide: function() {							
						manualSeek = true;
					},
					stop:function(e,ui) {
						manualSeek = false;					
						audio.currentTime = ui.value;
					}
				});
			}
		});
	}
	$("#pause").on('click', function() {	
		//console.log(audio);		
		if (audio.paused) { audio.play(); } 
		else { audio.pause(); }			
	});

///////////////////////////////////////////////////////
//
//	ON-LOAD
//
//
	
	var i = 1,
		audio = "";
	
	audioPlay();
	//console.log(audio);

	var $songtitle = $("#song-title");
	function infoChange() {
		$(".song-info").hide();
		$("#song-info-" + i).show();
	}

	// determines name of song displayed in top right corner.
	function songTitle() {
		
		if ( i == 1 ) { $songtitle.html("ain't no grave");}
		if ( i == 2 ) { $songtitle.html("in the highways");	}
		if ( i == 3 ) { $songtitle.html("lily of the valleys");	}
		if ( i == 4 ) { $songtitle.html("i'd rather have Jesus");	}
		if ( i == 5 ) { $songtitle.html("how great Thou art");	}
		if ( i == 6 ) { $songtitle.html("the johnny appleseed song");	}
		if ( i == 7 ) { $songtitle.html("to God be the glory");	}
		if ( i == 8 ) { $songtitle.html("sunbeam");	}
		if ( i == 9 ) { $songtitle.html("turn your eyes upon Jesus");	}

		littleSquares();
		infoChange();	
	}


	

	//information overlay functionality
	$(".the-info-i").click(function(){

		var $overlay = $("#overlay");

		if ($(this).hasClass('inactive')) {
			infoChange();
			$overlay.fadeIn();

			$(this).attr('src', 'img/x.png').addClass('active').removeClass('inactive');
			$songtitle.css('color', 'white');

		} else if($(this).hasClass('active')) {
			$overlay.fadeOut();
			$(this).attr('src', 'img/white-info.png').addClass('inactive').removeClass('active');
			$songtitle.css('color', 'black');

		} else {
			console.log('something is wrong');
		}
		
	});


	var $squares = $(".square");
	
	function littleSquares() {
		$squares.removeClass('sq-active'); 
		$squares.eq(i - 1).addClass("sq-active");
	}
	$squares.click(function(){
		i = $(this).parent().children().index(this);
		i = i + 1;
		if(i >= 10) {
			i = 1;
		}
		changeSong();
		console.log(i);
	});
		

	$("#tab").click(function(){
		$("nav").animate({top:"0%"}, 500);
	});	
	$("#exit-tab").click(function(){
		$("nav").animate({top: "100%"}, 500);
	});

	$(".album-title").clicktoggle(function(){
		var $the_ul = $(this).next();
		$the_ul.fadeOut();
		$(this).find('.triangle').addClass('box_rotate box_transition');

	}, function(){
		var $the_ul = $(this).next();
		$the_ul.fadeIn();
		$(this).find('.triangle').removeClass('box_rotate');
	});
	


	// function moveI() {
	// 	var $i_clone = $(".the-info-i").clone(true);
	// 	if($(window).width() < 700) {
	// 		$i_clone.appendTo("#nav-track" + i).css({position: 'absolute', right: '10px', top: '10px'});
	// 		$("#info").hide();
	// 	} else {
	// 		$(".the-info-i").eq(1).remove();
	// 		$("#info").show();
	// 	}
	// }
	// moveI();


	$(window).resize(function(){
		// if($(window).width() == 699) {
		// 	moveI();
		// } else if($(window).width() == 701) {
		// 	moveI();
		// }	
	});

///////////////////////////////////////////////////////
//
//	NAVIGATION
//
//

	


	var $audioContainer = $('#the-audio'),
		$listItems = $('.track-list-item');


	function changeSong() {
		if (i === 1) {
			$audioContainer.load('./audio/track1.html', function(){
				$listItems.css('opacity', '0.65').css('color', 'white');
				$("#nav-track1").css('opacity', '1').css('color', 'black');
				audioPlay();
				backgroundMoveClick();
				songTitle();
			});
			
		} else if (i === 2) {
			$audioContainer.load('./audio/track2.html', function(){
				$listItems.css('opacity', '0.65').css('color', 'white');
				$("#nav-track2").css('opacity', '1').css('color', 'black');
				audioPlay();
				backgroundMoveClick();
				songTitle();
			});
		} else if (i === 3) {
			$audioContainer.load('./audio/track3.html', function(){
				$listItems.css('opacity', '0.65').css('color', 'white');
				$("#nav-track3").css('opacity', '1').css('color', 'black');
				audioPlay();
				backgroundMoveClick();
				songTitle();
			});
		} else if (i === 4) {
			$audioContainer.load('./audio/track4.html', function(){
				$listItems.css('opacity', '0.65').css('color', 'white');
				$("#nav-track4").css('opacity', '1').css('color', 'black');
				audioPlay();
				backgroundMoveClick();
				songTitle();
			});
		} else if (i === 5) {
			$audioContainer.load('./audio/track5.html', function(){
				$listItems.css('opacity', '0.65').css('color', 'white');
				$("#nav-track5").css('opacity', '1').css('color', 'black');
				audioPlay();
				backgroundMoveClick();
				songTitle();
			});
		} else if (i === 6) {
			$audioContainer.load('./audio/track6.html', function(){
				$listItems.css('opacity', '0.65').css('color', 'white');
				$("#nav-track6").css('opacity', '1').css('color', 'black');
				audioPlay();
				backgroundMoveClick();
				songTitle();
			});
		} else if (i === 7) {
			$audioContainer.load('./audio/track7.html', function(){
				$listItems.css('opacity', '0.65').css('color', 'white');
				$("#nav-track7").css('opacity', '1').css('color', 'black');
				audioPlay();
				backgroundMoveClick();
				songTitle();
			});
		} else if (i === 8) {
			$audioContainer.load('./audio/track8.html', function(){
				$listItems.css('opacity', '0.65').css('color', 'white');
				$("#nav-track8").css('opacity', '1').css('color', 'black');
				audioPlay();
				backgroundMoveClick();
				songTitle();
			});
		} else if (i === 9) {
			$audioContainer.load('./audio/track9.html', function(){
				$listItems.css('opacity', '0.65').css('color', 'white');
				$("#nav-track9").css('opacity', '1').css('color', 'black');
				audioPlay();
				backgroundMoveClick();
				songTitle();
				
			});
		}
	}		


	//next-song arrow click
	$('#next').click(function(){
		
		i++;
		if (i > 9) {i = 1;}
	
		if (i === 1) {
			$audioContainer.load('./audio/track1.html', function(){
				$listItems.css('opacity', '0.65').css('color', 'white');
				$("#nav-track1").css('opacity', '1').css('color', 'black');
				audioPlay();
				backgroundMoveForward();
				songTitle();
			});
			
		} else if (i === 2) {
			$audioContainer.load('./audio/track2.html', function(){
				$listItems.css('opacity', '0.65').css('color', 'white');
				$("#nav-track2").css('opacity', '1').css('color', 'black');
				audioPlay();
				backgroundMoveForward();
				songTitle();
			});
		} else if (i === 3) {
			$audioContainer.load('./audio/track3.html', function(){
				$listItems.css('opacity', '0.65').css('color', 'white');
				$("#nav-track3").css('opacity', '1').css('color', 'black');
				audioPlay();
				backgroundMoveForward();
				songTitle();
			});
		} else if (i === 4) {
			$audioContainer.load('./audio/track4.html', function(){
				$listItems.css('opacity', '0.65').css('color', 'white');
				$("#nav-track4").css('opacity', '1').css('color', 'black');
				audioPlay();
				backgroundMoveForward();
				songTitle();
			});
		} else if (i === 5) {
			$audioContainer.load('./audio/track5.html', function(){
				$listItems.css('opacity', '0.65').css('color', 'white');
				$("#nav-track5").css('opacity', '1').css('color', 'black');
				audioPlay();
				backgroundMoveForward();
				songTitle();
			});
		} else if (i === 6) {
			$audioContainer.load('./audio/track6.html', function(){
				$listItems.css('opacity', '0.65').css('color', 'white');
				$("#nav-track6").css('opacity', '1').css('color', 'black');
				audioPlay();
				backgroundMoveForward();
				songTitle();
			});
		} else if (i === 7) {
			$audioContainer.load('./audio/track7.html', function(){
				$listItems.css('opacity', '0.65').css('color', 'white');
				$("#nav-track7").css('opacity', '1').css('color', 'black');
				audioPlay();
				backgroundMoveForward();
				songTitle();
			});
		} else if (i === 8) {
			$audioContainer.load('./audio/track8.html', function(){
				$listItems.css('opacity', '0.65').css('color', 'white');
				$("#nav-track8").css('opacity', '1').css('color', 'black');
				audioPlay();
				backgroundMoveForward();
				songTitle();
			});
		} else if (i === 9) {
			$audioContainer.load('./audio/track9.html', function(){
				$listItems.css('opacity', '0.65').css('color', 'white');
				$("#nav-track9").css('opacity', '1').css('color', 'black');
				audioPlay();
				backgroundMoveForward();
				songTitle();
				
			});
		} 
	});

	//Previous-song arrow click
	$('#previous').click(function(){
		i--;
		if (i < 1) { i = 9; };
		if (i === 1) {
			$audioContainer.load('./audio/track1.html', function(){
				$listItems.css('opacity', '0.65').css('color','white');
				$("#nav-track1").css('opacity', '1').css('color', 'black');
				audioPlay();
				backgroundMoveBackward();
				songTitle();

			});
			
		} else if (i === 2) {
			$audioContainer.load('./audio/track2.html', function(){
				$listItems.css('opacity', '0.65').css('color', 'white');
				$("#nav-track2").css('opacity', '1').css('color', 'black');
				audioPlay();
				backgroundMoveBackward();
				songTitle();
			});
		} else if (i === 3) {
			$audioContainer.load('./audio/track3.html', function(){
				$listItems.css('opacity', '0.65').css('color', 'white');
				$("#nav-track3").css('opacity', '1').css('color', 'black');
				audioPlay();
				backgroundMoveBackward();
				songTitle();
			});
		} else if (i === 4) {
			$audioContainer.load('./audio/track4.html', function(){
				$listItems.css('opacity', '0.65').css('color', 'white');
				$("#nav-track4").css('opacity', '1').css('color', 'black');
				audioPlay();
				backgroundMoveBackward();
				songTitle();
			});
		} else if (i === 5) {
			$audioContainer.load('./audio/track5.html', function(){
				$listItems.css('opacity', '0.65').css('color', 'white');
				$("#nav-track5").css('opacity', '1').css('color', 'black');
				audioPlay();
				backgroundMoveBackward();
				songTitle();
			});
		} else if (i === 6) {
			$audioContainer.load('./audio/track6.html', function(){
				$listItems.css('opacity', '0.65').css('color', 'white');
				$("#nav-track6").css('opacity', '1').css('color', 'black');
				audioPlay();
				backgroundMoveBackward();
				songTitle();
			});
		} else if (i === 7) {
			$audioContainer.load('./audio/track7.html', function(){
				$listItems.css('opacity', '0.65').css('color', 'white');
				$("#nav-track7").css('opacity', '1').css('color', 'black');
				audioPlay();
				backgroundMoveBackward();
				songTitle();
			});
		} else if (i === 8) {
			$audioContainer.load('./audio/track8.html', function(){
				$listItems.css('opacity', '0.65').css('color', 'white');
				$("#nav-track8").css('opacity', '1').css('color', 'black');
				audioPlay();
				backgroundMoveBackward();
				songTitle();
			});
		} else if (i === 9) {
			$audioContainer.load('./audio/track9.html', function(){
				$listItems.css('opacity', '0.65').css('color', 'white');
				$("#nav-track9").css('opacity', '1').css('color', 'black');
				audioPlay();
				backgroundMoveBackward();
				songTitle();
			});
		} 
		
	});

	//track-list navigation
	$(".track-list-item").click(function(){

		var $track = $(this).attr('id');

		if($track === "nav-track1") {
			i = 1;
			$audioContainer.load('./audio/track1.html', function(){
				$listItems.css('opacity', '0.65').css('color', 'white');
				$("#nav-track1").css('opacity', '1').css('color', 'black');
				audioPlay();
				backgroundMoveClick();
				songTitle();
			});
		} else if ($track === "nav-track2") {
			i = 2;
			$audioContainer.load('./audio/track2.html', function(){
				$listItems.css('opacity', '0.65').css('color', 'white');
				$("#nav-track2").css('opacity', '1').css('color', 'black');
				audioPlay();
				backgroundMoveClick();
				songTitle();
			});
		}else if ($track === "nav-track3") {
			i = 3;
			$audioContainer.load('./audio/track3.html', function(){
				$listItems.css('opacity', '0.65').css('color', 'white');
				$("#nav-track3").css('opacity', '1').css('color', 'black');
				audioPlay();
				backgroundMoveClick();
				songTitle();
			});
		}else if ($track === "nav-track4") {
			i = 4;
			$audioContainer.load('./audio/track4.html', function(){
				$listItems.css('opacity', '0.65').css('color', 'white');
				$("#nav-track4").css('opacity', '1').css('color', 'black');
				audioPlay();
				backgroundMoveClick();
				songTitle();
			});
		}else if ($track === "nav-track5") {
			i = 5;
			$audioContainer.load('./audio/track5.html', function(){
				$listItems.css('opacity', '0.65').css('color', 'white');
				$("#nav-track5").css('opacity', '1').css('color', 'black');
				audioPlay();
				backgroundMoveClick();
				songTitle();
			});
		}else if ($track === "nav-track6") {
			i = 6;
			$audioContainer.load('./audio/track6.html', function(){
				$listItems.css('opacity', '0.65').css('color', 'white');
				$("#nav-track6").css('opacity', '1').css('color', 'black');
				audioPlay();
				backgroundMoveClick();
				songTitle();
			});
		}else if ($track === "nav-track7") {
			i = 7;
			$audioContainer.load('./audio/track7.html', function(){
				$listItems.css('opacity', '0.65').css('color', 'white');
				$("#nav-track7").css('opacity', '1').css('color', 'black');
				audioPlay();
				backgroundMoveClick();
				songTitle();
			});
		}else if ($track === "nav-track8") {
			i = 8;
			$audioContainer.load('./audio/track8.html', function(){
				$listItems.css('opacity', '0.65').css('color', 'white');
				$("#nav-track8").css('opacity', '1').css('color', 'black');
				audioPlay();
				backgroundMoveClick();
				songTitle();
			});
		}else if ($track === "nav-track9") {
			i = 9;
			$audioContainer.load('./audio/track9.html', function(){
				$listItems.css('opacity', '0.65').css('color', 'white');
				$("#nav-track9").css('opacity', '1').css('color', 'black');
				audioPlay();
				backgroundMoveClick();
				songTitle();
			});
		}
	});



	// console.log($(".next-slide").attr('slide-order'))

	function backgroundMoveForward() {
		if (i == 1 && $(".current-slide").attr('slide-order') == (9)) {
			$(".next-slide").animate({
				left: "-=100%"
			},1000);
			$(".current-slide").animate({
				left: "-=100%"
			}, 1000, function(){
				$("#bg1").removeClass('next-slide').addClass('current-slide');
				$("#bg8").removeClass('previous-slide');
				$("#bg9").removeClass('current-slide').addClass('previous-slide').css('left', '-100%');
				$("#bg2").addClass('next-slide').css('left', '100%');
			});

		}
		if (i == 2 && $(".current-slide").attr('slide-order') == (i - 1)) {
			$(".next-slide").animate({
				left: "-=100%"
			},1000);
			$(".current-slide").animate({
				left: "-=100%"
			}, 1000, function(){
				$("#bg2").removeClass('next-slide').addClass('current-slide');
				$("#bg9").removeClass('previous-slide');
				$("#bg1").removeClass('current-slide').addClass('previous-slide').css('left', '-100%');
				$("#bg3").addClass('next-slide').css('left', '100%');
			});

		}
		if (i == 3 && $(".current-slide").attr('slide-order') == (i - 1)) {
			$(".next-slide").animate({
				left: "-=100%"
			},1000);
			$(".current-slide").animate({
				left: "-=100%"
			}, 1000, function(){
				$("#bg3").removeClass('next-slide').addClass('current-slide');
				$("#bg1").removeClass('previous-slide');
				$("#bg2").removeClass('current-slide').addClass('previous-slide').css('left', '-100%');
				$("#bg4").addClass('next-slide').css('left', '100%');
			});

		}
		if (i == 4 && $(".current-slide").attr('slide-order') == (i - 1)) {
			$(".next-slide").animate({
				left: "-=100%"
			},1000);
			$(".current-slide").animate({
				left: "-=100%"
			}, 1000, function(){
				$("#bg4").removeClass('next-slide').addClass('current-slide');
				$("#bg2").removeClass('previous-slide');
				$("#bg3").removeClass('current-slide').addClass('previous-slide').css('left', '-100%');
				$("#bg5").addClass('next-slide').css('left', '100%');
			});

		}
		if (i == 5 && $(".current-slide").attr('slide-order') == (i - 1)) {
			$(".next-slide").animate({
				left: "-=100%"
			},1000);
			$(".current-slide").animate({
				left: "-=100%"
			}, 1000, function(){
				$("#bg5").removeClass('next-slide').addClass('current-slide');
				$("#bg3").removeClass('previous-slide');
				$("#bg4").removeClass('current-slide').addClass('previous-slide').css('left', '-100%');
				$("#bg6").addClass('next-slide').css('left', '100%');
			});

		}
		if (i == 6 && $(".current-slide").attr('slide-order') == (i - 1)) {
			$(".next-slide").animate({
				left: "-=100%"
			},1000);
			$(".current-slide").animate({
				left: "-=100%"
			}, 1000, function(){
				$("#bg6").removeClass('next-slide').addClass('current-slide');
				$("#bg4").removeClass('previous-slide');
				$("#bg5").removeClass('current-slide').addClass('previous-slide').css('left', '-100%');
				$("#bg7").addClass('next-slide').css('left', '100%');
			});

		}
		if (i == 7 && $(".current-slide").attr('slide-order') == (i - 1)) {
			$(".next-slide").animate({
				left: "-=100%"
			},1000);
			$(".current-slide").animate({
				left: "-=100%"
			}, 1000, function(){
				$("#bg7").removeClass('next-slide').addClass('current-slide');
				$("#bg5").removeClass('previous-slide');
				$("#bg6").removeClass('current-slide').addClass('previous-slide').css('left', '-100%');
				$("#bg8").addClass('next-slide').css('left', '100%');
			});

		}
		if (i == 8 && $(".current-slide").attr('slide-order') == (i - 1)) {
			$(".next-slide").animate({
				left: "-=100%"
			},1000);
			$(".current-slide").animate({
				left: "-=100%"
			}, 1000, function(){
				$("#bg8").removeClass('next-slide').addClass('current-slide');
				$("#bg6").removeClass('previous-slide');
				$("#bg7").removeClass('current-slide').addClass('previous-slide').css('left', '-100%');
				$("#bg9").addClass('next-slide').css('left', '100%');
			});

		}
		if (i == 9 && $(".current-slide").attr('slide-order') == (i - 1)) {
			$(".next-slide").animate({
				left: "-=100%"
			},1000);
			$(".current-slide").animate({
				left: "-=100%"
			}, 1000, function(){
				$("#bg9").removeClass('next-slide').addClass('current-slide');
				$("#bg7").removeClass('previous-slide');
				$("#bg8").removeClass('current-slide').addClass('previous-slide').css('left', '-100%');
				$("#bg1").addClass('next-slide').css('left', '100%');
			});

		}

	}

	function backgroundMoveBackward() {

		if (i == 1 && $(".current-slide").attr('slide-order') == (i + 1)) {
			$(".previous-slide").animate({
				left: "+=100%"
			},1000);
			$(".current-slide").animate({
				left: "+=100%"
			}, 1000, function(){
				$("#bg1").removeClass('previous-slide').addClass('current-slide');
				$("#bg3").removeClass('next-slide');
				$("#bg2").removeClass('current-slide').addClass('next-slide').css('left', '100%');
				$("#bg9").addClass('previous-slide').css('left', '-100%');
			});

		}
		if (i == 2 && $(".current-slide").attr('slide-order') == (i + 1)) {
			$(".previous-slide").animate({
				left: "+=100%"
			},1000);
			$(".current-slide").animate({
				left: "+=100%"
			}, 1000, function(){
				$("#bg2").removeClass('previous-slide').addClass('current-slide');
				$("#bg4").removeClass('next-slide');
				$("#bg3").removeClass('current-slide').addClass('next-slide').css('left', '100%');
				$("#bg1").addClass('previous-slide').css('left', '-100%');
			});

		}
		if (i == 3 && $(".current-slide").attr('slide-order') == (i + 1)) {
			$(".previous-slide").animate({
				left: "+=100%"
			},1000);
			$(".current-slide").animate({
				left: "+=100%"
			}, 1000, function(){
				$("#bg3").removeClass('previous-slide').addClass('current-slide');
				$("#bg5").removeClass('next-slide');
				$("#bg4").removeClass('current-slide').addClass('next-slide').css('left', '100%');
				$("#bg2").addClass('previous-slide').css('left', '-100%');
			});

		}
		if (i == 4 && $(".current-slide").attr('slide-order') == (i + 1)) {
			$(".previous-slide").animate({
				left: "+=100%"
			},1000);
			$(".current-slide").animate({
				left: "+=100%"
			}, 1000, function(){
				$("#bg4").removeClass('previous-slide').addClass('current-slide');
				$("#bg6").removeClass('next-slide');
				$("#bg5").removeClass('current-slide').addClass('next-slide').css('left', '100%');
				$("#bg3").addClass('previous-slide').css('left', '-100%');
			});

		}
		if (i == 5 && $(".current-slide").attr('slide-order') == (i + 1)) {
			$(".previous-slide").animate({
				left: "+=100%"
			},1000);
			$(".current-slide").animate({
				left: "+=100%"
			}, 1000, function(){
				$("#bg5").removeClass('previous-slide').addClass('current-slide');
				$("#bg7").removeClass('next-slide');
				$("#bg6").removeClass('current-slide').addClass('next-slide').css('left', '100%');
				$("#bg4").addClass('previous-slide').css('left', '-100%');
			});

		}
		if (i == 6 && $(".current-slide").attr('slide-order') == (i + 1)) {
			$(".previous-slide").animate({
				left: "+=100%"
			},1000);
			$(".current-slide").animate({
				left: "+=100%"
			}, 1000, function(){
				$("#bg6").removeClass('previous-slide').addClass('current-slide');
				$("#bg8").removeClass('next-slide');
				$("#bg7").removeClass('current-slide').addClass('next-slide').css('left', '100%');
				$("#bg5").addClass('previous-slide').css('left', '-100%');
			});

		}
		if (i == 7 && $(".current-slide").attr('slide-order') == (i + 1)) {
			$(".previous-slide").animate({
				left: "+=100%"
			},1000);
			$(".current-slide").animate({
				left: "+=100%"
			}, 1000, function(){
				$("#bg7").removeClass('previous-slide').addClass('current-slide');
				$("#bg9").removeClass('next-slide');
				$("#bg8").removeClass('current-slide').addClass('next-slide').css('left', '100%');
				$("#bg6").addClass('previous-slide').css('left', '-100%');
			});

		}
		if (i == 8 && $(".current-slide").attr('slide-order') == (i + 1)) {
			$(".previous-slide").animate({
				left: "+=100%"
			},1000);
			$(".current-slide").animate({
				left: "+=100%"
			}, 1000, function(){
				$("#bg8").removeClass('previous-slide').addClass('current-slide');
				$("#bg1").removeClass('next-slide');
				$("#bg9").removeClass('current-slide').addClass('next-slide').css('left', '100%');
				$("#bg7").addClass('previous-slide').css('left', '-100%');
			});

		}
		if (i == 9 && $(".current-slide").attr('slide-order') == (1)) {
			$(".previous-slide").animate({
				left: "+=100%"
			},1000);
			$(".current-slide").animate({
				left: "+=100%"
			}, 1000, function(){
				$("#bg9").removeClass('previous-slide').addClass('current-slide');
				$("#bg2").removeClass('next-slide');
				$("#bg1").removeClass('current-slide').addClass('next-slide').css('left', '100%');
				$("#bg8").addClass('previous-slide').css('left', '-100%');
			});

		}
	}

	function backgroundMoveClick() {
		if(i == 1) {
			$('.current-slide').fadeOut('fast', function(){
				$("#bg1").css('left', '0').addClass('current-slide');
				$('#bg2, #bg3, #bg4, #bg5, #bg6, #bg7, #bg8, #bg9').removeClass('current-slide').css('left', '100%');
				$('.background-photo').removeClass('next-slide').removeClass('previous-slide');
			}).delay(500).fadeIn(function(){
				$("#bg2").css('left', '100%').addClass('next-slide');
				$("#bg9").css('left', '-100%').addClass('previous-slide');
			});
		}
		if(i == 2) {
			$('.current-slide').fadeOut('fast', function(){
				$("#bg2").css('left', '0').addClass('current-slide');
				$('#bg1, #bg3, #bg4, #bg5, #bg6, #bg7, #bg8, #bg9').removeClass('current-slide').css('left', '100%');
				$('.background-photo').removeClass('next-slide').removeClass('previous-slide');
			}).delay(500).fadeIn('fast', function(){
				$("#bg3").css('left', '100%').addClass('next-slide');
				$("#bg1").css('left', '-100%').addClass('previous-slide');
			});
		}
		if(i == 3) {
			$('.current-slide').fadeOut('fast', function(){
				$("#bg3").css('left', '0').addClass('current-slide');
				$('#bg1, #bg2, #bg4, #bg5, #bg6, #bg7, #bg8, #bg9').removeClass('current-slide').css('left', '100%');
				$('.background-photo').removeClass('next-slide').removeClass('previous-slide');
			}).delay(500).fadeIn('fast', function(){
				$("#bg4").css('left', '100%').addClass('next-slide');
				$("#bg2").css('left', '-100%').addClass('previous-slide');
			});
		}
		if(i == 4) {
			$('.current-slide').fadeOut('fast', function(){
				$("#bg4").css('left', '0').addClass('current-slide');
				$('#bg1, #bg2, #bg3, #bg5, #bg6, #bg7, #bg8, #bg9').removeClass('current-slide').css('left', '100%');
				$('.background-photo').removeClass('next-slide').removeClass('previous-slide');
			}).delay(500).fadeIn('fast', function(){
				$("#bg5").css('left', '100%').addClass('next-slide');
				$("#bg3").css('left', '-100%').addClass('previous-slide');
			});
		}
		if(i == 5) {
			$('.current-slide').fadeOut('fast', function(){
				$("#bg5").css('left', '0').addClass('current-slide');
				$('#bg1, #bg2, #bg3, #bg4, #bg6, #bg7, #bg8, #bg9').removeClass('current-slide').css('left', '100%');
				$('.background-photo').removeClass('next-slide').removeClass('previous-slide');
			}).delay(500).fadeIn('fast', function(){
				$("#bg6").css('left', '100%').addClass('next-slide');
				$("#bg4").css('left', '-100%').addClass('previous-slide');
			});
		}
		if(i == 6) {
			$('.current-slide').fadeOut('fast', function(){
				$("#bg6").css('left', '0').addClass('current-slide');
				$('#bg1, #bg2, #bg3, #bg4, #bg5, #bg7, #bg8, #bg9').removeClass('current-slide').css('left', '100%');
				$('.background-photo').removeClass('next-slide').removeClass('previous-slide');
			}).delay(500).fadeIn('fast', function(){
				$("#bg7").css('left', '100%').addClass('next-slide');
				$("#bg5").css('left', '-100%').addClass('previous-slide');
			});
		}
		if(i == 7) {
			$('.current-slide').fadeOut('fast', function(){
				$("#bg7").css('left', '0').addClass('current-slide');
				$('#bg1, #bg2, #bg3, #bg4, #bg5, #bg6, #bg8, #bg9').removeClass('current-slide').css('left', '100%');
				$('.background-photo').removeClass('next-slide').removeClass('previous-slide');
			}).delay(500).fadeIn('fast', function(){
				$("#bg8").css('left', '100%').addClass('next-slide');
				$("#bg6").css('left', '-100%').addClass('previous-slide');
			});
		}
		if(i == 8) {
			$('.current-slide').fadeOut('fast', function(){
				$("#bg8").css('left', '0').addClass('current-slide');
				$('#bg1, #bg2, #bg3, #bg4, #bg5, #bg6, #bg7, #bg9').removeClass('current-slide').css('left', '100%');
				$('.background-photo').removeClass('next-slide').removeClass('previous-slide');
			}).fadeIn('fast', function(){
				$("#bg9").css('left', '100%').addClass('next-slide');
				$("#bg7").css('left', '-100%').addClass('previous-slide');
			});
		}
		if(i == 9) {
			$('.current-slide').fadeOut('fast', function(){
				$("#bg9").css('left', '0').addClass('current-slide');
				$('#bg1, #bg2, #bg3, #bg4, #bg5, #bg6, #bg7, #bg8').removeClass('current-slide').css('left', '100%');
				$('.background-photo').removeClass('next-slide').removeClass('previous-slide');
			}).delay(500).fadeIn('fast', function(){
				$("#bg1").css('left', '100%').addClass('next-slide');
				$("#bg8").css('left', '-100%').addClass('previous-slide');
			});
		}
	}
	





	
		

});

































