Set-Content -Path "CovenantRunner.ps1" -Value @'
# Load Modules
. .\BellLogic.ps1
. .\CommissionEngine.ps1
. .\ProfitsBell.ps1
. .\ArbitrationEngine.ps1

# Symbolic Transaction ID Generator
function New-SymbolicTxID {
    param (
        [string]$Role,
        [string]$Purpose
    )
    $DateStamp = Get-Date -Format "yyyyMMddHHmmss"
    $Symbol = switch ($Purpose) {
        "commission" { "COV" }
        "profit"     { "PRF" }
        "arbitration"{ "ARB" }
        default      { "TXN" }
    }
    return "$Symbol-$Role-$DateStamp"
}

# Role-Based Access Validator
function Validate-RoleAccess {
    param (
        [string]$Role,
        [string]$Action
    )
    $AccessMatrix = @{
        "Brand"       = @("initiateCommission", "distributeProfit")
        "Influencer"  = @("receiveCommission", "submitProof")
        "Arbitrator"  = @("resolveDispute", "reviewBreach")
    }
    if ($AccessMatrix[$Role] -contains $Action) {
        return $true
    } else {
        throw "Access denied for role '$Role' to perform '$Action'"
    }
}

# Immutable Audit Trail
function Write-ImmutableLog {
    param (
        [string]$TxID,
        [string]$Action,
        [string]$Details
    )
    $Timestamp = Get-Date -Format "yyyy-MM-ddTHH:mm:ssZ"
    $RawEntry = "$TxID|$Action|$Details|$Timestamp"
    $Hash = (Get-FileHash -Algorithm SHA256 -InputStream ([System.IO.MemoryStream]::new([System.Text.Encoding]::UTF8.GetBytes($RawEntry)))).Hash
    Add-Content -Path "immutable.log" -Value "$RawEntry|Hash:$Hash"
    Write-Output "Immutable log written for $TxID"
}

# Covenant Validator
function Validate-Covenant {
    param (
        [decimal]$DisciplineScore,
        [decimal]$PromiseRatio
    )
    if ($DisciplineScore -lt 0.75 -or $PromiseRatio -gt 1.2) {
        return "breach"
    } else {
        return "stable"
    }
}

# Justice Trigger
function Trigger-Justice {
    param (
        [string]$TxID,
        [string]$TriggerType,
        [string]$Reason
    )
    $Timestamp = Get-Date -Format "yyyy-MM-ddTHH:mm:ssZ"
    Add-Content -Path "ledger.log" -Value "[$TxID] Justice Trigger → $TriggerType | Reason: $Reason | Time: $Timestamp"
    Ring-Bell -Type "commission" -TxID $TxID
    Write-Output "Justice triggered for $TxID due to: $Reason"
}

# Multi-Arbitrator Consensus
function Resolve-Consensus {
    param (
        [string]$TxID,
        [hashtable]$Votes
    )
    $TotalWeight = 0
    $ValidWeight = 0
    foreach ($arb in $Votes.Keys) {
        $vote = $Votes[$arb]["vote"]
        $weight = $Votes[$arb]["weight"]
        $TotalWeight += $weight
        if ($vote -eq "valid") { $ValidWeight += $weight }
    }
    $Verdict = if ($ValidWeight / $TotalWeight -ge 0.6) { "valid" } else { "invalid" }
    Add-Content -Path "ledger.log" -Value "[$TxID] Consensus Verdict → $Verdict | Time: $(Get-Date -Format "yyyy-MM-ddTHH:mm:ssZ")"
    Write-Output "Consensus verdict for $TxID: $Verdict"
}

# Forgiveness Protocol
function Redeem-Covenant {
    param (
        [string]$TxID,
        [decimal]$RestitutionPaid,
        [decimal]$TimeElapsedDays
    )
    if ($RestitutionPaid -ge 100 -and $TimeElapsedDays -ge 30) {
        Add-Content -Path "ledger.log" -Value "[$TxID] Covenant Redeemed | Restitution: $RestitutionPaid | Time: $(Get-Date -Format "yyyy-MM-ddTHH:mm:ssZ")"
        Write-Output "Covenant redeemed for $TxID — trust restored"
    } else {
        Write-Output "Redemption failed for $TxID — insufficient restitution or time"
    }
}

# Sample Execution
$TxID = New-SymbolicTxID -Role "Brand" -Purpose "commission"
Validate-RoleAccess -Role "Brand" -Action "initiateCommission"
Calculate-Commission -TxID $TxID -Initiator "Brand_B" -Receiver "Influencer_Y" -StakeAmount 1000 -CommissionRate 0.08
Write-ImmutableLog -TxID $TxID -Action "CommissionPayout" -Details "Stake: 1000, Rate: 8%"

$Status = Validate-Covenant -DisciplineScore 0.65 -PromiseRatio 1.3
if ($Status -eq "breach") {
    Trigger-Arbitration -TxID $TxID -Breaches @("Low discipline score", "Promise ratio exceeded")
    $Votes = @{
        "Arb_001" = @{vote="invalid"; weight=0.3}
        "Arb_002" = @{vote="invalid"; weight=0.4}
        "Arb_003" = @{vote="valid"; weight=0.3}
    }
    Resolve-Consensus -TxID $TxID -Votes $Votes
    Redeem-Covenant -TxID $TxID -RestitutionPaid 120 -TimeElapsedDays 45
}
'@