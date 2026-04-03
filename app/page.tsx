import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="80"
              height="80"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-blue-600"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
              <path d="M2 12h20"></path>
            </svg>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-blue-900 mb-6">Gemini Translate</h1>

          <p className="text-xl text-gray-700 max-w-2xl mb-8">
            Break language barriers with AI-powered translation for videos, audio, and text. Fast, accurate, and easy to
            use.
          </p>

          <div className="w-24 h-1 bg-blue-600 rounded mb-12"></div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
          {/* Video Translation Card */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100 flex flex-col">
            <div className="p-6 bg-blue-600 text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mx-auto mb-4"
              >
                <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <h2 className="text-xl font-bold text-center">Video Translation</h2>
            </div>
            <div className="p-6 flex-grow">
              <p className="text-gray-700 mb-6 text-center">
                Upload your videos and get accurate transcriptions and translations in multiple languages.
              </p>
              <div className="flex justify-center mt-auto">
                <Link href="/video">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-300 flex items-center">
                    <span>Get Started</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="ml-2"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Audio Translation Card */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100 flex flex-col">
            <div className="p-6 bg-blue-800 text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mx-auto mb-4"
              >
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                <line x1="12" y1="19" x2="12" y2="23" />
                <line x1="8" y1="23" x2="16" y2="23" />
              </svg>
              <h2 className="text-xl font-bold text-center">Audio Translation</h2>
            </div>
            <div className="p-6 flex-grow">
              <p className="text-gray-700 mb-6 text-center">
                Convert speech to text and translate audio files with high accuracy and natural-sounding results.
              </p>
              <div className="flex justify-center mt-auto">
                <Link href="/audio">
                  <button className="bg-blue-800 hover:bg-blue-900 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-300 flex items-center">
                    <span>Get Started</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="ml-2"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Text Translation Card */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100 flex flex-col">
            <div className="p-6 bg-blue-400 text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mx-auto mb-4"
              >
                <path d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
              </svg>
              <h2 className="text-xl font-bold text-center">Text Translation</h2>
            </div>
            <div className="p-6 flex-grow">
              <p className="text-gray-700 mb-6 text-center">
                Instantly translate text between multiple languages with context-aware AI translation.
              </p>
              <div className="flex justify-center mt-auto">
                <Link href="/word">
                  <button className="bg-blue-400 hover:bg-blue-500 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-300 flex items-center">
                    <span>Get Started</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="ml-2"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-600 mt-16">
          <p>Powered by Google Gemini AI</p>
        </div>
      </div>
    </div>
  )
}

