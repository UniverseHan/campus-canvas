# Open Source Campus Community campus-canvas
Campus Canvas의 오픈 소스 리파지 토리 입니다.

# 서버 실행하기
## 의존 모듈 인스톨
```bash
npm install
```

## 서버 주소 설정
.../Client/js/SpriteTestScene.js 에서 다음 코드를 알맞게 변경

```javascript
var Server = "http://localhost";
var Port = "9892";
```

## 커맨드 라인에서 서버 실행
```bash
node game.server.js
```

## Server on Raspberry Pi
* ip : http://121.138.100.130/
* port : 22
* id : pi
* pass : raspberry

```bash
ssh pi@121.138.100.130
```



