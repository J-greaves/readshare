# ReadShare - Frontend

ReadShare is a mobile application for tracking book lending between friends. Users can search for books by title, author, or barcode, manage personal libraries and wishlists, and handle the full borrowing lifecycle — from request through return.

Built with React Native, TypeScript, and Expo.

---

## Features

- Search for books by title, author, or barcode scan (Google Books API)
- Add books to a personal library or wishlist
- Mark books as available to lend
- Add friends and browse their lendable books
- Request to borrow books from friends
- Accept, reject, and track active borrow requests
- View books you are currently lending out or borrowing

---

## Tech Stack

- **React Native / Expo** — cross-platform mobile UI
- **TypeScript** — strict mode enabled throughout
- **Axios** — HTTP client for REST API communication
- **React Navigation** — bottom tab and stack navigation
- **Render** — hosts the RESTful backend API (Node.js / Firebase)

---

## Backend Repository

The backend is a Node.js REST API using Firebase for the database, hosted on Render.

[Array-of-Sunshine-Library-App/hosting-api](https://github.com/Array-of-Sunshine-Library-App/hosting-api)

---

## Architecture

The frontend follows a layered architecture:

- **`axiosRequests.ts`** — single module for all API calls, typed with return types from `types.ts`
- **`hooks/`** — custom hooks (`useFetchHomeData`, `useFetchLibrary`, `useFetchFriends`, `useFetchFriendRequests`) separate data fetching from component rendering
- **`contexts/`** — React Context providers for global state (`UserContext`, `BookAddContext`, `HomeUpdateContext`)
- **`types.ts`** — central type definitions (`Book`, `User`, `Friend`, `PageContext`) shared across the codebase
- **`utils/`** — pure utility functions (e.g., `formatSearchQuery`)

---

## Environment Variables

The app requires a Google Books API key. Copy `.env.example` to `.env` and fill in your key:

```bash
cp .env.example .env
```

| Variable | Description |
|---|---|
| `GOOGLE_BOOKS_API_KEY` | Google Books API key, used for book search and barcode lookup |

The `.env` file is gitignored. The `@env` module (via `react-native-dotenv`) exposes the variable at build time.

---

## Running the App Locally

### 1. Clone the repository

```bash
git clone https://github.com/Array-of-Sunshine-Library-App/library-app.git
cd library-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

```bash
cp .env.example .env
# Add your GOOGLE_BOOKS_API_KEY to .env
```

### 4. Start the app

```bash
npx expo start
```

Scan the QR code with Expo Go (iOS or Android) to run on a physical device, or press `i` / `a` to open in a simulator.

---

## Running Tests

```bash
# Run all tests once
npm test

# Run in watch mode
npm run test:watch

# Generate a coverage report
npm run test:coverage
```

Tests cover:

- **Unit tests** — pure utility functions (`utils/__tests__/`)
- **Component tests** — rendering assertions (`components/__tests__/`)
- **Hook tests** — data fetching hooks with mocked API layer (`hooks/__tests__/`)
