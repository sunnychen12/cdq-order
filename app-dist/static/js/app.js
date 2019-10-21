;(function($){
    $(function () {
        /*'use strict';
        /!*$(window).on("pageLoadStart",function(e, id, page) {

        });*!/

        $(document).on("beforePageSwitch", function(e, id, page) {
            //page.find('.popup, .modal, .photo-browser').remove();
            //$('.popup-overlay, .modal-overlay, .photo-browser').remove()
            //关闭图片浏览功能
            $('.photo-browser-close-link').click();

            //关闭所有弹窗
            $.closeModal();

        });

        /!*$(document).on("pageInit", "#page-index", function(e, id, page) {


        });*!/*/

        $.init();
    });

    //commonjs
    window.commomLab = {
        getQueryParam: function (name){
            var url=window.location.search;
            var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
            var dotIndex=url.indexOf("?");
            if(dotIndex!=-1){
                var r = url.substr(dotIndex+1).match(reg);

                if(r!=null) return decodeURIComponent(r[2]); return null;
            }

            return null;
        }
    };

    //选择器class 切换
    $.fn.toggleClass = function(classname) {
        return this.each(function(){
            if( $(this).hasClass(classname) ){
                $(this).removeClass(classname);
            } else{
                $(this).addClass(classname);
            }
        })
    }

    //下拉手风琴
    //该方法使用时需注意，绑定的dom，其包含一个子结点，然后该结点再包含其它内容
    $.fn.slideToggle = function(){
        var speed, easing, cb;
        for( var i=0; i < arguments.length; i++ ){
            if( typeof(arguments[i]) === 'number' ){
                speed=arguments[i];
            } else if( typeof(arguments[i]) === 'string' ){
                easing=arguments[i];
            } else if( typeof(arguments[i]) === 'function' ){
                cb=arguments[i];
            }
        }


        return this.each(function(){
            var that=$(this);

            if(that.hasClass('animating')) return;

            var h = that.height();
            var slideHeight=that.children().height();

            that.height(h).addClass('animating');

            that.animate({height: h > 0 ? 0 : slideHeight},(speed?speed:200),(easing?easing:'linear'),function(){
                if(that.hasClass('expand')){
                    that.removeClass('expand');
                }
                else{
                    that.addClass('expand').height('auto');
                }

                that.removeClass('animating');

                if(typeof cb == 'function'){
                    cb.call(that);
                }
            });
        })
    };
})(Zepto);