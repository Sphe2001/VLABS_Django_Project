from rest_framework import serializers
from .models import Laboratory, Application, Computer, Bookings, Complaints


class LaboratorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Laboratory
        fields = ['id', 'building_no', 'lab_name',
                  'number_of_pcs', 'available_applications',  'is_available']


class ApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = ['id', 'app_name', 'version', 'vendor', 'icon']


class ComputerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Computer
        fields = ['id', 'computer_name', 'laboratory',
                  'is_available']


class BookingsSerializer(serializers.ModelSerializer):
    computer = ComputerSerializer()
    building_name = serializers.CharField(
        source='computer.laboratory.building_no', read_only=True)
    lab_name = serializers.CharField(
        source='computer.laboratory.lab_name', read_only=True)
    computer_name = serializers.CharField(
        source='computer.computer_name', read_only=True)
    # time = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S')
    time = serializers.DateTimeField(format='%H:%M')

    class Meta:
        model = Bookings
        fields = ['id', 'user', 'computer',
                  'computer_name', 'building_name', 'lab_name', 'time']


class ComplaintsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Complaints
        fields = ['id', 'user', 'message', 'time']
        read_only_fields = ['id', 'user', 'time']
