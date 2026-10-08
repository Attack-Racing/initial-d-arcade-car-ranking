fetch("data/cars.json")
    .then(response => response.json())
    .then(data => {

        const container =
            document.getElementById("car-list");

        Object.values(data).forEach(car => {

            const card =
                document.createElement("div");

            card.className = "ranking-row";

            card.innerHTML = `
                <div class="car-name">
                    ${car.name}
                </div>

                <div class="players">
                    ${car.category}
                </div>

                <div class="percentage">
                    ${car.subCategory}
                </div>
            `;

            container.appendChild(card);
        });

    })
    .catch(error => {
        console.error(
            "Failed to load car data:",
            error
        );
    });
