# Generated by Django 5.0.4 on 2024-04-09 18:29

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("Database", "0003_account_dateofbirth_alter_account_username_audio"),
    ]

    operations = [
        migrations.AlterField(
            model_name="account",
            name="username",
            field=models.CharField(max_length=100),
        ),
    ]
