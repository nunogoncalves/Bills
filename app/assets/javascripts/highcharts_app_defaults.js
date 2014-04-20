$.highcharts_app_defaults = {
	lang: {
		loading: 'Aguarde...',
		months: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
		weekdays: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
		shortMonths: ['Jan', 'Fev', 'Mar', 'Abr', 'Maio', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
		exportButtonTitle: "Exportar",
		printButtonTitle: "Imprimir",
		rangeSelectorFrom: "De",
		rangeSelectorTo: "Até",
		rangeSelectorZoom: "Periodo",
		downloadPNG: 'Download imagem PNG',
		downloadJPEG: 'Download imagem JPEG',
		downloadPDF: 'Download documento PDF',
		downloadSVG: 'Download imagem SVG'
	}, 	

	chart: {
		renderTo: "chart", //For this to work, we need to have a element with chart id in the page.
		type: "arearange",
		title: "",
	},

	tooltip: {
		useHTML: true,
		formatter: function() {
			// var image = "<img src='" + $("#tentant_" + this.series.options.tenant_id + "_image").attr("src") + "' style='width: 30px; height: 40px'>"
			var label = " De " + dateInFormat(new Date(this.series.points[0].x), "YYYY/mm/dd") + " a " + dateInFormat(new Date(this.series.points[1].x), "YYYY/mm/dd") 
			return seriesStr = /*image + */'<span style="color:' + this.series.color + '; font-weight: bold;">' + this.series.name + ': </span><strong>' + label + '</strong><br/>';
		}
	},
	xAxis: {
		type: 'datetime',
		labels: {
			formatter: function() {
				return Highcharts.dateFormat('%e %b %y', this.value);
				// return this.value;
			}
		},
    tickmarkPlacement: 'on',
    gridLineWidth: 1
	},

	yAxis: {
		title: {
			text: null
		},
		// max: 6,
		min: 0,
		lineWidth: 0,
		minorGridLineWidth: 0,
		lineColor: 'transparent',
		minorTickLength: 0,
   	tickLength: 0,
   	labels: {
       enabled: false
   },
	},
	
	plotOptions: {
		arearange: {
			marker: {
				enabled: true
			}
		}
	},
	credits: {
		enabled: false
	},
	exporting: {
		enabled: false
	},
	legend: {
		enabled: false
	},
}