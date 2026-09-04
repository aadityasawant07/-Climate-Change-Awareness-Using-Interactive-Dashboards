# 🌍 Climate Change Awareness Using Interactive Dashboards (EcoPulse 3D)

> **College Capstone Engineering Project (CEP) • Academic & Enterprise Edition**  
> An interactive, data-driven 3D environmental intelligence platform designed to spread climate change awareness through real-time meteorological feeds, ambient air quality tracking, spatial GIS comparison, automated AI climate insights, and personalized carbon mitigation tracking.

---

## 🌟 Key Highlights & Major Features

### 1. 🌐 Interactive 3D WebGL Earth Globe
- Custom **Three.js procedural WebGL sphere** with realistic orbiting cloud layers and atmospheric Rayleigh scattering glow.
- Interactive raycasted planetary hotspots representing climate vulnerabilities (e.g. Arctic Sea Ice Decline, Amazon Basin Deforestation, Great Barrier Reef Coral Bleaching).
- Smooth orbital mouse and touch controls with auto-rotation.

### 2. 🌦️ Real-Time Weather & 7-Day Meteorological Outlook
- Real-time station telemetry via **Open-Meteo REST APIs** (zero API keys required).
- Current ambient temperature, apparent feels-like temperature, relative humidity, wind velocity, and active precipitation.
- 7-day daily high/low forecast outlook with rain probability percentages.
- Debounced global city search with instant geocoding.

### 3. 💨 Continuous Air Quality Index (AQI) & Chemical Tracking
- US EPA 5-tier standard classification (*Good, Moderate, Poor, Very Poor, Hazardous*).
- Multi-pollutant chemical concentration breakdown:
  - PM2.5 (Fine Particulate Matter)
  - PM10 (Coarse Dust)
  - NO2 (Nitrogen Dioxide)
  - SO2 (Sulfur Dioxide)
  - CO (Carbon Monoxide)
  - O3 (Photochemical Ozone)
  - UV Index (Solar Ultraviolet Radiation)
- Localized health advisories for sensitive demographics.

### 4. 🗺️ Spatial GIS Climate Map & Dual-City Comparison
- Interactive **Leaflet GIS mapping** with **CartoDB Dark Matter** basemaps.
- Side-by-side environmental comparison tool allowing users to evaluate any two global cities simultaneously across thermal stress, pollution, and composite hazard vulnerability.

### 5. 🤖 Automated AI Climate Insights Engine
- Hybrid multi-variable reasoning engine analyzing temperature, AQI, particulate matter, precipitation, and risk scores.
- Generates structured **Climate Intelligence Summaries**:
  - *Overall Ecological Condition* (*Favorable, Moderate, Stressed, Severe, Critical*)
  - *Primary Key Observation*
  - *Air Quality & Thermal Stress Vectors*
  - *Prioritized Action Checklist* (4–6 actionable individual and community interventions)
- 100% deterministic fallback reliability with optional Google Gemini API integration via `VITE_GEMINI_API_KEY`.
- Clear data provenance badges (`[AI-GENERATED INSIGHT]`, `[RULE-BASED ENGINE]`, `[LIVE DATA]`).

### 6. 🔔 Automated Climate Alerts & User Notification Center
- Real-time hazard threshold evaluation:
  - ⚠️ **Air Quality Alert**: Triggered when AQI >= 101 (Poor/Hazardous).
  - 🌡️ **Heat Stress Advisory**: Triggered on surface temperatures >= 33°C.
  - 🌧️ **Severe Weather & Deluge Warning**: Triggered on precipitation >= 20mm or thunderstorm WMO codes.
  - 🛡️ **Composite Risk Notice**: Triggered when the vulnerability index breaches >= 75/100.
- Navbar notification bell with real-time unread badge counter.
- Full Environmental Alert Center modal for severity filtering, reading, and clearing alerts.

