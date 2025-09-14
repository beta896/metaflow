$CovenantFiles = Get-ChildItem "C:\Users\hp\metaflowbackend\covenant" -Filter *.json
$AuditLog = "C:\Users\hp\metaflowbackend\covenant\AuditTrail.log"

foreach ($file in $CovenantFiles) {
    $data = Get-Content $file.FullName | ConvertFrom-Json
    $issues = @()

    if (-not $data.CovenantID)      { $issues += "Missing CovenantID" }
    if (-not $data.InitiatorID)     { $issues += "Missing InitiatorID" }
    if (-not $data.StartDate)       { $issues += "Missing StartDate" }
    if (-not $data.ExpiryDate)      { $issues += "Missing ExpiryDate" }
    if (-not $data.JusticeTrigger)  { $issues += "Missing JusticeTrigger" }

       if ($expiry -lt (Get-Date))     { $issues += "Expired Covenant" }

    if ($issues.Count -eq 0) {
        Add-Content -Path $AuditLog -Value "[$(Get-Date)] ✅ $($data.CovenantID) passed integrity check."
    } else {
        Add-Content -Path $AuditLog -Value "[$(Get-Date)] ⚠️ $($data.CovenantID) issues: $($issues -join ', ')"
    }
}
Write-Host "🧾 Audit complete. See AuditTrail.log for results."
