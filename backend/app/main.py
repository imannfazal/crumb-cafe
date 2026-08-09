from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from . import models
from .database import engine
from .routers import products, orders, admin

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="The Crumb Cafe API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://crumb-cafe-beta.vercel.app",
        "https://thecrumbcafe.com",
        "https://www.thecrumbcafe.com",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

app.include_router(products.router)
app.include_router(orders.router)
app.include_router(admin.router)

@app.get("/")
def root():
    return {"message": "The Crumb Cafe API is running"}