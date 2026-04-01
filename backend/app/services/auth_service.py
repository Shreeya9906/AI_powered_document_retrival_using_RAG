from datetime import timedelta
from app.utils.security import create_access_token
from app.models.schemas import UserResponse, TokenResponse
from app.utils.config import ACCESS_TOKEN_EXPIRE_MINUTES

# Mock user database (replace with real database)
# For testing: using plain passwords here (use proper hashing in production)
MOCK_USERS = {
    "user@example.com": {
        "id": 1,
        "email": "user@example.com",
        "name": "John Doe",
        "password": "password123",  # Plain password for testing
        "role": "user",
        "created_at": "2026-03-27T14:20:39.662Z"
    },
    "admin@example.com": {
        "id": 2,
        "email": "admin@example.com",
        "name": "Admin User",
        "password": "admin123",  # Plain password for testing
        "role": "admin",
        "created_at": "2026-03-27T14:20:39.662Z"
    }
}

def authenticate_user(email: str, password: str) -> dict:
    """
    Authenticate user by email and password.
    
    Returns:
        User dict if authentication successful, None otherwise
    """
    user = MOCK_USERS.get(email)
    if not user:
        return None
    
    # Simple password comparison for testing
    # In production, use: verify_password(password, user["hashed_password"])
    if password != user["password"]:
        return None
    
    return user

def generate_token_response(user: dict) -> TokenResponse:
    """
    Generate JWT token and return token response.
    
    Args:
        user: User dictionary
    
    Returns:
        TokenResponse with access token
    """
    # Create token data (sub is typically the unique identifier)
    token_data = {
        "sub": user["email"],
        "email": user["email"],
        "user_id": user["id"],
        "role": user["role"]
    }
    
    access_token = create_access_token(data=token_data)
    
    user_response = UserResponse(
        id=user["id"],
        email=user["email"],
        name=user["name"],
        role=user["role"],
        created_at=user["created_at"]
    )
    
    return TokenResponse(
        access_token=access_token,
        token_type="bearer",
        expires_in=ACCESS_TOKEN_EXPIRE_MINUTES * 60,  # Convert to seconds
        user=user_response
    )

def get_user_by_email(email: str) -> dict:
    """Get user from mock database."""
    return MOCK_USERS.get(email)
