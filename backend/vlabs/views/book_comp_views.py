from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from vlabs.models import Bookings, Computer
from django.utils import timezone


class MakeBooking(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        # Get the authenticated user
        user = request.user

        # Retrieve the computer object or return 404 if not found
        computer = get_object_or_404(Computer, pk=pk)

        # Check if the computer is available for booking
        if not computer.is_available:
            return Response({"message": "Computer is not available for booking"}, status=status.HTTP_400_BAD_REQUEST)

        # Create a new booking
        booking = Bookings.objects.create(
            user=user, computer=computer, time=timezone.now())

        # Make computer unavaliable
        computer.is_available = False
        computer.save()

        return Response({"message": "Booking created successfully", "booking_id": booking.id}, status=status.HTTP_201_CREATED)


class DeleteBooking(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, pk):
        # Get the authenticated user
        user = request.user

        # Retrieve the booking object or return 404 if not found
        booking = get_object_or_404(Bookings, id=pk)

        # Check if the booking belongs to the authenticated user
        if booking.user != user:
            return Response({"message": "You are not authorized to delete this booking"}, status=status.HTTP_403_FORBIDDEN)

        # Make the computer available again
        booking.computer.is_available = True
        booking.computer.save()

        # Delete the booking
        booking.delete()

        return Response({"message": "Booking deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
