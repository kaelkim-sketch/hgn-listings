( function() {
		$(document).ready(function() {
			/**
			 *
			 * 
			 *
			 **/
			
			var container = $("#container"),
				header = $("header"),
				naviHeight,
				containerTop;
			
			//GNB 관련
			var myGnb = new gnb();
			//이벤트 관련 함수
			var myWindowEvent = $.fn.WndowEvent;
			
			//리사이즈 및 스크롤 이벤트 - 비즈니스 파트 전용
//			myWindowEvent.addEvent({
//				mobileSet:{
//					type:"resize",
//					start:0,
//					end:768,
//					singleEvent:true,
//					callBack:function(){
//						//모바일
//						myGnb.removeBgMotion();
//						myGnb.gnbPos();
//					}},
//				//PC화면 (768이상)
//				pcSet:{
//					type:"resize",
//					start:769, 
//					end:Infinity, 
//					singleEvent:true, 
//					callBack:function(){
//						//PC
//						myGnb.addBgMotion();
//						myGnb.mobileMenuClose();
//						myGnb.gnbPos();
//					}},
//					
//				//gnb포지션 관련
//				gnbUnFixed:{
//					type:"scroll",
//					start:0,
//					end:1,
//					singleEvent:true,
//					callBack:function(){
//						myGnb.gnbUnfixed(0);
//					}
//				},
//				gnbFixed:{
//					type:"scroll",
//					start:1,
//					end:Infinity,
//					singleEvent:true,
//					callBack:function(){
//						myGnb.gnbFixed();
//					}
//				},
//				
//				//gnb bg관련
//				gnbUnWhite:{
//					type:"scroll",
//					start:0,
//					end:30,
//					singleEvent:true,
//					callBack:function(){
//						myGnb.gnbBgNoneWhite();
//					}
//				},
//				gnbWhite:{
//					type:"scroll",
//					start:31,
//					end:Infinity,
//					singleEvent:true,
//					callBack:function(){
//						myGnb.gnbBgWhite();
//					}
//				}
//			});
//			
//			
//			myWindowEvent.update();
			
			function updatePorp(type){
				myWindowEvent.scrollUpdate();
			}
			
			//=================================== GNB ==========================================
			
			function gnb() {
				
				//화면 구성요소
				var navi = $(".navi"),
				    gnb = $(".gnb"),
				    // gnbLine = $(".gnb ul li span"),
				    // depth1 = $(".gnb>ul>li"),
				    // depth2 = $(".gnb ul li ul"),
				    // btns = $(".gnb>ul a"),
                    gnbLine = $(".gnb > div > ul > li > a > span.line"),
                    depth1  = $(".gnb > div > ul > li"),
                    depth2  = $(".gnb > div > ul > li > ul"),
                    btns    = $(".gnb > div > ul > li > a"),
				    bg = $(".navi-bg"),
				    header = $("header"),
					
					//모바일 gnb
				    mBtn = $(".menu-icon"),
				    mMenu = $(".m-menu"),
				    mCloseBtn = $(".m-menu .close");
				//모션 추가
				this.addBgMotion = function(){
					navi.addClass("motion");
				}
				//모션 제거
				this.removeBgMotion = function(){
					navi.removeClass("motion");
				}
				//gnb 고정
				this.gnbFixed = function(){
					header.css({"position" : "fixed","top" : "0px","left":($("#container").offset().left)+"px"});
				}
				//gnb 고정해제
				this.gnbUnfixed = function(targetPos){
					header.css({"position" : "relative","top" : targetPos + "px","left":0});
				}
				//fixed-relative에 따른 gnb left값
				this.gnbPos = function(){
					if( header.css("position") == "fixed"){
						header.css({"left":($("#container").offset().left)+"px"});
					}else{
						header.css({"left":0});
					}
				}
				//BG흰색
				this.gnbBgWhite = function(){
					if (navi.hasClass("nochange") == false) {
						navi.addClass("not-working");
						navi.addClass("wh");
					}
				}
				//BG흰색 제거
				this.gnbBgNoneWhite = function(){
					if (navi.hasClass("nochange") == false) {
						navi.removeClass("not-working");
						navi.removeClass("wh");
					}
				}
				//모바일 메뉴 닫기
				this.mobileMenuClose = function(){
					mobileMenuClose();
				}
				
				init();
				
				function init() {
					defaultSet();
					addEvent();	
				}

				//모션 셋
				function defaultSet() {
					bg.addClass("motion");
					gnb.addClass("motion");
					depth2.addClass("motion");
					gnbLine.addClass("motion");

					header.css("z-index", 999);
				}

				//enter out이벤트
				function addEvent() {
					//GNB 마우스 오버 아웃
					gnb.bind("mouseenter", function(e) {
						e.preventDefault();

						if (navi.hasClass("nochange") == false && navi.hasClass("not-working") == false)navi.addClass("wh");
						bg.addClass("open");
						gnb.addClass("open");
						depth2.addClass("open");
					});
					
					gnb.bind("mouseleave", function(e) {
						e.preventDefault();

						if (navi.hasClass("nochange") == false && navi.hasClass("not-working") == false)navi.removeClass("wh");
						bg.removeClass("open");
						gnb.removeClass("open");
						depth2.removeClass("open");
					});

					//GNB언더바 모션
					// depth1.bind("mouseenter", function(e) {
					// 	gnbLine.eq(depth1.index(this)).addClass("depth1-line-show");
					// });
					
					// depth1.bind("mouseleave", function(e) {
					// 	gnbLine.eq(depth1.index(this)).removeClass("depth1-line-show");
					// });
                    depth1.on("mouseenter", function() {
                        $(this).find(".line").addClass("depth1-line-show");
                    });

                    depth1.on("mouseleave", function() {
                        $(this).find(".line").removeClass("depth1-line-show");
                    });             
					
					//텝버튼 액션
					//텝버튼 액션
					btns.bind("focus", function(e){
						if (navi.hasClass("nochange") == false && navi.hasClass("not-working") == false)navi.addClass("wh");
						bg.addClass("open");
						gnb.addClass("open");
						depth2.addClass("open");
					});
					
					btns.bind("blur", function(e){
						if (navi.hasClass("nochange") == false && navi.hasClass("not-working") == false)navi.removeClass("wh");
						bg.removeClass("open");
						gnb.removeClass("open");
						depth2.removeClass("open");
					});
					
					//모바일 GNB
					mBtn.bind("click", function(e) {
						e.preventDefault();
						mobileMenuOpen();
					});

					mCloseBtn.bind("click", function(e) {
						e.preventDefault();
						mobileMenuClose();
					});
				}

				//모바일 메뉴 오픈
				function mobileMenuOpen() {
					if (mMenu.hasClass("display-block") === false) {
						$("body").addClass("hide");
						$("body").children().not(".full-popup").not("header").css({display:"none"});
						$(".navi").addClass('bgw');
						mMenu.addClass("display-block");
					}
				}

				//모바일 메뉴 클로즈
				function mobileMenuClose() {
					if (mMenu.hasClass("display-block") === true) {
						$("body").removeClass("hide");
						$("body").children().not(".full-popup").not("header").css({display:"block"});
						$(".navi").removeClass('bgw');
						mMenu.removeClass("display-block");
					}
				}				

			};
			
		});
	}());
;