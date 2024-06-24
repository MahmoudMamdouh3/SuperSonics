from django.apps import AppConfig
from flask import Flask, request, jsonify




class DatabaseConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "Database"
