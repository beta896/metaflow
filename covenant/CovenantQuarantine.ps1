$source = "C:\Users\hp\metaflowbackend\covenant"
$target = "$source\vault\expired"
$log = "$source\Enforcement.log"

if (-not (Test-Path $target)) {
    New-Item -Path $target -ItemType Directory
}

$files = Get-ChildItem $source -Filter *.json

foreach ($file in $files) {
    $data = Get-Content $file.FullName | ConvertFrom-Json
    $expiryRaw = $data.ExpiryDate -replace '[^\d]', ''
    $expiry = (Get-Date "1970-01-01").AddMilliseconds([double]$expiryRaw)

    if ($expiry -lt (Get-Date)) {
        $data.Status = "Quarantined"
        $data | ConvertTo-Json -Depth 5 | Set-Content $file.FullName

        Move-Item -Path $file.FullName -Destination "$target\$($file.Name)" -Force
        Add-Content -Path $log -Value "[$(Get-Date)] 🛑 $($data.CovenantID) quarantined due to expiry."
    }
}
Write-Host "🧾 Quarantine complete. See Enforcement.log for details."
