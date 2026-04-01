from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from app.models.schemas import TokenResponse, UserLogin, TokenData
from app.services.auth_service import authenticate_user, generate_token_response, get_user_by_email
from app.utils.security import decode_token

router = APIRouter(prefix="/api/auth", tags=["authentication"])

# OAuth2 scheme
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/auth/login")

async def get_current_user(token: str = Depends(oauth2_scheme)) -> dict:
    """
    Get current user from JWT token.
    
    This function is used as a dependency in protected routes.
    """
    credential_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    payload = decode_token(token)
    if payload is None:
        raise credential_exception
    
    email: str = payload.get("email")
    if email is None:
        raise credential_exception
    
    token_data = TokenData(email=email)
    
    user = get_user_by_email(token_data.email)
    if user is None:
        raise credential_exception
    
    return user

@router.post("/login", response_model=TokenResponse, summary="User Login")
async def login(user_credentials: UserLogin) -> TokenResponse:
    """
    Login endpoint that returns JWT access token.
    
    **Test with:**
    - Email: user@example.com, Password: password123
    - Email: admin@example.com, Password: admin123
    """
    user = authenticate_user(user_credentials.email, user_credentials.password)
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    return generate_token_response(user)

@router.get("/me", summary="Get Current User")
async def get_me(current_user: dict = Depends(get_current_user)):
    """
    Get current authenticated user information.
    Requires valid JWT token in Authorization header.
    """
    return {
        "id": current_user["id"],
        "email": current_user["email"],
        "name": current_user["name"],
        "role": current_user["role"],
        "created_at": current_user["created_at"]
    }

@router.post("/refresh", response_model=TokenResponse, summary="Refresh Token")
async def refresh_token(current_user: dict = Depends(get_current_user)) -> TokenResponse:
    """
    Refresh authentication token.
    Requires valid JWT token in Authorization header.
    """
    return generate_token_response(current_user)
