import os
import xlrd
import xlwt
from io import StringIO,BytesIO
import json
import datetime
import math
import random
import string
from dateutil.relativedelta import relativedelta

from django.db.models import Q
from mysite.settings import BASE_DIR
from django.shortcuts import render_to_response, render
from django.http import JsonResponse,HttpResponse
from tokenapi.decorators import token_required
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import check_password
from django.core import serializers

from oneapp import models
from oneapp.models import (
    D_province,
    D_country,
    D_industrial,
    D_city,
    organization,
    user_history,
    user,
    user_edu,
    user_author,

    collage,
    specialty
)

from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
# Create your views here.

# 自定义用户模型引用方式get_user_model()
user = get_user_model()


'''
用户密码验证

:param param1:
:returns:code返回0表示密码正确，返回1则表示密码不正确
:raises KeyError:

'''
@token_required
def check_password(request):
    code = 1
    user_id = request.POST.get("user")
    # 从前端接受密码
    password = request.POST.get("password")
    print(user_id,password)
    pass_state = user.objects.get(pk=user_id).check_password(password)
    print(password,pass_state)
    if pass_state:
        code = 0
    data = {
        "code": code
    }
    return JsonResponse(data)
'''
用户密码修改（个人）

:param param1:
:returns:code返回0表示密码修改成功
:raises KeyError:

'''
@token_required
def reset_password(request):
    user_id = request.POST.get("user")
    password = request.POST.get("password")
    new_password = request.POST.get("newpassword")
    print(password)
    print(new_password)
    pass_state = user.objects.get(pk=user_id).check_password(password)
    if pass_state:
        u = user.objects.get(pk = user_id)
        u.set_password(new_password)
        u.save()
        data = {
            "code":0,
            "message":"更新成功！"
        }
        return JsonResponse(data)
    else:
        data = {
            "code": 1,
            "message": "密码错误！"
        }
        return JsonResponse(data)

'''
用户注册时邮箱验证

:param param1:
:returns:code返回0表示验证通过
:raises KeyError:

'''

def verify_account(request):
    account = request.POST.get("account")

    print(account)
    u_exist = user.objects.filter(user_account=account)
    print(u_exist)
    if len(list(u_exist)):
        data = {
            "code":1,
            "message":"账户已注册！"
        }
        return JsonResponse(data)
    else:
        data = {
            "code": 0,
            "message": "账号未注册！"
        }
        return JsonResponse(data)

'''
用户注册

:param param1:
:returns:code返回0表示注册成功
:raises KeyError:

'''

def sign_up(request):
    code = 0
    message = "数据更新成功！"
    # 页面访问
    da = request.POST  # 字符串
    print("da", da)
    # 将字符串反序列化为dict
    da_signup = json.loads(da['signup_data'])
    print("da_signup", da_signup)
    # 分别取出校友基本信息和学籍信息（dict）
    user_info = da_signup['user_info']
    user_educations = da_signup['user_education']
    print("user_info", user_info)
    # 按照省的名字，获得省对象，这部分没有数据合法性判断机制，有待完善
    new_user = user.objects.create(user_account=user_info['user_account'])
    new_user.set_password(user_info['user_pwd'])
    new_user.save()
    print(new_user.password)
    if user_info['user_province'] != '':
        user_province = D_province.objects.get(province_name=user_info['user_province'])
    else:
        # 如果是空字符串''，给user_province赋值None
        user_province = None
    if user_info['user_city'] != '':
        user_city = D_city.objects.get(city_name=user_info['user_city'])
    else:
        user_city = None
    if user_info['industrial_name'] != '':
        user_industrial = D_industrial.objects.get(father_code=None, industrial_name=user_info['industrial_name'])
    else:
        user_industrial = None
    if user_info['user_birthday'] != '':
        user_birthday = user_info['user_birthday']
    else:
        user_birthday = None

    # 根据id更新指定校友的基本信息
    user.objects.filter(user_account=user_info['user_account']).update(
        user_name=user_info['user_name'],
        user_gender=user_info['user_gender'],
        user_birthday=user_birthday,
        user_nation=user_info['user_nation'],

        user_cellphone=user_info['user_cellphone'],
        user_qq=user_info['user_qq'],
        user_wechat=user_info['user_wechat'],
        user_email=user_info['user_email'],

        industrial=user_industrial,
        user_officephone=user_info['user_officephone'],
        user_workplace=user_info['user_workplace'],

        user_workunit=user_info['user_workunit'],
        user_post=user_info['user_post'],
        province=user_province,
        city=user_city,
        author_id=3,
    )
    # alu = user.objects.get(pk=da['alumnus_id'])
    # print(alu)
    # alu.province = user_province
    # alu.city = user_city
    # alu.industrial = user_industrial
    # alu.save()


    # # 删除学籍信息
    # f_edu_da = []
    # b_edu_da = []
    # for user_education in user_educations:
    #     # 前端传来的指定校友的所有学籍的edu_id
    #     f_edu_da.append(user_education['edu_id'])
    # user_educations_b = user_edu.objects.filter(user_id=user_info['user_id']).values()
    # for user_education_b in user_educations_b:
    #     # 后端的指定校友的所有学籍的edu_id
    #     b_edu_da.append(user_education_b['edu_id'])
    # for i in b_edu_da:
    #     # 如果指定校友的某学籍id不在前端传来的学籍id中，则删除该条学籍
    #     if i not in f_edu_da:
    #         user_edu.objects.filter(pk=i).delete()
    #         # 更新b_edu_da
    #         b_edu_da.remove(i)

    # 根据id更新指定校友的学籍信息，目前只能更新第一个学籍，要跟新多个学籍的话，考虑在
    # 没组学籍信息中加入学籍pk
    for user_education in user_educations:
        edu_exist = user_edu.objects.filter(collage_edu_name=user_education['collage_edu_name'],specialty_name=user_education['specialty_name_cn'],user_edu=user_education['user_edu'])
        if edu_exist:

            message='学籍信息有重复'
            continue
        else:
            if user_education['collage_admin_name'] != '':
                user_collage_admin = collage.objects.get(collage_name_cn=user_education['collage_admin_name'])
            else:
                user_collage_admin = None
            if user_education['collage_edu_name'] != '':
                user_collage_edu = collage.objects.get(collage_name_cn=user_education['collage_edu_name'])
            else:
                user_collage_edu = None
            if user_education['specialty_name_cn'] != '':
                user_specialty = specialty.objects.get(specialty_name_cn=user_education['specialty_name_cn'])
            else:
                user_specialty = None

            if user_education['entrance_year'] != '':
                user_entrance_year = user_education['entrance_year']
            else:
                user_entrance_year = None
            if user_education['grade_year'] != '':
                user_grade_year = user_education['grade_year']
            else:
                user_grade_year = None

            user_edu.objects.create(
                user_edu=user_education['user_edu'],
                # collage_admin是外键，这里赋值的是学院对象
                collage_admin=user_collage_admin,
                # collage_admin_name是字符串，直接通过输入来赋值
                collage_admin_name=user_education['collage_admin_name'],
                collage_edu=user_collage_edu,
                collage_edu_name=user_education['collage_edu_name'],
                specialty=user_specialty,
                entrance_year=user_entrance_year,
                grade_year=user_grade_year,
                classes=user_education['classes'],
                user_id=new_user.user_id
            )
        # elif user_education['edu_id'] in b_edu_da:
        #     user_edu.objects.filter(pk=user_education['edu_id']).update(
        #         user_edu=user_education['user_edu'],
        #         # collage_admin是外键，这里赋值的是学院对象
        #         collage_admin=user_collage_admin,
        #         # collage_admin_name是字符串，直接通过输入来赋值
        #         collage_admin_name=user_education['collage_admin_name'],
        #         collage_edu=user_collage_edu,
        #         collage_edu_name=user_education['collage_edu_name'],
        #         specialty=user_specialty,
        #         entrance_year=user_entrance_year,
        #         grade_year=user_grade_year,
        #         classes=user_education['classes']
        #     )
        # else:
        #     code = 1
        #     message = "校友与学籍对应有误！"

    # 根据id获取跟新后的该校友基本信息
    # alu_info = user.objects.filter(
    #     pk=da['alumnus_id']
    # ).values(
    #     'user_id',
    #     'user_name',
    #     'user_gender',
    #     'user_nation',
    #     'user_birthday',
    #     'province',
    #     'user_city',
    #     'user_cellphone',
    #     'user_workunit',
    #     'user_officephone',
    #     'user_qq',
    #     'user_wechat'
    # )
    # user_info = list(alu_info)[0]
    # # 根据id获取跟新后的该校友学籍信息
    # alu_edus = user_edu.objects.filter(
    #     user_id=da['alumnus_id']
    # ).values(
    #     'edu_id',
    #     'entrance_year',
    #     'grade_year',
    #     'collage_edu_name',
    #     'collage_admin_name',
    #     'specialty__specialty_name_cn',
    #     'user_edu'
    # )
    # user_education = list(alu_edus)
    # # 组装数据
    # data = {
    #     "user_info":user_info,
    #     "user_education":user_education
    # }
    # 组装有状态码的数据
    da = {
        "code": code,
        "message": message
    }
    # 返回json对象
    return JsonResponse(da)



'''
用户密码修改（按照id重置多个用户的密码）

:param param1:
:returns:code返回0表示密码修改成功
:raises KeyError:

'''
# @token_required
def reset_pwd_by_ids(request):
    # user_id = request.POST.get("user")
    alumnus_ids = json.loads(request.POST.get('alumnus_ids'))
    # new_password = request.POST.get("newpassword")
    print(alumnus_ids)
    for alumnus_id in alumnus_ids:
        u = user.objects.get(pk=alumnus_id)
        u.set_password('12345678')
        u.save()
    data = {
        "code":0,
        "messsage":"更新成功！"
    }
    return JsonResponse(data)

