from flask import Flask, jsonify, request
from flask_cors import CORS
import json
import joblib
import pandas as pd
app = Flask(__name__)
CORS(app)
model = joblib.load("spam_model.pkl")
@app.route('/api/spam',methods=["POST"])
def check():
    data=request.get_json()
    email=data["email"].lower()
    df=pd.DataFrame({
        "text":[email],
        "length":[len(email)]
    })
    prediction=model.predict(df)[0]
    probability = model.predict_proba(df)[0][1]
    return jsonify({
        "prediction": "Spam" if prediction == 1 else "Not Spam",
    "spam_probability": round(probability * 100, 2)
    })
    
if __name__ == "__main__":
    app.run(debug=True)