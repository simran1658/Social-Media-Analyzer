# Social Media Content Analyzer

The **Social Media Content Analyzer** is a full-stack application that helps users optimize their social media content for better engagement. It leverages **Google's Gemini AI** to provide actionable, AI-generated suggestions for posts uploaded as images or PDFs.

---

## ✨ Features

- **Multimodal Analysis**: Upload images or PDFs. The app uses OCR and PDF parsing to extract text.  
- **AI-Powered Insights**: Google's Gemini 1.5 Flash model analyzes the content and provides expert tips for improving engagement.  
- **Modern UI**: A clean, responsive, and professional interface built with React and Tailwind CSS.  
- **Efficient Backend**: Fast Node.js/Express server handles file uploads, AI processing, and file cleanup.

---

## 🚀 Tech Stack

### Frontend
- **React**: UI library  
- **Tailwind CSS**: Utility-first styling  
- **axios**: For API calls  
- **react-icons**: For modern icons  
- **react-markdown**: To render AI suggestions  

### Backend
- **Node.js & Express**: Server framework  
- **Google Gemini API**: AI engine  
- **multer**: Handles file uploads  
- **pdf2json**: Extracts text from PDFs  
- **tesseract.js**: Performs OCR on images  
- **dotenv**: Manages environment variables  

---

## ⚙️ Installation & Setup

### 1. Clone the Repository
git clone https://github.com/<your-username>/Social-Media-Content-Analyzer.git<br>
cd Social-Media-Content-Analyzer

### 2. Backend Setup

Navigate to the backend directory, install dependencies, and create a .env file with your Gemini API key:

cd backend
npm install


Create a .env file:

GEMINI_API_KEY=your_gemini_api_key_here

### 3. Frontend Setup

Navigate to the frontend directory and install dependencies:

cd ../frontend
npm install

### 4. Run the Application

Open two terminal windows:

#### Terminal 1 – Start the backend:

cd backend
npm start


#### Terminal 2 – Start the frontend:

cd frontend
npm start


The application will be available at http://localhost:5000
