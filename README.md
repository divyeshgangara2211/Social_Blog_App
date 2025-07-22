# Social Blog Hub

Social Blog Hub is a full-stack web application that enables users to create, manage, and explore blog posts with image uploads. Built with React for the frontend and Appwrite for backend services, the platform offers a modern, responsive user interface and robust features for a seamless blogging experience.

## Features

- **User Authentication:**  
  Secure registration, login, and logout functionality using Appwrite authentication.

- **Role-Based Access Control:**  
  Differentiate between regular users and admins, restricting or allowing access to specific features as needed.

- **Create, Edit, and Delete Posts:**  
  Authenticated users can create new blog posts, edit their existing posts, and delete posts they own.

- **Image Uploads:**  
  Users can upload images to accompany their blog posts. Images are stored securely in Appwrite cloud storage and displayed in posts.

- **Post Listing and Details:**  
  All users can browse a list of published blog posts and view detailed content for each post.

- **Responsive UI:**  
  The application is fully responsive and optimized for all devices, providing a smooth user experience on desktop and mobile.

- **Animated and Modern Components:**  
  Utilizes Tailwind CSS for styling and includes interactive, animated buttons and transitions for a professional look and feel.

- **Error Handling and Feedback:**  
  User-friendly error messages and feedback are provided throughout the app for actions like failed logins, invalid form submissions, and missing content.

- **Cloud Integration:**  
  Seamless integration with Appwrite for authentication, database, and file storage services.

## Tech Stack

- **Frontend:** React, Tailwind CSS, Vite
- **Backend & Services:** Appwrite (Authentication, Database, Storage)
- **State Management:** Redux Toolkit
- **Routing:** React Router

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/divyeshgangara2211/Social_Blog_App.git
   cd Social_Blog_App
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   - Create a `.env` file in the root directory.
   - Add your Appwrite credentials:
     ```
     VITE_APPWRITE_URL=your-appwrite-endpoint
     VITE_APPWRITE_PROJECT_ID=your-project-id
     VITE_APPWRITE_DATABASE_ID=your-database-id
     VITE_APPWRITE_COLLECTION_ID=your-collection-id
     VITE_APPWRITE_BUCKET_ID=your-bucket-id
     ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open the app:**
   - Visit [http://localhost:5173] in your browser.

## Folder Structure

```
src/
  components/      # Reusable UI components (Button, Input, PostCard, etc.)
  pages/           # Main pages (Home, AllPosts, AddPost, EditPost, etc.)
  services/        # Appwrite service wrappers (auth, fileService, etc.)
  store/           # Redux slices and store configuration
  conf/            # Appwrite configuration
  assets/          # Static assets (images, icons)
  App.jsx          # Main app component
  main.jsx         # Entry point
```

## Future Enhancements

- Real-time comments and notifications
- Advanced content discovery and search
- User profiles and social features


