# Generated by Django 3.0.8 on 2021-12-10 22:29

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Adenovirus',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('virus_taxid', models.CharField(max_length=100)),
                ('virus_ScientificName_CommonName', models.CharField(max_length=100)),
                ('virus_LineageInfo', models.CharField(max_length=200)),
                ('host_taxid', models.CharField(max_length=100)),
                ('host_Scientific_CommonName', models.CharField(max_length=100)),
                ('host_LineageInfo', models.CharField(max_length=200)),
                ('viralProteins_ViralProtein1_Accession_GeneName_ProteinName', models.CharField(max_length=100)),
                ('hostReceptorProteins_Receptor1_Accession_GeneName_ProteinName', models.CharField(max_length=100)),
                ('hostReceptorProteins_Receptor2_Accession_GeneName_ProteinName', models.CharField(max_length=100)),
                ('hostReceptorProteins_Receptor3_Accession_GeneName_ProteinName', models.CharField(max_length=100)),
                ('hostReceptorProteins_Receptor4_Accession_GeneName_ProteinName', models.CharField(max_length=100)),
                ('hostReceptorProteins_Receptor5_Accession_GeneName_ProteinName', models.CharField(max_length=100)),
                ('hostReceptorProteins_Receptor6_Accession_GeneName_ProteinName', models.CharField(max_length=100)),
                ('hostReceptorProteins_Receptor7_Accession_GeneName_ProteinName', models.CharField(max_length=100)),
                ('hostReceptorProteins_Receptor8_Accession_GeneName_ProteinName', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Announcement',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=600)),
                ('content', models.CharField(max_length=1200)),
                ('date', models.DateField()),
            ],
        ),
        migrations.CreateModel(
            name='Coronavirus',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('virus_taxid', models.CharField(max_length=100)),
                ('virus_ScientificName_CommonName', models.CharField(max_length=100)),
                ('virus_LineageInfo', models.CharField(max_length=200)),
                ('host_taxid', models.CharField(max_length=100)),
                ('host_ScientificName_CommonName', models.CharField(max_length=100)),
                ('host_LineageInfo', models.CharField(max_length=200)),
                ('viralProteins_ViralProtein1_Accession_GeneName_ProteinName', models.CharField(max_length=100)),
                ('hostReceptorProteins_Receptor1_Accession_GeneName_ProteinName', models.CharField(max_length=100)),
                ('hostReceptorProteins_Receptor2_Accession_GeneName_ProteinName', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Member',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('surname', models.CharField(max_length=40)),
                ('email', models.CharField(max_length=50)),
                ('phone', models.CharField(max_length=40)),
                ('researchgate_address', models.CharField(max_length=100)),
                ('linkedin_address', models.CharField(max_length=100)),
                ('googlescholar_address', models.CharField(max_length=100)),
                ('title', models.CharField(max_length=20)),
                ('role', models.CharField(max_length=100)),
                ('photo', models.FileField(upload_to='members')),
            ],
        ),
        migrations.CreateModel(
            name='Publication',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=600)),
                ('authors', models.CharField(max_length=600)),
                ('url', models.CharField(max_length=600)),
                ('journal', models.CharField(max_length=600)),
                ('date', models.DateField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='ViralPredictions',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=300)),
                ('data', models.FileField(upload_to='viral_predictions')),
            ],
        ),
        migrations.CreateModel(
            name='Viruses',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=300)),
                ('data', models.FileField(upload_to='viruses')),
            ],
        ),
    ]
