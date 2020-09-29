'use strict';

// 非同期処理で, ある地域の天気を取得する
const getWeatherData = async (area) => {
  // URLを作成する
  const appId = '4b5774e9f3d2a07b84f0f2f88e486224';
  const lang = 'ja';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${area}&appid=${appId}&lang=${lang}`;
  // JSONでDataを取得する
  // 参考にした記事:https://qiita.com/akameco/items/cc73afcdb5ac5d0774bc
  const data = await fetch(url)
    .then(response => response.json())
    .catch(error => console.error(error));
  // catch時の処理
  if (data.cod !== 200) {
    document.getElementById('currentArea').textContent = '通信に失敗した為,天気を取得できませんでした。しばらく経ってから再度お試し下さい。';
    return;
  }
  // Dataを変数に入れる
  const areaName = data.name;
  const icon = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
  const weather = data.weather[0].description;
  const temperature = Math.round(data.main.temp / 10);
  const humidity = data.main.humidity;
  // HTML要素を取得する
  const currentArea = document.getElementById('currentArea');
  const weatherIcon = document.getElementById('weatherIcon');
  const currentWeather = document.getElementById('currentWeather');
  const currentTemperature = document.getElementById('currentTemperature');
  const currentHumidity = document.getElementById('currentHumidity');
  // HTML要素にDataを表示する
  currentArea.textContent = `${areaName}の天気`;
  weatherIcon.src = icon;
  currentWeather.textContent = `天気：${weather}`;
  currentTemperature.textContent = `気温：${temperature}℃`;
  currentHumidity.textContent = `湿度：${humidity}%`;
}

// プルダウンで地域を選択すると, その地域の天気を表示する
const pullDown = document.getElementById('pullDown');
pullDown.addEventListener('change', () => getWeatherData(pullDown.value));

// 標準ではロンドンの天気を表示する
const defaultArea = 'London,GB';
getWeatherData(defaultArea);
