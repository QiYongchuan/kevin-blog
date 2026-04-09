# 生成 Umami HASH_SALT 随机字符串
$bytes = New-Object byte[] 32
$rng = [System.Security.Cryptography.RNGCryptoServiceProvider]::new()
$rng.GetBytes($bytes)
$hashSalt = [Convert]::ToBase64String($bytes)
Write-Host "你的 HASH_SALT:"
Write-Host $hashSalt -ForegroundColor Green
Write-Host ""
Write-Host "复制上面的值，用于 Vercel 环境变量配置"
