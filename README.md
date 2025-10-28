# TicketApp - Vue.js Implementation

This is the Vue.js implementation of the Multi-Framework Ticket Web App, part of the Frontend Stage 2 task. This version delivers a seamless user experience for ticket management, including a landing page, authentication, a dashboard, and full CRUD operations for tickets, all while maintaining a consistent layout and design language as specified in the task.

## Core Features

*   **Landing Page:** Presents the app's name, description, and Call-to-Action buttons ("Login" and "Get Started"). Features a wavy background, decorative circles, and box-shaped sections.
*   **Authentication Screen:** Secure Login and Signup pages with form validation, inline error messages, and toast notifications. Authentication is simulated using `localStorage` with a session token.
*   **Dashboard:** Displays summary statistics (Total, Open, In Progress, Resolved tickets) and includes navigation links. Features a visible Logout button.
*   **Ticket Management Screen (CRUD):** Fully functional page for creating, reading, updating, and deleting tickets. Includes real-time validation and clear feedback via toast notifications.

## Data Validation Mandates

*   `title` and `status` fields are mandatory.
*   `status` field strictly accepts "open", "in_progress", "closed".
*   Validation errors are displayed in a user-friendly manner.
*   Optional fields (description, priority) are validated for length/type.

## Error Handling

*   Consistent error handling for invalid form inputs, unauthorized access (redirects to Login), and failed network/API calls.
*   Clear and descriptive error messages.

## Security & Authorization

*   Dashboard and Ticket Management pages are protected, accessible only with a valid session token.
*   Authentication simulation uses `localStorage` with the key `ticketapp_session`.
*   Unauthorized users are redirected to `/auth/login`.
*   Logout clears the session and redirects to the landing page.

## Layout and Design Consistency

*   **Max Width:** Content is centered with `max-width: 1440px` on large screens.
*   **Hero Section:** Includes a wavy SVG background and decorative circles.
*   **Other Sections:** Uses card-like boxes for stats, tickets, or features.
*   **Responsive Behavior:** Mobile-first design with stacked layouts and multi-column grids for tablet/desktop.
*   **Color & Status Rules:**
    *   `open` → Green tone
    *   `in_progress` → Amber tone
    *   `closed` → Gray tone
*   **Accessibility:** Semantic HTML, alt text, visible focus states, and sufficient color contrast.

## Frameworks and Libraries Used

*   **Frontend Framework:** Vue.js 3
*   **Routing:** Vue Router 4
*   **Styling:** Tailwind CSS (via CDN for simplicity and parity with React implementation)
*   **State Management (Session):** Custom reactive store using Vue's `reactive`, `toRefs`, `provide`, and `inject`.
*   **Unique IDs:** `uuid` library for generating unique ticket IDs.

## Setup and Execution Steps

1.  **Navigate to the project directory:**
    ```bash
    cd C:\Users\ifead\Desktop\HNGi13\frontend\stage2\ticketing\ticket-vue-app
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Start the development server:**
    ```bash
    npm run dev
    ```
    The application will typically be available at `http://localhost:5173/`.

## Instructions for Switching Between Implementations

To switch between the React, Vue.js, and (future) Twig implementations, navigate to their respective project directories and follow their specific setup and execution instructions. Each implementation is self-contained.

## UI Components and State Structure

*   **`App.vue`:** Main application layout, includes `Navbar`, `Footer`, `ToastProvider`, and `router-view`.
*   **`Navbar.vue`:** Displays navigation links and user session status (Login/Logout).
*   **`Footer.vue`:** Consistent footer across pages.
*   **`ToastProvider.vue`:** Provides global toast notifications.
*   **`TicketCard.vue`:** Displays individual ticket details.
*   **`TicketForm.vue`:** Form for creating and editing tickets.
*   **`Landing.vue`:** The application's home page.
*   **`AuthLogin.vue`:** User login form.
*   **`AuthSignup.vue`:** User registration form.
*   **`Dashboard.vue`:** Displays ticket summary statistics.
*   **`Tickets.vue`:** Manages CRUD operations for tickets.
*   **`router/index.js`:** Configures Vue Router, including global navigation guards for protected routes.
*   **`composables/useSession.js`:** A custom composable for reactive session management using `localStorage`.
*   **`utils/storage.js`:** Utility functions for interacting with `localStorage` for session and ticket data.

## Notes on Accessibility and Known Issues

*   **Accessibility:** Efforts have been made to use semantic HTML, `alt` attributes for images, and visible focus states. Color contrast has been considered for readability.
*   **Known Issues:**
    *   The Tailwind CSS CDN is used for development simplicity. For production, it's recommended to install Tailwind CSS as a PostCSS plugin for optimal performance and bundle size.
    *   The authentication and ticket data are stored in `localStorage` for demonstration purposes. In a real-world application, a backend API would be used for persistent storage and secure authentication.

## Example Test User Credentials

You can create new users via the signup page. For testing purposes, you can sign up with:

*   **Username:** `testuser`
*   **Password:** `password` (or any password with at least 4 characters)