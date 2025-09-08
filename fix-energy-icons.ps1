# Script to fix Energy tab remaining icons
$filePath = "components\sections\Coinlist1.js"
$content = Get-Content $filePath -Raw

# Energy tab (tab 4) - remaining coins
$content = $content -replace '<span className="icon-tether"><span className="path1" /><span className="path2" /></span><span>Dione Protocol</span>', '<img src={getCoinIconUrl(''DIONE'')} alt="Dione Protocol" style={{width: ''20px'', height: ''20px'', borderRadius: ''50%'', marginRight: ''8px''}} /><span>Dione Protocol</span>'

$content = $content -replace '<span className="icon-sol"><span className="path1" /><span className="path2" /><span className="path3" /><span className="path4" /><span className="path5" /></span><span>SunContract</span>', '<img src={getCoinIconUrl(''SNC'')} alt="SunContract" style={{width: ''20px'', height: ''20px'', borderRadius: ''50%'', marginRight: ''8px''}} /><span>SunContract</span>'

$content = $content -replace '<span className="icon-btc"><span className="path1" /><span className="path2" /></span><span>Grid+</span>', '<img src={getCoinIconUrl(''GRID'')} alt="Grid+" style={{width: ''20px'', height: ''20px'', borderRadius: ''50%'', marginRight: ''8px''}} /><span>Grid+</span>'

$content = $content -replace '<span className="icon-ada"><span className="path1" /><span className="path2" /><span className="path3" /><span className="path4" /><span className="path5" /><span className="path6" /><span className="path7" /><span className="path8" /><span className="path9" /></span><span>WePower</span>', '<img src={getCoinIconUrl(''WPR'')} alt="WePower" style={{width: ''20px'', height: ''20px'', borderRadius: ''50%'', marginRight: ''8px''}} /><span>WePower</span>'

$content = $content -replace '<span className="icon-avax"><span className="path1" /><span className="path2" /><span className="path3" /><span className="path4" /></span><span>Restart Energy</span>', '<img src={getCoinIconUrl(''MWAT'')} alt="Restart Energy" style={{width: ''20px'', height: ''20px'', borderRadius: ''50%'', marginRight: ''8px''}} /><span>Restart Energy</span>'

# Lưu file
Set-Content -Path $filePath -Value $content -Encoding UTF8

Write-Host "Fixed remaining Energy tab coin icons in $filePath"
