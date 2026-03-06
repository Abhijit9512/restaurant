Restaurant Management Web App 🍽️

A modern Restaurant Management Web Application that allows customers to view the menu, place orders, and reserve tables while enabling restaurant staff to manage orders through an admin dashboard and kitchen display.

This project is designed as a Minimum Viable Product (MVP) and can be expanded into a multi-restaurant SaaS platform.

Live Demo

Deployed using Render

Example URL:

https://your-app-name.onrender.com
Features
Customer Features

View restaurant menu

Add items to cart

Place food orders

Table reservation system

Mobile responsive interface

Admin Features

Admin dashboard

Manage menu items

View and manage orders

Table management

Reservation management

Automatic receipt generation

Kitchen Panel

Real-time order display

Order status updates

Cooking workflow management

Order statuses:

Pending
Cooking
Ready
Completed
Tech Stack

Frontend

React

Tailwind CSS

React Router

Backend / Database

Supabase

PostgreSQL

Deployment

Render

Version Control

GitHub

Project Structure
restaurant-app
│
├── src
│   ├── components
│   │
│   ├── pages
│   │   ├── Home.jsx
│   │   ├── Menu.jsx
│   │   ├── Cart.jsx
│   │   ├── Checkout.jsx
│   │   ├── Reservation.jsx
│   │   ├── AdminDashboard.jsx
│   │   ├── KitchenPanel.jsx
│   │
│   ├── services
│   │   └── supabaseClient.js
│   │
│   └── App.jsx
│
├── public
└── package.json
Database Schema
Menu Items
id
name
description
price
category
image_url
created_at
Orders
id
customer_name
phone
table_number
items
total_price
status
created_at
Reservations
id
name
phone
date
time
people
created_at
Tables
id
table_number
seats
status
Environment Variables

Create a .env file in the root directory.

VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_public_key

You can find these keys in:

Supabase Dashboard → Settings → API

Installation

Clone the repository:

git clone https://github.com/your-username/restaurant-app.git

Navigate to project folder:

cd restaurant-app

Install dependencies:

npm install

Run development server:

npm run dev

The application will run on:

http://localhost:5173
Deployment

This project is deployed using Render.

Steps:

Push project to GitHub

Connect repository to Render

Configure build settings

Build command:

npm install && npm run build

Publish directory:

dist

Add environment variables in Render dashboard.

Future Improvements

Planned upgrades for the platform:

QR code table ordering

WhatsApp order notifications

Online payment integration

Multi-restaurant SaaS system

Analytics dashboard

Inventory management

Customer loyalty system

License

This project is licensed under the MIT License.

Author

Developed by

Abhijit Jadhav

Aspiring Web Developer building modern SaaS applications.
