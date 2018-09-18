;(function(){
    // Android 手机下输入框获取焦点时, 输入法挡住输入框的 bug
    if (/Android/gi.test(navigator.userAgent)) {
        window.addEventListener('resize', function () {
            if (document.activeElement.tagName == 'INPUT' || document.activeElement.tagName == 'TEXTAREA') {
                window.setTimeout(function () {
                    document.activeElement.scrollIntoViewIfNeeded();
                }, 0);
            }
        })
    }
})(window);

/*表单验证
  <input
    data-check="1"
    data-rule=".+" 
    data-msg-empty="请填写xx" 
    data-msg-error="格式不对"
  >
*/

window.checkform=function(jqForm){
  var hasFin=true;
  $('[data-check="1"],[data-ignore="ignore"]',jqForm).each(function(index, el) {
    var that=this;
    var val=$.trim($(this).val());
    var reg=new RegExp($(this).attr('data-rule'),'g');

    if($(that).data('ignore')){
      if( val!='' && !reg.test(val)  ){
        $.alert($(this).attr('data-msg-error'),function(){
          $(that).focus();
        });
        hasFin=false;
        return false;
      }
    }
    else{
      if( val=='' ){
        $.alert($(this).attr('data-msg-empty'),function(){
          $(that).focus();
        });
        hasFin=false;
        return false;
      }
      else{
        if( !reg.test(val) ){
          $.alert($(this).attr('data-msg-error'),function(){
            $(that).focus();
          });
          hasFin=false;
          return false;
        }
      }
    }

    
  });

  return hasFin;
}


$(document)
//第一次点击文本框时，光标置后
.on('click','[data-focus="focus-last"]',function () {
  if( $(this).attr('data-has-focus')!='1' ){
    var t=this.value;
    $(this).val("").focus().val(t);
    $(this).attr('data-has-focus','1');
  }
});