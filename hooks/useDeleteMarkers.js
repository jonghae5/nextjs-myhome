import React from 'react';

const useDeleteMarkers = (kakaoMap, markers) => {
  if (kakaoMap === null) {
    return;
  }
  if (markers) {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
  }
  return;
};

export default useDeleteMarkers;
