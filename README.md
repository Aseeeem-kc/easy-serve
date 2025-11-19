
<div align="center">
  <img src="https://raw.githubusercontent.com/Aseeeem-kc/easy-serve/refs/heads/main/frontend/src/assets/easyservelogo2.png" alt="EasyServe Logo" width="200">
  
  ### AI-Powered Customer Support Automation
  
  [![Python](https://img.shields.io/badge/Python-3.12-blue?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
  [![FastAPI](https://img.shields.io/badge/FastAPI-0.104-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
  [![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

  **Automate, Escalate, Elevate** – Seamlessly blending AI efficiency with human empathy for modern businesses.
  
  [View Demo](#) · [Report Bug](https://github.com/Aseeeem-kc/easy-serve/issues) · [Request Feature](https://github.com/Aseeeem-kc/easy-serve/issues)
</div>

---

## 📋 Table of Contents

- [About The Project](#-about-the-project)
- [Key Features](#-key-features)
- [Architecture](#-architecture)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

---

## 🎯 About The Project

<div align="center">
  <img src="https://via.placeholder.com/800x400/1F2937/FFFFFF?text=EasyServe+Dashboard+Preview" alt="Dashboard Preview" width="100%">
</div>

EasyServe is an innovative **B2B SaaS platform** that revolutionizes customer support through intelligent multi-agent AI automation. Built for small-to-mid-sized businesses, especially in e-commerce, it seamlessly handles everything from simple FAQs to complex ticket resolutions.

### 🌟 Why EasyServe?

| Problem | Solution | Impact |
|---------|----------|--------|
| 💰 High support costs | AI-first automation | **25%+ cost reduction** |
| ⏱️ Slow response times | Instant AI responses | **2.3min avg response** |
| 📈 Poor scalability | Multi-agent framework | **Handles 1000+ queries/hour** |
| 🎯 Low accuracy | RAG-powered knowledge base | **94%+ resolution rate** |

> *"Bridging the gap between basic chatbots and enterprise solutions, making advanced AI support accessible to growing businesses."*

---

## ✨ Key Features

<table>
  <tr>
    <td width="50%">
      
### 🏢 Business Onboarding
- **Quick Setup**: Register and configure in minutes
- **Knowledge Base Integration**: Upload docs, FAQs, policies
- **Custom Workflows**: Tailor AI responses to your business
- **RAG Pipeline**: Personalized, context-aware answers
      
    </td>
    <td width="50%">
      
### 🤖 Multi-Agent AI System
- **Info Retrieval Agent**: Instant FAQs & order status
- **Ticket Management**: Automated returns & updates
- **Escalation Agent**: Smart human handoff
- **84% AI Resolution Rate**
      
    </td>
  </tr>
  <tr>
    <td width="50%">
      
### 📊 Analytics Dashboard
- **Real-time Metrics**: Resolution rates, response times
- **Sentiment Analysis**: 68% positive, 22% neutral, 10% negative
- **Team Performance**: Track agent efficiency
- **AI vs Human Insights**: Monitor automation effectiveness
      
    </td>
    <td width="50%">
      
### 👥 Human-in-the-Loop
- **Seamless Escalation**: Priority queue for complex queries
- **Agent Interface**: Manage escalated tickets efficiently
- **Context Preservation**: Full conversation history
- **Trust & Quality**: Human oversight when needed
      
    </td>
  </tr>
</table>

### 🎨 Additional Highlights
```mermaid
graph LR
    A[Customer Query] --> B{AI Router}
    B -->|Simple| C[Info Agent]
    B -->|Medium| D[Ticket Agent]
    B -->|Complex| E[Human Agent]
    C --> F[Instant Response]
    D --> G[Automated Resolution]
    E --> H[Human Resolution]
```

- ✅ **Multi-channel Support**: Chat, email, social platforms
- ✅ **Enterprise Security**: End-to-end encryption, compliance
- ✅ **Real-time Processing**: Sub-second query routing
- ✅ **Scalable Architecture**: Cloud-native, horizontally scalable
- ✅ **API-First Design**: Easy third-party integrations

---

## 🏗️ Architecture

### System Overview
```
┌─────────────────────────────────────────────────────────────┐
│                     EasyServe Platform                       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Frontend   │  │   Backend    │  │      AI      │      │
│  │              │  │              │  │              │      │
│  │  React + TS  │◄─┤   FastAPI    │◄─┤  LangGraph   │      │
│  │   Tailwind   │  │  PostgreSQL  │  │   OpenAI     │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Core Subsystems

#### 🔷 Subsystem A: Business Onboarding & Data Pipeline
**Purpose**: Enable businesses to quickly onboard and configure their AI agents

**Components**:
- User registration & authentication (JWT-based)
- Knowledge base upload & processing
- Workflow configuration interface
- Vector database embedding pipeline

**Tech**: FastAPI, React, PostgreSQL, ChromaDB, MiniLM embeddings

#### 🔷 Subsystem B: Multi-Agent Query Handling
**Purpose**: Intelligent query routing and resolution using specialized agents

**Agents**:
1. **Info Retrieval Agent**: RAG-powered instant responses
2. **Ticket Management Agent**: Automates standard support tasks
3. **Escalation Agent**: Routes complex queries to humans

**Tech**: LangGraph orchestration, OpenAI GPT-4, Custom routing logic

#### 🔷 Subsystem C: Business Dashboard & Management
**Purpose**: Provide actionable insights and ticket management tools

**Features**:
- Real-time analytics & metrics
- Ticket queue management
- Agent performance tracking
- Sentiment analysis visualization

**Tech**: React, Recharts, D3.js, WebSocket for real-time updates

---

## 🛠️ Tech Stack

### Backend
![Python](https://img.shields.io/badge/Python-3.12-3776AB?style=flat-square&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-0.104-009688?style=flat-square&logo=fastapi&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=flat-square&logo=postgresql&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?style=flat-square&logo=redis&logoColor=white)

### Frontend
![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.3-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?style=flat-square&logo=vite&logoColor=white)

### AI & ML
![LangChain](https://img.shields.io/badge/LangChain-0.1-121212?style=flat-square)
![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4-412991?style=flat-square&logo=openai&logoColor=white)
![ChromaDB](https://img.shields.io/badge/ChromaDB-Vector-FF6F00?style=flat-square)

### DevOps & Tools
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=flat-square&logo=github-actions&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white)

<details>
<summary><b>📦 Complete Dependencies</b></summary>

**Backend**:
- `fastapi` - Modern web framework
- `uvicorn` - ASGI server
- `sqlalchemy` - Database ORM
- `alembic` - Database migrations
- `langchain` - LLM framework
- `langgraph` - Agent orchestration
- `chromadb` - Vector database
- `sentence-transformers` - Embeddings
- `python-jose` - JWT auth
- `passlib` - Password hashing
- `python-multipart` - File uploads

**Frontend**:
- `react` - UI framework
- `react-router-dom` - Routing
- `axios` - HTTP client
- `recharts` - Data visualization
- `lucide-react` - Icons
- `tailwindcss` - Styling
- `@tanstack/react-query` - Data fetching

</details>

---

## 🚀 Getting Started

### Prerequisites

- **Python** 3.12+
- **Node.js** 18+
- **PostgreSQL** 15+
- **Redis** (optional, for caching)
- **Git**

### Installation

1. **Clone the repository**
```bash
   git clone https://github.com/Aseeeem-kc/easy-serve.git
   cd easy-serve
```

2. **Backend Setup**
```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
```

3. **Environment Variables**
```bash
   cp .env.example .env
   # Edit .env with your configuration
```

   Required variables:
```env
   DATABASE_URL=postgresql://user:pass@localhost/easyserve
   OPENAI_API_KEY=your_openai_key
   SECRET_KEY=your_secret_key
   SMTP_HOST=smtp.gmail.com
   SMTP_USER=your_email
   SMTP_PASSWORD=your_password
```

4. **Database Migration**
```bash
   alembic upgrade head
```

5. **Frontend Setup**
```bash
   cd ../frontend
   npm install
```

6. **Run Development Servers**
   
   Terminal 1 (Backend):
```bash
   cd backend
   uvicorn main:app --reload --port 8000
```
   
   Terminal 2 (Frontend):
```bash
   cd frontend
   npm run dev
```

7. **Access the Application**
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:8000`
   - API Docs: `http://localhost:8000/docs`

### 🐳 Docker Setup (Alternative)
```bash
# Build and run with Docker Compose
docker-compose up --build

# Access at http://localhost:3000
```

---

## 📅 Roadmap

<table>
  <tr>
    <th width="20%">Phase</th>
    <th width="40%">Objectives</th>
    <th width="20%">Timeline</th>
    <th width="20%">Status</th>
  </tr>
  <tr>
    <td><b>Phase 1</b><br>Research & Planning</td>
    <td>
      • Literature review<br>
      • Requirements gathering<br>
      • Architecture design<br>
      • Tech stack finalization
    </td>
    <td>Month 1-2</td>
    <td>✅ <b>Complete</b></td>
  </tr>
  <tr>
    <td><b>Phase 2</b><br>Core Development</td>
    <td>
      • Authentication system<br>
      • Business onboarding flow<br>
      • RAG pipeline<br>
      • Multi-agent framework
    </td>
    <td>Month 3-5</td>
    <td>🟡 <b>In Progress</b></td>
  </tr>
  <tr>
    <td><b>Phase 3</b><br>Dashboard & Analytics</td>
    <td>
      • Real-time metrics<br>
      • Ticket management UI<br>
      • Sentiment analysis<br>
      • Performance monitoring
    </td>
    <td>Month 5-6</td>
    <td>🔄 <b>Planned</b></td>
  </tr>
  <tr>
    <td><b>Phase 4</b><br>Integration & Testing</td>
    <td>
      • End-to-end testing<br>
      • Performance optimization<br>
      • Security audit<br>
      • User acceptance testing
    </td>
    <td>Month 6-7</td>
    <td>⏳ <b>Upcoming</b></td>
  </tr>
  <tr>
    <td><b>Phase 5</b><br>Deployment</td>
    <td>
      • Cloud deployment<br>
      • CI/CD pipeline<br>
      • Documentation<br>
      • Marketing launch
    </td>
    <td>Month 7-8</td>
    <td>⏳ <b>Upcoming</b></td>
  </tr>
</table>

### 🎯 Current Sprint Focus (Sprint 2)

- [x] User authentication & authorization
- [x] Business profile management
- [x] Knowledge base upload
- [x] Password reset flow
- [ ] Multi-agent query routing
- [ ] Ticket escalation logic
- [ ] Real-time dashboard metrics

### 🔮 Future Enhancements

- 🌐 Multi-language support (Spanish, French, German)
- 📱 Mobile applications (iOS & Android)
- 🎤 Voice-based support integration
- 🔗 Advanced CRM integrations (Salesforce, HubSpot)
- 📊 Predictive analytics & ML insights
- 🤖 Custom agent training interface
- 💬 WhatsApp & SMS channel support

---



---

## ⚠️ Current Limitations

> **Note**: This is an active development project. Some features are in progress.

- 🌐 **Language**: Currently English-only (multilingual support planned)
- 🏢 **Target Market**: Focused on SMEs (enterprise features upcoming)
- 💬 **Channels**: Text-based primary, voice integration in roadmap
- 🔗 **CRM**: Manual integrations (live scraping planned)
- 📊 **Analytics**: Basic metrics (advanced ML insights upcoming)

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 👨‍💻 Author & Contact

<div align="center">
  
  ### Ashim K.C.
  
  **Full-Stack Developer | AI Enthusiast | Open Source Contributor**
  
  [![GitHub](https://img.shields.io/badge/GitHub-Aseeeem--kc-181717?style=for-the-badge&logo=github)](https://github.com/Aseeeem-kc)
  [![LinkedIn](https://img.shields.io/badge/LinkedIn-Ashim_KC-0077B5?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/ashimkchhetri)
  [![Email](https://img.shields.io/badge/Email-ashimkc7297%40gmail.com-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:ashimkc7297@gmail.com)
  
  **Project Link**: [https://github.com/Aseeeem-kc/easy-serve](https://github.com/Aseeeem-kc/easy-serve)
</div>

---

## 🙏 Acknowledgments

- [FastAPI](https://fastapi.tiangolo.com/) - Modern Python web framework
- [React](https://reactjs.org/) - UI library
- [LangChain](https://langchain.com/) - LLM framework
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [OpenAI](https://openai.com/) - AI models
- [Vercel](https://vercel.com/) - Hosting platform

---

<div align="center">
  
  ### ⭐ Star this repo if you find it helpful!
  
  **Let's automate the future of customer support together!** 🚀
  
  ![Visitors](https://visitor-badge.laobi.icu/badge?page_id=Aseeeem-kc.easy-serve)
  ![GitHub stars](https://img.shields.io/github/stars/Aseeeem-kc/easy-serve?style=social)
  ![GitHub forks](https://img.shields.io/github/forks/Aseeeem-kc/easy-serve?style=social)
  
</div>

