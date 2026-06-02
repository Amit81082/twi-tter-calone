# 🐦 Twi-tter Clone

A full-stack Twitter/X clone built with **Next.js 15**, **TypeScript**, **Tailwind CSS**, **MongoDB**, **Prisma**, **NextAuth**, and **SWR**.

Users can create posts, comment, like/unlike posts, follow/unfollow users, receive notifications, update profiles, and explore user profiles in a modern responsive interface.

---

## 📸 Screenshots

Add screenshots here after deployment:

<img width="1363" height="634" alt="image" src="https://github.com/user-attachments/assets/07a539b3-07b1-47db-8085-c154370c90d5" />
<img width="1362" height="632" alt="image" src="https://github.com/user-attachments/assets/393e3dd0-4f48-4740-8f7f-c49f59c9693a" />
<img width="1366" height="640" alt="image" src="https://github.com/user-attachments/assets/a5bd7bd3-3578-4fc6-b6ae-6655b940ac4a" />
<img width="1364" height="642" alt="image" src="https://github.com/user-attachments/assets/82c14274-5cda-4999-b05a-cfdc422bc900" />

---

## 🚀 Features

### 🔐 Authentication

* Register account
* Login with credentials
* Protected API routes
* Session management with NextAuth

### 👤 User Profile

* Edit profile
* Upload profile image
* Upload cover image
* View user profile
* Follow / Unfollow users

### 📝 Posts

* Create tweet/post
* Delete own post
* View single post
* User-specific post feed
* Global timeline feed

### ❤️ Likes

* Like post
* Unlike post
* Real-time like state updates

### 💬 Comments

* Create comments
* View comments on a post
* Comment feed

### 🔔 Notifications

* Follow notifications
* Like notifications
* Notification page
* Unread notification support

### 🎨 UI

* Responsive design
* Mobile friendly
* Tailwind CSS
* Toast notifications
* Loading states

---

## 🛠️ Tech Stack

### Frontend

* Next.js 15
* React
* TypeScript
* Tailwind CSS
* SWR
* Axios

### Backend

* Next.js Route Handlers
* Prisma ORM
* MongoDB Atlas
* NextAuth

### Utilities

* React Hot Toast
* React Dropzone
* Date-fns
* React Icons

---

## 📂 Project Structure

```bash
src
│
├── app
│   ├── api
│   ├── notifications
│   ├── posts
│   └── users
│
├── components
│   ├── posts
│   ├── comments
│   ├── modals
│   └── layout
│
├── hooks
│   ├── useCurrentUser
│   ├── usePosts
│   ├── usePost
│   ├── useLike
│   ├── useFollow
│   └── useNotification
│
├── libs
│   ├── prismadb
│   ├── ServerAuth
│   └── fetcher
│
└── providers
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL=

NEXTAUTH_SECRET=

NEXTAUTH_URL=http://localhost:3000
```

---

## 📦 Installation

### Clone Repository

```bash
git clone https://github.com/Amit81082/twi-tter-calone.git
```

### Move Into Project

```bash
cd twi-tter-calone
```

### Install Dependencies

```bash
npm install
```

### Generate Prisma Client

```bash
npx prisma generate
```

### Push Prisma Schema

```bash
npx prisma db push
```

### Run Development Server

```bash
npm run dev
```

Application:

```bash
http://localhost:3000
```

---

## 🗄️ Database

MongoDB Atlas is used as the primary database.

Main collections:

* Users
* Posts
* Comments
* Notifications

---

## 🔄 API Endpoints

### Authentication

```http
/api/auth/*
```

### Users

```http
GET    /api/users/[userId]
POST   /api/follow
DELETE /api/follow
```

### Posts

```http
GET    /api/posts
POST   /api/posts

GET    /api/posts/[postId]
DELETE /api/posts/[postId]
```

### Comments

```http
POST   /api/comments
```

### Likes

```http
POST   /api/like
DELETE /api/like
```

### Notifications

```http
GET /api/notifications
```

---

## 🌐 Deployment

This project can be deployed easily on:

* Vercel

---

## 🎯 Learning Goals

This project helped me learn:

* Full-stack development
* Authentication with NextAuth
* Prisma with MongoDB
* Route Handlers in Next.js
* SWR data fetching
* API design
* Optimistic UI updates
* Responsive UI development

---

## 📄 License

This project is for educational and portfolio purposes.

---

## 👨‍💻 Author

### Amit Maurya

GitHub:
https://github.com/Amit81082

Built with ❤️ using Next.js, Prisma, MongoDB and Tailwind CSS.
