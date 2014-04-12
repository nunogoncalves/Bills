$.bills = {

	bills_array: null,

	loadAllPickers: function() {
		$.each($.bills.bills_array, function(index, bill) {
			$("#" + bill + "_start_input, #" + bill + "_end_input").pickadate({
				max: new Date(),
				onSet: function(event) {
					$.bills.afterDateSelected(this);
				}
			});

		});
	},

	afterDateSelected: function(picker) {
		var startDate,
			 	endDate,
			 	dates,
			 	days,
			 	$pickerInput = $(picker.$node[0]);

		$pickerInput.data("selected_date", picker.get('select', 'yyyy/mm/dd'));
		
		dates = $.bills.buildDates(picker, $pickerInput);
		days = dayDiffIncludingEnd(dates[0], dates[1]);
		$.bills.updateDaysBetweenDatesLabel(days, $pickerInput);
		$.bills.updatePricePerDay(days, $pickerInput)
		return false;
	},

	billPriceChanged: function(element) {
		var startDate,
				$element,
				endDate,
				type,
				days;

		$element = $(element);
		type = $element.data("type");
		startDate = eval(type + "StartDate");
		endDate = eval(type + "EndDate");
		days = dayDiffIncludingEnd(startDate, endDate);
		$.bills.updatePricePerDay(days, $element);
	},

	buildDates: function(picker, $pickerInput) {
		var type = $pickerInput.data("type");
		if ($pickerInput.hasClass("start")) {
			startDate = new Date(picker.get('select', 'yyyy/mm/dd'));
			endDate = new Date($($pickerInput.siblings("." + type)[0]).data("selected_date"));
			endDate.setHours(23,59,59,999)
		} else {
			startDate = new Date($($pickerInput.siblings("." + type)[0]).data("selected_date"));
			endDate = new Date(picker.get('select', 'yyyy/mm/dd'));
			endDate.setHours(23,59,59,999)
		}

		eval(type + "StartDate = new Date(" + new Date(dateInFormat(startDate)).getTime() + ")")
		eval(type + "EndDate = new Date(" + new Date(dateInFormat(endDate)).getTime() + ")")

		return [startDate, endDate]
	},

	updateDaysBetweenDatesLabel: function(days, $pickerInput) {
		if (isNaN(days)) {
			$pickerInput.closest("li").find("label.days").text("--- dias");
		} else {
			var type = $pickerInput.data("type");
			$.highcharts.updateStartAndEndOfSeries(eval(type + "StartDate").getTime(), eval(type + "EndDate").getTime(), type);
			$pickerInput.closest("li").find("label.days").text(days + " dias");
		}
	},

	updatePricePerDay: function(days, $pickerInput) {
		var billPrice,
				pricePerDay;

		if (isNaN(days)) {
			$pickerInput.closest("li").find("input.price_per_day_label").val('--- €/dia');
		} else {
			billPrice = parseFloat($pickerInput.closest("li").find("input.price_input").val());
			pricePerDay = (billPrice / days).toFixed(2);
			$pickerInput.closest("li").find("label.price_per_day_label").text(pricePerDay + "€/dia");
			$pickerInput.closest("li").find("label.price_per_day_label").data("value", pricePerDay);
			$.bills.calculateTotalForTenants();
		}	
	},

	calculateTotalForTenants: function() {
		$.each($("li.person"), function(index, liPerson) {
			var $liPerson = $(liPerson);
			console.log("------------------------> " + $liPerson.data("name") + " <------------------------")
			$.each($.bills.bills_array, function(index, bill) {
				var billStartDate = eval(bill + "StartDate");
				var billEndDate = eval(bill + "EndDate");
				var tenantIn = new Date($liPerson.data("tenant_in"));
				var tenantOut = new Date($liPerson.data("tenant_out"));
				var tenantId = $liPerson.data("tenant_id");
				if (billStartDate && billEndDate && tenantIn && tenantOut) {
					$.bills.calculateBillForPerson(bill, tenantId, tenantIn, tenantOut, billStartDate, billEndDate)//.toFixed(2)
					var totalBill = 0.0;
					$.each($("td." + bill), function(i, billCell) {
						totalBill = totalBill + parseFloat($(billCell).text());
					});
					if (!isNaN(totalBill)) {
						$(".total_" + bill).text(totalBill.toFixed(2));
					};
				}
			});
			var totalPerson = 0.00;
			$.each($(".tenant_" + $liPerson.data("tenant_id")), function(i, tenantCell) {
				totalPerson = totalPerson + (isNaN(parseFloat($(tenantCell).text())) ? 0.00 : parseFloat($(tenantCell).text()));
			})
			if (!isNaN(totalPerson)) {
				$(".total_tenant_" + $liPerson.data("tenant_id")).text(totalPerson.toFixed(2));
			}
		});
	},

	calculateBillForPerson: function(bill, tenantId, tenantIn, tenantOut, billStartDate, billEndDate) {
		tenantIn.setHours(0)
		tenantOut.setHours(23, 59, 59, 999)
		var totalToPay = 0.00;
	  for (var billDate = new Date(billStartDate.getTime()); billDate <= billEndDate; billDate.setDate(billDate.getDate() + 1)) {
	  	if (tenantIn > billDate) {
	  		continue;
	  	} 
	    if (tenantIn <= billDate && tenantOut >= billDate) { //tenant is there
	    	console.log("No dia " + dateInFormat(billDate) + " da " + bill + " está lá")
	      var peopleInDate = $.bills.getHowManyPeopleInDate(billDate);
	      var billPerDay = $("label.price_per_day_label." + bill).data("value");
	      totalToPay = totalToPay + (parseFloat(billPerDay) / peopleInDate);
	      console.log("totalToPay + (parseFloat(billPerDay) / peopleInDate)");
	      	console.log("" + totalToPay + "+" + (parseFloat(billPerDay) + "/" + peopleInDate) +"="+ totalToPay);
	    }

	    if (tenantOut < billDate) {
	    	break;
	    }
	  }
	  if(!isNaN(totalToPay)) {
		  $("."+ bill + ".tenant_" + tenantId).text(totalToPay.toFixed(2))
	  }

	  return totalToPay.toFixed(2);
	},

	getHowManyPeopleInDate: function(d) {
	  var peopleInDate = 0;
	  var personIn = null;
	  var tenantOut = null;

	  $.each($("li.person"), function(index, liPerson) {
			var $liPerson = $(liPerson);
			var tenantIn = new Date($liPerson.data("tenant_in")).setHours(0);
			var tenantOut = new Date($liPerson.data("tenant_out")).setHours(23, 59, 59, 999); 
			if (tenantIn <= d && d <= tenantOut) {
	      peopleInDate+=1;
	    }		
		});

  	return peopleInDate;
	}
}