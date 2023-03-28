function setSummonerData(evt) {
  const params = new URLSearchParams(window.location.search);

  params.set('summoner', encodeURIComponent(evt.data.summoner));
  params.set('region', evt.data.region);

  document.location.search = params.toString();
}

function sendSummonerData() {
  const params = new URLSearchParams(window.location.search);
  const paramsObj = { 
    summoner: decodeURIComponent(params.get('summoner')), 
    region: params.get('region') 
  };

  document
    .querySelectorAll('iframe')
    .forEach(iframe => iframe.contentWindow.postMessage(paramsObj, iframe.src));
}

window.addEventListener('load', () => sendSummonerData());
window.addEventListener('message', (evt) => {
  setSummonerData(evt);
  sendSummonerData();
}); 