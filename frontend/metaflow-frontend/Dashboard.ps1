Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing

function Show-ProphecyDashboard {
    $form = New-Object System.Windows.Forms.Form
    $form.Text = "🕊️ Prophecy Dashboard"
    $form.Size = '800,600'
    $form.StartPosition = 'CenterScreen'
    $form.Opacity = 0.0

    $timer = New-Object System.Windows.Forms.Timer
    $timer.Interval = 50
    $opacity = 0.0
    $timer.Add_Tick({
        $form.Opacity = $opacity
        $opacity += 0.05
        if ($opacity -ge 1.0) { $timer.Stop() }
    })
    $timer.Start()

    $tabs = New-Object System.Windows.Forms.TabControl
    $tabs.Dock = 'Fill'

    $roles = @("Admin", "User", "Global")
    $colors = @{
        "Admin"  = [System.Drawing.Color]::LavenderBlush
        "User"   = [System.Drawing.Color]::Honeydew
        "Global" = [System.Drawing.Color]::GhostWhite
    }

    foreach ($role in $roles) {
        $tab = New-Object System.Windows.Forms.TabPage
        $tab.Text = $role
        $tab.BackColor = $colors[$role]

        $textBox = New-Object System.Windows.Forms.TextBox
        $textBox.Multiline = $true
        $textBox.Dock = 'Fill'
        $textBox.ScrollBars = 'Vertical'
        $textBox.Font = 'Consolas, 10'
        $textBox.ReadOnly = $true

        $logPath = "Logs\ProphecyTimeline_$role.log"
        if (Test-Path $logPath) {
            $textBox.Text = (Get-Content $logPath | Select-Object -Last 10) -join "`r`n"
        } else {
            $textBox.Text = "No verdicts found for $role."
        }

        $tab.Controls.Add($textBox)
        $tabs.TabPages.Add($tab)
    }

    $form.Controls.Add($tabs)
    $form.ShowDialog()
}