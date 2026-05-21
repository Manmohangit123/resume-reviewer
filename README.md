# 📄 Resume Reviewer — AI-Powered Resume Analysis Tool

<div align="center">


🌐 Live App: https://manmohangit123.github.io/resume-reviewer

💻 Code: https://github.com/Manmohangit123/resume-reviewer

</div>

---

## ✨ Features

- 📊 **AI Score** — Get an overall resume score out of 10
- 💪 **Strengths Analysis** — Discover what makes your resume stand out
- ⚠️ **Improvement Areas** — Know exactly what needs to be fixed
- ❌ **Missing Elements** — Find out what sections are missing
- 💡 **Smart Tips** — Get formatting and tone suggestions
- 📝 **Formatting Feedback** — Detailed formatting issue detection
- 📄 **PDF Support** — Upload any PDF resume instantly
- 🌙 **Dark UI** — Sleek, modern dark theme interface

---

## 📸 Screenshots

> Upload your resume PDF and get instant AI-powered feedback with a beautiful dark UI.
> <img width="1920" height="1020" alt="image" src="https://github.com/user-attachments/assets/7a3dd552-ffe5-4606-986c-e35579f90e18" />


| Upload Screen | Results Screen |
|--------------|---------------|
| Clean drag & drop interface | Detailed score with animated ring |
| PDF text extraction | Color-coded feedback cards |

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | HTML5, CSS3, Vanilla JavaScript |
| **Backend** | Node.js, Express.js |
| **AI Model** | OpenRouter API (Free Tier) |
| **PDF Parsing** | PDF.js |
| **Environment** | dotenv |
| **Process Manager** | PM2 |

---

## ⚙️ Installation

### Prerequisites
- Node.js v18+ installed
- OpenRouter API key (free at [openrouter.ai](https://openrouter.ai))

### Step 1 — Clone the Repository

```bash
git clone https://github.com/Manmohangit123/resume-reviewer.git
cd resume-reviewer
```

### Step 2 — Install Dependencies

```bash
cd backend
npm install
```

### Step 3 — Setup Environment Variables

Create a `.env` file inside the `backend` folder:

```env
OPENROUTER_API_KEY=your_openrouter_api_key_here
PORT=3000
```

> Get your free API key at [https://openrouter.ai/keys](https://openrouter.ai/keys)

### Step 4 — Start the Backend Server

```bash
node server.js
```

You should see:
```
Server running on http://localhost:3000
```

### Step 5 — Open the Frontend

Open `frontend/index.html` in your browser by double clicking it.

---

## 📁 Project Structure

```
resume-reviewer/
│
├── backend/
│   ├── server.js          # Express server + AI integration
│   ├── .env               # API keys (not uploaded to GitHub)
│   └── package.json       # Dependencies
│
├── frontend/
│   ├── index.html         # Main UI
│   ├── style.css          # Styling
│   └── app.js             # Frontend logic + PDF extraction
│
└── .gitignore             # Ignores node_modules and .env
```

---

## 🔄 How It Works

```
User uploads PDF resume
        ↓
PDF.js extracts text from PDF
        ↓
Text sent to Node.js backend
        ↓
Backend sends text to OpenRouter AI
        ↓
AI analyzes and returns JSON feedback
        ↓
Frontend displays beautiful results
```

---

## 🚀 Usage

1. Open the app in your browser
2. Drag & drop your resume PDF or click **Browse File**
3. Click **✦ Review My Resume**
4. Wait a few seconds for AI analysis
5. View your detailed feedback with scores and suggestions

---

## 🔐 Security

- API keys are stored in `.env` file and never exposed to the frontend
- `.env` is added to `.gitignore` to prevent accidental uploads
- All AI requests are made from the backend server only

---

## 🌱 Future Improvements

- [ ] Support for DOCX files
- [ ] Job description matching score
- [ ] ATS (Applicant Tracking System) score
- [ ] Multiple resume comparison
- [ ] Export feedback as PDF report
- [ ] User authentication and history

---

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## 📜 License

This project is licensed under the **MIT License** — feel free to use it for personal or commercial projects.

---

## 👨‍💻 Author

**Manmohan**

[![GitHub](https://img.shields.io/badge/GitHub-Manmohangit123-181717?style=flat&logo=github)](https://github.com/Manmohangit123)
[![LinkedIn] (https://www.linkedin.com/in/manmohan-kancherla/)

---

<div align="center">

⭐ **If you found this project helpful, please give it a star!** ⭐

Made with ❤️ by Manmohan

</div>
