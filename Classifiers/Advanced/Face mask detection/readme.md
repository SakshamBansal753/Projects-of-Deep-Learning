# Face Mask Detection using CNN

## 📌 Project Overview

This project is a deep learning-based Face Mask Detection system built using **PyTorch CNN architecture**. The model classifies images into two categories:

* With Mask
* Without Mask

The system achieves approximately **86–93% test accuracy** depending on training configuration.
with training accuracy about **93%** 

---

## 🚀 Features

* Custom CNN architecture
* Data augmentation for better generalization
* Training and validation pipeline
* Loss and accuracy graphical analysis
* Image-based prediction support

---

## 🧠 Model Architecture

The model consists of:

* 3 Convolutional Layers
* Batch Normalization
* ReLU Activation
* Adaptive Average Pooling
* Fully Connected Layers
* Dropout Regularization

Optimizer used:

* Adam Optimizer

Loss function:

* CrossEntropyLoss

---

## 📂 Dataset Structure

Dataset should be arranged as:

```
dataset/
├── with_mask/
└── without_mask/
```

---

## 🛠 Installation

### Create Virtual Environment (Recommended)

```bash
conda create -n mask python=3.10
conda activate mask
```

---

### Install Dependencies

```bash
pip install torch torchvision opencv-python pillow matplotlib scikit-learn torchinfo tqdm
```

---

## 📊 Training Process

1. Load dataset images
2. Apply image augmentation
3. Train CNN model
4. Validate model performance
5. Plot training curves

---

## 🎯 Prediction Usage

Use the prediction function to classify images.

```python
pred = predict_image("test.jpg", model, transform, device)

if pred == 1:
    print("With Mask")
else:
    print("Without Mask")
```

---

## 📈 Performance Metrics

Evaluation is done using:

* Accuracy Score
* Loss Curve Visualization
* Confusion Matrix Analysis

---

## ⚠️ Important Notes

* Training is faster on GPU.
* Use same preprocessing transform during training and inference.
* Set `num_workers=0` on Windows.

---

## 🔮 Future Improvements

* Transfer learning using pretrained CNN models
* Real-time webcam detection
* Face localization using advanced detectors
* Model quantization for deployment

---

## 👨‍💻 Author

Saksham Bansal

---

## ⭐ Acknowledgements

* PyTorch Documentation
* OpenCV Library
* Scikit-learn Metrics Tools

