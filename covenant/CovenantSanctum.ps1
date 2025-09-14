# CovenantSanctum.ps1
# Archives expired or fulfilled covenants into sanctum folder

$VaultPath = "C:\Users\hp\metaflowbackend\covenant"
$SanctumPath = "$VaultPath\sanctum"

# Ensure sanctum folder exists
if (!(Test-Path $SanctumPath)) {
    New-Item -Path $SanctumPath -ItemType Directory | Out-Null
}

$CovenantFiles = Get-ChildItem $VaultPath -Filter "COV-*.json"

foreach ($file in $CovenantFiles) {
    $meta = Get-Content $file.FullName | ConvertFrom-Json
    if ($meta.Status -eq "Expired" -or $meta.Status -eq "Fulfilled") {
        $destination = "$SanctumPath\$($file.Name)"
        Move-Item -Path $file.FullName -Destination $destination -Force
        Write-Host "?? Covenant $($meta.CovenantID) archived to sanctum."
    }
}
