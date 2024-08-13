from django.urls import path
from vlabs.views import laboratory_app_views, users_views, applications_views, laboratory_views, computer_views
from vlabs.views import bookings_views, lab_computers_views, user_booking_views, book_comp_views, complaints_views
from vlabs.views import create_complaint_views, search_labs_views

urlpatterns = [
    path('jwt/create/', users_views.CustomTokenObtainPairView.as_view()),
    path('jwt/refresh/', users_views.CustomTokenRefreshView.as_view()),
    path('jwt/verify/', users_views.CustomTokenVerifyView.as_view()),
    path('logout/', users_views.LogoutView.as_view()),


    path('laboratories/',
         laboratory_views.LaboratoryList.as_view()),
    path('laboratories/<uuid:pk>/',
         laboratory_views.LaboratoryDetail.as_view()),

    path('computers/', computer_views.ComputersList.as_view()),
    path('computers/<uuid:pk>/', computer_views.ComputersDetail.as_view(),),
    path('view_computers/<uuid:pk>/',
         lab_computers_views.LaboratoryDetailView.as_view()),


    path('applications/', applications_views.ApplicationsList.as_view(),),
    path('applications/<uuid:pk>/',
         applications_views.ApplicationDetail.as_view()),
    path('view_applications/<uuid:pk>/',
         laboratory_app_views.LaboratoryApplicationsView.as_view()),

    path('bookings/', bookings_views.BookingsList.as_view()),
    path('bookings/<uuid:pk>/', bookings_views.BookingsDetail.as_view()),
    path('user_bookings/', user_booking_views.UserBookings.as_view()),
    path('bookings/create/<uuid:pk>/', book_comp_views.MakeBooking.as_view()),
    path('delete/booking/<uuid:pk>/', book_comp_views.DeleteBooking.as_view()),

    path('complaints/', create_complaint_views.MakeComplaint.as_view()),
    path('user/complaints/', complaints_views.ComplaintsList.as_view()),

    path('search/laboratory/', search_labs_views.SearchLaboratories.as_view()),

]
