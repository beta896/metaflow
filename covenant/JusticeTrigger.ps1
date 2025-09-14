$source = "C:\Users\hp\metaflowbackend\covenant"
$log = "$source\Justice.log"
$files = Get-ChildItem $source -Filter *.json

foreach ($file in $files) {
    $data = Get-Content $file.FullName | ConvertFrom-Json

    if ($data.Status -eq "Active" -and $data.JusticeTrigger) {
        switch ($data.JusticeTrigger) {
            "MissedStakeWindow" {
                $data.Status = "Violated"
                Add-Content -Path $log -Value "[$(Get-Date)] ⚠️ $($data.CovenantID) violated: MissedStakeWindow"
            }
            "BrokenGuarantee" {
                $data.Status = "UnderReview"
                Add-Content -Path $log -Value "[$(Get-Date)] ⚠️ $($data.CovenantID) flagged: BrokenGuarantee"
            }
            "UnauthorizedAccess" {
                $data.Status = "Violated"
                Add-Content -Path $log -Value "[$(Get-Date)] 🔐 $($data.CovenantID) breached: UnauthorizedAccess"
            }
            default {
                Add-Content -Path $log -Value "[$(Get-Date)] ❓ $($data.CovenantID) unknown justice trigger: $($data.JusticeTrigger)"
            }
        }

        $data | ConvertTo-Json -Depth 5 | Set-Content $file.FullName
    }
}
Write-Host "⚖️ Justice enforcement complete. See Justice.log for violations."
