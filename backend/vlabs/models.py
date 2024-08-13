from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, PermissionsMixin
from django.core.validators import RegexValidator
from django.core.exceptions import ValidationError
from django.utils import timezone
import uuid


class UsersAccountManager(BaseUserManager):
    def create_user(self, student_no, surname, username,  initials, email, qualification, password=None):

        if not email:
            raise ValueError("Users must have an email address")

        email = self.normalize_email(email)
        email = email.lower()
        user = self.model(

            student_no=student_no,
            surname=surname,
            initials=initials,
            email=email,
            username=username,
            qualification=qualification,
        )
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, student_no, qualification, surname, username, initials, email, password=None):
        user = self.create_user(
            student_no=student_no,
            surname=surname,
            initials=initials,
            email=email,
            username=username,
            password=password,
            qualification=qualification,

        )

        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)

        return user


class UsersAccount(AbstractBaseUser, PermissionsMixin):
    id = models.UUIDField(
        primary_key=True, default=uuid.uuid4)
    email = models.EmailField(unique=True, max_length=255)
    student_no = models.CharField(unique=True, max_length=9)
    username = models.CharField(
        unique=True,
        max_length=255,
        default='',
        validators=[
            RegexValidator(
                regex=r'^[\w.@+-]+$',
                message='Enter a valid username. This value may contain only letters, numbers, and @/./+/-/_ characters.',
            ),
        ],
    )
    surname = models.CharField(max_length=255)
    initials = models.CharField(max_length=5)
    qualification = models.CharField(max_length=50)
    password = models.CharField(max_length=128)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    objects = UsersAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['surname', 'initials',
                       'student_no', 'qualification', 'password', 'username']

    def clean(self):
        super().clean()

        if len(self.username) < 3:
            raise ValidationError(
                'Username must be at least 3 characters long.')

    def __str__(self):
        return self.email


class Application(models.Model):
    id = models.UUIDField(
        primary_key=True, default=uuid.uuid4)
    app_name = models.CharField(max_length=100)
    version = models.CharField(max_length=50)
    vendor = models.CharField(max_length=100)
    icon = models.CharField(max_length=255)

    def save(self, *args, **kwargs):
        self.app_name = self.app_name.lower()
        super(Application, self).save(*args, **kwargs)


class Laboratory(models.Model):
    id = models.UUIDField(
        primary_key=True, default=uuid.uuid4)
    building_no = models.CharField(max_length=3)
    lab_name = models.CharField(max_length=10)
    available_applications = models.ManyToManyField(Application)
    number_of_pcs = models.CharField(max_length=10)
    is_available = models.BooleanField(default=True)


class Computer(models.Model):
    id = models.UUIDField(
        primary_key=True, default=uuid.uuid4)
    computer_name = models.CharField(max_length=10)
    laboratory = models.ForeignKey("Laboratory", on_delete=models.CASCADE)
    is_available = models.BooleanField(default=True)


class Bookings(models.Model):
    id = models.UUIDField(
        primary_key=True, default=uuid.uuid4)
    user = models.ForeignKey(UsersAccount, on_delete=models.CASCADE)
    computer = models.ForeignKey("Computer", on_delete=models.CASCADE)
    time = models.DateTimeField(default=timezone.now)

    def get_computer_name(self):
        return self.computer.computer_name

    def get_laboratory_name(self):
        return self.computer.laboratory.lab_name


class Complaints(models.Model):
    id = models.UUIDField(
        primary_key=True, default=uuid.uuid4)
    user = models.ForeignKey(UsersAccount, on_delete=models.CASCADE)
    message = models.CharField(max_length=255)
    time = models.DateTimeField(default=timezone.now)
