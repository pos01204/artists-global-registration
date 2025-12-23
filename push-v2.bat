@echo off
chcp 65001 > nul
cd /d "C:\Users\김지훈\Desktop\[Global Business셀] 김지훈\AI 자동화\글로벌 작가 온보딩 페이지"

echo ========================================
echo  v2 업데이트 배포
echo ========================================
echo.

echo [1/3] 변경사항 스테이징...
git add -A

echo [2/3] 커밋 생성...
git commit -m "fix: Button outline variant, Next.js 14.2.28, add qualification page and missing features"

echo [3/3] GitHub 푸시...
git push origin main

echo.
echo ========================================
echo  배포 완료! Vercel 자동 재배포 대기
echo ========================================
pause

