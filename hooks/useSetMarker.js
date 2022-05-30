import React from 'react';
import { useSelector } from 'react-redux';
// import { markerdata } from '../components/MarkerData';
const useSetMarker = (kakaoMap, markers, clusterer) => {
  function createMarkerImage(src, size, options) {
    var markerImage = new kakao.maps.MarkerImage(src, size, options);
    return markerImage;
  }

  const markerImageSrc = `../static/images/homeMarker.png`;
  const imageSize = new kakao.maps.Size(48, 48);
  const imageOptions = {
    spriteOrigin: new kakao.maps.Point(0, 0),
    spriteSize: new kakao.maps.Size(32, 32),
  };

  // 마커이미지와 마커를 생성
  var markerImage = createMarkerImage(markerImageSrc, imageSize, imageOptions);

  const setMarkers = markers.map(function (data, idx) {
    return new kakao.maps.Marker({
      position: new kakao.maps.LatLng(data.y, data.x),
      image: markerImage,
      clickable: true, // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정
    });
  });

  //   for (var i = 0; i < setMarkers.length; i++) {
  //     setMarkers[i].setMap(kakaoMap);
  //   }

  return setMarkers;
};

export default useSetMarker;
