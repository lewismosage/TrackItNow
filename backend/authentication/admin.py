from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User

class CustomUserAdmin(UserAdmin):
    list_display = ('username', 'email', 'company_name', 'is_staff', 'is_active')
    list_filter = ('is_staff', 'is_active', 'company_name')
    fieldsets = UserAdmin.fieldsets + (
        ('Additional Info', {'fields': ('company_name', 'phone_number')}),
    )

admin.site.register(User, CustomUserAdmin)