# def rpids(request):
#     # user_id = request.POST.get("user")
#     alumnus_ids = json.loads(request.POST.get('alumnus_ids'))
#     # new_password = request.POST.get("newpassword")
#     print(alumnus_ids)
#     # for alumnus_id in alumnus_ids:
#     #     u = user.objects.get(pk=alumnus_id)
#     #     u.set_password('12345678')
#     #     u.save()
#     data = {
#         "code":0,
#         "messsage":"更新成功！"
#     }
#     return JsonResponse(data)


# '''
# Excel文件上传并导入测试,这是第二版，如果检测到账号已经存在，那么直接删除该用户，包括其学籍信息，这样的话会导致导入信息是，如果有多条学籍，那么会依次删除，仅保留最后一条
# !!!!!!很重要!!!!!!!!很重要!!!!!!!!!!
# :param param1:
# :returns:
# :raises KeyError:
#
# '''
# # @token_required
# def upload_file(request):
#     print(request.POST.get('token'))
#     # 请求方法为POST时，进行处理
#     if request.method == "POST":
#         # 获取上传的文件，如果没有文件，则默认为None
#         myFile =request.FILES.get("myfile", None)
#         if not myFile:
#             return HttpResponse("no files for upload!")
#         # 打开特定的文件进行二进制的写操作
#         destination = open(os.path.join(BASE_DIR,'upload_file/',myFile.name),'wb+')
#         # 分块写入文件
#         for chunk in myFile.chunks():
#             destination.write(chunk)
#         destination.close()
#
#         data = xlrd.open_workbook('upload_file/'+myFile.name)
#         table = data.sheets()[0]
#         # n = table.nrows
#         col_data = table.col_values(0)  # 获得第一列的数据列表，然后就可以迭代里面的数据了
#         n = 0
#         for temp in col_data:
#             # 去掉字符串两端空格
#             print(temp)
#             temp = temp.strip(' ')
#             if temp != '':
#                 n+=1
#             else:
#                 break
#         print(col_data)
#         print(n)
#         count = 0
#         for i in range(3, n):
#             a = table.row_values(i)
#             new_alu = user.objects.filter(user_account=a[0])
#             print(new_alu)
#             if list(new_alu) != []:
#                 # 如果校友个人信息存在
#                 new_alu = user.objects.get(user_account=a[0])
#                 # user_edu.objects.filter(user_id=new_alu.user_id)
#
#                 # user = models.ForeignKey(User, blank=True, null=True, on_delete=models.SET_NULL)
#                 # 当user_edu对应的user被删除了，user_edu里的user字段会设置为空值，而不是连同user_edu也删除掉，这点比原先的进了一小步，有点选择性了。当然，如果没有指定on_delete，Django还是采用级联的删除方式。
#                 #
#                 # on_delete有多少个选项呢：
#                 # CASCADE: 这就是默认的选项，级联删除，你无需显性指定它。
#                 # PROTECT: 保护模式，如果采用该选项，删除的时候，会抛出ProtectedError错误。
#                 # SET_NULL: 置空模式，删除的时候，外键字段被设置为空，前提就是blank = True, null = True, 定义该字段的时候，允许为空。
#                 # SET_DEFAULT: 置默认值，删除的时候，外键字段设置为默认值，所以定义外键的时候注意加上一个默认值。
#                 # SET(): 自定义一个值，该值当然只能是对应的实体了。
#                 new_alu.delete()
#
#             m = get_user_model().objects.create(
#                 user_account=a[0],
#                 user_name=a[1],
#                 user_gender=a[2],
#                 # user_birthday=a[3],
#                 country_name_cn = a[4],
#                 user_nation=a[5],
#                 user_post=a[6],
#                 user_workunit=a[7],
#                 industrial_name=a[8],
#                 user_workplace=a[9],
#                 user_province=a[10],
#                 user_city=a[11],
#                 # user_email=a[15],
#             )
#             print(a[8])
#             print(a[3])
#             if a[3] == '':
#                 pass
#             else:
#                 birth = a[3].replace("/","-")
#                 print(birth)
#                 m.user_birthday = birth
#             if a[12] == '':
#                 pass
#             else:
#                 m.user_officephone = str(a[12])
#             if a[13] == '':
#                 pass
#             else:
#                 m.user_wechat = a[13]
#             if a[14] == '':
#                 pass
#             else:
#                 m.user_qq = str(int(a[14]))
#             if a[16] == '':
#                 pass
#             else:
#                 m.user_cellphone = str(int(a[16]))
#             if a[8] == '':
#                 pass
#             else:
#                 ii = D_industrial.objects.get(
#                     industrial_name=a[8],
#                     # 条件1：父级代码为空
#                     father_code__isnull= True ,
#                     # 条件2：祖父机代码也为空
#                     grand_code__isnull=True)
#                 m.industrial = ii
#             if a[10] == '':
#                 pass
#             else:
#                 pp = D_province.objects.get(province_name=a[10])
#                 m.province = pp
#             if a[11] == '':
#                 pass
#             else:
#                 cc = D_city.objects.get(city_name=a[11],n_province_id = pp.n_province_id)
#                 m.city = cc
#             # 为新建用户设置默认密码
#             m.set_password(123456)
#             m.save()
#
#             print(a[23])
#
#             # 导入该校友的学籍信息
#             me = user_edu.objects.create(
#                 user_edu = a[17],
#                 collage_edu_name = a[19],
#                 collage_admin_name = a[18],
#                 specialty_name = a[20],
#                 # entrance_year = int(a[21]),
#                 # grade_year = int(a[22]),
#                 classes = a[23],
#
#                 # user_id = m.pk,
#             )
#             me.user_id = m.pk
#
#
#             if a[21] == '':
#                 pass
#             else:
#                 me.entrance_year = int(a[21])
#             if a[22] == '':
#                 pass
#             else:
#                 me.entrance_year = int(a[22])
#             if a[19] == '':
#                 pass
#             else:
#                 col_e = collage.objects.get(collage_name_cn=a[19])
#                 me.collage_edu = col_e
#             if a[18] == '':
#                 pass
#             else:
#                 col_a = collage.objects.get(collage_name_cn=a[18])
#                 me.collage_admin = col_a
#             if a[20] == '':
#                 pass
#             else:
#                 print(a[20])
#                 spe = specialty.objects.get(specialty_name_cn=a[20],collage_id = col_e.collage_id)
#                 print(spe)
#                 me.specialty = spe
#             me.save()
#             count +=1
#         # data = {
#         #     "code":0,
#         #     "message":"数据导入成功！",
#         #     "count":count
#         # }
#         # return JsonResponse(data)
#         return HttpResponse("<h1>数据上传成功！</h1>")


'''
Excel文件上传并导入测试,这是第三版，如果检测到账号已经存在，那么更新该用户的基本信息和学籍信息，通过学籍学院，专业，学历唯一确定学籍

:param param1:
:returns:
:raises KeyError:

'''
# @token_required
def upload_file(request):
    print(request.POST.get('token'))
    # 请求方法为POST时，进行处理
    if request.method == "POST":
        # 获取上传的文件，如果没有文件，则默认为None
        myFile =request.FILES.get("myfile", None)
        if not myFile:
            return HttpResponse("no files for upload!")
        # 打开特定的文件进行二进制的写操作
        destination = open(os.path.join(BASE_DIR,'upload_file/',myFile.name),'wb+')
        # 分块写入文件
        for chunk in myFile.chunks():
            destination.write(chunk)
        destination.close()

        data = xlrd.open_workbook('upload_file/'+myFile.name)
        table = data.sheets()[0]
        # n = table.nrows
        col_data = table.col_values(0)  # 获得第一列的数据列表，然后就可以迭代里面的数据了
        n = 0
        for temp in col_data:
            # 去掉字符串两端空格
            print(temp)
            temp = temp.strip(' ')
            if temp != '':
                n+=1
            else:
                break
        print(col_data)
        print(n)
        count = 0
        for i in range(3, n):
            a = table.row_values(i)
            new_alu = user.objects.filter(user_account=a[0])
            print(new_alu)
            if list(new_alu) != []:
                # 如果校友个人信息存在
                new_alu = user.objects.get(user_account=a[0])
                new_alu.user_account = a[0],
                new_alu.user_name = a[1],
                new_alu.user_gender = a[2],
                # user_birthday=a[3],
                new_alu.country_name_cn = a[4],
                new_alu.user_nation = a[5],
                new_alu.user_post = a[6],
                new_alu.user_workunit = a[7],
                new_alu.industrial_name = a[8],
                new_alu.user_workplace = a[9],
                new_alu.user_province = a[10],
                new_alu.user_city = a[11],
            else:
                m = get_user_model().objects.create(
                    user_account=a[0],
                    user_name=a[1],
                    user_gender=a[2],
                    # user_birthday=a[3],
                    country_name_cn = a[4],
                    user_nation=a[5],
                    user_post=a[6],
                    user_workunit=a[7],
                    industrial_name=a[8],
                    user_workplace=a[9],
                    user_province=a[10],
                    user_city=a[11],
                    # user_email=a[15],
                )
                print(a[8])
                print(a[3])
                if a[3] == '':
                    pass
                else:
                    birth = a[3].replace("/","-")
                    print(birth)
                    m.user_birthday = birth
                if a[12] == '':
                    pass
                else:
                    m.user_officephone = str(a[12])
                if a[13] == '':
                    pass
                else:
                    m.user_wechat = a[13]
                if a[14] == '':
                    pass
                else:
                    m.user_qq = str(int(a[14]))
                if a[16] == '':
                    pass
                else:
                    m.user_cellphone = str(int(a[16]))
                if a[8] == '':
                    pass
                else:
                    ii = D_industrial.objects.get(
                        industrial_name=a[8],
                        # 条件1：父级代码为空
                        father_code__isnull= True ,
                        # 条件2：祖父机代码也为空
                        grand_code__isnull=True)
                    m.industrial = ii
                if a[10] == '':
                    pass
                else:
                    pp = D_province.objects.get(province_name=a[10])
                    m.province = pp
                if a[11] == '':
                    pass
                else:
                    cc = D_city.objects.get(city_name=a[11],n_province_id = pp.n_province_id)
                    m.city = cc
                # 为新建用户设置默认密码
                m.set_password(123456)
                m.save()

                print(a[23])

                # 导入该校友的学籍信息
                me = user_edu.objects.create(
                    user_edu = a[17],
                    collage_edu_name = a[19],
                    collage_admin_name = a[18],
                    specialty_name = a[20],
                    # entrance_year = int(a[21]),
                    # grade_year = int(a[22]),
                    classes = a[23],

                    # user_id = m.pk,
                )
                me.user_id = m.pk


                if a[21] == '':
                    pass
                else:
                    me.entrance_year = int(a[21])
                if a[22] == '':
                    pass
                else:
                    me.entrance_year = int(a[22])
                if a[19] == '':
                    pass
                else:
                    col_e = collage.objects.get(collage_name_cn=a[19])
                    me.collage_edu = col_e
                if a[18] == '':
                    pass
                else:
                    col_a = collage.objects.get(collage_name_cn=a[18])
                    me.collage_admin = col_a
                if a[20] == '':
                    pass
                else:
                    print(a[20])
                    spe = specialty.objects.get(specialty_name_cn=a[20],collage_id = col_e.collage_id)
                    print(spe)
                    me.specialty = spe
                me.save()
                count +=1
        # data = {
        #     "code":0,
        #     "message":"数据导入成功！",
        #     "count":count
        # }
        # return JsonResponse(data)
        return HttpResponse("<h1>数据上传成功！</h1>")



