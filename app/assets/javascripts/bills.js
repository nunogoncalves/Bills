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
		startDate = eval(type + "StartDate")
		endDate = eval(type + "EndDate")
		days = dayDiffIncludingEnd(startDate, endDate);
		$.bills.updatePricePerDay(days, $element);
	},

	buildDates: function(picker, $pickerInput) {
		var type = $pickerInput.data("type");
		if ($pickerInput.hasClass("start")) {
			startDate = new Date(picker.get('select', 'yyyy/mm/dd'));
			endDate = new Date($($pickerInput.siblings("." + type)[0]).data("selected_date"));
		} else {
			startDate = new Date($($pickerInput.siblings("." + type)[0]).data("selected_date"));
			endDate = new Date(picker.get('select', 'yyyy/mm/dd'));
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
		}	
	}

}