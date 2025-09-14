$expiredVault = "C:\Users\hp\metaflowbackend\covenant\vault\expired"
$log = "C:\Users\hp\metaflowbackend\covenant\Renewal.log"
$files = Get-ChildItem $expiredVault -Filter *.json

foreach ($file in $files) {
    $data = Get-Content $file.FullName | ConvertFrom-Json

    if ($data.RenewalEligible -eq $true) {
        $newExpiry = (Get-Date).AddDays(90)
        $newExpiryUnix = [math]::Round(($newExpiry - (Get-Date "1970-01-01")).TotalMilliseconds)
        $data.ExpiryDate = "/Date($newExpiryUnix)/"
        $data.Status = "Active"

        $data | ConvertTo-Json -Depth 5 | Set-Content $file.FullName
        Move-Item -Path $file.FullName -Destination "C:\Users\hp\metaflowbackend\covenant\$($file.Name)" -Force

        Add-Content -Path $log -Value "[$(Get-Date)] 🔁 $($data.CovenantID) renewed and reactivated."
    }
}
Write-Host "🔁 Renewal complete. See Renewal.log for details."