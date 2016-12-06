
<div id="questions" class="ipanel icat"> 

	<span class="ipanel-close glyphicon glyphicon-remove-circle"></span>
	<h4 class="ipanel-toggle">Guided Workflow</h4>
	<div class="ipanel-content">
		<h5>Invoice Processing</h5>

		<div class="ipanel">
			<h6 class="ipanel-toggle">Q1 What happens first?</h6>
			 <div class="ipanel-content">
				<div class="add guided" data-top="81" data-left="1" data-id="q1" data-connector="none" data-type="guided-node" data-class="xerox xerox-time" data-caption="time"><span class="icon xerox xerox-time" ></span></div>
				<div class="add guided" data-top="81" data-left="1" data-id="q1" data-connector="none" data-type="guided-node" data-class="xerox xerox-mail" data-caption="post"><span class="icon xerox xerox-mail"></span></div>
				<div class="add guided" data-top="81" data-left="1" data-id="q1" data-connector="none" data-type="guided-node" data-class="xerox xerox-download" data-caption="download"><span class="icon xerox xerox-download"></span></div>
			</div>
		</div>

		<div class="ipanel">
			<h6 class="ipanel-toggle">Q2 then what?</h6>
			 <div class="ipanel-content">
				<div class="add guided" data-top="81" data-left="123" data-id="q2" data-connector="q1 q2" data-type="guided-node" data-class="xerox xerox-mail" data-caption="mail"><span class="icon xerox xerox-mail" ></span></div>
				<div class="add guided" data-top="81" data-left="123" data-id="q2" data-connector="q1 q2" data-type="guided-node" data-class="xerox xerox-email" data-caption="email"><span class="icon xerox xerox-email"></span></div>
			</div>
		</div>

		<div class="ipanel">
			<h6 class="ipanel-toggle">Q3 and after that?</h6>
			 <div class="ipanel-content">
				<div class="add guided" data-top="81" data-left="248" data-id="q3" data-connector="q2 q3" data-type="guided-node" data-class="xerox xerox-print" data-caption="print"><span class="icon xerox xerox-print" ></span></div>
				<div class="add guided" data-top="81" data-left="248" data-id="q3" data-connector="q2 q3" data-type="guided-node" data-class="xerox xerox-mail" data-caption="post"><span class="icon xerox xerox-mail"></span></div>
			</div>
		</div>
		
		<div class="ipanel">
			<h6 class="ipanel-toggle">Q4 and as a result of that?</h6>
			 <div class="ipanel-content">
				<div class="add guided" data-top="81" data-left="370" data-id="q4" data-connector="q3 q4" data-type="guided-node" data-class="xerox xerox-email" data-caption="email"><span class="icon xerox xerox-email" ></span></div>
				<div class="add guided" data-top="81" data-left="370" data-id="q4" data-connector="q3 q4" data-type="guided-node" data-class="xerox xerox-mail" data-caption="post"><span class="icon xerox xerox-mail"></span></div>
			</div>
		</div>
		
		<div class="ipanel">
			<h6 class="ipanel-toggle">Q5 which leads to?</h6>
			 <div class="ipanel-content">
				<div class="add guided" data-top="81" data-left="493" data-id="q5" data-connector="q4 q5" data-type="guided-node" data-class="xerox xerox-user" data-caption="user"><span class="icon xerox xerox-user" ></span></div>
				<div class="add guided" data-top="81" data-left="493" data-id="q5" data-connector="q4 q5" data-type="guided-node" data-class="xerox xerox-mail" data-caption="post"><span class="icon xerox xerox-mail"></span></div>
			</div>
		</div>
		
		<div class="ipanel">
			<h6 class="ipanel-toggle">Q5 and subsequently?</h6>
			 <div class="ipanel-content">
				<div class="add guided" data-top="81" data-left="615" data-id="q6" data-connector="q5 q6" data-type="guided-node" data-class="xerox xerox-laptop" data-caption="laptop"><span class="icon xerox xerox-laptop" ></span></div>
				<div class="add guided" data-top="81" data-left="615" data-id="q6" data-connector="q5 q6" data-type="guided-node" data-class="xerox xerox-mail" data-caption="post"><span class="icon xerox xerox-mail"></span></div>
			</div>
		</div>
		
		<div class="ipanel">
			<h6 class="ipanel-toggle">Q6 then finally?</h6>
			 <div class="ipanel-content">
				<div class="add guided" data-top="81" data-left="738" data-id="q7" data-connector="q6 q7" data-type="guided-node" data-class="xerox xerox-server-stack" data-caption="database"><span class="icon xerox xerox-server-stack" ></span></div>
				<div class="add guided" data-top="81" data-left="738" data-id="q7" data-connector="q6 q7" data-type="guided-node" data-class="xerox xerox-mail" data-caption="post"><span class="icon xerox xerox-mail"></span></div>
			</div>
		</div>
		
	</div>

</div>