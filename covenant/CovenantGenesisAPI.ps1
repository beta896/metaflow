Add-Type -AssemblyName System.Net
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:9090/")
$listener.Start()
Write-Host "🌐 CovenantGenesisAPI listening on http://localhost:9090/"

while ($listener.IsListening) {
    $context = $listener.GetContext()
    $request = $context.Request
    $response = $context.Response

    if ($request.HttpMethod -eq "POST" -and $request.ContentType -like "application/json*") {
        $reader = New-Object IO.StreamReader $request.InputStream
        $body = $reader.ReadToEnd()
        $reader.Close()

        $params = $body | ConvertFrom-Json

        $CovenantID = "COV-" + (Get-Random -Minimum 100000 -Maximum 999999)
        $StartDate = Get-Date
        $ExpiryDate = $StartDate.AddDays([int]$params.DurationDays)

        $meta = @{
            CovenantID      = $CovenantID
            Name            = $params.CovenantName
            Initiator       = $params.InitiatorID
            StartDate       = $StartDate
            ExpiryDate      = $ExpiryDate
            Purpose         = $params.SymbolicPurpose
            JusticeTrigger  = $params.JusticeTrigger
            RenewalEligible = $true
            Status          = "Active"
        }

        $VaultPath = "C:\Users\hp\metaflowbackend\covenant\$CovenantID.json"
        $meta | ConvertTo-Json -Depth 5 | Out-File $VaultPath

        Add-Content -Path "C:\Users\hp\metaflowbackend\covenant\Genesis.log" -Value "[$(Get-Date)] Covenant $CovenantID registered via API by $($params.InitiatorID)."

        $response.StatusCode = 200
        $msg = "✅ Covenant $CovenantID registered successfully."
        $buffer = [System.Text.Encoding]::UTF8.GetBytes($msg)
        $response.OutputStream.Write($buffer, 0, $buffer.Length)
        $response.Close()
    } else {
        $response.StatusCode = 400
        $msg = "❌ Invalid request. Use POST with Content-Type: application/json."
        $buffer = [System.Text.Encoding]::UTF8.GetBytes($msg)
        $response.OutputStream.Write($buffer, 0, $buffer.Length)
        $response.Close()
    }
}
