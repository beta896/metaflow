# Define input and output
$inputFile = "structure.txt"
$outputFile = "ROADMAP.md"

# Initialize roadmap content
$roadmap = @()
$roadmap += "# 🧭 Backend Roadmap"
$roadmap += "`nGenerated from structure.txt on $(Get-Date)`n"

# Initialize counters
$stats = @{
    TotalFiles = 0
    LegacyFiles = 0
    AuditClean = 0
    MissingAuditTag = 0
}

# Read and process each line
Get-Content $inputFile | ForEach-Object {
    $line = $_.Trim()
    if ($line -eq "") { return }

    $stats.TotalFiles++

    # Categorize by file type
    switch -Regex ($line) {
        "\.js$"         { $category = "JavaScript Logic" }
        "\.json$"       { $category = "Configuration" }
        "\.ps1$"        { $category = "PowerShell Automation" }
        "\.env$"        { $category = "Environment Secrets" }
        "\.yml$|\.yaml$"{ $category = "CI/CD Pipeline" }
        default         { $category = "Miscellaneous" }
    }

    # Detect zones
    if ($line -match "node_modules") { return }
    if ($line -match "legacy")     { $zone = "⚠️ Legacy Zone"; $stats.LegacyFiles++ }
    elseif ($line -match "cli")    { $zone = "🧩 CLI Module" }
    elseif ($line -match "config") { $zone = "🔧 Config Cluster" }
    elseif ($line -match "routes") { $zone = "🌐 Routing Layer" }
    else                           { $zone = "📁 General" }

    # Audit tag check — only if it's a file
    if (Test-Path $line -PathType Leaf) {
    $content = Get-Content $line -Raw
    if ($content -match "@audit-clean") {
        $stats.AuditClean++
    } else {
        $stats.MissingAuditTag++
    }
}

    # Add to roadmap
    $roadmap += "`n## $zone"
    $roadmap += "### ${category}: $line"
}

# Append summary to roadmap
$roadmap += "`n---"
$roadmap += "`n### 📊 Summary"
$roadmap += "Total Files: $($stats.TotalFiles)"
$roadmap += "Legacy Files: $($stats.LegacyFiles)"
$roadmap += "Audit-Clean Files: $($stats.AuditClean)"
$roadmap += "Missing Audit Tags: $($stats.MissingAuditTag)"

# Output to Markdown file
$roadmap | Set-Content $outputFile

Write-Host "✅ Backend roadmap generated: $outputFile"