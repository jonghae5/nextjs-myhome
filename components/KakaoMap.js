import React, { useState, useEffect, useCallback, useRef } from 'react';
import { markerdata } from './MarkerData';
import { useTheme, useMediaQuery } from '@mui/material';
import { Button, Typography, Grid, styled } from '@mui/material';
import SatelliteAltIcon from '@mui/icons-material/SatelliteAlt';
import ListIcon from '@mui/icons-material/List';

const clickedCss = {
  color: 'white',
  backgroundColor: 'purple',
};

const unclickedCss = {
  color: 'black',
  // backgroundColor: 'blue',
};

const KakaoMap = ({ children }) => {
  const [satellite, setSatellite] = useState(false);
  const [sideList, setSideList] = useState(false);

  const [kakaoMap, setKakaoMap] = useState(null);

  const toggleSatelliteBtn = useCallback(() => {
    if (sideList && !satellite) {
      setSideList(state => !state);
    }
    setSatellite(state => !state);
  });

  const toggleSideListBtn = useCallback(() => {
    if (!sideList && satellite) {
      setSatellite(state => !state);
    }
    setSideList(state => !state);
  });

  const buttonEl = useRef(null);
  const buttonElTwo = useRef(null);
  const container = useRef();

  useEffect(() => {
    const $script = document.createElement('script');
    $script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_KEY}&autoload=false&libraries=services,clusterer,drawing`;
    document.head.appendChild($script);
    $script.onload = () => {
      kakao.maps.load(() => {
        // 모바일 사용하기위해 화질 Down
        kakao.maps.disableHD();
        // const container = document.getElementById('map');
        const options = {
          center: new kakao.maps.LatLng(37.624915253753194, 127.15122688059974),
          level: 10,
        };
        const map = new kakao.maps.Map(container.current, options);
        setKakaoMap(map);
      });
    };
  }, [container]);

  useEffect(() => {
    if (kakaoMap === null) {
      return;
    }
    // ***  클러스터링 및 마커 표시 ***
    var clusterer = new kakao.maps.MarkerClusterer({
      map: kakaoMap, // 지도 객체
      averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치
      minLevel: 10, // 클러스터 할 최소 지도 레벨
      disableClickZoom: true, // 클러스터 마커를 클릭했을 때 지도가 확대되지 않도록 설정
    });
    const markers = markerdata.map(function (data, idx) {
      return new kakao.maps.Marker({
        position: new kakao.maps.LatLng(data.lat, data.lng),
        clickable: true, // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정
      });
    });
    clusterer.addMarkers(markers);
    kakao.maps.event.addListener(clusterer, 'clusterclick', function (cluster) {
      // 현재 지도 레벨에서 3레벨 확대한 레벨
      var level = kakaoMap.getLevel() - 3;

      // 지도를 클릭된 클러스터의 마커의 위치를 기준으로 확대합
      kakaoMap.setLevel(level, { anchor: cluster.getCenter() });
    });

    // *** 인포윈도우 ***

    const infowindows = markerdata.map(function (data, idx) {
      return new kakao.maps.InfoWindow({
        content: `<div style="padding:5px;">${data.title}</div>`, // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
        removable: true, // removeable 속성을 true 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩
      });
    });

    function closeInfoWindow() {
      for (var idx = 0; idx < infowindows.length; idx++) {
        infowindows[idx].close();
      }
    }

    markers.map((marker, idx) => {
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
  }, [kakaoMap]);

  useEffect(() => {
    if (kakaoMap === null) {
      return;
    }
    // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성
    const zoomControl = new kakao.maps.ZoomControl();
    kakaoMap.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

    // ****클릭****
    const clickHandler = function (event) {
      console.log('click: ' + event.latLng.toString());
    };
    kakao.maps.event.addListener(kakaoMap, 'click', clickHandler);
  }, [kakaoMap]);

  useEffect(() => {
    if (kakaoMap === null) {
      return;
    }
    // 지도에 추가된 지도타입정보를 가지고 있을 변수입니다
    var currentTypeId;
    function setOverlayMapTypeId(maptype) {
      var changeMaptype;

      if (maptype === 'hybrid') {
        if (!satellite) {
          changeMaptype = kakao.maps.MapTypeId.HYBRID;
        } else {
          changeMaptype = kakao.maps.MapTypeId.ROADMAP;
        }
      } else if (maptype === 'terrain') {
        // 지형정보 지도타입
        changeMaptype = kakao.maps.MapTypeId.ROADMAP;
      } else if (maptype === 'useDistrict') {
        console.log(sideList);
        if (!sideList) {
          changeMaptype = kakao.maps.MapTypeId.USE_DISTRICT;
        } else {
          changeMaptype = kakao.maps.MapTypeId.ROADMAP;
        }
      }
      // 이미 등록된 지도 타입이 있으면 제거합니다
      if (currentTypeId) {
        kakaoMap.removeOverlayMapTypeId(currentTypeId);
      }
      kakaoMap.addOverlayMapTypeId(changeMaptype);

      // 지도에 추가된 타입정보를 갱신합니다
      currentTypeId = changeMaptype;
    }

    const buttonRef = buttonEl.current;
    const buttonTwoRef = buttonElTwo.current;
    buttonRef.addEventListener(
      'click',
      () => {
        setOverlayMapTypeId('hybrid');
      },
      false
    );
    buttonTwoRef.addEventListener(
      'click',
      () => {
        setOverlayMapTypeId('useDistrict');
      },
      false
    );
    return () => {
      buttonRef.removeEventListener(
        'click',
        () => {
          setOverlayMapTypeId('hybrid');
        },
        false
      );
      buttonTwoRef.removeEventListener(
        'click',
        () => {
          setOverlayMapTypeId('useDistrict');
        },
        false
      );
    };
  }, [kakaoMap, satellite, sideList]);

  // Media Query
  const matches = useMediaQuery('(min-width:600px)');

  return (
    <>
      <div
        id='map'
        //   height=
        style={{
          width: '99%',
          height: matches ? '500px' : '100vh',
          borderStyle: 'solid',
          borderWidth: 'medium',
          borderColor: '#D8D8D8',
        }}
        ref={container}
      >
        <Grid
          container
          direction={'column'}
          justifyContent='flex-start'
          sx={{ mt: 3 }}
        >
          <Grid item>
            <Button
              sx={{ zIndex: 2 }}
              onClick={toggleSatelliteBtn}
              ref={buttonEl}
            >
              <SatelliteAltIcon
                style={satellite ? clickedCss : unclickedCss}
                sx={{
                  borderStyle: 'solid',
                  borderWidth: 'thin',
                  borderColor: '#D8D8D8',
                  color: 'black',
                }}
              ></SatelliteAltIcon>
            </Button>
          </Grid>
          <Grid item>
            <Button
              sx={{
                zIndex: 2,
              }}
              onClick={toggleSideListBtn}
              ref={buttonElTwo}
            >
              <ListIcon
                style={sideList ? clickedCss : unclickedCss}
                sx={{
                  borderStyle: 'solid',
                  borderWidth: 'thin',
                  borderColor: '#D8D8D8',
                  color: 'black',
                }}
              ></ListIcon>
            </Button>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default KakaoMap;