# def download_file(request):
#     # do something...
#     with open('download_file/test.xlsx') as f:
#         c = f.read()
#
#     the_file_name = "test.xlsx"
#     response = HttpResponse(c)
#     response['Content-Type'] = 'application/vnd.ms-excel'
#     response['Content-Disposition'] = 'attachment;filename="{0}"'.format(the_file_name)
#     return response
# @token_required
def download_file(request):
    """
    导出excel表格
    """
    list_obj_user = user.objects.all().order_by("user_id")
    if list_obj_user:
        # 创建工作薄
        ws = xlwt.Workbook(encoding='utf-8')
        w = ws.add_sheet(u"用户信息")
        w.write(0, 0, "用户id")
        w.write(0, 1, u"用户账号")
        w.write(0, 2, u"用户名")
        w.write(0,3,u"性别")
        w.write(0, 4, u"出生年月")
        w.write(0, 5, u"国籍")
        w.write(0, 6, u"民族")
        w.write(0, 7, u"职务")
        w.write(0, 8, u"工作单位")
        w.write(0, 9, u"行业")
        w.write(0, 10, u"单位地址")
        w.write(0, 11, u"所在省")
        w.write(0, 12, u"所在市")
        w.write(0, 13, u"办公电话")
        w.write(0, 14, u"微信号")
        w.write(0, 15, u"QQ号")
        w.write(0, 16, u"手机号")
        w.write(0, 17, u"学历")
        w.write(0, 18, u"管理学院")
        w.write(0, 19, u"学籍学院")
        w.write(0, 20, u"专业")
        w.write(0, 21, u"入学年份")
        w.write(0, 22, u"毕业年份")
        w.write(0, 23, u"班级")
        # 写入数据
        excel_row = 1
        for obj_user in list_obj_user:
            list_obj_edu = user_edu.objects.filter(user_id = obj_user.user_id)
            for obj_edu in list_obj_edu:

                data_user_id = obj_user.user_id
                data_user_account = obj_user.user_account
                data_user_name = obj_user.user_name
                data_user_gender = obj_user.user_gender
                data_user_birthday = obj_user.user_birthday
                data_user_country = obj_user.country_name_cn
                data_user_nation = obj_user.user_nation
                data_user_post = obj_user.user_post
                data_user_workunit = obj_user.user_workunit
                data_user_industry = obj_user.industrial_name
                data_user_workplace = obj_user.user_workplace
                data_user_province = obj_user.user_province
                data_user_city = obj_user.user_city
                data_user_officephone = obj_user.user_officephone
                data_user_wechat = obj_user.user_wechat
                data_user_qq = obj_user.user_qq

                data_user_cellphone = obj_user.user_cellphone



                data_user_edu = obj_edu.user_edu
                data_collage_admin_name = obj_edu.collage_admin_name
                data_collage_edu_name = obj_edu.collage_edu_name
                data_specialty_name = obj_edu.specialty_name
                data_entrance_year = obj_edu.entrance_year
                data_grade_year = obj_edu.grade_year
                data_classes = obj_edu.classes




                w.write(excel_row, 0, data_user_id)
                w.write(excel_row, 1, data_user_account)
                w.write(excel_row, 2, data_user_name)
                w.write(excel_row, 3, data_user_gender)
                w.write(excel_row, 4, data_user_birthday)
                w.write(excel_row, 5, data_user_country)
                w.write(excel_row, 6, data_user_nation)
                w.write(excel_row, 7, data_user_post)
                w.write(excel_row, 8, data_user_workunit)
                w.write(excel_row, 9, data_user_industry)
                w.write(excel_row, 10, data_user_workplace)
                w.write(excel_row, 11, data_user_province)
                w.write(excel_row, 12, data_user_city)
                w.write(excel_row, 13, data_user_officephone)
                w.write(excel_row, 14, data_user_wechat)
                w.write(excel_row, 15, data_user_qq)
                w.write(excel_row, 16, data_user_cellphone)
                w.write(excel_row, 17, data_user_edu)
                w.write(excel_row, 18, data_collage_admin_name)
                w.write(excel_row, 19, data_collage_edu_name)

                w.write(excel_row, 20, data_specialty_name)
                w.write(excel_row, 21, data_entrance_year)
                w.write(excel_row, 22, data_grade_year)
                w.write(excel_row, 23, data_classes)

                excel_row += 1
        # 检测文件是够存在
        # 方框中代码是保存本地文件使用，如不需要请删除该代码
        ###########################
        # exist_file = os.path.exists("test2.xls")
        # if exist_file:
        #     os.remove(r"test2.xls")
        # ws.save("test2.xls")
        ############################
        # sio = StringIO
        # ws.save(sio)
        # sio.seek(0)
        # response = HttpResponse(sio.getvalue(), content_type='application/vnd.ms-excel')
        # response['Content-Disposition'] = 'attachment; filename=test.xls'
        # response.write(sio.getvalue())
        # return response
        # #########################################
        # with open('test2.xls') as f:
        #     c = f.read()
        #
        # the_file_name = "test2.xls"
        # response = HttpResponse(c)
        # response['Content-Type'] = 'application/vnd.ms-excel'
        # response['Content-Disposition'] = 'attachment;filename="{0}"'.format(the_file_name)
        # return response

        # 这里响应对象获得了一个特殊的mime类型,告诉浏览器这是个exell文件不是html
        response = HttpResponse(content_type='application/vnd.ms-excel')
        # 这里响应对象获得了附加的Content-Disposition协议头,它含有excel文件的名称,文件名随意,当浏览器访问它时,会以"另存为"对话框中使用它.
        response['Content-Disposition'] = 'attachment; filename=test2.xls'
        ws.save(response)
        return response


