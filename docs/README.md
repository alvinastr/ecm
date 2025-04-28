# E-Commerce Project Documentation

Welcome to the documentation for our Next.js e-commerce application. This documentation provides comprehensive information about the project structure, technologies used, and implementation details.

## Table of Contents

- [Overview](#overview)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Documentation Sections](#documentation-sections)
- [Tech Stack](#tech-stack)

## Overview

This project is a modern e-commerce platform built with Next.js, utilizing the App Router architecture. It features product management through Sanity CMS, user authentication, cart functionality, and a responsive design built with Tailwind CSS.

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   Create a `.env.local` file with the following variables:
   ```
   DATABASE_URL=your_postgresql_connection_string
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
   NEXT_PUBLIC_SANITY_DATASET=your_sanity_dataset
   SANITY_API_READ_TOKEN=your_sanity_api_token
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

The project follows a feature-based approach for organization:

