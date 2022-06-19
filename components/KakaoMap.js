import React, { useState, useEffect, useCallback, useRef } from 'react';
// import { markerdata } from './MarkerData';
import { useTheme, useMediaQuery, Paper } from '@mui/material';
import { Button, Grid, CircularProgress } from '@mui/material';
import SatelliteAltIcon from '@mui/icons-material/SatelliteAlt';
import MapIcon from '@mui/icons-material/Map';
import { useDispatch, useSelector } from 'react-redux';

import {
  asyncAddAbilityMarker,
  asyncAddMarkerDetailInfo,
  setClusterer,
} from '../slices/mapSlice';
import { setBuyHomeAbility, setKakaoMap } from '../slices/mapSlice';
import { styled } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import { grey } from '@mui/material/colors';
import useSetMarker from '../hooks/useSetMarker';
import useDeleteMarkers from '../hooks/useDeleteMarkers';
import useGetLocation from '../hooks/useGetLocation';
import useSetOverlay from '../hooks/useSetOverlay';

import KakaoMapInfoItem from './kakaoMap/KakaoMapInfoItem';
import KakaoMapInformation from './kakaoMap/KakaoMapInformation';
import KakaoSearchBar from './kakaoMap/kakaoSearchBar';
import KakaoFilter from './kakaoMap/KakaoFilter';

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

const iconStyle = {
  borderStyle: 'solid',
  borderWidth: 'thin',
  borderColor: '#D8D8D8',
  color: 'black',
};