def export_file_by_terms(request):
    """
    导出excel表格
    """
    # code = 0
    t = request.POST  # 字符串
    print(t)

    # pages = json.loads(t['pages'])

    terms = json.loads(t['terms'])
    print(terms)
    # # print(term)
    # # terms =    [
    # #                 {
    # #                 'user_name':'',
    # #                 'user_age':'',
    # #                 'user_province':'北京'
    # #                 },
    # #                 {
    # #                 'specialty_name':'计算机科学与技术系',
    # #                 'entrance_year1':2000,
    # #                 'entrance_year2':'',
    # #                 'collage_admin_name':'',
    # #                 'user_edu':''
    # #                 }
    # #             ]
    #
    # 校友基本信息的查询条件
    terms_user = terms['user_info']
    # 校友学籍信息的查询条件
    terms_edu = terms['user_education']
    q1 = Q()
    q2 = Q()
    q2_1 = Q()
    q2_2 = Q()
    for i in terms_user:
        # 去掉条件两端的空格
        terms_user[i] = terms_user[i].strip(' ')
        if terms_user[i] != '' and terms_user[i] != None:
            if i == 'user_age':

                # ==========字符串替换===============================
                # str.replace(old, new[, max])
                # 参数
                # old - - 这是要进行更换的旧子串。
                # new - - 这是新的子串，将取代旧的子字符串。
                # max - - 如果这个可选参数max值给出，仅第一计数出现被替换。

                # ==========判断是字符串还是数字=======================
                # isinstance(1,int)
                # isinstance(asd,str)

                if isinstance(terms_user[i], str):
                    terms_user[i] = int(terms_user[i])
                today = datetime.date.today()
                age = terms_user['user_age']
                birth_1 = today - relativedelta(years=age)
                birth_2 = today - relativedelta(years=age + 1)
                q1.add(~Q(user_birthday__gt=birth_1), q1.AND)
                q1.add(Q(user_birthday__gt=birth_2), q1.AND)
            elif i == 'user_name':
                q1.add(Q(user_name__contains=terms_user['user_name']), q1.AND)
            elif i == 'industry':
                q1.add(Q(industrial__industrial_name=terms_user['industry']), q1.AND)
            else:
                q1.add(Q(**{i: terms_user[i]}), q1.AND)
        elif i == 'author_id':
            q1.add(~Q(author_id=3), q1.AND)
    # 去掉查询条件两端的空格
    for i in terms_edu:
        terms_edu[i] = terms_edu[i].strip(' ')
    if terms_edu['collage_admin_name'] != '':
        q2_1.add(
            Q(collage_admin_name=terms_edu['collage_admin_name']),
            q2_1.AND
        )
    if terms_edu['collage_edu_name'] != '':
        q2_1.add(
            Q(collage_edu_name=terms_edu['collage_edu_name']),
            q2_1.AND
        )
    if terms_edu['specialty_name_cn'] != '':
        q2_1.add(
            Q(specialty__specialty_name_cn=terms_edu['specialty_name_cn']),
            q2_1.AND
        )
    if terms_edu['entrance_year1'] != '' and terms_edu['entrance_year1'] != None:
        q2_1.add(
            ~Q(entrance_year__lt=terms_edu['entrance_year1']),
            q2_1.AND
        )
    if terms_edu['entrance_year2'] != '' and terms_edu['entrance_year2'] != None:
        q2_1.add(
            ~Q(entrance_year__gt=terms_edu['entrance_year2']),
            q2_1.AND
        )
    if terms_edu['user_edu_1'] != '':
        q2_2.add(
            Q(user_edu=terms_edu['user_edu_1']),
            q2_2.OR
        )
    if terms_edu['user_edu_2'] != '':
        q2_2.add(
            Q(user_edu=terms_edu['user_edu_2']),
            q2_2.OR
        )
    if terms_edu['user_edu_3'] != '':
        q2_2.add(
            Q(user_edu=terms_edu['user_edu_3']),
            q2_2.OR
        )
    if terms_edu['user_edu_4'] != '':
        q2_2.add(
            Q(user_edu=terms_edu['user_edu_4']),
            q2_2.OR
        )
    q2.add(q2_1, q2.AND)
    q2.add(q2_2, q2.AND)
    print(q1, q2)
    data_a = []
    us = get_user_model().objects.filter(q1).values(
        'user_id',
        'user_account',
        'user_name',
        'user_gender',
        'country_name_cn',
        'user_nation',
        'user_birthday',
        'user_province',
        'user_city',
        'user_cellphone',
        'user_workunit',
        'user_officephone',
        'user_qq',
        'user_wechat',
        'user_post',
        'user_workplace',
        'industrial_name'
    )
    # us    <QuerySet [{*********},{*********}]>
    # if list(us) ==[]:
    for u in us:
        #  u    {********}
        ues = user_edu.objects.filter(
            user_id=u['user_id']
        ).filter(q2).values(
            'edu_id',
            'entrance_year',
            'grade_year',
            'collage_edu_name',
            'collage_admin_name',
            'specialty__specialty_name_cn',
            'user_edu',
            'classes'
        )
        # ues    <QuerySet [{*********},{*********}]>
        if list(ues) == []:
            # data_a.append(u)
            pass
        else:
            for ue in ues:
                #  ue    {********}
                ue['specialty_name'] = ue['specialty__specialty_name_cn']
                ue.pop('specialty__specialty_name_cn')
                u_e_d = {}
                u_e_d.update(u)
                u_e_d.update(ue)
                data_a.append(u_e_d)

                # user_education = []
                # for i in user_education_p:
                #     i['specialty_name'] = i['specialty__specialty_name_cn']
                #     i.pop('specialty__specialty_name_cn')
                #     user_education.append(i)

    # # page, 当前请求的页码
    # page = pages['page']
    # # page_row_num,当前请求的页内行数
    # page_row_num = pages['page_row_num']
    # # 总行数
    # row_total_num = len(data_a)
    # # 总页数，通过总行数计算
    # page_total_num = math.ceil(row_total_num / page_row_num)
    #
    # # 如果输入的页数有误，则设置code=1, 并强制返回第一页
    # if page > page_total_num or page < 0:
    #     if row_total_num == 0:
    #         page = 1
    #     else:
    #         print("page输出数据有误，超过了指定范围", "page_total_num =", page_total_num, "page=", page)
    #         # code = 1
    #         # page = 1
    #         page = page_total_num
    # # 当前页起始下标
    # row_start = page_row_num * (page - 1)
    # if row_start < 0:
    #     row_start = 0;
    # # 当前页结束下标
    # row_end = page_row_num * page
    # if row_end > row_total_num:
    #     row_end = row_total_num;
    # print('row_start', row_start)
    # print('row_end', row_end)
    #
    # # 没加分页的最终数据
    # # data = {
    # #     'code':0,
    # #     'data':data_a,
    # #     # 'test':t
    # # }
    # # else:
    # #     data = {'code':1}
    #
    # # 返回数据，包含每页中的数据行和分页信息
    # data = {
    #     'code': code,
    #     'data': data_a[row_start: row_end],
    #     'pages': {
    #         'page': page,
    #         'page_row_num': page_row_num,
    #         'page_total_num': page_total_num,
    #         'row_total_num': row_total_num
    #     }
    # }
    # list_obj_user = user.objects.all().order_by("user_id")
    if len(data_a) != 0:
        # 创建工作薄
        ws = xlwt.Workbook(encoding='utf-8')
        w = ws.add_sheet(u"用户信息")
        w.write(0, 0, "用户id")
        w.write(0, 1, u"用户账号")
        w.write(0, 2, u"用户名")
        w.write(0,3,u"性别")
        w.write(0, 4, u"出生年月")
        w.write(0, 5, u"国籍")
        w.write(0, 6, u"民族")
        w.write(0, 7, u"职务")
        w.write(0, 8, u"工作单位")
        w.write(0, 9, u"行业")
        w.write(0, 10, u"单位地址")
        w.write(0, 11, u"所在省")
        w.write(0, 12, u"所在市")
        w.write(0, 13, u"办公电话")
        w.write(0, 14, u"微信号")
        w.write(0, 15, u"QQ号")
        w.write(0, 16, u"手机号")
        w.write(0, 17, u"学历")
        w.write(0, 18, u"管理学院")
        w.write(0, 19, u"学籍学院")
        w.write(0, 20, u"专业")
        w.write(0, 21, u"入学年份")
        w.write(0, 22, u"毕业年份")
        w.write(0, 23, u"班级")
        # 写入数据
        excel_row = 1
        for obj_user in data_a:
            # list_obj_edu = user_edu.objects.filter(user_id = obj_user.user_id)
            # for obj_edu in list_obj_edu:
            print(obj_user)
            print(obj_user['user_id'])

            data_user_id = obj_user['user_id']
            data_user_account = obj_user['user_account']
            data_user_name = obj_user['user_name']
            data_user_gender = obj_user['user_gender']
            data_user_birthday = obj_user['user_birthday']
            # print(data_user_birthday)
            data_user_country = obj_user['country_name_cn']
            data_user_nation = obj_user['user_nation']
            # print(data_user_nation)
            data_user_post = obj_user['user_post']
            data_user_workunit = obj_user['user_workunit']
            data_user_industry = obj_user['industrial_name']
            data_user_workplace = obj_user['user_workplace']
            data_user_province = obj_user['user_province']
            data_user_city = obj_user['user_city']
            data_user_officephone = obj_user['user_officephone']
            data_user_wechat = obj_user['user_wechat']
            data_user_qq = obj_user['user_qq']

            data_user_cellphone = obj_user['user_cellphone']



            data_user_edu = obj_user['user_edu']
            data_collage_admin_name = obj_user['collage_admin_name']
            data_collage_edu_name = obj_user['collage_edu_name']
            data_specialty_name = obj_user['specialty_name']
            data_entrance_year = obj_user['entrance_year']
            data_grade_year = obj_user['grade_year']
            data_classes = obj_user['classes']




            w.write(excel_row, 0, data_user_id)
            w.write(excel_row, 1, data_user_account)
            w.write(excel_row, 2, data_user_name)
            w.write(excel_row, 3, data_user_gender)

            dateFormat = xlwt.XFStyle()
            dateFormat.num_format_str = 'yyyy-mm-dd'
            w.write(excel_row, 4, data_user_birthday,dateFormat)
            w.write(excel_row, 5, data_user_country)
            w.write(excel_row, 6, data_user_nation)
            w.write(excel_row, 7, data_user_post)
            w.write(excel_row, 8, data_user_workunit)
            w.write(excel_row, 9, data_user_industry)
            w.write(excel_row, 10, data_user_workplace)
            w.write(excel_row, 11, data_user_province)
            w.write(excel_row, 12, data_user_city)
            w.write(excel_row, 13, data_user_officephone)
            w.write(excel_row, 14, data_user_wechat)
            w.write(excel_row, 15, data_user_qq)
            w.write(excel_row, 16, data_user_cellphone)
            w.write(excel_row, 17, data_user_edu)
            w.write(excel_row, 18, data_collage_admin_name)
            w.write(excel_row, 19, data_collage_edu_name)

            w.write(excel_row, 20, data_specialty_name)
            w.write(excel_row, 21, data_entrance_year)
            w.write(excel_row, 22, data_grade_year)
            w.write(excel_row, 23, data_classes)

            excel_row += 1
        # 检测文件是够存在
        # 方框中代码是保存本地文件使用，如不需要请删除该代码
        ###########################
        # exist_file = os.path.exists("test2.xls")
        # if exist_file:
        #     os.remove(r"test2.xls")
        # ws.save("test2.xls")
        ############################
        # sio = StringIO
        # ws.save(sio)
        # sio.seek(0)
        # response = HttpResponse(sio.getvalue(), content_type='application/vnd.ms-excel')
        # response['Content-Disposition'] = 'attachment; filename=test.xls'
        # response.write(sio.getvalue())
        # return response
        # #########################################
        # with open('test2.xls') as f:
        #     c = f.read()
        #
        # the_file_name = "test2.xls"
        # response = HttpResponse(c)
        # response['Content-Type'] = 'application/vnd.ms-excel'
        # response['Content-Disposition'] = 'attachment;filename="{0}"'.format(the_file_name)
        # return response

        # 这里响应对象获得了一个特殊的mime类型,告诉浏览器这是个exell文件不是html
        # response = HttpResponse(content_type='application/vnd.ms-excel')

        seed = "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+=-"
        sa = []
        for i in range(20):
            sa.append(random.choice(seed))
        salt = ''.join(sa)

        static_path = 'oneapp/static/'
        file_name = 'export/' + salt + '.xls'
        file_name_finish = static_path + file_name
        # # 这里响应对象获得了附加的Content-Disposition协议头,它含有excel文件的名称,文件名随意,当浏览器访问它时,会以"另存为"对话框中使用它.
        # response['Content-Disposition'] = 'attachment; filename='+file_name
        # ws.save(response)
        # return response
        # exist_file = os.path.exists(file_name)
        # if exist_file:
        #     os.remove(file_name)
        ws.save(file_name_finish)
    data = {
                "code":0,
                "file_name":file_name
            }
    return JsonResponse(data)
