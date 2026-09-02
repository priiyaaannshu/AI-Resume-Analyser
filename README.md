# 🚀 AI Resume Analyser - Backend

Spring Boot 3.5 REST API backend for the **AI Resume Analyser (Resumix)** platform. Analyzes PDF resumes using **Google Gemini AI**, extracts text via Apache PDFBox, provides ATS compatibility scores, strengths, weaknesses, missing skills, and stores user profiles and resumes in MySQL with JWT-secured authentication.

---

## 🛠️ Tech Stack

* **Java 21**
* **Spring Boot 3.5.6** (Spring Web, Spring Security, Spring Data JPA)
* **MySQL Database** with Hibernate ORM
* **Google Gemini API** (Generative AI for ATS scoring & feedback)
* **Apache PDFBox 3.0.3** (PDF text extraction)
* **JWT (JSON Web Token)** with `jjwt 0.12.7`
* **Docker** (Multi-stage production build for Render/Railway deployment)

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

```bash
# Clone the repository
git clone https://github.com/priiyaaannshu/AI-Resume-Analyser.git
cd AI-Resume-Analyser/resume-analyser-backend

# Run with Maven Wrapper
./mvnw spring-boot:run
```

The backend will start at: `http://localhost:8081`
