function Run-CovenantPulse {
    # Sample covenant registry (replace with real source)
    $covenants = @(
        @{ TxID="COV-Trust-20250701-004"; StartDate="2025-07-01"; DisciplineScore=0.65; PromiseRatio=1.3 },
        @{ TxID="COV-Honor-20250710-007"; StartDate="2025-07-10"; DisciplineScore=0.85; PromiseRatio=1.1 }
    )

    # Load modules
    . "C:\Users\hp\metaflowbackend\covenant\enforcement\CovenantExpiry.ps1"
    . "C:\Users\hp\metaflowbackend\covenant\enforcement\CovenantConsequence.ps1"
    . "C:\Users\hp\metaflowbackend\covenant\vault\StakeVault.ps1"

    foreach ($covenant in $covenants) {
        $TxID = $covenant.TxID
        $StartDate = Get-Date $covenant.StartDate
        $DisciplineScore = [decimal]$covenant.DisciplineScore
        $PromiseRatio = [decimal]$covenant.PromiseRatio

        Write-Host "`n🔍 Scanning $TxID..." -ForegroundColor Yellow

        # Run expiry check
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
            Add-Content -Path "C:\Users\hp\metaflowbackend\covenant\ledger\ledger.log" `
                -Value "[$TxID] Covenant Expired | Reasons: $($Reasons -join ', ') | Time: $Timestamp"
            Write-Host "⚠️ Covenant $TxID expired due to: $($Reasons -join '; ')"

            # Trigger consequence
            Enforce-CovenantConsequence -TxID $TxID -Reasons $Reasons

            # Trigger vault action
            if ($Reasons -contains "Discipline score decayed" -or $Reasons -contains "Promise ratio breached") {
                Vault-Stake -TxID $TxID -Action "forfeit"
            } elseif ($Reasons -contains "Time threshold exceeded") {
                Vault-Stake -TxID $TxID -Action "redeem"
            }
        } else {
            Write-Host "✅ Covenant $TxID remains active — trust intact"
        }
    }
}
