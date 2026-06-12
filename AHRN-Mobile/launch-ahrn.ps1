# Launch AHRN from AHRN-Mobile folder (delegates to root script)
$root = Split-Path $PSScriptRoot -Parent
& "$root\launch-ahrn.ps1"
