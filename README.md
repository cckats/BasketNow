# 🏀Basket...Now!!!🏀

A place to find Basketball Courts in your area, View upcoming games, Create your own and Never stop playing.

This React app gets basketball courts and its data from OpenStreetMap (OSM) API (using Overpass scripting language), the map and UI is created on top of leaflet and styled using tailwind css, Queries and states are handled using RTK-Query and the API is writen in ExpressJS and is stored using PostgreSQL.

## 🔗 Website Link
Try it Online [Here!](https://katserver.ddns.net/basketnow)

## ✔ Features
- View all active and non active Courts in your Area
- Mark Courts Full for other Players to avoid
- Check-In to Play at a specific time alone or with a team and request other players to join you
- View currently scheduled matches and join

## 📸 Screenshots
![alt text](/public/screenshots/image.png)
![alt text](/public/screenshots/image-3.png)

## 💻 Run Locally
Clone the project

```bash
  git clone git@github.com:cckats/basketnow.git
```

Go to the project directory

```bash
  cd basketnow
```

Install dependencies

```bash
  npm install
```

Start the App

```bash
  npm run start
```
To run the API server locally you can use JSON Server by changing the APIs baseUrl to your localhost server, removing the JSON server comments and running

```bash
  npm run start:server
```


## 📋 Roadmap
Roadmap can be found [here](https://trello.com/b/O40EcFGc2486)

## 🔗 Links

[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/konstantinos-katsanos-728860309/)

## License

[MIT](https://choosealicense.com/licenses/mit/)