from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
from pydantic import BaseModel
from uuid import uuid4
import os
import shutil
from .. import models, schemas
from ..database import get_db
from ..auth import create_token, verify_token, ADMIN_PASSWORD

router = APIRouter(prefix="/admin", tags=["admin"])

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

class LoginRequest(BaseModel):
    password: str

@router.post("/login")
def login(data: LoginRequest):
    if data.password != ADMIN_PASSWORD:
        raise HTTPException(status_code=401, detail="Incorrect password")
    token = create_token()
    return {"token": token}

@router.get("/orders", response_model=list[schemas.OrderSchema])
def list_orders(db: Session = Depends(get_db), authorized: bool = Depends(verify_token)):
    return db.query(models.Order).order_by(models.Order.created_at.desc()).all()

@router.patch("/orders/{order_id}/status", response_model=schemas.OrderSchema)
def update_order_status(order_id: str, update: schemas.OrderStatusUpdate, db: Session = Depends(get_db), authorized: bool = Depends(verify_token)):
    order = db.query(models.Order).filter(models.Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    order.status = update.status
    db.commit()
    db.refresh(order)
    return order

@router.patch("/products/{product_id}/stock", response_model=schemas.ProductSchema)
def update_product_stock(product_id: str, update: schemas.ProductStockUpdate, db: Session = Depends(get_db), authorized: bool = Depends(verify_token)):
    product = db.query(models.Product).filter(models.Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    product.in_stock = update.in_stock
    db.commit()
    db.refresh(product)
    return product

@router.post("/products", response_model=schemas.ProductSchema)
def create_product(product: schemas.ProductCreate, db: Session = Depends(get_db), authorized: bool = Depends(verify_token)):
    new_product = models.Product(id=str(uuid4()), **product.dict())
    db.add(new_product)
    db.commit()
    db.refresh(new_product)
    return new_product

@router.patch("/products/{product_id}", response_model=schemas.ProductSchema)
def update_product(product_id: str, update: schemas.ProductUpdate, db: Session = Depends(get_db), authorized: bool = Depends(verify_token)):
    product = db.query(models.Product).filter(models.Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    for field, value in update.dict(exclude_unset=True).items():
        setattr(product, field, value)
    db.commit()
    db.refresh(product)
    return product

@router.delete("/products/{product_id}")
def delete_product(product_id: str, db: Session = Depends(get_db), authorized: bool = Depends(verify_token)):
    product = db.query(models.Product).filter(models.Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    db.delete(product)
    db.commit()
    return {"message": "Product deleted"}

@router.post("/upload-image")
def upload_image(file: UploadFile = File(...), authorized: bool = Depends(verify_token)):
    ext = file.filename.split(".")[-1]
    filename = f"{uuid4()}.{ext}"
    filepath = os.path.join(UPLOAD_DIR, filename)
    with open(filepath, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    return {"url": f"/uploads/{filename}"}

@router.patch("/products/{product_id}/quantity", response_model=schemas.ProductSchema)
def update_product_quantity(product_id: str, update: schemas.ProductQuantityUpdate, db: Session = Depends(get_db), authorized: bool = Depends(verify_token)):
    product = db.query(models.Product).filter(models.Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    product.quantity = update.quantity
    if update.quantity is not None and update.quantity > 0:
        product.in_stock = True
    elif update.quantity == 0:
        product.in_stock = False
    db.commit()
    db.refresh(product)
    return product