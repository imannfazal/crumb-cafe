from .database import SessionLocal, engine, Base
from . import models

Base.metadata.create_all(bind=engine)

db = SessionLocal()

products_data = [
    {
        "id": "choc-chip-cookie",
        "name": "Chocolate Chip Cookies",
        "category": "cookies",
        "price": 25,
        "image": "/images/products/cookies-tray.svg",
        "in_stock": True,
        "coming_soon": False,
    },
    {
        "id": "oatmeal-cookie",
        "name": "Oatmeal Cookies",
        "category": "cookies",
        "price": 25,
        "image": "/images/products/cookies-tray.svg",
        "in_stock": True,
        "coming_soon": False,
    },
    {
        "id": "fudge-brownie",
        "name": "Fudge Brownies",
        "category": "brownies",
        "price": 30,
        "image": "/images/products/brownies-plate.svg",
        "in_stock": True,
        "coming_soon": False,
    },
    {
        "id": "almond-brownie",
        "name": "Almond Brownies",
        "category": "brownies",
        "price": 32,
        "image": "/images/products/brownies-plate.svg",
        "in_stock": True,
        "coming_soon": False,
    },
    {
        "id": "brownie-bites",
        "name": "Brownie Bites",
        "category": "brownies",
        "price": 20,
        "image": "/images/products/brownies-plate.svg",
        "in_stock": True,
        "coming_soon": False,
    },
]

for data in products_data:
    existing = db.query(models.Product).filter(models.Product.id == data["id"]).first()
    if not existing:
        db.add(models.Product(**data))

db.commit()
db.close()
print("Seeded products successfully.")