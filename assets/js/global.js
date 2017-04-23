var transList = [];
var transaction = {}
var transCounter = 0;
// var total = 0;

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




function newTrans() {

	//adds an editButton on .transaction that is clicked. Also removes edit button when another .transaction is clicked.
	function addEditButton() {
		$(".editButton").remove();
		$(".transaction.highlight").removeClass('highlight');
		$(this).addClass('highlight');
		$(this).append("<input type='button' class='editButton' value='edit' />");
	}

	function addDeleteButton() {
		$(".deleteButton").remove();
		$(this).append("<input type='button' class='deleteButton' value='delete' />");
	}

	function saveEdit() {
		function saveSource() {
			var dataIndex = $("#changeSource").closest(".transaction").attr('data-index-value');
			var newSource = $("#changeSource").val();
			transList[dataIndex].source = newSource;
			$("[data-index-value='" + dataIndex + "'").find("p #sourceSpan").html(newSource);
			
		}
		function saveCategory() {
			var dataIndex = $("#changeCategory").closest(".transaction").attr('data-index-value');
			var newCategory = $("#changeCategory").val();
			transList[dataIndex].category = newCategory;
			$("[data-index-value='" + dataIndex + "'").find("p #categorySpan").html(newCategory);
		}
		function saveInflow() {
			if($("#inflowSpan").length) {
				var dataIndex = $("#changeInflow").closest(".transaction").attr('data-index-value');
				var oldInflow = transList[dataIndex].inflow;
				var newInflow = parseFloat($('#changeInflow').val());
				transList[dataIndex].inflow = newInflow;
				total = ($("#total").html() - oldInflow) + newInflow;
				$("[data-index-value='" + dataIndex + "'").find("p #inflowSpan").html(newInflow);
				$(".total-balance").html("<p>Total: $<span id='total'>" + total + "</span></p>");
			}
		}
		function saveOutflow() {
			if($("#outflowSpan").length) {
				var dataIndex = $("#changeOutflow").closest(".transaction").attr('data-index-value');
				var oldOutflow = transList[dataIndex].outflow;
				var newOutflow = parseFloat($('#changeOutflow').val());
				transList[dataIndex].outflow = newOutflow;
				total = (parseFloat($("#total").html()) + parseFloat(oldOutflow)) - parseFloat(newOutflow);
				$("[data-index-value='" + dataIndex + "'").find("p #outflowSpan").html(newOutflow);
				$(".total-balance").html("<p>Total: $<span id='total'>" + total + "</span></p>");
			}
		}

		

		saveSource();
		saveCategory();
		saveInflow();
		saveOutflow();
		$("#saveEdit").remove();
		$("#cancelEdit").remove();
	}

	function loadEdit() {
		$("#saveEdit").remove();
		function sourceEdit() {
			$(".editButton").parent().find('p #sourceSpan').html("<input type='text' placeholder='source' id='changeSource' />")
		}
		function categoryEdit() {
			$(".editButton").parent().find('p #categorySpan').html("<input type='text' placeholder='category' id='changeCategory' />")
		}
		function inflowEdit() {
			$(".editButton").parent().find('p #inflowSpan').html("<input type='text' placeholder='inflow' id='changeInflow' />");
		}
		function outflowEdit() {
			$(".editButton").parent().find('p #outflowSpan').html("<input type='text' placeholder='outflow' id='changeOutflow' />");
		}
		function showButtons() {
			$(".editButton").parent().append("<input type='button' value='save' id='saveEdit' />"
			 + "<input type='button' value='cancel' id='cancelEdit' />");

		}		

		showButtons();
		sourceEdit();
		categoryEdit();
		inflowEdit();
		outflowEdit();	
	}

	function deleteTransaction() {
		$('.deleteButton').parent().remove();
	}

	function deleteTransactionObject() {
		var dataIndex = $(".deleteButton").closest(".transaction").attr('data-index-value');
		transList.splice(dataIndex, 1);
	}

	function cancelEdit() {
		$("#sourceSpan").html(source);
		$("#categorySpan").html(category);
		$("#inflowSpan").html(inflow);
		$("#outflowSpan").html(outflow);
		$("#saveEdit").remove();
		$("#cancelEdit").remove();
	}

	$("body").on('click', '.transaction', addEditButton);
	$("body").on('click', '.transaction', addDeleteButton);

	//finds the data-index-value of the editButton's parent element
	$("body").on('click', '.editButton', loadEdit);

	$("body").on('click', '#saveEdit', saveEdit);

	$("body").on('click', '.deleteButton', deleteTransaction);
	$("body").on('click', '.deleteButton', deleteTransactionObject);

	$("body").on('click', '#cancelEdit', cancelEdit);
	
};


$("#saveButton").click(function() {
	createTrans();
	newTrans();
	
})

$("#closeButton").click(function() {
	newTrans();
	$("#transForm").hide();
})

$("#addTransaction").click(function() {
	$("#transForm").show();
})

// $(document).ready(function() {
// 	$("#transForm").hide();
// })





