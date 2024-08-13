from django.shortcuts import render
from vlabs.models import Laboratory
from vlabs.serializers import LaboratorySerializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
from rest_framework import generics
from rest_framework.permissions import AllowAny


class LaboratoryList(APIView):

    permission_classes = [AllowAny]

    def get(self, request):
        laboratories = Laboratory.objects.all()
        serializer = LaboratorySerializer(laboratories, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = LaboratorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LaboratoryDetail(APIView):
    def get_object(self, pk):
        try:
            return Laboratory.objects.get(pk=pk)
        except Laboratory.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        Laboratory = self.get_object(pk)
        serializer = LaboratorySerializer(Laboratory)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, pk):
        Laboratory = self.get_object(pk)
        serializer = LaboratorySerializer(Laboratory, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        Laboratory = self.get_object(pk)
        Laboratory.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
