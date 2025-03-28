# LMS Portal Project

This is an LMS (Learning Management System) portal project built with [Next.js](https://nextjs.org/), [UploadThing](https://uploadthing.com/), and [Mux](https://mux.com/). It allows users to upload and manage files such as images, videos, and documents with authentication and role-based access control.

## Features

- Upload course images, attachments, and chapter videos.
- Video streaming powered by Mux for high-quality playback.
- Role-based access control using Clerk authentication.
- File size and type restrictions for secure uploads.
- Middleware for custom authorization logic.

## Project Structure

- **API Routes**:
  - `app/api/uploadthing/route.ts`: Handles file upload routes.
  - `app/api/uploadthing/core.ts`: Defines file upload logic and middleware.
- **Authentication**: Uses Clerk for user authentication.
- **Authorization**: Custom logic to ensure only authorized users (e.g., teachers) can upload files.
- **Video Streaming**: Integrates Mux for video processing and playback.

## Prerequisites

- Node.js (v16 or later)
- npm, yarn, or pnpm
- Environment variables configured in a `.env` file (e.g., Clerk API keys, Mux API keys)

## Getting Started

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to access the application.

## Deployment

You can deploy this project on platforms like [Vercel](https://vercel.com/) for seamless hosting.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [UploadThing Documentation](https://docs.uploadthing.com/)
- [Mux Documentation](https://docs.mux.com/)
- [Clerk Documentation](https://clerk.dev/docs)

## License

This project is licensed under the MIT License.
