<!DOCTYPE html>
<html>
<head>
    <title>Workflow</title>
	<link rel="stylesheet" href="css/bootstrap.css" media="screen">
	<link rel="stylesheet" href="css/flaticon.css" media="screen">
	<link rel="stylesheet" href="css/style.css" media="screen">
	<link rel="stylesheet" href="css/skin.css" media="screen">

	<script src="js/jquery.min.js"></script>
	<!--script src="js/addicon.js"></script-->

</head>
<body>
<!-- #Include file="includes/header.asp" -->
<div class="content">
	<div class="menu-lg menu-horiz">
		<ul>
			<li class="green"><a href="#colors_sketch" class="load-tools" data-clear="true" data-profile="guidedMapping"><h2>Add custom pallet icon</h2></a></li>
			<li class="black double">
				<form id="addicon-form" style="" enctype="multipart/form-data" method="post" action="">
					<label for="icon-file">Icon graphic</label><input id="icon-file" name="icon-file" type="file">
					<fieldset>
						<label for="icon-name">Default name</label><input id="icon-name" type="text">
						<label for="icon-tooltip">Default tootip</label><input id="icon-tooltip" type="text">
						<label for="icon-time">Default time</label><input id="icon-time" type="text">
					</fieldset>
					<input type="submit" value="save to pallet" />
				</form>
			</li>
			<li class="white" id="icon-holder"><h4>Your icon</h4><div class="node"><span data-toggle="tooltip" data-placement="top"  title="" class="icon"></span><p class="text"></p></div></li>
		</ul>
	</div>
	
</div>


<!-- #Include file="includes/saveAsModal.asp" -->

<!-- #Include file="includes/sendModal.asp" -->



</body>
</html>