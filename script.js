let routePreference = "fastest";

const fastestBtn = document.getElementById("fastest-btn");
const impactfulBtn = document.getElementById("impactful-btn");
const impactScoreEl = document.getElementById("impact-score");
const contextSelect = document.getElementById("user-context");
const banner = document.getElementById("context-banner");

fastestBtn.onclick = () => setRoutePreference("fastest");
impactfulBtn.onclick = () => setRoutePreference("impactful");

function setRoutePreference(type) {
    routePreference = type;
    fastestBtn.classList.toggle("active", type === "fastest");
    impactfulBtn.classList.toggle("active", type === "impactful");
    drawRoute();
}

/* ================= MAP ================= */
const map = new maplibregl.Map({
    container: "map",
    style: {
        version: 8,
        sources: {
            osm: {
                type: "raster",
                tiles: [
                    "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png",
                    "https://b.tile.openstreetmap.org/{z}/{x}/{y}.png",
                    "https://c.tile.openstreetmap.org/{z}/{x}/{y}.png"
                ],
                tileSize: 256
            }
        },
        layers: [{ id: "osm", type: "raster", source: "osm" }]
    },
    center: [73.8567, 18.5204], // Pune
    zoom: 12
});

map.addControl(new maplibregl.NavigationControl());

let points = [];
let markers = [];

const panel = document.getElementById("info-panel");
const startInfo = document.getElementById("start-info");
const endInfo = document.getElementById("end-info");
const distanceEl = document.getElementById("distance");
const timeEl = document.getElementById("time");
const modeSelect = document.getElementById("mode");
const landmarkList = document.getElementById("landmarks");

document.getElementById("close-panel").onclick = reset;

map.on("click", async (e) => {
    if (points.length === 2) return;

    const point = [e.lngLat.lng, e.lngLat.lat];
    points.push(point);

    markers.push(
        new maplibregl.Marker({ color: "#e53935" })
            .setLngLat(point)
            .addTo(map)
    );

    if (points.length === 1) {
        startInfo.innerHTML = `<strong>Start:</strong> ${await getAddress(point)}`;
    }

    if (points.length === 2) {
        endInfo.innerHTML = `<strong>End:</strong> ${await getAddress(point)}`;
        panel.classList.remove("hidden");
        loadLandmarks();
        loadPhotos();
        drawRoute();
    }
});

modeSelect.addEventListener("change", drawRoute);
contextSelect.addEventListener("change", drawRoute);

/* ================= ROUTE ================= */
async function drawRoute() {
    if (points.length !== 2) return;

    const profile = modeSelect.value === "bike" ? "bike" : "car";
    const url = `https://router.project-osrm.org/route/v1/${profile}/${points[0][0]},${points[0][1]};${points[1][0]},${points[1][1]}?overview=full&geometries=geojson`;

    const res = await fetch(url);
    const data = await res.json();
    const route = data.routes[0];

    if (map.getSource("route")) {
        map.removeLayer("route");
        map.removeSource("route");
    }

    /* ===== COLOR BY CONTEXT ===== */
    // 🎨 Route color logic (context + preference)
let routeColor = "#1a73e8"; // default blue (normal + fastest)

// Context-based colors (highest priority)
if (contextSelect.value === "emergency") {
    routeColor = "#d32f2f"; // red
}
else if (contextSelect.value === "late-night") {
    routeColor = "#5e35b1"; // purple
}
else if (contextSelect.value === "delivery") {
    routeColor = "#f9a825"; // yellow
}

// Normal + Impactful = GREEN
else if (
    contextSelect.value === "normal" &&
    routePreference === "impactful"
) {
    routeColor = "#2e7d32"; // green
}


    map.addSource("route", {
        type: "geojson",
        data: { type: "Feature", geometry: route.geometry }
    });

    map.addLayer({
        id: "route",
        type: "line",
        source: "route",
        paint: {
            "line-color": routeColor,
            "line-width": 5
        }
    });

    /* ===== DISTANCE & TIME ===== */
    const distanceKm = route.distance / 1000;

    let speed = 35;
    if (modeSelect.value === "bike") speed = 45;
    if (contextSelect.value === "emergency") speed += 10;
    if (contextSelect.value === "late-night") speed -= 5;

    let timeMin = (distanceKm / speed) * 60;
    if (routePreference === "impactful") timeMin += 3;

    distanceEl.textContent = `Distance: ${distanceKm.toFixed(2)} km`;
    timeEl.textContent = `Time: ${timeMin.toFixed(0)} min`;

    updateContextBanner();
}

/* ================= CONTEXT BANNER ================= */
function updateContextBanner() {
    if (contextSelect.value === "emergency") {
        banner.textContent = "🚑 Emergency Mode: Fastest Response";
        banner.style.background = "#ffcdd2";
    }
    else if (contextSelect.value === "late-night") {
        banner.textContent = "🌙 Late Night Mode: Safety First";
        banner.style.background = "#d1c4e9";
    }
    else if (contextSelect.value === "delivery") {
        banner.textContent = "📦 Delivery Mode: Efficient Routing";
        banner.style.background = "#fff9c4";
    }
    else {
        banner.textContent = "Normal Navigation";
        banner.style.background = "#e3f2fd";
    }
}

/* ================= HELPERS ================= */
async function getAddress([lng, lat]) {
    const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
    );
    const data = await res.json();
    return data.display_name || "Unknown location";
}

function loadLandmarks() {
    landmarkList.innerHTML = "";
    ["Public transport access", "Residential area", "Street lighting"].forEach(t => {
        const li = document.createElement("li");
        li.textContent = t;
        landmarkList.appendChild(li);
    });
}

function loadPhotos() {
    document.getElementById("photo1").src =
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=600";
    document.getElementById("photo2").src =
        "https://images.unsplash.com/photo-1500534623283-312aade485b7?w=600";
}

function reset() {
    points = [];
    markers.forEach(m => m.remove());
    markers = [];
    panel.classList.add("hidden");

    if (map.getSource("route")) {
        map.removeLayer("route");
        map.removeSource("route");
    }
}
