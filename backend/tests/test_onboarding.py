# backend/tests/test_onboarding.py
def test_onboarding_flow(client, auth_token):
    headers = {"Authorization": f"Bearer {auth_token}"}

    # 1. Create business profile
    resp = client.post("/api/onboarding/profile", json={
        "industry": "E-commerce",
        "company_size": "SMB",
        "website_url": "https://test.com",
        "timezone": "Asia/Kathmandu",
        "language": "en"
    }, headers=headers)
    assert resp.status_code == 200
    assert resp.json()["industry"] == "E-commerce"

    # 2. Upload document
    with open("sample_faq.pdf", "wb") as f:
        f.write(b"fake pdf content")
    with open("sample_faq.pdf", "rb") as f:
        resp = client.post("/api/onboarding/documents", 
                          files={"file": ("faq.pdf", f, "application/pdf")},
                          headers=headers)
    assert resp.status_code == 200
    doc_id = resp.json()["id"]

    # 3. Activate knowledge base
    resp = client.post("/api/onboarding/knowledge-base/activate", headers=headers)
    assert resp.status_code == 200

    # 4. Final profile check
    resp = client.get("/api/profile/", headers=headers)
    profile = resp.json()
    assert profile["is_onboarded"] is True
    assert profile["documents_uploaded_count"] >= 1