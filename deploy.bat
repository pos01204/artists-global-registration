@echo off
chcp 65001 > nul
echo ========================================
echo  GitHub 배포 스크립트
echo ========================================
echo.

REM Git 초기화
echo [1/6] Git 초기화 중...
git init

REM 모든 파일 스테이징
echo.
echo [2/6] 파일 스테이징 중...
git add .

REM 커밋
echo.
echo [3/6] 커밋 생성 중...
git commit -m "feat: 글로벌 작가 온보딩 페이지 초기 구현"

REM 메인 브랜치 설정
echo.
echo [4/6] 메인 브랜치 설정 중...
git branch -M main

REM 원격 저장소 연결
echo.
echo [5/6] 원격 저장소 연결 중...
git remote add origin https://github.com/pos01204/artists-global-registration.git 2>nul
if errorlevel 1 (
    echo 원격 저장소가 이미 연결되어 있습니다. URL을 업데이트합니다.
    git remote set-url origin https://github.com/pos01204/artists-global-registration.git
)

REM 푸시
echo.
echo [6/6] GitHub에 푸시 중...
git push -u origin main --force

echo.
echo ========================================
echo  배포 완료!
echo ========================================
echo.
echo GitHub URL: https://github.com/pos01204/artists-global-registration
echo.
pause

