from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from uuid import uuid4
from .. import models, schemas
from ..database import get_db

router = APIRouter(prefix="/orders", tags=["orders"])

@router.post("/", response_model=schemas.OrderSchema)
def create_order(order: schemas.OrderCreate, db: Session = Depends(get_db)):
    # Validate stock and decrement quantities
    for item in order.items:
        product = db.query(models.Product).filter(models.Product.id == item.id).first()
        if not product:
            raise HTTPException(status_code=404, detail=f"Product {item.id} not found")

        if not product.in_stock:
            raise HTTPException(status_code=400, detail=f"{product.name} is out of stock")

        if product.quantity is not None:
            if product.quantity < item.qty:
                raise HTTPException(
                    status_code=400,
                    detail=f"Only {product.quantity} of {product.name} left"
                )
            product.quantity -= item.qty
            if product.quantity <= 0:
                product.in_stock = False

    db_order = models.Order(
        id=str(uuid4()),
        name=order.name,
        phone=order.phone,
        email=order.email,
        fulfillment=order.fulfillment,
        address=order.address,
        notes=order.notes,
        items=[item.dict() for item in order.items],
        total=order.total,
        status="received",
    )
    db.add(db_order)
    db.commit()
    db.refresh(db_order)

    return db_order

@router.get("/{order_id}", response_model=schemas.OrderSchema)
def get_order(order_id: str, db: Session = Depends(get_db)):
    order = db.query(models.Order).filter(models.Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return order