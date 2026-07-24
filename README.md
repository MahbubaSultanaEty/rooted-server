# 🌿 Rooted — Server

**Rooted** is a modern, premium real-estate platform where users can buy, rent, and discover properties — with the help of **Sage**, an AI-powered assistant. This repository contains the **backend (server-side)** REST API that powers the [Rooted client](https://github.com/MahbubaSultanaEty/rooted-client).

🔗 **Live Website:** [https://rooted-client.vercel.app/](https://rooted-client.vercel.app/)
📦 **Backend Repo:** [github.com/MahbubaSultanaEty/rooted-server](https://github.com/MahbubaSultanaEty/rooted-server)
📦 **Frontend Repo:** [github.com/MahbubaSultanaEty/rooted-client](https://github.com/MahbubaSultanaEty/rooted-client)

---

## ✨ Overview

This server exposes a REST API for managing property listings, user accounts, authentication, and the **Sage AI assistant**. It handles filtering and pagination for property search, role-based access for admin operations, and the natural-language layer that lets users chat with Sage to get property suggestions and general platform information.

---

## ⚙️ Tech Stack

| Category | Technology |
|---|---|
| Runtime | Node.js (ES Modules — `"type": "module"`) |
| Framework | [Express.js](https://expressjs.com/) |
| Database / ODM | MongoDB + [Mongoose](https://mongoosejs.com/) |
| Authentication | `better-auth` (MongoDB adapter) |
| Environment Config | `dotenv` |
| Deployment | Vercel / Node hosting |

---

## 🔑 Core Schemas & Data Structure

### Property Model (`models/Property.js`)
- `title`, `slug`, `description`, `price`, `priceUnit`
- `listingType`: `sale` | `rent`
- `propertyType`: `apartment`, `house`, `villa`, `office`, `plot`, `shop`
- Nested schemas: `location` (GeoJSON `Point` coordinates for map integration), `specs`, `amenities`, `stats`
- **Indexes**: text indexes for search + `2dsphere` geo-location index for fast filtering

### User Model (`models/User.js`)
- `name`, `email`, `role` (`user`, `agent`, `admin`)

---

## 📡 API Routes & Endpoints

### `/api/properties`
| Method | Route | Description |
|---|---|---|
| `GET` | `/` | Filter, sort (e.g. `price`, `-createdAt`), and paginate properties |
| `GET` | `/:id` | Get full details of a property by slug or ID |
| `POST` | `/` | Submit a new property *(authenticated)* |
| `PUT` | `/:id` | Edit an existing property *(owner or admin)* |
| `DELETE` | `/:id` | Delete a property *(owner or admin)* |
| `GET` | `/manage/me` | Get the authenticated user's own listings |

### `/api/users` *(Admin only)*
| Method | Route | Description |
|---|---|---|
| `GET` | `/` | List all registered users |
| `DELETE` | `/:id` | Disable/delete a user account (cannot delete own account) |

### 🤖 `/api/sage` — AI Assistant
Powers the **Sage** chatbot on the client, giving users a conversational way to search for properties and get answers about the platform.
| Method | Route | Description |
|---|---|---|
| `POST` | `/api/sage` | Accepts a user message (natural language), interprets intent, and returns relevant property suggestions and/or an informational response |

Sage can:
- Understand natural-language property requests (location, budget, bedrooms, property type, etc.) and map them to structured queries against the `Property` collection.
- Answer general questions about listings, neighborhoods, pricing, and how to use the platform.
- Return a mix of conversational text and matched property results for the client to render inline.

> Update this section with your actual request/response schema, the AI provider/model used, and any rate-limiting or auth requirements once finalized.

---

## ⚡ Database Seeding

```bash
node scripts/seed.js
```

Running `scripts/seed.js` clears existing dummy data and seeds the database with ~28 realistic properties across various regions of Bangladesh, complete with valid agent emails and dynamic Unsplash images.

---

## 📦 Getting Started

```bash
# Clone the repository
git clone https://github.com/MahbubaSultanaEty/rooted-server.git
cd rooted-server

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
```

**Environment variables (`.env`):**
```env
MONGODB_URI=mongodb://localhost:27017/rooted
PORT=5000
BETTER_AUTH_SECRET=your-secret-key
CLIENT_URL=http://localhost:3000
# Add your AI provider key here, e.g.:
# AI_API_KEY=your-ai-provider-key
```

```bash
# (Optional) Seed the database
node scripts/seed.js

# Run the development server
npm run dev
```

The API will be available at [http://localhost:5000](http://localhost:5000).

---

## 📁 Project Structure (high level)

```
rooted-server/
├── models/
│   ├── Property.js
│   └── User.js
├── routes/
│   ├── properties.js
│   ├── users.js
│   └── sage.js
├── controllers/
├── scripts/
│   └── seed.js
├── config/
│   └── db.js
└── index.js
```

---

## Deployment

The backend API serves the live client at [https://rooted-client.vercel.app/](https://rooted-client.vercel.app/). Deploy to your platform of choice (Vercel, Render, Railway, etc.) and point the client's `NEXT_PUBLIC_API_URL` to the deployed API URL.

---

## 🔗 Related

- Frontend: [`rooted-client`](https://github.com/MahbubaSultanaEty/rooted-client) (Next.js)

---

## 👩‍💻 Author

**Mahbuba Sultana**
GitHub: [@MahbubaSultanaEty](https://github.com/MahbubaSultanaEty)
