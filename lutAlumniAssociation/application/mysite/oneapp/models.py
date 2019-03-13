from django.db import models

# Create your models here.


import django.utils.timezone as timezone

from django.contrib.auth.models import (
    BaseUserManager,AbstractBaseUser)
from django.conf import settings


class userManager(BaseUserManager):
    def create_user(self, user_account,  password=None):
        """
        Creates and saves a User with the given user_account and password.
        """
        if not user_account:
            raise ValueError('Users must have an user_account')

        user = self.model(
            user_account=user_account
        )

        user.set_password(password)
        user.save(using=self._db)
        return user


class user(AbstractBaseUser):
    user_id = models.AutoField(primary_key=True)
    user_account = models.CharField(max_length=100, unique=True)
    #user_pwd = models.CharField(max_length=12)
    is_del = models.BooleanField(default=True)
    author = models.ForeignKey('user_author', related_name='user',null=True)
    create_time = models.DateTimeField(default=timezone.now)
    update_time = models.DateTimeField(auto_now=True)

    user_name = models.CharField(max_length=20,null= True)
    user_gender = models.CharField(max_length=5,null=True)
    user_birthday = models.DateField(null=True)
    user_nation = models.CharField(max_length=30,null=True)

    country_name_cn = models.CharField(max_length=100, null=True)
    country = models.ForeignKey('D_country', related_name='user', null=True)

    user_post = models.CharField(max_length=30,null=True)
    user_workunit = models.CharField(max_length=100,null=True)
    industrial = models.ForeignKey('D_industrial',related_name='user', null=True)
    industrial_name = models.CharField(max_length=50,null=True)
    user_workplace = models.CharField(max_length=100,null=True)

    user_province = models.CharField(max_length=50,null=True)
    province = models.ForeignKey('D_province',related_name='user',null=True)

    user_city = models.CharField(max_length=20,null=True)
    city = models.ForeignKey('D_city',related_name='user',null=True)

    user_officephone = models.CharField(max_length=50,null=True)
    user_wechat = models.CharField(max_length=50,null=True)
    user_qq = models.CharField(max_length=50,null=True)
    user_email = models.CharField(max_length=32,null=True)
    user_cellphone = models.CharField(max_length=50,null=True)

    is_active = models.BooleanField(default=True)
    organization = models.ManyToManyField('organization', related_name='member', null=True)

    objects = userManager()

    USERNAME_FIELD = 'user_account'
    REQUIRED_FIELDS = []

    def get_full_name(self):
        # The user is identified by their email address
        return self.user_account

    def get_short_name(self):
        # The user is identified by their email address
        return self.user_account

    def __str__(self):  # __unicode__ on Python 2
        return self.user_account

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return True

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        # Simplest possible answer: All admins are staff
        return self.is_admin


class user_edu(models.Model):
    edu_id = models.AutoField(primary_key=True)
    create_time = models.DateTimeField(default=timezone.now)
    update_time = models.DateTimeField(auto_now=True)
    user_edu = models.CharField(max_length=10,null=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL,related_name='user_edu',null=True)
    collage_admin = models.ForeignKey('collage',related_name='admin_user_edu',null=True)
    collage_admin_name = models.CharField(max_length=40,null=True)
    collage_edu = models.ForeignKey('collage',related_name='user_edu',null=True)
    collage_edu_name = models.CharField(max_length=40,null=True)
    specialty = models.ForeignKey('specialty',related_name='user_edu',null=True)
    specialty_name = models.CharField(max_length=40,null=True)
    entrance_year = models.IntegerField(null= True)
    grade_year = models.IntegerField(null= True)
    classes = models.CharField(max_length=15,null=True)

    # def __str__(self):
    #     return self.collage_admin_name

class collage(models.Model):
    collage_id = models.AutoField(primary_key=True)
    create_time = models.DateTimeField(default=timezone.now)
    update_time = models.DateTimeField(auto_now=True)

    collage_name_cn = models.CharField(max_length=50,null=True)
    collage_name_es = models.CharField(max_length=100,null=True)
    collage_desc = models.CharField(max_length=100,null=True)
    collage_name_history = models.CharField(max_length=100,null=True)

    # specialty = models.ManyToManyField('specialty',related_name='collage',null=True)

    def __str__(self):
        return self.collage_name_cn

class specialty(models.Model):
    specialty_id = models.AutoField(primary_key=True)
    create_time = models.DateTimeField(default=timezone.now)
    update_time = models.DateTimeField(auto_now=True)

    specialty_name_cn = models.CharField(max_length=50,null=True)
    specialty_name_es = models.CharField(max_length=100,null=True)
    specialty_desc = models.CharField(max_length=100,null=True)
    is_old = models.BooleanField(default=False)
    specialty_level = models.CharField(max_length=20, null=True)
    specialty_name_history = models.CharField(max_length=100, null=True)
    collage = models.ForeignKey('collage',related_name='specialty',null=True)

    def __str__(self):
        return self.specialty_name_cn

'''
class collage_specialty_rel(models.Model):
    collage = models.ForeignKey('collage')
    specialty = models.ForeignKey('specialty')
    is_old = models.BooleanField(default=False)
'''

