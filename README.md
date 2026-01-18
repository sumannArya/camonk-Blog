# CA Monk Blog Application

A modern, responsive blog application built with React, Vite, and Tailwind CSS. Featuring a split-view interface, collapsible sidebar drawer for mobile, and author profile integration.

## 🚀 Features

-   **Responsive Split-View Layout**:
    -   **Desktop**: Sticky sidebar for easy navigation while reading.
    -   **Mobile**: Collapsible drawer with smooth slide-over animation.
    -   **Scrolling**: Natural window scrolling with a self-hiding header.
-   **Content Management**:
    -   Create new blog posts with Title, Description, Content, Categories, Cover Image, and Author details.
    -   Sidebar list with "Recent Posts" and compact cards.
-   **Modern UI/UX**:
    -   **Theme**: Blue accent color scheme, sleek typography, and consistent spacing.
    -   **Interactivity**: Hover effects, smooth transitions, and intuitive "Open/Close" menus.
    -   **Components**: Reusable `BlogArticle`, `BlogCompactCard`, and shadcn/ui integration.
-   **Data Integration**:
    -   Mock backend using `json-server` to persist blog posts and authors.
    -   Real-time data fetching with TanStack Query.

## 🛠️ Tech Stack

-   **Frontend**: React, TypeScript, Vite
-   **Styling**: Tailwind CSS v4, Lucide React (Icons), Shadcn UI (Components)
-   **State Management**: TanStack Query (React Query)
-   **Routing**: React Router DOM
-   **Backend (Mock)**: JSON Server

## 🏁 Getting Started

### Prerequisites

-   Node.js (v18 or higher)
-   npm

### Installation

1.  **Clone the repository** (if applicable):
    ```bash
    git clone <repository-url>
    cd camonk-blog
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

### Running the Application

You need to run both the frontend dev server and the backend mock server.

1.  **Start the Mock Server** (Port 3001):
    ```bash
    npm run server
    ```

2.  **Start the Frontend** (Port 5173):
    ```bash
    npm run dev
    ```

3.  Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📁 Project Structure

```
src/
├── components/         # Global shared components (Layout, UI)
├── features/
│   └── blog/           # Blog feature module
│       ├── api.ts      # API endpoints (useBlogs, useCreateBlog)
│       ├── components/ # Blog-specific components (Article, Card, SplitView)
│       ├── pages/      # Route pages (CreateBlogPage)
│       └── types.ts    # TypeScript interfaces
├── App.tsx             # Main app component & routing
└── index.css           # Global styles and Tailwind configuration
```

## 📝 Author

Built with ❤️ by Suman.
