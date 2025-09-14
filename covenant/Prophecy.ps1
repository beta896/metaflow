# Prophecy.ps1
# Forecasts covenant renewal likelihood and future trust trajectory

param (
    [string]$InitiatorID
)

$VaultPath = "C:\Users\hp\metaflowbackend\covenant"
$CovenantFiles = Get-ChildItem $VaultPath -Filter "COV-*.json"

$Total = 0
$Renewed = 0
$Expired = 0
$SymbolicAligned = 0

foreach ($file in $CovenantFiles) {
    $meta = Get-Content $file.FullName | ConvertFrom-Json
    if ($meta.Initiator -eq $InitiatorID) {
        $Total++
        if ($meta.Status -eq "Renewed") { $Renewed++ }
        if ($meta.Status -eq "Expired") { $Expired++ }
        if ($meta.Purpose -like "*justice*" -or $meta.Purpose -like "*discipline*") {
            $SymbolicAligned++
        }
    }
}

# Forecast Logic
if ($Total -eq 0) {
    Write-Host "?? No covenants found for $InitiatorID. Prophecy cannot be cast."
    return
}

$RenewalRate = [math]::Round(($Renewed / $Total) * 100, 2)
$SymbolicRate = [math]::Round(($SymbolicAligned / $Total) * 100, 2)
$TrustTrajectory = if ($RenewalRate -ge 75 -and $SymbolicRate -ge 80) { "?? Ascending" } elseif ($RenewalRate -lt 40) { "?? Declining" } else { "? Unstable" }

Write-Host "`n?? Prophecy for $InitiatorID:"
Write-Host "   Total Covenants: $Total"
Write-Host "   Renewal Rate: $RenewalRate%"
Write-Host "   Symbolic Alignment: $SymbolicRate%"
Write-Host "   Trust Trajectory: $TrustTrajectory"
