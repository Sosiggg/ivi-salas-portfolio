from fastapi import status

def test_register_and_login(client):
    # Register
    r = client.post('/api/auth/register', json={
        "email": "user@example.com",
        "password": "Password123!",
        "full_name": "Test User"
    })
    assert r.status_code == status.HTTP_201_CREATED, r.text
    data = r.json()
    assert data["email"] == "user@example.com"

    # Login
    r2 = client.post('/api/auth/login', json={
        "email": "user@example.com",
        "password": "Password123!"
    })
    assert r2.status_code == 200, r2.text
    tokens = r2.json()
    assert "access_token" in tokens
    assert tokens["token_type"] == "bearer"

    # Refresh
    refresh = tokens.get("refresh_token")
    if refresh:
        r3 = client.post('/api/auth/refresh', json={"refresh_token": refresh})
        assert r3.status_code == 200, r3.text
        new_tokens = r3.json()
        assert new_tokens["access_token"] != tokens["access_token"]
