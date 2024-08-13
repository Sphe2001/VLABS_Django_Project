from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.utils import timezone
from vlabs.models import Complaints
from vlabs.serializers import ComplaintsSerializer


class MakeComplaint(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        # Get the authenticated user
        user = request.user

        # Create a new complaint with the provided data
        serializer = ComplaintsSerializer(data=request.data)
        if serializer.is_valid():
            # Save the complaint with the authenticated user
            Complaints.objects.create(
                user=user,
                message=serializer.validated_data['message'],
                time=timezone.now()
            )
            return Response({"message": "Complaint created successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
