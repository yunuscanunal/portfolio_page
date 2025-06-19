# Portfolio Page - Full Stack Project

## About the Project

This is a full-stack portfolio application built with Java Spring Boot (backend) and React (frontend). It features JWT security, user management, rate limiting, input sanitization, Swagger/OpenAPI documentation, and full Docker support for easy deployment and development.

---

## Backend (Spring Boot)

### Setup

1. `cd backend`
2. Install dependencies:
   ```
   mvn clean install
   ```
3. Start the application:
   ```
   mvn spring-boot:run
   ```
4. By default, runs at [http://localhost:8080](http://localhost:8080)

### Database

- Uses PostgreSQL. Connection info is in `backend/src/main/resources/application.properties`.
- Tables and schema are auto-generated.

### Docker

- Production-ready Dockerfile included (`backend/Dockerfile`).
- Can be run standalone or with `docker-compose`.

### Swagger/OpenAPI

- API documentation and test UI:
  - [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)
  - [http://localhost:8080/swagger-ui/index.html](http://localhost:8080/swagger-ui/index.html)

### Key Features

- JWT-based authentication
- User management (register/login, hashed passwords)
- Rate limiting (per-IP request limit)
- Input sanitization (XSS protection)
- Validation and global error handling
- Docker support for easy deployment

---

## Frontend (React + TypeScript)

### Setup

1. `cd frontend`
2. Install dependencies:
   ```
   npm install
   ```
3. Start the app:
   ```
   npm start
   ```
4. Access the UI at [http://localhost:3000](http://localhost:3000)

### Docker

- Production-ready Dockerfile included (`frontend/Dockerfile`).
- Serves the built app with Nginx.

### Features

- Admin panel for adding/updating/deleting projects
- JWT-protected admin actions
- Form validation and user-friendly error messages
- Full API compatibility
- Loading animations and clear feedback

---

## Orchestration (docker-compose)

- `docker-compose.yml` launches PostgreSQL, backend, and frontend together.
- All services are networked and environment variables are set for seamless integration.
- One command to run everything:
  ```
  docker-compose up --build
  ```

---

## Developer Notes

- Backend and frontend run on separate ports.
- Swagger UI makes API endpoints easy to test.
- Rate limiting and input sanitization are included for security.
- Validation and error handling are implemented on both layers.
- Easily extensible for CI/CD, advanced roles, and more.

---

If you have any issues or want to contribute, feel free to reach out!

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
