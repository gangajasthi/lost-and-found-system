from fastapi import FastAPI
from pydantic import BaseModel
from sentence_transformers import SentenceTransformer, util

app = FastAPI()

# Load AI model
model = SentenceTransformer('all-MiniLM-L6-v2')


# Root route
@app.get("/")
def home():

    return {
        "message": "AI Service Running"
    }


# Request body
class TextRequest(BaseModel):
    text1: str
    text2: str


# Similarity API
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
