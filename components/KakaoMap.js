import React, { useState, useEffect } from 'react';
import { markerdata } from './MarkerData';

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
      const container = document.getElementById('map');
      const options = {
        center: new kakao.maps.LatLng(37.624915253753194, 127.15122688059974),
        level: 10,
      };
      const map = new kakao.maps.Map(container, options);

      // ***  클러스터링 및 마커 표시 ***
      var clusterer = new kakao.maps.MarkerClusterer({
        map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체
        averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
        minLevel: 10, // 클러스터 할 최소 지도 레벨
        disableClickZoom: true, // 클러스터 마커를 클릭했을 때 지도가 확대되지 않도록 설정한다
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
      function closeInfoWindow() {
        for (var idx = 0; idx < infowindows.length; idx++) {
          infowindows[idx].close();
        }
      }

      const infowindows = markerdata.map(function (data, idx) {
        return new kakao.maps.InfoWindow({
          content: `<div style="padding:5px;">${data.title}</div>`, // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
          removable: true, // removeable 속성을 true 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩
        });
      });

      markers.map((marker, idx) => {
        kakao.maps.event.addListener(marker, 'click', function () {
          closeInfoWindow();
          // 마커 위에 인포윈도우를 표시합니다
          infowindows[idx].open(map, marker);
        });
        kakao.maps.event.addListener(map, 'click', function () {
          infowindows[idx].close();
        });
      });

      // ****클릭****
      const clickHandler = function (event) {
        console.log('click: ' + event.latLng.toString());
      };

      kakao.maps.event.addListener(map, 'click', clickHandler);
    });
  }, [mapLoaded]);

  return (
    <div
      id='map'
      style={{
        width: '500px',
        height: '400px',
      }}
    ></div>
  );
};

export default KakaoMap;
