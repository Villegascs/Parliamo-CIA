Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Image]::FromFile("c:\Users\arman_u5omxhq\Desktop\Web\Parliamo cia\Branding\Bhome.png")
$size = [Math]::Max($img.Width, $img.Height)
$square = New-Object System.Drawing.Bitmap $size, $size
$graphics = [System.Drawing.Graphics]::FromImage($square)
$graphics.Clear([System.Drawing.Color]::Transparent)
$x = ($size - $img.Width) / 2
$y = ($size - $img.Height) / 2
$graphics.DrawImage($img, [float]$x, [float]$y, [float]$img.Width, [float]$img.Height)
$graphics.Dispose()
$img.Dispose()
$square.Save("c:\Users\arman_u5omxhq\Desktop\Web\Parliamo cia\favicon.png", [System.Drawing.Imaging.ImageFormat]::Png)
$square.Dispose()
Write-Output "Done"
