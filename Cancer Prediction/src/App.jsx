import { useState } from "react";

function App() {
  const [data, setData] = useState({
    Age: "",
    Gender: "",
    BMI: "",
    Smoking: "",
    GeneticRisk: "",
    Physical: "",
    alcohol: "",
    cancerhist: "",
  });

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
        body: JSON.stringify({ data }),
      });

      const d = await response.json();
      setResult(d.prediction);
      setProb(d.cancer);
    } catch (err) {
      setResult("Server Error");
    }

    setLoading(false);
  };

  const isPositive = result === "Yes";

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-100 flex items-center justify-center px-4 py-10">
      
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-3xl p-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-teal-700">
            🩺 Cancer Risk Assessment
          </h1>
          <p className="text-gray-500 mt-2">
            Please provide accurate medical information
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">

          {/* Personal Information */}
          <div>
            <h2 className="section-title">👤 Personal Information</h2>
            <div className="grid md:grid-cols-2 gap-4">
              
              <input
                type="number"
                placeholder="Age"
                className="medical-input"
                value={data.Age}
                onChange={(e) => setData({ ...data, Age: e.target.value })}
                required
              />

              <select
                className="medical-input"
                value={data.Gender}
                onChange={(e) => setData({ ...data, Gender: e.target.value })}
                required
              >
                <option value="">Select Gender</option>
                <option value="1">Female</option>
                <option value="0">Male</option>
              </select>

              <input
                type="number"
                step="0.1"
                placeholder="BMI"
                className="medical-input"
                value={data.BMI}
                onChange={(e) => setData({ ...data, BMI: e.target.value })}
                required
              />

            </div>
          </div>

          {/* Lifestyle Information */}
          <div>
            <h2 className="section-title">🏃 Lifestyle Information</h2>
            <div className="grid md:grid-cols-2 gap-4">

              <select
                className="medical-input"
                value={data.Smoking}
                onChange={(e) => setData({ ...data, Smoking: e.target.value })}
                required
              >
                <option value="">Smoking?</option>
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>

              <input
                type="number"
                placeholder="Physical Activity (1-10 hrs/week)"
                className="medical-input"
                value={data.Physical}
                onChange={(e) => setData({ ...data, Physical: e.target.value })}
                required
              />

              <input
                type="number"
                placeholder="Alcohol Consumption (1-5)"
                className="medical-input"
                value={data.alcohol}
                onChange={(e) => setData({ ...data, alcohol: e.target.value })}
                required
              />

            </div>
          </div>

          {/* Medical History */}
          <div>
            <h2 className="section-title">🧬 Medical History</h2>
            <div className="grid md:grid-cols-2 gap-4">

              <select
                className="medical-input"
                value={data.GeneticRisk}
                onChange={(e) => setData({ ...data, GeneticRisk: e.target.value })}
                required
              >
                <option value="">Genetic Risk Level</option>
                <option value="0">Low</option>
                <option value="1">Medium</option>
                <option value="2">High</option>
              </select>

              <select
                className="medical-input"
                value={data.cancerhist}
                onChange={(e) => setData({ ...data, cancerhist: e.target.value })}
                required
              >
                <option value="">Family Cancer History?</option>
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>

            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-teal-600 text-white py-3 rounded-xl font-semibold hover:bg-teal-700 transition duration-300 shadow-md"
          >
            {loading ? "Analyzing..." : "Predict Cancer Risk"}
          </button>

        </form>

        {/* Result Section */}
        {result && (
          <div className="mt-8">
            <div
              className={`p-6 rounded-xl text-center ${
                isPositive
                  ? "bg-red-100 border border-red-400"
                  : "bg-green-100 border border-green-400"
              }`}
            >
              <h2 className="text-2xl font-bold mb-3">
                {isPositive ? "⚠️ High Risk Detected" : "✅ Low Risk"}
              </h2>

              {prob !== null && (
                <>
                  <p className="text-lg mb-3">
                    Risk Probability: <span className="font-bold">{prob}%</span>
                  </p>

                  <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                    <div
                      className={`h-4 rounded-full transition-all duration-700 ${
                        isPositive ? "bg-red-500" : "bg-green-500"
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

      {/* Tailwind Custom Styles */}
      <style>{`
        .medical-input {
          width: 100%;
          padding: 12px;
          border: 1px solid #d1d5db;
          border-radius: 10px;
          outline: none;
          transition: 0.3s;
        }

        .medical-input:focus {
          border-color: #0d9488;
          box-shadow: 0 0 0 2px rgba(13,148,136,0.2);
        }

        .section-title {
          font-size: 18px;
          font-weight: 600;
          color: #374151;
          margin-bottom: 16px;
          border-bottom: 1px solid #e5e7eb;
          padding-bottom: 6px;
        }
      `}</style>

    </div>
  );
}

export default App;