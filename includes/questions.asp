
<div id="questions" class="ipanel icat"> 

	<span class="ipanel-close glyphicon glyphicon-remove-circle"></span>
	<h4 class="ipanel-toggle">Guided Workflow</h4>
	<div class="ipanel-content">
		<h5>Invoice Processing</h5>

		<div class="ipanel">
			<h6 class="ipanel-toggle">Q1 How does the document arrive?</h6>
			 <div class="ipanel-content">
				<div class="add guided" data-top="200" data-left="250" data-id="q1" data-connector="none" data-type="guided-node" data-class="xerox xerox-print" data-caption="print"><span class="icon xerox xerox-print" ></span></div>
				<div class="add guided" data-top="200" data-left="250" data-id="q1" data-connector="none" data-type="guided-node" data-class="xerox xerox-envelope" data-caption="post"><span class="icon xerox xerox-envelope"></span></div>
				<div class="add guided" data-top="200" data-left="250" data-id="q1" data-connector="none" data-type="guided-node" data-class="xerox xerox-download-alt" data-caption="download"><span class="icon xerox xerox-download-alt"></span></div>
			</div>
		</div>

		<div class="ipanel">
			<h6 class="ipanel-toggle">Q2 then what?</h6>
			 <div class="ipanel-content">
				<div class="add guided" data-top="200" data-left="450" data-id="q2" data-connector="q1 q2" data-type="guided-node" data-class="xerox xerox-print" data-caption="print"><span class="icon xerox xerox-print" ></span></div>
				<div class="add guided" data-top="200" data-left="450" data-id="q2" data-connector="q1 q2" data-type="guided-node" data-class="xerox xerox-envelope" data-caption="post"><span class="icon xerox xerox-envelope"></span></div>
			</div>
		</div>

		<div class="ipanel">
			<h6 class="ipanel-toggle">Q3 and finally?</h6>
			 <div class="ipanel-content">
				<div class="add guided" data-top="400" data-left="450" data-id="q3" data-connector="q2 q3" data-type="guided-node" data-class="xerox xerox-print" data-caption="print"><span class="icon xerox xerox-print" ></span></div>
				<div class="add guided" data-top="400" data-left="450" data-id="q3" data-connector="q2 q3" data-type="guided-node" data-class="xerox xerox-envelope" data-caption="post"><span class="icon xerox xerox-envelope"></span></div>
			</div>
		</div>
		
	</div>

</div>