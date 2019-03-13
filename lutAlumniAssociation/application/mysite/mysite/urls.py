"""mysite URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url,include
from django.contrib import admin



from oneapp.views import (
    angular,
    signedin,
    check_password,
    reset_password,
    verify_account,
    sign_up,
    reset_pwd_by_ids,
    upload_file,
    # download_file,
    export_file_by_terms,
    test,

    get_allschoolmates,
    get_schoolmates_edu,
    get_city,
    get_industrial,
    get_province,
    get_country,
    get_work_info,
    get_history_info,
    get_all_organization,

    get_alumnus_all,
    get_alumnus_by_id,
    get_alumnus_by_name,
    get_alumnus_by_terms,
    get_alumnus_by_terms_t,
    delete_alumnus_by_id,
    get_school_info,
    get_collage,
    get_specialty,
    add_message,

    get_authgroup_all,
    update_alumnus_authgroup_by_ids,

    update_alumnus_by_id,
    update_college_name_by_id,
    update_specialty_name_by_id,
    add_specialty


)


urlpatterns = [
    url(r'^angular', angular),


    url(r'^signedin', signedin),
    url(r'^token/',include('tokenapi.urls')),
    url(r'^check_password', check_password),
    url(r'^reset_password', reset_password),
    url(r'^verify_account', verify_account),
    url(r'^sign_up',sign_up),
    url(r'^reset_pwd_by_ids', reset_pwd_by_ids),

    url(r'^upload_file',upload_file),
    # url(r'^download_file',download_file),
    url(r'^export_file_by_terms',export_file_by_terms),

    url(r'^get_allschoolmates',get_allschoolmates),

    url(r'^update_college_name_by_id',update_college_name_by_id),
    url(r'^update_specialty_name_by_id',update_specialty_name_by_id),
    url(r'^add_specialty',add_specialty),
    url(r'^add_message',add_message),

    url(r'^test',test),

    url(r'^get_city', get_city),
    url(r'^get_province', get_province),
    url(r'^get_country', get_country),
    url(r'^get_industrial', get_industrial),
    url(r'^get_work_info', get_work_info),
    url(r'^get_history_info', get_history_info),
    url(r'^get_all_organization', get_all_organization),

    url(r'^get_city',get_city),
    url(r'^get_province',get_province),
    url(r'^get_industrial',get_industrial),
    url(r'^get_work_info', get_work_info),
    url(r'^get_history_info', get_history_info),
    url(r'^get_all_organization',get_all_organization),

    url(r'get_school_info', get_school_info),
    url(r'get_allschoolmates', get_allschoolmates),

    url(r'^get_alumnus_all', get_alumnus_all),
    url(r'^get_alumnus_by_id', get_alumnus_by_id),
    url(r'^get_alumnus_by_name',get_alumnus_by_name),
    url(r'^get_alumnus_by_terms',get_alumnus_by_terms),
    url(r'^get_alumnus_by_terms_t', get_alumnus_by_terms_t),
    url(r'^delete_alumnus_by_id', delete_alumnus_by_id),
    url(r'^get_collage',get_collage),
    url(r'^get_specialty',get_specialty),


    url(r'^update_alumnus_by_id',update_alumnus_by_id),


    url(r'^get_authgroup_all',get_authgroup_all),
    url(r'^update_alumnus_authgroup_by_ids',update_alumnus_authgroup_by_ids),
]





