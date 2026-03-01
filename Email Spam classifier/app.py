import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
from sklearn.linear_model import LogisticRegression
from sklearn.feature_extraction.text import CountVectorizer
import joblib

# Load dataset
df = pd.read_csv("emails.csv")

# Feature engineering
df["length"] = df["text"].apply(len)

X = df[["text", "length"]]
y = df["spam"]

# Split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

# Preprocessing
preprocessor = ColumnTransformer(
    transformers=[
        ("bow", CountVectorizer(max_features=3000), "text"),
        ("length_scaler", StandardScaler(), ["length"]),
    ]
)

# Pipeline
model = Pipeline([
    ("preprocessing", preprocessor),
    ("classifier", LogisticRegression(max_iter=1000))
])

# Train
model.fit(X_train, y_train)

# Save model
joblib.dump(model, "spam_model.pkl")

print("Model saved successfully ✅")