'''
This is Jerry`s test page API

:param:
:returns:
:raises:

'''
def test(request):
    # 返回test.html页面
    return render_to_response('test.html')


def angular(request):
    return render_to_response('index.html')

'''
这是是否登录的判断接口，借用了tokenapi的@token_required，
每次验证都返回登录用户的个人信息和学籍信息

:param param1:
:returns:
:raises KeyError:

'''

# tokenapi的@token_required，用来判断user_pk和token是否合法
@token_required
def signedin(request):
    user = get_user_model()
    # 页面请求，取出'user'的值user_pk
    user_id = request.POST.get('user')
    # 获取指定pk的校友用户对象
    u = user.objects.get(pk = user_id)
    u_auth = user_author.objects.get(pk = u.author_id)
    # 获取指定校友的校友学籍对象，目前只是现一个学籍
    # u_edu = user_edu.objects.get(user = u)
    # 拼装数据
    data = {
        'author_id':u.author_id,
        'um_enable':u_auth.um_enable,
        'as_enable':u_auth.as_enable,
        'uim_enable':u_auth.uim_enable,
        'nuv_enable':u_auth.nuv_enable,
        'usim_enable':u_auth.usim_enable,
        'om_enable':u_auth.om_enable,
        'am_enable':u_auth.am_enable,
        'user_name':u.user_name,
        'user_gender':u.user_gender,
        'user_birthday':u.user_birthday,
        'user_nation':u.user_nation,
        'user_cellphone':u.user_cellphone,
        'user_qq':u.user_qq,
        'user_wechat':u.user_wechat,
        'user_workunit': u.user_workunit,
        'user_post': u.user_post,
        'user_province':u.user_province,
        'user_city':u.user_city,
        'user_officephone':u.user_officephone,
        # 'user_edu':u_edu.user_edu,
        # 'entrance_year':u_edu.entrance_year,
        # 'collage_edu_name':u_edu.collage_edu_name,
        # 'specialty_name_cn':u_edu.specialty.specialty_name_cn
    }
    # 返回json对象
    return JsonResponse(data)

'''
根据id获取校友用户的个人信息和学籍信息

:param param1:
:returns:
:raises KeyError:

'''
@token_required
def get_alumnus_by_id(request):
    # 页面访问，获取user_pk
    user_id = request.POST.get('user')
    id = request.POST.get('id')
    print(id)
    # 获取指定pk的校友用户对象,并取指定的值
    user_info = user.objects.filter(
        pk=id
    ).values(
        'user_id',
        'user_name',
        'user_gender',
        'user_nation',
        'user_birthday',
        'user_province',
        'country_name_cn',
        'country_id',
        'province_id',
        'user_city',
        'city_id',
        'user_cellphone',
        'user_workunit',
        'user_officephone',
        'province_id',
        'user_qq',
        'user_wechat',
        'user_email' ,
        # 冗余字段有这项，但是没有同步，有待解决
        'industrial_name',
        'industrial_id',
        'user_post' ,
        'user_workplace'
        )
    # 获取指定pk校友学籍对象，并取指定的值
    user_education_p = user_edu.objects.filter(
        user_id= id
    ).values(
        'edu_id',
        'user_edu',
        'user_id',
        'collage_admin_id',
        'collage_admin_name',
        'collage_edu_id',
        'collage_edu_name',
        'specialty_id',
        'specialty__specialty_name_cn',
        'entrance_year',
        'grade_year',
        'classes'
    )
    user_education = []
    for i in user_education_p:
        i['specialty_name'] = i['specialty__specialty_name_cn']
        i.pop('specialty__specialty_name_cn')
        user_education.append(i)
    # 拼装数据，校友信息和学籍信息
    data = {
        "user_info": list(user_info)[0],
        "user_education": list(user_education)
    }
    # 拼装有状态码的数据
    da = {
        "code": 0,
        "data": data
    }
    # 返回json对象
    return JsonResponse(da)

'''
获取省列表

:param param1:
:returns:
:raises KeyError:

'''
# @token_required
def get_province(request):
    # 获取所有省的对象，取指定值
    d = D_province.objects.values(
        'province_name',
        # 这里取的是省的国家id，不是pk
        'n_province_id'
    )
    # 拼装数据
    data = {
        # 状态码为0表示成功
        'code':0,
        # 前面取的d是一个QuerySet，需要通过list()将其变为数组对象
        'data':list(d)
    }
    # 返回json对象
    return JsonResponse(data)

'''
获取国家列表

:param param1:
:returns:
:raises KeyError:

'''
# @token_required
def get_country(request):
    # 获取所有国家对象，取指定值
    d = D_country.objects.values(
        'country_name_cn',
        # 这里取的是国家id
        'country_id'
    )
    # 拼装数据
    data = {
        # 状态码为0表示成功
        'code':0,
        # 前面取的d是一个QuerySet，需要通过list()将其变为数组对象
        'data':list(d)
    }
    # 返回json对象
    return JsonResponse(data)
'''
根据省的国家id获取该省的市列表

:param param1:
:returns:
:raises KeyError:

'''
# @token_required
def get_city(request):
    # 页面访问，获取省id
    n_province_id = request.POST.get('n_province_id')
    # 根据省id查询该省所属是所有市的对象，并取指定的值
    d = D_city.objects.filter(
        n_province_id = n_province_id
    ).values(
        'city_name',
        #市id，这个是pk
        'city_id'
    )
    # 拼装数据
    data = {
        'code':0,
        # 前面取的d是一个QuerySet，需要通过list()将其变为数组对象
        'data':list(d)
    }
    # 返回json对象
    return JsonResponse(data)

'''
获取顶级行业表（国家标注的）

:param param1:
:returns:
:raises KeyError:

'''
# @token_required
def get_industrial(request):
    # 按条件获取行业对象，取指定值
    d = D_industrial.objects.filter(
        # 条件1：父级代码为空
        father_code__isnull= True ,
        # 条件2：祖父机代码也为空
        grand_code__isnull=True
    ).values(
        'industrial_name',
        'industrial_id'
    )
    # 拼装数据
    data = {
        'code':0,
        # 前面取的d是一个QuerySet，需要通过list()将其变为数组对象
        'data':list(d)
    }
    # 返回json对象
    return JsonResponse(data)


'''
获取校友组织

:param param1:
:returns:
:raises KeyError:

'''
# 获取校友组织要进行token验证
@token_required
def get_all_organization(request):
    # 获取所有的校友组织对象，并取指定的值
    o = organization.objects.values(
        'org_id',
        'org_name',
        'org_province',
        'org_city',
        'org_found_time',
        'org_member_num',
        'org_contact_info',
        'user_admin_name'
    )
    # 拼装数据
    data = {
        'code':0,
        # 前面取的o是一个QuerySet，需要通过list()将其变为数组对象
        'data':list(o)
    }
    # 返回json对象
    return JsonResponse(data)
@token_required
def get_alumnus_by_name(request):
    name = request.POST.get('user_name')
    data_a = []
    us = get_user_model().objects.filter(
        user_name__contains = name
    ).values(
        'user_id',
        'user_name',
        'user_gender',
        'user_nation',
        'user_birthday',
        'user_city',
        'user_cellphone'
    )
    #us    <QuerySet [{*********},{*********}]>
    #if list(us) ==[]:
    for u in us:
        #  u    {********}
        ues = user_edu.objects.filter(
            user_id = u['user_id']).values(
            'edu_id','entrance_year',
            'grade_year',
            'collage_edu_name',
            'collage_admin_name',
            'specialty__specialty_name_cn',
            'oneapp_user_eduuser_edu'
        )
        # ues    <QuerySet [{*********},{*********}]>
        for ue in ues:
            #  ue    {********}
            u_e_d = {}
            u_e_d.update(u)
            u_e_d.update(ue)
            data_a.append(u_e_d)
    data = {
        'code':0,
        'data':data_a
    }
    # else:
    #     data = {'code':1}
    return JsonResponse(data)

