# Script to fix remaining coin icons in other tabs
$filePath = "components\sections\Coinlist1.js"
$content = Get-Content $filePath -Raw

# NFT tab (tab 5)
$content = $content -replace '<span className="icon-btc"><span className="path1" /><span className="path2" /></span>\s*<span>Immutable X</span>', '<img src={getCoinIconUrl(''IMX'')} alt="Immutable X" style={{width: ''20px'', height: ''20px'', borderRadius: ''50%'', marginRight: ''8px''}} /><span>Immutable X</span>'

$content = $content -replace '<span className="icon-eth"><span className="path1" /><span className="path2" /><span className="path3" /><span className="path4" /></span><span>Flow</span>', '<img src={getCoinIconUrl(''FLOW'')} alt="Flow" style={{width: ''20px'', height: ''20px'', borderRadius: ''50%'', marginRight: ''8px''}} /><span>Flow</span>'

$content = $content -replace '<span className="icon-bnb"><span className="path1" /><span className="path2" /><span className="path3" /><span className="path4" /><span className="path5" /><span className="path6" /></span><span>Enjin Coin</span>', '<img src={getCoinIconUrl(''ENJ'')} alt="Enjin Coin" style={{width: ''20px'', height: ''20px'', borderRadius: ''50%'', marginRight: ''8px''}} /><span>Enjin Coin</span>'

$content = $content -replace '<span className="icon-tether"><span className="path1" /><span className="path2" /></span><span>Chiliz</span>', '<img src={getCoinIconUrl(''CHZ'')} alt="Chiliz" style={{width: ''20px'', height: ''20px'', borderRadius: ''50%'', marginRight: ''8px''}} /><span>Chiliz</span>'

$content = $content -replace '<span className="icon-sol"><span className="path1" /><span className="path2" /><span className="path3" /><span className="path4" /><span className="path5" /></span><span>SuperRare</span>', '<img src={getCoinIconUrl(''RARE'')} alt="SuperRare" style={{width: ''20px'', height: ''20px'', borderRadius: ''50%'', marginRight: ''8px''}} /><span>SuperRare</span>'

$content = $content -replace '<span className="icon-btc"><span className="path1" /><span className="path2" /></span><span>Rarible</span>', '<img src={getCoinIconUrl(''RARI'')} alt="Rarible" style={{width: ''20px'', height: ''20px'', borderRadius: ''50%'', marginRight: ''8px''}} /><span>Rarible</span>'

$content = $content -replace '<span className="icon-ada"><span className="path1" /><span className="path2" /><span className="path3" /><span className="path4" /><span className="path5" /><span className="path6" /><span className="path7" /><span className="path8" /><span className="path9" /></span><span>Ocean Protocol</span>', '<img src={getCoinIconUrl(''OCEAN'')} alt="Ocean Protocol" style={{width: ''20px'', height: ''20px'', borderRadius: ''50%'', marginRight: ''8px''}} /><span>Ocean Protocol</span>'

$content = $content -replace '<span className="icon-avax"><span className="path1" /><span className="path2" /><span className="path3" /><span className="path4" /></span><span>Foundation</span>', '<img src={getCoinIconUrl(''FND'')} alt="Foundation" style={{width: ''20px'', height: ''20px'', borderRadius: ''50%'', marginRight: ''8px''}} /><span>Foundation</span>'

# Gaming tab (tab 6)
$content = $content -replace '<span className="icon-btc"><span className="path1" /><span className="path2" /></span>\s*<span>Render Token</span>', '<img src={getCoinIconUrl(''RENDER'')} alt="Render Token" style={{width: ''20px'', height: ''20px'', borderRadius: ''50%'', marginRight: ''8px''}} /><span>Render Token</span>'

$content = $content -replace '<span className="icon-eth"><span className="path1" /><span className="path2" /><span className="path3" /><span className="path4" /></span><span>Gala</span>', '<img src={getCoinIconUrl(''GALA'')} alt="Gala" style={{width: ''20px'', height: ''20px'', borderRadius: ''50%'', marginRight: ''8px''}} /><span>Gala</span>'

$content = $content -replace '<span className="icon-bnb"><span className="path1" /><span className="path2" /><span className="path3" /><span className="path4" /><span className="path5" /><span className="path6" /></span><span>SuperVerse</span>', '<img src={getCoinIconUrl(''SUPER'')} alt="SuperVerse" style={{width: ''20px'', height: ''20px'', borderRadius: ''50%'', marginRight: ''8px''}} /><span>SuperVerse</span>'

$content = $content -replace '<span className="icon-tether"><span className="path1" /><span className="path2" /></span><span>Beam</span>', '<img src={getCoinIconUrl(''BEAM'')} alt="Beam" style={{width: ''20px'', height: ''20px'', borderRadius: ''50%'', marginRight: ''8px''}} /><span>Beam</span>'

