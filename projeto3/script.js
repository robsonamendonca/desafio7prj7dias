document.querySelector('.busca').addEventListener('submit', async (event) => {
    event.preventDefault();
    document.querySelector('.resultado').style.display = 'none';
    let input = document.querySelector('#searchInput').value;

    if (input !== '') {
        showWarning('Carregando ...');
        //api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=${API_KEY}`;

        let results = await fetch(url);
        let json = await results.json();
        console.log(json)
        if (json.cod === 200) {
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                tempDescription: json.weather[0].description,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg
            });
        } else {
            showWarning('Não encontramos esta localização');
        }
    }

});

function showInfo(json) {
    showWarning('');

    document.querySelector('.resultado').style.display = 'block';

    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;
    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`;
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`;

    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);
    document.querySelector('.tituloInfo').innerHTML = `${json.tempDescription}`;

    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle - 90}deg)`;

}

function showWarning(msg) {
    document.querySelector('.aviso').innerHTML = msg;
}