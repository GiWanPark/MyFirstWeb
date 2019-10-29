const weather = document.querySelector(".js-weather");

const COORDS = 'coords';
const WEATHER_API = '3856cedaf20a4126bd3861f03df74e02';

function getWeather(lat, long)
{
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${WEATHER_API}&units=metric`
        ).then(function(response){
            // 자바스크립트 오브젝트(json)을 가져온다
            // 왜냐면 json 을 안붙인거는 네트워크 정보가 들어있음
            // json 붙이면 딱 object만 가져옴
            return response.json();
        })
        .then(function(json){
            const temperature = json.main.temp;
            const place = json.name;
            weather.innerText = `${temperature}℃ ${place}`;
        });
        //then 이 하는 일은 함수를 호출 하는데, 데이터가 완전이 들어오면 호출
}

function saveCoords(coordsObj)
{
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position)
{
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude: latitude,
        longitude: longitude
    };

    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError(position)
{
    console.log("Can not access geo location");
}

function askForCoords()
{
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCoords()
{
    const loadedCoords = localStorage.getItem(COORDS); 
    
    if(loadedCoords === null)
    {
        askForCoords();
    }
    else
    {
        const parseCoords = JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }
}

function init(){
    loadCoords();
    setInterval(loadCoords, 3600000);
}


init();