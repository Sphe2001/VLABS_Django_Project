from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import UsersAccount, Laboratory, Application, Computer, Bookings, Complaints


class UsersAccountAdmin(UserAdmin):
    list_display = ('email', 'student_no', 'surname', 'username', 'initials',
                    'qualification', 'is_staff', 'is_active', 'is_superuser')
    search_fields = ('email', 'student_no', 'surname',
                     'username', 'initials', 'qualification')
    readonly_fields = ('last_login', 'password')
    fieldsets = ()


class LaboratoryAdmin(admin.ModelAdmin):
    list_display = ('building_no', 'lab_name', 'number_of_pcs', 'is_available')
    search_fields = ('lab_name', 'building_no')
    list_filter = ('is_available',)


class ApplicationAdmin(admin.ModelAdmin):
    list_display = ('app_name', 'version', 'vendor', 'icon')
    search_fields = ('app_name', 'vendor')
    list_filter = ('vendor',)


class ComputerAdmin(admin.ModelAdmin):
    list_display = ('computer_name', 'laboratory', 'is_available')
    search_fields = ('computer_name', 'laboratory__lab_name')
    list_filter = ('is_available', 'laboratory')


class BookingsAdmin(admin.ModelAdmin):
    list_display = ('user', 'computer', 'time')
    search_fields = ('user__username', 'computer__computer_name')
    list_filter = ('time', 'user__username')


class ComplaintsAdmin(admin.ModelAdmin):
    list_display = ('user', 'message', 'time')
    search_fields = ('user__username', 'time')
    list_filter = ('time', 'user__username')


admin.site.register(UsersAccount, UsersAccountAdmin)
admin.site.register(Laboratory, LaboratoryAdmin)
admin.site.register(Application, ApplicationAdmin)
admin.site.register(Computer, ComputerAdmin)
admin.site.register(Bookings, BookingsAdmin)
admin.site.register(Complaints, ComplaintsAdmin)
