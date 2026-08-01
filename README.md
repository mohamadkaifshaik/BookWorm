## Bookworm 🪱 - Personal Book Manager

A simple full-stack app to track the books I'm reading, want to read, and have finished.

## Features

- Sign up / log in / log out (JWT auth)
- Add, edit, and delete books
- Each book has a title, author, tags, and status
- Filter books by status or tag
- Dashboard shows total books, currently reading, and completed

## Tech Stack

- **Frontend:** Next.js (App Router)
- **Styling:** Tailwind CSS
- **Backend:** Next.js API routes
- **Database:** MongoDB (Mongoose)
- **Auth:** JWT stored in an httpOnly cookie

## Project Structure

app/ -> main
page.js -> landing page
login/ -> login page
signup/ -> signup page
dashboard/ -> main dashboard (protected)
api/ -> restapis
auth/ -> signup, login, logout, me
books/ -> book CRUD routes
components/ -> UI components (book card, forms, navbar, etc)
lib/ -> db connection, auth helpers
models/ -> User and Book schemas

## Getting Started

1. Install dependencies:

```bash
   npm install
```

2. Copy the example env file and fill it in:

```bash
   cp .env.example .env.local
```

You'll need:

- `MONGODB_URI` - your MongoDB connection string (Atlas or local)
- `JWT_SECRET` - any random string, used to sign JWTs

3. Run the dev server:

```bash
   npm run dev
```

Open [http://localhost:3000]

## Notes

- Passwords are hashed with bcrypt before being stored.
- Every book is tied to a `owner` field, so users can only see/edit their own books.
- Protected routes (like `/dashboard`) redirect to `/login` if you're not signed in.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
