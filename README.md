# Evonauta - Evolucional Technical Challenge

This repository contains my solution for Evolucional's technical challenge, developed using React and Vite. Here, I share the technical decisions, project structure, main features, and execution instructions.

## Index

- [About the Project](#about-the-project)
- [Main Features](#main-features)
- [Technical Decisions](#technical-decisions)
- [Validation and Security](#validation-and-security)
- [Automated Tests](#automated-tests)
- [How to Run](#how-to-run)
- [Screenshots](#screenshots)

---

## About the Project

The goal of this project was to build a web application for managing students, teachers, subjects, courses, and classes, using data provided in JSON files. I aimed to deliver a functional and clear solution aligned with the challenge scope, prioritizing organization, efficiency, and user experience.

From the beginning, I carefully reviewed the instruction file and data to ensure every implemented feature matched the requirements. I chose React with Vite for performance, modularity, and ease of maintenance.

## Main Features

- **State Centralization with Context API:**
  - Used React’s Context API to share data and functions across all pages, making the app more maintainable and avoiding logic duplication.

- **Dynamic Filters and Bulk Generation:**
  - Implemented filters by grade and class, as well as bulk student generation to streamline data handling and simulate real-world scenarios.

- **Data Visualization with Charts:**
  - On the student page, a chart shows the distribution by grade level, helping with visual data analysis.

- **Relationships Between Teachers, Subjects, and Classes:**
  - You can view and edit relationships between teachers, subjects, grades, and classes using a clear interface and modals to reduce excessive navigation.

- **Modern and Responsive Interface:**
  - The entire UI was built using UIKit, ensuring responsiveness, clean design, and alignment with institutional standards.

## Technical Decisions

- **Stack:** React + Vite, UIKit for UI, Chart.js for data visualization, React Router for navigation.

- **Unit Testing with Vitest:**
  - Implemented automated unit tests using Vitest and Testing Library, covering the `Navbar` component and key page functionalities. The tests ensure future changes don’t break core features and increase development confidence.

- **Data Loading:**
  - All data is loaded via `fetch` from JSON files located in `public/data/` and centralized using global context.

- **Componentization:**
  - Code is divided into reusable components, pages, and utilities to ease maintenance and scaling.

- **Validation and Security:**
  - Implemented required field validation, input sanitization (HTML escaping), and instant user feedback.

- **Responsiveness:**
  - Used UIKit classes and layout adjustments to ensure the application works well on various screen sizes.

## Validation and Security

- **Required Field Validation:**
  - All forms and editable fields prevent submission of empty or invalid data.

- **XSS Sanitization:**
  - All user inputs are sanitized (HTML escaped) before being saved or displayed.

- **Instant Feedback:**
  - Alert messages and blocked actions are shown whenever the user tries to submit invalid data.

- **Validation Within State Management:**
  - Validations are applied directly within state-handling functions to prevent inconsistencies.

## Automated Tests

The project includes unit tests implemented with [Vitest](https://vitest.dev/) and [Testing Library](https://testing-library.com/), covering key components and features.

**Test Coverage:**
- Tests for the `Navbar` component (see `tests/components/Navbar.test.jsx`)
- Tests for core features on the Students and Teachers pages (see `tests/pages/Students.test.jsx` and `tests/pages/Teachers.test.jsx`)

**Running the Tests:**
```bash
npx vitest run
```
- Tests are automatically run in development mode to ensure that essential features remain functional.

## How to Run

1. **Prerequisites:**
   - Node.js (version 18+ recommended)
   - npm or yarn

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn

3. Run in development mode:
   ```bash
   npm run dev
   # or
   yarn run dev
   ```
Open http://localhost:5173 in your browser.

## Screenshots

![Homepagel](https://i.postimg.cc/ZYj7k1Ds/evolucional-homepage.png) ![Students Page](https://i.postimg.cc/FsBTz0vj/evolucional-studentpage.png) ![Image of Student Page with Distribution Graph](https://i.postimg.cc/htVZYfFT/evolucional-studentpage-graphics.png) ![Teacher Page Image](https://i.postimg.cc/fRSB9kW1/evolucional-teacherspage.png) ![Teacher Page image showing New Relationship Form](https://i.postimg.cc/KYNqZw8Y/evolucional-teacherspage-new-relationships.png)
