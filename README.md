<<<<<<< HEAD
# Social Media Content Analyzer

The **Social Media Content Analyzer** is a full-stack application that helps users optimize their social media content for better engagement. It leverages **Google's Gemini AI** to provide actionable, AI-generated suggestions for posts uploaded as images or PDFs.

---

## Technical Approach: A Hybrid Frontend/Backend Architecture
Our Social Media Content Analyzer is built on a unique hybrid architecture that intelligently distributes work between the client and server for optimal performance and efficiency.

The user-facing application is a React.js frontend that handles all user interactions. For image files (JPG, PNG), we utilize the Tesseract.js library to perform Optical Character Recognition (OCR) directly in the browser. This offloads a computationally intensive task from the server, providing faster feedback and a more responsive user experience.

For PDF documents, the frontend sends the file to a Node.js/Express.js backend using multer. The backend then uses pdf2json to accurately extract the text.

Regardless of the file type, all extracted text is sent to a single, unified API endpoint on the backend. Here, a well-engineered prompt is sent to the Gemini API for a detailed analysis of the content. This approach demonstrates a clean separation of concerns and a modern, scalable design. The final, AI-generated suggestions are returned to the frontend, where they are displayed to the user.

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

=======
Social Media Content Analyzer
The Social Media Content Analyzer is a full-stack application that helps users optimize their social media content for better engagement. It leverages Google's Gemini AI to provide actionable, AI-generated suggestions for posts uploaded as images or PDFs.

✨ Features
Multimodal Analysis: Upload images or PDFs. The app uses OCR and PDF parsing to extract text.
AI-Powered Insights: Google's Gemini 1.5 Flash model analyzes the content and provides expert tips for improving engagement.
Modern UI: A clean, responsive, and professional interface built with React and Tailwind CSS.
Efficient Backend: Fast Node.js/Express server handles file uploads, AI processing, and file cleanup.
🚀 Tech Stack
Frontend
React: UI library
Tailwind CSS: Utility-first styling
axios: For API calls
react-icons: For modern icons
react-markdown: To render AI suggestions
Backend
Node.js & Express: Server framework
Google Gemini API: AI engine
multer: Handles file uploads
pdf2json: Extracts text from PDFs
tesseract.js: Performs OCR on images
dotenv: Manages environment variables
⚙️ Installation & Setup
1. Clone the Repository
git clone https://github.com//Social-Media-Content-Analyzer.git
cd Social-Media-Content-Analyzer

2. Backend Setup
Navigate to the backend directory, install dependencies, and create a .env file with your Gemini API key:

cd backend npm install
>>>>>>> 08d4d68 (Add frontend as normal folder and update backend/README)

Create a .env file:

GEMINI_API_KEY=your_gemini_api_key_here

<<<<<<< HEAD
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
=======
3. Frontend Setup
Navigate to the frontend directory and install dependencies:

cd ../frontend npm install

4. Run the Application
Open two terminal windows:

Terminal 1 – Start the backend:
cd backend npm start

Terminal 2 – Start the frontend:
cd frontend npm start

The application will be available at http://localhost:5000
>>>>>>> 08d4d68 (Add frontend as normal folder and update backend/README)
