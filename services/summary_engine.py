def generate_summary(matches):

    total_matches = len(matches)

    unauthorized = 0

    high_risk = 0

    for match in matches:

        if match["consent"] is False:
            unauthorized += 1

        if match["risk_level"] in ["HIGH", "CRITICAL"]:
            high_risk += 1

    surveillance_risk = "LOW"

    if high_risk >= 3:
        surveillance_risk = "CRITICAL"

    elif high_risk >= 2:
        surveillance_risk = "HIGH"

    elif high_risk >= 1:
        surveillance_risk = "MODERATE"

    summary = (
        f"{unauthorized} unauthorized identity "
        f"matches detected across connected systems."
    )

    return {
        "total_matches": total_matches,
        "unauthorized_matches": unauthorized,
        "surveillance_risk": surveillance_risk,
        "summary": summary
    }