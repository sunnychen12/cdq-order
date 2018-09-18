layui.config({
  	base : "dist/plugins/"//设定扩展的Layui模块的所在目录
}).extend({ //设定模块别名
  	zTree: 'zTree/jquery.ztree.all.min' //如果 mymod.js 是在根目录，也可以不用设定别名,
  	//,Validform : 'Validform/Validform_v5.3.2_min'
});

window.globalConfig={
	formVerifyRule:{//自定义验证规则
		'verify-control': function(value,elem){
			var val=$.trim(value),
				nullmsg=$(elem).attr('null-msg'),
				errormsg=$(elem).attr('error-msg'),
				macReg=$(elem).attr('data-regexp');
			nullmsg || (nullmsg='字段不能为空');
			errormsg || (errormsg='字段不合法');

			//验证字符串是不是正则表达式
			//var regExp=/\/.+\//g;
			var regExp=/^\/(.+)\/([igm]*)*$/;
			/*
				验证是否符合以下规则
				*数字-数字
				s数字-数字
				n数字-数字

				例如：
				*6-16	代表6到16位任意字符
				n6-16	代表6到16位数字
				s6-18	代表6到18位非特殊字符（不能包含~!@#$%^+*&/?|:.<>{}()';=）
				e 		代表邮箱
				m 		代表手机
				url 	代表网址
				date 	代表日期
				id 		代表身份证
				tel 	代表固话

				如果验证的元素存在‘empty-ignore-verify’属性，代表该元素允许不填写，但如果填写了，就要遵循规则
			*/
			//var reg2=/^(s|n|\*)(\d+)-(\d+)$/;
			//var reg2=/^(s|n|\*)(\d+)(-\d+){0,1}$/;
			var reg2=/^(s|n|\*)(\d+)(-\d+)?$|^(m|e|url|date|id|tel)$/;

			var regGroup=/^\[(.*)\]$/;

			var vMsg;

			if(regGroup.test(macReg)){
				var rules=macReg.match(regGroup)[1].split(',');


				$.each(rules, function(index, rule) {
					vMsg=check(rule);
					if( !vMsg ){
						return false;
					}
				});

			}
			else{
				vMsg=check(macReg);
			}

			if( vMsg ){
				return vMsg;
			}

			function check(macReg){
				if( val.length<=0 ){
					if(!$(elem).is('[empty-ignore-verify]')){
						return nullmsg;
					}
				}
				else{
					//直接是正则;
					if( regExp.test(macReg) ){
						var res=macReg.match(regExp);
						var rexp=new RegExp(res[1],res[2]);

						if(!rexp.test(val)){
							return errormsg;
						}
					}
					else if( reg2.test(macReg) ){
						var res=macReg.match(reg2),
							m=res[1],
							s=res[2],
							e=res[3];

						s=parseInt(s);

						var rs,rexp;

						//数字a-b个  或  任意字符a-b个
						if(m=='n' || m=='*'){
							m=='n'?(rs='^\\d'):(rs='^[\\w\\W]');

							if(e){
								e=parseInt(e.substring(1));

								rexp = new RegExp(rs+'{'+s+','+e+'}$');

								if(!rexp.test(val)){
									return errormsg;
								}
							}
							else{
								rexp = new RegExp(rs+'{'+s+',}$');

								if(!rexp.test(val)){
									return errormsg;
								}
							}
						}
						
						//非特殊字符a-b个
						else if(m=='s'){
							rs="\\`\\~\\!\\@\#\\$\\%\\^\\+\\*\\&\\\\\\/\\?\\|\\:\\.\\<\\>\\{\\}\\(\\)\\'\\;\\=\"";

							rexp = new RegExp('['+rs+']','g');

							if(rexp.test(val)){
								return "禁止输入特殊字符：`~!@#$%^+*&/?|:.<>{}()';=";
							}
							else{
								if(e){
									e=parseInt(e.substring(1));

									if(s<e){
										if(val.length<s || val.length>e){
											return errormsg;
										}
									}
									else{
										return "字段验证规则'sX-Y'的X须小于Y";
									}
								}
								else{
									rexp = new RegExp('['+rs+']{'+s+',}$');

									if(!rexp.test(val)){
										return errormsg;
									}
								}
							}

						}

						//邮箱
						else if(res[4]=='e'){
							rexp=/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
							if(!rexp.test(val)){
								return errormsg;
							}
						}

						//手机号码
						else if(res[4]=='m'){
							rexp=/^1[3-9][0-9]{9}$/;
							if(!rexp.test(val)){
								return errormsg;
							}
						}

						//固话
						else if(res[4]=='tel'){
							rexp=/^(0\d{2}-\d{8}(-\d{1,4})?)$|(0\d{3}-\d{7,8}(-\d{1,4})?)$/;
							if(!rexp.test(val)){
								return errormsg;
							}
						}

						//网址
						else if(res[4]=='url'){
							rexp=/^(\w+:\/\/)?\w+(\.\w+)+.*$/;
							if(!rexp.test(val)){
								return errormsg;
							}
						}

						//日期
						else if(res[4]=='date'){
							rexp=/^(\d{4})[-\/](\d{1}|0\d{1}|1[0-2])([-\/](\d{1}|0\d{1}|[1-2][0-9]|3[0-1]))*$/;
							if(!rexp.test(val)){
								return errormsg;
							}
						}

						//身份证
						else if(res[4]=='id'){
							rexp=/(^\d{15}$)|(^\d{17}(x|X|\d)$)/;
							if(!rexp.test(val)){
								return errormsg;
							}
						}
					}
				}

				return false;
			}
			
		}
	}
}

layui.use(['util','element','form'], function(){
	var util = layui.util,
		form = layui.form,
		element = layui.element;

	//自定义验证规则
	form.verify(globalConfig.formVerifyRule);

	//内页才显示
	if($('body').hasClass('cdq-body')){
		util.fixbar();
	}

	//筛选 按钮
	$(document)
	.on('click', '.filter-list > .layui-btn', function(event) {
		$(this).toggleClass('actived');
	})
	//layui select下拉选择框进一步美化，增加层次缩进
	.on('click', '.layui-select-title', function(event) {
	    var _this=this
	        , $node=$(this)
	        , $s=$node.parent().prev('select');
	    if($s.is('[item-indent]')){
	      var $o=$s.children('option[level]')
	          , $dl=$node.next('dl')
	          , $oList=$dl.children('dd[class!="layui-select-tips"]');
	      if($oList.length>0){
	        setTimeout(function(){
	          $o.each(function(index, el) {
	            var l=$(this).attr('level');
	            $oList.eq(index).css('padding-left', (l==1?10:(parseInt(l)*20-10)) );
	          });
	        },0)
	      }
	    }
	});
});