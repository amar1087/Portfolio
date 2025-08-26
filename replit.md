# Overview

This is a professional portfolio website built as a full-stack application showcasing Amarjeet Kaur, a Senior Full Stack Developer & Cloud Architect with 15+ years of experience. The application features a React frontend with a Node.js Express backend, designed to display portfolio information including experience, skills, projects, and contact details. The site includes an intelligent AI assistant that provides contextual responses about Amarjeet's expertise in AI solutions, full-stack development, and cloud architecture. The application is production-ready and optimized for AWS deployment with comprehensive build tools and deployment configurations.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **UI Library**: Comprehensive shadcn/ui component library with Radix UI primitives
- **Styling**: Tailwind CSS with CSS custom properties for theming (light/dark mode support)
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack React Query for server state management and data fetching
- **Form Handling**: React Hook Form with Zod validation resolvers

## Backend Architecture
- **Runtime**: Node.js with Express framework
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Storage Pattern**: Repository pattern with in-memory fallback for development
- **API Design**: RESTful endpoints for portfolio data and contact information
- **Session Management**: Express sessions with PostgreSQL store (connect-pg-simple)

## Database Schema
- **Users Table**: Authentication and user management
- **Portfolio Data Table**: Flexible schema supporting multiple content types (skills, experience, projects, certifications)
- **Contact Info Table**: Personal and professional contact information
- **Schema Validation**: Drizzle-Zod integration for type-safe database operations

## Development Workflow
- **Build Process**: Dual build system - Vite for frontend, esbuild for backend
- **Development Server**: Hot module replacement with Vite middleware integration
- **Type Safety**: Full TypeScript coverage across client, server, and shared modules
- **Code Organization**: Monorepo structure with shared schemas and utilities

## UI/UX Design Decisions
- **Component System**: Modular component architecture with consistent design tokens
- **Responsive Design**: Mobile-first approach with Tailwind breakpoint system
- **Loading States**: Skeleton loaders and progressive enhancement
- **Error Handling**: Graceful error boundaries with user-friendly messaging
- **Accessibility**: ARIA compliance and keyboard navigation support

# External Dependencies

## Database Services
- **Neon Database**: Serverless PostgreSQL hosting with connection pooling
- **Drizzle Kit**: Database migration and schema management tools

## UI and Styling
- **Radix UI**: Headless UI component primitives for accessibility
- **Tailwind CSS**: Utility-first CSS framework with custom design system
- **Lucide React**: Consistent icon library for visual elements
- **Google Fonts**: Typography with Architects Daughter, DM Sans, Fira Code, and Geist Mono

## Development Tools
- **Replit Integration**: Development environment with runtime error handling
- **PostCSS**: CSS processing with autoprefixer for browser compatibility
- **ESBuild**: Fast JavaScript bundling for production builds

## Utility Libraries
- **date-fns**: Date manipulation and formatting
- **clsx & class-variance-authority**: Dynamic CSS class management
- **nanoid**: Unique ID generation for database records
- **cmdk**: Command palette interface components
- **embla-carousel**: Touch-friendly carousel components