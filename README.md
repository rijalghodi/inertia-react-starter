# Undangan.com

This is a web application built with Laravel and React, using [Inertia](https://inertiajs.com). This starter kit utilizes React, TypeScript, Tailwind, and the [shadcn/ui](https://ui.shadcn.com) and [radix-ui](https://www.radix-ui.com) component libraries.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- PHP (>= 8.2 recommended)
- Composer
- Node.js (>= 20 recommended)
- npm or pnpm (this project includes a `pnpm-workspace.yaml`, so `pnpm` is highly recommended)

## Installation

1. **Install PHP dependencies** using Composer:

   ```bash
   composer install
   ```

2. **Install JavaScript dependencies** using your package manager:

   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Environment Setup**:
   Copy the example environment file and configure your local settings (like the database connection).

   ```bash
   cp .env.example .env
   ```

4. **Generate Application Key**:

   ```bash
   php artisan key:generate
   ```

5. **Run Database Migrations** (if your database is configured):
   ```bash
   php artisan migrate
   ```

## Development Guide

To work on the project locally, you need to run both the Laravel development server and the Vite development server to compile frontend assets with Hot Module Replacement (HMR).

1. **Start the Laravel backend server**:

   ```bash
   php artisan serve
   ```

   _Your backend server will typically be available at `http://localhost:8000`._

2. **Start the Vite frontend development server**:
   In a new, separate terminal window, run:
   ```bash
   npm run dev
   # or
   pnpm dev
   ```
   _This enables real-time updates for your React components as you edit them._

3. **Other tools**:

   ```bash
   npm run lint:fix   // Fixes linting errors
   npm run format    // Formats code
   npm run typecheck // Checks TypeScript types
   ```

## Build and Run for Production

When preparing the application for a production environment, you need to build the frontend assets and optimize the backend.

1. **Build frontend assets**:
   This compiles and minifies your React application and CSS for production.

   ```bash
   npm run build
   # or
   pnpm build
   ```

   _The compiled files will be output to the `public/build` directory._

2. **Optimize Laravel configuration**:
   Cache your configuration, routes, and views to improve performance:

   ```bash
   php artisan config:cache
   php artisan route:cache
   php artisan view:cache
   ```

3. **Directory Permissions** (if running on a Linux web server):
   Ensure your web server has write access to the necessary directories:
   ```bash
   chmod -R 775 storage bootstrap/cache
   ```

