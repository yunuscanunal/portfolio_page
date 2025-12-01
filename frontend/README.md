# 🎨 Portfolio Frontend

> **[🇹🇷 Türkçe İçerik için Tıklayın / Click here for Turkish](./README.tr.md)**

This directory contains the client-side application of the portfolio project, engineered with **React** and **Vite**. It is designed to provide a high-performance, futuristic user experience with seamless animations and interactive 3D elements.

## 🏗 Architecture & Design

The frontend architecture is built around a component-based structure using **TypeScript** for type safety and scalability.

### Core Features

- **Futuristic UI:** Utilizes **Tailwind CSS** and custom Cyberpunk aesthetics to create a visually striking interface.
- **3D Interactivity:** Integrated **Three.js** (via React Three Fiber) to render the "TechScene," an interactive 3D sphere representing the digital realm.
- **Smooth Transitions:** **Framer Motion** powers the page transitions and element animations, ensuring a fluid user journey.
- **Serverless Communication:** The contact form operates without a dedicated backend mail server, utilizing **EmailJS** for direct transmission and **Google reCAPTCHA v2** for bot protection.

### Key Components

- **`AdminPanel`:** A protected dashboard that consumes the Backend API to manage dynamic content (Projects & Experiences) securely via JWT.
- **`GlobalContext`:** Manages application-wide state such as Multi-language support (TR/EN) and Theme switching (Dark/Light), persisting user preferences.
- **`ProjectCard`:** A reusable, animated component used to display portfolio items fetched from the API.

## 🛠 Tech Stack

| Category        | Technology                       |
| :-------------- | :------------------------------- |
| **Framework**   | React 19, Vite                   |
| **Language**    | TypeScript                       |
| **Styling**     | Tailwind CSS, PostCSS            |
| **Animation**   | Framer Motion                    |
| **3D Graphics** | Three.js, React Three Fiber/Drei |
| **Security**    | Google reCAPTCHA v2              |
