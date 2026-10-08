# Data Visualization Dashboard

A full-stack data visualization dashboard for exploring global insight records across topics, sectors, regions, and years.

The dashboard reads insight records from MongoDB and presents them through filtered analytics, charts, responsive layouts, and a paginated records table.

**Live Demo:** https://global-insights-dashboard-gules.vercel.app/dashboard

## Project Overview

This project converts a JSON insight dataset into a structured dashboard experience.

The implementation focuses on:

- Reading dashboard data from MongoDB
- Designing section-specific API endpoints
- Applying global filters through API query parameters
- Visualizing key business and trend insights
- Providing a searchable, paginated records table
- Highlighting dataset quality and missing values
- Supporting dark, light, and system themes
- Maintaining responsive layouts across desktop, tablet, and mobile screens

---

## Tech Stack

- Next.js
- TypeScript
- MongoDB Atlas
- Mongoose
- Tailwind CSS
- shadcn/ui
- Recharts
- Lucide React
- next-themes

---

## Main Features

- MongoDB-backed dashboard data
- Global filters for:
  - End Year
  - Topic
  - Sector
  - Region
  - PESTLE
  - Source
  - Country
- Overview KPI cards
- Topic intelligence charts
- Regional intelligence charts
- Sector and PESTLE analysis
- Timeline trend analysis
- Detailed records table
- Page-number based pagination
- Search support for records
- Dataset quality analysis
- Responsive sidebar with mobile menu
- Dark, light, and system theme support

---

## Development Approach

Before building the dashboard, the dataset was reviewed to identify fields that were useful for visualization.

High-value fields included:

- `intensity`
- `likelihood`
- `relevance`
- `topic`
- `sector`
- `region`
- `country`
- `pestle`
- `source`
- `end_year`

Sparse or text-heavy fields such as `impact`, `city`, `title`, `insight`, and `url` were handled carefully. Some were used for search or source links, while missing-value-heavy fields were included in the dataset quality analysis instead of being forced into charts.

The backend was then organized into separate API endpoints for each dashboard section. This keeps each endpoint focused and allows dashboard sections to fetch data independently.

---

## Dashboard Sections

### 1. Overview

Provides a quick summary of the dataset using:

- Total records
- Total countries
- Average intensity
- Average relevance
- Average likelihood
- Top topics chart
- Records by region chart

### 2. Topic Intelligence

Shows topic-level patterns using:

- Topic intensity comparison
- Topic distribution
- Relevance vs intensity comparison

### 3. Regional Intelligence

Shows geographic insight patterns using:

- Regional distribution
- Top countries
- Average intensity by region

### 4. Sector + PESTLE Analysis

Shows business environment analysis:

- Sector insight summary
- Sector performance radar
- PESTLE distribution
- Records grouped by sector

### 5. Timeline Analysis

Shows year-based trends:

- Records by year
- Average intensity by year

Timeline charts are based on available `end_year` values.

### 6. Detailed Records

Provides record-level access to the dataset with:

- Search
- Pagination
- Page number navigation
- External source links
- Responsive table layout

### 7. Dataset Quality Analysis

Shows dataset completeness information:

- Total records
- Complete fields
- Sparse fields
- Most missing field
- Missing value analysis chart

## API Endpoints

### Dashboard APIs

```txt
GET /api/dashboard/filters
GET /api/dashboard/overview
GET /api/dashboard/topics
GET /api/dashboard/regions
GET /api/dashboard/sectors
GET /api/dashboard/timeline
GET /api/dashboard/data-quality
```

### Records API

```txt
GET /api/insights
```

The records API supports:

- Pagination
- Search
- Sorting
- Global filters

Example:

```txt
/api/insights?page=1&limit=10&search=oil&sector=Energy
```

---

## Filtering

Global filters are applied through API query parameters.

Supported filters:

- `end_year`
- `topic`
- `sector`
- `region`
- `pestle`
- `source`
- `country`

Each dashboard section receives the same filter state, so charts and records update consistently when filters are applied.

---

## Backend Structure

The backend includes:

- MongoDB connection setup
- Mongoose model for insight records
- Filter utility for converting query parameters into MongoDB filters
- Aggregation helper functions for repeated grouping and averaging logic
- Separate dashboard APIs for each analytics section
- Paginated records API for the detailed table
- Seed script for importing the JSON dataset

This structure keeps the backend organized and avoids putting all dashboard logic into one large endpoint.

---

## Frontend Structure

The frontend uses reusable layout, dashboard, and chart components.

Reusable UI includes:

- Dashboard shell
- Sidebar
- Topbar
- Filter popup
- Footer
- Stat cards
- Chart cards
- Chart skeletons
- Empty states
- Reusable chart wrappers

Reusable chart components include:

- Bar chart
- Line chart
- Area chart
- Donut chart
- Radar chart
- Composite chart

---

## Responsiveness

The dashboard is responsive across screen sizes.

Implemented responsive behavior includes:

- Desktop sidebar
- Mobile hamburger sidebar menu
- Responsive chart grids
- Horizontally scrollable records table
- Mobile-friendly filter popup
- Adaptive spacing across sections

---

## Setup Instructions

### 1. Clone and install dependencies

```bash
git clone https://github.com/kriti-shesh321/Global-Insights-Dashboard.git && cd Global-Insights-Dashboard
npm install
```

### 2. Create environment file

Create a `.env.local` file in the project root:

```env
MONGODB_URI=your_mongodb_connection_string
```

### 3. Seed the database

```bash
npm run seed
```

This imports the JSON dataset from `src/data/jsondata.json` into the database configured in `.env.local`. Existing insight records are replaced.

### 4. Start the development server

```bash
npm run dev
```

### 5. Open the dashboard

```txt
http://localhost:3000/dashboard
```

---

## Useful Routes

```txt
/dashboard
/api/insights
/api/dashboard/filters
/api/dashboard/overview
/api/dashboard/topics
/api/dashboard/regions
/api/dashboard/sectors
/api/dashboard/timeline
/api/dashboard/data-quality
```

---

## Data Source

The project uses a JSON dataset stored in `src/data/jsondata.json`.

The dataset contains insight records with fields such as:

- intensity
- likelihood
- relevance
- year
- country
- topic
- region
- sector
- source
- PESTLE category

## Notes

- Empty string values in the dataset are treated as missing values where needed.
- Timeline analysis uses available `end_year` values.
- Filters are applied globally via API query parameters.
- Dashboard sections fetch their own data independently.
- The records table uses pagination to avoid loading all records at once.
- Dataset quality analysis was added to highlight missing and sparse fields.
- The UI supports dark, light, and system themes.