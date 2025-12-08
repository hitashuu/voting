from .models import Stateadmin
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.authentication import JWTAuthentication

class CookieJWTAuthentication(JWTAuthentication):
    def authenticate(self, request):
        # Check admin first, then others
        for cookie_name in ["admin", "super", "user"]:
            raw_token = request.COOKIES.get(cookie_name)
            if not raw_token:
                continue

            try:
                validated_token = self.get_validated_token(raw_token)

                if cookie_name == "admin":
                    admin_id = validated_token.get("admin_id")
                    if not admin_id:
                        raise AuthenticationFailed("Invalid admin token")

                    try:
                        user = Stateadmin.objects.get(id=admin_id)
                    except Stateadmin.DoesNotExist:
                        raise AuthenticationFailed("Admin not found")

                    return user, validated_token

                else:
                  return self.get_user(validated_token), validated_token

            except Exception:
                continue

        return None
