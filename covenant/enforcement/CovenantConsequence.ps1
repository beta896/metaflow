function Enforce-CovenantConsequence {
    param (
        [string]$TxID,
        [string[]]$Reasons
    )

    $Timestamp = Get-Date -Format "yyyy-MM-ddTHH:mm:ssZ"

    if ($Reasons -contains "Discipline score decayed" -or $Reasons -contains "Promise ratio breached") {
        # Stake forfeiture logic
        Add-Content -Path "$ledgerPath" `
            -Value "[$TxID] Stake Forfeited | Triggered by: $($Reasons -join ', ') | Time: $Timestamp"
        Write-Output "🔥 Stake forfeited for $TxID — covenant failed with breach"
    }
    elseif ($Reasons -contains "Time threshold exceeded") {
        # Redemption logic
        Add-Content -Path "$ledgerPath" `
            -Value "[$TxID] Stake Redeemed | Covenant expired honorably | Time: $Timestamp"
        Write-Output "💎 Stake redeemed for $TxID — covenant expired with dignity"
    }
    Vault-Stake -TxID $TxID -Action "forfeit"  # or "redeem"


}
