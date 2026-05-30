def generate_risk_analysis(
    tracker_count,
    entropy_score,
    permission_count,
    image_traceability
):

    risks = []

    score = 100

    # ---------------- TRACKERS ----------------

    if tracker_count > 15:
        risks.append("Heavy tracker activity detected")
        score -= 25

    elif tracker_count > 5:
        risks.append("Moderate tracker activity detected")
        score -= 15

    # ---------------- FINGERPRINT ----------------

    if entropy_score > 80:
        risks.append("Your browser fingerprint is highly unique")
        score -= 25

    elif entropy_score > 50:
        risks.append("Your browser fingerprint is moderately unique")
        score -= 15

    # ---------------- PERMISSIONS ----------------

    if permission_count > 3:
        risks.append("Multiple sensitive permissions granted")
        score -= 25

    elif permission_count > 1:
        risks.append("Several permissions are enabled")
        score -= 10

    # ---------------- IMAGE TRACEABILITY ----------------

    if image_traceability == "HIGH":
        risks.append("Uploaded image contains traceable metadata")
        score -= 25

    elif image_traceability == "MODERATE":
        risks.append("Uploaded image may expose identifying signals")
        score -= 10

    # ---------------- FINAL SCORE ----------------

    score = max(score, 0)

    ghost_score = 100 - score

    # ---------------- RISK LEVEL ----------------

    if ghost_score >= 75:
        level = "CRITICAL"

    elif ghost_score >= 50:
        level = "HIGH"

    elif ghost_score >= 25:
        level = "MODERATE"

    else:
        level = "LOW"

    biggest_risk = risks[0] if risks else "No major risks detected"

    return {
        "ghost_score": ghost_score,
        "risk_level": level,
        "biggest_risk": biggest_risk,
        "all_risks": risks
    }