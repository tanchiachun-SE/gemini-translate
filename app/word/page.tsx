"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"


export default function TranslationPage() {
  const [text, setText] = useState("")
  const [targetLanguage, setTargetLanguage] = useState("en")
  const [translation, setTranslation] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleTranslate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/gemini-word", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text, targetLanguage }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Translation failed")
      }

      setTranslation(data.translation)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to translate")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-10 px-4 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Text Translator</h1>

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
                d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
              />
            </svg>
            Translate Text
          </h2>
          <p className="text-gray-500 text-sm">Enter your text and select a target language for translation</p>
        </div>

        <div className="p-6">
          <form onSubmit={handleTranslate} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="text-input" className="block text-sm font-medium text-gray-700">
                Text to translate
              </label>
              <div className="relative">
                <textarea
                  id="text-input"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Enter text to translate..."
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  rows={5}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="language-select" className="block text-sm font-medium text-gray-700">
                Target language
              </label>
              <div className="relative">
                <select
                  id="language-select"
                  value={targetLanguage}
                  onChange={(e) => setTargetLanguage(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors pr-10"
                >
                  <option value="en">English</option>
                  <option value="ms">Bahasa Melayu</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !text.trim()}
              className="w-full py-3 px-4 bg-blue-600 text-white rounded-md disabled:opacity-50 hover:bg-blue-700 transition-colors flex items-center justify-center"
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
                  Translating...
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
                      d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                    />
                  </svg>
                  Translate
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {error && (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-red-200 mb-8">
          <div className="p-4 bg-red-50 text-red-700 flex items-start">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{error}</span>
          </div>
        </div>
      )}

        <div className="flex items-center justify-center space-x-4 mb-8">
        <Link href="/audio">
          <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
            Audio Translation
          </button>
        </Link>
        <Link href="/video">
          <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
            Video Translation
          </button>
        </Link>
      </div>

      {translation && (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300">
          <div className="p-6 border-b bg-gradient-to-r from-green-50 to-white">
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
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Translation Result
            </h2>
            <p className="text-gray-500 text-sm">
              Translated to{" "}
              {targetLanguage === "en"
                ? "English"
                : targetLanguage === "ms"
                  ? "Bahasa Melayu"
                    : targetLanguage}
            </p>
          </div>
          <div className="p-6">
            <div className="bg-gray-50 p-4 rounded-md border border-gray-100">
              <p className="whitespace-pre-wrap">{translation}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

