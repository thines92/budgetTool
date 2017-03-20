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
		
		var sourceHTML = "Source: <span id='sourceSpan'>" + transList[transCounter].source + "</span>";
		
		var categoryHTML = "Category: <span id='categorySpan'>" + category + "</span>";
		
		var inflowHTML = "Inflow: $<span id='inflowSpan'>" + transList[transCounter].inflow + "</span>";
		
		var outflowHTML = "Outflow: $<span id='outflowSpan'>" + transList[transCounter].outflow + "</span>";
		
		
	
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
		function showButton() {
			$(".editButton").parent().append("<input type='button' value='save' id='saveEdit' />");
		}

		

		showButton();
		sourceEdit();
		categoryEdit();
		inflowEdit();
		outflowEdit();
	}

	$("body").on('click', '.transaction', addEditButton);

	//finds the data-index-value of the editButton's parent element
	$("body").on('click', '.editButton', loadEdit);

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





