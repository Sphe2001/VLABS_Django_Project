from django.shortcuts import render
from vlabs.models import Laboratory, Application, Computer
from vlabs.serializers import ApplicationSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny


class LaboratoryApplicationsView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, pk):
        try:
            laboratory = Laboratory.objects.get(pk=pk)
            applications = laboratory.available_applications.all()
            serializer = ApplicationSerializer(applications, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Laboratory.DoesNotExist:
            return Response({"error": "Laboratory not found"}, status=status.HTTP_404_NOT_FOUND)
