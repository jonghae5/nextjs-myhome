import { Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { markerdata } from './MarkerData';
import { useTheme, useMediaQuery } from '@mui/material';

const KakaoMap = () => {
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    const $script = document.createElement('script');
    $script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_KEY}&autoload=false&libraries=services,clusterer,drawing`;
    $script.addEventListener('load', () => setMapLoaded(true));
    document.head.appendChild($script);
  }, []);

  useEffect(() => {
    if (!mapLoaded) return;

    kakao.maps.load(() => {
      // 모바일 사용하기위해 화질 Down
      kakao.maps.disableHD();
      const container = document.getElementById('map');
      const options = {
        center: new kakao.maps.LatLng(37.624915253753194, 127.15122688059974),
        level: 10,
      };
      const map = new kakao.maps.Map(container, options);

      // ***  클러스터링 및 마커 표시 ***
      var clusterer = new kakao.maps.MarkerClusterer({
        map: map, // 지도 객체
        averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치
        minLevel: 10, // 클러스터 할 최소 지도 레벨
        disableClickZoom: true, // 클러스터 마커를 클릭했을 때 지도가 확대되지 않도록 설정
      });

      const markers = markerdata.map(function (data, idx) {
        return new kakao.maps.Marker({
          position: new kakao.maps.LatLng(data.lat, data.lng),
          clickable: true, // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정
        });
      });

      clusterer.addMarkers(markers);
      kakao.maps.event.addListener(
        clusterer,
        'clusterclick',
        function (cluster) {
          // 현재 지도 레벨에서 3레벨 확대한 레벨
          var level = map.getLevel() - 3;

          // 지도를 클릭된 클러스터의 마커의 위치를 기준으로 확대합
          map.setLevel(level, { anchor: cluster.getCenter() });
        }
      );

      // *** 인포윈도우 ***

      const infowindows = markerdata.map(function (data, idx) {
        return new kakao.maps.InfoWindow({
          content: `<div style="padding:5px;">${data.title}</div>`, // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
          removable: true, // removeable 속성을 true 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩
        });
      });

      function closeInfoWindow() {
        for (var idx = 0; idx < infowindows.length; idx++) {
          infowindows[idx].close();
        }
      }

      markers.map((marker, idx) => {
        kakao.maps.event.addListener(marker, 'click', function () {
          // 모든 마커 윈도우 제거
          closeInfoWindow();
          // 마커 위에 인포윈도우를 표시
          infowindows[idx].open(map, marker);
        });
        // 맵 클릭시 인포 윈도우 제거
        kakao.maps.event.addListener(map, 'click', function () {
          infowindows[idx].close();
        });
      });
      // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
      const mapTypeControl = new kakao.maps.MapTypeControl();
      // 지도에 컨트롤을 추가해야 지도위에 표시됩니다
      // kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
      map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

      // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
      const zoomControl = new kakao.maps.ZoomControl();
      map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

      // ****클릭****
      const clickHandler = function (event) {
        console.log('click: ' + event.latLng.toString());
      };

      kakao.maps.event.addListener(map, 'click', clickHandler);
    });
  }, [mapLoaded]);

  // Media Query
  const matches = useMediaQuery('(min-width:600px)');

  return (
    <div
      id='map'
      //   height=
      style={{
        width: '99%',
        height: matches ? '500px' : '100vh',
        borderStyle: 'solid',
        borderWidth: 'medium',
        borderColor: '#D8D8D8',
      }}
    ></div>
  );
};

export default KakaoMap;
