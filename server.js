const http = require("http");

const port = 8080;
const autor = "Olszówka Paweł";

console.log("Data uruchomienia:", new Date());
console.log("Autor:", autor);
console.log("Port TCP:", port);

const locations = {
    Warszawa: {
        lat: 52.2297,
        lon: 21.0122
    },
    Lublin: {
        lat: 51.2465,
        lon: 22.5684
    },
    Krakow: {
        lat: 50.0647,
        lon: 19.9450
    }
};

const server = http.createServer(async (req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const city = url.searchParams.get("city");
    let weatherHtml = "";
    if (city && locations[city]) {
        const lat = locations[city].lat;
        const lon = locations[city].lon;
        const apiUrl =
            `https://api.open-meteo.com/v1/forecast` +
            `?latitude=${lat}` +
            `&longitude=${lon}` +
            `&current_weather=true`;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            const weather = data.current_weather;
            weatherHtml = `
                <h2>${city}</h2>
                <p>Temperatura: ${weather.temperature} C</p>
                <p>Wiatr: ${weather.windspeed} km/h</p>
            `;
        } catch (err) {
            weatherHtml = `<p>Błąd pobierania pogody</p>`;
        }
    }

    const html = `
        <!DOCTYPE html>
        <html lang="pl">
        <head>
            <meta charset="UTF-8">
            <title>Pogoda</title>
        </head>
        <body>
            <h1>Aplikacja pogodowa</h1>
            <form method="GET">
                <label>Wybierz miasto:</label>
                <select name="city">
                    <option value="Warszawa">Warszawa</option>
                    <option value="Lublin">Lublin</option>
                    <option value="Krakow">Krakow</option>
                </select>
                <button type="submit">
                    Pobierz pogodę
                </button>
            </form>
            ${weatherHtml}
        </body>
        </html>
    `;
    res.writeHead(200, {
        "Content-Type": "text/html; charset=utf-8"
    });
    res.end(html);
});

server.listen(port, () => {
    console.log(`Serwer działa na porcie ${port}`);
});