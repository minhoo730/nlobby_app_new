// nlobbyApp javascript
	$(document).ready(function(){
		$(".cs_list ul > li").on("click", function(e){
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
	});
