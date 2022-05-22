import React from 'react';

const useSetInfoWin = (kakaoMap, setMarkers, markers) => {
  if (kakaoMap === null) {
    return;
  }
  const infowindows = markers.map(function (data, idx) {
    return new kakao.maps.InfoWindow({
      content: `<div style="padding:5px;">${data.아파트}</div>\
          <div style="padding:5px;">${data.거래금액}</div>`, // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
      removable: true, // removeable 속성을 true 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩
    });
  });

  function closeInfoWindow() {
    for (var idx = 0; idx < infowindows.length; idx++) {
      infowindows[idx].close();
    }
  }

  setMarkers.map((marker, idx) => {
    kakao.maps.event.addListener(marker, 'click', function () {
      // 모든 마커 윈도우 제거
      closeInfoWindow();
      // 마커 위에 인포윈도우를 표시
      infowindows[idx].open(kakaoMap, marker);
    });
    // 맵 클릭시 인포 윈도우 제거
    kakao.maps.event.addListener(kakaoMap, 'click', function () {
      infowindows[idx].close();
    });
  });

  return;
};

export default useSetInfoWin;
