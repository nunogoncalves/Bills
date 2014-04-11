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
	},

	xAxis: {
		type: 'datetime',
		labels: {
			formatter: function() {
				return Highcharts.dateFormat('%e %b %y', this.value);
				// return this.value;
			}
		},
		lineWidth: 0,
		minorGridLineWidth: 0,
		lineColor: 'transparent',
		minorTickLength: 0,
   	tickLength: 0,
	},

	yAxis: {
		title: {
			text: null
		},
		max: 6,
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