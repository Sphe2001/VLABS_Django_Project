from django.shortcuts import render
from vlabs.models import Laboratory, Application
from vlabs.serializers import LaboratorySerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


class SearchLaboratories(APIView):

    def post(self, request):
        # Retrieve data from request body
        app_name = request.data.get('app_name')

        if app_name:
            # Query to get the application object
            application = Application.objects.filter(app_name=app_name).first()

            if application:
                # Query to get laboratories that have this application
                laboratories = Laboratory.objects.filter(
                    available_applications=application)

                if laboratories:
                    serializer = LaboratorySerializer(laboratories, many=True)
                    return Response(serializer.data, status=status.HTTP_200_OK)
                else:
                    return Response({"message": "No laboratories with that application."}, status=status.HTTP_404_NOT_FOUND)
            else:
                return Response({"message": "Application not found."}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({"message": "Please provide an application name."}, status=status.HTTP_400_BAD_REQUEST)
