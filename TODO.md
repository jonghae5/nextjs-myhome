## 5.1 TODO LIST

- 소득지출비교표 작성 [O]
- 주택구매능력표 작성 [O]

## 5.3 TODO LIST

- redux-toolkit 연결 [O]
- formik 사용 [O]

## 5.4 TODO LIST

- redux-thunk 연결 [O]

  한개의 비동기 액션에 대해 pending(비동기 호출 전), success(비동기 호출 성공), failure(비동기 호출 실패로 구성
  createAsyncThunk 를 선언하게 되면 첫번째 파라미터로 선언한 액션 이름 에 pending, fulfilled, rejected 의 상태에 대한 action 을 자동으로 생성

  extraReducers: extraReducers 는 액션을 자동으로 생성해 주지 않기때문에 별도의 액션이 존재하는 함수의 reducer를 정의할 경우에 사용
  async 함수는 await 사용 여부와 상관없이 항상 promise 를 반환

- Loading page / Random Page 생성 [O]

## 5.5 / 5.6 TODO LIST

- 상세 설명 구현 [O]
- yup 설치 (schema-based form-level validation) / Button Disabled 구현[O]
- 로그인 화면 프론트 구현[O]

NextAuthJS는 특정 Callback Redirect URI를 지정

- 네이버 로그인 [O], 카카오 로그인[O]
  네아로는 다른 소셜로그인과 다르게 access token을 callbackUrl에 제공
  window객체에서 뽑아서야 하는 naver 파라미터는 아래와 같이 global로 선언
  '''
  <Grid container spacing={0.5} justifyContent='space-around'>
  <Grid item xs={6}>
  <Typography
  component='div'
  id='naverIdLogin'
  sx={{ mt: 1 }}
  onClick={NaverLogin}
  textAlign='center'
  />
  </Grid>
  <Grid item xs={6}>
  <Button onClick={loginFormWithKakao} sx={{ mt: 0.2 }}>
  <img
  src='/static/images/kakao_login_medium_narrow.png'
  width='240'
  height='56'
  alt='카카오 로그인 버튼'
  />
  > </Button>

'''

- next auth 사용 [O]
  NEXTAUTH_URL : callback URL
  https://next-auth.js.org/getting-started/example

- Kakao Map API 가져오기[]
  https://apis.map.kakao.com/
  autoload=false : 지도 불러오는 script 순서를 조절해준다.
  CSR 과 SSR 차이
  https://helloinyong.tistory.com/248

  클러스터링
  libraries=services,clusterer,drawing HEAD 입력
