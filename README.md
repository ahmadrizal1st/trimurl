# trimurl URL Shortener Project

A full-stack URL shortener application consisting of a Go backend API and a React TypeScript frontend. This project allows users to shorten long URLs, manage them with custom short codes, set expiration times, add tags, and track redirects.

## Project Structure

```
trimurl/ 
├── backend/ # Go backend API 
├── frontend/ # React TypeScript frontend 
└── README.md # This file
```

## Backend (Go API)

### Overview

The backend is a high-performance URL shortener service built with Go, utilizing PostgreSQL for persistent storage and Redis for caching and rate limiting.

### Features

- **URL Shortening**: Convert long URLs into short, manageable links
- **Custom Short Codes**: Option to specify custom short codes for URLs
- **Expiration Control**: Set expiration time for shortened URLs (in hours)
- **Tagging System**: Add tags to organize and categorize shortened URLs
- **Rate Limiting**: Built-in rate limiting to prevent abuse (configurable)
- **High Performance**: Utilizes Redis for caching and fast redirects
- **RESTful API**: Clean and simple API design
- **Docker Support**: Easy deployment with Docker and Docker Compose

### Technology Stack

- **Language**: Go (Golang)
- **Framework**: Gin
- **Database**: PostgreSQL
- **Cache**: Redis
- **Containerization**: Docker & Docker Compose
- **Environment**: godotenv for configuration

### API Endpoints

#### Shorten URL

- **POST** `/api/v1`
- **Request Body**:
  ```json
  {
    "url": "https://example.com/very/long/url",
    "short": "custom-code",  // optional
    "expiry": 24  // hours, optional
  }
  ```
* ​**Response**​:
  ```json
  {
    "url": "https://example.com/very/long/url",
    "short": "http://localhost:3000/custom-code",
    "expiry": 24,
    "rate_limit": 9,
    "rate_limit_reset": 3600
  }
  ```

#### Get URL Details

* **GET** `/api/v1/:shortID`
* ​**Response**​:
  ```json
  {
    "url": "https://example.com/very/long/url"
  }
  ```

#### Edit URL

* **PUT** `/api/v1/:shortID`
* ​**Request Body**​:
  ```json
  {
    "url": "https://new-example.com/updated/url",
    "expiry": 48
  }
  ```

#### Delete URL

* **DELETE** `/api/v1/:shortID`

#### Add Tag

* **POST** `/api/v1/tag`
* ​**Request Body**​:
  ```json
  {
    "shortID": "custom-code",
    "tag": "marketing"
  }
  ```

#### Redirect

* **GET** `/:shortID`
* Redirects to the original URL

### Configuration

Environment variables (via `.env` file):


| Variable      | Description                        | Default Value    |
|---------------|------------------------------------|------------------|
| `DB_ADDRESS`  | Redis database host and port       | `db:6379`        |
| `DB_PASSWORD` | Redis database password            | -                |
| `APP_PORT`    | Application server port            | `8000`           |
| `DOMAIN`      | Base domain for shortened URLs     | `localhost:3000` |
| `API_QUOTA`   | Rate limit requests per minute     | `10`             |

### Example

```bash
export DB_ADDRESS="localhost:6379"
export DB_PASSWORD="your_secure_password"
export DOMAIN="yourdomain.com"
export API_QUOTA=10
```

### Running the Backend

#### Prerequisites

* Go 1.19+
* Docker and Docker Compose (for full setup)

#### Using Docker Compose (Recommended)

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Start the services:
   ```bash
   docker-compose up -d
   ```
3. The API will be available at `http://localhost:8000`

#### Local Development

1. Install dependencies:
   ```bash
   go mod download
   ```
2. Set up environment variables in `.env` file
3. Run the application:
   ```bash
   go run main.go
   ```

## Frontend (React TypeScript)

### Overview

The frontend is a modern web application built with React and TypeScript, providing an intuitive user interface for interacting with the URL shortener API.

### Features

* ​**URL Shortening Form**​: Easy-to-use form to shorten URLs with optional custom codes and expiry settings
* ​**URL Management**​: Edit existing shortened URLs, including updating the target URL and expiry time
* ​**Tag Management**​: Add tags to URLs for organization
* ​**URL Deletion**​: Remove shortened URLs when no longer needed
* ​**Automatic Redirects**​: Seamless redirection from short URLs to original URLs with a countdown
* ​**Responsive Design**​: Mobile-friendly interface using Tailwind CSS
* ​**Navigation**​: Simple navigation between different sections of the app

### Technology Stack

* ​**Language**​: TypeScript
* ​**Framework**​: React 19
* ​**Build Tool**​: Vite
* ​**Styling**​: Tailwind CSS
* ​**Routing**​: React Router DOM
* ​**HTTP Client**​: Fetch API (built-in)

### Pages

* **Home** (`/`): Welcome page with link to shorten URLs
* **Shorten URL** (`/shorten`): Form to create new shortened URLs
* **Edit URL** (`/edit/:shortID`): Edit existing URLs, add tags, or delete URLs
* **Redirect** (`/:shortID`): Automatic redirect page with countdown
* **About** (`/about`): Information page (placeholder)

### Running the Frontend

#### Prerequisites

* Node.js 18+
* npm or yarn

#### Installation

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

#### Development

1. Start the development server:
   ```bash
   npm run dev
   ```
2. Open `http://localhost:5173` in your browser

#### Build for Production

1. Build the application:
   ```bash
   npm run build
   ```
2. Preview the production build:
   ```bash
   npm run preview
   ```

### Configuration

The frontend expects the backend API to be available at `/api/v1`. In development, you may need to configure a proxy in `vite.config.ts` or use a reverse proxy.

Example Vite config for API proxy:

```typescript
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true
      }
    }
  }
})
```

## Full Stack Development

To run both frontend and backend together:

1. Start the backend:
   ```bash
   cd backend
   docker-compose up -d
   ```
2. Start the frontend:
   ```bash
   cd frontend
   npm run dev
   ```
3. Access the application at `http://localhost:5173`

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Future Enhancements

* User authentication and management
* Analytics and tracking dashboard
* Bulk URL shortening
* QR code generation
* API key management
* Advanced tagging and filtering EOF

