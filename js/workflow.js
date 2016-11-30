$( document ).ready(function() {	
	
function getParameterByName(name, url) {
    if (!url) {
      url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}	
	
	
	
// initialise graphit	
initPageObjects();

// increments node ID
if (workflow = getParameterByName("workflow")){
	var wf = JSON.parse(workflow);
	loadWorkflows(wf);
}

var nodeCount=0; workAreaCount=0;
	
///toggle panels

$(".ipanel-toggle").click(function() {
	$(this).parent(".ipanel").find(".ipanel-content:first").slideToggle("fast");
})

$(".ipanel-close").click(function() {
	$(this).parent(".ipanel").slideUp("fast", function() {
		tidyMenu();
	});
})

///toggle categories
$(".cat-toggle").click(function(e) {
	e.preventDefault();
	var id=$(this).attr("data-target");
	$("#"+id).slideDown("fast");
	tidyMenu();
})

///toggle toolsets based on profile
$(".load-tools").click(function(e) {
	e.preventDefault();
	clearWorkflow();
	$("#controls .icat").hide();
	var profile=$(this).attr("data-profile");
	
	if (profile=="guidedMapping"){
		$("#controls #questions, #controls #pallets").slideDown("fast");
	}
	if (profile=="freehandMapping"){
		$("#controls #templates, #controls #pallets").slideDown("fast");
	}
	if (profile=="samples"){
		$("#controls #templates").slideDown("fast");
	}
	tidyMenu();
})

// to remove 'end' class on right menu for styling dividers
function tidyMenu() {
	$("#controls .ipanel.icat").removeClass('end');
	$("#controls .ipanel.icat:visible:last").addClass('end');
}

///temporary  variables to emulate saving to db
var savedWorkflows,  savedSketch;

if(!savedWorkflows){
 $("#load-saved").hide();
}
////



$(".new-workflow").click(function() {
	clearWorkflow();
})


$(".new-workArea").click(function() {
	addWorkArea();
})

function addWorkArea(){
	alert("to do : Add new sheet")
	var workAreaId="newflow"+ workAreaCount
	
	var item = $('<div class="workArea" id="'+workAreaId+'"><div id="'+workAreaId+'-canvas" class="dragArea canvas"></div></div>');
	var tab=$('<li><a href="#" data-target="'+workAreaId+'">'+workAreaId+'</a></li>')
	
	$('#workAreaWrapper').append(item);
	$('#flowTabs').append(tab);
	
	
	$(tab).find('a').click(function(e) {
		e.preventDefault();
		$('#flowTabs li').removeClass();
		$(this).parent('li').addClass('active');
		var id=$(this).attr("data-target");
		$('.workArea').removeClass('active');
		$('#'+id).addClass('active');
		switchDrawing();
	});
		
	
	workAreaCount ++;
	
}


$(".load-template").click(function() { 
	var url = $(this).attr("data-template");
	$.get("ajax/"+url, function(data) {
	  var workflow = JSON.parse(data).workflow;
	  
		clearActiveWorkflow();
		// get current work area wrapper for namespacing nodes
		var canvasId = $('.workArea.active .canvas').prop('id');

		  
		loadWorkflow(workflow, canvasId )
	});
})


$("#load-saved").click(function() {
	if(!!savedWorkflows){
		loadWorkflows(savedWorkflows);
	}
	if(!!savedSketch){
		loadSketch(savedSketch);
	}
});


function clearWorkflow(){
	// select all elements in every dragArea and remove
	$(".dragArea .node, .dragArea .connector, .dragArea .connector, .dragArea .connector-graphit, .dragArea .connector-end, .dragArea .destination-label").remove();
	// reset graph-it by emptying canvas object arrays
	var i;
	for(i = 0; i < canvases.length; i++) {
		canvases[i].blocks=[];
		canvases[i].connectors=[];
	}
}

function clearActiveWorkflow(){
	// get active dragArea canvas
	currentWorkflow = $('.workArea.active > .dragArea');
	// select all elements on dragArea and delete
	currentWorkflow.find('.node, .connector, .connector-graphit, .connector-end, .destination-label').remove();
	// get id of current dragArea and empty related object array
	var canvas = findCanvas($('.workArea.active > .dragArea').prop('id'));
	canvas.blocks=[];
	canvas.connectors=[];
}

// delete on keypress
$('html').keyup(function(e){ if(e.keyCode == 46) { deleteNodeAndConnectors(); $(".active-calc").remove(); } });
// delete on main trash button press
$('.trash').click(function(){ deleteNodeAndConnectors(); $(".active-calc").remove(); });

function deleteNodeAndConnectors(nodeId) {
	// if nodeId is already known
	nodeId = (typeof nodeId === 'undefined') ? $(".active-node").attr("id") : nodeId;

	// previously: if(nodeId = $(".active-node").attr("id")) {
	// if is node rather than connector
	if(nodeId) {
		
		$("."+nodeId).each(function( index ) {
			var connectorId = $(this).attr("class");
			deleteConnector(connectorId);
		})
		  
		deleteNode(nodeId);
		//deleteNodeAndConnectors(nodeId);
	}
	// if is only connector
	else if($(".selected-connector").length) {
		//if at least one selected connector then find classes belonging to it
		var connectorId = $(".selected-connector").attr("class");
		//only need classes relating to node names block_1 etc
		var splitted = connectorId.split(' ');		
		
		elsToDelete = '.' + splitted[1] + '.' + splitted[2];

		$(elsToDelete).each(function( index ) {
			$(this).removeClass("selected-connector");
			deleteConnector($(this).attr("class"));
		});
	}
}

function deleteNode(id){
	$("#"+id).remove();
	var canvas = findCanvas($('.workArea.active > .dragArea').prop('id'));
	for(i=0; i<canvas.blocks.length; i++){
		if (canvas.blocks[i].id==id){
			canvas.blocks.splice(i,1);
		}
	}
}

function deleteConnector(id){
	var cssSelector=id.replace(/\s+/g, '.');
	
	$("."+cssSelector).remove();
	var canvas = findCanvas($('.workArea.active > .dragArea').prop('id'));

	for(i=0; i<canvas.connectors.length; i++){
		
		if (canvas.connectors[i].id==id){
			canvas.connectors.splice(i,1);
		}
	}
}


function loadSketch(sketch){
	var image = document.getElementById("saved-image");    
	image.src = sketch;
	image.onload = function() {
	  var can = document.getElementById('colors_sketch');
	  var ctx = can.getContext('2d');
	  ctx.drawImage(image,0,0);
	}
	
}
function loadWorkflows(workflows){
	alert("to do : load workflows into sheets")
	 //loadWorkflow(workflow);
}
function loadWorkflow(workflow, canvasId){
	// clear current dragArea canvas
	//clearActiveWorkflow();
	// get current work area wrapper for namespacing nodes
	//var currentArea = $('.workArea.active').prop('id');
	
	// add nodes and connectors
	for (i=0; i<workflow.length; i++){
		var item=workflow[i];
		if (item.iType=="node"){
			//addNode(item.iClass, item.iCaption, item.iTooltip, item.iTop, item.iLeft);
			addGraphitNode(item.iClass, item.iCaption, item.iTooltip, item.iTop, item.iLeft, item.iId+canvasId, canvasId);
		}
		if (item.iType=="connector"){
			//addConnector(item.iDirection, item.iWidth, item.iHeight, item.iTop, item.iLeft);
			addGraphitConnector(item.id1+canvasId, item.id2+canvasId);
		}
	}
}

$(".save-workflow").click(function(e) {
	
	e.preventDefault();
	
	savedWorkflows=[];
	
	$(".canvas").each(function(){
	    var wfId=$(this).attr("id");
		var wf = extractWorkflow(wfId);
		var wfObj={"workflow": wf};
		savedWorkflows.push(wfObj);
	})
	console.log(savedWorkflows)
	
	
	
	//to do save to db or local storage
	var currentSketch = $('#'+$('.workArea.active').prop('id')+'-sketch')[0];

    savedSketch = currentSketch.toDataURL();
	
	// to do add to list of saved workflows
	$("#load-saved").show();
	
});

function extractWorkflow(canvasId){
	
	var workflow=[];
	//get nodes from dom
	$("#" + canvasId + " .node").each(function( index, value ) {
		var item={}
		var left=parseInt($(value).attr("data-x"), 10) || 0;
		var top=parseInt($(value).attr("data-y"), 10) || 0;
		left +=(parseInt($(value).css('left'), 10) || 0);
		top +=(parseInt($(value).css('top'), 10) || 0);
		
		item["iId"]= $(value).attr("id");
		item["iType"]="node";
		item["iClass"]= $(value).find("span.icon").attr("class");
		item["iCaption"]= $(value).find(".text").text();
		item["iTooltip"]= $(value).find(".tooltip").text();
		item["iTop"]= top;
		item["iLeft"]= left;
		
		workflow.push(item)
	})
	
	//get connectors from graph-it
	

	var canvas = findCanvas(canvasId);
	

	//var canvas = findCanvas($('.workArea.active > .dragArea').prop('id'));
	

	for (i=0; i<canvas.connectors.length; i++){
		var item={};
		var id=canvas.connectors[i].id;
		idArray=id.split(" ");
		
		item["iType"]="connector";
		item["id1"]=idArray[1];
		item["id2"]=idArray[2];
		workflow.push(item);
	};
	
	return workflow;
	
}

 //add a node or connector to top of canvas on click
$('.add').click(function(){

	var offSet = 10;
	var numNewElements = $('.node.new').length;

	initLeft = 30 + numNewElements*offSet*3;
	initTop = 30 + numNewElements*offSet;

	var iType=$(this).attr("data-type");
	if(iType=="node"){
		var iClass=$(this).attr("data-class");
		var iCaption=$(this).attr("data-caption");
		var iTooltip=$(this).attr("data-tooltip");
		addNode( iClass, iCaption, iTooltip, 30, 30);
	}
	if(iType=="connector"){
		var direction = $(this).attr("data-direction");
		addConnector( direction, 30, 30, 50, 50); 
	}
	
	
	
	if(iType=="connected-node"){
		var iClass=$(this).attr("data-class");
		var iCaption=$(this).attr("data-caption");
		var iTooltip=$(this).attr("data-tooltip");
		addConnectedNode( iClass, iCaption, iTooltip, 30, 30);
	}
	
	if(iType=="graphit-node"){
		
		var iClass=$(this).attr("data-class");
		var iCaption=$(this).attr("data-caption");
		var iTooltip=$(this).attr("data-tooltip");
		addGraphitNode(iClass, iCaption, iTooltip, initTop, initLeft);
	}
	
	
	if(iType=="guided-node"){
		
		var iId=$(this).attr("data-id");
		var iClass=$(this).attr("data-class"); 
		var iCaption=$(this).attr("data-caption");
		var iTooltip=$(this).attr("data-tooltip");
		var iTop=$(this).attr("data-top");
		var iLeft=$(this).attr("data-left");
		
		
		// if this node exists just swap the data else create it
		//$("#dragArea ." +iId).remove();
		
		if ($("#dragArea ." +iId).length>0){
			swapNode(iClass, iCaption,  iTooltip, iId)
			
		}else{
			deleteNodeAndConnectors(iId)
			addGraphitNode( iClass, iCaption, iTooltip, iTop, iLeft, iId);
			
			var nodeWidth=100;
			var nodeHeight=100;
			var conLength=30;
			var conWidth=15;
			
			var connector = $(this).attr("data-connector");
			
		
			
			if (connector!="none"){
				ids=connector.split(" ");
				addGraphitConnector(ids[0], ids[1]);
				
			}
		}
	}
	
	if(iType=="calc"){
		var iMinWage=$(this).attr("data-minwage"); 
		var iMins=$(this).attr("data-mins");
		addCalc(iMinWage, iMins, 50, 0);
	}
	
})

//swap node
function swapNode(iClass, iCaption,  iTooltip, iId){ 
	var existingNode=$("#dragArea ." +iId)[0];
	$(existingNode).find(".icon").attr("class", "icon " + iClass)
	$(existingNode).find(".text").text( iCaption)
} 

//add node
function addNode(iClass, iCaption,  iTooltip, iTop, iLeft, iId){
	iId=iId || "";
	var item = $('<div  class="node draggable '+iId+'"><span data-toggle="tooltip" data-placement="top"  title="'+ iTooltip +'" class="icon '+iClass+'"></span><p class="text"> '+ iCaption +' </p>   </div>');
	
	 $(item).find('[data-toggle="tooltip"]').tooltip();
	$('#dragArea').append(item);
	item.css( "top", iTop+"px");
	item.css( "left", iLeft+"px");
}

function addGraphitNode(iClass, iCaption,  iTooltip, iTop, iLeft, iId, canvasId){ 
	nodeCount++;
	iId =iId || "node"+nodeCount.toString();
	canvasId = canvasId ||   $('.workArea.active .canvas').prop('id');
	nodeID=iId;
	// create node item

	var item = $('<div id="'+nodeID+'" class="node block draggable-graphit new '+nodeID+'"><span title="Time required" class="glyphicon glyphicon-time time"></span><span data-toggle="tooltip" data-placement="top"  title="'+ iTooltip +'" class="icon '+iClass+'"></span><p class="text">' + iCaption + '</p></div>');
		
	$(item).find('[data-toggle="tooltip"]').tooltip();
	$('#'+canvasId).append(item);
	item.css( "top", iTop+"px");
	item.css( "left", iLeft+"px");
			
	var element = document.getElementById(nodeID);
	//var activeWorkflow = $('.workArea.active > .dragArea').prop('id');
	
	var canvas = findCanvas(canvasId); 
	var newBlock = new Block(element, canvas);
	newBlock.initBlock();
	canvas.blocks.push(newBlock);
				
	$('#'+nodeID).on('click touchstart', function(){
		makeActive(this);
		connectToActiveNode(this);
	});

	
		
}

function addGraphitConnector(id1, id2){
																																																						
	if ($('.connector-graphit.'+id1+'.'+ id2).length==0) {
	
		var newdiv = document.createElement('div');
		newdiv.setAttribute('class','connector-graphit '+id1+' '+ id2);

		var newlabel = document.createElement('label');
		newlabel.setAttribute('class','destination-label ' +id1+' '+ id2);

		var newarrow = document.createElement('img');
		newarrow.setAttribute('class','connector-end ' +id1+' '+ id2);
		newarrow.setAttribute('src','images/arrow.png');
		newarrow.setAttribute('width','7');
		newarrow.setAttribute('height','7');

		newdiv.appendChild(newlabel);
		newdiv.appendChild(newarrow);

		var activeWorkflow = $('.workArea.active > .dragArea')[0];	
		activeWorkflow.appendChild(newdiv);
		var canvas = findCanvas(activeWorkflow.id); 
		var newConnector = new Connector(newdiv, canvas);
		newConnector.initConnector();
		canvas.connectors.push(newConnector);

		$(newlabel).on('click touchstart', function(){
			classes = this.dataset.parent;
				
			$('.connector-graphit').each(function() {
				$(this).removeClass('selected-connector');
				if($(this).hasClass(classes))
					$(this).addClass('selected-connector');
				}
			);
		});

		return true;
	}

	return false;
}


function addCalc(iMinwage, iMins, iTop, iLeft){ 

		nodeCount++;
		iId ="code"+nodeCount.toString();
		
		var item = $('<div id="'+iId+'" class="calc draggable" data-minwage="'+ iMinwage +'"><h5> Benefits </h5> <p>mins saved: <span class="mins">'+ iMins+'</span><p> <p>annual saving: $<span class="saving">0</span><p></div>');
		$('.workArea.active > .dragArea').append(item);
		item.css( "top", iTop+"px");
		item.css( "left", iLeft+"px");
		
}


// graphit connector utilities

$(".destination-label").on('click touchstart', function() {
	classes = this.dataset.parent
	

	$('.connector-graphit').each(function() {
		$(this).removeClass('selected-connector');
		if($(this).hasClass(classes))
			$(this).addClass('selected-connector');
		}
	);
});

// graphit node utility
$(".node ").on('click touchstart',function() {	
	makeActive(event.target);
	connectToActiveNode(event.target);
})

function makeActive(elem){ 
	node = $(elem).hasClass("node") ? $(elem) : $(event.target).parents(".node");

	if ($(node).hasClass("dragged")){		
		$(node).removeClass("dragged");
		$(node).removeClass("active-node");
		clearNodeData();
	}
	else {		
		$(node).addClass("active-node");
		$("#nodedata").slideDown();
		tidyMenu();
		loadNodeData(node);		
	}
}

function connectToActiveNode(elem){
	// gets node from direct click or child click
	node = $(elem).hasClass("node") ? $(elem) : $(event.target).parents(".node");
	// current node become the end
	endNodeId=node.attr("id");
	
	// to find any other selected nodes
	var beginNodeId;
	var activeNodes=$(".active-node");
	for(i=0; i<activeNodes.length; i++){
		var id= $(activeNodes[i]).attr("id");
		if(id != endNodeId){
			// if found, other node becomes beginning
			beginNodeId=id;
		}
	}
		
	// if there are two different nodes selected...	
	if(!!beginNodeId && !!endNodeId){
		// test if already connected and connected
		if(addGraphitConnector(beginNodeId, endNodeId)){
			$(".node").removeClass("active-node");
			clearNodeData();
		}
		// deselect previous node if already connected
		else
			$('#'+beginNodeId).removeClass("active-node");
	}
	
}

//add node
function addConnectedNode(iClass, iCaption,  iTooltip, iTop, iLeft, iId){
		iId=iId || "";
		var item = $('<div  class="node draggable '+iId+'"><span  data-toggle="tooltip" data-placement="top"  title="'+ iTooltip +'" class="icon '+iClass+'"></span><p class="text"> '+ iCaption +' </p></div>');
		
		var upcon=$('<div data-direction="up" class="connector resize-nodrag up" style="width: 30px; height: 30px; bottom: 90px; left: 35px;"></div>');
		var downcon=$('<div data-direction="down" class="connector resize-nodrag down" style="width: 30px; height: 30px; top: 90px; left: 35px;"></div>');
		var rightcon=$('<div data-direction="right" class="connector resize-nodrag right" style="width: 30px; height: 30px; top: 35px; left: 90px;"></div>');
		var leftcon=$('<div data-direction="left" class="connector resize-nodrag left" style="width: 30px; height: 30px; top: 35px; right: 90px;"></div>');
		$(item).append(upcon);
		$(item).append(downcon);
		$(item).append(rightcon);
		$(item).append(leftcon);
		$(item).find('[data-toggle="tooltip"]').tooltip();
		
		$('.workArea.active > .dragArea').append(item);
		item.css( "top", iTop+"px");
		item.css( "left", iLeft+"px");
}

//add connector
function addConnector(iDirection, iWidth, iHeight, iTop, iLeft, iId){
	iId=iId || "";
	var item = $('<div data-direction="'+iDirection+'" class="connector resize-drag '+iDirection+' '+iId+'"></div>');
	$('.workArea.active > .dragArea').append(item);
	item.css( "width", iWidth+"px");
	item.css( "height", iHeight+"px");
	item.css( "top", iTop+"px");
	item.css( "left", iLeft+"px");
}

// code for '.draggin' elements - eg menu items
$('.dragIn').on('dragstart', function(e) { 
	
	//test=e.originalEvent.offsetX
	//test=e.targetTouches[0]
		var data={};
		//var el=e.originalEvent.target
		var el=this;
		var iType=$(el).attr("data-type")
		if (iType=="node"){
			data.iType=iType;
			data.iClass=$(el).attr("data-class");
			data.iCaption=$(el).attr("data-caption");
			data.iTooltip=$(el).attr("data-tooltip");
		}
		if (iType=="graphit-node"){
			data.iType=iType;
			data.iClass=$(el).attr("data-class");
			data.iCaption=$(el).attr("data-caption");
			data.iTooltip=$(el).attr("data-tooltip");
		}
		if (iType=="connector"){
			data.iType=iType;
			data.iDirection=$(el).attr("data-direction");
		}
		if (iType=="connected-node"){
			data.iType=iType;
			data.iClass=$(el).attr("data-class");
			data.iCaption=$(el).attr("data-caption");
			data.iTooltip=$(el).attr("data-tooltip");
		}
		//e.originalEvent.dataTransfer.setData("text", e.target.id);
		
		if (iType=="calc"){
			data.iType=iType;
			data.iMinwage=$(el).attr("data-minwage");
			data.iMins=$(el).attr("data-mins");
		}
		e.originalEvent.dataTransfer.setData("text", JSON.stringify(data));
		//e.dataTransfer.setData("data", JSON.stringify(data));
    }
)




$('.dragArea').on('dragover', function(e) { 
    e.preventDefault();
    e.stopPropagation();
});

$('.dragArea').on('dragenter', function(e) {
    e.preventDefault();
    e.stopPropagation();
});


function objToString (obj) {
    var str = '';
    for (var p in obj) {
        if (obj.hasOwnProperty(p)) {
            str += p + '::' + obj[p] + '\n';
        }
    }
    return str;
}


$('.dragArea').on(
    'drop',
    function(e){
	

	
	var offset=$(".workArea.active > .dragArea").offset()
	var x, y;
	if(!!e.pageX){
	//mouse
		x=e.pageX - offset.left
		y=e.pageY - offset.top
	}else{
	//touch
		x=e.offsetX - offset.left + $(document).scrollLeft();
		y=e.offsetY - offset.top + $(document).scrollTop();
	}
					
	var data = JSON.parse(e.originalEvent.dataTransfer.getData("text"));

	if(data.iType=="node"){
		var xoffset=-50;
		var yoffset=-50;
		addNode(data.iClass, data.iCaption, data.iTooltip, y+yoffset, x+xoffset);
	}
	
	if(data.iType=="graphit-node"){ 
		var xoffset=-50;
		var yoffset=-50;
		addGraphitNode(data.iClass, data.iCaption, data.iTooltip, y+yoffset, x+xoffset);
	}
		
		
	if(data.iType=="connector"){
		var xoffset=0;
		var yoffset=0;
		var iDirection= data.iDirection
		if(iDirection=="up"){xoffset=-15;yoffset=-30;}
		if(iDirection=="down"){xoffset=-15}
		if(iDirection=="left"){yoffset=-15; xoffset=-30}
		if(iDirection=="right"){yoffset=-15}
		addConnector( iDirection, 30, 30, y+yoffset, x+xoffset); 
	}

	if(data.iType=="connected-node"){
		var xoffset=-50;
		var yoffset=-50;
		addConnectedNode(data.iClass, data.iCaption, data.iTooltip, y+yoffset, x+xoffset);
	}
	
	
	if(data.iType=="calc"){ 
		var xoffset=-50;
		var yoffset=-50;
		addCalc(data.iMinwage, data.iMins, y+yoffset, x+xoffset);
	}
		
});
 

 
//INTERACTjs code for '.draggable' elements - eg nodes
interact('.draggable')
  .draggable({
	 snap: {
      targets: [
        interact.createSnapGrid({ x: 20, y: 20 })
      ],
      range: Infinity,
      relativePoints: [ { x: 0, y: 0 } ]
    },
    // enable inertial throwing
    inertia: true,
    // keep the element within the area of it's parent
    restrict: {
      restriction: "parent",
      endOnly: true,
      elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
    },
    // enable autoScroll
    autoScroll: true,

    // call this function on every dragmove event
    onmove: dragMoveListener,
    // call this function on every dragend event
    onend: function (event) {
      var textEl = event.target.querySelector('p');

    }
	
  })
  .on('tap', function (event) {
	 // event.preventDefault();
	// event.stopPropagation();
	var calc
	if ($(event.target).hasClass("calc")){
		calc = $(event.target);
		$(event.target).addClass("active-calc")
		
	}else{
		calc = $(event.target).parents(".calc");
		
	}
	
	$("#calc").slideDown();
	$(calc).addClass("active-calc");
	loadCalcData(calc);
	
  })
  ;
  
  $(".workArea").click(function (event) {   
	//TO DO - too much DOM inspection here on every click - have a think about a more effecient way to deselect a node
	if($(event.target).parents(".node").length==0 && !$(event.target).hasClass("node")  ){
		 $(".node").removeClass("active-node")
		  clearNodeData();
	}
	
	
	if($(event.target).parents(".calc").length==0 && !$(event.target).hasClass("calc")  ){
		 $(".calc").removeClass("active-calc")
		  clearCalcData();
	}

	if($(event.target).parents(".destination-label").length==0 && !$(event.target).hasClass("destination-label")){
		$(".connector-graphit").removeClass("selected-connector");
	}
	
   
});

///////////////////////////////////////
// Tools for loading node data panel //
///////////////////////////////////////

function loadNodeData(node){
	var aId=$(node).attr("id");
	$("#activeData").attr("aId", aId);

	var aTooltip=$(node).find("span.icon")[0].dataset.originalTitle;
	$("#nodedata p#node-information").html(aTooltip).removeClass('empty');

	var aCaption=$(node).find(".text").text();
	$("#activeData #aCaption").val(aCaption);

	var aTimer=$(node).find("span.time").is(':visible');
	if(aTimer) {
		$("#activeData #aTimer").prop('checked',true);
		$("#activeData #aTimeHolder").show();
	}
	else {
		$("#activeData #aTimer").prop('checked',false);
		$("#activeData #aTimeHolder").hide();
	}

	var aTime=$(node).find("span.time").text();
	$("#activeData #aTime").val(aTime);
}

function updateNode(nodeId){
	var node=$(".dragArea #" +nodeId);

	var iCaption=$("#activeData #aCaption").val();
	$(node).find(".text").text(iCaption);

	$("#controls #aTimer").is(':checked') ? $(node).find("span.time").show() : $(node).find("span.time").hide();

	var iTime=$("#activeData #aTime").val();
	$(node)[0].dataset.time = iTime;	
	$(node).find("span.time").text(iTime);
}

function clearNodeData(){
    var aClear="";
	var aId="";
	$("#controls p#node-information").html("nothing selected").addClass('empty');
	$("#activeData #aCaption, #activeData #aTime").val(aClear);
	$("#activeData #aTimer").attr('checked',false);
	$("#activeData #aTimeHolder").hide();
	$("#activeData").attr("aId", aId);
}

$("#activeData input").change(function(){ 
	var aId=$("#activeData").attr("aId");
	if (aId!=""){
		updateNode(aId)
	}
});

$("#controls #deleteNode").click(function(e){
	e.preventDefault();
	var aId=$("#activeData").attr("aId");
	if (aId!=""){
		deleteNodeAndConnectors(aId);
		clearNodeData();
	}
});

$("#controls #aTimer").change(function() {
	if ($(this).is(':checked')) {
		$("#aTimeHolder").show();
	}
	else {
		$("#aTimeHolder").hide();
	}
});

///////////////////////////////////////
// Tools for loading CS Calculator   //
///////////////////////////////////////

function loadCalcData(calc){
	// var aMinwage=parseFloat($(calc).find(".minwage").text());
	var aMinwage=parseFloat($(calc).attr("data-minwage"));

	var aMins=parseFloat($(calc).find(".mins").text());
	var aId=$(calc).attr("id");
	$("#calcData #aMinwage").val(aMinwage);
	$("#calcData #aMins").val(aMins);
	$("#calcData ").attr("aId", aId);
	$("#calcData input").removeAttr('disabled');
}

function updateCalc(calcId){
	var calc=$(".dragArea #" +calcId);
	var iMinwage=parseFloat($("#calcData #aMinwage").val());
	var iMins=parseFloat($("#calcData #aMins").val());
	var iSaving=(iMinwage/60) * iMins * 5 * 5 * 45;
	//$(calc).find(".minwage").text(iMinwage);
	$(calc).attr("data-minwage", iMinwage);
	$(calc).find(".mins").text(iMins);
	$(calc).find(".saving").text(iSaving.toFixed(2));
}
 
function clearCalcData(){
	  var aMinwage="";
	  var aMins="";
	  var aId="";
	  $("#calcData #aMinwage").val(aMinwage);
	  $("#calcData #aMins").val(aMins);
	  $("#calcData ").attr("aId", aId);
	  $("#calcData input").attr('disabled','disabled');
}
 
$("#calcData input").change( function(){ 
	var aId=$("#calcData ").attr("aId")
	if (aId!=""){
		updateCalc(aId);
	}
});
 
$("#activeData #deleteNode").click( function(e){
	e.preventDefault();
	var aId=$("#activeData ").attr("aId")
	if (aId!=""){
		deleteNodeAndConnectors(aId);
		clearNodeData();
	}
});

///////////////////////////////////////
// tabbing workflows                 //
///////////////////////////////////////

$('#flowTabs li a').click(function(e) {
	e.preventDefault();
	$('#flowTabs li').removeClass();
	$(this).parent('li').addClass('active');
	var id=$(this).attr("data-target");
	$('.workArea').removeClass('active');
	$('#'+id).addClass('active');
	switchDrawing();
});

function switchDrawing() {
	$(".drawArea").hide();
	if($('#drawControls').is(':visible'))
		$(".workArea.active > .drawArea").show();
}



///////////////////////////////////////
// old interact code                 //
///////////////////////////////////////
 
  interact('.draggable .text')
  .on('tap', function (event) {
	event.preventDefault();
	var txt=$(event.target).text();
	
	bootbox.prompt({
	  title: "Edit text",
	  value: txt,
	  callback: function(result) {
		  if(result !=null){
			  $(event.target).text(result)
		  }
		
	  }
	});
	
  
  });

  function dragMoveListener (event) {
    var target = event.target,
        // keep the dragged position in the data-x/data-y attributes
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    // translate the element
    target.style.webkitTransform =
    target.style.transform =
      'translate(' + x + 'px, ' + y + 'px)';

    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
  }

  // this is used later in the resizing and gesture demos
  window.dragMoveListener = dragMoveListener;
  
  
  
  
  
  
  
  
 // INTERACTjs code for trash can
  interact('.dropzone').dropzone({
  // only accept elements matching this CSS selector
  accept: ' .resize-drag, .node',
  // Require a 75% element overlap for a drop to be possible
  overlap: 0.1,

  // listen for drop related events:

  ondropactivate: function (event) {
    // add active dropzone feedback
    event.target.classList.add('drop-active');
  },
  ondragenter: function (event) {
    var draggableElement = event.relatedTarget,
        dropzoneElement = event.target;

    // feedback the possibility of a drop
    dropzoneElement.classList.add('drop-target');
    draggableElement.classList.add('can-drop');
    //draggableElement.textContent = 'Dragged in';
  },
  ondragleave: function (event) {
    // remove the drop feedback style
    event.target.classList.remove('drop-target');
    event.relatedTarget.classList.remove('can-drop');
    //event.relatedTarget.textContent = 'Dragged out';
  },
  ondrop: function (event) {
    //event.relatedTarget.textContent = 'Dropped';
	 $(event.relatedTarget).remove();
  },
  ondropdeactivate: function (event) {
    // remove active dropzone feedback
    event.target.classList.remove('drop-active');
    event.target.classList.remove('drop-target');
  }
});


 // INTERACTjs code for resizable draggable elements e.g. connectors
  //resizable only vertically

    interact('.resize-nodrag.up, .resize-nodrag.down')
  .draggable({
	
    // enable autoScroll
    autoScroll: true,
    onmove: window.dragMoveListener
  })
  .resizable({
    preserveAspectRatio: false,
	edges: { left: false, right: false, bottom: true, top: true }
  })
  .on('resizemove', function (event) {
    var target = event.target,
	
        x = (parseFloat(target.getAttribute('data-x')) || 0),
        y = (parseFloat(target.getAttribute('data-y')) || 0);
    // update the element's style
	var min =parseInt($(target).css("min-height"))
	if(event.rect.height>min){
		$(target).addClass("active-connector");
	}else{
		$(target).removeClass("active-connector");
	}
	
    target.style.width  = event.rect.width + 'px';
    target.style.height = event.rect.height + 'px';
    // translate when resizing from top or left edges
    x += event.deltaRect.left;
    y += event.deltaRect.top;
    //target.style.webkitTransform = target.style.transform =
    //    'translate(' + x + 'px,' + y + 'px)';
   // target.setAttribute('data-x', x);
   // target.setAttribute('data-y', y);
  });
  

  //resizable only horizontally
    interact('.resize-nodrag.left, .resize-nodrag.right')
  .draggable({
	
    
    // enable autoScroll
    autoScroll: true,
    onmove: window.dragMoveListener
  })
  .resizable({
    preserveAspectRatio: false,
	edges: { left: true, right: true, bottom: false, top: false }
  })
  .on('resizemove', function (event) {
    var target = event.target,
        x = (parseFloat(target.getAttribute('data-x')) || 0),
        y = (parseFloat(target.getAttribute('data-y')) || 0);
    // update the element's style
	var min =parseInt($(target).css("min-width"))
	if(event.rect.width>min){
		$(target).addClass("active-connector");
	}else{
		$(target).removeClass("active-connector");
	}
	
	
    target.style.width  = event.rect.width + 'px';
    target.style.height = event.rect.height + 'px';
    // translate when resizing from top or left edges
    x += event.deltaRect.left;
    y += event.deltaRect.top;
	
	
    //target.style.webkitTransform = target.style.transform =
    //    'translate(' + x + 'px,' + y + 'px)';
   // target.setAttribute('data-x', x);
   // target.setAttribute('data-y', y);
  });
  
  
  
  
 //resizable and move vertically
  interact('.resize-drag.up, .resize-drag.down')
  .draggable({
	snap: {
      targets: [
        interact.createSnapGrid({ x: 20, y: 20 })
      ],
      range: Infinity,
      relativePoints: [ { x: 0, y: 0 } ]
    },
	// enable inertial throwing
    inertia: true,
    // keep the element within the area of it's parent
    restrict: {
      restriction: "parent",
      endOnly: true,
      elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
    },
    // enable autoScroll
    autoScroll: true,
	
    onmove: window.dragMoveListener
  })
  .resizable({
    preserveAspectRatio: false,
	edges: { left: false, right: false, bottom: true, top: true }
  })
  .on('resizemove', function (event) {
    var target = event.target,
        x = (parseFloat(target.getAttribute('data-x')) || 0),
        y = (parseFloat(target.getAttribute('data-y')) || 0);
    // update the element's style
	
	
    target.style.width  = event.rect.width + 'px';
    target.style.height = event.rect.height + 'px';
    // translate when resizing from top or left edges
    x += event.deltaRect.left;
    y += event.deltaRect.top;
    target.style.webkitTransform = target.style.transform =
        'translate(' + x + 'px,' + y + 'px)';
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
  });
  
   //resizable and move horizontally
   interact('.resize-drag.left, .resize-drag.right')
  .draggable({
	snap: {
      targets: [
        interact.createSnapGrid({ x: 20, y: 20 })
      ],
      range: Infinity,
      relativePoints: [ { x: 0, y: 0 } ]
    },
   // enable inertial throwing
    inertia: true,
    // keep the element within the area of it's parent
    restrict: {
      restriction: "parent",
      endOnly: true,
      elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
    },
    // enable autoScroll
    autoScroll: true,
    onmove: window.dragMoveListener
  })
  .resizable({
    preserveAspectRatio: false,
	edges: { left: true, right: true, bottom: false, top: false }
  })
  .on('resizemove', function (event) {
    var target = event.target,
        x = (parseFloat(target.getAttribute('data-x')) || 0),
        y = (parseFloat(target.getAttribute('data-y')) || 0);
    // update the element's style
    target.style.width  = event.rect.width + 'px';
    target.style.height = event.rect.height + 'px';
    // translate when resizing from top or left edges
    x += event.deltaRect.left;
    y += event.deltaRect.top;
    target.style.webkitTransform = target.style.transform =
        'translate(' + x + 'px,' + y + 'px)';
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
  });

// SAVE TO PDF
function savetopdf() {
	
	pdfWorkflow=JSON.stringify(extractWorkflow());
	
	var pdfhandler = 'http://192.168.3.26/EvoHtmlToPdfHandler/asehandler.ashx?';
	var pdfsource = 'http://192.168.3.26/workflow/pdf.asp?workflow='+pdfWorkflow;
	var pdfdelay = '3';
	var pdffilename = 'workflow';
	var pdfuserid = '35499';

	handlerURL = pdfhandler + 'evosource=url&evourl=' + pdfsource + '&evodelay=' + pdfdelay + '&evofilename=' + pdffilename + '_DATE_TIME.pdf&evouserid=' + pdfuserid;
	
	
	
	window.location.href = handlerURL
	//window.location.href = pdfsource
	
}

	$('#savetopdf').click(function() {	
		savetopdf();
		return false;
	});
  
	// CODE FOR SKETCH PAD
	var sketch

	$('.drawArea canvas.colors_sketch').each(function() {
		var thisSketch = $(this).sketch();
		//console.log(thisSketch[0].id);
		//$('.colors_sketch').sketch();
	});

	$(".drawArea, #drawControls").hide();
	 
	$("#toggle-draw").click(function(){
		//$("#drawArea").fadeToggle("fast");
		$(".workArea.active > .drawArea, #drawControls").toggle();
	});

	$(".color-picker, .eraser-picker").click(function(){
		$(".color-picker, .eraser-picker").removeClass("active");
		$(this).addClass("active");
	});
	  
	$(".brush-picker").click(function(){
		$(".brush-picker").removeClass("active");
		$(this).addClass("active");
	});

});