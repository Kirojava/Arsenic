# Arsenic Summit - Model United Nations Conference Website

## Overview

Arsenic Summit is a full-stack web application for a Model United Nations (MUN) conference. It serves as the official platform for delegate registration, committee information, team member showcase, event management, and gallery features. The application features a premium dark theme with Imperial Blue branding, built for a professional diplomatic conference experience.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight alternative to React Router)
- **State Management**: TanStack React Query for server state
- **Styling**: Tailwind CSS with custom Imperial Blue theme, CSS variables for theming
- **UI Components**: shadcn/ui component library (Radix primitives)
- **Animations**: Framer Motion for page transitions and interactions
- **Forms**: React Hook Form with Zod validation
- **Build Tool**: Vite with custom plugins for Replit integration

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript (ESM modules)
- **API Design**: RESTful endpoints under `/api/*` prefix
- **Authentication**: Replit Auth (OpenID Connect) with Passport.js
- **Session Management**: express-session with PostgreSQL session store (connect-pg-simple)

### Data Layer
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM with drizzle-zod for schema validation
- **Schema Location**: `shared/schema.ts` (main app tables), `shared/models/auth.ts` (auth tables)
- **Migrations**: Drizzle Kit with `db:push` command

### Project Structure
```
├── client/           # React frontend
│   └── src/
│       ├── components/   # UI components (shadcn/ui + custom)
│       ├── hooks/        # Custom React hooks for data fetching
│       ├── pages/        # Route page components
│       └── lib/          # Utilities and query client
├── server/           # Express backend
│   ├── replit_integrations/auth/  # Replit Auth integration
│   ├── routes.ts     # API route definitions
│   ├── storage.ts    # Database access layer
│   └── db.ts         # Database connection
├── shared/           # Shared code between client/server
│   ├── schema.ts     # Drizzle database schema
│   ├── routes.ts     # API route type definitions with Zod
│   └── models/       # Auth-specific models
└── migrations/       # Database migrations
```

### Key Design Decisions

1. **Monorepo Structure**: Client and server share TypeScript types through the `shared/` directory, ensuring type safety across the full stack.

2. **Type-Safe API**: Route definitions in `shared/routes.ts` use Zod schemas for request/response validation, shared between frontend hooks and backend handlers.

3. **Storage Pattern**: `server/storage.ts` implements an `IStorage` interface abstracting database operations, making it testable and swappable.

4. **Dual User Tables**: There's a conflict between `shared/schema.ts` users (serial ID, app-specific fields) and `shared/models/auth.ts` users (UUID, auth-specific). The auth system uses its own table for Replit Auth compliance.

5. **Component Architecture**: Uses shadcn/ui's copy-paste component model - components are in `client/src/components/ui/` and fully customizable.

## External Dependencies

### Database
- **PostgreSQL**: Primary data store, connection via `DATABASE_URL` environment variable
- **Tables**: users, sessions, committees, registrations, teamMembers, events, galleryImages

### Authentication
- **Replit Auth**: OpenID Connect provider for user authentication
- **Required Env Vars**: `ISSUER_URL`, `REPL_ID`, `SESSION_SECRET`, `DATABASE_URL`

### Third-Party Services
- **Google Fonts**: Inter and Montserrat font families
- **Unsplash**: Placeholder images for conference imagery

### Key NPM Dependencies
- `drizzle-orm` / `drizzle-kit`: Database ORM and migrations
- `@tanstack/react-query`: Server state management
- `framer-motion`: Animations
- `react-hook-form` / `zod`: Form handling and validation
- `passport` / `openid-client`: Authentication
- `express-session` / `connect-pg-simple`: Session management

### Development Tools
- `vite`: Frontend build and dev server
- `tsx`: TypeScript execution for server
- `esbuild`: Production server bundling