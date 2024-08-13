from django.shortcuts import render
from vlabs.models import Bookings
from vlabs.serializers import BookingsSerializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics


class UserBookings(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user_bookings = Bookings.objects.filter(user=request.user)
        serializer = BookingsSerializer(user_bookings, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class BookingDetail(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        try:
            return Bookings.objects.get(pk=pk)
        except Bookings.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        booking = self.get_object(pk)
        serializer = BookingsSerializer(booking)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, pk):
        booking = self.get_object(pk)
        serializer = BookingsSerializer(booking, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        booking = self.get_object(pk)
        booking.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class CreateBooking(generics.CreateAPIView):
    queryset = Bookings.objects.all()
    serializer_class = BookingsSerializer
    permission_classes = [IsAuthenticated]
