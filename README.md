# 📝 Social Blog Hub

**Social Blog Hub** is a dynamic, full-stack blogging platform that empowers users to create, explore, and manage blog posts with rich media support. Built with **React**, **Tailwind CSS**, and **Appwrite**, it offers a seamless, responsive, and intuitive user experience for content creators and readers alike.

---

## 🚀 Features

- **🔐 User Authentication**  
  Secure sign-up, login, and logout using Appwrite Authentication with session handling.

- **🛡️ Role-Based Access Control (RBAC)**  
  Admins and users have separate access rights. Admins can manage all content; users can manage only their own posts.

- **✍️ Create, Edit, and Delete Posts**  
  Users can publish blog posts, update their content, or delete them anytime through a dedicated dashboard.

- **🖼️ Image Upload with Appwrite Storage**  
  Posts support feature image uploads. Images are securely stored and retrieved from Appwrite cloud storage.

- **📃 Browse and Read Posts**  
  All users (including non-logged-in visitors) can browse a dynamic list of published posts and view detailed post pages.

- **📱 Fully Responsive Design**  
  The app looks and works great on mobile, tablet, and desktop with Tailwind CSS breakpoints.

- **🎨 Modern UI with Animations**  
  Clean and engaging UI built with animated buttons, transitions, hover effects, and feedback animations.

- **⚠️ Robust Error Handling & User Feedback**  
  Friendly validation messages, form alerts, and toast notifications for success/error states.

- **☁️ Full Cloud Integration with Appwrite**  
  Handles backend services including Authentication, Database (NoSQL), and File Storage — no need for custom backend.

- **🧭 Seamless Navigation**  
  Smooth page transitions and protected routes using React Router for a seamless browsing experience.

- **🔄 Redux Toolkit for State Management**  
  Centralized app state for auth status, user info, and post data using Redux Toolkit.

- **📂 Clean Folder Architecture**  
  Well-organized source structure with components, pages, services, assets, and configuration files.

- **🛠️ Easy Environment Configuration**  
  Setup with `.env` for secure and flexible deployment using Vite environment variables.
  

## 🌟 Future Enhancements

🗨️ **Real-Time Comments & Notifications**  
Enable live user interactions with instant updates and alerts.

🔍 **Advanced Search & Content Discovery**  
Implement smart filters, keyword search, and tag-based discovery.

👤 **User Profiles & Social Features**  
Allow users to build personal profiles, follow others, and engage with the community.

📌 **Bookmarking & Draft Saving**  
Users can save favorite posts and draft content before publishing.

📊 **Admin Dashboard & Moderation Tools**  
Powerful admin tools for managing content, users, and reports efficiently.



## 🛠️ Tech Stack

| Layer         | Technologies                           |
|--------------|----------------------------------------|
| Frontend     | React, Tailwind CSS, Vite              |
| Backend/API  | Appwrite (Cloud Auth, DB, Storage)     |
| State Mgmt   | Redux Toolkit                          |
| Routing      | React Router                           |
| Deployment   | Vercel       |

---

## ⚙️ Getting Started

1️⃣ **Clone the repository:**
   ```bash
   git clone https://github.com/divyeshgangara2211/Social_Blog_App.git
   cd Social_Blog_App
   ```

2️⃣ **Install dependencies:**
   ```bash
   npm install
   ```

3️⃣ **Configure environment variables:**
   - Create a `.env` file in the root directory.
   - Add your Appwrite credentials:
     ```
     VITE_APPWRITE_URL=your-appwrite-endpoint
     VITE_APPWRITE_PROJECT_ID=your-project-id
     VITE_APPWRITE_DATABASE_ID=your-database-id
     VITE_APPWRITE_COLLECTION_ID=your-collection-id
     VITE_APPWRITE_BUCKET_ID=your-bucket-id
     ```

4️⃣ **Run the development server:**
   ```bash
   npm run dev
   ```

5️⃣ **Open the app:**
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


## 📬 Contact

For questions, feedback, or collaboration inquiries:  
📧 **Email:** [divyeshgangera22@gmail.com](mailto:divyeshgangera22@gmail.com)  
🔗 **GitHub:** [github.com/divyeshgangera2211](https://github.com/divyeshgangara2211)

---

## 🤝 Contributing

Contributions are welcome!
Feel free to fork this project, make changes, and submit a pull request.
Let’s build better, together! 🚀


## License
Copyright (c) 2025 Divyesh Gangera

