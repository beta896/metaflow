# PathVerifier.ps1
$ProphecyRoot = "C:\Users\hp\metaflow-frontend"

$PathsToVerify = @{
    "Dashboard Script" = "$ProphecyRoot\Dashboard.ps1"
    "Log File"         = "$ProphecyRoot\Logs\ProphecyTimeline_Admin.log"
    "Repair Script"    = "$ProphecyRoot\SanctityRepair.ps1"
    "Archive Folder"   = "$ProphecyRoot\Archives"
    "PathSanctifier"   = "$ProphecyRoot\PathSanctifier.ps1"
}

Write-Host "`n🔍 Verifying Sanctified Paths..." -ForegroundColor Cyan

foreach ($label in $PathsToVerify.Keys) {
    $path = $PathsToVerify[$label]
    if (Test-Path $path) {
        Write-Host "✅ $label found at $path" -ForegroundColor Green
    } else {
        Write-Host "❌ $label missing at $path" -ForegroundColor Red
    }
}

Write-Host "`n📜 Verdict: Path verification complete." -ForegroundColor Yellow