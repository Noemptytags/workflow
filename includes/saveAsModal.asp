<!-- Modal -->
<div class="modal fade" id="saveAsModal" tabindex="-1" role="dialog" aria-labelledby="saveAsModalLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="myModalLabel">Save As</h4>
      </div>
      <div class="modal-body">
	  
		  <form>
			<div class="form-group">
				<label for="customerName">Customer Name</label>
				<select id="customerName" class="form-control">
					<option>Customer 1</option>
					<option>Customer 2</option>
					<option>Customer 3</option>
				</select>
			 </div>
			 
			 <div class="form-group">
				<label for="">Version</label>
				<input type="text" class="form-control" id="" placeholder="1">
			 </div>
			 
			 <div class="form-group">
				<label for="">Workflow Solution</label>
				<input type="text" class="form-control" id="" placeholder="Workflow Solution">
			 </div>
			 
			 <div class="form-group">
				<label for="">Special Tags</label>
				<input type="text" class="form-control" id="" placeholder="Special Tags">
			 </div>
			 
			<div class="checkbox">
				<label>
				  <input type="checkbox"> Private
				</label>
			</div>
			 
			  <div class="form-group">
				<label for="">Notes</label>
				<input type="text" class="form-control" id="" placeholder="Notes">
			 </div>
			 
		  </form>
	  
	  
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary save-workflow" data-dismiss="modal">Save changes</button>
      </div>
    </div>
  </div>
</div>