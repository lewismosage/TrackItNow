from django.shortcuts import render
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Product, Category, InventoryTransaction
from .serializers import ProductSerializer, CategorySerializer, InventoryTransactionSerializer

# Create your views here.

class CategoryViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class ProductViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    @action(detail=True, methods=['post'])
    def adjust_stock(self, request, pk=None):
        product = self.get_object()
        quantity = int(request.data.get('quantity', 0))
        transaction_type = request.data.get('transaction_type')
        
        if transaction_type == 'IN':
            product.quantity += quantity
        elif transaction_type == 'OUT':
            if product.quantity < quantity:
                return Response({
                    'error': 'Insufficient stock'
                }, status=status.HTTP_400_BAD_REQUEST)
            product.quantity -= quantity
            
        product.save()
        
        # Create transaction record
        InventoryTransaction.objects.create(
            product=product,
            transaction_type=transaction_type,
            quantity=quantity,
            unit_price=product.unit_price,
            performed_by=request.user,
            notes=request.data.get('notes', '')
        )
        
        return Response({
            'status': 'success',
            'current_stock': product.quantity
        })

class InventoryTransactionViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    queryset = InventoryTransaction.objects.all()
    serializer_class = InventoryTransactionSerializer

    def perform_create(self, serializer):
        serializer.save(performed_by=self.request.user)
