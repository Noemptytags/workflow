<!DOCTYPE html>
<html>
<head>
    <title>Workflow</title>
	<link rel="stylesheet" href="css/bootstrap.css" media="screen">
	<link rel="stylesheet" href="css/flaticon.css" media="screen">
	<link rel="stylesheet" href="css/style.css" media="screen">
	<link rel="stylesheet" href="css/skin.css" media="screen">
	<link rel="stylesheet" href="css/js-graph-it.css" media="screen">
	
	<script src="js/ios-drag-drop.js"></script>
	<script src="js/jquery.min.js"></script>
	<script src="js/bootstrap.js"></script>
	<script src="js/bootbox.min.js"></script>
	<script src="js/sketch.js"></script>
	<script src="js/interact.js"></script>
	<script src="js/js-graph-it.js"></script>
	<script src="js/workflow.js"></script>
</head>
<body >
<!-- #Include file="includes/header.asp" -->
<div class="content">
<!-- #Include file="includes/topMenu.asp" -->
	
	<div class="menu-sm menu-horiz cf">
		<ul>
			<li><a href="#" class="new-project" ><b>New</b><br/>project</a></li>
			<li><a href="#" class="new-workArea" ><b>Add</b><br/>canvas</a></li>
			<li><a href="#" class="save-project"><b>Save</b><br/>project</a></li>
			<li><a href="#" class="save-workflow-as" data-toggle="modal" data-target="#saveAsModal"><b>Save As...</b></a></li>
			<li><a href="#" data-toggle="modal" data-target="#sendModal"><b>Send</b><br/>workflow</a></li>
			<li><a href="#" class="cat-toggle" data-target="savedworkflows"><b>My Saved</b><br/>items</a></li>
			<li><a href="#" class="cat-toggle" data-target="templates"><b>Workflow</b><br/>samples</a></li>
			<li><a href="#" class="cat-toggle" data-target="pallets"><b>Icon</b><br/>pallets</a></li>
			<li><a href="#" class="cat-toggle" data-target="calc"><b>Cost Saving</b><br/>calculator</a></li>
			<li><a href="#" id="savetopdf"><b>Save</b><br/>to pdf</a></li>
		</ul>
	</div>

	<div id="controls"> 
		<!-- #Include file="includes/nodedata.asp" -->
		
		<!-- #Include file="includes/questions.asp" -->
		
		<!-- #Include file="includes/pallets.asp" -->
	 	
		<!-- #Include file="includes/templates.asp" -->
	
		<!-- #Include file="includes/savedworkflows.asp" -->
		
		<!-- #Include file="includes/dataCalc.asp" -->	
	</div>

	<div id="workAreaWrapper">
		<div id="inner-dropzone" title="Delete selected item" class="trash dropzone"><span class="icon glyphicon glyphicon-trash"></span></div>
		
		<div id="drawControls">
		  <a href="#colors_sketch" class="color-picker" data-color="#f00" data-tool="marker" style="background: #f00;"></a> 
		  <a href="#colors_sketch" class="color-picker" data-color="#ff0" data-tool="marker" style="background: #ff0;"></a> 
		  <a href="#colors_sketch" class="color-picker" data-color="#0f0" data-tool="marker" style="background: #0f0;"></a> 
		  <a href="#colors_sketch" class="color-picker" data-color="#0ff" data-tool="marker" style="background: #0ff;"></a> 
		  <a href="#colors_sketch" class="color-picker" data-color="#00f" data-tool="marker" style="background: #00f;"></a> 
		  <a href="#colors_sketch" class="color-picker" data-color="#f0f" data-tool="marker" style="background: #f0f;"></a> 
		  <a href="#colors_sketch" class="color-picker" data-color="#000" data-tool="marker" style="background: #000;"></a> 
		  <a href="#colors_sketch" class="color-picker" data-color="#fff" data-tool="marker" style="background: #fff;"></a>  
		  <a href="#colors_sketch" class="eraser-picker" data-tool="eraser"><span class="glyphicon glyphicon-erase"></span></a>
		  
		  <a href="#colors_sketch" class="brush-picker brush-s" data-size="3" ><span class="pencil glyphicon glyphicon-pencil"></span></a> 
		  <a href="#colors_sketch" class="brush-picker brush-m active" data-size="5" ><span class="pencil glyphicon glyphicon-pencil"></span></a> 
		  <a href="#colors_sketch" class="brush-picker brush-l" data-size="10" ><span class="pencil glyphicon glyphicon-pencil"></span></a> 
		  <a href="#colors_sketch" class="brush-picker brush-xl" data-size="15" ><span class="pencil glyphicon glyphicon-pencil"></span></a> 
		  
		  <a href="#colors_sketch" class="clear-sketch" data-clear="true"><span class="glyphicon glyphicon-trash"></span></a> 
		</div>
		<button title="Show / hide drawing tools" type="button" id="toggle-draw" class="btn btn-default btn-xs"><span class="pencil glyphicon glyphicon-pencil"></span></button>
		
		<div class="workArea active" id="flow1">
			
			<div class="drawArea">
				<canvas id="flow1-sketch" class="colors_sketch" width="1600" height="1200"></canvas>
				<img class="saved-image" />
			</div>	
		
			<div id="flow1-canvas" class="dragArea canvas">

				<div class="node block draggable-graphit" id="h1_block" style="left: 50px; top:50px;">
					<span data-toggle="tooltip" data-placement="top" title="" class="icon glyphicon glyphicon-camera" data-original-title="tool tip text"></span>
					<p class="text"> camera </p>   
				</div>
			
			</div>
			
		</div>

		<div class="workArea" id="flow2">
			
			<div class="drawArea">
				<canvas id="flow2-sketch" class="colors_sketch" width="1600" height="1200"></canvas>
				<img class="saved-image" />
			</div>	
		
			<div id="flow2-canvas" class="dragArea canvas">

				<div class="node block draggable-graphit" id="h2_block" style="left: 100px; top:100px;">
					<span data-toggle="tooltip" data-placement="top" title="" class="icon glyphicon glyphicon-print" data-original-title="tool tip text"></span>
					<p class="text">print</p>   
				</div>
			
			</div>
			
		</div>

	</div>
	<ul id="flowTabs" class="nav nav-tabs">
		<li class="active"><a href="#" data-target="flow1">Unnamed flow 1</a></li>
		<li><a href="#" data-target="flow2">Unnamed flow 2</a></li>
	</ul>
	
</div>

<!-- #Include file="includes/saveAsModal.asp" -->

<!-- #Include file="includes/sendModal.asp" -->

<div class="ajaxModal"><h1>Loading...</h1></div>

</body>
</html>