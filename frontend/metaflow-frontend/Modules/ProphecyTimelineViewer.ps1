function Show-ProphecyTimelineViewer {
    Add-Type -AssemblyName System.Windows.Forms
    $form = New-Object Windows.Forms.Form
    $form.Text = "Prophecy Timeline Viewer"
    $form.Width = 700
    $form.Height = 500

    $listBox = New-Object Windows.Forms.ListBox
    $listBox.Dock = 'Left'
    $listBox.Width = 200
    $form.Controls.Add($listBox)

    $textBox = New-Object Windows.Forms.TextBox
    $textBox.Multiline = $true
    $textBox.Dock = 'Fill'
    $textBox.ScrollBars = 'Vertical'
    $form.Controls.Add($textBox)

    $archivePath = "C:\Users\hp\metaflow-frontend\Archives"
    $archives = Get-ChildItem $archivePath -Filter *.json
    foreach ($file in $archives) {
        $listBox.Items.Add($file.Name)
    }

    $listBox.Add_SelectedIndexChanged({
        $selected = $listBox.SelectedItem
        $path = Join-Path $archivePath $selected
        if (Test-Path $path) {
            $textBox.Text = Get-Content $path -Raw
        }
    })

    $form.ShowDialog()
}
