define([
    'app'
], function (app) {

    app.controller('schoolCtrl', [
        '$scope',
        'dictionaryService',
        '$timeout',
        'logger',
        function ($scope,
                  dictionaryService,
                  $timeout,
                  logger) {
            //获取学校信息
            //$scope.university = [];
            //dictionaryService.getuniversity().then(function (university) {
            //$scope.university = university;
            //_.forEach($scope.university, function (c) {
            //	_.extend(c, {"Collages": [], "show": false})
            //})
            //console.log($scope.university);
            //});

            //获取学院信息
            $scope.collages = [];
            function getCollage(){
                dictionaryService.getCollageArray().then(function (collages) {
                    $scope.collages = collages;
                    _.forEach($scope.collages, function (c) {
                        _.extend(c, {"specialties": [], "add_specialty_show": false})
                    })
                    console.log($scope.collages);
                });
            }
            getCollage();


            /**
             * 显示或关闭显示 专业
             * @param c
             */

            $scope.showSpecialty = function (c) {
                if(c.specialties.length  == 0 ){
                    dictionaryService.getSpecialtyArrayByCid(c.collage_id).then(function (specialties) {
                        c.specialties = specialties;
                    });

                }else{
                    c.specialties.splice(0, c.specialties.length);
                }
            }

            getCollage();


            /**
             * 显示学校修改面板
             * @param c
             */
            //$scope.showChangeUniversity= function (c) {
            //c.ChangeUniversityshow = !c.ChangeUniversityshow;
            //console.log(c.ChangeUniversityshow);
            //}
            /**
             * $scope.changeUnversityName
             * @desc 改学校名称响应函数
             * @param c
             */
            
                //显示 学院添加面板 标志位
            $scope.add_collage_show = false;
            /**
             * 显示学院添加面板
             * @param C
             */
            $scope.showAddCollage = function () {
                $scope.add_collage_show = !$scope.add_collage_show;
            }
            /**
             * $scope.addCollageName
             * @desc 添加学院响应函数
             * @param c
             */
            $scope.addCollageName = function (c) {
                $.ajax({
                    type: "POST",
                    url: "/add_message",
                    cache: false,  //禁用缓存
                    data: {
                        //要发送给服务器端的数据，请都按如下的格式书写
                        "user": localStorage.getItem("user") || "",
                        "token": localStorage.getItem("token") || "",
                        "collage_id": c.collage_id,   //要更新的校友ID。如果校友ID==user_pk，说明是用户自己更新自己。如果校友ID != user_pk，说明是管理员更新其他用户信息，需要进行权限控制
                        "collage_name_cn": c.collage_name_cn //data是要更新的校友数据，在ajax请求前进行赋值和组装

                    },
                    dataType: "json",
                    success: function (result) {
                        console.log("update success", result);
                        if (result.code == 0) {
                            logger.logSuccess(result.message, 5000);
                            getCollage();
                            $scope.showAddCollage();
                        }
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        console.log(XMLHttpRequest);
                        logger.logError("网络连接失败，错误代码：" + XMLHttpRequest, 5000);
                    }
                });
            }
            /**
             * 显示学院修改面板
             * @param b
             */
            $scope.showChangeCollage = function (c) {
                c.change_Collage_show = !c.change_Collage_show;
                console.log(c.change_Collage_show);
            }
            /**
             * $scope.changeCollageName
             * @desc 改学院名称响应函数
             * @param c
             */
            $scope.changeCollageName = function (c) {
                $.ajax({
                    type: "POST",
                    url: "/update_college_name_by_id",
                    cache: false,  //禁用缓存
                    data: {
                        //要发送给服务器端的数据，请都按如下的格式书写
                        "user": localStorage.getItem("user") || "",
                        "token": localStorage.getItem("token") || "",
                        "collage_id": c.collage_id,   //要更新的校友ID。如果校友ID==user_pk，说明是用户自己更新自己。如果校友ID != user_pk，说明是管理员更新其他用户信息，需要进行权限控制
                        "collage_name_cn": c.collage_name_cn //data是要更新的校友数据，在ajax请求前进行赋值和组装
                    },
                    dataType: "json",
                    success: function (result) {
                        console.log("update success", result);
                        if (result.code == 0) {
                            logger.logSuccess(result.message, 5000);
                            getCollage();
                            $scope.showChangeCollage();
                        }
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        console.log(XMLHttpRequest);
                        logger.logError("网络连接失败，错误代码：" + XMLHttpRequest, 5000);
                    }
                });
            }

            /**
             * 显示专业添加面板
             * @param
             */
            $scope.showAddSpecialty = function (c) {
                c.add_specialty_show = !c.add_specialty_show;
                console.log(c.add_specialty_show);
            }
            /**
             * $scope.addSpecialtyName
             * @desc 添加专业名称响应函数
             * @param c
             */
            $scope.addSpecialtyName = function (c) {
                console.log(c);
                $.ajax({
                    type: "POST",
                    url: "/add_specialty",
                    cache: false,  //禁用缓存
                    data: {
                        //要发送给服务器端的数据，请都按如下的格式书写
                        "user": localStorage.getItem("user") || "",
                        "token": localStorage.getItem("token") || "",
                        "specialty_id": c.specialty_id,   //要更新的校友ID。如果校友ID==user_pk，说明是用户自己更新自己。如果校友ID != user_pk，说明是管理员更新其他用户信息，需要进行权限控制
                        "specialty_name_cn": c.specialty_name_cn,//data是要更新的校友数据，在ajax请求前进行赋值和组装
                        "collage_id": c.collage_id
                    },
                    dataType: "json",
                    success: function (result) {
                        console.log("update success", result);
                        if (result.code == 0) {
                            logger.logSuccess(result.message, 5000);
                            //getSpecialty();
                            $scope.showAddSpecialty();

                        }
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        console.log(XMLHttpRequest);
                        logger.logError("网络连接失败，错误代码：" + XMLHttpRequest, 5000);
                    }
                });
            }

            /**
             * 显示专业修改面板
             * @param
             */
            $scope.showChangeSpecialty = function (s) {
                s.change_specialty_show = !s.change_specialty_show;
                console.log(s.change_specialty_show);
            }
            /**
             * $scope.changespecialtyName
             * @desc 修改专业名称响应函数
             * @param c
             */
            $scope.changeSpecialtyName = function (s) {
                console.log(s);
                $.ajax({
                    type: "POST",
                    url: "/update_specialty_name_by_id",
                    cache: false,  //禁用缓存
                    data: {
                        //要发送给服务器端的数据，请都按如下的格式书写
                        "user": localStorage.getItem("user") || "",
                        "token": localStorage.getItem("token") || "",
                        "specialty_id": s.specialty_id,   //要更新的校友ID。如果校友ID==user_pk，说明是用户自己更新自己。如果校友ID != user_pk，说明是管理员更新其他用户信息，需要进行权限控制
                        "specialty_name_cn": s.specialty_name_cn//data是要更新的校友数据，在ajax请求前进行赋值和组装
                    },
                    dataType: "json",
                    success: function (result) {
                        console.log("update success", result);
                        if (result.code == 0) {
                            logger.logSuccess(result.message, 5000);
                        }
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        console.log(XMLHttpRequest);
                        logger.logError("网络连接失败，错误代码：" + XMLHttpRequest, 5000);
                    }
                });
            }


        }
    ])

})
