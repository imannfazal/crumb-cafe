from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class ProductSchema(BaseModel):
    id: str
    name: str
    category: str
    price: float
    image: str
    in_stock: bool
    coming_soon: bool
    quantity: Optional[int] = None

    class Config:
        from_attributes = True

class ProductStockUpdate(BaseModel):
    in_stock: bool

class ProductQuantityUpdate(BaseModel):
    quantity: Optional[int] = None

class ProductCreate(BaseModel):
    name: str
    category: str
    price: float
    image: str
    in_stock: bool = True
    coming_soon: bool = False
    quantity: Optional[int] = None

class ProductUpdate(BaseModel):
    name: Optional[str] = None
    category: Optional[str] = None
    price: Optional[float] = None
    image: Optional[str] = None
    in_stock: Optional[bool] = None
    coming_soon: Optional[bool] = None
    quantity: Optional[int] = None

class OrderItem(BaseModel):
    id: str
    name: str
    price: float
    qty: int

class OrderCreate(BaseModel):
    name: str
    phone: str
    email: str
    fulfillment: str
    address: Optional[str] = None
    notes: Optional[str] = None
    items: List[OrderItem]
    total: float

class OrderSchema(BaseModel):
    id: str
    name: str
    phone: str
    email: str
    fulfillment: str
    address: Optional[str]
    notes: Optional[str]
    items: list
    total: float
    status: str
    created_at: datetime

    class Config:
        from_attributes = True

class OrderStatusUpdate(BaseModel):
    status: str