fetch("data/ta.json")
    .then(response => response.json())
    .then(data => {

        showRanking(
            data.highspeed.downhill,
            "highspeed-downhill"
        );

        showRanking(
            data.highspeed.hillclimb,
            "highspeed-hillclimb"
        );

        showRanking(
            data.highspeed.allrounder,
            "highspeed-allrounder"
        );


        showRanking(
            data.technical.downhill,
            "technical-downhill"
        );

        showRanking(
            data.technical.hillclimb,
            "technical-hillclimb"
        );

        showRanking(
            data.technical.allrounder,
            "technical-allrounder"
        );

    })
    .catch(error => {

        console.error(
            "Failed to load TA data:",
            error
        );

    });


function showRanking(cars, elementId) {

    const container =
        document.getElementById(elementId);


    cars.forEach((car, index) => {

        const row =
            document.createElement("div");


        row.className = "ranking-row";


        row.innerHTML = `

            <div class="position">
                #${index + 1}
            </div>

            <div class="car-name">
                ${car.car}
            </div>

            <div class="players">
                Top 50
            </div>

            <div class="percentage">
                ${car.top50}
            </div>

        `;


        container.appendChild(row);

    });

}
