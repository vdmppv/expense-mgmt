export async function getRate (){
    var url_dollar = 'https://www.nbrb.by/api/exrates/rates/840?parammode=1';
    var url_euro = 'https://www.nbrb.by/api/exrates/rates/978?parammode=1';

    let response = await fetch(url_dollar);
    let data = await response.json();
    
    document.getElementById('usd').textContent = data.Cur_OfficialRate;

    response = await fetch(url_euro);
    data = await response.json();
    document.getElementById('eur').textContent = data.Cur_OfficialRate;
}
