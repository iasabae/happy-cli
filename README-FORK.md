# Happy CLI with Latest Claude Code

이 저장소는 [Happy CLI](https://github.com/slopus/happy-cli)의 포크로, 최신 Claude Code 2.0.56을 사용합니다.

## 🆕 추가된 기능

- ✅ **Claude Code 2.0.56** - Opus 4.5 모델 지원
- ✅ **자동 업데이트** - `happy --update` 명령어로 간편한 업데이트
- ✅ **업데이트 확인** - `happy --check-update`로 최신 버전 확인

## 📦 설치 방법

### 옵션 1: GitHub에서 직접 설치 (추천)

```bash
npm install -g github:iasabae/happy-cli
```

### 옵션 2: 클론 후 빌드

```bash
# 저장소 클론
git clone https://github.com/iasabae/happy-cli.git
cd happy-cli

# 의존성 설치 및 빌드
npm install
npm run build

# 전역 설치
npm link
```

## 🚀 사용 방법

### 기본 실행
```bash
happy
```

### Claude Code 업데이트 확인
```bash
happy --check-update
```

### Claude Code 자동 업데이트
```bash
# 대화형
happy --update

# 자동 (확인 없이)
happy --update -y
```

### 버전 확인
```bash
happy --version
```

## 🔄 업데이트 방법

### Happy CLI 업데이트 (GitHub에서 설치한 경우)
```bash
npm install -g github:iasabae/happy-cli
```

### Claude Code만 업데이트 (로컬 빌드한 경우)
```bash
cd happy-cli
happy --update -y
```

## 📋 원본과의 차이점

| 항목 | 원본 | 이 포크 |
|------|------|---------|
| Claude Code 버전 | 2.0.24 | 2.0.56 |
| 자동 업데이트 | ❌ | ✅ |
| Opus 4.5 지원 | ❌ | ✅ |

## 🛠️ 기술 세부사항

### 수정된 파일
- `package.json` - Claude Code 버전 업데이트
- `src/utils/MessageQueue.ts` - 타입 호환성 수정
- `bin/happy.mjs` - 업데이트 명령어 추가
- `scripts/update-claude.cjs` - 자동 업데이트 스크립트 (신규)

### 업데이트 프로세스
1. npm 레지스트리에서 최신 `@anthropic-ai/claude-code` 버전 확인
2. package.json 자동 수정
3. 의존성 재설치
4. 프로젝트 재빌드
5. 전역 재설치

## 📖 원본 Happy CLI 정보

원본 프로젝트: https://github.com/slopus/happy-cli

Happy CLI는 Claude Code를 모바일 및 웹에서 제어할 수 있게 해주는 래퍼입니다.

## 🤝 기여

이슈나 개선 사항은 GitHub Issues에 등록해주세요.

## 📄 라이선스

MIT License (원본 프로젝트와 동일)

---

**Note**: 이 포크는 Claude Code의 최신 버전을 빠르게 사용하기 위해 만들어졌습니다. 원본 프로젝트가 업데이트되면 이 포크도 동기화될 예정입니다.