@token_required
def get_alumnus_by_terms(request):
    code = 0
    t = request.POST  #字符串
    # print(t)

    pages = json.loads(t['pages'])




    terms = json.loads(t['terms'])
    print(terms)
    # print(term)
    # terms =    [
    #                 {
    #                 'user_name':'',
    #                 'user_age':'',
    #                 'user_province':'北京'
    #                 },
    #                 {
    #                 'specialty_name':'计算机科学与技术系',
    #                 'entrance_year1':2000,
    #                 'entrance_year2':'',
    #                 'collage_admin_name':'',
    #                 'user_edu':''
    #                 }
    #             ]

    # 校友基本信息的查询条件
    terms_user = terms['user_info']
    # 校友学籍信息的查询条件
    terms_edu = terms['user_education']
    q1 = Q()
    q2 = Q()
    q2_1 = Q()
    q2_2 = Q()
    for i in terms_user:
        # 去掉条件两端的空格
        if isinstance(terms_user[i],str):

            terms_user[i] = terms_user[i].strip(' ')
        if terms_user[i] != '' and terms_user[i] != None:
            if i == 'user_age':

                # ==========字符串替换===============================
                # str.replace(old, new[, max])
                # 参数
                # old - - 这是要进行更换的旧子串。
                # new - - 这是新的子串，将取代旧的子字符串。
                # max - - 如果这个可选参数max值给出，仅第一计数出现被替换。

                # ==========判断是字符串还是数字=======================
                # isinstance(1,int)
                # isinstance(asd,str)

                if isinstance(terms_user[i],str):
                    terms_user[i] = int(terms_user[i])
                today = datetime.date.today()
                age = terms_user['user_age']
                birth_1 = today - relativedelta(years=age)
                birth_2 = today - relativedelta(years=age + 1)
                q1.add(~Q(user_birthday__gt = birth_1),q1.AND)
                q1.add(Q(user_birthday__gt=birth_2), q1.AND)
            elif i == 'user_name':
                q1.add(Q(user_name__contains=terms_user['user_name']), q1.AND)
            elif i == 'industry':
                q1.add(Q(industrial__industrial_name=terms_user['industry']), q1.AND)
            else:
                q1.add(Q(**{i: terms_user[i]}), q1.AND)
        elif i=='author_id':
            q1.add(~Q(author_id=3),q1.AND)
    # 去掉查询条件两端的空格
    for i in terms_edu:
        terms_edu[i] = terms_edu[i].strip(' ')
    if terms_edu['collage_admin_name'] != '':
        q2_1.add(
            Q(collage_admin_name = terms_edu['collage_admin_name']),
            q2_1.AND
        )
    if terms_edu['collage_edu_name'] != '':
        q2_1.add(
            Q(collage_edu_name = terms_edu['collage_edu_name']),
            q2_1.AND
        )
    if terms_edu['specialty_name_cn'] != '':
        q2_1.add(
            Q(specialty__specialty_name_cn = terms_edu['specialty_name_cn']),
            q2_1.AND
        )
    if terms_edu['entrance_year1'] != '' and terms_edu['entrance_year1'] != None:
        q2_1.add(
            ~Q(entrance_year__lt = terms_edu['entrance_year1']),
            q2_1.AND
        )
    if terms_edu['entrance_year2'] != '' and terms_edu['entrance_year2'] != None:
        q2_1.add(
            ~Q(entrance_year__gt = terms_edu['entrance_year2']),
            q2_1.AND
        )
    if terms_edu['user_edu_1'] != '':
        q2_2.add(
            Q(user_edu = terms_edu['user_edu_1']),
            q2_2.OR
        )
    if terms_edu['user_edu_2'] != '':
        q2_2.add(
            Q(user_edu = terms_edu['user_edu_2']),
            q2_2.OR
        )
    if terms_edu['user_edu_3'] != '':
        q2_2.add(
            Q(user_edu = terms_edu['user_edu_3']),
            q2_2.OR
        )
    if terms_edu['user_edu_4'] != '':
        q2_2.add(
            Q(user_edu = terms_edu['user_edu_4']),
            q2_2.OR
        )
    q2.add(q2_1,q2.AND)
    q2.add(q2_2,q2.AND)
    print(q1,q2)
    data_a = []
    us = get_user_model().objects.filter(q1).values(
        'user_id',
        'user_name',
        'user_gender',
        'user_nation',
        'user_birthday',
        'user_province',
        'user_city',
        'user_cellphone',
        'user_workunit',
        'user_officephone',
        'user_qq',
        'user_wechat',
        'user_post',
        'industrial_name'
    )
    #us    <QuerySet [{*********},{*********}]>
    #if list(us) ==[]:
    for u in us:
        #  u    {********}
        ues = user_edu.objects.filter(
            user_id = u['user_id']
        ).filter(q2).values(
            'edu_id',
            'entrance_year',
            'grade_year',
            'collage_edu_name',
            'collage_admin_name',
            'specialty__specialty_name_cn',
            'user_edu'
        )
        # ues    <QuerySet [{*********},{*********}]>
        if list(ues) == []:
            # data_a.append(u)
            pass
        else:
            for ue in ues:
                #  ue    {********}
                ue['specialty_name'] = ue['specialty__specialty_name_cn']
                ue.pop('specialty__specialty_name_cn')
                u_e_d = {}
                u_e_d.update(u)
                u_e_d.update(ue)
                data_a.append(u_e_d)

        # user_education = []
        # for i in user_education_p:
        #     i['specialty_name'] = i['specialty__specialty_name_cn']
        #     i.pop('specialty__specialty_name_cn')
        #     user_education.append(i)

    # page, 当前请求的页码
    page = pages['page']
    # page_row_num,当前请求的页内行数
    page_row_num = pages['page_row_num']
    # 总行数
    row_total_num = len(data_a)
    # 总页数，通过总行数计算
    page_total_num = math.ceil(row_total_num / page_row_num)

    # 如果输入的页数有误，则设置code=1, 并强制返回第一页
    if page > page_total_num or page < 0:
        if row_total_num == 0:
            page = 1
        else:
            print("page输出数据有误，超过了指定范围", "page_total_num =", page_total_num, "page=", page)
            # code = 1
            # page = 1
            page = page_total_num
    # 当前页起始下标
    row_start = page_row_num * (page - 1)
    if row_start < 0:
        row_start = 0;
    # 当前页结束下标
    row_end = page_row_num * page
    if row_end > row_total_num:
        row_end = row_total_num;
    print('row_start', row_start)
    print('row_end', row_end)

    # 没加分页的最终数据
    # data = {
    #     'code':0,
    #     'data':data_a,
    #     # 'test':t
    # }
    # else:
    #     data = {'code':1}

    # 返回数据，包含每页中的数据行和分页信息
    data = {
        'code': code,
        'data': data_a[row_start: row_end],
        'pages': {
            'page': page,
            'page_row_num': page_row_num,
            'page_total_num': page_total_num,
            'row_total_num': row_total_num
        }
    }
    return JsonResponse(data)

@token_required
def get_alumnus_by_terms_t(request):
    t = request.POST  #字符串
    print(t)
    terms = json.loads(t['terms'])
    print(terms)


    # print(term)
    # terms =    [
    #                 {
    #                 'user_name':'',
    #                 'user_age':'',
    #                 'user_province':'北京'
    #                 },
    #                 {
    #                 'specialty_name':'计算机科学与技术系',
    #                 'entrance_year1':2000,
    #                 'entrance_year2':'',
    #                 'collage_admin_name':'',
    #                 'user_edu':''
    #                 }
    #             ]
    # terms_user = terms[0]
    # terms_edu = terms[1]
    # q1 = Q()
    # q2 = Q()
    # q2_1 = Q()
    # q2_2 = Q()
    # for i in terms_user:
    #     if terms_user[i] != '' and terms_user[i] != None:
    #         if i == 'user_age':
    #             today = datetime.date.today()
    #             age = terms_user['user_age']
    #             birth_1 = today - relativedelta(years=age)
    #             birth_2 = today - relativedelta(years=age + 1)
    #             q1.add(~Q(user_birthday__gt = birth_1),q1.AND)
    #             q1.add(Q(user_birthday__gt=birth_2), q1.AND)
    #         else:
    #             q1.add(Q(**{i: terms_user[i]}), q1.AND)
    #
    # if terms_edu['collage_admin_name'] != '':
    #     q2_1.add(Q(collage_admin_name = terms_edu['collage_admin_name']), q2_1.AND)
    # if terms_edu['specialty_name_cn'] != '':
    #     q2_1.add(Q(specialty__specialty_name_cn = terms_edu['specialty_name_cn']), q2_1.AND)
    # if terms_edu['entrance_year1'] != '' and terms_edu['entrance_year1'] != None:
    #     q2_1.add(~Q(entrance_year__lt = terms_edu['entrance_year1']), q2_1.AND)
    # if terms_edu['entrance_year2'] != '' and terms_edu['entrance_year2'] != None:
    #     q2_1.add(~Q(entrance_year__gt = terms_edu['entrance_year2']), q2_1.AND)
    # if terms_edu['user_edu_1'] != '':
    #     q2_2.add(Q(user_edu = terms_edu['user_edu_1']), q2_1.OR)
    # if terms_edu['user_edu_2'] != '':
    #     q2_2.add(Q(user_edu = terms_edu['user_edu_2']), q2_1.OR)
    # if terms_edu['user_edu_3'] != '':
    #     q2_2.add(Q(user_edu = terms_edu['user_edu_3']), q2_1.OR)
    # if terms_edu['user_edu_4'] != '':
    #     q2_2.add(Q(user_edu = terms_edu['user_edu_4']), q2_1.OR)
    # q2.add(q2_1,q2.AND)
    # q2.add(q2_2,q2.AND)
    # print(q1)
    # data_a = []
    # us = get_user_model().objects.filter(q1).values('user_id','user_name','user_gender','user_nation','user_birthday','user_province','user_city','user_cellphone','user_workunit','user_officephone','user_qq','user_wechat')
    # #us    <QuerySet [{*********},{*********}]>
    # #if list(us) ==[]:
    # for u in us:
    #     #  u    {********}
    #     ues = user_edu.objects.filter(user_id = u['user_id']).filter(q2).values('edu_id','entrance_year','grade_year','collage_edu_name','collage_admin_name','specialty__specialty_name_cn','user_edu')
    #     # ues    <QuerySet [{*********},{*********}]>
    #     for ue in ues:
    #         #  ue    {********}
    #         u_e_d = {}
    #         u_e_d.update(u)
    #         u_e_d.update(ue)
    #         data_a.append(u_e_d)
    # data = {'code':0,'data':data_a,'test':t}
    # else:
    #     data = {'code':1}
    return JsonResponse(t)

