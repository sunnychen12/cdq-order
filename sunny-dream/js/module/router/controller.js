define([],function(){
    return function () {
        this.beforeEach(function(to, from, next){
            //判断该页面有channel
            if(from.query.area){
                //路由切换时，如果没有就添加，有就跳过执行，添加固定参数
                if (!to.query.area) {
                    next({
                        name: to.name,
                        query: $.extend(
                                {},
                                to.query,
                                {area: from.query.area}
                            )
                    });
                } else {
                    next();
                }
            }else{
                next();
            }
        });
    };
});


