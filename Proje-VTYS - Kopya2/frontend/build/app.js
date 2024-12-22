document.getElementById("comparison-form").addEventListener("submit", function(event) {
    event.preventDefault();  // Sayfanın yenilenmesini engelliyoruz

    // Seçilen futbolcuların ID'lerini al
    const player1 = document.getElementById("player1").value;
    const player2 = document.getElementById("player2").value;

    // Futbolcuların İstatistiklerini Tanımlıyoruz
    const playersData = {
        player1: {
            name: "Lionel Messi",
            age: 36,
            team: "Paris Saint-Germain",
            goals: 750,
            assists: 310
        },
        player2: {
            name: "Cristiano Ronaldo",
            age: 39,
            team: "Al Nassr",
            goals: 800,
            assists: 230
        },
        player3: {
            name: "Neymar",
            age: 31,
            team: "Al Hilal",
            goals: 400,
            assists: 150
        },
        player4: {
            name: "Kylian Mbappé",
            age: 25,
            team: "Paris Saint-Germain",
            goals: 250,
            assists: 120
        }
    };

    // Futbolcuların bilgilerini güncelleriz
    document.getElementById("player1-name").innerText = playersData[player1].name;
    document.getElementById("player2-name").innerText = playersData[player2].name;
    document.getElementById("player1-age").innerText = playersData[player1].age;
    document.getElementById("player2-age").innerText = playersData[player2].age;
    document.getElementById("player1-team").innerText = playersData[player1].team;
    document.getElementById("player2-team").innerText = playersData[player2].team;
    document.getElementById("player1-goals").innerText = playersData[player1].goals;
    document.getElementById("player2-goals").innerText = playersData[player2].goals;
    document.getElementById("player1-assists").innerText = playersData[player1].assists;
    document.getElementById("player2-assists").innerText = playersData[player2].assists;
});

document.getElementById("compare-button").addEventListener("click", function(event) {
    event.preventDefault();  // Sayfanın yenilenmesini engeller

    // Seçilen takımların ID'lerini al
    const team1 = document.getElementById("team1").value;
    const team2 = document.getElementById("team2").value;

    // Takımların İstatistiklerini Tanımlıyoruz
    const teamsData = {
        psg: {
            name: "Paris Saint-Germain",
            trophies: 35,
            foundation: 1970
        },
        al_nassr: {
            name: "Al Nassr",
            trophies: 22,
            foundation: 1955
        },
        al_hilal: {
            name: "Al Hilal",
            trophies: 18,
            foundation: 1957
        },
        man_utd: {
            name: "Manchester United",
            trophies: 50,
            foundation: 1878
        }
    };

    // Seçilen takımların bilgilerini alıyoruz ve HTML'ye yazıyoruz
    document.getElementById("team1-name").innerText = teamsData[team1].name;
    document.getElementById("team2-name").innerText = teamsData[team2].name;
    document.getElementById("team1-trophies").innerText = teamsData[team1].trophies;
    document.getElementById("team2-trophies").innerText = teamsData[team2].trophies;
    document.getElementById("team1-foundation").innerText = teamsData[team1].foundation;
    document.getElementById("team2-foundation").innerText = teamsData[team2].foundation;
});