### 7. 🌱 Climate Action Score Calculator & Certification
- Interactive assessment across **7 core sustainability areas**:
  1. *Electricity & Energy Efficiency*
  2. *Public & Active Transit*
  3. *Waste Reduction & Composting*
  4. *Single-Use Plastic Avoidance*
  5. *Water Conservation*
  6. *Native Tree Planting & Urban Forestry*
  7. *Clean Renewable Energy Adoption*
- Computes 0–100 Action Score, Eco-Grade (A+ to F), and estimated CO2 avoided (kg/year).
- Generates official **Certificate of Climate Action Pledge** with celebration confetti.

### 8. 👤 Personal User Dashboard & Gamified Badges
- Persistent client-side database layer (**IndexedDB + LocalStorage**) with salted **SHA-256 password hashing**.
- Historical score trajectory area charts.
- Saved observatory locations with live telemetry.
- **7 Planetary Stewardship Badges**:
  - 🌱 *First Step*
  - ♻️ *Eco Recycler*
  - 🚲 *Green Traveler*
  - 🌳 *Tree Champion*
  - ⚡ *Clean Energy Pioneer*
  - 🔥 *Climate Hero*
  - 🌍 *Global Observer*

### 9. 📄 Official Climate & Environmental Report Generator
- Formal 9-section ecological audit document compilation.
- 1-Click **Print / Save as PDF** formatted with clean `@media print` typography.
- Document ID verification and scientific citation footnotes.

### 10. 🛡️ Admin Platform Analytics & Alert Management
- Role-based authorization (`role: 'admin'`).
- Platform Overview: Total users, active accounts, completed assessments, average score, most pinned cities.
- Recharts visualizations: Registration growth, score distribution, regional risk proportions.
- Alert resolution workflows and 1-click **CSV Data Export**.

### 11. 🎓 Guided 8-Step College CEP Presentation Tour
- Interactive presentation walkthrough designed specifically for college evaluators and academic viva presentations.
- Accessible via the **"🎓 CEP Demo"** button in the navigation bar.

---

## 🛠️ Technology Stack

| Category | Technologies / Libraries |
| :--- | :--- |
| **Frontend Framework** | React 18, TypeScript, Vite Bundler |
| **Styling & UI** | Tailwind CSS (Glassmorphism design system), Lucide React Icons |
| **3D Graphics** | Three.js (WebGL procedural shaders, orbit controls) |
| **Data Visualization** | Recharts (Responsive Area, Bar, Composed, and Pie Charts) |
| **Spatial Mapping** | Leaflet 1.9, React-Leaflet, CartoDB Dark Matter tiles |
| **Database & Storage** | Client-side IndexedDB + LocalStorage relational schema |
| **Security & Cryptography** | Web Crypto API (`crypto.subtle.digest` SHA-256 with cryptographic salt) |
| **Animations & FX** | Canvas Confetti, Tailwind CSS keyframe transitions |

---

## 📡 Scientific Data Sources & Citations

1. **Open-Meteo REST APIs** (`https://api.open-meteo.com/v1/`): Real-time global meteorological forecasts, apparent temperature, and CAMS air quality.
2. **NASA GISTEMP v4**: Historical global surface temperature anomaly series (1880–2024).
3. **NOAA NCEI**: Global precipitation anomalies and drought severity indices.
4. **IPCC Sixth Assessment Report (AR6)**: Shared Socioeconomic Pathways (SSP1-2.6, SSP2-4.5, SSP5-8.5) and sectoral CO2 emissions.
5. **Mauna Loa Observatory**: Atmospheric carbon dioxide Keeling curve baseline (426.2 ppm).

---

## 📂 Project Structure

