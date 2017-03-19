var transList = [];
var transaction = {}
var transCounter = 0;


function newTrans() {
	
	var total = 0;
	var source = $("#source").val();
	var category = $("#category").val();
	var inflow = parseFloat($("#inflow").val());
	var outflow = parseFloat($("#outflow").val());
	
	function createTrans() {
		transList.push({id: transCounter, source: source, inflow: inflow, outflow: outflow});
	};
	
	function displayTrans() {
		
		var divHTML = "<div class='transaction' data-index-value='" + transCounter + "'><p></p></div>"
		
		var sourceHTML = "Source</span>: " + transList[transCounter].source;
		
		var categoryHTML = "Category: " + category + "";
		
		var inflowHTML = "Inflow: $<span class='inflowSpan'>" + transList[transCounter].inflow + "</span>";
		
		var outflowHTML = "Outflow: $<span>" + transList[transCounter].outflow + "</span>";
		
		
	
		if (!isNaN(inflow) || !isNaN(outflow)) {
			$(".transactionList").append(divHTML);
			$(".transaction:last-child p").append(sourceHTML);
			$(".transaction:last-child p").append(categoryHTML);
			if(!isNaN(transList[transCounter].inflow)) {
				$(".transaction:last-child p").append(inflowHTML);
			} else {
					$(".transaction:last-child p").append(outflowHTML);
			};
		}
	}
		
		
	
	function calcTotal() {
		for (var i=0; i < transList.length; i++) {
			if (!isNaN(transList[i].inflow)) {
				total = total + transList[i].inflow;
			} else {
				total = total - transList[i].outflow;
			}
		}
		$(".total-balance").html("<p>Total: $<span id='total'>" + total + "</span></p>");
	}
	
	
	
	createTrans();
	displayTrans();
	calcTotal();
	transCounter++;
	$("#transForm")[0].reset();

	//adds an editButton on .transaction that is clicked. Also removes edit button when another .transaction is clicked.
	function addEditButton() {
		$(".editButton").remove();
		$(".transaction.highlight").removeClass('highlight');
		$(this).addClass('highlight');
		$(this).append("<input type='button' class='editButton' value='edit' />")
	}

	function saveEdit() {
		function editInflow() {
			var dataIndex = $("#changeInflow").closest(".transaction").attr('data-index-value');
			var oldInflow = transList[dataIndex].inflow;
			var newInflow = parseFloat($('#changeInflow').val());
			transList[dataIndex].inflow = newInflow;
			$(this).parent().html(newInflow);
			total = ($("#total").html() - oldInflow) + newInflow;
			$(".inflowSpan").html(newInflow);
			$(".total-balance").html("<p>Total: $<span id='total'>" + total + "</span></p>");
		}

		editInflow();
	}

	$("body").on('click', '.transaction', addEditButton);

	//finds the data-index-value of the editButton's parent element
	$("body").on('click', '.editButton', function() {
		// transList[dataIndex].inflow = 500;
		// alert(JSON.stringify(transList[dataIndex]));
		$(this).parent().find('p .inflowSpan').html("<input type='text' placeholder='inflow' id='changeInflow' />" + "<input type='button' value='save' id='saveEdit' />");
		
	})

	$("body").on('click', '#saveEdit', saveEdit);
	
};


$("#saveButton").click(function() {
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





