# 🚀 AI Resume Analyser (Full Stack Monorepo)

The **AI Resume Analyser (Resumix)** is a full-stack platform that analyzes PDF resumes using **Google Gemini AI**. It extracts text, provides ATS compatibility scores, strengths, weaknesses, missing skills, and manages user profiles.

This repository contains both the **Frontend** (React + Vite) and the **Backend** (Spring Boot 3.5 REST API).

---

## 📁 Repository Structure

* `frontend/` - React 19, Vite, Tailwind CSS, Framer Motion
* `resume-analyser-backend/` - Spring Boot 3.5.6, Java 21, MySQL, JWT, Gemini API
* `Dockerfile` - Multi-stage production build for the backend

---

## 🛠️ Tech Stack

### Frontend
* **React 19 & Vite**
* **Tailwind CSS & Framer Motion** (for styling and animations)
* **Axios & React Router**

### Backend
* **Java 21 & Spring Boot 3.5.6**
* **MySQL Database** with Hibernate ORM
* **Google Gemini AI API** for intelligent ATS scoring
* **Apache PDFBox** for robust PDF text extraction
* **JWT** for secure authentication

---

## 🔌 API Endpoints

### 🔐 Authentication (`/api/users`)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/api/users/register` | Public | Register a new user |
| `POST` | `/api/users/login` | Public | Login and receive Bearer JWT token |

### 📄 Resume Analysis (`/api/resume`)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/api/resume/upload` | Authenticated (JWT) | Upload PDF resume (`multipart/form-data`), extract text, analyze with Gemini AI, and return JSON report |

---

## ⚙️ Configuration & Environment Variables

The application can be configured via environment variables or `application.properties`:

| Variable | Default | Description |
|---|---|---|
| `PORT` | `8081` | Server port |
| `SPRING_DATASOURCE_URL` | `jdbc:mysql://localhost:3306/resume_analyser` | Database connection URL |
| `SPRING_DATASOURCE_USERNAME` | `root` | Database username |
| `SPRING_DATASOURCE_PASSWORD` | `Priyanshu@1437` | Database password |
| `GEMINI_API_KEY` | *(Set your key)* | Google Gemini API Key |
| `JWT_SECRET` | *(Default secret)* | Secret key for signing JWT tokens |
| `FILE_UPLOAD_DIR` | `uploads` | Local upload directory for PDF files |

---

## 🚀 Running Locally

### 1. Start the Backend
```bash
# Clone the repository
git clone https://github.com/priiyaaannshu/AI-Resume-Analyser.git
cd AI-Resume-Analyser/resume-analyser-backend

# Run with Maven Wrapper
./mvnw spring-boot:run
```
The backend will start at: `http://localhost:8081`

### 2. Start the Frontend
Open a new terminal window:
```bash
cd AI-Resume-Analyser/frontend

# Install dependencies
npm install

# Start development server
npm run dev
```
The frontend will start at: `http://localhost:5173`
