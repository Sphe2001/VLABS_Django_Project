from django.shortcuts import render
from vlabs.models import Computer
from vlabs.serializers import ComputerSerializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny


class ComputersList(APIView):

    permission_classes = [AllowAny]

    def get(self, request):
        Computers = Computer.objects.all()
        serializer = ComputerSerializer(Computers, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = ComputerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ComputersDetail(APIView):
    def get_object(self, pk):
        try:
            return Computer.objects.get(pk=pk)
        except Computer.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        Computer = self.get_object(pk)
        serializer = ComputerSerializer(Computer)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, pk):
        Computer = self.get_object(pk)
        serializer = ComputerSerializer(Computer, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        Computer = self.get_object(pk)
        Computer.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
