// nlobbyApp javascript
	$(document).ready(function(){
		$(".cs_list ul > li, .view_list ul > li").on("click", function(e){
			$(this).toggleClass('on');
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
		$('.upload_img').owlCarousel({
			loop:false,
			autoplay:false,
			margin:20,
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
	});

$(document).ready(function(){
	$("#back_btn").click(function(){
		$("#flow_search").css("display","none");
	});

	// 삭제 버튼 클릭시 텍스트 제거 스크립트
	$('.form_label input[name="keyword"]').on('input propertychange', function() {
		var $this = $(this);
		var visible = Boolean($this.val());
		$this.siblings('.txt_clear').toggleClass('hidden', !visible);
	}).trigger('propertychange');
	$('.txt_clear').click(function() {
		$(this).siblings('input[name="keyword"]').val('')
			.trigger('propertychange').focus();
	});

	// 좌상단 버튼 클릭시 좌측 메뉴 노출
	$('#wrap .left_btn').on('click', function(){
		$('.modal_bg').fadeIn(200); 
		$('.left_area').show().animate({
			left:0
		});  
	});
	$('.modal_bg, .close_btn').on('click', function(){
		$('.modal_bg').fadeOut(200); 
		$('.left_area').animate({
			left: '-' + 260 + 'px'
		},function(){
			$('.left_area').hide(); 
		}); 
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

	$(".top_bg .place_form").on('focus',function(){
		$(".flow_search").css("display","block");
		$(".flow_search .place_form").focus();
	})
});

