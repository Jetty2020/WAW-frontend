# 'World Art Works' site
>사람들이 남들과 의견을 나누고 싶은 자신의 혹은 타인의 예술 작품들을 온라인에서 공유하면서 의견을 나누는 사이트입니다.

<br>

<div display="flex" align="center">
<img height="200" src="https://user-images.githubusercontent.com/59543469/135801893-91c283dc-4a2f-4baf-a417-0f09afcc6976.jpg"/>
<img height="200" src="https://user-images.githubusercontent.com/59543469/135801955-5fbaf89d-8b9c-4106-a397-8c0ab4d4133b.jpg"/>
<img height="200" src="https://user-images.githubusercontent.com/59543469/135801971-a4b21a2d-b514-479f-b2b3-db85c1a44e40.jpg"/>
<img height="200" src="https://user-images.githubusercontent.com/59543469/135802077-3bf84d6f-d188-4b12-a0c0-7d0b20c43d9c.jpg"/>
</div>

<br>

[사이트 둘러보기](https://d5y44iq9qapex.cloudfront.net/)
<br>
<br>

---
## 기술 스택(Tech stack)

- Frontend
  ![Generic badge](https://img.shields.io/badge/React-17.0.2-61DAFB.svg) ![Generic badge](https://img.shields.io/badge/typescript-4.3.5-3178C6.svg) ![Generic badge](https://img.shields.io/badge/apollo-3.4.7-311C87.svg) ![Generic badge](https://img.shields.io/badge/graphql-15.5.1-E434AA.svg)![Generic badge](https://img.shields.io/badge/Styled_Components-5.3.0-CC6699.svg)
<br>
<br>

---
## 작업 기간(Duration of work)
2021/08/13 ~ 2021/08/28, 2021/09/13 ~ 2021/09/29 (total 5weeks)
<br>
<br>

---
## 권장 브라우저

<img src="https://img.shields.io/badge/GoogleChrome-4285F4?style=flat-square&logo=GoogleChrome&logoColor=white"/>

<br>
<br>

---

## BackEnd
[Backend github link](https://github.com/Jetty2020/WAW-backend)
<br>
<br>

---

## 얻은 경험

***GraphQL을 사용하여 데이터 페칭 최적화***

- GraphQL의 쿼리문을 사용하여 `데이터 언더-패칭과 오버-패칭을 방지`

***Apollo Client를 사용한 상태관리***

- Apollo Client의 반응형 변수를 활용한 전역상태관리
- Apollo Client의 useQuery와 useMutation을 사용하여 데이터 캐싱
    
    

***Apollo Codegen을 활용하여 백엔드와 통신하는 데이터 타입 생성 자동화***

***AWS를 사용하여 프론트엔드 배포***

- S3 서비스를 사용하여 정적 웹사이트 배포
- S3가 갖고 있는 보안 이슈를 해결하기 위해서 CloudFront 서비스를 이용하여 CDN 적용
    
    

***자연스러운 게시물 데이터 패칭을 위한 무한 스크롤 구현***

- 스크롤 이벤트의 성능 이슈를 보완하기 위해 `Intersection Observer`를 사용하여 무한 스크롤 구현
    
    

***사용자에게 최적화된 UI를 제공할 수 있도록 구현***

- 로딩 시간의 지루함을 줄이기 위해 `스켈레톤 UI 적용`하여 UX 향상
<br>
<br>

---

## 핵심 기능(Core features)

| Classification |         Page         | Function or component | Progress |
| :------------- | :------------------: | :-------------------: | :------: |
| **User**       |    Create Account    |                       |  Done!   |
|                |        Login         |                       |  Done!   |
|                |     User Profile     |    Get my profile     |  Done!   |
|                |     Update User      |                       |  Done!   |
|                |     User Detail      |   Get user profile    |  Done!   |
|                |                      |        Logout         |  Done!   |
| **Post**       |    Landing(Home)     |                       |  Done!   |
|                |     Create Post      |                       |  Done!   |
|                |  Search Post(title)  |                       |  Done!   |
|                |  Search Post(User)   |   Get posts by user   |  Done!   |
|                |     Post detail      |    Get post detail    |  Done!   |
|                |          "           |      Toggle like      |  Done!   |
|                |          "           |      Get comment      |  Done!   |
|                |          "           |    Create comment     |  Done!   |
|                |          "           |    Delete comment     |  Done!   |
|                |      Edit Post       |                       |  Done!   |
|                |     delete Post      |                       |  Done!   |
|                | Posts sort by artist |                       |  Done!   |
| **Other**      |                      |        Router         |  Done!   |
|                |                      |     Apollo config     |  Done!   |
|                |                      |     Global styles     |  Done!   |
|                |                      |        Helmet         |  Done!   |
|                |                      |    Apollo codegen     |  Done!   |
|                |                      |       Not found       |  Done!   |
|                |                      |         Arch.         |  Done!   |
|                |                      |        Nav bar        |  Done!   |
