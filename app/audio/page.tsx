"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"

export default function TranscribePage() {
  const [file, setFile] = useState<File | null>(null)
  const [transcript, setTranscript] = useState("")
  const [translation, setTranslation] = useState("")
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("transcript")

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) return

    setLoading(true)
    const formData = new FormData()
    formData.append("audio", file)

    try {
      const response = await fetch("/api/gemini-audio", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()
      if (response.ok) {
        setTranscript(data.transcript)
        setTranslation(data.translation)
      }
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-10 px-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Audio Transcription & Translation</h1>

      <div className="bg-white rounded-lg shadow-md mb-8 overflow-hidden">
        <div className="p-6 border-b bg-gradient-to-r from-blue-50 to-white">
          <h2 className="text-xl font-semibold mb-1 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
              />
            </svg>
            Upload Audio
          </h2>
          <p className="text-gray-500 text-sm">Upload an audio file to transcribe and translate its content</p>
        </div>
        <div className="p-6">
          <form onSubmit={handleUpload} className="space-y-6">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
              <div className="flex flex-col items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                  />
                </svg>
                <p className="text-sm text-gray-500 mb-2">{file ? file.name : "No file selected"}</p>
                <div className="relative">
                  <input
                    type="file"
                    accept="audio/*"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    aria-label="Upload audio file"
                  />
                  <button
                    type="button"
                    className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Choose File
                  </button>
                </div>
              </div>
            </div>
            <button
              type="submit"
              disabled={!file || loading}
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-md disabled:opacity-50 hover:bg-blue-700 transition-colors flex items-center justify-center"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  Transcribe & Translate
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      <div className="flex items-center justify-center space-x-4 mb-8">
        <Link href="/video">
          <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
            Video Translation
          </button>
        </Link>
        <Link href="/word">
          <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
            Text Translation
          </button>
        </Link>
      </div>

      {(transcript || translation) && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab("transcript")}
              className={`flex-1 py-3 text-center font-medium ${activeTab === "transcript" ? "bg-gray-100 text-blue-600" : "text-gray-600 hover:bg-gray-50"}`}
            >
              Transcript
            </button>
            <button
              onClick={() => setActiveTab("translation")}
              className={`flex-1 py-3 text-center font-medium ${activeTab === "translation" ? "bg-gray-100 text-blue-600" : "text-gray-600 hover:bg-gray-50"}`}
            >
              Translation
            </button>
          </div>

          {activeTab === "transcript" && (
            <div>
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold mb-1">Original Transcript</h3>
                <p className="text-gray-500 text-sm">The transcribed content from your audio file</p>
              </div>
              <div className="p-6">
                <p className="whitespace-pre-wrap">{transcript}</p>
              </div>
            </div>
          )}

          {activeTab === "translation" && (
            <div>
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold mb-1">Translation</h3>
                <p className="text-gray-500 text-sm">The translated content from your audio file</p>
              </div>
              <div className="p-6">
                <p className="whitespace-pre-wrap">{translation}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

