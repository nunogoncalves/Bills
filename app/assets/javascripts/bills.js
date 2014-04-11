$.bills = {

	loadAllPickers: function() {
		$.each(["water", "gas", "power"], function(index, bill) {
			$("#" + bill + "_start_input, #" + bill + "_end_input").pickadate({
			});
				// var pickerParentClass = $(this.$node[0]).parent().attr("class");

		});
	},

}