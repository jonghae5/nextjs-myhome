import React, { useState, useEffect, useCallback, useRef } from 'react';
import { markerdata } from './MarkerData';
import { useTheme, useMediaQuery } from '@mui/material';
import { Button, Typography, Grid, Box } from '@mui/material';
import SatelliteAltIcon from '@mui/icons-material/SatelliteAlt';
import MapIcon from '@mui/icons-material/Map';
import { useDispatch, useSelector } from 'react-redux';

import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import {
  asyncAddAbilityMarker,
  asyncAddMarker,
  setClusterer,
} from '../slices/mapSlice';
import { setBuyHomeAbility, setKakaoMap } from '../slices/mapSlice';

import useSetMarker from '../hooks/useSetMarker';
import useDeleteMarkers from '../hooks/useDeleteMarkers';
import useGetLocation from '../hooks/useGetLocation';
import useSetInfoWin from '../hooks/useSetInfoWin';
const clickedCss = {
  color: 'white',
  backgroundColor: 'black',
};

const unclickedCss = {
  color: 'black',
  // backgroundColor: 'blue',
};

const AbilityButton = styled(Button)(({ theme }) => ({
  zIndex: 2,
  color: theme.palette.getContrastText(grey[500]),
  backgroundColor: grey[500],
  '&:hover': {
    backgroundColor: grey[500],
  },
}));

const KakaoMap = ({ children }) => {
  const dispatch = useDispatch();
  const [satellite, setSatellite] = useState(false);
  const [lineMap, setLineMap] = useState(false);

  const [deleteMarkers, setDeleteMarkers] = useState([]);
  const { kakaoMap, buyHomeAbility, markers, clusterer } = useSelector(
    state => state.map
  );

  const { id } = useSelector(state => state.user.data);

  const toggleBuyHomeAbility = useCallback(() => {
    dispatch(setBuyHomeAbility(!buyHomeAbility));
  });
  // var bounds = kakaoMap.getBounds();

  const toggleSatelliteBtn = useCallback(() => {
    if (lineMap && !satellite) {
      setLineMap(state => !state);
    }
    setSatellite(state => !state);
  });

  const toggleLineMapBtn = useCallback(() => {
    if (!lineMap && satellite) {
      setSatellite(state => !state);
    }
    setLineMap(state => !state);
  });

  const buttonEl = useRef(null);
  const buttonElTwo = useRef(null);
  const container = useRef();

  /* 초기 렌더링 */
  useEffect(() => {
    const $script = document.createElement('script');
    $script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_KEY}&autoload=false&libraries=services,clusterer,drawing`;
    document.head.appendChild($script);
    $script.onload = () => {
      kakao.maps.load(() => {
        // 모바일 사용하기위해 화질 Down
        // kakao.maps.disableHD();
        // const container = document.getElementById('map'); 대신 useRef 사용
        const options = {
          center: new kakao.maps.LatLng(37.624915253753194, 127.15122688059974),
          level: 10,
        };
        const map = new kakao.maps.Map(container.current, options);
        dispatch(setKakaoMap({ kakaoMap: map }));
      });
    };
  }, []);
  /* 초기 클러스터링 렌더링 */
  useEffect(() => {
    if (kakaoMap === null) {
      return;
    }
    const initClusterer = new kakao.maps.MarkerClusterer({
      map: kakaoMap, // 지도 객체
      averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치
      minLevel: 6, // 클러스터 할 최소 지도 레벨
      disableClickZoom: true, // 클러스터 마커를 클릭했을 때 지도가 확대되지 않도록 설정
    });
    dispatch(setClusterer({ clusterer: initClusterer }));
  }, [kakaoMap]);

  useEffect(() => {
    if (kakaoMap === null) {
      return;
    }
    kakao.maps.event.addListener(kakaoMap, 'dragend', function () {
      useDeleteMarkers(kakaoMap, deleteMarkers);
      const result = useGetLocation(kakaoMap, id);
      if (buyHomeAbility) {
        dispatch(asyncAddAbilityMarker(result));
      } else {
        dispatch(asyncAddMarker(result));
      }
    });
  }, [kakaoMap]);
  /* 클릭시, 초기 마커 가져오기 */

  useEffect(() => {
    if (kakaoMap === null) {
      return;
    }
    useDeleteMarkers(kakaoMap, deleteMarkers);

    const result = useGetLocation(kakaoMap, id);

    if (buyHomeAbility) {
      dispatch(asyncAddAbilityMarker(result));
    } else {
      dispatch(asyncAddMarker(result));
    }
  }, [kakaoMap, buyHomeAbility]);

  /*마커 및 클러스터링 표시 */
  useEffect(() => {
    if ((kakaoMap === null) | (clusterer === null)) {
      return;
    }

    const setMarkers = useSetMarker(kakaoMap, markers, clusterer);
    if (clusterer?.getMarkers().length > 0) {
      clusterer.clear();
    }
    clusterer.addMarkers(setMarkers);
    console.log(clusterer);
    useSetInfoWin(kakaoMap, setMarkers, markers);
    setDeleteMarkers(setMarkers);
  }, [kakaoMap, markers]);

  useEffect(() => {
    if ((kakaoMap === null) | (clusterer === null)) {
      return;
    }
    kakao.maps.event.addListener(clusterer, 'clusterclick', function (cluster) {
      // 현재 지도 레벨에서 3레벨 확대한 레벨
      var level;
      console.log('이전', kakaoMap.getLevel());
      if (kakaoMap.getLevel() == 6) {
        level = kakaoMap.getLevel() - 1;
      } else {
        level = kakaoMap.getLevel() - 2;
      }
      console.log('이후', level);
      // 지도를 클릭된 클러스터의 마커의 위치를 기준으로 확대합
      kakaoMap.setLevel(level, { anchor: cluster.getCenter() });
    });
  }, [clusterer]);
  // 줌 컨트롤
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

  // 지도 맵 변경
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
      } else if (maptype === 'useDistrict') {
        if (!lineMap) {
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
  }, [kakaoMap, satellite, lineMap]);

  // Media Query
  const matches = useMediaQuery('(min-width:600px)');

  return (
    <>
      <div
        id='map'
        style={{
          width: '99%',
          height: matches ? '500px' : '100vh',
          borderStyle: 'solid',
          borderWidth: 'medium',
          borderColor: '#D8D8D8',
        }}
        ref={container}
      >
        <AbilityButton
          sx={{
            mt: 1,
            ml: 1,
            py: 0,
            px: 1,
            color: buyHomeAbility ? 'black' : 'white',
          }}
          onClick={toggleBuyHomeAbility}
        >
          # 주택 구매 능력
        </AbilityButton>

        <Grid
          container
          direction={'column'}
          justifyContent='flex-start'
          sx={{ mt: 3 }}
        >
          <Grid item>
            <Button
              sx={{
                zIndex: 2,
              }}
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
              onClick={toggleLineMapBtn}
              ref={buttonElTwo}
            >
              <MapIcon
                style={lineMap ? clickedCss : unclickedCss}
                sx={{
                  borderStyle: 'solid',
                  borderWidth: 'thin',
                  borderColor: '#D8D8D8',
                  color: 'black',
                }}
              ></MapIcon>
            </Button>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default KakaoMap;
