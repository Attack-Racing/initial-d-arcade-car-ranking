fetch("data/ta.json")
    .then(response => response.json())
    .then(data => {

        const carTotals = {};

        // Calculate total Top 50 appearances
        data.maps.forEach(map => {

            map.cars.forEach(car => {

                if (!carTotals[car.car]) {
                    carTotals[car.car] = {
                        name: car.car,
                        total: 0,
                        maps: []
                    };
                }

                carTotals[car.car].total += car.top50;

                carTotals[car.car].maps.push({
                    map: map.name,
                    route: map.route,
                    count: car.top50
                });
            });

        });

        // Convert to array and sort
        const rankings =
            Object.values(carTotals)
                .sort((a, b) => b.total - a.total);

        displayRanking(rankings);

    })
    .catch(error => {
        console.error(
            "Failed to load TA data:",
            error
        );
    });


function displayRanking(rankings) {

    const container =
        document.getElementById("ta-ranking");

    if (!container) {
        console.error(
            "TA ranking container not found."
        );
        return;
    }

    rankings.forEach((car, index) => {

        const row =
            document.createElement("div");

        row.className = "ranking-row";

        row.innerHTML = `
            <div class="position">
                #${index + 1}
            </div>

            <div
                class="car-name clickable-car"
                onclick="toggleMaps(${index})"
            >
                ${car.name}
            </div>

            <div class="players">
                Top 50
            </div>

            <div class="percentage">
                ${car.total}
            </div>

            <div
                id="maps-${index}"
                class="map-details"
                style="display:none;"
            >
                ${car.maps.map(map => `
                    <div class="map-entry">
                        <span>
                            ${map.map} ${map.route}
                        </span>

                        <strong>
                            ${map.count}
                        </strong>
                    </div>
                `).join("")}
            </div>
        `;

        container.appendChild(row);

    });
}


function toggleMaps(index) {

    const details =
        document.getElementById(`maps-${index}`);

    if (!details) {
        return;
    }

    if (details.style.display === "none") {
        details.style.display = "block";
    } else {
        details.style.display = "none";
    }
}
