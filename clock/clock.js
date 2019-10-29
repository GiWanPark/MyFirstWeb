const ymdContainer = document.querySelector(".js-ymd");
const clockContainer = document.querySelector(".js-clock");
const clockTitle = clockContainer.querySelector("h1");
const korDay =["일", "월", "화", "수", "목", "금", "토"];

function getDate()
{
    const date = new Date();
    const today = korDay[date.getDay()];
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    ymdContainer.innerText = `${year} - ${month} - ${day} / ${today}`;
}

function getTime()
{
    const date = new Date();
    const second = date.getSeconds();
    const minute = date.getMinutes();
    const hour = date.getHours();

    clockContainer.innerText = `${hour < 10 ? `0${hour}` : `${hour}`}:${minute < 10 ? `0${minute}` : `${minute}`}:${second < 10 ? `0${second}` : `${second}`}`;
}

function init()
{
    getDate();
    getTime();
    setInterval(getTime, 1000);
}

init();