from django.contrib import admin
from .models import Category, Product, InventoryTransaction

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'created_at')
    search_fields = ('name',)

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'sku', 'category', 'quantity', 'unit_price', 'created_by')
    list_filter = ('category', 'created_by')
    search_fields = ('name', 'sku')

@admin.register(InventoryTransaction)
class InventoryTransactionAdmin(admin.ModelAdmin):
    list_display = ('product', 'transaction_type', 'quantity', 'transaction_date', 'performed_by')
    list_filter = ('transaction_type', 'transaction_date', 'performed_by')
    search_fields = ('product__name', 'notes')
