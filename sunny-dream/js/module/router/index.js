define(['vue', "vue-router", 'module/router/routes', 'module/router/controller'],function(Vue, VueRouter, routes, routerController){
    document.createElement("template");

    Vue.use(VueRouter);

    var router = new VueRouter({
        routes: routes,
        scrollBehavior: function (to, from, savedPosition) {
            return { x: 0, y: 0 }
        }
    });

    routerController.call(router);

    return router;
});


