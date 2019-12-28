const CURRENCY_API = `https://quotation-api-cdn.dunamu.com/v1/forex/recent?codes=FRX.KRWGBP`;
const currency = document.querySelector(".js-currency");

function saveCurrencyRate(todayCurrnecyRate)
{
    const span = document.createElement("span");
    span.classList.add("text-white-75");
    span.classList.add("font-weight-light");
    currency.appendChild(span);
    currency.innerText = `Today currency rate
    1 GBP -> KRW
    ${todayCurrnecyRate.basePrice} (${todayCurrnecyRate.changePrice})`;
}

function getCurrencyRate()
{
    fetch(CURRENCY_API).then(function(response){
        return response.json();
    })
    .then(function(json){
        const basePrice = json[0].basePrice;
        const change = json[0].change;
        var changePrice;
        
        if(change === "FALL")
            changePrice = '▼ -' + json[0].changePrice;
        else
            changePrice = '▲ +' + json[0].changePrice;

        const todayCurrnecyRate ={
            basePrice,
            changePrice,
            change
        }
        saveCurrencyRate(todayCurrnecyRate);
    });
}


function init()
{
    getCurrencyRate();
}

init();