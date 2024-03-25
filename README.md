# Dev Finder Application

[DevFinder Demo](https://devfinder-production.up.railway.app/)

The Dev Finder application helps developers connect with each other based on their interests, skills, and projects. It provides a platform for developers to collaborate, share knowledge, and find potential team members or mentors.

## Features

- **User Authentication**: Secure user authentication using OAuth providers like Google and GitHub.
- **Profile Creation**: Users can create profiles with their skills, interests, and projects they are working on.
- **Search and Filter**: Search and filter developers based on their skills and interests.
- **Project Collaboration**: Ability to create and join projects, collaborate with other developers, and work on shared projects.
- **Screen Sharing**: Share your screen with other users in real time for collaborative coding or presentations.

## Tech Stack

- **Frontend**: Next.js with Tailwind CSS and Shadcn UI for building the user interface.

- **Backend**: Next.js with Drizzle ORM and PostgreSQL for server-side application logic and database operations, running through Docker.

- **Authentication**: NextAuth.js for OAuth-based authentication with providers like Google and GitHub.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/FALAK097/devfinder.git
cd dev-finder
npm i
npm run dev
```

2. Set up environment variables (`.env`):

   - Rename the `.env.sample` file to `.env`.
   - Add those credentials to the `.env` file

3. Open your browser and navigate to <http://localhost:3000> to access the application.

4. To run drizzle studio

```bash
npm run db:studio
```

5. To run postgresql locally , use docker desktop and run

```bash
docker compose up
```

6. To run migrations

```bash
npm run db:push
```
