# SpaceFlight

A spaceflight news website built with Astro and the Spaceflight News API.

SpaceFlight is a web development project focused on retrieving, processing, and displaying news about spaceflight and space exploration. The website uses an external REST API to retrieve articles and presents them through a custom-built frontend.

This project is developed as part of a school keuzedeel, with an emphasis on frontend development, API integration, and working with modern web technologies.

## About the Project

The goal of SpaceFlight is to develop a functional and accessible news website that presents spaceflight-related articles in a clear and organized interface.

Instead of manually writing and maintaining articles, the website retrieves news data from the Spaceflight News API. Astro processes the returned data and renders the articles on the website.

The project also serves as a learning environment for understanding how frontend applications communicate with external APIs.


## API Integration

SpaceFlight uses the Spaceflight News API v4 to retrieve article information.

The API provides structured data about spaceflight-related news articles. The website uses this data to display article titles, summaries, publication dates, and links to the original sources.


### API Utility

API requests are managed through a separate utility module:

```text
src/
└── lib/
    └── spaceflight.ts
```

Keeping API logic separate from the page components makes the code easier to maintain and reuse.

## Project Structure

The current project structure is organized around Astro's conventions.

```text
SpaceFlight/
├── public/
├── src/
│   ├── lib/
│   │   └── spaceflight.ts
│   ├── pages/
│   │   └── index.astro
│   └── components/
├── astro.config.mjs
├── package.json
├── package-lock.json
└── README.md
```

Some directories and files may be added as development progresses.

### Important Files

| File | Responsibility |
|---|---|
| `src/pages/index.astro` | Homepage and article presentation |
| `src/lib/spaceflight.ts` | API requests and article data retrieval |
| `src/components/` | Reusable interface components |
| `astro.config.mjs` | Astro configuration |
| `package.json` | Dependencies and development scripts |

## Installation

### Requirements

Make sure you have the following installed:

- Node.js, meeting the requirements of your installed Astro version.
- npm.
- Git, if you want to clone the repository.

### 1. Clone the Repository

```bash
git clone https://github.com/AechyAechisAeching/SpaceFlight
```

### 2. Open the Project

```bash
cd SpaceFlight
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start the Development Server

```bash
npm run dev
```

Astro will display a local development URL in the terminal, usually:

```text
http://localhost:4321
```

Open this address in your browser to view the website.

### 5. Build the Project

To generate a production build, run:

```bash
npm run build
```

To preview the production build locally, run:

```bash
npm run preview
```
