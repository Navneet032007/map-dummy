# Impactful Maps 🗺️  
### Context-Aware & Safety-First Navigation System

## 🚀 Overview
Impactful Maps is a reimagined navigation experience that goes beyond “fastest route” logic.
Instead of optimizing only for speed, it introduces **context-aware decision making**, prioritizing
**safety, urgency, and real-world travel conditions**.

This project was built as part of the **Product Reimagination Challenge**, where the goal was not
to clone Google Maps, but to rethink how navigation decisions should work in real life.

---

## 🎯 Problem Statement
Traditional map applications:
- Treat all users the same
- Prioritize speed over safety
- Lack context awareness (emergency, night travel, delivery, etc.)
- Provide little explanation for route decisions

This often leads to:
- Unsafe late-night routes
- Confusing choices during emergencies
- Poor UX for delivery or priority travel

---

## 💡 Solution: Impactful Routing
Impactful Maps introduces **User Context + Route Preference** to influence navigation decisions.

Instead of asking *“Which route is fastest?”*, we ask:
> “Which route makes the most sense **right now**?”

---

## 🧠 Key Features

### 1. Route Preference
- **Fastest** → Optimizes purely for time
- **Impactful** → Accepts slight delays in exchange for safety & reliability

### 2. User Context Modes
Each mode changes route behavior, ETA, and visual feedback:

| Mode | Purpose | Behavior |
|----|----|----|
| Normal | Default travel | Balanced routing |
| 🚑 Emergency | Critical travel | ETA optimized, red route |
| 🌙 Late Night | Safety-first | Safer ETA bias, purple route |
| 📦 Delivery | Efficiency | Optimized flow, yellow route |

### 3. Visual Communication
- Color-coded routes per context
- Context banner explaining decisions
- Clear ETA changes (not hidden logic)

### 4. Nearby Context Awareness
Instead of unreliable live POI data, we surface:
- Safety indicators
- Area characteristics
- Context-relevant landmarks

### 5. Clean, Responsive UI
- Collapsible sidebar
- Scrollable content
- Mobile-friendly layout
- Clear visual hierarchy

---

## ⚙️ Tech Stack
- **Map Rendering**: MapLibre GL JS
- **Routing Engine**: OSRM (Open Source Routing Machine)
- **Geocoding**: OpenStreetMap Nominatim
- **Frontend**: HTML, CSS, Vanilla JavaScript

---

## ⚠️ Known Limitations (Intentional & Honest)

### 1. Route Geometry Differences
In many Indian cities, OSRM returns only one viable route.
Instead of faking alternate paths, this project **focuses on ETA tradeoffs and transparency**.

> We chose **honest decision-making** over misleading visuals.

### 2. Live Safety Data
Real-time crime or lighting data requires paid or government APIs.
This project demonstrates **how such data would be integrated**, without faking it.

---

## 🧪 How to Run
1. Clone the repository
2. Open `index.html` in a browser
3. Select two points on the map
4. Experiment with:
   - Route Preference
   - User Context modes

---

## 📌 Why This Matters
Impactful Maps is not just a map.
It’s a **product statement**:

> Navigation should adapt to people — not force people to adapt to navigation.

---

## 🙌 Future Improvements
- Real-time safety data integration
- Highway vs local road clarity
- Emergency vehicle lane prioritization
- AI-based risk scoring

---

## 🏁 Conclusion
This project demonstrates how **product thinking + engineering decisions**
can transform a familiar tool into a more humane, safer, and smarter system.
# map-dummy