$content = $content -replace '<span className="icon-sol"><span className="path1" /><span className="path2" /><span className="path3" /><span className="path4" /><span className="path5" /></span><span>Big Time</span>', '<img src={getCoinIconUrl(''BIGTIME'')} alt="Big Time" style={{width: ''20px'', height: ''20px'', borderRadius: ''50%'', marginRight: ''8px''}} /><span>Big Time</span>'

$content = $content -replace '<span className="icon-btc"><span className="path1" /><span className="path2" /></span><span>Pixels</span>', '<img src={getCoinIconUrl(''PIXEL'')} alt="Pixels" style={{width: ''20px'', height: ''20px'', borderRadius: ''50%'', marginRight: ''8px''}} /><span>Pixels</span>'

$content = $content -replace '<span className="icon-ada"><span className="path1" /><span className="path2" /><span className="path3" /><span className="path4" /><span className="path5" /><span className="path6" /><span className="path7" /><span className="path8" /><span className="path9" /></span><span>Wilder World</span>', '<img src={getCoinIconUrl(''WILD'')} alt="Wilder World" style={{width: ''20px'', height: ''20px'', borderRadius: ''50%'', marginRight: ''8px''}} /><span>Wilder World</span>'

$content = $content -replace '<span className="icon-avax"><span className="path1" /><span className="path2" /><span className="path3" /><span className="path4" /></span><span>STEPN</span>', '<img src={getCoinIconUrl(''GMT'')} alt="STEPN" style={{width: ''20px'', height: ''20px'', borderRadius: ''50%'', marginRight: ''8px''}} /><span>STEPN</span>'

# Music tab (tab 7)
$content = $content -replace '<span className="icon-btc"><span className="path1" /><span className="path2" /></span>\s*<span>Audius</span>', '<img src={getCoinIconUrl(''AUDIO'')} alt="Audius" style={{width: ''20px'', height: ''20px'', borderRadius: ''50%'', marginRight: ''8px''}} /><span>Audius</span>'

$content = $content -replace '<span className="icon-eth"><span className="path1" /><span className="path2" /><span className="path3" /><span className="path4" /></span><span>Limewire</span>', '<img src={getCoinIconUrl(''LMWR'')} alt="Limewire" style={{width: ''20px'', height: ''20px'', borderRadius: ''50%'', marginRight: ''8px''}} /><span>Limewire</span>'

$content = $content -replace '<span className="icon-bnb"><span className="path1" /><span className="path2" /><span className="path3" /><span className="path4" /><span className="path5" /><span className="path6" /></span><span>Opulous</span>', '<img src={getCoinIconUrl(''OPUL'')} alt="Opulous" style={{width: ''20px'', height: ''20px'', borderRadius: ''50%'', marginRight: ''8px''}} /><span>Opulous</span>'

$content = $content -replace '<span className="icon-tether"><span className="path1" /><span className="path2" /></span><span>CEEK VR</span>', '<img src={getCoinIconUrl(''CEEK'')} alt="CEEK VR" style={{width: ''20px'', height: ''20px'', borderRadius: ''50%'', marginRight: ''8px''}} /><span>CEEK VR</span>'

$content = $content -replace '<span className="icon-sol"><span className="path1" /><span className="path2" /><span className="path3" /><span className="path4" /><span className="path5" /></span><span>JAM</span>', '<img src={getCoinIconUrl(''JAM'')} alt="JAM" style={{width: ''20px'', height: ''20px'', borderRadius: ''50%'', marginRight: ''8px''}} /><span>JAM</span>'

$content = $content -replace '<span className="icon-btc"><span className="path1" /><span className="path2" /></span><span>Bondly</span>', '<img src={getCoinIconUrl(''BONDLY'')} alt="Bondly" style={{width: ''20px'', height: ''20px'', borderRadius: ''50%'', marginRight: ''8px''}} /><span>Bondly</span>'

$content = $content -replace '<span className="icon-ada"><span className="path1" /><span className="path2" /><span className="path3" /><span className="path4" /><span className="path5" /><span className="path6" /><span className="path7" /><span className="path8" /><span className="path9" /></span><span>BeatBind</span>', '<img src={getCoinIconUrl(''BEAT'')} alt="BeatBind" style={{width: ''20px'', height: ''20px'', borderRadius: ''50%'', marginRight: ''8px''}} /><span>BeatBind</span>'

$content = $content -replace '<span className="icon-avax"><span className="path1" /><span className="path2" /><span className="path3" /><span className="path4" /></span><span>Music Protocol</span>', '<img src={getCoinIconUrl(''MUSIC'')} alt="Music Protocol" style={{width: ''20px'', height: ''20px'', borderRadius: ''50%'', marginRight: ''8px''}} /><span>Music Protocol</span>'

# Lưu file
Set-Content -Path $filePath -Value $content -Encoding UTF8

Write-Host "Fixed all remaining coin icons for tabs 5-7 in $filePath"
