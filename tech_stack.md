# Technology Stack Documentation

This document outlines the technology stack used in the KAYEL website project and the rationale behind these choices.

## Core Framework & Language

### 1. [React](https://react.dev/) (v19)
*   **Role:** User Interface Library
*   **Why it's used:**
    *   **Component-Based Architecture:** Allows for building reusable, modular UI components (like `Hero`, `Services`, `About`).
    *   **Ecosystem:** Updates to React 19 provide the latest features for performance and developer experience.
    *   **Declarative Views:** Makes the code more predictable and easier to debug.

### 2. [TypeScript](https://www.typescriptlang.org/) (~5.9)
*   **Role:** Programming Language
*   **Why it's used:**
    *   **Type Safety:** Adds static typing to JavaScript, catching errors at compile-time rather than runtime.
    *   **Developer Experience:** Enhances code completion (IntelliSense) and refactoring capabilities in modern IDEs.
    *   **Scalability:** Essential for maintaining a robust codebase as the project grows.

### 3. [Vite](https://vitejs.dev/) (v7)
*   **Role:** Build Tool & Bundler
*   **Why it's used:**
    *   **Speed:** Offers instant server start and lightning-fast Hot Module Replacement (HMR).
    *   **Modern default:** Optimized for modern browsers and ES modules, requiring less configuration than older tools like Webpack.
    *   **Seamless TypeScript Support:** Built-in support for TypeScript out of the box.

## Graphics & Styling

### 4. [Three.js](https://threejs.org/) (v0.182)
*   **Role:** 3D Graphics Library
*   **Why it's used:**
    *   **WebGL Abstraction:** Simplifies creating complex 3D scenes (used in the `Hero` section for backgrounds/particles) without writing raw WebGL.
    *   **Performance:** highly optimized for rendering interactive 3D content in the browser.

### 5. Vanilla CSS
*   **Role:** Styling
*   **Why it's used:**
    *   **Control:** Provides granular control over animations, transitions, and layout without the overhead of a CSS-in-JS library.
    *   **Performance:** Raw CSS is the fastest way to style elements in the browser.
    *   **Simplicity:** No build steps required for styles (though Vite handles bundling).

## Development & Quality Assurance

### 6. [ESLint](https://eslint.org/) (v9)
*   **Role:** Linter
*   **Why it's used:**
    *   **Code Quality:** Enforces coding standards and best practices.
    *   **Error Prevention:** Catches common syntax and logic errors before they are committed.
