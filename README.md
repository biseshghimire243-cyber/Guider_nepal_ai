# 🏔️ Guider Nepal AI

### AI-Powered Travel & Tourism Guide for Nepal

Guider Nepal AI is a modern travel platform designed to help travelers explore **Nepal, the Himalayas, trekking routes, destinations, activities, and travel information** from one place.

The platform combines a beautiful tourism-focused frontend with a Python backend and is being developed toward an **AI-powered personalized travel planning system**.

---

## ✨ Features

### 🌏 Explore Destinations
- Discover popular destinations across Nepal and beyond
- Destination categories and regions
- Destination search and filtering
- Detailed destination pages
- Featured destinations

### 🗺️ Explore Nepal by Region
Explore Nepal through different regions:

- 🏔️ Himalayas
- 🌿 Hills
- 🌾 Terai
- 🛕 Kathmandu Valley

### 🥾 Trekking
Discover famous trekking routes including:

- Everest Base Camp
- Annapurna Circuit
- Langtang Valley
- Mardi Himal
- Ghorepani Poon Hill
- Upper Mustang
- Manaslu Circuit
- Helambu

Each route includes information such as:

- Difficulty
- Duration
- Maximum altitude
- Location

### 🎯 Activities

Explore different experiences:

- Trekking
- Mountain Climbing
- Paragliding
- Rafting
- Wildlife Safari
- Cultural Tours
- Camping
- Hiking

### 🤖 AI Trip Planner

Users can provide:

- Destination
- Trip duration
- Travel interests
- Budget

The platform is designed to generate a personalized travel plan using AI.

### 🌦️ Travel Guide

Travel information covering:

- Trip planning
- Transportation
- Trekking preparation
- Safety
- Packing
- Budget planning
- Mountain travel
- Local culture
- Travel essentials

### 🌍 Countries

Explore destinations by country, including:

- Nepal
- Bhutan
- Switzerland
- Japan

### 🔐 Authentication

Planned authentication system includes:

- User registration
- User login
- Password visibility controls
- User sessions
- Personalized travel planning

### 📱 Responsive Design

The website is designed to work across:

- 💻 Desktop
- 💻 Laptop
- 📱 Mobile
- 📟 Tablet

---

# 🛠️ Technology Stack

## Frontend

- HTML5
- CSS3
- JavaScript
- Responsive Web Design
- Fetch API
- LocalStorage

## Backend

- Python
- Flask
- Flask-CORS

## Database

- MySQL / MariaDB

## Future AI Integration

- AI-powered travel recommendations
- Personalized itinerary generation
- Natural language travel assistant

---

# 📂 Project Structure

```text
Guider_nepal_ai/
│
├── frontend/
│   │
│   ├── index.html
│   ├── destinations.html
│   ├── destination-details.html
│   ├── countries.html
│   ├── activities.html
│   ├── trekking.html
│   ├── travel-guide.html
│   ├── about.html
│   ├── login.html
│   ├── register.html
│   │
│   ├── css/
│   │   ├── style.css
│   │   ├── navbar.css
│   │   ├── destinations.css
│   │   └── responsive.css
│   │
│   └── js/
│       ├── main.js
│       ├── destinations.js
│       ├── destination-details.js
│       ├── countries.js
│       ├── activities.js
│       ├── trekking.js
│       ├── search.js
│       ├── auth.js
│       └── guide.js
│
├── backend/
│   ├── server.py
│   └── requirements.txt
│
├── database/
│   └── himalaya_explorer.sql
│
└── README.md
```

---

# 🚀 Getting Started

## 1. Clone the repository

```bash
git clone https://github.com/biseshghimire243-cyber/Guider_nepal_ai.git
```

## 2. Open the project

```bash
cd Guider_nepal_ai
```

## 3. Install backend dependencies

```bash
cd backend
```

```bash
pip install -r requirements.txt
```

## 4. Start the Flask server

```bash
python server.py
```

The application will run at:

```text
http://127.0.0.1:5000
```

Open the URL in your browser.

---

# 🔌 API

The Flask backend currently provides APIs for destinations and travel discovery.

### Health Check

```http
GET /api/health
```

### Get Destinations

```http
GET /api/destinations
```

### Search Destinations

```http
GET /api/destinations?search=everest
```

### Filter by Country

```http
GET /api/destinations?country=Nepal
```

### Filter by Region

```http
GET /api/destinations?region=Himalaya
```

### Featured Destinations

```http
GET /api/destinations/featured
```

### Destination Details

```http
GET /api/destinations/<id>
```

### Countries

```http
GET /api/countries
```

### Search

```http
GET /api/search?q=everest
```

---

# 🤖 AI Trip Planner

The AI Trip Planner is one of the main features planned for Guider Nepal AI.

Users will be able to enter information such as:

```text
Destination
      ↓
Trip Duration
      ↓
Travel Style
      ↓
Budget
      ↓
AI Travel Planner
      ↓
Personalized Itinerary
```

Example:

