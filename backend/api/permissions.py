
from rest_framework.permissions import BasePermission, IsAuthenticated

from .models import Stateadmin

class Admincheck(BasePermission):
    """
    Permission to only allow authenticated Stateadmin users (admins).
    """

    def has_permission(self, request, view):
        return isinstance(request.user, Stateadmin)
    


