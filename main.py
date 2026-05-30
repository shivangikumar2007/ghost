from fastapi import FastAPI, UploadFile, File, Form
from typing import Optional
from services.exposure_engine import generate_risk_analysis
from utils.image_tools import analyze_image
from services.cleanup import cleanup_session
from services.identity_search import search_identity
from services.summary_engine import generate_summary

app = FastAPI()


@app.get("/")
def home():
    return {"message": "Ghost backend running"}


@app.post("/analyze")
async def analyze(
    tracker_count: int = Form(...),
    entropy_score: int = Form(...),
    permission_count: int = Form(...),
    fingerprint_id: str = Form(...),
    image: Optional[UploadFile] = File(None)
):

    image_name = None

    if image:
        image_data = await analyze_image(image)

    image_risk = "LOW"

    if image_data:
        image_risk = image_data["traceability_risk"]

    analysis = generate_risk_analysis(
        tracker_count,
        entropy_score,
        permission_count,
        image_risk
)

    face_tag = "unknown_subject"

    if image_data:
        face_tag = image_data["face_tag"]

    identity_matches = search_identity(
        fingerprint_id,
        face_tag
    )
    identity_summary = generate_summary(identity_matches)
    cleanup_info = cleanup_session()
    return {
    "status": "success",
    "analysis": analysis,
    "identity_matches": identity_matches,
    "identity_summary": identity_summary,
    "image_analysis": image_data,
    "privacy": cleanup_info
    }