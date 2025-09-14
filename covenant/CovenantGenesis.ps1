param (
    [string]$CovenantName,
    [string]$InitiatorID,
    [datetime]$StartDate = (Get-Date),
    [int]$DurationDays = 365,
    [string]$SymbolicPurpose,
    [string]$JusticeTrigger
)

$CovenantID = "COV-" + (Get-Random -Minimum 100000 -Maximum 999999)
$ExpiryDate = $StartDate.AddDays($DurationDays)

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

$LogPath = "C:\Users\hp\metaflowbackend\covenant\Genesis.log"
Add-Content -Path $LogPath -Value "[$(Get-Date)] Covenant $CovenantID registered by $InitiatorID with purpose '$SymbolicPurpose'."

Write-Host "✅ Covenant $CovenantID sanctified and stored at $VaultPath"
