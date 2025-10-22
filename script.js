async function fetchData(cik) {
    const response = await fetch(`https://data.sec.gov/api/xbrl/companyconcept/CIK${cik}/dei/EntityCommonStockSharesOutstanding.json`, {
        headers: { 'User-Agent': 'Citizens Financial Group Web App' }
    });
    const data = await response.json();
    const entityName = data.entityName;
    const shares = data.units.shares.filter(entry => entry.fy > '2020' && !isNaN(entry.val));

    const max = shares.reduce((prev, current) => (prev.val > current.val) ? prev : current);
    const min = shares.reduce((prev, current) => (prev.val < current.val) ? prev : current);

    document.getElementById('share-entity-name').innerText = entityName;
    document.getElementById('share-max-value').innerText = max.val;
    document.getElementById('share-max-fy').innerText = max.fy;
    document.getElementById('share-min-value').innerText = min.val;
    document.getElementById('share-min-fy').innerText = min.fy;
}

const urlParams = new URLSearchParams(window.location.search);
const cik = urlParams.get('CIK') || '0000759944';
fetchData(cik);