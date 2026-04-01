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

## 🏗️ Architecture

### Backend Stack
- **FastAPI** - High-performance Python web framework
- **Vector Database** - Qdrant for semantic search
- **LLM Integration** - Large Language Models for response generation
- **Authentication** - JWT-based security

### Frontend Stack
- **React 18** - Modern UI framework
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API communication

## 📁 Project Structure

```
├── backend/
│   ├── app/
│   │   ├── api/              # API routes
│   │   ├── ingestion/        # Document processing & loading
│   │   ├── models/           # Data schemas & models
│   │   ├── services/         # Business logic
│   │   └── utils/            # Utilities & config
│   ├── dataset/              # Document storage
│   ├── qdrant_db/            # Vector database
│   ├── main.py               # Application entry point
│   └── requirements.txt      # Python dependencies
│
├── frontend/
│   ├── src/
│   │   ├── components/       # Reusable React components
│   │   ├── pages/            # Page components
│   │   └── main.jsx          # Frontend entry point
│   ├── index.html            # HTML template
│   ├── vite.config.js        # Vite configuration
│   └── tailwind.config.js    # Tailwind CSS configuration
```

## 🚀 Getting Started

### Prerequisites
- Python 3.8+
- Node.js 16+
- npm or yarn

### Backend Setup

```bash
cd backend
pip install -r requirements.txt
python main.py
```

The backend API will run at `http://localhost:8000`

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at `http://localhost:5173`

## 📚 Document Categories

The system manages documents in the following categories:
- **Circulars** - Official announcements and notices
- **Guidelines** - Best practices and standards
- **Regulations** - Rules and compliance requirements
- **Schemes** - Government and institutional schemes

## 🔐 Security

- JWT-based authentication for secure access
- Document access control
- Encrypted sensitive data

## 🛠️ Development

### Available Scripts

**Backend:**
```bash
python main.py          # Start development server
```

**Frontend:**
```bash
npm run dev            # Development server
npm run build          # Production build
npm run preview        # Preview production build
```

## 📖 API Documentation

Visit `http://localhost:8000/docs` for interactive API documentation (Swagger UI)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Authors

Shreeya Pandey

## 📞 Support

For issues, questions, or suggestions, please open an issue on GitHub.

---

**Last Updated:** April 2026
