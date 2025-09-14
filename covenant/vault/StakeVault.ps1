function Vault-Stake {
    param (
        [string]$TxID,
        [string]$Action  # "forfeit" or "redeem"
    )

    $Timestamp = Get-Date -Format "yyyy-MM-ddTHH:mm:ssZ"
    $vaultLog = "C:\Users\hp\metaflowbackend\covenant\vault\vault.log"

    switch ($Action.ToLower()) {
        "forfeit" {
            Add-Content -Path $vaultLog -Value "[$TxID] Stake Held in Vault (Forfeited) | Time: $Timestamp"
            Add-Content -Path $ledgerPath -Value "[$TxID] Vault Entry: Stake Forfeited | Time: $Timestamp"
            Write-Output "🔒 Stake for $TxID held in vault — breach recorded"
        }
        "redeem" {
            Add-Content -Path $vaultLog -Value "[$TxID] Stake Released from Vault (Redeemed) | Time: $Timestamp"
            Add-Content -Path $ledgerPath -Value "[$TxID] Vault Entry: Stake Redeemed | Time: $Timestamp"
            Write-Output "💠 Stake for $TxID released — covenant honored"
        }
        default {
            Write-Output "⚠️ Invalid action. Use 'forfeit' or 'redeem'."
        }
    }
}
