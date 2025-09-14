function Check-CovenantExpiry {
    param (
        [string]$TxID,
        [datetime]$StartDate,
        [decimal]$DisciplineScore,
        [decimal]$PromiseRatio
    )

    $Now = Get-Date
    $DaysElapsed = ($Now - $StartDate).Days
    $Expired = $false
    $Reasons = @()

    if ($DaysElapsed -ge 45) {
        $Expired = $true
        $Reasons += "Time threshold exceeded ($DaysElapsed days)"
    }

    if ($DisciplineScore -lt 0.70) {
        $Expired = $true
        $Reasons += "Discipline score decayed ($DisciplineScore)"
    }

    if ($PromiseRatio -gt 1.25) {
        $Expired = $true
        $Reasons += "Promise ratio breached ($PromiseRatio)"
    }

    if ($Expired) {
        $Timestamp = Get-Date -Format "yyyy-MM-ddTHH:mm:ssZ"
        Add-Content -Path "$ledgerPath" -Value "[$TxID] Covenant Expired | Reasons: $($Reasons -join ', ') | Time: $Timestamp"
        Write-Output "⚠️ Covenant $TxID expired due to: $($Reasons -join '; ')"
    } else {
        Write-Output "✅ Covenant $TxID remains active — trust intact"
    }
}
