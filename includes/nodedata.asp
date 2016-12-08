<div id="nodedata" class="ipanel icat"> 
	<a id="deleteNode" title="Delete selected item"><span class="icon glyphicon glyphicon-trash"></span></a>
	<h4 class="ipanel-toggle">Selected item details</h4>
	<div class="ipanel-content">
		<p id="node-information"></p>

		<form id="activeData">

			<div class="form-group">
				<label for="">Label</label>
				<input type="text" class="form-control" id="aCaption" placeholder="">
			</div>

			<div class="checkbox">
				<label for="aTimer">Add timer icon</label>
				<input type="checkbox" id="aTimer">
			</div>

			<div id="aTimeHolder" class="form-group" style="display:none;">
				<label for="aTime">Time</label>
				<input type="text" class="form-control" id="aTime" placeholder="">
			</div>
						
		</form>

		<form id="calcData">

			<div class="form-group">
				<label for="">Minimum wage</label>
				<input type="text" class="form-control" id="aMinwage" placeholder="" disabled="disabled" >
			</div>

			<div class="form-group">
				<label for="">Minutes saved</label>
				<input type="text" class="form-control" id="aMins" placeholder="" disabled="disabled" >
			</div>
			 
		</form>
	  
	</div>	
</div>