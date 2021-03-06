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
      alert('????????? ??????????????????.');
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
      alert('???????????? ???????????????.');
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

  /* ?????? ????????? */
  useEffect(() => {
    const $script = document.createElement('script');
    $script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_KEY}&autoload=false&libraries=services,clusterer,drawing`;
    document.head.appendChild($script);
    $script.onload = () => {
      kakao.maps.load(() => {
        // ????????? ?????????????????? ?????? Down
        // kakao.maps.disableHD();

        //  ?????? useRef ??????
        // const container = document.getElementById('map');
        const options = {
          center: new kakao.maps.LatLng(37.624915253753194, 127.15122688059974),
          level: 10,
          // ?????? ?????? ????????? panto??? ????????????(???????????? ??????)
          isPanto: true,
        };
        const map = new kakao.maps.Map(container.current, options);

        dispatch(setKakaoMap({ kakaoMap: map }));
      });
    };
  }, []);
  /* ?????? ??????????????? ????????? */
  useEffect(() => {
    if (kakaoMap === null) {
      return;
    }
    const initClusterer = new kakao.maps.MarkerClusterer({
      map: kakaoMap, // ?????? ??????
      averageCenter: true, // ??????????????? ????????? ???????????? ?????? ??????
      minLevel: 6, // ???????????? ??? ?????? ?????? ??????
      disableClickZoom: true, // ???????????? ????????? ???????????? ??? ????????? ???????????? ????????? ??????
      minClusterSize: 1, // default 2
    });
    dispatch(setClusterer({ clusterer: initClusterer }));
  }, [kakaoMap]);

  /* ?????????, ?????? ?????? ???????????? */
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

  /* ???????????? ????????? */

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

  /*?????? ??? ??????????????? ?????? */
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

  /* ????????? ?????? */
  useEffect(() => {
    if (kakaoMap === null) {
      return;
    }
    var ps = new kakao.maps.services.Places();
    if (keyword !== '') {
      ps.keywordSearch(keyword, placesSearchCB);
    }
    //

    // ????????? ?????? ?????? ??? ???????????? ????????????
    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        var center = new kakao.maps.LatLng(data[0].y, data[0].x);
        console.log(center);
        // // ????????? ?????? ????????? ???????????? ?????? ????????? ?????????
        kakaoMap.setLevel(3, { anchor: center });
      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        alert('?????? ????????? ???????????? ????????????.');
        return;
      } else if (status === kakao.maps.services.Status.ERROR) {
        alert('?????? ?????? ??? ????????? ??????????????????.');
        return;
      }
    }
  }, [keyword]);
  /* ???????????? ????????? ??????*/
  useEffect(() => {
    if ((kakaoMap === null) | (clusterer === null)) {
      return;
    }

    kakao.maps.event.addListener(clusterer, 'clusterclick', function (cluster) {
      // ?????? ?????? ???????????? 3?????? ????????? ??????
      var level;
      console.log('??????', kakaoMap.getLevel());
      if (kakaoMap.getLevel() == 6) {
        level = kakaoMap.getLevel() - 1;
      } else {
        level = kakaoMap.getLevel() - 2;
      }
      console.log('??????', level);
      // ????????? ????????? ??????????????? ????????? ????????? ???????????? ?????????
      kakaoMap.setLevel(level, { anchor: cluster.getCenter() });
    });

    return () =>
      kakao.maps.event.removeListener(
        clusterer,
        'clusterclick',
        function (cluster) {
          // ?????? ?????? ???????????? 3?????? ????????? ??????
          var level;
          console.log('??????', kakaoMap.getLevel());
          if (kakaoMap.getLevel() == 6) {
            level = kakaoMap.getLevel() - 1;
          } else {
            level = kakaoMap.getLevel() - 2;
          }
          console.log('??????', level);
          // ????????? ????????? ??????????????? ????????? ????????? ???????????? ?????????
          kakaoMap.setLevel(level, { anchor: cluster.getCenter() });
        }
      );
  }, [clusterer]);

  // ??? ?????????
  useEffect(() => {
    if (kakaoMap === null) {
      return;
    }
    // ?????? ?????? ????????? ????????? ??? ??????  ??? ???????????? ??????
    const zoomControl = new kakao.maps.ZoomControl();
    kakaoMap.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

    // ****??????****
    const clickHandler = function (event) {
      console.log('click: ' + event.latLng.toString());
    };
    kakao.maps.event.addListener(kakaoMap, 'click', clickHandler);
  }, [kakaoMap]);

  // ?????? ??? ??????
  useEffect(() => {
    if (kakaoMap === null) {
      return;
    }
    // ????????? ????????? ????????????????????? ????????? ?????? ???????????????
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
      // ?????? ????????? ?????? ????????? ????????? ???????????????
      if (currentTypeId) {
        kakaoMap.removeOverlayMapTypeId(currentTypeId);
      }

      kakaoMap.addOverlayMapTypeId(changeMaptype);

      // ????????? ????????? ??????????????? ???????????????
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
          height: matches ? '90vh' : '90vh', // ??????, ?????? ???
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
          # ?????? ?????? ??????
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
