# College Administration Dashboard

## Overview

This is a full-stack web application for managing college administration tasks. It's built with React (frontend) and Express.js (backend), using PostgreSQL with Drizzle ORM for database management. The application provides a comprehensive dashboard for managing faculty, banners, news/notices, IPR records, management teams, committees, and gallery items.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes

### Dark Mode Implementation (July 14, 2025)
- Added complete dark mode functionality with theme toggle
- Implemented ThemeProvider context for system-wide theme management
- Added ThemeToggle component in navbar for easy theme switching
- Updated all components with dark mode styling (dashboard, navbar, sidebar, cards)
- Enhanced color scheme with proper dark mode variants

### Dummy Logo & Login Page (July 14, 2025)
- Added dummy logo placeholder (graduation cap SVG) in sidebar - ready for user replacement
- Created beautiful login page with gradient background and modern design
- Added authentication flow with demo credentials (admin/admin123)
- Implemented proper routing structure for login/dashboard separation
- Added logout functionality in user dropdown menu

### Enhanced Eye-Catching Design & UX (July 14, 2025)
- Added comprehensive custom animations (fadeIn, slideIn, pulse, shimmer effects)
- Enhanced card hover effects with 3D transforms and advanced shadows
- Implemented glassmorphism effects with backdrop blur
- Added animated gradient backgrounds and floating elements
- Enhanced sidebar with gradient backgrounds and animated navigation items
- Improved navbar with backdrop blur and enhanced search input
- Redesigned dashboard cards with gradient backgrounds and status indicators
- Enhanced login page with shimmer effects, floating elements, and improved typography
- Added loading spinners and enhanced button interactions
- Implemented staggered animations for better visual hierarchy

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **Routing**: Wouter for client-side routing
- **UI Components**: Radix UI with shadcn/ui component library
- **Styling**: Tailwind CSS with custom design tokens
- **State Management**: TanStack Query for server state management
- **Forms**: React Hook Form with Zod validation
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript (ES modules)
- **Database**: PostgreSQL with Drizzle ORM
- **API Design**: RESTful API with JSON responses
- **Middleware**: Express middleware for request logging and error handling
- **Development**: Hot reloading with Vite integration

### Database Schema
The application uses PostgreSQL with the following main entities:
- **users**: Authentication and user management
- **faculty**: Faculty member information (ID, name, department, designation, gender)
- **banners**: Homepage banners with priority ordering
- **news**: News and notices with importance levels
- **ipr**: Intellectual Property Records
- **managementTeam**: Management team members
- **cellsCommittees**: Various committees and cells
- **gallery**: Photo gallery with categorization

## Key Components

### Authentication & Authorization
- Basic user authentication system (users table with username/password)
- Session-based authentication planned (connect-pg-simple for session storage)

### Admin Dashboard
- Responsive sidebar navigation with mobile support
- Statistics cards showing counts of various entities
- Search functionality across all modules
- Filtering capabilities for better data management

### CRUD Operations
Each main entity supports:
- Create new records with form validation
- Read/List records with pagination support
- Update existing records
- Delete records with confirmation
- Export capabilities for data management

### File Management
- File upload component for images and documents
- Support for banners, gallery images, and PDF documents
- Mock file handling (ready for cloud storage integration)

### Data Validation
- Zod schemas for runtime validation
- Form validation with React Hook Form
- Database constraints through Drizzle ORM

## Data Flow

1. **Client Request**: User interactions trigger API calls through TanStack Query
2. **API Layer**: Express.js routes handle HTTP requests and validate data
3. **Database Layer**: Drizzle ORM executes SQL queries against PostgreSQL
4. **Response**: JSON responses sent back to client
5. **UI Update**: TanStack Query updates the UI with fresh data

### State Management Flow
- **Server State**: Managed by TanStack Query with automatic caching
- **Form State**: Handled by React Hook Form with Zod validation
- **UI State**: Local component state for modals, filters, and interactions

## External Dependencies

### Database
- **PostgreSQL**: Primary database (configured via DATABASE_URL)
- **Neon Database**: Serverless PostgreSQL hosting (@neondatabase/serverless)
- **Drizzle ORM**: Type-safe database queries and migrations

### UI Framework
- **Radix UI**: Accessible component primitives
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: Pre-built component library

### Development Tools
- **Vite**: Build tool and development server
- **TypeScript**: Type safety and developer experience
- **ESBuild**: Fast JavaScript bundler for production

### Utilities
- **date-fns**: Date manipulation and formatting
- **clsx**: Conditional CSS class management
- **nanoid**: Unique ID generation

## Deployment Strategy

### Development
- **Local Development**: `npm run dev` starts both frontend and backend
- **Hot Reloading**: Vite provides instant updates during development
- **Database Migrations**: `npm run db:push` for schema updates

### Production Build
- **Frontend**: Vite builds optimized React bundle to `dist/public`
- **Backend**: ESBuild bundles server code to `dist/index.js`
- **Static Serving**: Express serves built frontend files in production

### Environment Configuration
- **DATABASE_URL**: PostgreSQL connection string (required)
- **NODE_ENV**: Environment flag (development/production)
- **File Storage**: Currently mock implementation, ready for cloud integration

### Deployment Considerations
- The application is configured for containerized deployment
- Database migrations should be run before starting the application
- Environment variables must be properly configured
- File upload functionality will need cloud storage integration (AWS S3, Cloudinary, etc.)

## Technical Decisions

### Why Drizzle ORM?
- **Type Safety**: Full TypeScript support with compile-time query validation
- **Performance**: Lightweight with minimal runtime overhead
- **Developer Experience**: Intuitive API similar to SQL
- **Migration Support**: Built-in schema migration capabilities

### Why TanStack Query?
- **Caching**: Automatic request deduplication and caching
- **Background Updates**: Keeps data fresh without blocking UI
- **Error Handling**: Robust error boundaries and retry logic
- **Developer Tools**: Excellent debugging capabilities

### Why Radix UI + shadcn/ui?
- **Accessibility**: WCAG compliant components out of the box
- **Customization**: Flexible theming and styling options
- **Consistency**: Uniform design system across the application
- **Maintenance**: Well-maintained and actively developed

The architecture prioritizes type safety, developer experience, and maintainability while providing a robust foundation for college administration management.