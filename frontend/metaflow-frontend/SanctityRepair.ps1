# SanctityRepair.ps1
Write-Host "🛠️ Initiating sanctity repair..." -ForegroundColor Cyan

$logPath = "C:\Users\hp\metaflow-frontend\logs\verdict.log"
if (-not (Test-Path $logPath)) {
    New-Item -Path $logPath -ItemType File -Force
    Add-Content -Path $logPath -Value "[REPAIR] Verdict log resurrected at $(Get-Date)"
    Write-Host "✅ Verdict log restored." -ForegroundColor Green
} else {
    Write-Host "🕊️ Verdict log already sanctified." -ForegroundColor Yellow
}