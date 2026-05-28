from fastapi import FastAPI
from pydantic import BaseModel
from sentence_transformers import SentenceTransformer, util
import cv2
import numpy as np

app = FastAPI()

# Load AI model
model = SentenceTransformer('all-MiniLM-L6-v2')


# Root route
@app.get("/")
def home():

    return {
        "message": "AI Service Running"
    }


# Request body for text similarity
class TextRequest(BaseModel):
    text1: str
    text2: str


# Request body for image similarity
class ImageRequest(BaseModel):
    image1: str
    image2: str


# Text Similarity API (NLP)
@app.post("/text-similarity")
def text_similarity(data: TextRequest):

    embedding1 = model.encode(
        data.text1,
        convert_to_tensor=True
    )

    embedding2 = model.encode(
        data.text2,
        convert_to_tensor=True
    )

    similarity = util.cos_sim(
        embedding1,
        embedding2
    )

    score = similarity.item()

    return {
        "similarity":
        round(score, 2)
    }


# Image Similarity API (OpenCV)
@app.post("/image-similarity")
def image_similarity(data: ImageRequest):

    img1 = cv2.imread(data.image1)
    img2 = cv2.imread(data.image2)

    if img1 is None or img2 is None:
        return {
            "similarity": 0,
            "message": "Image not found"
        }

    img1 = cv2.resize(img1, (300, 300))
    img2 = cv2.resize(img2, (300, 300))

    gray1 = cv2.cvtColor(
        img1,
        cv2.COLOR_BGR2GRAY
    )

    gray2 = cv2.cvtColor(
        img2,
        cv2.COLOR_BGR2GRAY
    )

    orb = cv2.ORB_create()

    kp1, des1 = orb.detectAndCompute(
        gray1,
        None
    )

    kp2, des2 = orb.detectAndCompute(
        gray2,
        None
    )

    if des1 is None or des2 is None:
        return {
            "similarity": 0
        }

    bf = cv2.BFMatcher(
        cv2.NORM_HAMMING,
        crossCheck=True
    )

    matches = bf.match(
        des1,
        des2
    )

    similarity_score = len(matches)

    return {
        "similarity":
        similarity_score
    }