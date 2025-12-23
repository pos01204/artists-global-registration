@echo off
chcp 65001 > nul
cd /d "C:\Users\김지훈\Desktop\[Global Business셀] 김지훈\AI 자동화\글로벌 작가 온보딩 페이지"

echo ========================================
echo  ESLint/TypeScript 오류 수정 배포
echo ========================================
echo.

echo [1/3] 변경사항 스테이징...
git add .

echo [2/3] 커밋 생성...
git commit -m "fix: ESLint 설정 수정, TypeScript downlevelIteration 추가, Next.js 14.2.23 업데이트, 미구현 기능 추가"

echo [3/3] GitHub 푸시...
git push origin main

echo.
echo ========================================
echo  배포 완료! Vercel 자동 재배포 대기
echo ========================================
pause

