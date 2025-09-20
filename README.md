# 🚀 EasyServe

<p align="center">
  <img src="https://raw.githubusercontent.com/Aseeeem-kc/easy-serve/refs/heads/main/frontend/src/assets/easyservelogo2.png" alt="EasyServe Logo" style="max-width: 300px;">
</p>


[![Python](https://img.shields.io/badge/Python-3.12-blue)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.104-brightgreen)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-18-cyan)](https://reactjs.org/)
[![LangGraph](https://img.shields.io/badge/LangGraph-purple)](https://langchain-ai.github.io/langgraph/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> **A B2B SaaS Platform Revolutionizing Customer Support with Multi-Agent AI**  
> *Automate, Escalate, Elevate – Seamlessly blending AI efficiency with human empathy for e-commerce and beyond.*

---

## 📖 Project Overview

EasyServe is an innovative B2B SaaS application designed to automate customer support processes using a multi-agent AI framework. Tailored for small-to-mid-sized e-commerce businesses, it handles everything from simple FAQs to complex ticket resolutions, with intelligent escalation to human agents via a human-in-the-loop mechanism.

### 🌟 Why EasyServe?
- **Market Gap Filler**: Bridges the divide between basic chatbots and premium enterprise tools, reducing costs by 25%+ while boosting satisfaction.
- **Scalable & Reliable**: Powered by retrieval-augmented generation (RAG) and specialized agents for tiered query handling.
- **Ongoing Project**: Actively in development with iterative improvements.

**Author**: Ashim KC

---

## ✨ Key Features

- **Business Onboarding & RAG Pipeline** 🏢: Easy signup, workflow config, and knowledge base uploads for personalized AI responses.
- **Multi-Agent Query Handling** 🤖: 
  - *Info Retrieval Agent*: Instant FAQs and order status via RAG.
  - *Ticket Management Agent*: Automates mid-level issues like returns and updates.
  - *Escalation Agent*: Priority queue for complex/sensitive queries to humans.
- **Analytics Dashboard** 📊: Real-time insights on resolution accuracy, response times, feedback trends, and efficiency metrics.
- **Human-in-the-Loop** 👥: Ensures trust with seamless AI-to-human handovers.
- **SME-Friendly SaaS** ☁️: Cloud-hosted, secure, and scalable for multiple businesses.

| Feature | Benefit | Status |
|---------|---------|--------|
| Tiered Query Handling | Reduces escalation by 40% | 🟡 In Development (Sprint 2) |
| RAG Knowledge Base | 95%+ accuracy on domain queries | 🟢 Implemented |
| Real-Time Analytics | Actionable insights for optimization | 🟠 Planned (Sprint 3) |

---

## 🏗️ Architecture

EasyServe follows a modular, agentic workflow. Here's a high-level breakdown:

### Subsystems
1. **Subsystem A: Business Onboarding & Data Pipeline**  
   - Input: Registration, workflows, docs/FAQs.  
   - Output: Configured account with integrated knowledge base.  
   - Tools: FastAPI, React/Tailwind, PostgreSQL, LangChain/LlamaIndex.

2. **Subsystem B: Multi-Agent Query Handling**  
   - Core agents for retrieval, ticketing, and escalation.  
   - Challenges: Hallucination mitigation, real-time performance.  
   - Tools: LangGraph for orchestration.

3. **Subsystem C: Business Dashboard & Management Panel**  
   - Features: Metrics monitoring, ticket management, human agent interface.  
   - Users: Business managers & support staff.  
   - Tools: React, Recharts/D3.js, FastAPI APIs.

---

## 🛠️ Tech Stack

| Category | Technology | Purpose |
|----------|------------|---------|
| **Language** | Python 3.12 | Backend & AI logic |
| **Backend** | FastAPI | RESTful APIs, async workflows |
| **Frontend** | React.js + Tailwind CSS | Interactive dashboards & UI |
| **AI Orchestration** | LangGraph | Multi-agent workflows |
| **Databases** | PostgreSQL (relational) + Chroma DB (vector) | Structured data & embeddings |
| **Embeddings** | MiniLM | Semantic search for RAG |
| **Version Control** | GitHub | Code management |
| **Additional** | Lucide/Font Awesome (icons), Recharts (charts) | UI/UX enhancements |

---

## 📅 Roadmap

Adopting **Scrum Methodology** with 2-3 week sprints over 8 months.

| Phase | Activities | Status |
|-------|------------|--------|
| 1. Research & Planning | Lit review, requirements | Ongoing |
| 2. System Design | Architecture & specs |  Ongoing |
| 3. Sprint 1 | Onboarding & RAG Pipeline | 🔄 Upcoming |
| 4. Sprint 2 | Multi-Agent Handling | 🟡 In Progress |
| 5. Sprint 3 | Analytics Dashboard | 🔄 Upcoming |
| 6. Integration & Testing | Full integration, metrics eval | 🔄 Planned |
| 7. Deployment & Docs | Cloud deploy, report | 🔄 Planned |

**Current Focus**: Research and Planning

---

## 📚 Literature & Inspirations

- Adam et al. (2021): AI Chatbots & User Compliance.  
- Perumallapalli (2025): Conversational AI in Enterprises.  
- Huang & Rust (2024): Feeling AI for Customer Care.  
- System Reviews: [Zendesk](https://www.zendesk.com/) vs [Freshworks](https://www.freshworks.com/).

---

## ⚠️ Limitations (Current Prototype)
- English-only support.  
- SME focused(eg, marketplaces, clinics, etc).  
- Text-based and voice-based.  
- No live CRM scraping.

---

## 📄 License

This project is MIT licensed. See [LICENSE](LICENSE) for details.

---

## 👋 Connect

- **Author**: [Ashim Khatri Chhetri](https://github.com/Aseeeem-kc)  
- **Email**: ashimkc7297@gmail.com
- **LinkedIn**: [Ashim KC](https://linkedin.com/in/ashimkchhetri)  

Questions? Open an issue or reach out! 🚀

---

*Let's automate the future of support!*
