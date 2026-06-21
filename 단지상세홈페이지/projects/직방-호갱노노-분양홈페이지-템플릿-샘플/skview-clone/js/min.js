$(document).ready(function(){

	// history.scrollRestoration = "manual"
	// window.onload = function() {
	//     setTimeout (function () {
	//         scrollTo(0,0);
	//     },0);
	// }

	// $('.gnb').mouseover(function(){
	// 	$('.navi,.ham').addClass('mouseover')
	// })
	// $('.gnb').mouseleave(function(){
	// 	$('.navi,.ham').removeClass('mouseover')
	// })

	$('.slide_drag').mouseover(function(){
		$('#cursor').addClass('drag')
		$('.cursor_skip').addClass('drag')
	})
	$('.slide_drag').mouseleave(function(){
		$('#cursor').removeClass('drag')
		$('.cursor_skip').removeClass('drag')
	})
	$('.slide_drag2').mouseover(function(){
		$('#cursor').addClass('drag2')
	})
	$('.slide_drag2').mouseleave(function(){
		$('#cursor').removeClass('drag2')
	})
	$('.cursor_cick').mouseover(function(){
		$('#cursor').addClass('click')
	})
	$('.cursor_cick').mouseleave(function(){
		$('#cursor').removeClass('click')
	})

	// $('a,.btn').mouseover(function(){
	// 	$('#cursor').addClass('arrow')
	// })
	// $('a,.btn').mouseleave(function(){
	// 	$('#cursor').removeClass('arrow')
	// })

	$('.call,.tel p').mouseover(function(){
		$('.tel').addClass('active')
	})
	$('.call,.tel p').mouseleave(function(){
		$('.tel').removeClass('active')
	})
    
	$('.location_bt').click(function(){
		$('body.main .navi,body.main .right_scroll_wrap').stop().fadeOut(1000);
		$(".location_pop_wrap").addClass("active");
		$('.location_pop_bg').addClass('active');
	})

	$('.location_pop_close').click(function(){
		$('body.main .navi,body.main .right_scroll_wrap').stop().fadeIn(1000);
		$(".location_pop_wrap").removeClass("active");
		$('.location_pop_bg').removeClass('active');
	})

	$(document).on("click", ".footer_family > div", function () {
        $(".footer_family").toggleClass("active");
    });
    
	// $(".right_brand_wrap").click(function() {
    //     window.open('https://www.skdefine.com', '_blank');
	// });

	$(".reserve,.gnb_guest").click(function() {
        // alert('준비중입니다')
        window.open('https://www.skview.co.kr/html/interest/?dp1=survey&dp2=agree&idx=273', '_blank');
		// $(".guest_pop_wrap").addClass("active");
		// $('.guest_pop_bg').addClass('active')
		// $('body').on('scroll touchmove mousewheel', function(event) {
		// 	event.preventDefault();
		// 	event.stopPropagation();
		// 	return false;
		// });
		// $('body').css({'overflow-y':'hidden'})
        // $('.ham').removeClass("active");  
		// $('.gnb>div').stop().fadeOut(1000)
		// $('.site_list2').removeClass("open");
		// $('.site_wrap,.site_bg,.world_bg,.world_content').removeClass("active");
		// $('.navi,.ham').removeClass("over");
		// $('.site_list2').removeClass("open");
	});
	$('.guest_pop_close').click(function(){
		$('.gnb>div').stop().fadeIn(1000)
		$(".guest_pop_wrap").removeClass("active");
		$('.guest_pop_bg').removeClass('active')
		$('body').off('scroll touchmove mousewheel');
		$('body').css({'overflow-y':'auto'})
        
	})

	$('.right_scroll span').animate({'opacity':'1'},0,function bb(){
		$(this).delay(0).animate({'top':'9rem'},1800,function(){
			$(this).css({'top':'0','opacity':'0'})
			$(this).animate({'opacity':'1'},700,bb)
		})
	})

    $(document).on('click', '.right_quick ul li:nth-child(1)', function(e){

        const w = $(window).width();
        const h = $(window).height();
    
        if (w > 1400) return;
    
        if (w > 1000) {
            if (w < h) {
                $('.right_quick').toggleClass('active');
            }
        }
        else {
            $('.right_quick').toggleClass('active');
        }
    
    });
	
	
	$('body.sub .navi,body.sub .ham').addClass('white');
	// $('body.sub .navi').delay(0).fadeIn(1000);
	$('body.sub .navi,body.sub .ham').delay(0).fadeIn(1000);


	$('.top_bt').click(function(){
		$('body,html').animate({'scrollTop':'0'},400)
	})
	/*
	$('.ham').click(function(){
		alert('준비중입니다')
	})
	*/

	const trigger = new ScrollTrigger.default({
		trigger: {
				// once: true,
				offset: {
				element: {
					x: 0,
					y: 0.05
				},
	//			viewport: {
	//                x: 0,
	//                y: (trigger, frame, direction) => {
	//                    return trigger.visible ? 0 : 0.3
	//                }
	//             }
			},
			toggle:{
				class:{
					in:'active',
					out:'inactive'
				}
			}

		}
		});
		trigger.add('[data-active]')
	//			.add('[data-slideInBottom]')
	//			.add('[data-fadeIn]')
	//			.add('[data-slideInBottom]')

	// 

	ham = 0
	$('.ham').click(function(){
		// alert('준비중입니다')
		if( ham == 0 ){  
			ham = 1; 
			$(this).addClass("active");            
			$('.gnb>div').stop().fadeOut(1000)
			$('.site_wrap,.site_bg').addClass("active");
			$('.navi,.ham').addClass("over");
			$('body').on('scroll touchmove mousewheel', function(event) {
				event.preventDefault();
				event.stopPropagation();
				return false;
			});
		}
		else if ( ham == 1 ){
			ham = 0;
			$(this).removeClass("active");  
			$('.gnb>div').stop().fadeIn(1000)
			$('.site_wrap,.site_bg').removeClass("active");
			$('.navi,.ham').removeClass("over");
			$('body').off('scroll touchmove mousewheel');
		}
	})
	
	
    // 인트로 애니메이션 시작

    const TRANSITION = 1600;
    
    const wait = (ms) => new Promise(res => setTimeout(res, ms));
    let cancelled = false;
    let finished  = false;
    
    // PC/모바일 체크
    const isPC = () => $(window).width() > 1400;
    
    // 스크롤 잠금
    function lockScroll() {
      if (isPC()) {
        $('body.main').on('scroll touchmove mousewheel', blockScroll);
      } else {
        $('body.main').addClass('locked');
      }
    }
    
    // 스크롤 해제
    function unlockScroll() {
      if (isPC()) {
        $('body.main').off('scroll touchmove mousewheel', blockScroll);
      } else {
        $('body.main').removeClass('locked');
      }
    }
    
    // 이벤트 차단 핸들러
    function blockScroll(event) {
      event.preventDefault();
      event.stopPropagation();
      return false;
    }
    
    // 최종 액션
    function finalReveal() {
      if (finished) return;
      finished = true;
    
      $('body.main .navi, body.main .ham, body.main .right_quick').fadeIn(1000);
    //   $('body.main .navi, body.main .ham, body.main .right_scroll_wrap').addClass('white');
      $('.cursor_skip2').removeClass('show');
      $('.main_skip_wrap').fadeOut(0);
      $('.intro_all_wrap').fadeOut(1200);
      $('.right_brand_wrap').addClass('show');
      $('.main_wrap').addClass('on');
    
    //   if (window.matchMedia('(max-width: 767px)').matches) {
    //     $('body.main .navi, body.main .ham').addClass('white');
    //   }  
    
//      $('#player').html('<iframe src="https://www.youtube.com/embed/uRK7fObUu04?si=Hh0Dm9Kcmopii4ns&autoplay=1&mute=1&controls=1&loop=1&playlist=uRK7fObUu04" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>');
    
      // 인트로 끝 → 스크롤 해제
      unlockScroll();
    
      setTimeout(() => {
        $('.main_wrap').addClass('end');
        $('#k_popup2').addClass('show');
        swiper_main.slideTo(2);
      }, TRANSITION);
    }
    
    const introTimeline = [
        { delay: 200, add: 'intro' },
        { delay: 1500, add: 'intro2' },
        { delay: 1500, add: 'intro3' },
        { delay: 1500, add: 'intro4' },
        { delay: 3000, add: 'intro5' },
        { delay: 1500, add: 'intro6' },
        { delay: 1500, add: 'intro7' },
        { delay: 1500, add: 'intro8' },
        // { delay: 1500, add: 'intro9' },
        // { delay: 2000, add: 'intro10' },
        // { delay: 4700, add: 'intro11' },
        // { delay: 2700, add: 'intro11' },
    ];
    
    async function runIntroSequence() {
      const $intro = $('.intro_wrap');
        
      // 인트로 시작 전 대기시간
      await wait(200);
    
      // 인트로 시작 시 스크롤 잠금
      lockScroll();
    
      for (const step of introTimeline) {
		await wait(step.delay);
		if (cancelled) return;
	  
		if (step.add) {
		  $intro.addClass(step.add);
	  
		  if (step.add === 'intro7') {
			setTimeout(() => {
			  $('.main_vd_box.box04 .main_vd').html('<iframe src="https://player.vimeo.com/video/1195547869?autoplay=1&muted=1&controls=0&autopause=0&loop=1" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>');
			}, 500);
		  }
		}
	  }
      
      // 마지막 애니메이션 후 딜레이 5초 뒤 skip 추가
      await wait(4500);
      if (cancelled) return;
      $intro.addClass('skip');
      finalReveal();
    }
    
    function scheduleSkipUI() {
      setTimeout(() => {
        $('.main_skip_wrap').fadeIn(1000);
        $('.cursor_skip2').addClass('show');
      }, 1500);
    }
    
    function bindSkipButton() {
      $('.main_skip_bt').on('click', function () {
        if (finished) return;
        cancelled = true;
    
        $('.intro_wrap').stop(true, true).addClass('skip');
        $('.cursor_skip2').removeClass('show');
        $('.main_skip_wrap').fadeOut(0);
    
        // bgm재생
        startAudio();
    
        // 스킵 → 스크롤 해제
        unlockScroll();
    
        finalReveal();
      });
    }
    
    // --- 개발용 스킵 토글 ---
    // 1) URL에 ?devskip=1 붙이면 켜짐
    // 2) 또는 localStorage.setItem('introDevSkip','1') 로 켜기 / removeItem 으로 끄기
    function isDevSkip() {
      const q = new URLSearchParams(location.search);
      return q.get('devskip') === '1' || localStorage.getItem('introDevSkip') === '1';
    }
    
    // 개발용 즉시 스킵 실행 (인트로 전부 생략)
    function fastSkip() {
      // 진행 중단
      cancelled = true;
    
      // 인트로 UI/상태 정리
      $('.intro_wrap').stop(true, true).addClass('skip');
      $('.cursor_skip2').removeClass('show');
      $('.main_skip_wrap').hide();
    
      // 바로 최종 단계로
      finalReveal();
    }
    
    // 초기화
    $(function () {
      if (isDevSkip()) {
        // 개발모드: 인트로 생략
        fastSkip();
      } else {
        // 평소대로 인트로 진행
        scheduleSkipUI();
        bindSkipButton();
        runIntroSequence();
      }
    });
    
    // 인트로 애니메이션 끝

// win_w = $(window).width();
// if ( win_w > 1400 ){
	// 

    
	const cursor = document.querySelector('#cursor');
	const cursorCircle = cursor.querySelector('.cursor__circle');

	const mouse = { x: -100, y: -100 }; // mouse pointer's coordinates
	const pos = { x: 0, y: 0 }; // cursor's coordinates
	const speed = 0.2; // between 0 and 1

	const updateCoordinates = e => {
		mouse.x = e.clientX;
		mouse.y = e.clientY;
	}

	window.addEventListener('mousemove', updateCoordinates);


	function getAngle(diffX, diffY) {
		return Math.atan2(diffY, diffX) * 180 / Math.PI;
	}

	function getSqueeze(diffX, diffY) {
		const distance = Math.sqrt(
		Math.pow(diffX, 2) + Math.pow(diffY, 2)
		);
		const maxSqueeze = 0.15;
		const accelerator = 1500;
		return Math.min(distance / accelerator, maxSqueeze);
	}


	const updateCursor = () => {
		const diffX = Math.round(mouse.x - pos.x);
		const diffY = Math.round(mouse.y - pos.y);
		
		pos.x += diffX * speed;
		pos.y += diffY * speed;
		
		const angle = getAngle(diffX, diffY);
		const squeeze = getSqueeze(diffX, diffY);
		
		const scale = 'scale(' + (1 + squeeze) + ', ' + (1 - squeeze) +')';
		const rotate = 'rotate(' + angle +'deg)';
		const translate = 'translate3d(' + pos.x + 'px ,' + pos.y + 'px, 0)';

		cursor.style.transform = translate;
		cursorCircle.style.transform = rotate + scale;
	};

	function loop() {
		updateCursor();
		requestAnimationFrame(loop);
	}

	requestAnimationFrame(loop);



	const cursorModifiers = document.querySelectorAll('[cursor-class]');

	cursorModifiers.forEach(curosrModifier => {
		curosrModifier.addEventListener('mouseenter', function() {
		const className = this.getAttribute('cursor-class');
		cursor.classList.add(className);
		});
		
		curosrModifier.addEventListener('mouseleave', function() {
		const className = this.getAttribute('cursor-class');
		cursor.classList.remove(className);
		});
	});

    
    //main
    var full_move = true;
    var touchStartY = 0;
    var touchEndY = 0;
    
    function mainMotion(delta) {
        $.fn.fullpage.setAllowScrolling(false);
        $.fn.fullpage.setKeyboardScrolling(false);
    
        if (delta > 0) {
            if ($('.main_wrap').hasClass('end') == true) {
                $('.main_wrap').removeClass('on2 end2 on end').addClass('on end');
            } else if ($('.main_wrap').hasClass('end2') == true) {
                if (($(window).width() > 1400 || $(window).width() > $(window).height()) && $(window).width() > 1000) {
                    $('.navi,.ham').addClass('white');
                }
                $('.main_wrap').removeClass('on2 end2 on end').addClass('on');
                setTimeout(function() {
                    $('.main_wrap').addClass('end');
                }, TRANSITION);
            } else if ($('.main_wrap').hasClass('end3') == true) {
                $('.navi,.ham').removeClass('white');
                $('.main_wrap').removeClass('on3 end3').addClass('on2');
                setTimeout(function() {
                    $('.main_wrap').addClass('end2');
                }, TRANSITION);
            }
        } else if (delta < 0) {
            if ($('.main_wrap').hasClass('end3') == true) {
                $.fn.fullpage.setAllowScrolling(true);
                $.fn.fullpage.setKeyboardScrolling(true);
                $.fn.fullpage.moveTo(2);
            } else if ($('.main_wrap').hasClass('end') == true) {
                $('.navi,.ham').removeClass('white');
                $('.main_wrap').removeClass('on end').addClass('on2');
                setTimeout(function() {
                    $('.main_wrap').addClass('end2');
                }, TRANSITION);
            } else if ($('.main_wrap').hasClass('end2') == true) {
                $('.navi,.ham').addClass('white');
                $('.main_wrap').removeClass('on2 end2').addClass('on3');
                setTimeout(function() {
                    $('.main_wrap').addClass('end3');
                }, TRANSITION);
            }
        }
    }
    
    $("#section1").on("DOMMouseScroll mousewheel wheel", function(event, delta) {
        event.preventDefault();
        mainMotion(delta);
    });
    
    $("#section1").on("touchstart", function(e) {
        touchStartY = e.originalEvent.touches[0].clientY;
    });
    
    $("#section1").on("touchend", function(e) {
        e.preventDefault();
    
        touchEndY = e.originalEvent.changedTouches[0].clientY;
    
        var diff = touchStartY - touchEndY;
    
        if (Math.abs(diff) < 50) return;
    
        if (diff > 0) {
            mainMotion(-1);
        } else {
            mainMotion(1);
        }
    });
    
    // 모바일 section1 터치 fullpage 강제 차단
    var section1 = document.getElementById('section1');
    
    if (section1) {
        section1.addEventListener('touchmove', function(e) {
            e.preventDefault();
        }, { passive: false });
    }

	//main
	// var full_move = true;
	// $("#section1").on("DOMMouseScroll mousewheel wheel", function(event,delta){
	// 	$.fn.fullpage.setAllowScrolling(false);
	// 	$.fn.fullpage.setKeyboardScrolling(false);
	// 	if (delta > 0) {
	// 		if($('.main_wrap').hasClass('end') == true){
	// 			$('.main_wrap').removeClass('on2 end2 on end').addClass('on end');
	// 		} else if($('.main_wrap').hasClass('end2') == true){
	// 			$('.navi,.ham').addClass('white');
	// 			$('.main_wrap').removeClass('on2 end2 on end').addClass('on');
	// 			setTimeout(function() {
	// 				$('.main_wrap').addClass('end');
	// 			}, TRANSITION);
	// 		} else if($('.main_wrap').hasClass('end3') == true){
	// 			$('.navi,.ham').removeClass('white');
	// 			$('.main_wrap').removeClass('on3 end3').addClass('on2');
	// 			setTimeout(function() {
	// 				$('.main_wrap').addClass('end2');
	// 			}, TRANSITION);
	// 		}
	// 	} else if (delta < 0) {
	// 		if($('.main_wrap').hasClass('end3') == true){
	// 			$('body').off('scroll touchmove mousewheel');
	// 			$.fn.fullpage.moveTo(2);
	// 		} else if($('.main_wrap').hasClass('end') == true){
    //             // $('.main_vd_box2 .main_vd').html('<iframe src="https://player.vimeo.com/video/1195547869?autoplay=1&muted=1&controls=0&autopause=0&loop=1" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>');
	// 			$('.navi,.ham').removeClass('white');
	// 			$('.main_wrap').removeClass('on end').addClass('on2');
	// 			setTimeout(function() {
	// 				$('.main_wrap').addClass('end2');
	// 			}, TRANSITION);
	// 		} else if($('.main_wrap').hasClass('end2') == true){
	// 			$('.navi,.ham').addClass('white');
	// 			$('.main_wrap').removeClass('on2 end2').addClass('on3');
	// 			setTimeout(function() {
	// 				$('.main_wrap').addClass('end3');
	// 			}, TRANSITION);
	// 		}
	// 	}
	// });

	//location
	var full_move = true;
	$("#section222").on("DOMMouseScroll mousewheel wheel", function(event,delta){
		$.fn.fullpage.setAllowScrolling(false);
		$.fn.fullpage.setKeyboardScrolling(false);
		if (delta > 0) {
			if($('.location_wrap').hasClass('end') == true){
				$.fn.fullpage.moveTo(1);
			} else if($('.location_wrap').hasClass('end2') == true){
				$('.navi,.ham').removeClass('white');
				$('.location_wrap').removeClass('on2 end2').addClass('on');
				setTimeout(function() {
					$('.location_wrap').addClass('end');
				}, TRANSITION);
			} else if($('.location_wrap').hasClass('end3') == true){
				$('.navi,.ham').addClass('white');
				$('.location_wrap').removeClass('on3 end3').addClass('on2');
				setTimeout(function() {
					$('.location_wrap').addClass('end2');
				}, TRANSITION);
			}
		} else if (delta < 0) {
			if($('.location_wrap').hasClass('end3') == true){
				$.fn.fullpage.moveTo(3);
			} else if($('.location_wrap').hasClass('end') == true){
				$('.navi,.ham').addClass('white');
				$('.location_wrap').removeClass('on end').addClass('on2');
				setTimeout(function() {
					$('.location_wrap').addClass('end2');
				}, TRANSITION);
			} else if($('.location_wrap').hasClass('end2') == true){
				$('.navi,.ham').removeClass('white');
				$('.location_wrap').removeClass('on2 end2').addClass('on3');
				setTimeout(function() {
					$('.location_wrap').addClass('end3');
				}, TRANSITION);
			}
		}
	});
	
	//complex
	var full_move = true;
	$("#section55").on("DOMMouseScroll mousewheel wheel", function(event,delta){
		$.fn.fullpage.setAllowScrolling(false);
		$.fn.fullpage.setKeyboardScrolling(false);
		if (delta > 0) {
			if($('.complex_wrap').hasClass('end') == true){
				$.fn.fullpage.moveTo(3);
			} else if($('.complex_wrap').hasClass('end2') == true){
				$('.navi,.ham').removeClass('white');
				$('.complex_wrap').removeClass('on2 end2').addClass('on');
				setTimeout(function() {
					$('.complex_wrap').addClass('end');
				}, TRANSITION);
			} else if($('.complex_wrap').hasClass('end3') == true){
				$('.navi,.ham').addClass('white');
				$('.complex_wrap').removeClass('on3 end3').addClass('on2');
				setTimeout(function() {
					$('.complex_wrap').addClass('end2');
				}, TRANSITION);
			} else if($('.complex_wrap').hasClass('end4') == true){
				$('.navi,.ham').removeClass('white');
				$('.complex_wrap').removeClass('on4 end4').addClass('on3');
				setTimeout(function() {
					$('.complex_wrap').addClass('end3');
				}, TRANSITION);
			} 
		} else if (delta < 0) {
			if($('.complex_wrap').hasClass('end4') == true){
				$.fn.fullpage.moveTo(5);
			} else if($('.complex_wrap').hasClass('end') == true){
				$('.navi,.ham').addClass('white');
				$('.complex_wrap').removeClass('on end').addClass('on2');
				setTimeout(function() {
					$('.complex_wrap').addClass('end2');
				}, TRANSITION);
			} else if($('.complex_wrap').hasClass('end2') == true){
				$('.navi,.ham').removeClass('white');
				$('.complex_wrap').removeClass('on2 end2').addClass('on3');
				setTimeout(function() {
					$('.complex_wrap').addClass('end3');
				}, TRANSITION);
			} else if($('.complex_wrap').hasClass('end3') == true){
				$('.navi,.ham').addClass('white');
				$('.complex_wrap').removeClass('on3 end3').addClass('on4');
				setTimeout(function() {
					$('.complex_wrap').addClass('end4');
				}, TRANSITION);
			}
		}
	});

	//comm
	var full_move = true;
	$("#section666").on("DOMMouseScroll mousewheel wheel", function(event,delta){
		$.fn.fullpage.setAllowScrolling(false);
		$.fn.fullpage.setKeyboardScrolling(false);
		if (delta > 0) {
			if($('.comm_wrap').hasClass('end') == true){
				$.fn.fullpage.moveTo(4);
			} else if($('.comm_wrap').hasClass('end2') == true){
				$('.comm_wrap').removeClass('on2 end2').addClass('on');
				setTimeout(function() {
					$('.comm_wrap').addClass('end');
				}, TRANSITION);
			}
		} else if (delta < 0) {
			if($('.comm_wrap').hasClass('end2') == true){
				$.fn.fullpage.moveTo(6);
			} else if($('.comm_wrap').hasClass('end') == true){
				$('.comm_wrap').removeClass('on end').addClass('on2');
				setTimeout(function() {
					$('.comm_wrap').addClass('end2');
				}, TRANSITION);
			}
		}
	});
    
	//comm
	var full_move = true;
	$("#section7").on("DOMMouseScroll mousewheel wheel", function(event,delta){
		$.fn.fullpage.setAllowScrolling(false);
		$.fn.fullpage.setKeyboardScrolling(false);
		if (delta > 0) {
			if($('.unit_wrap').hasClass('end') == true){
				$.fn.fullpage.moveTo(5);
			} else if($('.unit_wrap').hasClass('end2') == true){
				$('.unit_wrap').removeClass('on2 end2').addClass('on');
				setTimeout(function() {
					$('.unit_wrap').addClass('end');
				}, TRANSITION);
			}
		} else if (delta < 0) {
			if($('.unit_wrap').hasClass('end2') == true){
				$.fn.fullpage.moveTo(7);
			} else if($('.unit_wrap').hasClass('end') == true){
				$('.unit_wrap').removeClass('on end').addClass('on2');
				setTimeout(function() {
					$('.unit_wrap').addClass('end2');
				}, TRANSITION);
			}
		}
	});
	
	//brand
	var full_move = true;
	$("#section44").on("DOMMouseScroll mousewheel wheel", function(event,delta){
		$.fn.fullpage.setAllowScrolling(false);
		$.fn.fullpage.setKeyboardScrolling(false);
		if (delta > 0) {
			if($('.brand_wrap').hasClass('end') == true){
				$.fn.fullpage.moveTo(3);
			} else if($('.brand_wrap').hasClass('end2') == true){
				$('.brand_wrap').removeClass('on2 end2').addClass('on');
				setTimeout(function() {
					$('.brand_wrap').addClass('end');
				}, TRANSITION);
			}
		} else if (delta < 0) {
			if($('.brand_wrap').hasClass('end2') == true){
				$.fn.fullpage.moveTo(5);
			} else if($('.brand_wrap').hasClass('end') == true){
				$('.brand_wrap').removeClass('on end').addClass('on2');
				setTimeout(function() {
					$('.brand_wrap').addClass('end2');
				}, TRANSITION);
			}
		}
	});
    // 어떤 섹션에서 white를 사용할지 정의
    function isWhiteSection(idx){
        if ($(window).width() > 1400) {
            return [1,3].includes(idx); // PC
        } else if ($(window).width() > 1000 && $(window).width() > $(window).height()) {
            return [1,3].includes(idx); // 모바일 가로모드 (1000 초과만)
        } else {
            return [3].includes(idx); // 모바일 세로모드 + 1000 이하
        }
    }
    
    $('#fullpage').fullpage({
      navigation: false,
      css3: true,
      verticalCentered: true,
      scrollingSpeed: TRANSITION,
      keyboardScrolling: false,
      normalScrollElements: '#section1',
    //   touchSensitivity: 9999,
    
      // 초기 렌더 완료 시: 시작 섹션 기준으로 1회만 세팅
      afterRender: function(){
        // fullPage는 첫 섹션이 1부터 시작
        const startIndex = 1;
        $('.navi,.ham,.right_scroll_wrap').toggleClass('white', isWhiteSection(startIndex));
    
        $.fn.fullpage.setAllowScrolling(false);
        $.fn.fullpage.setKeyboardScrolling(false);
      },
    
      // 여기서만 white를 관리한다!
      onLeave: function(index, nextIndex, direction){
        // 1) 이동 시작 시점에 "다음 섹션" 기준으로 테마 결정
        $('.navi,.ham').toggleClass('white', isWhiteSection(nextIndex));
    
        // 2) 섹션 전환 애니메이션 (기존 로직 유지)
        if (index === 1 && direction === 'down'){
          $('.main_wrap').removeClass('end');
          setTimeout(() => { $('.main_wrap').removeClass('on'); }, TRANSITION);
    
          $('.location_wrap').addClass('on');
          setTimeout(() => { $('.location_wrap').addClass('end'); }, TRANSITION);
        }
    
        if (index === 2 && direction === 'up'){
          $('.navi,.ham').addClass('white');
          $('.main_wrap').removeClass('on end');
          $('.location_wrap').removeClass('end');
          setTimeout(() => { $('.location_wrap').removeClass('on'); }, TRANSITION);
    
          $('.main_wrap').addClass('on3');
          setTimeout(() => { $('.main_wrap').addClass('end3'); }, TRANSITION);
        } else if (index === 2 && direction === 'down'){
          $('.location_wrap').removeClass('end');
          setTimeout(() => { $('.location_wrap').removeClass('on'); }, TRANSITION);
    
          $('.premium_wrap').addClass('on');
          setTimeout(() => { $('.premium_wrap').addClass('end'); }, TRANSITION);
        }
    
        if (index === 3 && direction === 'up'){
          $('.premium_wrap').removeClass('end');
          setTimeout(() => { $('.premium_wrap').removeClass('on'); }, TRANSITION);
    
          $('.location_wrap').addClass('on');
          setTimeout(() => { $('.location_wrap').addClass('end'); }, TRANSITION);
        } else if (index === 3 && direction === 'down'){
          $('.premium_wrap').removeClass('end');
          setTimeout(() => { $('.premium_wrap').removeClass('on'); }, TRANSITION);
    
          $('.contact_wrap').addClass('on');
          setTimeout(() => { $('.contact_wrap').addClass('end'); }, TRANSITION);
        }
    
        // if (index === 4 && direction === 'up'){
        //   $('.news_wrap').removeClass('end');
        //   setTimeout(() => { $('.news_wrap').removeClass('on'); }, TRANSITION);
    
        //   $('.premium_wrap').addClass('on');
        //   setTimeout(() => { $('.premium_wrap').addClass('end'); }, TRANSITION);
        // } else if (index === 4 && direction === 'down'){
        //   $('.news_wrap').removeClass('end');
        //   setTimeout(() => { $('.news_wrap').removeClass('on'); }, TRANSITION);
    
        //   $('.contact_wrap').addClass('on');
        //   setTimeout(() => { $('.contact_wrap').addClass('end'); }, TRANSITION);
        // }
    
        if (index === 4 && direction === 'up'){
          $('.contact_wrap').removeClass('end');
          setTimeout(() => { $('.contact_wrap').removeClass('on'); }, TRANSITION);
    
          $('.premium_wrap').addClass('on');
          setTimeout(() => { $('.premium_wrap').addClass('end'); }, TRANSITION);
        } else if (index === 4 && direction === 'down'){
          $('.footer').addClass('on');
          setTimeout(() => { $('.footer').addClass('end'); }, TRANSITION);
          $('header,.navi,.ham,.right_quick').fadeOut();
        }
    
        if (index === 5 && direction === 'up'){
          $('.footer').removeClass('on');
          setTimeout(() => { $('.footer').removeClass('end'); }, TRANSITION);
          $('header,.navi,.ham,.right_quick').fadeIn();
        }
      },
    
      // afterLoad에서는 1번 섹션일 때 fullpage 스크롤을 다시 잠근다
      afterLoad: function(anchorLink, index){
        if (index === 1) {
          $.fn.fullpage.setAllowScrolling(false);
        } else {
          $.fn.fullpage.setAllowScrolling(true);
        }
    
        $.fn.fullpage.setKeyboardScrolling(false);
      }
    });
	
	/* -----------------------------
	   유틸 & 클릭 핸들러(white 미터치)
	------------------------------*/
	
	function closeSiteMenus(){
		ham = 0;
		$('.ham').removeClass("active");  
		$('.gnb>div').stop().fadeIn(1000)
		$('.site_wrap,.site_bg').removeClass("active");
		$('.navi,.ham').removeClass("over");
		$('body').off('scroll touchmove mousewheel');
	}
	function resetWrapClasses() {
		// $('.section > div').each(function () {
		// 	$(this).find('div').addBack().each(function () {
		// 	const m = this.className && this.className.match(/\b[A-Za-z0-9_-]*_wrap\b/);
		// 	if (m) {
		// 		this.className = m[0];
		// 	}
		// 	});
		// });
	}
	
	$(document).on('click', '.top_bt', function(){
	  $.fn.fullpage.moveTo(1);
	
	  resetWrapClasses();
      
	  $('.brand_wrap').removeClass('on2 end2');
      $('.location_wrap').removeClass('on2 on3 on4 end4 end2 end3 end4');
	  $('.main_wrap').removeClass('on2 on3 on4 end2 end3 end4').addClass('on');
	  setTimeout(() => {
		$('.main_wrap').addClass('end').removeClass('on2 on3 on4 end2 end3 end4');
	  }, TRANSITION);
	});
	
	// $(document).on('click', '.menu1', function(){
	//   $.fn.fullpage.moveTo(1);
	
	//   resetWrapClasses();

	//   $('.main_wrap').removeClass('on2 end2').addClass('on');
	//   setTimeout(() => {
	// 	$('.main_wrap').addClass('end').removeClass('on2 end2');
	//   }, TRANSITION);
	
	//   closeSiteMenus();
	// });
	
	$(document).on('click', '.menu1', function(){
	  $.fn.fullpage.moveTo(1);
	
	  resetWrapClasses();
      
      $('.navi,.ham').removeClass('white');
	  $('.main_wrap').addClass('on');
	  $('.main_wrap').removeClass('on2 end2 on3 end3');
	  setTimeout(() => {
		$('.main_wrap').addClass('end').removeClass('on2 end2 on3 end3');;
	  }, TRANSITION);
	
	  closeSiteMenus();
	});
    
	$(document).on('click', '.menu2', function(){
	  $.fn.fullpage.moveTo(1);
	
	  resetWrapClasses();
      
      $('.navi,.ham').addClass('white');
	  $('.main_wrap').addClass('on3');
	  $('.main_wrap').removeClass('on end on2 end2');
	  setTimeout(() => {
		$('.main_wrap').addClass('end3');
	  }, TRANSITION);
	
	  closeSiteMenus();
	});

	$(document).on('click', '.menu3', function(){
	  $.fn.fullpage.moveTo(2);
	
	  resetWrapClasses();
      
      $('.navi,.ham').removeClass('white');
	  $('.location_wrap').removeClass('on2 end2').addClass('on');
	  setTimeout(() => {
		$('.location_wrap').addClass('end');
		$('.main_wrap').removeClass('on on2 end end2').addClass('on3 end3');
	  }, TRANSITION);
	
	  closeSiteMenus();
	});
		
	$(document).on('click', '.menu4', function(){
	  $.fn.fullpage.moveTo(3);
	
	  resetWrapClasses();
      
      if ($(window).width() > 1400) {
        $('.navi,.ham').addClass('white');
      } else {
        $('.navi,.ham').removeClass('white');
      }
	  $('.premium_wrap').addClass('on');
	  setTimeout(() => {
		$('.premium_wrap').addClass('end');
		$('.main_wrap').removeClass('on on2 end end2').addClass('on3 end3');
	  }, TRANSITION);
	
	  closeSiteMenus();
	});
    
	$(document).on('click', '.menu4b', function(){
	  $.fn.fullpage.moveTo(4);
	
	  resetWrapClasses();
      
      $('.navi,.ham').removeClass('white');
	  $('.news_wrap').addClass('on');
	  setTimeout(() => {
		$('.news_wrap').addClass('end');
		$('.main_wrap').removeClass('on on2 end end2').addClass('on3 end3');
	  }, TRANSITION);
	
	  closeSiteMenus();
	});

	$(document).on('click', '.menu5', function(){
	  $.fn.fullpage.moveTo(4);
	
	  resetWrapClasses();
      
      $('.navi,.ham').removeClass('white');
	  $('.contact_wrap').addClass('on');
	  setTimeout(() => {
		$('.contact_wrap').addClass('end');
		$('.main_wrap').removeClass('on on2 end end2').addClass('on3 end3');
	  }, TRANSITION);
	
	  closeSiteMenus();
	});
	

// } 
// else if ( win_w <= 1400 ){

//     var summaryT = document.querySelector(".main02").offsetTop;


// 	$(document).on('click', '.menu2', function(){
// 		window.scrollTo({top:summaryT, behavior:'smooth'});
// 		ham = 0;
// 		$('.ham').removeClass("active");
// 		$('.site_wrap,.site_bg,.world_bg,.world_content').removeClass("active");
// 		$('.navi,.ham').removeClass("over");
// 		$('body').css({'overflow-y':'auto'})
// 	});
	
	
// 	document.querySelectorAll('.site_list a').forEach(anchor => {
//         anchor.addEventListener('click', function (e) {
    
//             const href = this.getAttribute('href');
//             const targetId = this.getAttribute('data-target');
    
//             // 실제 링크가 있으면 그대로 이동
//             if (href && href !== 'javascript:void(0)' && !targetId) {
//                 return;
//             }
    
//             // data-target 있는 경우만 스크롤
//             if (targetId) {
//                 e.preventDefault();
    
//                 const targetElement = document.getElementById(targetId);
//                 if (!targetElement) return;
    
//                 const yOffset = -40;
//                 const y = targetElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
    
//                 window.scrollTo({
//                     top: y,
//                     behavior: 'smooth'
//                 });
    
//                 ham = 0;
//                 $('.ham').removeClass("active");
//                 $('.site_list2').removeClass("open");
//                 $('.site_wrap,.site_bg,.world_bg,.world_content').removeClass("active");
//                 $('.navi,.ham').removeClass("over");
//             }
//         });
//     });
    
    
//     $(function () {
//         const GAP = 57;
//         const sections = {
//             '.menu1': '#section1',
//             '.menu2': '.main02',
//             '.menu3': '#section2',
//             '.menu4': '#section3',
//             '.menu5': '#section4',
//         };
    
//         $.each(sections, function (menu, target) {
//             $(document).on('click', menu, function () {
//                 const top = $(target).offset().top - GAP;
//                 window.scrollTo({ top, behavior: 'smooth' });
//                 closeSiteMenus();
//             });
//         });
//     });
    
    
// }

});


	$(window).scroll(function(){

		sc = $(window).scrollTop();
		footerTop = $('.footer').offset().top - $(window).height()
		// mainH = $('.brand01').height()

		if ( sc>21 )
		{
			$('.navi,.right_brand_wrap').addClass('active')
			$('.ham').addClass('active2')
		}
		if ( sc<21 )
		{
			$('.navi,.right_brand_wrap').removeClass('active')
			$('.ham').removeClass('active2')
		}
		
		if( footerTop <= sc ){
			$('.footer').addClass('active');
		} else {
			$('.footer').removeClass('active');
		}

	});


// });



