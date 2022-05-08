import NextAuth from 'next-auth';
import KakaoProvider from 'next-auth/providers/kakao';
import NaverProvider from 'next-auth/providers/naver';
export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    KakaoProvider({
      //REST API 앱키
      clientId: process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_KAKAO_CLIENT_SECRET,
    }),

    NaverProvider({
      clientId: process.env.NEXT_PUBLIC_NAVER_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_NAVER_CLIENT_SECRET,
    }),
  ],
});