const KakaoMap = ({ children }) => {
  const dispatch = useDispatch();

  const [satellite, setSatellite] = useState(false);
  const [lineMap, setLineMap] = useState(false);

  const [deleteMarkers, setDeleteMarkers] = useState([]);

  const [searchBar, setSearchBar] = useState(false);

  const [searchValue, setSearchValue] = useState('');
  const [keyword, setKeyword] = useState('');

  const [filterList, setFilterList] = useState(false);
  const [squareValue, setSquareValue] = useState([10, 150]);

  const [throttle, setThrottle] = useState(false);
  // const [toggleGetData, setToggleGetData] = useState(false);
  const [toggleInfo, setToggleInfo] = useState(false);

  const [infoZoom, setInfoZoom] = useState(false);

  const handleSquareValue = (event, newValue, activeThumb) => {
    const minGap = 10;
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setSquareValue([
        Math.min(newValue[0], squareValue[1] - minGap),
        squareValue[1],
      ]);
    } else {
      setSquareValue([
        squareValue[0],
        Math.max(newValue[1], squareValue[0] + minGap),
      ]);
    }
    console.log(squareValue);
  };
  const { kakaoMap, buyHomeAbility, markers, clusterer, clickedMarker } =
    useSelector(state => state.map);
  const { id } = useSelector(state => state.user.data);

  const toggleFilterList = useCallback(() => {
    setFilterList(state => !state);
  });
  const textInput = useRef();
  const handleSubmitKeyword = useCallback(() => {
    if (searchValue === '') {
      alert('주소를 입력해주세요.');
      return;
    }
    setKeyword(searchValue);

    textInput.current.value = '';
    setSearchValue('');
  });

  const toggleSearchBar = useCallback(() => {
    setSearchBar(state => !state);
  });

  const toggleBuyHomeAbility = useCallback(() => {
    if (id) {
      dispatch(setBuyHomeAbility(!buyHomeAbility));
    } else {
      alert('로그인이 필요합니다.');
    }
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

        //  대신 useRef 사용
        // const container = document.getElementById('map');
        const options = {
          center: new kakao.maps.LatLng(37.624915253753194, 127.15122688059974),
          level: 10,
          // 지도 위치 변경시 panto를 이용할지(부드럽게 이동)
          isPanto: true,
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
      minClusterSize: 1, // default 2
    });
    dispatch(setClusterer({ clusterer: initClusterer }));
  }, [kakaoMap]);

  /* 클릭시, 초기 마커 가져오기 */
  useEffect(() => {
    if (kakaoMap === null) {
      return;
    }
    useDeleteMarkers(kakaoMap, deleteMarkers);
    const result = { ...useGetLocation(kakaoMap, id), squareValue };

    if (buyHomeAbility) {
      if (throttle) return;
      if (!throttle) {
        setThrottle(true);
        setTimeout(async () => {
          await dispatch(asyncAddAbilityMarker(result));
          setThrottle(false);
        }, 300);
      }
    } else {
      if (clusterer) {
        clusterer.clear();
      }
      useDeleteMarkers(kakaoMap, deleteMarkers);
    }
  }, [kakaoMap, buyHomeAbility, squareValue]);

  /* 드래그시 이벤트 */

  const toggleGetData = useRef(false);
  useEffect(() => {
    if (kakaoMap === null) {
      return;
    }
    if (toggleGetData.current) {
      return;
    }
    const dragDisplay = () => {
      useDeleteMarkers(kakaoMap, deleteMarkers);
      const result = { ...useGetLocation(kakaoMap, id), squareValue };
      if (buyHomeAbility) {
        console.log(buyHomeAbility);
        if (throttle) return;
        if (!throttle) {
          setThrottle(true);
          setTimeout(async () => {
            await dispatch(asyncAddAbilityMarker(result));
            setThrottle(false);
          }, 300);
        }
      }
    };

    kakao.maps.event.addListener(kakaoMap, 'dragend', dragDisplay);

    toggleGetData.current = true;
  }, [buyHomeAbility]);

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

    const customOverlayList = useSetOverlay(
      kakaoMap,
      setMarkers,
      markers,
      setToggleInfo
    );

    function closeOverlay() {
      for (var idx = 0; idx < customOverlayList.length; idx++) {
        customOverlayList[idx].setMap();
      }
    }

    for (var j = 0; j < customOverlayList.length; j++) {
      kakao.maps.event.addListener(setMarkers[j], 'click', function () {
        closeOverlay();
        customOverlayList[j].setMap(kakaoMap);
        setToggleInfo(true);

        const info = markers[j];

        dispatch(asyncAddMarkerDetailInfo(info));
      });
    }
    kakao.maps.event.addListener(kakaoMap, 'click', function () {
      setTimeout(closeOverlay());
    });

    setDeleteMarkers(setMarkers);
  }, [kakaoMap, markers]);

  /* 키워드 검색 */
  useEffect(() => {
    if (kakaoMap === null) {
      return;
    }
    var ps = new kakao.maps.services.Places();
    if (keyword !== '') {
      ps.keywordSearch(keyword, placesSearchCB);
    }
    //

    // 키워드 검색 완료 시 호출되는 콜백함수
    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        var center = new kakao.maps.LatLng(data[0].y, data[0].x);
        console.log(center);
        // // 검색된 장소 위치를 기준으로 지도 범위를 재설정
        kakaoMap.setLevel(3, { anchor: center });
      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        alert('검색 결과가 존재하지 않습니다.');
        return;
      } else if (status === kakao.maps.services.Status.ERROR) {
        alert('검색 결과 중 오류가 발생했습니다.');
        return;
      }
    }
  }, [keyword]);
  /* 클러스터 클릭시 확대*/
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

    return () =>
      kakao.maps.event.removeListener(
        clusterer,
        'clusterclick',
        function (cluster) {
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
        }
      );
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

  const toggleInfoZoom = useCallback(() => {
    if (!infoZoom) {
      setSearchBar(false);
      setInfoZoom(state => !state);
      setToggleInfo(false);
    } else {
      setInfoZoom(state => !state);
    }
  });

  return (
    <>
      {searchBar && (
        <KakaoSearchBar
          textInput={textInput}
          setSearchValue={setSearchValue}
          handleSubmitKeyword={handleSubmitKeyword}
        />
      )}
      <KakaoFilter
        filterList={filterList}
        squareValue={squareValue}
        handleSquareValue={handleSquareValue}
      />

      {throttle && buyHomeAbility && (
        <CircularProgress
          sx={{ position: 'absolute', mt: '50%', ml: '50%', zIndex: 5 }}
        />
      )}
      <div
        id='map'
        style={{
          width: '99%',
          height: matches ? '90vh' : '90vh', // 큰놈, 작은 놈
          borderStyle: 'solid',
          borderWidth: 'medium',
          borderColor: '#D8D8D8',
          positive: 'relative',
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
              onClick={toggleSearchBar}
            >
              <SearchIcon sx={iconStyle}></SearchIcon>
            </Button>
          </Grid>

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
                sx={iconStyle}
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
                sx={iconStyle}
              ></MapIcon>
            </Button>
          </Grid>
          <Grid item>
            <Button
              sx={{
                zIndex: 2,
              }}
              onClick={toggleFilterList}
            >
              <FilterListIcon sx={iconStyle}></FilterListIcon>
            </Button>
          </Grid>
        </Grid>

        {infoZoom && (
          <KakaoMapInformation
            toggleInfoZoom={toggleInfoZoom}
            setInfoZoom={setInfoZoom}
          />
        )}
      </div>
      {toggleInfo && (
        <KakaoMapInfoItem
          toggleInfoZoom={toggleInfoZoom}
          setToggleInfo={setToggleInfo}
        />
      )}
    </>
  );
};

export default KakaoMap;
