import { useState } from "react";

function App() {
  const [email, setEmail] = useState("");
  const [result, setResult] = useState("");
  const [prob, setProb] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult("");
    setProb(null);

    try {
      const response = await fetch("http://127.0.0.1:5000/api/spam", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      setResult(data.prediction);
      setProb(data.spam_probability); // already percentage
    } catch (err) {
      setResult("Server Error");
    }

    setLoading(false);
  };

  const isSpam = result === "Spam";

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-indigo-900 to-purple-900 flex items-center justify-center px-4 relative overflow-hidden">
      
      {/* Glow background effect */}
      <div className="absolute w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-30 -top-20 -left-20"></div>
      <div className="absolute w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-30 bottom-0 right-0"></div>

      <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-3xl p-8 w-full max-w-xl text-white">

        <h1 className="text-4xl font-extrabold text-center mb-2 tracking-wide">
          🤖 AI Spam Detector
        </h1>
        <p className="text-center text-white/70 mb-6">
          Powered by Machine Learning
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          <textarea
            className="w-full h-40 p-4 rounded-xl bg-white/20 border border-white/30 placeholder-white/60 text-white focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            placeholder="Paste your email here..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 py-3 rounded-xl font-semibold hover:scale-105 transition-all duration-300 shadow-lg"
          >
            {loading ? "Analyzing..." : "Analyze Email"}
          </button>
        </form>

        {result && (
          <div className="mt-8 animate-fadeIn">
            <div
              className={`p-6 rounded-2xl text-center transition-all duration-500 ${
                isSpam
                  ? "bg-red-500/20 border border-red-400"
                  : "bg-green-500/20 border border-green-400"
              }`}
            >
              <h2 className="text-2xl font-bold mb-2">
                {isSpam ? "🚨 Spam Detected" : "✅ Safe Email"}
              </h2>

              {prob !== null && (
                <>
                  <p className="mb-3">
                    Spam Probability:{" "}
                    <span className="font-bold text-lg">{prob}%</span>
                  </p>

                  {/* Animated Progress Bar */}
                  <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
                    <div
                      className={`h-3 rounded-full transition-all duration-700 ${
                        isSpam ? "bg-red-500" : "bg-green-500"
                      }`}
                      style={{ width: `${prob}%` }}
                    ></div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default App;