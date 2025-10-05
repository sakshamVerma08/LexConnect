# ⚖️ LexConnect - Legal Services Marketplace

<div align="center">

![LexConnect Banner](./assets/banner.png)

### 🏆 Winner of LexHacks 1.0

**A LinkedIn for Lawyers meets AI-Powered Legal Assistant**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Next.js](https://img.shields.io/badge/Next.js-000000?logo=next.js&logoColor=white)](https://nextjs.org/)

[Demo](#demo) • [Features](#features) • [Installation](#installation) • [Screenshots](#screenshots) • [Contributing](#contributing)

</div>

---

## 📖 About

LexConnect is a comprehensive legal services platform built on the PERN stack (PostgreSQL, Express, React, Node.js) with Next.js that bridges the gap between legal professionals and clients while making legal services more accessible and understandable. The platform combines professional networking features similar to LinkedIn with an intelligent AI assistant that simplifies complex legal documents for non-legal professionals.

Whether you're a lawyer looking to offer pro bono services, a legal professional seeking to network with peers, or someone in need of legal assistance, LexConnect provides the tools and community to connect, collaborate, and communicate effectively.

## ✨ Key Features

### 🤖 AI-Powered Document Simplification
- Upload complex legal documents and receive plain-language explanations
- AI chatbot breaks down legal jargon into understandable terms
- Perfect for clients without legal backgrounds

### 👥 Professional Networking
- LinkedIn-style profiles for lawyers
- Showcase specializations, experience, and credentials
- Build your professional legal network

### 💼 Service Marketplace
- **Pro Bono Services**: Connect with lawyers offering free legal assistance
- **Paid Consultations**: Browse and book legal services
- Category-based search (Family Law, Criminal Law, Corporate Law, etc.)

### 📝 Legal Blog Community
- Lawyers can share insights, articles, and legal updates
- Discuss recent judgments and legal developments
- Comment and engage with the legal community

### 🔍 Advanced Search & Filtering
- Filter lawyers by specialization, experience, and rating
- Location-based search
- Availability and pricing filters

### ⭐ Rating & Review System
- Client reviews and ratings for lawyers
- Build trust through transparent feedback
- Quality assurance for legal services

### 💬 Real-Time Messaging
- Direct communication between lawyers and clients
- Secure and private conversations
- Case discussion and consultation

### 📊 Case Management Dashboard
- Track ongoing cases
- Manage client relationships
- Monitor pro bono commitments

## 🎬 Demo

![Demo GIF](./assets/demo.gif)

[Live Demo Link](#) | [Video Walkthrough](#)

## 📸 Screenshots

<div align="center">

### Landing Page
![Landing Page](./assets/landing.png)

### AI Document Simplification
![AI Assistant](./assets/ai-assistant.png)

### Legal Community
![Blog Section](./assets/blog.png)


</div>

## 🛠️ Tech Stack

### Frontend
- **Next.js** - React framework with SSR/SSG
- **React.js** - UI library
- **Material-UI (MUI)** - Component library
- **Redux/Context API** - State management
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **PostgreSQL** - Relational database
- **Prisma/Sequelize** - ORM
- **JWT** - Authentication
- **Socket.io** - Real-time messaging

### AI Integration
- **OpenAI API / Custom NLP Model** - Document simplification
- **Natural Language Processing** - Legal text analysis

### Additional Tools
- **Multer** - File upload handling
- **Cloudinary** - Image storage
- **bcrypt** - Password hashing
- **dotenv** - Environment variables

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16.0.0 or higher)
- **PostgreSQL** (v12 or higher)
- **npm** or **yarn**
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/lexconnect.git
   cd lexconnect
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Set up PostgreSQL database**
   ```bash
   # Create a new PostgreSQL database
   createdb lexconnect
   
   # Or using psql
   psql -U postgres
   CREATE DATABASE lexconnect;
   \q
   ```

5. **Set up environment variables**

   Create a `.env` file in the `backend` directory:
   ```env
   # Server Configuration
   PORT=5000
   NODE_ENV=development

   # Database
   DATABASE_URL=postgresql://username:password@localhost:5432/lexconnect
   
   # JWT Secret
   JWT_SECRET=your_jwt_secret_key_here
   JWT_EXPIRE=7d
   
   # AI API (OpenAI or your custom API)
   AI_API_KEY=your_openai_api_key
   AI_API_URL=https://api.openai.com/v1
   
   # Cloudinary (for image uploads)
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   
   # Email Configuration (optional)
   EMAIL_SERVICE=gmail
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASSWORD=your_email_password
   
   # Frontend URL
   CLIENT_URL=http://localhost:3000
   ```

   Create a `.env.local` file in the `frontend` directory:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   NEXT_PUBLIC_SOCKET_URL=http://localhost:5000
   ```

6. **Run database migrations**
   ```bash
   cd backend
   # If using Prisma
   npx prisma migrate dev
   npx prisma generate
   
   # If using Sequelize
   npx sequelize-cli db:migrate
   ```

7. **Run the application**

   **Backend:**
   ```bash
   cd backend
   npm run dev
   ```

   **Frontend (Next.js):**
   ```bash
   cd frontend
   npm run dev
   ```

8. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000LOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   
   # Email Configuration (optional)
   EMAIL_SERVICE=gmail
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASSWORD=your_email_password
   
   # Frontend URL
   CLIENT_URL=http://localhost:3000
   ```

   Create a `.env` file in the `frontend` directory:
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   REACT_APP_SOCKET_URL=http://localhost:5000
   ```

5. **Start MongoDB**
   ```bash
   # For macOS/Linux
   mongod
   
   # For Windows
   # Start MongoDB service from Services or run:
   "C:\Program Files\MongoDB\Server\{version}\bin\mongod.exe"
   ```

6. **Run the application**

   **Backend:**
   ```bash
   cd backend
   npm run dev
   ```

   **Frontend:**
   ```bash
   cd frontend
   npm start
   ```

7. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 📁 Project Structure

```
lexconnect/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── lawyerController.js
│   │   ├── caseController.js
│   │   ├── blogController.js
│   │   └── aiController.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Lawyer.js
│   │   ├── Case.js
│   │   ├── Blog.js
│   │   └── Message.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── lawyers.js
│   │   ├── cases.js
│   │   ├── blogs.js
│   │   └── ai.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── upload.js
│   ├── utils/
│   │   └── aiService.js
│   └── server.js
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Auth/
│   │   │   ├── Lawyer/
│   │   │   ├── Blog/
│   │   │   ├── AI/
│   │   │   └── Common/
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── LawyerProfile.jsx
│   │   │   ├── Marketplace.jsx
│   │   │   ├── Blog.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── context/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
│
└── assets/
    └── (screenshots and images)
```

## 🎯 Usage

### For Lawyers

1. **Create Profile**: Sign up and complete your professional profile
2. **List Services**: Add pro bono or paid service offerings
3. **Write Blogs**: Share your legal expertise with the community
4. **Connect**: Network with other legal professionals
5. **Manage Cases**: Track and manage client cases through the dashboard

### For Clients

1. **Search Lawyers**: Find lawyers by specialization and location
2. **Use AI Assistant**: Upload legal documents for simplified explanations
3. **Request Services**: Connect with lawyers for pro bono or paid assistance
4. **Read Blogs**: Stay informed about legal developments
5. **Leave Reviews**: Rate and review your experience with lawyers

## 🏆 LexHacks 1.0 Recognition

This project was awarded **1st Place at LexHacks 1.0**, recognizing its innovation in:
- Making legal services more accessible
- Democratizing legal knowledge through AI
- Building a supportive legal community
- Bridging the gap between legal professionals and those in need

## 🤝 Contributing

We welcome contributions to LexConnect! Here's how you can help:

1. **Fork the repository**
2. **Create your feature branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

### Contribution Guidelines
- Follow the existing code style
- Write clear commit messages
- Update documentation as needed
- Add tests for new features
- Ensure all tests pass before submitting PR

## 🐛 Bug Reports

Found a bug? Please open an issue with:
- Clear description of the bug
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)
- Your environment details

## 📋 Roadmap

- [ ] Mobile application (React Native)
- [ ] Video consultation feature
- [ ] Multi-language support
- [ ] Advanced AI features (case prediction, legal research)
- [ ] Integration with legal databases
- [ ] Payment gateway integration
- [ ] Appointment scheduling system
- [ ] Document template library

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)
- Email: your.email@example.com

## 🙏 Acknowledgments

- Thanks to LexHacks 1.0 organizers and judges
- OpenAI for AI capabilities
- The open-source community
- All contributors and testers

## 📞 Support

For support, email support@lexconnect.com or join our Slack channel.

---

<div align="center">

**Made with ❤️ and ⚖️ by the LexConnect Team**

⭐ Star this repo if you find it helpful!

</div>
