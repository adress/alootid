$ErrorActionPreference = "Stop"

$repoRoot = Resolve-Path (Join-Path $PSScriptRoot "..")
$dist = Join-Path $repoRoot "dist"
$zip = Join-Path $dist "manifest.zip"

if (-not (Test-Path $dist)) {
  throw "dist folder not found. Run npm run build first."
}

if (Test-Path $zip) {
  Remove-Item $zip -Force
}

Compress-Archive -Path (Join-Path $dist "*") -DestinationPath $zip
Write-Host "Package created:" $zip
