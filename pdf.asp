<!DOCTYPE html>
<html>
<head>
    <title>Workflow</title>
	<link rel="stylesheet" href="css/bootstrap.css" media="screen">
	<link rel="stylesheet" href="css/flaticon.css" media="screen">
	<link rel="stylesheet" href="css/style.css" media="screen">
	<link rel="stylesheet" href="css/skin.css" media="screen">
	<link rel="stylesheet" href="css/js-graph-it.css" media="screen">
	
	<script>
		var pdfWorkflow='<%=request("workflow")%>';
	</script>
	<script src="js/ios-drag-drop.js"></script>
	<script src="js/jquery.min.js"></script>
	<script src="js/bootstrap.js"></script>
	<script src="js/bootbox.min.js"></script>
	<script src="js/sketch.js"></script>
	<script src="js/interact.js"></script>
	<script src="js/js-graph-it.js"></script>
	<script src="js/workflow.js"></script>
</head>
<body class="pdf">
<!-- #Include file="includes/pdfheader.asp" -->
<div class="content">

	
	<div id="workAreaWrapper">
		
		<%=request("workflow")%>
		
		
		<div class="workArea active" data-name="Unnamed flow 1" data-public="false" id="flow1">
		<div class="drawArea" style="display: none;">
		<canvas id="flow1-sketch" class="colors_sketch" width="1600" height="1200"></canvas>
		<img class="saved-image">
		</div>
		<div id="flow1-canvas" class="dragArea canvas" style="overflow: auto; position: relative;">
		<div id="flow1-canvas_innerDiv" style="border: none; padding: 0px; margin: 0px; position: absolute; top: 0px; left: 0px; width: 1598px; height: 1198px;">
		</div>
		</div>
		</div>
		
		
		
		
	</div>
	

</div>



</body>
</html>