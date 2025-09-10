from fastapi import APIRouter, Depends, Query, HTTPException, status
from sqlalchemy.orm import Session
from ..utils.database import get_db
from ..models.certificate import Certificate
from ..schemas.certificate import CertificateCreate, CertificateRead, CertificateList
from ..utils.security import get_current_user_id, require_admin

router = APIRouter(prefix="/certificates", tags=["certificates"])


@router.get('/', response_model=CertificateList)
def list_certificates(db: Session = Depends(get_db), skip: int = 0, limit: int = Query(50, le=100)):
    q = db.query(Certificate)
    total = q.count()
    items = q.offset(skip).limit(limit).all()
    return {"items": items, "total": total}


@router.post('/', response_model=CertificateRead, status_code=status.HTTP_201_CREATED)
def create_certificate(data: CertificateCreate, db: Session = Depends(get_db), admin=Depends(require_admin)):
    cert = Certificate(**data.model_dump())
    db.add(cert)
    db.commit()
    db.refresh(cert)
    return cert


@router.delete('/{certificate_id}', status_code=status.HTTP_204_NO_CONTENT)
def delete_certificate(certificate_id: int, db: Session = Depends(get_db), admin=Depends(require_admin)):
    cert = db.get(Certificate, certificate_id)
    if not cert:
        raise HTTPException(status_code=404, detail="Certificate not found")
    db.delete(cert)
    db.commit()
    return None

@router.patch('/{certificate_id}', response_model=CertificateRead)
def update_certificate(certificate_id: int, data: CertificateCreate, db: Session = Depends(get_db), admin=Depends(require_admin)):
    cert = db.get(Certificate, certificate_id)
    if not cert:
        raise HTTPException(status_code=404, detail="Certificate not found")
    for field, value in data.model_dump(exclude_unset=True).items():
        setattr(cert, field, value)
    db.commit()
    db.refresh(cert)
    return cert
