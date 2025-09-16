from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
	CORSMiddleware,
	allow_origins=["*"],
	allow_credentials=True,
	allow_methods=["*"],
	allow_headers=["*"],
)

# Example root endpoint
@app.get("/")
def read_root():
	return {"message": "API is running"}

# Portfolio API stubs
@app.get("/projects")
def get_projects(skip: int = 0, limit: int = 10):
	return {"items": [], "total": 0}

@app.get("/skills")
def get_skills():
	return {"items": [], "total": 0}

@app.get("/certificates")
def get_certificates():
	return {"items": [], "total": 0}

@app.get("/experiences")
def get_experiences():
	return {"items": [], "total": 0}