'''
根据id更新校友的基本信息和校友的学籍信息

:param param1:
:returns:
:raises KeyError:

'''
@token_required
def update_alumnus_by_id(request):
    code = 0
    message = "数据更新成功！"
    # 页面访问
    da = request.POST  #字符串
    print(da)
    # 将字符串反序列化为dict
    da_alu = json.loads(da['alumnus_data'])
    print(da_alu)
    # 分别取出校友基本信息和学籍信息（dict）
    user_info = da_alu['user_info']
    user_educations = da_alu['user_education']
    print(user_info)
    # 按照省的名字，获得省对象，这部分没有数据合法性判断机制，有待完善
    if user_info['user_province'] != '' :
        user_province = D_province.objects.get(province_name = user_info['user_province'])
    else:
        # 如果是空字符串''，给user_province赋值None
        user_province = None
    if user_info['user_city'] != '':
        user_city = D_city.objects.get(city_name = user_info['user_city'])
    else:
        user_city = None
    if user_info['industrial_name'] != '':
        user_industrial = D_industrial.objects.get(father_code= None,industrial_name = user_info['industrial_name'] )
    else:
        user_industrial = None
    if user_info['user_birthday'] != '':
        user_birthday = user_info['user_birthday']
    else:
        user_birthday = None

    # 根据id更新指定校友的基本信息
    user.objects.filter(pk = da['alumnus_id']).update(
        user_name=user_info['user_name'],
        user_gender=user_info['user_gender'],
        user_birthday=user_birthday,
        user_nation=user_info['user_nation'],

        user_cellphone= user_info['user_cellphone'],
        user_qq=user_info['user_qq'],
        user_wechat= user_info['user_wechat'],
        user_email= user_info['user_email'],

        industrial=user_industrial,
        user_officephone=user_info['user_officephone'],
        user_workplace=user_info['user_workplace'],

        user_workunit=user_info['user_workunit'],
        user_post=user_info['user_post'],
        province=user_province,
        city=user_city,
    )
    # alu = user.objects.get(pk=da['alumnus_id'])
    # print(alu)
    # alu.province = user_province
    # alu.city = user_city
    # alu.industrial = user_industrial
    # alu.save()


    # 删除学籍信息
    f_edu_da = []
    b_edu_da = []
    for user_education in user_educations:
        # 前端传来的指定校友的所有学籍的edu_id
        f_edu_da.append(user_education['edu_id'])
    user_educations_b = user_edu.objects.filter(user_id = user_info['user_id']).values()
    for user_education_b in user_educations_b:
        # 后端的指定校友的所有学籍的edu_id
        b_edu_da.append(user_education_b['edu_id'])
    for i in b_edu_da:
        # 如果指定校友的某学籍id不在前端传来的学籍id中，则删除该条学籍
        if i not in f_edu_da:
            user_edu.objects.filter(pk = i).delete()
            # 更新b_edu_da
            b_edu_da.remove(i)


    # 根据id更新指定校友的学籍信息，目前只能更新第一个学籍，要跟新多个学籍的话，考虑在
    # 没组学籍信息中加入学籍pk
    for user_education in user_educations:
        if user_education['collage_admin_name'] != '':
            user_collage_admin = collage.objects.get(collage_name_cn=user_education['collage_admin_name'])
        else:
            user_collage_admin = None
        if user_education['collage_edu_name'] != '':
            user_collage_edu = collage.objects.get(collage_name_cn=user_education['collage_edu_name'])
        else:
            user_collage_edu = None
        if user_education['specialty_name_cn'] != '':
            user_specialty = specialty.objects.get(specialty_name_cn=user_education['specialty_name_cn'])
        else:
            user_specialty = None

        if user_education['entrance_year'] != '':
            user_entrance_year = user_education['entrance_year']
        else:
            user_entrance_year = None
        if user_education['grade_year'] != '':
            user_grade_year = user_education['grade_year']
        else:
            user_grade_year = None

        if user_education['edu_id'] == '':
            user_edu.objects.create(
                user_edu = user_education['user_edu'],
                # collage_admin是外键，这里赋值的是学院对象
                collage_admin = user_collage_admin,
                # collage_admin_name是字符串，直接通过输入来赋值
                collage_admin_name = user_education['collage_admin_name'],
                collage_edu = user_collage_edu,
                collage_edu_name = user_education['collage_edu_name'],
                specialty = user_specialty,
                entrance_year = user_entrance_year,
                grade_year = user_grade_year,
                classes = user_education['classes'],
                user_id = user_info['user_id']
            )
        elif user_education['edu_id'] in b_edu_da:
            user_edu.objects.filter(pk = user_education['edu_id']).update(
                user_edu = user_education['user_edu'],
                # collage_admin是外键，这里赋值的是学院对象
                collage_admin = user_collage_admin,
                # collage_admin_name是字符串，直接通过输入来赋值
                collage_admin_name = user_education['collage_admin_name'],
                collage_edu = user_collage_edu,
                collage_edu_name = user_education['collage_edu_name'],
                specialty = user_specialty,
                entrance_year = user_entrance_year,
                grade_year = user_grade_year,
                classes = user_education['classes']
            )
        else:
            code = 1
            message = "校友与学籍对应有误！"

    da = {
        "code":code,
        "message":message
    }
    # 返回json对象
    return JsonResponse(da)
# @token_required
def get_collage(request):
    d = collage.objects.values(
        'collage_name_cn',
        'collage_id'
    )
    data = {
        'code':0,
        'data':list(d)
    }
    return JsonResponse(data)

# @token_required
def get_specialty(request):
    collage_id = request.POST.get('collage_id')
    c = collage.objects.get(collage_id = collage_id)
    s = c.specialty.values(
        'specialty_name_cn',
        'specialty_id'
    )
    data = {
        'code':0,
        'data':list(s)
    }
    return JsonResponse(data)

@token_required
def get_allschoolmates(request):
    terms = request.POST  # 字符串
    print(terms)
    als = user.objects.values(
        'user_name',
        'user_gender',
        'user_nation',
        'user_birthday',
        'user_city',
        'user_cellphone',
        'user_edu__grade_year',
        'user_edu__collage_edu_name'
    )

    data = {
        'code': 0,
        'data': list(als)[1: 20],
    }
    return JsonResponse(data)
'''
获取所有校友信息，作为测试，有分页的例子

:param param1:
:returns:
:raises KeyError:

'''
@token_required
def get_alumnus_all(request):
    #返回状态码，0为成功，1为分页信息输入有误
    print(request.POST)
    code = 0
    #页面请求
    pages = json.loads(request.POST.get('pages'))
    #page, 当前请求的页码
    page = pages['page']
    #page_row_num,当前请求的页内行数
    page_row_num = pages['page_row_num']
    #总行数
    row_total_num = user.objects.count()
    #总页数，通过总行数计算
    page_total_num =math.ceil(row_total_num / page_row_num )
    #如果输入的页数有误，则设置code=1, 并强制返回第一页
    if page > page_total_num or page < 0:
        print("page输出数据有误，超过了指定范围")
        code = 1
        page = 1
    #当前页起始下标
    row_start = page_row_num * (page - 1)
    if row_start < 0:
        row_start = 0;
    #当前页结束下标
    row_end = page_row_num * page
    if row_end > row_total_num:
        row_end = row_total_num;
    print('row_start', row_start)
    print('row_end', row_end)

    als = user.objects.values(
        'user_id',
        'user_name',
        'user_gender',
        'user_nation',
        'user_birthday',
        'user_city',
        'user_cellphone',
        'user_edu__grade_year',
        'user_edu__collage_edu_name'
    )
    #返回数据，包含每页中的数据行和分页信息
    data = {
        'code': code,
        'data': list(als)[row_start: row_end],
        'pages': {
            'page': page,
            'page_row_num': page_row_num,
            'page_total_num': page_total_num,
            'row_total_num': row_total_num
        }
    }
    return JsonResponse(data)

'''
根据id删除校友基本信息和学籍信息（可多条删除）

:param param1:
:returns:
:raises KeyError:

'''
@token_required
def delete_alumnus_by_id(request):
    code = 0
    message = '删除成功！'
    alumnus_ids = json.loads(request.POST.get('alumnus_ids'))
    print(alumnus_ids)
    for alumnus_id in alumnus_ids:
        user.objects.filter(pk = alumnus_id).delete()
        user_edu.objects.filter(user_id = alumnus_id).delete()
    data = {
        'code':code,
        'message':message
    }
    return JsonResponse(data)

@token_required
def get_schoolmates_edu(request):
    sed = user_edu.objects.values(
        'user_edu',
        'user__user_name',
        'entrance_year',
        'grade_year',
        'collage_admin_name',
        'collage_edu_name',
        'specialty__specialty_name_cn'
    )
    # da = {
    #     'total': 100,  # 总共的条数，
    #     'start_item': 21,  # 当前页开始显示的条数编号，
    #     'end_item': 30,  # 当前页显示的最后一条编号，
    #     'data': [
    #         {
    #             'user_name': '左占平',    #//校友姓名，
    #             'user_edu': '本科',#学历
    #             'entrance_year': '1997',#入学年级，
    #             'grade_year': '2001',#毕业年级，
    #             'collage_edu_name': '计算机与通信学院',#管理学院，
    #             'specialty_name_cn': '计算机科学与技术',#专业，
    #             'collage_edu_name': '通信学院',#学籍学院
    #         },
    #         {
    #             'user_name': '李晓伟',  # //校友姓名，
    #             'user_edu': '本科',  # 学历
    #             'entrance_year': '2006',  # 入学年级，
    #             'grade_year': '2010',  # 毕业年级，
    #             'collage_edu_name': '机电工程学院',  # 管理学院，
    #             'specialty_name_cn': '机电控制及自动化',  # 专业，
    #             'collage_edu_name': '机电工程学院',  # 学籍学院
    #         },
    #         {
    #             'user_name': '梁根深',  # //校友姓名，
    #             'user_edu': '本科',  # 学历
    #             'entrance_year': '2009',  # 入学年级，
    #             'grade_year': '2013',  # 毕业年级，
    #             'collage_edu_name': '材料科学与工程学院',  # 管理学院，
    #             'specialty_name_cn': '无机非金属材料与工程',  # 专业，
    #             'collage_edu_name': '材料学院',  # 学籍学院
    #         },
    #     ],
    # }
    data = {'code':0,'data':list(sed)}
    return JsonResponse(data)
