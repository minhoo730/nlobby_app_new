	$(document).ready(function(){
		var HOME_PATH = window.HOME_PATH || '.';
		var locationBtnHtml = '<p class="location_ico"><a href="#">현재위치 아이콘</a></p>';
		var linkBtnHtml = '<p class="adm_ico"><a href="https://demo.nlobby.com/dash">방문관리 아이콘</a></p>';
		var redMarker = '<div class="mapbridge no_mark"><div class="map_group _map_group"><div class="map_marker _marker noa"><span class="ico _icon"></span><span class="mark_txt">현재장소 정보 보기</span><span class="shd">마커</span></div></div></div>';

		var map = new naver.maps.Map('map', {
			center: new naver.maps.LatLng(35.176266914354606, 129.1258162545757), //지도의 초기 중심 좌표
			zoom: 16, //지도의 초기 줌 레벨
			useStyleMap: true,
			disableKineticPan:false,
			mapDataControl:false,
			clickable:true,
			mapTypeId: naver.maps.MapTypeId.NORMAL
		});
		var markers = [],
			data = accidentDeath.searchResult.accidentDeath;

		for (var i = 0, ii = 30; i < ii; i++) {
			var spot = data[i],
				latlng = new naver.maps.LatLng(spot.grd_la, spot.grd_lo),
				marker = new naver.maps.Marker({
					position: latlng,
					draggable: true
				});

			markers.push(marker);
		}

		var htmlMarker1 = {
            content: '<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:10px;color:white;text-align:center;font-weight:bold;background:url(../images/cluster-marker-1.png);background-size:contain;"></div>',
            size: N.Size(40, 40),
            anchor: N.Point(20, 20)
        },
        htmlMarker2 = {
            content: '<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:10px;color:white;text-align:center;font-weight:bold;background:url(../images/cluster-marker-2.png);background-size:contain;"></div>',
            size: N.Size(40, 40),
            anchor: N.Point(20, 20)
        },
        htmlMarker3 = {
            content: '<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:10px;color:white;text-align:center;font-weight:bold;background:url(../images/cluster-marker-3.png);background-size:contain;"></div>',
            size: N.Size(40, 40),
            anchor: N.Point(20, 20)
        },
        htmlMarker4 = {
            content: '<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:10px;color:white;text-align:center;font-weight:bold;background:url(../images/cluster-marker-4.png);background-size:contain;"></div>',
            size: N.Size(40, 40),
            anchor: N.Point(20, 20)
        },
        htmlMarker5 = {
            content: '<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:10px;color:white;text-align:center;font-weight:bold;background:url(../images/cluster-marker-5.png);background-size:contain;"></div>',
            size: N.Size(40, 40),
            anchor: N.Point(20, 20)
        };

		var markerClustering = new MarkerClustering({
			minClusterSize: 2,
			maxZoom: 13,
			map: map,
			markers: markers,
			disableClickZoom: false,
			gridSize: 120,
			icons: [htmlMarker1, htmlMarker2, htmlMarker3, htmlMarker4, htmlMarker5],
			indexGenerator: [10, 100, 200, 500, 1000],
			stylingFunction: function(clusterMarker, count) {
				$(clusterMarker.getElement()).find('div:first-child').text(count);
			}
		});

		// var infowindow = new naver.maps.InfoWindow();
		function onSuccessGeolocation(position) {
			var location = new naver.maps.LatLng(position.coords.latitude, position.coords.longitude);
			map.setCenter(location); // 얻은 좌표를 지도의 중심으로 설정합니다.
			map.setZoom(16); // 지도의 줌 레벨을 변경합니다.
			var myLocation = new naver.maps.Marker({
				position:location,
				map: map,
				icon: {
					content: [
								'<div class="mypoint">',
									'<p class="point_area">',
									'현재위치',
									'</p>',
								'</div>'
							].join(''),
					size: new naver.maps.Size(45, 50),
					anchor: new naver.maps.Point(25, 45),
				},
				draggable: false
			});


			//customControl 객체 이용하기

			// 현재 위치 아이콘
			var customControl = new naver.maps.CustomControl(locationBtnHtml, {
				position: naver.maps.Position.BOTTOM_RIGHT
			});
			customControl.setMap(map);
			var domEventListener = naver.maps.Event.addDOMListener(customControl.getElement(), 'click', function() {
				map.setCenter(new naver.maps.LatLng(position.coords.latitude, position.coords.longitude));
			});

			// 방문관리 페이지 접속 아이콘
			var customControl2 = new naver.maps.CustomControl(linkBtnHtml, {
				position: naver.maps.Position.BOTTOM_RIGHT
			});
			customControl2.setMap(map);
			var domEventListener2 = naver.maps.Event.addDOMListener(customControl2.getElement(), 'click', function() {
				map.setCenter(new naver.maps.LatLng(position.coords.latitude, position.coords.longitude));
			});

			// 엔로비 제외 고객사
			var customControl3 = new naver.maps.CustomControl(redMarker, {
				position: naver.maps.Position.RIGHT_CENTER
			});
			customControl3.setMap(map);
			var domEventListener3 = naver.maps.Event.addDOMListener(customControl3.getElement(), 'click', function() {
				$(".mapbridge").removeClass("on");
				$(".nodata_com").slideDown(200);
				$(".green_company").slideUp(200);
				$(".gray_company").slideUp(200);
				$(".nodata_com .close_btn").click(function(){
					$(".nodata_com").slideUp(200);
				});
			});
			/*
			var redMarker = new naver.maps.CustomControl({
				position: new naver.maps.LatLng(position.coords.latitude, position.coords.longitude),
				map: map,
				icon: {
					content: [
								'<div class="mapbridge no_mark">',
									'<div class="map_group _map_group">',
										'<div class="map_marker _marker noa"> ',
											'<span class="ico _icon"></span>',
											'<span class="shd">마커</span>',
										'</div>',
									'</div>',
								'</div>'
							].join(''),
					size: new naver.maps.Size(40, 45),
					anchor: new naver.maps.Point(19, 40),
				},
				draggable: false
			});
			// 위치 지정 마커 클릭시 이동
			naver.maps.Event.addListener(map, 'click', function(e) {
				redMarker.setPosition(e.coord);
			});
			*/
		}


		function onErrorGeolocation() {
			var center = map.getCenter();

			/*
			infowindow.setContent('<div style="padding:20px;">' +
				'<h5 style="margin-bottom:5px;color:#f00;">Geolocation failed!</h5>'+ "latitude: "+ center.lat() +"<br />longitude: "+ center.lng() +'</div>');

			//infowindow.open(map, center);
			*/
		}
		

		// 처음 실행 시 현재 위치로 이동
		$(window).on("load", function() {
			if (navigator.geolocation) {
				/**
				 * navigator.geolocation 은 Chrome 50 버젼 이후로 HTTP 환경에서 사용이 Deprecate 되어 HTTPS 환경에서만 사용 가능 합니다.
				 * http://localhost 에서는 사용이 가능하며, 테스트 목적으로, Chrome 의 바로가기를 만들어서 아래와 같이 설정하면 접속은 가능합니다.
				 * chrome.exe --unsafely-treat-insecure-origin-as-secure="http://example.com"
				 */
				navigator.geolocation.getCurrentPosition(onSuccessGeolocation, onErrorGeolocation);
			} else {
				var center = map.getCenter();
				/*
				infowindow.setContent('<div style="padding:20px;"><h5 style="margin-bottom:5px;color:#f00;">Geolocation not supported</h5></div>');
				infowindow.open(map, center);
				*/
			}
		});

		/*
		var redMarker = new naver.maps.Marker({
			position: new naver.maps.LatLng(35.176266914354606, 129.1258162545757),
			map: map,
			icon: {
				content: [
							'<div class="mapbridge no_mark">',
								'<div class="map_group _map_group">',
									'<div class="map_marker _marker noa"> ',
										'<span class="ico _icon"></span>',
										'<span class="shd">마커</span>',
									'</div>',
								'</div>',
							'</div>'
						].join(''),
				size: new naver.maps.Size(40, 45),
				anchor: new naver.maps.Point(19, 40),
			},
			draggable: false
		});
		// 위치 지정 마커 클릭시 이동
		naver.maps.Event.addListener(map, 'click', function(e) {
			redMarker.setPosition(e.coord);
		});
		*/
		var greenMarker = new naver.maps.Marker({
			position: new naver.maps.LatLng(35.174878887415396, 129.12445041545166),
			map: map,
			icon: {
				content: [
							'<div class="mapbridge green_mark">',
								'<div class="map_group _map_group">',
									'<div class="map_marker _marker gen_point"> ',
										'<span class="ico _icon"></span>',
										'<span class="shd">+3</span>',
									'</div>',
								'</div>',
							'</div>'
						].join(''),
				size: new naver.maps.Size(40, 45),
				anchor: new naver.maps.Point(19, 40),
			},
			draggable: false
		});

		var grayMarker = new naver.maps.Marker({
			position: new naver.maps.LatLng(35.174573619601816, 129.12826814012158),
			map: map,
			icon: {
				content: [
							'<div class="mapbridge gray_mark">',
								'<div class="map_group _map_group">',
									'<div class="map_marker _marker"> ',
										'<span class="ico _icon"></span>',
										'<span class="shd">+3</span>',
									'</div>',
								'</div>',
							'</div>'
						].join(''),
				size: new naver.maps.Size(40, 45),
				anchor: new naver.maps.Point(19, 40),
			},
			draggable: false
		});

		var greenNlobby = new naver.maps.Marker({
			position: new naver.maps.LatLng(35.17292381160535, 129.12771024920434),
			map: map,
			icon: {
				content: [
							'<div class="mapbridge green_nlobby">',
								'<div class="map_group _map_group">',
									'<div class="map_marker _marker"> ',
										'<span class="ico _icon"></span>',
										'<span class="shd">마커</span>',
									'</div>',
								'</div>',
							'</div>'
						].join(''),
				size: new naver.maps.Size(40, 45),
				anchor: new naver.maps.Point(19, 40),
			},
			draggable: false
		});

		var grayNlobby = new naver.maps.Marker({
			position: new naver.maps.LatLng(35.177650669265795, 129.12439503884184),
			map: map,
			icon: {
				content: [
							'<div class="mapbridge gray_nlobby">',
								'<div class="map_group _map_group">',
									'<div class="map_marker _marker"> ',
										'<span class="ico _icon"></span>',
										'<span class="shd">+3</span>',
									'</div>',
								'</div>',
							'</div>'
						].join(''),
				size: new naver.maps.Size(40, 45),
				anchor: new naver.maps.Point(19, 40),
			},
			draggable: false
		});

		// 검색결과 말풍선
		var resultTooltip = new naver.maps.Marker({
			position: new naver.maps.LatLng(35.17639582442249, 129.12574217866194),
			map: map,
			icon: {
				content: [
							'<div class="mapbridge result_tooltip">',
								'<div class="map_group _map_group">',
									'<div class="map_marker _marker"> ',
										'<span class="ico _icon"></span>',
										'<span class="mark_txt">엔로비 본사</span>',
									'</div>',
								'</div>',
							'</div>'
						].join(''),
				size: new naver.maps.Size(40, 45),
				anchor: new naver.maps.Point(19, 40),
			},
			draggable: false
		});
	});