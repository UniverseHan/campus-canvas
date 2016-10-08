# Open Source Campus Community campus-canvas
Campus Canvas의 오픈 소스 리파지 토리 입니다.

## Index
1. [Getting Started](https://github.com/UniverseHan/campus-canvas/blob/master/README.md#getting-started)
2. [Development Guide](https://github.com/UniverseHan/campus-canvas/wiki/Guide)
3. Features

# Getting Started
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

## 라즈베리 파이 서버에서 게임 서버 구동하기
라즈베리 파이에서 서버를 실행 했다고 해도 ssh 터미널 창을 닫으면 게임 서버가 종료되는 문제가 있다. forever 라는 모듈을 사용해서 게임 서버를 대몬으로 실행 할 수가 있다.

### install forever
```bash
npm install -g forever
```

### 게임 서버 실행하기
```bash
cd canpus-canvas
forever start game.server.js
```

### 파이에서 서버가 구동되고 있는지 확인하기
```bash
forever list
```




