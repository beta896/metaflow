param (
  [string]$Decision = "?? Scale",
  [string]$Rationale = "Strong affiliate traction, low volatility",
  [int]$Impact = 850,
  [string[]]$Tags = @("crypto", "affiliate"),
  [string]$VerdictID = "verdict-001"
)

$notionToken = "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"
$databaseId = "25f70788ec6380408806000cecea5e11"

$headers = @{
  "Authorization" = "Bearer $notionToken"
  "Notion-Version" = "2022-06-28"
  "Content-Type" = "application/json"
}

$tagObjects = @()
foreach ($tag in $Tags) {
  $tagObjects += @{ name = $tag }
}

$body = @{
  parent = @{ database_id = $databaseId }
  properties = @{
    Decision = @{ select = @{ name = $Decision } }
    Rationale = @{ rich_text = @(@{ text = @{ content = $Rationale } }) }
    Impact = @{ number = $Impact }
    Tags = @{ multi_select = $tagObjects }
    Timestamp = @{ date = @{ start = (Get-Date).ToString("o") } }
    VerdictID = @{ rich_text = @(@{ text = @{ content = $VerdictID } }) }
  }
} | ConvertTo-Json -Depth 10

Invoke-RestMethod -Uri "https://api.notion.com/v1/pages" -Method Post -Headers $headers -Body $body
