@echo off
chcp 65001 > nul
echo ========================================
echo  GitHub 업데이트 푸시 스크립트
echo ========================================
echo.

REM 변경사항 스테이징
echo [1/3] 변경사항 스테이징 중...
git add .

REM 커밋
echo.
echo [2/3] 커밋 생성 중...
git commit -m "fix: ESLint 설정 수정 및 Next.js 버전 업데이트"

REM 푸시
echo.
echo [3/3] GitHub에 푸시 중...
git push origin main

echo.
echo ========================================
echo  업데이트 완료!
echo ========================================
echo.
echo Vercel에서 자동으로 재배포됩니다.
echo.
pause

