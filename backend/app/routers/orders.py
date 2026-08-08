from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from uuid import uuid4
from .. import models, schemas
from ..database import get_db

router = APIRouter(prefix="/orders", tags=["orders"])

@router.post("/", response_model=schemas.OrderSchema)
def create_order(order: schemas.OrderCreate, db: Session = Depends(get_db)):
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

    # TODO: trigger confirmation email here once email service is set up

    return db_order

@router.get("/{order_id}", response_model=schemas.OrderSchema)
def get_order(order_id: str, db: Session = Depends(get_db)):
    order = db.query(models.Order).filter(models.Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return order