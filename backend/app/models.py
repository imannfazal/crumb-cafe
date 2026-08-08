from sqlalchemy import Column, String, Integer, Float, Boolean, DateTime, JSON
from datetime import datetime
from .database import Base

class Product(Base):
    __tablename__ = "products"

    id = Column(String, primary_key=True, index=True)
    name = Column(String, nullable=False)
    category = Column(String, nullable=False)
    price = Column(Float, nullable=False)
    image = Column(String, nullable=False)
    in_stock = Column(Boolean, default=True)
    coming_soon = Column(Boolean, default=False)

class Order(Base):
    __tablename__ = "orders"

    id = Column(String, primary_key=True, index=True)
    name = Column(String, nullable=False)
    phone = Column(String, nullable=False)
    email = Column(String, nullable=False)
    fulfillment = Column(String, nullable=False)  # "pickup" or "delivery"
    address = Column(String, nullable=True)
    notes = Column(String, nullable=True)
    items = Column(JSON, nullable=False)  # snapshot of cart items at order time
    total = Column(Float, nullable=False)
    status = Column(String, default="received")  # received -> baking -> ready -> delivered
    created_at = Column(DateTime, default=datetime.utcnow)