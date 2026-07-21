Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Image]::FromFile("c:\Users\arman_u5omxhq\Desktop\Web\Parliamo cia\Branding\Bhome.png")
Write-Output "Width: $($img.Width), Height: $($img.Height)"
$img.Dispose()
