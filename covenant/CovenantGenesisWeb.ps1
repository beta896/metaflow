# CovenantGenesisWeb.ps1
# Launches a local web server for covenant registration

Add-Type -AssemblyName System.Net
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:8080/")
$listener.Start()
Write-Host "?? CovenantGenesisWeb listening on http://localhost:8080/"

while ($listener.IsListening) {
    $context = $listener.GetContext()
    $request = $context.Request
    $response = $context.Response

    if ($request.HttpMethod -eq "POST") {
        $reader = New-Object IO.StreamReader $request.InputStream
        $body = $reader.ReadToEnd()
        $reader.Close()

        $params = $body -split "&" | ForEach-Object {
            $kv = $_ -split "="
            @{ ($kv[0]) = [System.Web.HttpUtility]::UrlDecode($kv[1]) }
        } | Merge-Hashtable

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

        Add-Content -Path "C:\Users\hp\metaflowbackend\covenant\Genesis.log" -Value "[$(Get-Date)] Covenant $CovenantID registered via web by $($params.InitiatorID)."

        $response.StatusCode = 200
        $msg = "? Covenant $CovenantID registered successfully."
        $buffer = [System.Text.Encoding]::UTF8.GetBytes($msg)
        $response.OutputStream.Write($buffer, 0, $buffer.Length)
        $response.Close()
    } else {
        $html = @"
<html>
<head><title>Covenant Genesis Web</title></head>
<body>
<h2>Register a New Covenant</h2>
<form method='POST'>
Name: <input name='CovenantName'><br>
Initiator ID: <input name='InitiatorID'><br>
Duration (days): <input name='DurationDays' value='365'><br>
Symbolic Purpose: <input name='SymbolicPurpose'><br>
Justice Trigger: <input name='JusticeTrigger'><br>
<input type='submit' value='Register Covenant'>
</form>
</body>
</html>
"@
        $buffer = [System.Text.Encoding]::UTF8.GetBytes($html)
        $response.ContentType = "text/html"
        $response.OutputStream.Write($buffer, 0, $buffer.Length)
        $response.Close()
    }
}

function Merge-Hashtable {
    $merged = @{}
    foreach ($h in $args) {
        foreach ($key in $h.Keys) {
            $merged[$key] = $h[$key]
        }
    }
    return $merged
}
