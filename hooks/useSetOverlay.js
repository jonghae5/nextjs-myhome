import React from 'react';
import { useDispatch } from 'react-redux';
function priceToString(price) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
const useSetOverlay = (kakaoMap, setMarkers, markers, setToggleInfo) => {
  if (kakaoMap === null) {
    return;
  }
  var customOverlayList = [];
  for (var i = 0; i < setMarkers.length; i++) {
    let price = (markers[i].거래금액 / 10000).toFixed(1);
    var content =
      '<div class="customOverlayWrap">' +
      '        <div class="apartment">' +
      `            ${markers[i].아파트}` +
      '        </div>' +
      '        <div class="price">' +
      `${price}억` +
      // `            ${priceToString(markers[i].거래금액)}` +
      '        </div>' +
      '        <div class="square">' +
      `            ${markers[i].전용면적.toFixed(2)}㎡` +
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

  // function closeOverlay() {
  //   for (var idx = 0; idx < customOverlayList.length; idx++) {
  //     customOverlayList[idx].setMap();
  //   }
  // }

  // for (var j = 0; j < customOverlayList.length; j++) {
  //   kakao.maps.event.addListener(setMarkers[j], 'click', function () {
  //     closeOverlay();
  //     customOverlayList[j].setMap(kakaoMap);
  //     setToggleInfo(true);
  //   });
  // }
  // kakao.maps.event.addListener(kakaoMap, 'click', function () {
  //   setTimeout(closeOverlay());
  // });

  // kakao.maps.event.addListener(kakaoMap, 'dragend', function () {
  //   setTimeout(closeOverlay());
  // });

  // return ;
  return customOverlayList;
};

export default useSetOverlay;
