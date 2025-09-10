from fastapi import status

def auth_headers(client):
    client.post('/api/auth/register', json={
        "email": "admin@example.com",
        "password": "Password123!"
    })
    login = client.post('/api/auth/login', json={
        "email": "admin@example.com",
        "password": "Password123!"
    }).json()
    return {"Authorization": f"Bearer {login['access_token']}"}


def test_projects_crud(client):
    headers = auth_headers(client)

    # Create
    create = client.post('/api/projects/', json={
        "title": "Proj 1",
        "description": "Desc",
        "tech_stack": "Python, FastAPI"
    }, headers=headers)
    assert create.status_code == status.HTTP_201_CREATED, create.text
    proj = create.json()

    # List
    listing = client.get('/api/projects/')
    assert listing.status_code == 200
    assert listing.json()["total"] >= 1

    # Get single
    single = client.get(f"/api/projects/{proj['id']}")
    assert single.status_code == 200

    # Update
    upd = client.patch(f"/api/projects/{proj['id']}", json={
        "title": "Proj 1 Updated",
        "description": "Desc",
        "tech_stack": "Python"
    }, headers=headers)
    assert upd.status_code == 200
    assert upd.json()["title"] == "Proj 1 Updated"

    # Delete
    delete = client.delete(f"/api/projects/{proj['id']}", headers=headers)
    assert delete.status_code == status.HTTP_204_NO_CONTENT
