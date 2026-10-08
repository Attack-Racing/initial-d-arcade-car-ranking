```javascript
Promise.all([
    fetch("data/ta.json").then(response => response.json()),
    fetch("data/maps.json").then(response => response.json())
])

.then(([taData, mapsData]) => {

    const carTotals = {};

    /*
     * Read every TA entry
     */
    taData.entries.forEach(entry => {

        const map =
            mapsData[entry.map];

        if (!map) {

            console.warn(
                "Map not found:",
                entry.map
            );

            return;
        }


        /*
         * Create car entry if it doesn't exist
         */
        if (!carTotals[entry.car]) {

            carTotals[entry.car] = {

                name: entry.car,

                total: 0,

                maps: []

            };

        }


        /*
         * Add Top 50 appearances
         */
        carTotals[entry.car].total +=
            entry.top50;


        /*
         * Save map information
         */
        carTotals[entry.car].maps.push({

            name: map.name,

            route: map.route,

            category: map.category,

            count: entry.top50

        });

    });


    /*
     * Convert object to array
     * and sort by total Top 50 appearances
     */
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


/*
 * Display the ranking
 */
function displayRanking(rankings) {

    const container =
        document.getElementById("ta-ranking");


    if (!container) {

        console.error(
            "TA ranking container not found."
        );

        return;

    }


    container.innerHTML = "";


    rankings.forEach((car, index) => {


        const wrapper =
            document.createElement("div");


        wrapper.className =
            "ta-car";


        /*
         * Create main ranking row
         */
        const row =
            document.createElement("div");


        row.className =
            "ranking-row";


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

        `;


        /*
         * Create map details
         */
        const details =
            document.createElement("div");


        details.id =
            `maps-${index}`;


        details.className =
            "map-details";


        details.style.display =
            "none";


        car.maps.forEach(map => {


            const mapEntry =
                document.createElement("div");


            mapEntry.className =
                "map-entry";


            mapEntry.innerHTML = `

                <span>
                    ${map.name}
                    ${map.route}
                </span>

                <strong>
                    ${map.count}
                </strong>

            `;


            details.appendChild(
                mapEntry
            );

        });


        wrapper.appendChild(row);

        wrapper.appendChild(details);

        container.appendChild(wrapper);

    });

}


/*
 * Open / close map information
 */
function toggleMaps(index) {

    const details =
        document.getElementById(
            `maps-${index}`
        );


    if (!details) {

        return;

    }


    if (
        details.style.display ===
        "none"
    ) {

        details.style.display =
            "block";

    }

    else {

        details.style.display =
            "none";

    }

}
```
