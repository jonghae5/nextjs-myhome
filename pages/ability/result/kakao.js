import React from 'react';
import KakaoMap from '../../../components/KakaoMap';
import AppLayout from '../../../components/layout/AppLayout';
import dynamic from 'next/dynamic';

// const DynamicKakaoMapWithNoSSR = dynamic(
//   () => import('../../../components/KakaoMap'),
//   {
//     ssr: false,
//   }
// );
const KakaoResult = () => {
  return (
    <AppLayout>
      <KakaoMap></KakaoMap>
    </AppLayout>
  );
};

export default KakaoResult;
