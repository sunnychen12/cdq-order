$(function(){
	//内页侧边菜单效果控制
	var $toggle=$('[data-id="side-menu-toggle"]');
	if($toggle.length>0){
		if($toggle.attr('aria-expanded')=='true'){
			$($toggle.data('target')).addClass('in')
		}
		else{
			$($toggle.data('target')).removeClass('in')
		}
	}
});