```text
Destination: Everest Region
Duration: 14 Days
Style: Adventure
Budget: Standard
```

The future AI system will generate a personalized itinerary containing:

- Places to visit
- Daily activities
- Trekking routes
- Suggested duration
- Travel recommendations
- Food recommendations
- Accommodation suggestions
- Safety information

---

# 🎨 Design

The project uses a dark Himalayan-inspired visual identity.

### Main Colors

```text
Background: #07090E
Cards:      #11151C
Gold:       #D4AF37
Light Gold: #F5D76E
Text:       #FFFFFF
Secondary:  #A8AFBA
```

The design focuses on:

- Minimal layouts
- Large destination imagery
- Gold accents
- Modern cards
- Smooth animations
- Responsive layouts
- Travel-focused visual storytelling

---

# 🗺️ Planned Features

The project is actively being developed.

### Phase 1 — Frontend

- [x] Homepage
- [x] Destinations
- [x] Destination details
- [x] Countries
- [x] Activities
- [x] Trekking
- [x] Travel Guide
- [x] Login
- [x] Register
- [x] AI Trip Planner UI
- [x] Region exploration
- [ ] Interactive Nepal map
- [ ] Travel stories
- [ ] Traveler reviews
- [ ] Photo gallery
- [ ] Advanced responsive improvements

### Phase 2 — Backend

- [x] Flask server
- [x] Destination API
- [x] Search API
- [x] Country API
- [ ] User authentication API
- [ ] MySQL database integration
- [ ] User profiles
- [ ] Saved destinations
- [ ] Trip management

### Phase 3 — AI

- [ ] AI travel assistant
- [ ] Personalized itinerary generation
- [ ] Natural language destination search
- [ ] AI recommendations
- [ ] Budget-based planning
- [ ] Personalized trekking recommendations

### Phase 4 — Advanced Features

- [ ] Interactive Nepal map
- [ ] Weather integration
- [ ] Route planning
- [ ] Travel alerts
- [ ] Emergency information
- [ ] Reviews and ratings
- [ ] User favorites
- [ ] Travel journal

---

# 📸 Project Preview

The platform is designed around a modern Himalayan travel experience featuring:

```text
🏔️ Mountains
🥾 Trekking
🌿 Nature
🛕 Culture
🐘 Wildlife
🌊 Adventure
🤖 AI Travel Planning
```

---

# 🎯 Project Goal

The goal of **Guider Nepal AI** is to create an intelligent digital travel companion that helps people discover Nepal and plan their journeys more easily.

Instead of searching through many different websites, travelers will eventually be able to:

```text
Discover
   ↓
Explore
   ↓
Plan
   ↓
Ask AI
   ↓
Travel
```

---

# 👨‍💻 Developer

**Bishesh Ghimire**

B.Sc. CSIT Student  
Full-Stack Developer

GitHub:

https://github.com/biseshghimire243-cyber

---

# 📜 License

This project is currently developed as a personal/academic project.

© 2026 Bishesh Ghimire. All rights reserved.

Why Guider Nepal AI?
- Explain what makes the platform different from normal travel websites.

AI Travel Assistant
- Explain how users can interact with AI using natural language.

Personalized Trip Planning
- Mention planning based on budget, duration, interests, and travel style.

Nepal 77 Districts
- A dedicated feature for discovering all districts of Nepal.

Trek Comparison
- Compare treks by difficulty, duration, altitude, cost, and best season.

Smart Search
- Users can search destinations, activities, trekking routes, and travel guides from one place.

Save & Favorites
- Users can save destinations and trekking routes they want to visit.
Trip Dashboard
- A personal dashboard where users can manage their planned trips.
Interactive Nepal Map
- Click a region/district on the map and explore destinations.

Travel Budget Calculator
- Estimate accommodation, food, transportation, permits, and activities.
Weather Information- Show destination/trek weather and recommended travel periods.

Emergency & Safety Information- Emergency contacts, trekking safety, altitude information, and important travel guidance.

Travel Reviews- Travelers can share experiences, ratings, and recommendations.

Travel Journal- Users can record their trips, photos, experiences, and memories.
1. Future Mobile App
- Mention that the platform could later be expanded into Android/iOS.
🔎 Discover
      ↓
🏔️ Explore
      ↓
🤖 Ask AI
      ↓
🗺️ Build Your Trip
      ↓
💰 Check Your Budget
      ↓
🎒 Start Your Journey
🏔️ Destination Explorer
🥾 Trekking Explorer
🎯 Activities
🌏 Countries
🗺️ Nepal 77 Districts
🤖 AI Trip Planner
💰 Budget Planner
🌦️ Weather
📖 Travel Guide
⭐ Reviews & Ratings
❤️ Favorites
📔 Travel Journal
👤 User Dashboard 

AI Travel Chatbot — Ask questions like “What can I do in Pokhara for 3 days?”

AI Itinerary Generator
AI Destination Recommendation
AI Trek Recommendation
AI Budget Optimization