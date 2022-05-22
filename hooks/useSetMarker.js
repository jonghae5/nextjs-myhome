import React from 'react';
import { useSelector } from 'react-redux';
// import { markerdata } from '../components/MarkerData';
const useSetMarker = (kakaoMap, markers, clusterer) => {
  const setMarkers = markers.map(function (data, idx) {
    return new kakao.maps.Marker({
      position: new kakao.maps.LatLng(data.y, data.x),
      clickable: true, // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정
    });
  });

  //   for (var i = 0; i < setMarkers.length; i++) {
  //     setMarkers[i].setMap(kakaoMap);
  //   }

  return setMarkers;
};

export default useSetMarker;
