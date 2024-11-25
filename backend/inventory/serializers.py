from rest_framework import serializers
from .models import Category, Product, InventoryTransaction

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'
        read_only_fields = ('created_by',)

class InventoryTransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = InventoryTransaction
        fields = '__all__'
        read_only_fields = ('performed_by',) 