# AI-Powered Regulatory Document Intelligence System for Higher Education

An intelligent Retrieval-Augmented Generation (RAG) system designed for higher education institutions to efficiently search, retrieve, and analyze regulatory documents including circulars, guidelines, regulations, and schemes.

## 🎯 Overview

This system enables students, faculty, and administrators to query a comprehensive document collection using natural language, receiving contextual answers with source references. Built with modern web technologies and powered by vector databases for semantic search.

## ✨ Key Features

- **Smart Document Q&A** - Ask questions about regulatory documents and get instant answers
- **Vector Database Search** - Fast semantic search using Qdrant vector database
- **Multi-Document Support** - Handle PDFs, regulations, circulars, guidelines, and scheme documents
- **Modern Dashboard** - Real-time statistics and system overview
- **Dark Mode Support** - Eye-friendly interface with theme toggle
- **Responsive Design** - Seamless experience across desktop, tablet, and mobile
- **Source Attribution** - Every answer includes references to source documents
- **Real-time Updates** - Live government announcements and updates

---

## 🏗️ Tech Stack

### Backend
| Tool | Purpose |
|------|---------|
| FastAPI | High-performance REST API |
| Qdrant | Vector database for semantic search |
| LLM | Response generation |
| JWT | Authentication & security |

### Frontend
| Tool | Purpose |
|------|---------|
| React 18 | UI framework |
| Vite | Fast build tool |
| Tailwind CSS | Styling |
| Axios | API communication |

---

## 📁 Project Structure

```
retrival/
├── backend/
│   ├── app/
│   │   ├── api/           # API routes & endpoints
│   │   ├── ingestion/     # Document processing & loading
│   │   ├── models/        # Data schemas & models
│   │   ├── services/      # Business logic
│   │   └── utils/         # Utilities & config
│   ├── dataset/           # Document storage
│   ├── qdrant_db/         # Vector database files
│   ├── main.py            # App entry point
│   └── requirements.txt   # Python dependencies
│
├── frontend/
│   ├── src/
│   │   ├── components/    # Reusable React components
│   │   ├── pages/         # Page components
│   │   └── main.jsx       # Frontend entry point
│   ├── index.html
│   ├── vite.config.js
│   └── tailwind.config.js
│
└── docker-compose.yml     # Container orchestration
```

---

## 🚀 Getting Started

### Prerequisites
- Python 3.8+
- Node.js 16+
- Docker (optional but recommended)

---

### Option 1: Run with Docker (Recommended)

```bash
docker-compose up --build
```

Both backend and frontend will start automatically.

---

### Option 2: Run Manually

**Backend:**
```bash
cd backend
pip install -r requirements.txt
python main.py
```
API runs at → `http://localhost:8000`
API Docs (Swagger) → `http://localhost:8000/docs`

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```
App runs at → `http://localhost:5173`

---

## 📚 Supported Document Types

| Category | Description |
|----------|-------------|
| Circulars | Official announcements and notices |
| Guidelines | Best practices and standards |
| Regulations | Rules and compliance requirements |
| Schemes | Government and institutional schemes |

---

## 🔐 Security

- JWT-based authentication
- Document-level access control
- Encrypted sensitive data storage

---

## 🛠️ Available Scripts

**Backend:**
```bash
python main.py          # Start development server
```

**Frontend:**
```bash
npm run dev            # Start development server
npm run build          # Build for production
npm run preview        # Preview production build
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add your feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** 

---


