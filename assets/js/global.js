var transList = [];
var transaction = {}
var transCounter = 0;
var total = 0;

// create new transaction and push to array on button click
function pushTrans() {
	transList.push({
		id: transList.length, 
		source: $("#sourceInput").val(), 
		category:$("#categoryInput").val(),
		inflow: parseFloat($("#inflowInput").val()),
		outflow: parseFloat($("#outflowInput").val())
	});
}

// display all transactions onto dom
function displayTrans() {
	$("<li class='transaction' data-index-value='" + (transList.length - 1) + "'> </li>").prependTo(".transaction-list:first-child");
	
	$("<div id='sourceSpan' class='col-sm-4'>" + transList[transList.length - 1].source + "</div>").appendTo(".transaction:first-child");
	
	$("<div id='categorySpan' class='col-sm-4'>" + transList[transList.length - 1].category + "</div>").appendTo(".transaction:first-child");
	
	if(!isNaN(transList[transList.length - 1].inflow)) {
		$("<div id='inflowSpan' class='col-sm-2'>" + transList[transList.length - 1].inflow + "</div>").appendTo(".transaction:first-child");
	} else {
		$("<div id='inflowSpan' class='col-sm-2'> </div>").appendTo(".transaction:first-child")
	}
	
	if(!isNaN(transList[transList.length - 1].outflow)) {
		$("<div id='outflowSpan' class='col-sm-2'>" + transList[transList.length - 1].outflow + "</div>").appendTo(".transaction:first-child");
	} else {
		$("<div id='inflowSpan' class='col-sm-2'></div>").appendTo(".transaction:first-child")
	}
	
	$('.input-field').hide();
}

function calcTotal() {
	total = 0;
	for (var i=0; i < transList.length; i++) {
		if (!isNaN(transList[i].inflow)) {
			total = total + transList[i].inflow;
		} else {
			total = total - transList[i].outflow;
		}
	}
	$("#balanceSpan").html(total);
}

function createTrans() {
	pushTrans();
	displayTrans();
	calcTotal();
}

function addNewTransaction() {
	$("<input id='sourceInput' placeholder='Enter Source' />").prependTo(".source-output");
	$("<input id='categoryInput' placeholder='Enter Category' />").prependTo(".category-output");
	$("<input id='amountInput' placeholder='Enter Amount' />").prependTo(".amount-output");
}

function addNewTransaction() {
	$('.input-field').show();
	$('#new-transaction-btn').hide();
	$('#save-transaction-btn').show();
}

$("#new-transaction-btn").click(function() {
	addNewTransaction()
});

$("#new-transaction-btn").click(function() {
	addNewTransaction()
});

$('#save-transaction-btn').click(function() {
	createTrans();
	$('#save-transaction-btn').hide();
	$('#new-transaction-btn').show();
})

//adds an editButton on .transaction that is clicked. Also removes edit button when another .transaction is clicked.
function addEditButton() {
	//check to make sure editButton doesn't already exist
		$('.editButton').remove();
		$(".transaction.highlight").removeClass('highlight');
		$(this).addClass('highlight');
		$(this).append("<input type='button' class='editButton btn btn-secondary' value='edit' />");
}
$("body").on('click', '.transaction', addEditButton);

function addDeleteButton() {
	$(".deleteButton").remove();
	$(this).append("<input type='button' class='deleteButton' value='delete' />");
}
$("body").on('click', '.transaction', addDeleteButton);	

function deleteTransaction() {
	$('.deleteButton').parent().remove();
}
$("body").on('click', '.deleteButton', deleteTransaction);	

function enterEditMode() {
	$("#saveEdit").remove();
	function sourceEdit() {
		$(".editButton").parent().find('#sourceSpan').html("<input type='text' placeholder='source' id='changeSource' />")
	}
	function categoryEdit() {
		$(".editButton").parent().find('#categorySpan').html("<input type='text' placeholder='category' id='changeCategory' />")
	}
	function inflowEdit() {
		$(".editButton").parent().find('#inflowSpan').html("<input type='text' placeholder='inflow' id='changeInflow' />");
	}
	function outflowEdit() {
		$(".editButton").parent().find('#outflowSpan').html("<input type='text' placeholder='outflow' id='changeOutflow' />");
	}
	function showButtons() {
		$('#saveEditButton').remove();
		$('#cancelEditButton').remove();
		$(".editButton").parent().append("<input type='button' value='save' id='saveEditButton' />"
		 + "<input type='button' value='cancel' id='cancelEditButton' />");

	}		

	showButtons();
	sourceEdit();
	categoryEdit();
	inflowEdit();
	outflowEdit();	
}
//allows user to edit a transaction when editButton is clicked
$("body").on('click', '.editButton', enterEditMode);

function saveEdit() {
	var dataIndex = $(this).closest('.transaction').attr('data-index-value');

	function saveSource() {
		var newSource = $("#changeSource").val();
		transList[dataIndex].source = newSource;
		$("[data-index-value='" + dataIndex + "'").find("#sourceSpan").html(transList[dataIndex].source);
	}

	function saveCategory() {
		var newCategory = $("#changeCategory").val();
		transList[dataIndex].category = newCategory;
		$("[data-index-value='" + dataIndex + "'").find("#categorySpan").html(transList[dataIndex].category);
	}

	function saveInflow() {
		if($("#inflowSpan").length) {
			// var oldInflow = transList[dataIndex].inflow;
			var newInflow = parseFloat($('#changeInflow').val());
			transList[dataIndex].inflow = newInflow;
			// total = ($("#balanceSpan").html() - oldInflow) + newInflow;
			$("[data-index-value='" + dataIndex + "'").find("#inflowSpan").html(transList[dataIndex].inflow);
			// $("#balanceSpan").html(total);
			calcTotal();
		}
	}

	function saveOutflow() {
		if($("#outflowSpan").length) {
			// var oldOutflow = transList[dataIndex].outflow;
			var newOutflow = parseFloat($('#changeOutflow').val());
			transList[dataIndex].outflow = newOutflow;
			// total = (parseFloat($("#total").html()) + parseFloat(oldOutflow)) - parseFloat(newOutflow);
			$("[data-index-value='" + dataIndex + "'").find("#outflowSpan").html(transList[dataIndex].outflow);
			// $("#balanceSpan").html("$" + total);
			calcTotal();
		}
	}

	saveSource();
	saveCategory();
	saveInflow();
	saveOutflow();
	removeButtons();

}
$("body").on('click', '#saveEditButton', saveEdit);

function cancelEdit() {
		var dataIndex = $(this).closest('.transaction').attr('data-index-value');

	$("#sourceSpan").html(transList[dataIndex].source);
	$("#categorySpan").html(transList[dataIndex].category);
	if (transList[dataIndex].inflow) {
		$("#inflowSpan").html(transList[dataIndex].inflow);
	}
	if (transList[dataIndex].outflow) {
		$("#outflowSpan").html(transList[dataIndex].outflow);
	}
	$("#saveEditButton").remove();
	$("#cancelEditButton").remove();
}
$("body").on('click', '#cancelEditButton', cancelEdit);


function removeButtons() {
	$('.transaction input').remove();	
}

$("#saveEditButton").click(function() {
	createTrans();	
});


function newTrans() {
	function deleteTransactionObject() {
		var dataIndex = $(".deleteButton").closest(".transaction").attr('data-index-value');
		transList.splice(dataIndex, 1);
	}

	


	


	$("body").on('click', '.deleteButton', deleteTransactionObject);

	
};








