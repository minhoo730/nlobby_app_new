$(document).ready(function () {
  const HOME_PATH = window.HOME_PATH || ".";
  const locationBtnHtml =
    '<p class="location_ico"><a href="#">현재위치 아이콘</a></p>';
  const linkBtnHtml =
    '<p class="adm_ico"><a href="https://demo.nlobby.com/dash">방문관리 아이콘</a></p>';
  const redMarker =
    '<div class="mapbridge no_mark"><div class="map_group _map_group"><div class="map_marker _marker noa"><span class="ico _icon"></span><span class="mark_txt">현재장소 정보 보기</span><span class="shd">마커</span></div></div></div>';

  const map = new naver.maps.Map("map", {
    center: new naver.maps.LatLng(35.176266914354606, 129.1258162545757), //지도의 초기 중심 좌표
    zoom: 16, //지도의 초기 줌 레벨
    useStyleMap: true,
    disableKineticPan: false,
    mapDataControl: false,
    clickable: true,
    mapTypes: new naver.maps.MapTypeRegistry({
      normal: naver.maps.NaverStyleMapTypeOptions.getNormalMap({
        overlayType: "bg.ol.ts.lko",
      }),
    }),
  });

  const nodataAddress = document.getElementById("nodata_com");

  function searchCoordinateToAddress(latlng) {
    //infoWindow.close();
    naver.maps.Service.reverseGeocode(
      {
        coords: latlng,
        orders: [
          naver.maps.Service.OrderType.ADDR,
          naver.maps.Service.OrderType.ROAD_ADDR,
        ].join(","),
      },
      function (status, response) {
        if (status === naver.maps.Service.Status.ERROR) {
          if (!latlng) {
            return alert("ReverseGeocode Error, Please check latlng");
          }
          if (latlng.toString) {
            return alert("ReverseGeocode Error, latlng:" + latlng.toString());
          }
          if (latlng.x && latlng.y) {
            return alert(
              "ReverseGeocode Error, x:" + latlng.x + ", y:" + latlng.y
            );
          }
          return alert("ReverseGeocode Error, Please check latlng");
        }

        const address = response.v2.address,
          htmlAddresses = [];
        if (address.jibunAddress !== "") {
          htmlAddresses.push("[지번 주소] " + address.jibunAddress);
        }
        htmlAddresses2 = [];
        if (address.roadAddress !== "") {
          htmlAddresses2.push("[도로명 주소] " + address.roadAddress);
        }

        nodataAddress.innerHTML =
          '<button class="close_btn">X</button>' +
          '<div class="list_title" id="list_title">' +
            '<h4 class="place_name">' + '123' +'</h4>' +
            '<p class="place_address">' +
              '<span class="bunji">' +
                htmlAddresses +
              "</span>" +
              '<span class="road">' +
                htmlAddresses2 +
              "</span>" +
            "</p>" +
            '<div class="place_plus">' +
              '<p class="place_add_btn">' +
                '<a href="place_add.html">방문장소 만들기</a>' +
              "</p>" +
            "</div>" +
          "</div>";
      }
    );
  }

  function searchAddressToCoordinate(address) {
    naver.maps.Service.geocode(
      {
        query: address,
      },
      function (status, response) {
        if (status === naver.maps.Service.Status.ERROR) {
          if (!address) {
            return alert("Geocode Error, Please check address");
          }
          return alert("Geocode Error, address:" + address);
        }
        if (response.v2.meta.totalCount === 0) {
          return alert("No result.");
        }
        const htmlAddresses = [],
          item = response.v2.addresses[0],
          point = new naver.maps.Point(item.x, item.y);

        if (item.roadAddress) {
          htmlAddresses.push("[도로명 주소] " + item.roadAddress);
        }
        if (item.jibunAddress) {
          htmlAddresses.push("[지번 주소] " + item.jibunAddress);
        }
        if (item.englishAddress) {
          htmlAddresses.push("[영문명 주소] " + item.englishAddress);
        }
        nodataAddress.innerHTML =
          '<button class="close_btn">X</button>' +
          '<div class="list_title" id="list_title">' +
            '<h4 class="place_name">바뀜 부산본사</h4>' +
              '<p class="place_address">' +
                htmlAddresses +
              "</p>" +
            '<div class="place_plus">' +
              '<p class="place_add_btn">' +
                '<a href="place_add.html">방문장소 만들기</a>' +
              "</p>" +
            "</div>" +
          "</div>";
        map.setCenter(point);
        infoWindow.open(map, point);
      }
    );
  }

  function initGeocoder() {
    if (!map.isStyleMapReady) {
      return;
    }

    map.addListener("click", function (e) {
      searchCoordinateToAddress(e.coord);
    });

    $("#searchbox").on("keydown", function (e) {
      const keyCode = e.which;

      if (keyCode === 13) {
        // Enter Key
        searchAddressToCoordinate($("#searchbox").val());
      }
    });

    $("#submit").on("click", function (e) {
      e.preventDefault();
      searchAddressToCoordinate($("#searchbox").val());
    });
    //searchAddressToCoordinate('정자동 178-1');
  }

  naver.maps.onJSContentLoaded = initGeocoder;
  naver.maps.Event.once(map, "init_stylemap", initGeocoder);

  // const infowindow = new naver.maps.InfoWindow();
  function onSuccessGeolocation(position) {
    const location = new naver.maps.LatLng(
      position.coords.latitude,
      position.coords.longitude
    );
    map.setCenter(location); // 얻은 좌표를 지도의 중심으로 설정합니다.
    map.setZoom(16); // 지도의 줌 레벨을 변경합니다.
    
    const myLocation = new naver.maps.Marker({
      position: location,
      map: map,
      icon: {
        content: [
          '<div class="mypoint">',
            '<p class="point_area">',
              "현재위치",
            "</p>",
          "</div>",
        ].join(""),
        size: new naver.maps.Size(45, 50),
        anchor: new naver.maps.Point(25, 45),
      },
      draggable: false,
    });
  }

  function onErrorGeolocation() {
    const center = map.getCenter();
  }

  // 처음 실행 시 현재 위치로 이동
  $(window).on("load", function () {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        onSuccessGeolocation,
        onErrorGeolocation
      );
    } else {
      const center = map.getCenter();
    }
  });

  //customControl 객체 이용하기
  // 현재 위치 아이콘
  naver.maps.Event.once(map, "init_stylemap", function () {
    const customControl = new naver.maps.CustomControl(locationBtnHtml, {
      position: naver.maps.Position.BOTTOM_RIGHT,
    });
    customControl.setMap(map);

    const domEventListener = naver.maps.Event.addDOMListener(
      customControl.getElement(),
      "click",
      function () {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            onSuccessGeolocation,
            onErrorGeolocation
          );
        } else {
          const center = map.getCenter();
        }
      }
    );

    // 방문관리 페이지 접속 아이콘
    const customControl2 = new naver.maps.CustomControl(linkBtnHtml, {
      position: naver.maps.Position.BOTTOM_RIGHT,
    });
    customControl2.setMap(map);

    // 현재장소 버튼(빨간색)
    const customControl3 = new naver.maps.CustomControl(redMarker, {
      position: naver.maps.Position.RIGHT_CENTER,
    });
    customControl3.setMap(map);
    const domEventListener3 = naver.maps.Event.addDOMListener(
      customControl3.getElement(),
      "click",
      function () {
        $(".mapbridge").removeClass("on");
        $(".nodata_com").slideDown(200);
        $(".green_company").slideUp(200);
        $(".gray_company").slideUp(200);
        $(".nodata_com .close_btn").click(function () {
          $(".nodata_com").slideUp(200);
        });
      }
    );
  });

  // 엔로비 고객사
  const greenMarker = new naver.maps.Marker({
    position: new naver.maps.LatLng(35.174878887415396, 129.12445041545166),
    map: map,
    icon: {
      content: [
        '<div class="mapbridge green_mark">',
          '<div class="map_group _map_group">',
            '<div class="map_marker _marker gen_point"> ',
              '<span class="ico _icon"></span>',
              '<span class="shd">+3</span>',
            "</div>",
          "</div>",
        "</div>",
      ].join(""),
      size: new naver.maps.Size(40, 45),
      anchor: new naver.maps.Point(19, 40),
    },
    draggable: false,
  });

  const grayMarker = new naver.maps.Marker({
    position: new naver.maps.LatLng(35.174573619601816, 129.12826814012158),
    map: map,
    icon: {
      content: [
        '<div class="mapbridge gray_mark">',
          '<div class="map_group _map_group">',
            '<div class="map_marker _marker"> ',
              '<span class="ico _icon"></span>',
              '<span class="shd">+3</span>',
            "</div>",
          "</div>",
        "</div>",
      ].join(""),
      size: new naver.maps.Size(40, 45),
      anchor: new naver.maps.Point(19, 40),
    },
    draggable: false,
  });

  const greenNlobby = new naver.maps.Marker({
    position: new naver.maps.LatLng(35.17292381160535, 129.12771024920434),
    map: map,
    icon: {
      content: [
        '<div class="mapbridge green_nlobby">',
          '<div class="map_group _map_group">',
            '<div class="map_marker _marker"> ',
              '<span class="ico _icon"></span>',
              '<span class="shd">마커</span>',
            "</div>",
          "</div>",
        "</div>",
      ].join(""),
      size: new naver.maps.Size(40, 45),
      anchor: new naver.maps.Point(19, 40),
    },
    draggable: false,
  });

  const grayNlobby = new naver.maps.Marker({
    position: new naver.maps.LatLng(35.177650669265795, 129.12439503884184),
    map: map,
    icon: {
      content: [
        '<div class="mapbridge gray_nlobby">',
          '<div class="map_group _map_group">',
            '<div class="map_marker _marker"> ',
              '<span class="ico _icon"></span>',
              '<span class="shd">+3</span>',
            "</div>",
          "</div>",
        "</div>",
      ].join(""),
      size: new naver.maps.Size(40, 45),
      anchor: new naver.maps.Point(19, 40),
    },
    draggable: false,
  });

  // 검색결과 말풍선
  const resultTooltip = new naver.maps.Marker({
    position: new naver.maps.LatLng(35.17639582442249, 129.12574217866194),
    map: map,
    icon: {
      content: [
        '<div class="mapbridge result_tooltip">',
          '<div class="map_group _map_group">',
            '<div class="map_marker _marker"> ',
              '<span class="ico _icon"></span>',
              '<span class="mark_txt">엔로비 본사</span>',
            "</div>",
          "</div>",
        "</div>",
      ].join(""),
      size: new naver.maps.Size(40, 45),
      anchor: new naver.maps.Point(19, 40),
    },
    draggable: false,
  });
});
