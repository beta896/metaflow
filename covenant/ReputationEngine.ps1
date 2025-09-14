param (
    [string]$InitiatorID
)

# Define log paths
$GenesisLog = "C:\Users\hp\metaflowbackend\covenant\Genesis.log"
$RenewalLog = "C:\Users\hp\metaflowbackend\covenant\Renewal.log"

# Initialize score
$Score = 0

# Count covenant registrations
$GenesisEntries = Select-String -Path $GenesisLog -Pattern $InitiatorID
$Score += ($GenesisEntries.Count * 10)

# Count successful renewals
$RenewalEntries = Select-String -Path $RenewalLog -Pattern "renewed.*$InitiatorID"
$Score += ($RenewalEntries.Count * 15)

# Penalize failed renewals
$FailedEntries = Select-String -Path $RenewalLog -Pattern "failed.*$InitiatorID"
$Score -= ($FailedEntries.Count * 5)

# Symbolic bonus: if initiator used justice or discipline in covenant purpose
$SymbolicBonus = 0
$CovenantFiles = Get-ChildItem "C:\Users\hp\metaflowbackend\covenant" -Filter "COV-*.json"
foreach ($file in $CovenantFiles) {
    $meta = Get-Content $file.FullName | ConvertFrom-Json
    if ($meta.Initiator -eq $InitiatorID -and ($meta.Purpose -like "*justice*" -or $meta.Purpose -like "*discipline*")) {
        $SymbolicBonus += 10
    }
}
$Score += $SymbolicBonus

# Cap score between 0 and 100
if ($Score -gt 100) { $Score = 100 }
if ($Score -lt 0)   { $Score = 0 }

Write-Host "🧠 Reputation Score for $InitiatorID: $Score"
return $Score
