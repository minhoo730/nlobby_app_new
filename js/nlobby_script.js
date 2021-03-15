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
	$("#wrap .left_modal").hide();
	$("#wrap .left_btn").click(function(){
		$('#wrap .left_modal').animate({width:'toggle'});
    })
})


// 삭제 버튼 클릭시 텍스트 제거 스크립트
$(document).ready(function(){
	$('.form_label input[name="keyword"]').on('input propertychange', function() {
		var $this = $(this);
		var visible = Boolean($this.val());
		$this.siblings('.txt_clear').toggleClass('hidden', !visible);
	}).trigger('propertychange');
	$('.txt_clear').click(function() {
		$(this).siblings('input[name="keyword"]').val('')
			.trigger('propertychange').focus();
	});
});

