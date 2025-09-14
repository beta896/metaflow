SSSSSSSSS# CovenantGenesisCLI.ps1
# Interactive CLI for covenant registration

Write-Host "`n?? Covenant Genesis CLI � Register a New Covenant"

$CovenantName     = Read-Host "Enter Covenant Name"
$InitiatorID      = Read-Host "Enter Initiator ID"
$DurationDays     = Read-Host "Enter Duration in Days (default 365)"
if (-not $DurationDays) { $DurationDays = 365 }

$SymbolicPurpose  = Read-Host "Enter Symbolic Purpose (e.g., justice, discipline)"
$JusticeTrigger   = Read-Host "Enter Justice Trigger (e.g., breach, expiry)"

$StartDate        = Get-Date
$ExpiryDate       = $StartDate.AddDays($DurationDays)
$CovenantID       = "COV-" + (Get-Random -Minimum 100000 -Maximum 999999)

$CovenantMeta = @{
    CovenantID      = $CovenantID
    Name            = $CovenantName
    Initiator       = $InitiatorID
    StartDate       = $StartDate
    ExpiryDate      = $ExpiryDate
    Purpose         = $SymbolicPurpose
    JusticeTrigger  = $JusticeTrigger
    RenewalEligible = $true
    Status          = "Active"
}

$VaultPath = "C:\Users\hp\metaflowbackend\covenant\$CovenantID.json"
$CovenantMeta | ConvertTo-Json -Depth 5 | Out-File $VaultPath

Add-Content -Path "C:\Users\hp\metaflowbackend\covenant\Genesis.log" -Value "[$(Get-Date)] Covenant $CovenantID registered by $InitiatorID with purpose '$SymbolicPurpose'."

Write-Host "`n? Covenant $CovenantID registered and stored at $VaultPath"
