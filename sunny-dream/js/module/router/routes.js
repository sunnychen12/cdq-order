define(['utils'],function(utils){
    var routes=[
        {
            path: '',
            component: 'components/home-layout.html',
            name:'main',
            meta:{
                name: '布局'
            },
            redirect:'/home',
            //嵌套路由
            children : [
                {
                    path: 'home',
                    name: 'Home',
                    component: 'home.html',
                    meta:{
                        name: '首页'
                    }
                },
                {
                    path: 'news',
                    name: 'News',
                    component: 'components/inner-with-sidebar.html',
                    meta:{
                        name: '政策新闻',
                        icon: 'icon-0x0'
                    },
                    children: [
                        {
                            path: 'politics',
                            name: 'Politics',
                            component: 'politics.html',
                            meta:{
                                name: '政策文件'
                            }
                        },
                        {
                            path: 'information',
                            name: 'Information',
                            component: 'information.html',
                            meta:{
                                name: '新闻动态'
                            }
                        }
                    ]
                },
                {
                    path: 'org',
                    name: 'Org',
                    component: 'components/inner-with-sidebar.html',
                    meta:{
                        name: '组织机构',
                        icon: 'icon-48x0'
                    },
                    children:[
                        {
                            path: 'subOrg',
                            name: 'SubOrg',
                            component: 'org.html',
                            meta:{
                                name: '组织机构'
                            }
                        }
                    ]
                },
                {
                    path: 'expert_judges',
                    name: 'ExpertJudges',
                    component: 'components/inner-with-sidebar.html',
                    meta:{
                        name: '专家评委',
                        icon: 'icon-92x0'
                    },
                    children:[
                        {
                            path: 'sub_expert_judges',
                            name: 'SubExpertJudges',
                            component: 'expert-judges.html',
                            meta:{
                                name: '专家评委'
                            }
                        }
                    ]
                },
                {
                    path: 'wonderful_moment',
                    name: 'WonderfulMoment',
                    component: 'components/inner-with-sidebar.html',
                    meta:{
                        name: '精彩时刻',
                        icon: 'icon-135x0'
                    },
                    children:[
                        {
                            path: 'sub_wonderful_moment',
                            name: 'SubWonderfulMoment',
                            component: 'wonderful-moment.html',
                            meta:{
                                name: '精彩时刻'
                            }
                        }
                    ]
                },
                {
                    path: 'enroll',
                    name: 'Enroll',
                    component: 'components/inner-with-sidebar.html',
                    meta:{
                        name: '报名参赛',
                        icon: 'icon-171x0'
                    },
                    children:[
                        {
                            path: 'subEnroll',
                            name: 'SubEnroll',
                            component: 'enroll.html',
                            meta:{
                                name: '报名参赛'
                            }
                        }
                    ]
                },
                {
                    path: 'verify',
                    name: 'Verify',
                    component: 'verify.html',
                    meta:{
                        name: '证书查验'
                    }
                }

            ]
        },
        {
            path: '*',
            component: {
                template: '<div>404</div>'
            },
            name:'404',
            meta:{
                name: '404'
            }
        }
    ];

    //返回模板的json对象
    function getComponentTemplate(template){
        return {
            component: function(resolve, reject) {
                utils.loadTemplate(resolve, reject, template)
            }
        }
    }

    //递归访问所有的路由对象，设置对应的模板与父结点跳转到第一个子结点
    function worker(arr) {
        if(arr.length>0) {
            for (var i = 0; i < arr.length; i++) {
                if(arr[i].component && typeof(arr[i].component)=='string'){
                    $.extend(arr[i], getComponentTemplate(arr[i].component));
                }

                if(arr[i].children && arr[i].children.length>0){
                    worker(arr[i].children);
                }
            }
        }
    }

    worker(routes);

    /*var level=0;
    function worker(arr,lev) {
        if(arr.length>0) {
            ++lev;
            for (var i = 0; i < arr.length; i++) {
                if(arr[i].component && typeof(arr[i].component)=='string'){
                    $.extend(arr[i], getComponentTemplate(arr[i].component));
                }

                if(arr[i]['meta']){
                    $.extend(arr[i]['meta'], {
                        level:lev
                    });
                }
                else{
                    $.extend(arr[i], {
                        meta: {
                            level: lev
                        }
                    });
                }


                if(arr[i].children && arr[i].children.length>0){
                    worker(arr[i].children, lev);
                }
            }
        }
    }

    worker(routes,level);*/

    return routes;
});


