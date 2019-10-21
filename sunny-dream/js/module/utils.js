define(['vue','router'],function(Vue, router){
    return {
        //ajax 统一方法
        ajaxProcess : function(options){
            options.dataType || (options.dataType='json');
            typeof(options.cache)=='boolean' || (options.cache=false);
            //options.timeout || (options.timeout=1000*30);//默认异步请求超时时间为 30s
            var opts=$.extend({}, $.ajaxSettings, options);
            return $.ajax(opts);
        },
        // 加载 vue 模板
        loadTemplate: function (resolve, reject, templateFile){
            return this.ajaxProcess({
                dataType:'html',
                url: templateFile
            }).done(function(res){
                var jsScript={};
                var $tmpDiv=$('<div/>').html(res);
                var templateHtml=$tmpDiv.find('template').html();

                eval($tmpDiv.find('script').html());

                $.extend(jsScript,{template: templateHtml})

                resolve(jsScript);
            }).fail(function () {
                reject({
                    template: '<div>模板加载出错</div>'
                })
            })
        },
        //获取子路由
        getChildRoutes: function(vm){
            var matchedRoutes=vm.$route.matched;

            function searchRoute(toMatched, fromSearch){
                var result=false;
                for(var j=0; j<fromSearch.length; j++){
                    if(toMatched.name===fromSearch[j].name){
                        result=fromSearch[j];
                        break;
                    }
                }
                return result;
            }

            var tempRoute=vm.$router.options.routes;
            for(var i=0; i<matchedRoutes.length-1; i++){
                tempRoute = searchRoute(matchedRoutes[i], i==0 ? tempRoute : tempRoute.children);
            }

            return tempRoute.children;
        }
    };
});
