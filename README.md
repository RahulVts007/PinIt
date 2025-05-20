# PinIt

PinIt is a modern web application built with React, TypeScript, and Vite. It provides a platform for users to create and manage organizations, posts, and reminders.

## Features

- **Authentication**: User registration, login, and profile management.
- **Organizations**: Create and join organizations with invite codes.
- **Posts**: Create, filter, and manage posts within organizations.
- **Reminders**: Set and manage reminders for posts.
- **Notifications**: Real-time notifications for important updates.

## Tech Stack

- **Frontend**: React, TypeScript, Vite
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Routing**: React Router
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **Notifications**: react-hot-toast

## Project Structure

- **src/**: Main source code directory
  - **components/**: Reusable UI components
    - **auth/**: Authentication-related components
    - **common/**: Shared components
    - **layout/**: Layout components
    - **organization/**: Organization-related components
    - **posts/**: Post-related components
  - **data/**: Mock data for development
  - **pages/**: Main application pages
  - **stores/**: State management using Zustand
  - **types/**: TypeScript type definitions

## Getting Started

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd pinit
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

## Scripts

- `npm run dev`: Start the development server
- `npm run build`: Build the project for production
- `npm run lint`: Run ESLint to check for code issues
- `npm run preview`: Preview the production build locally

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License. 