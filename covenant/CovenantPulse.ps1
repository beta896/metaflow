# CovenantPulse.ps1
# Daily scan and enforcement of covenant lifecycle and symbolic integrity

$VaultPath = "C:\Users\hp\metaflowbackend\covenant"
$RenewalScript = "$VaultPath\RenewalProtocol.ps1"

$CovenantFiles = Get-ChildItem $VaultPath -Filter "COV-*.json"

Write-Host "`n?? CovenantPulse — $(Get-Date)`n"

foreach ($file in $CovenantFiles) {
    $meta = Get-Content $file.FullName | ConvertFrom-Json
    $CovenantID = $meta.CovenantID

    # Check expiry
    if ($meta.ExpiryDate -lt (Get-Date) -and $meta.Status -ne "Expired") {
        Write-Host "?? Covenant $CovenantID expired — invoking renewal protocol..."
        & $RenewalScript -CovenantID $CovenantID
    }

    # Symbolic misalignment alert
    if ($meta.Purpose -notlike "*justice*" -and $meta.Purpose -notlike "*discipline*") {
        Write-Host "?? Covenant $CovenantID lacks symbolic alignment."
    }
}