class organization(models.Model):
    org_id = models.AutoField(primary_key=True)
    create_time = models.DateTimeField(default=timezone.now)
    update_time = models.DateTimeField(auto_now=True)

    org_name = models.CharField(max_length=50,null=True)
    org_found_time = models.DateField(null=True)
    org_province = models.CharField(max_length=20,null=True)
    province = models.ForeignKey('D_province',related_name='orgnization',null=True)     #OneToMany
    org_city = models.CharField(max_length=20,null=True)
    city = models.ForeignKey('D_city',related_name='orgnization',null=True)
    user_admin = models.ForeignKey(settings.AUTH_USER_MODEL,related_name='admin_org',null=True)
    user_admin_name = models.CharField(max_length=20,null=True)
    org_contact_info = models.CharField(max_length=50,null=True)
    org_member_num = models.IntegerField(default=0)

    def __str__(self):
        return self.org_name
'''
class user_org_rel(models.Model):
    org = models.ForeignKey('organization')
    user = models.ForeignKey(settings.AUTH_USER_MODEL)
'''

class D_province(models.Model):
    province_id = models.IntegerField(null=True)
    n_province_id = models.IntegerField(primary_key=True)
    province_name = models.CharField(max_length=20, unique=True)


    def __str__(self):
        return self.province_name


class D_city(models.Model):
    city_id = models.AutoField(primary_key=True)
    n_city_id = models.IntegerField()
    city_name = models.CharField(max_length=20)
    n_province = models.ForeignKey('D_province',related_name='city',null=True)

    def __str__(self):
        return self.city_name


class D_industrial(models.Model):
    industrial_id = models.AutoField(primary_key=True)
    grand_code = models.CharField(max_length=1,null=True)
    grand_name = models.CharField(max_length=32,null=True)
    father_code = models.CharField(max_length=32,null=True)
    father_name = models.CharField(max_length=32,null=True)
    industrial_code = models.CharField(max_length=4)
    industrial_name = models.CharField(max_length=32)
    industrial_desc = models.CharField(max_length=200,null=True)
    create_time = models.DateTimeField(default=timezone.now())
    update_time = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.industrial_name


class user_history(models.Model):
    history_id = models.AutoField(primary_key=True)
    user = models.OneToOneField(settings.AUTH_USER_MODEL)
    create_time = models.DateTimeField(default=timezone.now)

    user_name = models.CharField(max_length=20)
    user_gender = models.CharField(max_length=2,null=True)
    user_birthday = models.DateTimeField(null=True)
    user_nation = models.CharField(max_length=10,null=True)

    user_post = models.CharField(max_length=20,null=True)
    user_workunit = models.CharField(max_length=40,null=True)
    user_workplace = models.CharField(max_length=60,null=True)

    user_province = models.CharField(max_length=20,null=True)
    province = models.OneToOneField('D_province',related_name='user_history',null=True)
    user_city = models.CharField(max_length=20,null=True)
    city = models.OneToOneField('D_city',related_name='user_history',null=True)
    industrial = models.OneToOneField('D_industrial',related_name='user_history',null=True)

    user_officephone = models.BigIntegerField(null=True)
    user_wechat = models.BigIntegerField(null=True)
    user_qq = models.BigIntegerField(null=True)
    user_email = models.CharField(max_length=32,null=True)
    user_cellphone = models.BigIntegerField(null=True)


class user_author(models.Model):
    author_id = models.AutoField(primary_key=True, default=1)
    create_time = models.DateTimeField(default=timezone.now)
    update_time = models.DateTimeField(auto_now=True)
    author_group = models.CharField(max_length=50,null=True)

    is_enable = models.BooleanField(default=0)
    is_edit = models.BooleanField(default=0)
    is_del = models.BooleanField(default=0)

    um_enable = models.BooleanField(default=0)
    um_add = models.BooleanField(default=0)
    um_del_up = models.BooleanField(default=0)
    um_del_up_space = models.CharField(max_length=50, default='专业')
    um_del_up_time = models.CharField(max_length=50, default='本年级')
    um_search = models.BooleanField(default=0)
    um_search_space = models.CharField(max_length=50, default='专业')
    um_search_time = models.CharField(max_length=30, default='本年级')
    um_is_export_excel = models.BooleanField(default=0)
    um_is_import_excel = models.BooleanField(default=0)

    nuv_enable = models.BooleanField(default=0)
    nuv_search_add_del_up = models.BooleanField(default=0)
    nuv_search_add_del_up_space = models.CharField(max_length=50, default='专业')

    usim_enable = models.BooleanField(default=0)

    as_enable = models.BooleanField(default=0)

    uim_enable = models.BooleanField(default=0)
    uim_search = models.BooleanField(default=0)
    uim_add_del_up = models.BooleanField(default=0)

    om_enable = models.BooleanField(default=0)
    om_search = models.BooleanField(default=0)
    om_add_del_up = models.BooleanField(default=0)

    am_enable = models.BooleanField(default=0)





# class Category(models.Model):
#     autoid = models.AutoField(primary_key=True)
#     email = models.CharField(max_length=150, blank=False)
#     comtype = models.CharField(max_length=20, blank=False)
#     catname = models.CharField(max_length=150, blank=False)
#
#     def __unicode__(self):
#         return '%s' % (self.catname)
#
#     def toJSON(self):
#         import json
#         return json.dumps(dict([(attr, getattr(self, attr)) for attr in [f.name for f in self._meta.fields]]))
#
class D_country(models.Model):
    country_id = models.AutoField(primary_key=True)
    country_name_es = models.CharField(max_length=100, null=True)
    country_name_cn = models.CharField(max_length=100, null=True)
    country_code1 = models.CharField(max_length=60, null=True)
    country_code2 = models.CharField(max_length=60, null=True)

class school(models.Model):
    school_id = models.AutoField(primary_key=True)
    school_name_es = models.CharField(max_length=100,null=True)
    school_name_cn = models.CharField(max_length=100,null=True)