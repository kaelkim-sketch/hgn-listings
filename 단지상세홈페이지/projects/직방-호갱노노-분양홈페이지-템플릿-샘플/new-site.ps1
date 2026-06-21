# ============================================================
#  분양 랜딩 "찍어내기" 자동 생성기
#
#  사용 순서
#   1) 현장설정.txt 를 새 현장 정보로 채운다
#   2) assets\ 폴더에 이미지를 정해진 이름으로 넣는다
#        메인배경.jpg   (첫 화면 조감도/투시도)
#        위치도.png     (입지 위치도)
#        공유썸네일.png  (카톡/SNS 미리보기)
#   3) 이 파일(new-site.ps1) 더블클릭/실행  (← 플래그 없음)
#        → build\ 생성 + 브라우저 미리보기 자동 오픈
#   4) build\index.html 에서 입지·교통 등 "본문"을 직접 수정(선택)
#   5) 라이브 반영:  PowerShell 에서   & ".\new-site.ps1" -Publish
#        → ※ 재빌드 없이 "지금 build" 를 그대로 배포 (4번 수정 보존)
#
#  결과 URL: https://cousa-crypto.github.io/buksuwon-dietre-riche/
# ============================================================
param([switch]$Publish)

$ErrorActionPreference = 'Stop'
# git(네이티브 명령) 종료코드로 스크립트가 중단되지 않도록 (PS7.4+ 안전장치)
$PSNativeCommandUseErrorActionPreference = $false

$root   = if ($PSScriptRoot) { $PSScriptRoot } else { Split-Path -LiteralPath $MyInvocation.MyCommand.Path -Parent }
$src    = Join-Path $root 'skview-clone'   # 마스터(틀)
$build  = Join-Path $root 'build'          # 생성 결과(작업본)
$dist   = Join-Path $root 'deploy'         # 배포 git 저장소
$assets = Join-Path $root 'assets'
$cfg    = Join-Path $root '현장설정.txt'

# ── 마스터(skview-clone)의 현재 값 ─────────────────────────
#   ※ skview-clone 을 다른 현장으로 다시 만들면 이 3줄도 같이 바꿔야 함
$M = @{
  현장명 = '동탄파라곤3차'
  전화   = '1668-3003'
  슬로건 = '동탄에서의 삶의 시선 새로 짓다'
}

function Read-Utf8 ($p)    { [System.IO.File]::ReadAllText($p, [System.Text.Encoding]::UTF8) }
function Write-Utf8($p,$t) { [System.IO.File]::WriteAllText($p, $t, (New-Object System.Text.UTF8Encoding($false))) }

# ── 1) 현장설정.txt 읽기 (키 = 값) ─────────────────────────
if (-not (Test-Path $cfg)) { throw "현장설정.txt 가 없습니다: $cfg" }
$conf = @{}
foreach ($line in (Get-Content -LiteralPath $cfg -Encoding UTF8)) {
  $t = $line.Trim()
  if ($t -eq '' -or $t.StartsWith('#')) { continue }
  $i = $t.IndexOf('=')
  if ($i -lt 1) { continue }
  $conf[$t.Substring(0, $i).Trim()] = $t.Substring($i + 1).Trim()
}
$현장명 = $conf['현장명']
$전화   = $conf['전화']
$슬로건 = $conf['슬로건']
$키워드 = $conf['키워드']
if ([string]::IsNullOrWhiteSpace($현장명)) { throw "현장설정.txt 의 '현장명' 을 먼저 입력하세요." }

Write-Host "▶ 현장명: $현장명"

# ════════════════════════════════════════════════════════════
#  -Publish 모드: "지금 build" 를 그대로 배포 (재빌드 안 함!)
#   → build\index.html 을 직접 손본 내용이 그대로 라이브에 반영됨
# ════════════════════════════════════════════════════════════
if ($Publish) {
  if (-not (Test-Path (Join-Path $build 'index.html'))) {
    throw "배포할 build 가 없습니다. 먼저 -Publish 없이 실행해서 빌드하세요."
  }
  Get-ChildItem -LiteralPath $dist -Force | Where-Object { $_.Name -ne '.git' } | Remove-Item -Recurse -Force
  Copy-Item -Path (Join-Path $build '*') -Destination $dist -Recurse -Force
  if (-not (Test-Path (Join-Path $dist '.nojekyll'))) { New-Item -ItemType File -Path (Join-Path $dist '.nojekyll') | Out-Null }
  '* -text' | Set-Content -NoNewline -Path (Join-Path $dist '.gitattributes')

  git -C $dist add -A
  git -C $dist commit -m "publish: $현장명 $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
  git -C $dist push

  Write-Host ""
  Write-Host "✅ 배포 완료 (반영까지 약 1분)"
  Write-Host "🔗 https://cousa-crypto.github.io/buksuwon-dietre-riche/"
  return
}

# ── 2) 마스터 → build 복제 ────────────────────────────────
if (Test-Path $build) { Remove-Item -LiteralPath $build -Recurse -Force }
New-Item -ItemType Directory -Path $build | Out-Null
Copy-Item -Path (Join-Path $src '*') -Destination $build -Recurse -Force

# ── 3) 텍스트 치환 (build\*.html) ─────────────────────────
foreach ($html in (Get-ChildItem -LiteralPath $build -Filter *.html -File)) {
  $x = Read-Utf8 $html.FullName
  $x = $x.Replace($M.현장명, $현장명)
  if ($전화)   { $x = $x.Replace($M.전화,   $전화) }
  if ($슬로건) { $x = $x.Replace($M.슬로건, $슬로건) }
  if (-not [string]::IsNullOrWhiteSpace($키워드)) {
    $pattern = '(?<pre><meta\s+name="keywords"[^>]*\bcontent=")[^"]*(?<post>")'
    $cb = { param($m) $m.Groups['pre'].Value + $키워드 + $m.Groups['post'].Value }.GetNewClosure()
    $x = [regex]::Replace($x, $pattern, $cb)
  }
  Write-Utf8 $html.FullName $x
}

# ── 4) 이미지 배치 (assets\이름.* → build 슬롯) ────────────
function Place-Image ($baseName, $slotRel) {
  $hit = Get-ChildItem -LiteralPath $assets -File -ErrorAction SilentlyContinue |
         Where-Object { [System.IO.Path]::GetFileNameWithoutExtension($_.Name) -eq $baseName } |
         Select-Object -First 1
  if ($hit) {
    $dest = Join-Path $build $slotRel
    $destDir = Split-Path $dest -Parent
    if (-not (Test-Path $destDir)) { New-Item -ItemType Directory -Path $destDir -Force | Out-Null }
    Copy-Item -LiteralPath $hit.FullName -Destination $dest -Force
    Write-Host "  이미지 적용: $($hit.Name)  →  $slotRel"
  }
}
Place-Image '메인배경'    'img\main.jpg'
Place-Image '위치도'      'img\location_map.png'
Place-Image '공유썸네일'   'img\common\og2.png'
Place-Image '오시는길약도' 'sub\contact01.jpg'

# ── 5) 미리보기 ───────────────────────────────────────────
Write-Host ""
Write-Host "✅ build 생성 완료 → $build"
Write-Host "   · 본문(입지/교통/사업개요 등)은 build\index.html 에서 직접 수정하세요."
Write-Host "   · 라이브 반영:  & `".\new-site.ps1`" -Publish   (재빌드 없이 지금 build 를 배포)"
try { Start-Process (Join-Path $build 'index.html') } catch {}
