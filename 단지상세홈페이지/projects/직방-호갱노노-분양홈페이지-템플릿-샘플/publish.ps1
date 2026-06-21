# ============================================================
#  원클릭 배포: skview-clone/ (작업본 전체) → GitHub Pages 반영
#  실행: PowerShell에서  ! & "....\publish.ps1"   (또는 더블클릭)
#  결과 URL: https://cousa-crypto.github.io/buksuwon-dietre-riche/
#  ※ 의왕역 SK VIEW 분양 랜딩 클론 (skview-clone 폴더가 원본 작업본)
# ============================================================
$root = "c:\evan kang\product-docs\_personal\evan_kang\projects\직방-호갱노노-분양홈페이지-템플릿-샘플"
$src  = Join-Path $root "skview-clone"
$dist = Join-Path $root "deploy"

# 1) 작업본 전체를 배포 폴더로 동기화 (.git 은 보존)
Get-ChildItem -LiteralPath $dist -Force | Where-Object { $_.Name -ne '.git' } | Remove-Item -Recurse -Force
Copy-Item -Path (Join-Path $src '*') -Destination $dist -Recurse -Force

# GitHub Pages 가 모든 파일을 그대로 서빙하도록 보조 파일 생성
if (-not (Test-Path (Join-Path $dist '.nojekyll'))) { New-Item -ItemType File -Path (Join-Path $dist '.nojekyll') | Out-Null }
'* -text' | Set-Content -NoNewline -Path (Join-Path $dist '.gitattributes')

# 2) 커밋 + 푸시 (변경 없으면 자동 건너뜀)
git -C $dist add -A
$ts = Get-Date -Format "yyyy-MM-dd HH:mm"
git -C $dist commit -m "update $ts"
git -C $dist push

Write-Host ""
Write-Host "✅ 배포 요청 완료 (반영까지 약 1분)"
Write-Host "🔗 https://cousa-crypto.github.io/buksuwon-dietre-riche/"
