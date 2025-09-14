function Audit-VaultEntries {
    param (
        [string]$TxID = "",
        [string]$Action = "",       # "forfeit" or "redeem"
        [datetime]$After = [datetime]::MinValue,
        [datetime]$Before = [datetime]::MaxValue
    )

    if (-not (Test-Path "$vaultLog")) {
        Write-Output "⚠️ Vault log not found at $vaultLog"
        return
    }

    $entries = Get-Content "$vaultLog" | ForEach-Object {
        if ($_ -match "\[(.*?)\] (.*?) \| Time: (.*?)$") {
            [PSCustomObject]@{
                TxID     = $matches[1]
                Message  = $matches[2]
                Time     = [datetime]$matches[3]
                Action   = ($_ -like "*Forfeited*") ? "forfeit" : ($_ -like "*Redeemed*") ? "redeem" : "unknown"
            }
        }
    }

    $filtered = $entries | Where-Object {
        ($_ -ne $null) -and
        ($TxID -eq "" -or $_.TxID -eq $TxID) -and
        ($Action -eq "" -or $_.Action -eq $Action.ToLower()) -and
        ($_.Time -ge $After -and $_.Time -le $Before)
    }

    if ($filtered.Count -eq 0) {
        Write-Output "🔍 No matching vault entries found."
    } else {
        $filtered | Format-Table TxID, Action, Time, Message -AutoSize
    }
}
