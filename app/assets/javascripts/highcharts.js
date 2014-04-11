$.highcharts = {

	chart: null,

	initChart: function(seriesOptions) {

		var options = $.extend({}, $.highcharts_app_defaults, seriesOptions)

		$.highcharts.chart = new Highcharts.Chart(options);    
	},

	updateStartAndEndOfSeries: function(startMillis, endMillis, type) {
		var i = $.highcharts.getSeriesIndexFromName(type);
		if (i !== -1) {
			$.highcharts.chart.series[i].points[0].update({x: startMillis })
			$.highcharts.chart.series[i].points[1].update({x: endMillis })
		}
	},


	getSeriesIndexFromName: function(name) {
		var index = -1;
		$.each($.highcharts.chart.series, function(i, series) {
			if (name === series.name) {
				index = i;
				return false;
			}
		});
		return index;
	}


}