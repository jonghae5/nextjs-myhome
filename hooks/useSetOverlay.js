import React from 'react';

const useSetOverlay = (kakaoMap, setMarkers, markers) => {
  if (kakaoMap === null) {
    return;
  }
  var customOverlayList = [];
  for (var i = 0; i < setMarkers.length; i++) {
    var content =
      '<div class="customOverlayWrap">' +
      '        <div class="apartment">' +
      `            ${markers[i].아파트}` +
      '        </div>' +
      '        <div class="price">' +
      `            ${markers[i].거래금액}` +
      '        </div>' +
      '        <div class="square">' +
      `            ${markers[i].전용면적}` +
      '        </div>' +
      '          <div class="year">' +
      `            ${markers[i].건축년도}년` +
      '        </div>' +
      '        <div class="address">' +
      `            ${markers[i].주소}` +
      '        </div>' +
      '</div>';

    let position = new kakao.maps.LatLng(markers[i].y, markers[i].x);

    let customOverlay = new kakao.maps.CustomOverlay({
      position: position,
      content: content,
      xAnchor: 0.5,
      yAnchor: 1,
      zIndex: 3,
    });
    customOverlayList.push(customOverlay);
  }

  function closeOverlay() {
    for (var idx = 0; idx < customOverlayList.length; idx++) {
      customOverlayList[idx].setMap();
    }
  }

  for (var j = 0; j < customOverlayList.length; j++) {
    kakao.maps.event.addListener(setMarkers[j], 'click', function () {
      closeOverlay();
      customOverlayList[j].setMap(kakaoMap);
    });
  }
  kakao.maps.event.addListener(kakaoMap, 'click', function () {
    setTimeout(closeOverlay());
  });

  // kakao.maps.event.addListener(kakaoMap, 'dragend', function () {
  //   setTimeout(closeOverlay());
  // });

  return;
};

export default useSetOverlay;
