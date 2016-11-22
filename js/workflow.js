$( document ).ready(function() {
///initialise graphit	
initPageObjects();
// incrementa node ID
var nodeCount=0;
	
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
var savedWorkflow,  savedSketch;

if(!savedWorkflow){
 $("#load-saved").hide();
}
////



$(".new-workflow").click(function() {
		clearWorkflow();
})

$(".load-template").click(function() { 
	var url = $(this).attr("data-template");
	$.get("ajax/"+url, function(data) {
	  var workflow = JSON.parse(data).workflow;
		loadWorkflow(workflow)
	});
})


$("#load-saved").click(function() {
	if(!!savedWorkflow){
		loadWorkflow(savedWorkflow)
	}
	if(!!savedSketch){
		loadSketch(savedSketch)
	}
})


function clearWorkflow(){
	
	$("#dragArea .node, #dragArea .connector, #dragArea .connector, #dragArea .connector-graphit, #dragArea .connector-end ,#dragArea .destination-label").remove();
	//reset graph-it
	var canvas = findCanvas('dragArea');
	canvas.blocks=[];
	canvas.connectors=[];
}

$('html').keyup(function(e){
    if(e.keyCode == 46) {
	
    	if(nodeId = $(".active-node").attr("id")) {
			deleteNodeAndConnectors(nodeId);
		}
		else if($(".selected-connector").length) {
			//if at least one selected connector then find classes belonging to it
			var connectorId = $(".selected-connector").attr("class");
			//only need classes relating to node names block_1 etc
			var splitted = connectorId.split(' ');		
			
			elsToDelete = '.' + splitted[1] + '.' + splitted[2];

			$(elsToDelete).each(function( index ) {
				//console.log( $(this).attr("class"));
				$(this).removeClass("selected-connector");
				deleteConnector($(this).attr("class"));
			});
		}
    }
});

function deleteNodeAndConnectors(nodeId){
	 //find all connectors with nodeId in classname
	  $("."+nodeId).each(function( index ) {
		 //console.log( $(this).attr("class"));
		 var connectorId = $(this).attr("class");
		 deleteConnector(connectorId);
	  })
	  
	  deleteNode(nodeId);
}

function deleteNode(id){
	$("#"+id).remove();
	var canvas = findCanvas('dragArea');
	for(i=0; i<canvas.blocks.length; i++){
		if (canvas.blocks[i].id==id){
			canvas.blocks.splice(i,1);
		}
	}
}

function deleteConnector(id){
	var cssSelector=id.replace(/\s+/g, '.');
	//console.log(cssSelector);
	$("."+cssSelector).remove();
	var canvas = findCanvas('dragArea');
	//console.log(id);
	for(i=0; i<canvas.connectors.length; i++){
		//console.log(canvas.connectors[i].id);
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

function loadWorkflow(workflow){
	
	clearWorkflow();
	
	// add nodes and connectors
	 for (i=0; i<workflow.length; i++){
		var item=workflow[i];
		if (item.iType=="node"){
			//addNode(item.iClass, item.iCaption, item.iTooltip, item.iTop, item.iLeft);
			addGraphitNode(item.iClass, item.iCaption, item.iTooltip, item.iTop, item.iLeft, item.iId);
		}
		if (item.iType=="connector"){
			//addConnector(item.iDirection, item.iWidth, item.iHeight, item.iTop, item.iLeft);
			addGraphitConnector(item.id1, item.id2);
		}
	}
}


	
$(".save-workflow").click(function(e) {
	
	
	e.preventDefault();
	var workflow=[];
	//get nodes from dom
	$("#dragArea .node").each(function( index, value ) {
		var item={}
		var left=parseInt($(value).attr("data-x"), 10) || 0;
		var top=parseInt($(value).attr("data-y"), 10) || 0;
		left +=(parseInt($(value).css('left'), 10) || 0);
		top +=(parseInt($(value).css('top'), 10) || 0);
		
		item["iId"]= $(value).attr("id");;
		item["iType"]="node";
		item["iClass"]= $(value).find("span").attr("class");
		item["iCaption"]= $(value).find(".text").text();
		item["iTooltip"]= $(value).find(".tooltip").text();
		item["iTop"]= top;
		item["iLeft"]= left;
		
		workflow.push(item)
	})
	
	//get connectors from graph-it
	
	var canvas = findCanvas('dragArea');
	
	for (i=0; i<canvas.connectors.length; i++){
		var item={};
		var id=canvas.connectors[i].id;
		idArray=id.split(" ");
		
		item["iType"]="connector";
		item["id1"]=idArray[1];
		item["id2"]=idArray[2];
		workflow.push(item);
	};
	
	/*
	$("#dragArea .connector").each(function( index, value ) {
		var item={}
		var left=parseInt($(value).attr("data-x"), 10) || 0;
		var top=parseInt($(value).attr("data-y"), 10) || 0;
		left +=(parseInt($(value).css('left'), 10) || 0);
		top +=(parseInt($(value).css('top'), 10) || 0);
		
		item["iType"]="connector";
		item["iDirection"]= $(value).attr("data-direction");
		item["iWidth"]= parseInt($(value).css("width"), 10);
		item["iHeight"]= parseInt($(value).css("height"), 10);
		item["iTop"]= top;
		item["iLeft"]= left;
		
		workflow.push(item)
	})
	*/
	console.log(workflow)
	//to do save to db or local storage
	savedWorkflow=workflow;
	
	
	//to do save to db or local storage
	var c = document.getElementById("colors_sketch");
    savedSketch = c.toDataURL();
	//console.log(savedSketch);
	
	// to do add to list of saved workflows
	$("#load-saved").show();
	
	
});



 //add a node or connector to top of canvas on click
$('.add').click(function(){

	var iType=$(this).attr("data-type");
	if(iType=="node"){
		var iClass=$(this).attr("data-class");
		var iCaption=$(this).attr("data-caption");
		var iTooltip=$(this).attr("data-tooltip");
		addNode( iClass, iCaption, iTooltip, 50, 0);
	}
	if(iType=="connector"){
		var direction = $(this).attr("data-direction");
		addConnector( direction, 30, 30, 50, 50); 
	}
	
	if(iType=="connected-node"){
		var iClass=$(this).attr("data-class");
		var iCaption=$(this).attr("data-caption");
		var iTooltip=$(this).attr("data-tooltip");
		addConnectedNode( iClass, iCaption, iTooltip, 50, 0);
	}
	
	if(iType=="graphit-node"){
		var iClass=$(this).attr("data-class");
		var iCaption=$(this).attr("data-caption");
		var iTooltip=$(this).attr("data-tooltip");
		addGraphitNode( iClass, iCaption, iTooltip, 50, 0);
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
			
			console.log (direction)
			
			if (connector!="none"){
				ids=connector.split(" ");
				addGraphitConnector(ids[0], ids[1]);
				
			}
		}
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

function addGraphitNode(iClass, iCaption,  iTooltip, iTop, iLeft, iId){ 
		//iId=iId || "";
		nodeCount++;
		iId =iId || "node"+nodeCount.toString();
		nodeID=iId;
		var item = $('<div id="'+nodeID+'" class="node block draggable-graphit '+nodeID+'"><span data-toggle="tooltip" data-placement="top"  title="'+ iTooltip +'" class="icon '+iClass+'"></span><p class="text"> '+ iCaption +' </p>   </div>');
		
		 $(item).find('[data-toggle="tooltip"]').tooltip();
		$('#dragArea').prepend(item);
		item.css( "top", iTop+"px");
		item.css( "left", iLeft+"px");
		
		
		var element = document.getElementById(nodeID);
		var canvas = findCanvas('dragArea');
		var newBlock = new Block(element, canvas);
		newBlock.initBlock();
		canvas.blocks.push(newBlock);
		
		var previousNodeID='node'+ (nodeCount-1).toString();
		
		
		$('#'+nodeID).on('click touchstart', function(){
			makeActive(this);
			connectToActiveNode(this);
			})
		
		if($('#dragArea').find('#'+previousNodeID).length>0){
			
			//addGraphitConnector(nodeID, previousNodeID)
			
			
		}
		
}

function addGraphitConnector(id1, id2){
																																																						
	if ($('.connector-graphit.'+id1+'.'+ id2).length==0){
	
	var newdiv = document.createElement('div');
	newdiv.setAttribute('class','connector-graphit '+id1+' '+ id2);

	var newlabel = document.createElement('label');
	newlabel.setAttribute('class','destination-label ' +id1+' '+ id2);

	var newarrow = document.createElement('img');
	newarrow.setAttribute('class','connector-end ' +id1+' '+ id2);
	newarrow.setAttribute('src','images/arrow.png');

	newdiv.appendChild(newlabel);
	newdiv.appendChild(newarrow);
			
	var ni = document.getElementById('dragArea');
	ni.appendChild(newdiv);
	var canvas = findCanvas('dragArea');
	var newConnector = new Connector(newdiv, canvas);
	newConnector.initConnector();
	canvas.connectors.push(newConnector);

	$(newlabel).on('click touchstart', function(){
		classes = this.dataset.parent
		//console.log(classes);
		
		$('.connector-graphit').each(function() {
			$(this).removeClass('selected-connector');
			if($(this).hasClass(classes))
				$(this).addClass('selected-connector');
			}
		);
	})
	}
}

// graphit connector utilities

$(".destination-label").on('click touchstart', function() {
	classes = this.dataset.parent
	//console.log(classes);

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
	if ($(elem).hasClass("node")){
		node = $(elem);
	}else{
		node = $(event.target).parents(".node");
	}
	if ($(node).hasClass("dragged")){
		$(node).removeClass("dragged");
		$(node).removeClass("active-node");
	}else{
		
		$(node).addClass("active-node");
		loadNodeData(node);
		
		$("#nodedata").slideDown();
	}
}




function connectToActiveNode(elem){
		if ($(elem).hasClass("node")){
			node = $(elem);
		}else{
			node = $(event.target).parents(".node");
		}
		childNodeId=node.attr("id")
	
		var parentNodeId;
		var activeNodes=$(".active-node")
		for(i=0; i<activeNodes.length; i++){
			var id= $(activeNodes[i]).attr("id")
				if(id!=childNodeId){parentNodeId=id}
		}
		
			
		if(!!parentNodeId && !!childNodeId){
			console.log(childNodeId)
			console.log(parentNodeId)
			addGraphitConnector(parentNodeId, childNodeId);
			$(".node").removeClass("active-node");
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
		
		$('#dragArea').append(item);
		item.css( "top", iTop+"px");
		item.css( "left", iLeft+"px");
}





//add connector
function addConnector(iDirection, iWidth, iHeight, iTop, iLeft, iId){
	iId=iId || "";
	var item = $('<div data-direction="'+iDirection+'" class="connector resize-drag '+iDirection+' '+iId+'"></div>');
	$('#dragArea').append(item);
	item.css( "width", iWidth+"px");
	item.css( "height", iHeight+"px");
	item.css( "top", iTop+"px");
	item.css( "left", iLeft+"px");
}

// code for '.draggin' elements - eg menu items
$('.dragIn').on(
    'dragstart',
	function(e) { 
	
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
		
		
		e.originalEvent.dataTransfer.setData("text", JSON.stringify(data));
		//e.dataTransfer.setData("data", JSON.stringify(data));
    }
)



$('#dragArea').on(
    'dragover',
    function(e) { 
        e.preventDefault();
        e.stopPropagation();
    }
)
$('#dragArea').on(
    'dragenter',
    function(e) {
        e.preventDefault();
        e.stopPropagation();
    }
)

function objToString (obj) {
    var str = '';
    for (var p in obj) {
        if (obj.hasOwnProperty(p)) {
            str += p + '::' + obj[p] + '\n';
        }
    }
    return str;
}

$('#dragArea').on(
    'drop',
    function(e){
	
	

	
		// to do : allow for drop zone offset 
		// to do : allow for scrolled screen 
		
		var offset=$("#dragArea").offset()
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
		
})
 

 
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
	var node
	if ($(event.target).hasClass("node")){
		node = $(event.target);
		$(event.target).addClass("active-node")
	}else{
		node = $(event.target).parents(".node");
	}
	$(node).addClass("active-node");
	
	$("#nodedata").slideDown();
	
  })
  ;
  
  $("#workArea").click(function (event) {   
	//TO DO - too much DOM inspection here on every click - have a think about a more effecient way to deselect a node
	if($(event.target).parents(".node").length==0 && !$(event.target).hasClass("node")  ){
		 $(".node").removeClass("active-node")
		 
		  clearNodeData();
		// $("#nodedata").slideUp();
	}

	if($(event.target).parents(".destination-label").length==0 && !$(event.target).hasClass("destination-label")){
		$(".connector-graphit").removeClass("selected-connector");
	}
	
   
});
 function loadNodeData(node){
	    var aCaption=$(node).find(".text").text();
		var aId=$(node).attr("id");
		$("#activeData #aCaption").val(aCaption)
		$("#activeData ").attr("aId", aId)
}

 function updateNode(nodeId){
	 console.log(nodeId)
		var node=$("#dragArea #" +nodeId)
		
		var iCaption=$("#activeData #aCaption").val();
	    $(node).find(".text").text(iCaption);
		
}
 function clearNodeData(){
	    var aCaption="";
		var aId="";
		$("#activeData #aCaption").val(aCaption)
		$("#activeData ").attr("aId", aId)
 }
 
 $("#activeData input").change( function(){ 
	 var aId=$("#activeData ").attr("aId")
	 if (aId!=""){
		updateNode(aId)
	 }
 })
  $("#activeData #deleteNode").click( function(e){
	  e.preventDefault();
	   var aId=$("#activeData ").attr("aId")
		if (aId!=""){
			deleteNodeAndConnectors(aId);
			clearNodeData();
		}
})
 
 
 
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

	var pdfhandler = 'http://192.168.3.26/EvoHtmlToPdfHandler/asehandler.ashx?';
	var pdfsource = 'bbc.co.uk';
	var pdfdelay = '3';
	var pdffilename = 'workflow';
	var pdfuserid = '35499';

	handlerURL = pdfhandler + 'evosource=url&evourl=' + pdfsource + '&evodelay=' + pdfdelay + '&evofilename=' + pdffilename + '_DATE_TIME.pdf&evouserid=' + pdfuserid;
	
	window.location.href = handlerURL
	
}

$('#savetopdf').click(function() {
	savetopdf();
	return false;
});
  
// CODE FOR SKETCH PAD
 var sketch
 $("#drawArea, #drawControls").hide();
 
 $("#toggle-draw").click(function(){
	//$("#drawArea").fadeToggle("fast");
	$("#drawArea, #drawControls").toggle();
 })
 
  
    $('#colors_sketch').sketch();


  
  $(".color-picker, .eraser-picker").click(function(){
	 $(".color-picker, .eraser-picker").removeClass("active");
	$(this).addClass("active");
  })
  
   $(".brush-picker").click(function(){
	 $(".brush-picker").removeClass("active");
	$(this).addClass("active");
  })
});