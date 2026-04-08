# Project: Strategy Community

## Tech Stack
- Framework: Next.js 16 (App Router)
- Language: TypeScript
- Database: PostgreSQL (migrating to Cranl managed PostgreSQL)
- ORM: Prisma
- Auth: Custom (bcryptjs)
- Styling: Tailwind CSS
- Deployment: Cranl (https://docs.cranl.com/)

## Architecture
- Next.js App Router with route groups: `(auth)` and `(main)`
- API routes in `src/app/api/`
- Prisma for database access via `src/lib/prisma.ts`
- Server-side rendering with client components where needed

## Key Conventions
- All components go in `src/components/`
- All API routes in `src/app/api/`
- Database schema in `prisma/schema.prisma`
- Use `cn()` helper for conditional class names if available

## Commands
- `npm run dev` — Start development server
- `npm run build` — Production build (runs prisma generate first)
- `npm run start` — Start production server
- `npx prisma db push` — Push schema to database
- `npx prisma migrate dev` — Run migrations
- `npx prisma studio` — Open Prisma Studio
- `npm run db:seed` — Seed database

## Deployment Target: Cranl
- Platform docs: https://docs.cranl.com/
- CLI: `cranl` (install from https://cranl.com/install.sh)
- Build type: nixpacks (auto-detects Next.js)
- Database: Cranl managed PostgreSQL
- Omar (Cloud Integration Specialist) handles all Cranl operations

## The Team
- **Reem** — Project Architect (technical lead, architecture decisions)
- **Tumtum** — UI/UX Designer (design system, accessibility, user flows)
- **Yoki** — Frontend Developer (React components, pages, client logic)
- **Nabil** — Backend Developer (APIs, server actions, business logic)
- **Salma** — Database Engineer (schemas, migrations, Prisma, queries)
- **Zain** — Security Specialist (audits, auth review, hardening)
- **Farida** — QA / Code Reviewer (testing, standards, bug tracking)
- **Tarek** — DevOps (Docker, CI/CD, infrastructure)
- **Layla** — Technical Writer (docs, API docs, changelogs)
- **Omar** — Cloud Integration Specialist (Cranl platform, deployment, databases)

## Agent Team Coordination Rules
- Each teammate owns specific directories — do NOT edit files outside your scope
- Always pull latest before starting work
- Communicate blockers through the shared task list
- Zain (Security) must review all auth-related changes
- Farida (QA) must check all changes before they're considered done
- Reem (Architect) approves all structural changes
- Omar (Cloud) handles all Cranl deployment and database operations

## CRITICAL: Discovery Before Creation
Every teammate MUST search the codebase before creating any utility, helper, constant, or shared logic. Duplicated logic is a blocking issue flagged by Farida (QA).