```text
CEP/
├── public/
├── src/
│   ├── components/
│   │   ├── 3d/               # Three.js 3D WebGL Earth Globe
│   │   ├── actions/          # Climate Score Calculator & Certificate Modal
│   │   ├── admin/            # Admin Analytics & Alert Management Panels
│   │   ├── alerts/           # Notification Bell & Alert Center Modals
│   │   ├── auth/             # Login, Registration & Route Guards
│   │   ├── awareness/        # 7 Climate Science Pillar Interactive Modules
│   │   ├── dashboard/        # Stat Cards & Recharts Historical Graphs
│   │   ├── demo/             # Guided 8-Step CEP Presentation Walkthrough
│   │   ├── insights/         # AI & Rule-Based Climate Intelligence Summaries
│   │   ├── layout/           # Navbar, Footer, Ticker, Toast Notifications
│   │   ├── map/              # Leaflet GIS Map & Dual-City Comparison
│   │   ├── personal/         # Personal Dashboard, Score History, Saved Cities
│   │   ├── report/           # 9-Section Printable Climate Report Modal
│   │   └── weather/          # Real-Time Weather, AQI & Risk Score Cards
│   ├── context/
│   │   └── AuthContext.tsx   # Global Authentication, Alerts & User State
│   ├── data/
│   │   ├── achievementsData.ts # 7 Badge Definitions & Requirements
│   │   └── climateData.ts      # NASA / NOAA / IPCC Empirical Baselines
│   ├── pages/
│   │   ├── AboutPage.tsx     # Academic CEP Problem Statement & Documentation
│   │   ├── ActionsPage.tsx   # Action Score & Personal Carbon Mitigation
│   │   ├── AdminPage.tsx     # Role-Protected Administrator Command Center
│   │   ├── AwarenessPage.tsx # 7 Core Science Educational Pillars
│   │   ├── DashboardPage.tsx # Interactive Live Telemetry & Historical Trends
│   │   ├── GlobePage.tsx     # Full-Screen 3D Earth Explorer
│   │   ├── HistoryPage.tsx   # Personal Assessment Score Timeline
│   │   ├── HomePage.tsx      # Modern Landing Page with 5-Step Guide
│   │   ├── LoginPage.tsx     # Authentication Hub (Login / Register)
│   │   ├── MapPage.tsx       # GIS Climate Map & City Comparison
│   │   ├── MyDashboardPage.tsx # Personal User Command Center
│   │   ├── ProfilePage.tsx   # User Settings & Security Management
│   │   ├── ReportPage.tsx    # Standalone Climate Report Builder
│   │   └── SavedCitiesPage.tsx # Pinned Observatories Telemetry Grid
│   ├── services/
│   │   ├── aiInsightsService.ts   # Multi-Variable Environmental Reasoning
│   │   ├── authService.ts         # SHA-256 Hashing, Sessions, Demo Seeder
│   │   ├── db.ts                  # IndexedDB / LocalStorage Relational Layer
│   │   ├── reportExportService.ts # CSV Dataset Exporters & Print Handler
│   │   └── weatherApi.ts          # Open-Meteo REST API Integrations
│   ├── types/
│   │   ├── climate.ts        # Climate, Weather, AQI & Chart TypeScript Models
│   │   └── user.ts           # User, Session, Alert & History TypeScript Models
│   ├── App.tsx               # Main Application Root & Tab Router
│   ├── index.css             # Tailwind Directives & Custom Glassmorphism Styles
│   └── main.tsx              # Application Entry Point
├── index.html                # SEO Metadata & Leaflet Dependencies
├── package.json              # Project Dependencies & Build Scripts
├── tailwind.config.js        # Custom Nature/Climate Theme Configuration
├── tsconfig.json             # Strict TypeScript Configuration
└── vite.config.ts            # Vite Build & Development Server Config
```

---

## 🚀 Getting Started & Local Setup

### Prerequisites
- **Node.js** (v18.0.0 or higher recommended)
- **npm** (v9.0.0 or higher)

### 1. Clone & Navigate
```bash
cd CEP
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```
Open your web browser and navigate to: **`http://localhost:3000`**

### 4. Build for Production
```bash
npm run build
```
Generates a production-ready optimized bundle in the `dist/` directory (**0 errors, TypeScript strict mode verified**).

---

