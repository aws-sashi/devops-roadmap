async function loadRoadmap() {

    const container = document.getElementById("roadmap-container");

    try {

        const response = await fetch("/api/roadmap");

        if (!response.ok) {
            throw new Error("API request failed");
        }

        const roadmap = await response.json();

        container.innerHTML = "";

        roadmap.forEach((item, index) => {

            const card = document.createElement("div");

            card.className = "roadmap-card";

            card.innerHTML = `
                <div class="roadmap-number">
                    ${String(index + 1).padStart(2, "0")}
                </div>

                <div class="card-header">
                    <div class="icon">${item.icon}</div>
                    <h3>${item.title}</h3>
                </div>

                <p>${item.description}</p>

                <div class="topics">
                    ${item.topics
                        .map(topic => `<span class="topic">${topic}</span>`)
                        .join("")}
                </div>
            `;

            container.appendChild(card);
        });

    } catch (error) {

        console.error(error);

        container.innerHTML = `
            <div class="loading">
                Unable to load roadmap.
            </div>
        `;
    }
}

loadRoadmap();
