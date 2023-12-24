function navigate2(pageLink)
{	
	window.location.href = pageLink;
}

function setPopupContent(frmId, title, msg)
{
	if (title == '') title = 'Confirmation Dialog';
	if (msg == '') msg = 'Are you sure to delete this record?';
	
	// Here set content to popup
	$("#confirmation_modal_title").html(title);	
	$("#confirmation_modal_msg").html(msg);		
	$("#confirmation_modal_frmId").val(frmId);	
}

function frmSubmit(frmId)
{
	document.getElementById(frmId).submit(); 
}

function popupSubmtBtnAction()
{
	var frmId = $("#confirmation_modal_frmId").val();
	frmSubmit(frmId);	
}