## 🔑 Pre-Seeded Demo Accounts for College Presentation

To simplify evaluation and live demonstration, the platform includes two pre-seeded 1-click accounts:

### 1. Standard User Demo Account
- **Email:** `demo@ecopulse.org`
- **Password:** `EcoPulse#2026`
- **Pre-loaded with:**
  - 5 months of historical assessment scores and improvement trajectory.
  - 3 pinned global observatories (*Tokyo, London, Miami*).
  - 6 unlocked planetary stewardship badges.
  - Active environmental alerts.

### 2. Administrator Demo Account
- **Email:** `admin@ecopulse.org`
- **Password:** `EcoPulse#Admin2026`
- **Access to:**
  - Admin Command Center (`/admin`).
  - Platform health overview and registration growth charts.
  - Environmental alert resolution console.
  - 1-Click CSV dataset export for users, scores, alerts, and locations.

---

## 🎓 Recommended 16-Step Presentation & Evaluation Flow

For faculty evaluators and academic presentations, follow this recommended walkthrough:

1. **Homepage:** Explore the hero section, live indicators, and interactive 3D WebGL Earth globe.
2. **Launch CEP Demo:** Click **"🎓 CEP Demo"** in the navbar to preview the 8-step guided flow.
3. **Live Telemetry:** Open **Dashboard** → Search or select a city (e.g. *Tokyo* or *New Delhi*).
4. **Live Weather & Forecast:** Inspect ambient temperature, feels-like temperature, humidity, wind velocity, and 7-day forecast.
5. **Real-Time AQI:** View multi-pollutant concentrations (PM2.5, PM10, NO2, O3, UV) and health advice.
6. **AI Climate Insights:** Review the automated climate condition summary and prioritized mitigation checklist.
7. **Empirical Risk Score:** Examine the 0–100 Climate Risk Score and weighted factor breakdowns.
8. **GIS Map & Compare:** Navigate to **Climate Map** → Compare two cities side-by-side.
9. **Educational Science:** Review the **Climate Awareness** page with 7 core science pillars.
10. **Action Calculator:** Complete the **Action Score** quiz → Generate certificate with confetti celebration.
11. **Login:** Click **Login** → Click **1-Click Demo Account Login** (`demo@ecopulse.org`).
12. **Personal Dashboard:** Review the score-over-time area chart, pinned cities, and personalized recommendations.
13. **Badges Gallery:** Inspect the 7 unlocked and locked planetary stewardship milestones.
14. **Alert Center:** Click the **Notification Bell** → Filter alerts by severity and mark as read.
15. **Generate Report:** Open **Report Generator** → Select city → Click **Print / Save as PDF**.
16. **Admin Console:** Login as Admin (`admin@ecopulse.org`) → Inspect platform KPIs, resolve alerts, and export CSV datasets.

---

## ⚖️ Academic Disclaimer & Limitations

- **Educational Modeling:** The 0–100 Climate Risk Score and Climate Action Score are simplified heuristic educational models designed to foster public awareness and are not official governmental or meteorological hazard determinations.
- **Data Latency:** Real-time atmospheric telemetry is provided by free Open-Meteo public endpoints and is subject to upstream satellite sync intervals.
- **Client-Side Storage:** User credentials and history are securely persisted in browser-level IndexedDB and LocalStorage without external cloud database dependencies.

---

## 🌿 UN Sustainable Development Goals (SDG) Alignment

- **SDG 13:** *Climate Action* — Strengthening climate awareness and behavioral mitigation.
- **SDG 7:** *Affordable and Clean Energy* — Promoting renewable energy transition awareness.
- **SDG 11:** *Sustainable Cities and Communities* — Monitoring urban heat islands and air quality.
- **SDG 15:** *Life on Land* — Educating on deforestation, reforestation, and ecological preservation.

---

## 📄 License
This project is developed as an open educational resource for the **Capstone Engineering Project (CEP)** curriculum. © 2026 Climate Change Awareness Dashboard.
