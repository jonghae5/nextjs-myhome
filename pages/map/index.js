import React, { useEffect } from 'react';
import KakaoMap from '../../components/KakaoMap';
import AppLayout from '../../components/layout/AppLayout';
import dynamic from 'next/dynamic';
import { useDispatch } from 'react-redux';
import { asyncLoadMyInfo } from '../../slices/userSlice';

// const DynamicKakaoMapWithNoSSR = dynamic(
//   () => import('../../../components/KakaoMap'),
//   {
//     ssr: false,
//   }
// );
const Map = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(asyncLoadMyInfo());
  });
  return (
    <AppLayout>
      <KakaoMap></KakaoMap>
    </AppLayout>
  );
};

export default Map;
