from flask import Flask, jsonify, request
from flask_cors import CORS
import json
import joblib
import pandas as pd
app = Flask(__name__)
CORS(app)
model = joblib.load("cancer.pkl")
@app.route('/api/spam',methods=["POST"])
def check():
    data=request.get_json()
    d=data['data']
    age = float(d["Age"])
    Gender = int(d["Gender"])
    bmi = float(d["BMI"])
    smoke = int(d["Smoking"])
    gr = int(d["GeneticRisk"])
    phy = float(d["Physical"])
    alc = int(d["alcohol"])
    ch = int(d["cancerhist"])
    df=pd.DataFrame({
        'Age':[age],
          'Gender':[Gender], 
          'BMI':[bmi], 
          'Smoking':[smoke],
            'GeneticRisk':[gr],
              'PhysicalActivity':[phy],
          'AlcoholIntake':[alc],
         'CancerHistory':[ch],
    })
    prediction=model.predict(df)[0]
    prob=model.predict_proba(df)[0][1]
    print(prediction)
    return jsonify({
        "prediction":"Yes" if prediction==1 else "No",
        "cancer":round(prob*100,2)    })
   
   
    
    
if __name__ == "__main__":
    app.run(debug=True)