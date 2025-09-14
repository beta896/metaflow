# VaultAudit.ps1
# Scans covenant vault for lifecycle integrity and symbolic alignment

$VaultPath = "C:\Users\hp\metaflowbackend\covenant"
$CovenantFiles = Get-ChildItem $VaultPath -Filter "COV-*.json"

foreach ($file in $CovenantFiles) {
    $meta = Get-Content $file.FullName | ConvertFrom-Json
    $issues = @()

    # Check expiry mismatch
    if ($meta.ExpiryDate -lt (Get-Date) -and $meta.Status -ne "Expired") {
        $issues += "⚠️ Expired covenant not marked as expired"
    }

    # Check missing justice trigger
    if ([string]::IsNullOrWhiteSpace($meta.JusticeTrigger)) {
        $issues += "⚠️ Missing justice trigger"
    }

    # Check symbolic misalignment
    if ($meta.Purpose -notlike "*justice*" -and $meta.Purpose -notlike "*discipline*") {
        $issues += "⚠️ Symbolic misalignment"
    }

    # Output audit result
    if ($issues.Count -gt 0) {
        Write-Host "`n🔍 Covenant $($meta.CovenantID) Audit:"
        $issues | ForEach-Object { Write-Host $_ }
    }
}
