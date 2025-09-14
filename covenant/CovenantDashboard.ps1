# CovenantDashboard.ps1
# Displays real-time covenant status and symbolic alignment

$VaultPath = "C:\Users\hp\metaflowbackend\covenant"
$CovenantFiles = Get-ChildItem $VaultPath -Filter "COV-*.json"

Write-Host "`n📊 Covenant Dashboard — $(Get-Date)`n"

foreach ($file in $CovenantFiles) {
    $meta = Get-Content $file.FullName | ConvertFrom-Json

    $status = $meta.Status
    $symbolic = if ($meta.Purpose -like "*justice*" -or $meta.Purpose -like "*discipline*") { "✅" } else { "⚠️" }
    $expiry = if ($meta.ExpiryDate -lt (Get-Date)) { "⛔ Expired" } else { "🟢 Active" }

    Write-Host "🔹 $($meta.CovenantID) — $($meta.Name)"
    Write-Host "   Initiator: $($meta.Initiator)"
    Write-Host "   Purpose: $($meta.Purpose)"
    Write-Host "   Status: $status | $expiry | Symbolic Alignment: $symbolic"
    Write-Host ""
}