@token_required
def get_work_info(request):
    wi = get_user_model().objects.values(
        'user_name',
        'user_workplace',
        'user_province',
        'user_city',
        'user_officephone',
        'user_cellphone',
        'user_wechat',
        'user_qq'
    )
    # da={
    #     'total': 100,  # 总共的条数，
    #     'start_item': 1,  # 当前页开始显示的条数编号，
    #     'end_item': 3,  # 当前页显示的最后一条编号，
    #     'data':[
    #         {
    #             'user_name': '左占平',  # 校友姓名，
    #             'user_workplace': '兰州理工大学',  # 工作单位，
    #             'user_province': '甘肃省',  # 所在省，
    #             'user_city': '兰州市',  # 所在市
    #             'user_officephone': '0931-7723567',  # 办公电话，
    #             'user_cellphone': '13587980145',  # 手机，
    #             'user_wechat': 'zuozhangping123',   #微信号，
    #             'user_qq': '198239293',     # qq号
    #         },
    #         {
    #             'user_name': '李晓伟',  # 校友姓名，
    #             'user_workplace': '兰州理工大学',  # 工作单位，
    #             'user_province': '甘肃省',  # 所在省，
    #             'user_city': '兰州市',  # 所在市
    #             'user_officephone': '0931-7723567',  # 办公电话，
    #             'user_cellphone': '13587980145',  # 手机，
    #             'user_wechat': 'lixiaowei123',  # 微信号，
    #             'user_qq': '19823234',  # qq号
    #         },
    #         {
    #             'user_name': '梁根深',  # 校友姓名，
    #             'user_workplace': '兰州理工大学',  # 工作单位，
    #             'user_province': '甘肃省',  # 所在省，
    #             'user_city': '兰州市',  # 所在市
    #             'user_officephone': '0931-7723567',  # 办公电话，
    #             'user_cellphone': '13587980145',  # 手机，
    #             'user_wechat': 'lianggensheng123',  # 微信号，
    #             'user_qq': '19898483',  # qq号
    #         },
    #     ],
    # }
    data = {'code':0,'data':list(wi)}
    return JsonResponse(data)
@token_required
def get_history_info(request):
    da = {
        'total': 100,  # 总共的条数，
        'start_item': 1,  # 当前页开始显示的条数编号，
        'end_item': 3,  # 当前页显示的最后一条编号，
        'data': [
            {
                'update_time': '2017-2-7', #更新日期
                'user_name': '左占平',  # 校友姓名，
                'user_workplace': '兰州理工大学',  # 工作单位，
                'user_province': '甘肃省',  # 所在省，
                'user_city': '兰州市',  # 所在市
                'user_officephone': '0931-7723567',  # 办公电话，
                'user_cellphone': '13587980145',  # 手机，
                'user_wechat': 'zuozhangping123',  # 微信号，
            },
            {
                'update_time': '2017-4-7',  # 更新日期
                'user_name': '李明',  # 校友姓名，
                'user_workplace': '兰州理工大学',  # 工作单位，
                'user_province': '甘肃省',  # 所在省，
                'user_city': '兰州市',  # 所在市
                'user_officephone': '0931-7755632',  # 办公电话，
                'user_cellphone': '13588345672',  # 手机，
                'user_wechat': 'liming123',  # 微信号，
            }
    ]}

    return JsonResponse(da)




def get_school_info(request):
    da ={
          'data':[
            {
                'school_name': '兰州理工大学'         #兰州理工大学
            },
         ] ,
    }
    return JsonResponse(da)








# def get_alumnus_all(request):

    als = user.objects.values('user_name','user_gender','user_nation','user_birthday','user_city','user_cellphone','user_edu__grade_year','user_edu__collage_edu_name')
    page = 1,     # 当前页
    pagesize = 20,          # 每页显示的数量
    totalnum = als          # 总记录数量
    totalpage = totalnum / pagesize,           # 总页数

    data = {'code': 0,
            'data': list(als)[page: pagesize],
            }

    # da={
    #     'total': 100,     #总共的条数，
    #     'start_item': 21,   #当前页开始显示的条数编号，
    #     'end_item': 30,    #当前页显示的最后一条编号，
    #     'data': [
    #                 {
    #                     'user_name':'左占平',     #校友姓名，
    #                     'user_gender':'男',       #性别，
    #                     'user_nation':'汉族',       #民族，
    #                     'user_birthday':'1980-09-08',#出生年月
    #                     'grade_year':'2001',       #毕业年级，
    #                     'collage_edu_name':'计算机与通信学院',#学籍学院，
    #                     'user_edu':'本科学历',    #学历，
    #                     'user_city':'兰州市',     #所在地，
    #                     'user_cellphone':'13587980145',   #手机，
    #                 },
    #                 {
    #                     'user_name': '李晓伟',  # 校友姓名，
    #                     'user_gender': '男',  # 性别，
    #                     'user_nation': '汉族',  # 民族，
    #                     'user_birth
    #
    # day': '1987-08-27',  # 出生年月
    #                     'grade_year': '2010',  # 毕业年级，
    #                     'collage_edu_name': '机电工程学院',  # 学籍学院，
    #                     'user_edu': '本科学历',  # 学历，
    #                     'user_city': '兰州市',  # 所在地，
    #                     'user_cellphone': '13923438790',  # 手机，
    #                 },
    #                 {
    #                     'user_name': '梁根深',  # 校友姓名，
    #                     'user_gender': '男',  # 性别，
    #                     'user_nation': '汉族',  # 民族，
    #                     'user_birthday': '1987-08-27',  # 出生年月
    #                     'grade_year': '2009',  # 毕业年级，
    #                     'collage_edu_name': '材料科学与工程学院',  # 学籍学院，
    #                     'user_edu': '本科学历',  # 学历，
    #                     'user_city': '兰州市',  # 所在地，
    #                     'user_cellphone': '13511001794',  # 手机，
    #                 },
    #              ],
    #     }
    return JsonResponse(data)

"""修改学院中文名字，并进行保存，需要修改两个表中的学院名字含有学院名字的字段，分别是collage表；user_edu表，
在collage表中我进行通过对字段ID的查询修改了字段名字，在user_end表中使用查询字段的名字直接修改两个字段"""
@token_required
def update_college_name_by_id(request):
    code=0
    message="数据更新成功"
    collage_id = request.POST.get('collage_id')
    collage_name= request.POST.get('collage_name_cn')
    collage.objects.filter(collage_id=collage_id).update(
        collage_name_cn=collage_name)

    user_edu.objects.filter(collage_admin_id=collage_id).update(
        collage_admin_name=collage_name)

    user_edu.objects.filter(collage_edu_id=collage_id).update(
        collage_edu_name=collage_name)

    data = {
        "code": code,
        "message": message
    }
    return JsonResponse(data, safe=False)

"""添加专业"""
@token_required
def add_specialty(request):
    code=0
    message="添加成功"
    collage_id = request.POST.get('collage_id')
    # print("collage_id==",collage_id)
    collage_name = request.POST.get('collage_name_cn')
    # print("collage_name_cn==",collage_name)
    specialty_name=request.POST.get('specialty_name_cn')
    specialty.objects.create(specialty_name_cn=specialty_name,collage_id=collage_id)
    data={
        "code":code,
        'message':message
    }
    return JsonResponse(data, safe=False)
"""修改学院专业的名字，在表specialty中修改specialty_name_cn"""
@token_required
def update_specialty_name_by_id(request):
    code = 0
    message = "数据更新成功"
    specialty_id=request.POST.get('specialty_id')
    specialty_name = request.POST.get('specialty_name_cn')
    specialty.objects.filter(specialty_id=specialty_id).update(
        specialty_name_cn=specialty_name)
    specialty.objects.filter(specialty_desc=specialty_name).update(
        specialty_desc=specialty_name
    )
    data = {
        "code": code,

        "message": message
    }
    return JsonResponse(data, safe=False)

"""****添加学院"""
"""同步添加两个数据表中的三个字段，分别是collage中的字段collage_name_cn"""
"""****和user_edu表中的字段collage_admin_name以及collage_edu_name"""
@token_required
def add_message(request):
    code=0
    message = "添加成功"
    collage_name=request.POST.get('collage_name_cn')
    collage.objects.create(collage_name_cn=collage_name)
    user_edu.objects.create(collage_admin_name=collage_name,collage_edu_name=collage_name)
    data = {
        "code": code,
        'message': message
    }
    return JsonResponse(data, safe=False)
"""******用户权限管理，分派，根据用户组所属的组判断，分派用户的权限，
****防止不同用户拥有超出自己管理范围的权限
*****"""

"""张迪改过下面这个接口"""
@token_required
def get_authgroup_all(request):
    code = 0
    d = user_author.objects.values()

    data = {
        'code': code,
        'data': list(d),
    }
    # 返回json对象
    return JsonResponse(data)


'''
修改多个用户所属的权限组

:param param1:
:returns:code返回0表示密码修改成功
:raises KeyError:

'''
# @token_required
def update_alumnus_authgroup_by_ids(request):
    # user_id = request.POST.get("user")
    alumnus_ids = json.loads(request.POST.get('alumnus_ids'))
    author_id = request.POST.get('author_id')
    # new_password = request.POST.get("newpassword")
    print(alumnus_ids)
    for alumnus_id in alumnus_ids:
        u = user.objects.get(pk=alumnus_id)
        u.author_id=author_id
        u.save()
    data = {
        "code":0,
        "messsage":"更新成功！"
    }
    return JsonResponse(data)









