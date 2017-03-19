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
		$(".total-balance").html("<p class='total'>Total: $" + total + "</p>");
	}
	
	
	
	createTrans();
	displayTrans();
	calcTotal();
	transCounter++;
	$("#transForm")[0].reset();
	
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

//adds an editButton on .transaction that is clicked. Also removes edit button when another .transaction is clicked.
$("body").on('click', '.transaction', function() {
	$(".editButton").remove();
	$(".transaction.highlight").removeClass('highlight');
	$(this).addClass('highlight');
	var thisID = $(this).attr("data-index-value");
	// alert(JSON.stringify(transList[thisID], null, 4));
	$(this).append("<input type='button' class='editButton' value='edit' />")
});

//finds the data-index-value of the editButton's parent element
$("body").on('click', '.editButton', function() {
	// var dataIndex = $(this).parent().attr('data-index-value');
	// transList[dataIndex].inflow = 500;
	// alert(JSON.stringify(transList[dataIndex]));
	$(this).parent().find('p .inflowSpan').html("<input type='text' placeholder='inflow' id='changeInflow' />" + "<input type='button' value='save' id='saveEdit' />");
	
})

$("body").on('click', '#saveEdit', function() {
	var inflow = $('#changeInflow').val();
	alert(inflow);
})



