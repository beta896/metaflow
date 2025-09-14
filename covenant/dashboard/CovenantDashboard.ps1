function Show-CovenantDashboard {
    param (
        [string]$TxID = ""
    )

    $ledgerEntries = @()
    $vaultEntries = @()

    if (Test-Path "$ledgerLog") {
        $ledgerEntries = Get-Content "$ledgerLog" | Where-Object { $_ -match "\[(.*?)\]" } | ForEach-Object {
            if ($_ -match "\[(.*?)\] (.*?) \| Time: (.*?)$") {
                [PSCustomObject]@{
                    TxID    = $matches[1]
                    Event   = $matches[2]
                    Time    = $matches[3]
                    Source  = "Ledger"
                }
            }
        }
    }

    if (Test-Path "$vaultLog") {
        $vaultEntries = Get-Content "$vaultLog" | Where-Object { $_ -match "\[(.*?)\]" } | ForEach-Object {
            if ($_ -match "\[(.*?)\] (.*?) \| Time: (.*?)$") {
                [PSCustomObject]@{
                    TxID    = $matches[1]
                    Event   = $matches[2]
                    Time    = $matches[3]
                    Source  = "Vault"
                }
            }
        }
    }

    $allEntries = $ledgerEntries + $vaultEntries

    $filtered = if ($TxID -ne "") {
        $allEntries | Where-Object { $_.TxID -eq $TxID }
    } else {
        $allEntries
    }

    if ($filtered.Count -eq 0) {
        Write-Output "📭 No covenant activity found for TxID '$TxID'"
    } else {
        Write-Host "`n🧭 Covenant Dashboard — Live Testimony" -ForegroundColor Cyan
        $filtered | Sort-Object Time | Format-Table TxID, Source, Event, Time -AutoSize
    }
}
