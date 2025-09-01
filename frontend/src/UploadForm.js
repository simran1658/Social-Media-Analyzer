import React, { useState, useRef } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { FiUpload, FiCheck, FiRefreshCcw, FiAlertTriangle } from "react-icons/fi";

export default function UploadForm() {
    const [file, setFile] = useState(null);
    const [dragActive, setDragActive] = useState(false);
    const [loading, setLoading] = useState(false);
    const [suggestions, setSuggestions] = useState(null);
    const [error, setError] = useState(null);

    const inputRef = useRef(null);

    const handleAreaClick = () => {
        if (!loading) {
            inputRef.current.click();
        }
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setSuggestions(null);
            setError(null);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setDragActive(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setDragActive(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFile(e.dataTransfer.files[0]);
            setSuggestions(null);
            setError(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            setError("Please select or drag a file.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            setLoading(true);
            setSuggestions(null);
            setError(null);
            const API_URL = process.env.REACT_APP_API_URL;
            const res = await axios.post(`${API_URL}/analyze`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            setSuggestions(res.data.suggestions);
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.error || "An unexpected error occurred.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center w-screen min-h-screen bg-gray-950 text-gray-300 font-sans antialiased">
            <div className="w-full max-w-4xl mx-auto p-6 sm:p-12 border border-gray-800 rounded-3xl shadow-2xl bg-gray-900">
                <div className="text-center mb-10">
                    <h1 className="text-5xl font-bold tracking-tighter text-gray-100">
                        Synthesizer AI
                    </h1>
                    <p className="mt-2 text-xl text-gray-500 font-light">
                        Transforming content with intelligent analysis.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div
                        className={`
                        relative flex flex-col items-center justify-center h-60 border-2 border-dashed rounded-2xl transition-colors duration-300
                        ${dragActive ? "border-lime-400 bg-lime-900 bg-opacity-20" : "border-gray-700 bg-gray-800"}
                        ${loading ? "cursor-not-allowed" : "cursor-pointer"}
                    `}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={handleAreaClick}
                    >
                        <input
                            type="file"
                            ref={inputRef}
                            accept="application/pdf,image/*"
                            onChange={handleFileChange}
                            className="hidden"
                        />
                        {loading ? (
                            <div className="flex flex-col items-center">
                                <FiRefreshCcw className="animate-spin text-5xl text-lime-400 mb-4" />
                                <p className="text-lime-300 font-semibold text-lg">Analyzing your content...</p>
                            </div>
                        ) : file ? (
                            <div className="flex flex-col items-center text-green-400">
                                <FiCheck className="text-5xl mb-4" />
                                <p className="font-medium text-center text-lg">{file.name}</p>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center text-gray-500">
                                <FiUpload className="text-6xl mb-4" />
                                <p className="text-lg">Drag & Drop a file</p>
                                <p className="text-sm mt-1">or click to browse</p>
                            </div>
                        )}
                        <span className="absolute bottom-4 right-4 text-xs font-mono text-gray-600">.pdf, .png, .jpg</span>
                    </div>

                    <button
                        type="submit"
                        className={`
                        w-full py-4 rounded-xl text-lg font-bold
                        transition-colors duration-300 transform
                        ${loading || !file ? "bg-gray-700 text-gray-500 cursor-not-allowed" : "bg-lime-500 text-gray-900 hover:bg-lime-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500 focus:ring-offset-gray-900"}
                    `}
                        disabled={loading || !file}
                    >
                        {loading ? "Processing..." : "Synthesize Content"}
                    </button>
                </form>

                {error && (
                    <div className="mt-8 flex items-center p-4 bg-red-900 bg-opacity-30 text-red-400 border border-red-800 rounded-xl">
                        <FiAlertTriangle className="mr-3 text-2xl" />
                        <p className="font-medium">{error}</p>
                    </div>
                )}

                {suggestions && (
                    <div className="mt-12 p-8 bg-gray-800 rounded-2xl shadow-xl border border-gray-700">
                        <h2 className="text-3xl font-bold mb-6 text-gray-100">
                            Actionable Insights
                        </h2>
                        <div className="prose prose-lg prose-invert text-gray-300">
                            <ReactMarkdown
                                components={{
                                    ul: ({ node, children, ...props }) => (
                                        <ul className="list-disc pl-5 space-y-3 marker:text-lime-400" {...props}>{children}</ul>
                                    ),
                                    li: ({ node, children, ...props }) => (
                                        <li {...props}>{children}</li>
                                    ),
                                    strong: ({ node, children, ...props }) => (
                                        <strong className="text-gray-100" {...props}>{children}</strong>
                                    ),
                                }}
                            >
                                {suggestions}
                            </ReactMarkdown>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}