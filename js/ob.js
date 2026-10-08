fetch("data/ob.json")
    .then(response => response.json())
    .then(data => {

        showRanking(
            data.highspeed.downhill,
            "highspeed-downhill",
            data.totalPridePlayers
        );

        showRanking(
            data.highspeed.hillclimb,
            "highspeed-hillclimb",
            data.totalPridePlayers
        );

        showRanking(
            data.highspeed.allrounder,
            "highspeed-allrounder",
            data.totalPridePlayers
        );


        showRanking(
            data.technical.downhill,
            "technical-downhill",
            data.totalPridePlayers
        );

        showRanking(
            data.technical.hillclimb,
            "technical-hillclimb",
            data.totalPridePlayers
        );

        showRanking(
            data.technical.allrounder,
            "technical-allrounder",
            data.totalPridePlayers
        );

    })
    .catch(error => {

        console.error("Failed to load OB data:", error);

    });


function showRanking(cars, elementId, totalPlayers) {

    const container = document.getElementById(elementId);

    cars.forEach((car, index) => {

        const percentage =
            (car.players / totalPlayers) * 100;

        const row = document.createElement("div");

        row.className = "ranking-row";

        row.innerHTML = `

            <div class="position">
                #${index + 1}
            </div>

            <div class="car-name">
                ${car.car}
            </div>

            <div class="players">
                ${car.players} players
            </div>

            <div class="percentage">
                ${percentage.toFixed(1)}%
            </div>

        `;

        container.appendChild(row);

    });

}
