import React from 'react';

const useGetLocation = (kakaoMap, id) => {
  if (kakaoMap === null) {
    return;
  }
  const bounds = kakaoMap.getBounds();
  console.log(bounds);
  const result = {
    id,
    lowX: bounds['ha'],
    lowY: bounds['qa'],
    highX: bounds['oa'],
    highY: bounds['pa'],
  };
  console.log(result['lowX'], result['lowY'], result['highX'], result['highY']);
  return result;
};

export default useGetLocation;
