import json


def search_identity(fingerprint_id, face_tag):

    with open("data/surveillance_profiles.json", "r") as file:
        profiles = json.load(file)

    matches = []

    for profile in profiles:

        fingerprint_match = (
            profile["fingerprint_id"] == fingerprint_id
        )

        face_match = (
            profile["face_tag"] == face_tag
        )

        if fingerprint_match or face_match:

            matches.append({
                "platform": profile["platform"],
                "consent": profile["consent"],
                "risk_level": profile["risk_level"]
            })

    return matches