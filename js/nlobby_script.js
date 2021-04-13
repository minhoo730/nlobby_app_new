	$(document).ready(function(){
		// 삭제 버튼 클릭시 텍스트 제거 스크립트
		//$('.form_label input[name="keyword"]').on('input propertychange', function() {
		$('.form_label input').on('input propertychange', function() {
			var $this = $(this);
			var visible = Boolean($this.val());
			$this.siblings('.txt_clear').toggleClass('clear', !visible);
		}).trigger('propertychange');
		$('.txt_clear').click(function() {
			//$(this).siblings('input[name="keyword"]').val('')
			$(this).siblings('input').val('')
				//.trigger('propertychange').focus();
				.trigger('propertychange').click();
		});

		// 좌상단 버튼 클릭시 좌측 메뉴 노출
		$('#wrap .left_btn').on('click', function(){
			$('.modal_bg').fadeIn(200); 
			$('.left_area').show().animate({
				left:0
			},200);  
		});
		$('.modal_bg, .close_btn').on('click', function(){
			$('.modal_bg').fadeOut(200); 
			$('.left_area').animate({
				left: '-' + 260 + 'px'
			},200);
		}); 


		$(".bot_bg ul > li").click(function(){
			// 탭메뉴 열려있는 상태에서 자기 버튼을 클릭 했을 때 종료
			if($(this).hasClass("on") == true){
				$(this).removeClass("on");
				$(".bot_list").slideUp(300);
			} else{
			// 탭메뉴 클릭시 노출
			var idx = $(this).index();
			$(".bot_bg ul > li").removeClass("on");
			$(".bot_bg ul > li").eq(idx).addClass("on");
			$(".bot_list").slideUp(300);
			$(".bot_list").eq(idx).slideDown(300);
			}
		});


		$(".tab_con .list_close").click(function(){
			$(".bot_list").slideUp();
			$(".bot_bg ul li").removeClass("on");
		});

		$(".t_alarm_btn").click(function(){
			$(".alarm_area").slideDown(300);
		});

		$(".alarm_header .back_link").click(function(){
			$(".alarm_area").slideUp(300);
		});

		$(".green_mark").click(function(){
			$(".green_mark, .green_company").addClass("on");
			$(".gray_mark, .gray_company").removeClass("on");
			$(".gray_nlobby, .gray_company").removeClass("on");
			$(".green_nlobby, .green_company").removeClass("on");
			$(".green_company").slideDown(200);
			$(".gray_company").slideUp(200);
			$(".nodata_com").slideUp(200);
			$(".green_company ul li").css("display","block");
			$(".green_company ul li:first-child").css("display","block");
		});

		$(".green_company .close_btn").click(function(){
			$(".green_mark, .green_company").removeClass("on");
			$(".green_company").slideUp(200);
		});


		$(".gray_mark").click(function(){
			$(".gray_mark, .gray_company").addClass("on");
			$(".gray_nlobby, .gray_company").removeClass("on");
			$(".green_mark, .green_company").removeClass("on");
			$(".green_nlobby, .green_company").removeClass("on");
			$(".gray_company").slideDown(200);
			$(".green_company").slideUp(200);
			$(".nodata_com").slideUp(200);
			$(".gray_company ul li").css("display","block");
			$(".gray_company ul li:first-child").css("display","block");

		});
		$(".gray_company .close_btn").click(function(){
			$(".gray_mark, .gray_company").removeClass("on");
			$(".gray_company").slideUp(200);
		});

		$(".no_mark").click(function(){
			$(".mapbridge").removeClass("on");
			$(".nodata_com").slideDown(200);
			$(".green_company").slideUp(200);
			$(".gray_company").slideUp(200);
		});
		$(".nodata_com .close_btn").click(function(){
			$(".nodata_com").slideUp(200);
		});

		$(".green_nlobby").click(function(){
			$(".green_nlobby, .green_company").addClass("on");
			$(".gray_nlobby, .gray_company").removeClass("on");
			$(".gray_mark, .gray_company").removeClass("on");
			$(".gray_nlobby, .gray_company").removeClass("on");
			$(".green_company ul li").css("display","none");
			$(".green_company ul li:first-child").css("display","block");
			$(".green_company").slideDown(200);
			$(".nodata_com").slideUp(200);
			$(".gray_company").slideUp(200);
		})
		$(".green_company .close_btn").click(function(){
			$(".green_nlobby, .green_company").removeClass("on");
			$(".green_company").slideUp(200);
		});

		$(".gray_nlobby").click(function(){
			$(".gray_nlobby, .gray_company").addClass("on");
			$(".gray_mark, .gray_company").removeClass("on");
			$(".green_mark, .green_company").removeClass("on");
			$(".green_nlobby, .green_company").removeClass("on");
			$(".gray_company ul li").css("display","none");
			$(".gray_company ul li:first-child").css("display","block");
			$(".gray_company").slideDown(200);
			$(".nodata_com").slideUp(200);
			$(".green_company").slideUp(200);
		})
		$(".gray_company .close_btn").click(function(){
			$(".gray_nlobby, .gray_company").removeClass("on");
			$(".gray_company").slideUp(200);
		});

		$(".place_form").on('click',function(){
			$(".flow_search").css("display","block");
			$(".result_top").css("display","none");
			$(".flow_search .place_form").focus();
		});


		$(".company").on('click',function(){
			$(".flow_search").css("display","block");
			$(".result_top").css("display","none");
			$(".flow_search .place_form").focus();
		});


		$(".visit_seaech").on('click',function(){
			$(".flow_search").css("display","block");
			$(".result_top").css("display","none");
			$(".flow_search .place_form").focus();
		});



		// 검색 결과 스크립트 
		$(".search_input .close_btn").click(function(){
			$(".search_input").slideUp(200);
			$("#flow_result").css("display","none");
			$(".result_tooltip").css("display","none");
			$(".mapbridge").css('display','block');
			$(".result_tooltip").css("display","none");
		});

		$(".search_ico").on("click",function(){
			$("#flow_search").css("display","none");
			$("#flow_result").css("display","block");
			$(".result_top").css("display","block");
			$(".company_pop").css("display","none")
			$(".mapbridge").css('display','none');
			$(".result_tooltip").css("display","block");
			$(".search_input").slideDown(200);
			$('.modal_bg').css("display","none"); 
			$('.left_area').css({
				left: '-' + 260 + 'px'
			});
		});
		$("#back_btn").click(function(){
			$("#flow_search").css("display","none");
			$(".mapbridge").css('display','block');
			$(".result_tooltip").css("display","none");
		});

		$("#flow_result .back_btn").click(function(){
			$("#flow_result").css("display","none");
			$(".mapbridge").css('display','block');
			$(".result_tooltip").css("display","none");
			$(".search_input").slideUp(200);
		});

		$(".result_keyword, .clear_btn").on("click",function(){
			$("#flow_search").css("display","block");
			$(".flow_search .place_form").focus();
			$("#flow_result").css("display","none");
			$(".mapbridge").css('display','block');
			$(".result_top").css("display","none");
			$(".search_input").slideUp(200);
		});


		$(function() {	//화면 다 뜨면 시작
			var searchSource = ["엔로비", "GS칼텍스", "GS건설", "나이키", "풍산그룹","HSBC빌딩","(주)에이치시티","머크","(주)제이티","울산항만공사","여수항만공사","한국전자기술연구원" ]; // 배열 형태로 
			$("#searchbox").autocomplete({  //오토 컴플릿트 시작
				source : searchSource,	// source 는 자동 완성 대상
				select : function(event, ui) {	//아이템 선택시
					console.log(ui.item);
				},
				focus : function(event, ui) {	//포커스 가면
					return false;//한글 에러 잡기용도로 사용됨
				},
				minLength: 1,// 최소 글자수
				autoFocus: true, //첫번째 항목 자동 포커스 기본값 false
				classes: {	//잘 모르겠음
					"ui-autocomplete": "highlight"
				},
				delay: 500,	//검색창에 글자 써지고 나서 autocomplete 창 뜰 때 까지 딜레이 시간(ms)
			// disabled: true, //자동완성 기능 끄기
				position: { my : "right top", at: "right bottom" },	//잘 모르겠음
				close : function(event){	//자동완성창 닫아질때 호출
					console.log(event);
				}
			}).autocomplete( "instance" )._renderItem = function( ul, item ) {
			//요 부분이 UI를 마음대로 변경하는 부분
				return $( "<li class='search_list'>" )    //기본 tag가 li로 되어 있음 
				.append( "<div>" + item.label + "</div>" )
				//여기에다가 원하는 모양의 HTML을 만들면 UI가 원하는 모양으로 변함.
				.appendTo( ul );
			};
		});

		$('.company_list ul li .map_ico').on('click',function(){
			$('.company_map').slideToggle().toggleClass('on');
		});

		$(".cs_list ul > li, .view_list ul > li").click(function() {
			if($(this).find('.reply').css('display') == 'none'){
				$(this).find('.reply').slideDown(100);
				$(this).addClass("on");
			}else{
				$(this).find('.reply').slideUp(100);
				$(this).removeClass("on");
			}
		}); 


		$('.note').keyup(function (e){
			var content = $(this).val();
			$('#counter').html("<b>"+content.length+"</b> / 1000");    //글자수 실시간 카운팅
			if (content.length > 1000){
				alert("최대 1000자까지 입력 가능합니다.");
				$(this).val(content.substring(0, 1000));
				$('#counter').html("<b>"+1000+"</b> / 1000");
			} else if (content.length == 0){ // 글자수가 0일 경우
				$('#counter').html(""+0+" / 1000");
			}
		});

		// 업로드 이미지 정렬
		$('.upload_img').owlCarousel({
			loop:false,
			autoplay:false,
			margin:10,
			nav:false,
			dots:false,
			responsiveClass:true,
			responsive:{
				0:{
					items:4
				}
			}
		});

		// 알림 활성화 / 비활성화 버튼
		var check = $(".toggle_check input[type='checkbox']");
			check.click(function(){
		});

		$(function() {
		  var selectTarget = $('.custom_select select');

		  // focus 가 되었을 때와 focus 를 잃었을 때
		  selectTarget.on({
			'focus': function() {
			  $(this).parent().addClass('focus');
			},
			'blur': function() {
			  $(this).parent().removeClass('focus');
			}
		});

			selectTarget.change(function() {
				var select_name = $(this).children('option:selected').text();
				$(this).siblings('label').text(select_name);
				$(this).parent().removeClass('focus');
			});
		});

		var shareButton = document.querySelector('.share_ico');
		
		shareButton.addEventListener("click", async () => {
			try {
			  await navigator.share({
				title: "엔로비 앱 방문신청 테스트",
				text: "엔로비 앱 방문신청 테스트입니다.",
				url: "https://demo.nlobby.com"
			  });
			  console.log("공유 성공");
			} catch (e) {
			  console.log("공유 실패");
			}
		  });
	});

