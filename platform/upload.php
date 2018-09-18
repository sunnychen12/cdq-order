<?php

if(4!==$_FILES['userfile']['error']){
	//加载上传类
	require_once './UploadFile.class.php';
	$upload_path = 'img_test/';
	$upload = new UploadFile();
	$upload->maxSize = 2*1024*1024*8;// 设置附件上传大小
	$upload->allowExts  = array('jpg', 'gif', 'png', 'jpeg');// 设置附件上传类型
	$upload->savePath =  $upload_path;// 设置附件上传目录
	$branchInfo = $upload->uploadOne($_FILES['userfile'],$upload_path);
	if(!$branchInfo) {// 上传错误提示错误信息
		echo 'error';
	}else{// 上传成功 获取上传文件信息
		$fn=$branchInfo[0]['savename'];
		$filepath='{"filepath":"'.$upload_path.$fn.'"}';
		echo $filepath;
	}
}else{
	echo 'error';
}
?>