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


# Request body model
class TextRequest(BaseModel):
    text1: str
    text2: str


# Text similarity API
@app.post("/text-similarity")
def text_similarity(data: TextRequest):

    # Convert text into embeddings
    embedding1 = model.encode(data.text1, convert_to_tensor=True)

    embedding2 = model.encode(data.text2, convert_to_tensor=True)

    # Calculate cosine similarity
    similarity = util.pytorch_cos_sim(
        embedding1,
        embedding2
    )

    score = similarity.item()

    return {
        "text1": data.text1,
        "text2": data.text2,
        "similarity_score": round(score, 2)
    }