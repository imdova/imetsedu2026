# Medicova  Online Courses Platform

Medicova is an online learning platform similar to Udemy, built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Home Page**: Hero section, featured courses, and category browsing
- **Course Details Page**: Comprehensive course information including curriculum, reviews, and requirements
- **Course Search Page**: Advanced search with filters for category, level, and price
- **Course Listing**: Browse all available courses
- **Responsive Design**: Modern UI that works on all devices

## Getting Started

First, install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `app/` - Next.js app router pages
  - `page.tsx` - Home page
  - `courses/` - Course listing and detail pages
  - `search/` - Course search page
- `components/` - Reusable React components
  - `Header.tsx` - Navigation header
  - `Footer.tsx` - Site footer
  - `CourseCard.tsx` - Course card component
  - `CategoryCard.tsx` - Category card component
- `types/` - TypeScript type definitions
- `lib/` - Utility functions and mock data

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
