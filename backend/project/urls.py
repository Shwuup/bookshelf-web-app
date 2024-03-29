"""project URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/dev/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from bookshelf import views
from django.views.decorators.csrf import csrf_exempt
from rest_framework.authtoken import views as rviews
from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework import routers
from django.urls import include, path


urlpatterns = [
    path("api/books/", views.BookList.as_view()),
    path("books/<int:pk>/", views.BookGet.as_view()),
    path("api/authors/", views.AuthorList.as_view()),
    path("api/publishers/", views.PublisherList.as_view()),
    path("users/<int:user_id>/updates/", views.UpdateView.as_view()),
    path("updates/<pk>/", views.UpdatePutDeleteView.as_view()),
    path("users/<int:user_id>/shelf/", views.Shelf.as_view()),
    path("shelf/<pk>/", views.ShelfPutDeleteView.as_view()),
    path("signup/", csrf_exempt(views.signup)),
    path("api-token-auth/", views.CustomGetAuthToken.as_view()),
    path("search/", views.handle_search),
]

urlpatterns = format_suffix_patterns(urlpatterns)
