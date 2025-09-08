# Script to fix final remaining coin icons
$filePath = "components\sections\Coinlist1.js"
$content = Get-Content $filePath -Raw

# Fix remaining individual cases
$content = $content -replace '<span className="icon-bnb"><span className="path1" /><span className="path2" /><span className="path3" /><span className="path4" /><span className="path5" /><span className="path6" /></span><span>STAR</span>', '<img src={getCoinIconUrl(''STAR'')} alt="Starname" style={{width: ''20px'', height: ''20px'', borderRadius: ''50%'', marginRight: ''8px''}} /><span>STAR</span>'

$content = $content -replace '<span className="icon-btc"><span className="path1" /><span className="path2" /></span><span>Grid\+</span> <span className="unit">GRID</span>', '<img src={getCoinIconUrl(''GRID'')} alt="Grid+" style={{width: ''20px'', height: ''20px'', borderRadius: ''50%'', marginRight: ''8px''}} /><span>Grid+</span> <span className="unit">GRID</span>'

# Fix NFT tab remaining
$content = $content -replace '<span className="icon-ada"><span className="path1" /><span className="path2" /><span className="path3" /><span className="path4" /><span className="path5" /><span className="path6" /><span className="path7" /><span className="path8" /><span className="path9" /></span><span>OpenSea</span>', '<img src={getCoinIconUrl(''OCEAN'')} alt="Ocean Protocol" style={{width: ''20px'', height: ''20px'', borderRadius: ''50%'', marginRight: ''8px''}} /><span>OpenSea</span>'

# Fix Gaming tab remaining  
$content = $content -replace '<span className="icon-avax"><span className="path1" /><span className="path2" /><span className="path3" /><span className="path4" /></span><span>GMT</span>', '<img src={getCoinIconUrl(''GMT'')} alt="STEPN" style={{width: ''20px'', height: ''20px'', borderRadius: ''50%'', marginRight: ''8px''}} /><span>GMT</span>'

# Fix Music tab remaining
$content = $content -replace '<span className="icon-sol"><span className="path1" /><span className="path2" /><span className="path3" /><span className="path4" /><span className="path5" /></span><span>Tune\.FM</span>', '<img src={getCoinIconUrl(''JAM'')} alt="JAM" style={{width: ''20px'', height: ''20px'', borderRadius: ''50%'', marginRight: ''8px''}} /><span>Tune.FM</span>'

$content = $content -replace '<span className="icon-btc"><span className="path1" /><span className="path2" /></span><span>Forj \(Bondly\)</span> <span className="unit">BONDLY</span>', '<img src={getCoinIconUrl(''BONDLY'')} alt="Bondly" style={{width: ''20px'', height: ''20px'', borderRadius: ''50%'', marginRight: ''8px''}} /><span>Forj (Bondly)</span> <span className="unit">BONDLY</span>'

$content = $content -replace '<span className="icon-ada"><span className="path1" /><span className="path2" /><span className="path3" /><span className="path4" /><span className="path5" /><span className="path6" /><span className="path7" /><span className="path8" /><span className="path9" /></span><span>MetaBeat</span>', '<img src={getCoinIconUrl(''BEAT'')} alt="BeatBind" style={{width: ''20px'', height: ''20px'', borderRadius: ''50%'', marginRight: ''8px''}} /><span>MetaBeat</span>'

$content = $content -replace '<span className="icon-avax"><span className="path1" /><span className="path2" /><span className="path3" /><span className="path4" /></span><span>Gala Music</span>', '<img src={getCoinIconUrl(''MUSIC'')} alt="Music Protocol" style={{width: ''20px'', height: ''20px'', borderRadius: ''50%'', marginRight: ''8px''}} /><span>Gala Music</span>'

# Clean up any remaining broken tags
$content = $content -replace '<span className="icon-btc"><span className="path1" /><span className="path2" /></span>\s*<span>', '<img src={getCoinIconUrl(''BTC'')} alt="Bitcoin" style={{width: ''20px'', height: ''20px'', borderRadius: ''50%'', marginRight: ''8px''}} /><span>'

$content = $content -replace '<span className="icon-btc"><span className="path1" /><span className="path2" /></span>\s*', '<img src={getCoinIconUrl(''BTC'')} alt="Bitcoin" style={{width: ''20px'', height: ''20px'', borderRadius: ''50%'', marginRight: ''8px''}} />'

# Lưu file
Set-Content -Path $filePath -Value $content -Encoding UTF8

Write-Host "Fixed all final remaining coin icons in $filePath"
