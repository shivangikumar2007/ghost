from PIL import Image
from PIL.ExifTags import TAGS
import io


async def analyze_image(upload_file):

    contents = await upload_file.read()

    image = Image.open(io.BytesIO(contents))

    # Basic metadata
    metadata = {
        "format": image.format,
        "size": image.size,
        "mode": image.mode
    }

    # Extract EXIF data
    exif_data = {}

    try:
        raw_exif = image._getexif()

        if raw_exif:

            for tag, value in raw_exif.items():
                decoded = TAGS.get(tag, tag)
                exif_data[decoded] = str(value)

    except:
        exif_data = {}

    # Exposure indicators
    width, height = image.size

    megapixels = (width * height) / 1000000

    traceability_risk = "LOW"

    reasons = []

    if megapixels > 8:
        traceability_risk = "MODERATE"
        reasons.append("High resolution image increases traceability")

    if exif_data:
        traceability_risk = "HIGH"
        reasons.append("Metadata detected inside uploaded image")

    if "Model" in exif_data:
        reasons.append(
            f"Camera/device model exposed: {exif_data['Model']}"
        )
            # Simple simulated face identity tagging

    face_tag = "unknown_subject"

    if megapixels > 8:
        face_tag = "person_alpha"

    return {
        "metadata": metadata,
        "exif_found": bool(exif_data),
        "traceability_risk": traceability_risk,
        "risk_reasons": reasons,
        "exif_preview": list(exif_data.keys())[:5],
        "face_tag": face_tag
    }