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
			<li><a href="#colors_sketch" data-clear="true" class="new-workflow" ><b>New</b><br/>workflow</a></li>
			<li><a href="#" class="save-workflow"><b>Save</b><br/>workflow</a></li>
			<li><a href="#" class="save-workflow-as" data-toggle="modal" data-target="#saveAsModal"><b>Save As...</b></a></li>
			<li><a href="#"  data-toggle="modal" data-target="#sendModal"><b>Send</b><br/>workflow</a></li>
			<li><a href="#" class="cat-toggle" data-target="savedworkflows"><b>My Saved</b><br/>workflows</a></li>
			<li><a href="#" class="cat-toggle" data-target="templates"><b>Workflow</b><br/>samples</a></li>
			<li><a href="#" class="cat-toggle" data-target="pallets"><b>Icon</b><br/>pallets</a></li>
			<li><a href="#"><b>Cost Saving</b><br/>calculator</a></li>
		</ul>
	</div>

	<div id="controls"> 
		<!-- #Include file="includes/nodedata.asp" -->
		
		<!-- #Include file="includes/questions.asp" -->
		
		<!-- #Include file="includes/pallets.asp" -->
	 
		<!-- #Include file="includes/templates.asp" -->
	
		<!-- #Include file="includes/savedworkflows.asp" -->
	</div>

	<div id="workAreaWrapper">
		<div id="inner-dropzone" class="trash dropzone"><span class="icon glyphicon glyphicon-trash"></span></div>
		
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
		  
		  <a href="#colors_sketch" class="clear-sketch" data-clear="true"><span class=" glyphicon glyphicon-trash"></span></a> 
		</div>
		<button type="button" id="toggle-draw" class="btn btn-default btn-xs"><span class="pencil glyphicon glyphicon-pencil"></span></button>
		
		<div id="workArea">
		
		
			<div id="drawArea">
				<canvas id="colors_sketch" width="1600" height="1200"></canvas>
				<img id="saved-image" />
			</div>
		
		
			<div id="dragArea" class="canvas">
			
			 
			 
			  
			  <div class="node block draggable-graphit" id="h1_block" style="left: 10px; top:10px;"">
				<span data-toggle="tooltip" data-placement="top" title="" class="icon glyphicon glyphicon-camera" data-original-title="tool tip text"></span>
				<p class="text"> camera </p>   
			  </div>
			  
			  
			  <div class="node block draggable-graphit" id="h2_block" style="left: 200px; top:100px;"">
				<span data-toggle="tooltip" data-placement="top" title="" class="icon glyphicon glyphicon-print" data-original-title="tool tip text"></span>
				<p class="text"> print </p>   
			  </div>
			  
			   <div class="node block draggable-graphit" id="h3_block" style="left: 300px; top:300px;"">
				<span data-toggle="tooltip" data-placement="top" title="" class="icon glyphicon glyphicon-print" data-original-title="tool tip text"></span>
				<p class="text"> print again </p>   
			  </div>
			  
			  
			   <div class="node block draggable-graphit" id="h4_block" style="left: 500px; top:100px;"">
				<span data-toggle="tooltip" data-placement="top" title="" class="icon glyphicon glyphicon-print" data-original-title="tool tip text"></span>
				<p class="text"> print again </p>   
			  </div>
			  
			   <div class="node block draggable-graphit" id="h5_block" style="left: 300px; top:10px;"">
				<span data-toggle="tooltip" data-placement="top" title="" class="icon glyphicon glyphicon-camera" data-original-title="tool tip text"></span>
				<p class="text"> free </p>   
			  </div>
			  
			  <div class="connector-graphit h1_block h2_block"><label class="destination-label h1_block h2_block"></label><img class="connector-end h1_block h2_block" src="images/arrow.png"></div>
			  <div class="connector-graphit h2_block h3_block"><label class="destination-label h2_block h3_block"></label><img class="connector-end h2_block h3_block" src="images/arrow.png"></div>
			  <div class="connector-graphit h2_block h4_block"><label class="destination-label h2_block h4_block"></label><img class="connector-end h2_block h4_block" src="images/arrow.png"></div>
			
			</div>

			

			
		</div>
	</div>
	

</div>


<!-- #Include file="includes/saveAsModal.asp" -->

<!-- #Include file="includes/sendModal.asp" -->



</body>
</html>