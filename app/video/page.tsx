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
    formData.append("video", file)

    try {
      const response = await fetch("/api/gemini-video", {
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
      <h1 className="text-3xl font-bold mb-6 text-center">Video Transcription & Translation</h1>

      <div className="bg-white rounded-lg shadow-lg mb-8 overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300">
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
                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
            Upload Video
          </h2>
          <p className="text-gray-500 text-sm">Upload a video file to transcribe and translate its content</p>
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
                    d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
                  />
                </svg>
                <p className="text-sm text-gray-500 mb-2">{file ? file.name : "No file selected"}</p>
                <div className="relative">
                  <input
                    type="file"
                    accept="video/*"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    aria-label="Upload video file"
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
        <Link href="/audio">
          <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
            Audio Translation
          </button>
        </Link>
        <Link href="/word">
          <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
            Text Translation
          </button>
        </Link>
      </div>

      {(transcript || translation) && (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab("transcript")}
              className={`flex-1 py-3 text-center font-medium transition-colors duration-200 ${activeTab === "transcript" ? "bg-blue-50 text-blue-600 border-b-2 border-blue-500" : "text-gray-600 hover:bg-gray-50"}`}
            >
              Transcript
            </button>
            <button
              onClick={() => setActiveTab("translation")}
              className={`flex-1 py-3 text-center font-medium transition-colors duration-200 ${activeTab === "translation" ? "bg-blue-50 text-blue-600 border-b-2 border-blue-500" : "text-gray-600 hover:bg-gray-50"}`}
            >
              Translation
            </button>
          </div>

          {activeTab === "transcript" && (
            <div>
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold mb-1">Original Transcript</h3>
                <p className="text-gray-500 text-sm">The transcribed content from your video file</p>
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
                <p className="text-gray-500 text-sm">The translated content from your video file</p>
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

