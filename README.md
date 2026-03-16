# ⚡️ SPRINT 9: MochiApp

This project is a modern web space created to document my personal rehabilitation and recovery process. It’s more than a tracker; it’s a daily reflection on movement and healing. By logging every gym session, rehab appointment, and physical milestone, I’m building a visual story of how staying active impacts my evolution.

## 🎯 Objectives:
- Build a React app with navigation and routing across multiple views (Home, Map, Calendar, Charts)
- Create and consume a real CRUD API connected to a database (Supabase) to manage recovery records
- Integrate interactive tools: Leaflet maps for medical centers, FullCalendar for rehab scheduling, and Chart.js for progress tracking
- Implement marker categories with filters on the map (Gyms, Physiotherapy, Hospitals)
- Enable event and record editing from modals with real-time API synchronization

## 💻 Technology Stack:
- **React** - **TypeScript** - **Vite** - **Supabase** - **Tailwind CSS**
- **React Router** - **Leaflet** - **FullCalendar** - **Chart.js**

## 📋 Files:
```text
├── src/
│   ├── assets/
│   ├── config/
│   ├── features/
│   │   ├── auth/       
│   │   ├── home/       
│   │   └── chekin   
│   │   └── records/  
│   ├── layouts/      
│   ├── lib/            
│   ├── routes/         
│   ├── utils/         
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
```
## 🛠 Installation

### 1. Clone the Repository

``` bash
git clone https://github.com/claudiabcn/mochiapp-recovery
```

### 2. Install Dependencies

``` bash
cd mochiapp-recovery
npm install
```

### 3. Environment Variables

Create a `.env` file in the root directory:

``` env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Run Development Server

``` bash
npm run dev
```

The app will be available at:\
**http://localhost:5173**

------------------------------------------------------------------------

## 📸 Demo

Visit **MochiApp**

https://mochi-app-claudiabcns-projects.vercel.app

------------------------------------------------------------------------

## ⭐ Learnings and Challenges

This sprint pushed me to transform a technical requirement into a
meaningful personal tool. Integrating complex libraries like **Leaflet**
and **Chart.js** taught me that the real challenge isn't just making
features work --- it's ensuring the data accurately reflects a sensitive
process like physical recovery.

I focused heavily on the **Single Responsibility Principle**, separating
my Supabase services from the UI logic to keep the codebase maintainable
as the project grows.

The biggest architectural shift was managing the state between the
calendar and the progress charts, ensuring that every logged rehab
session immediately updated my visual evolution.

