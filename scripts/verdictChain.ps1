function Invoke-VerdictChain {
    param (
        [string]$Action,
        [string]$Tag,
        [string]$Message
    )

    Write-Host "🔗 Triggering Verdict Chain for: $Action"

    node -e "require('./notion/notionSync').logMilestone('$Tag', '$Message')"

    git add .
    git commit -m "$Action — $Message"
    git tag $Tag -m "$Action"
    git push origin main
    git push origin main --tags

    Write-Host "✅ Verdict Chain Complete: $Tag — $Message"
}