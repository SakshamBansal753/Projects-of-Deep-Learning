

import pandas as pd
import matplotlib.pyplot as plt
import numpy as np
import joblib

df=pd.read_csv("cancerv2.csv")
x=df.drop("Diagnosis",axis=1)

y=df["Diagnosis"]

from sklearn.model_selection import train_test_split
x_train,x_test,y_train,y_test=train_test_split(x,y,random_state=42,test_size=0.2)



from sklearn.preprocessing import StandardScaler
sc=StandardScaler()



from sklearn.compose import ColumnTransformer
preprocessor = ColumnTransformer(
    transformers=[
        ('scaler',StandardScaler(),['Age','BMI'])
    ]
)

from sklearn.ensemble import RandomForestClassifier
lo=RandomForestClassifier(n_estimators=100,random_state=42)

from sklearn.pipeline import Pipeline






from catboost import CatBoostClassifier
cb=CatBoostClassifier()

cbt=Pipeline([
    ("model",cb)
])

cbt.fit(x_train,y_train)

joblib.dump(cbt,"cancer.pkl")
print("Saved successfully")

