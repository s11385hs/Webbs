function jun(Data, Title){   
    var achart = Ext.create("Chart.ux.HighChart", {
	    series: [],
	    chartConfig: {
		chart: {
		    renderTo: 'container',
		    defaultSeriesType: 'line',
		    zoomType: 'xy'
		},
		title: {
		    text: Title,
		    x: -20 //center
		},
		xAxis: {
		    title: {
			text: 'Time'
		    },
		    plotLines: [{
			    value: 0,
			    width: 1,
			    color: '#000000'
			}],
		    min:0
		},
		yAxis: {
		    title: {
			text: 'Value'
		    },
		    gridLineWidth: 0,
		    plotLines: [{
			    value: 0,
			    width: 2,
			    color: '#000000'
			}]
		},
		tooltip: {
		    crosshairs: true,
		    shared: true
		},
		legend: {
		    layout: 'vertical',
		    align: 'right',
		    verticalAlign: 'top',
		    x: -10,
		    y: 100,
		    borderWidth: 0
		},
		//		series: []
	    }
	});


	    
    ///////perse ECDfile(jQuery)////////

    for (i = 0; i< Data.length; i++) {
	$.get(Data[i], function(data) {;
		//Split the lines                                                                            
		var lines = data.split('\n');    //yoko:line                                                   
		var hara = {  data: [] }
		$.each(lines, function(lineNo, line) {
			var items = line.split('\t');     //tate:item                                          
			if (lineNo > 5) {
			    $.each(items, function(itemNo, item) {
				    if (itemNo == 0 ) {
				    } else if (itemNo == 1) {
					hara.data.push(parseFloat(item));
				    }
				});
			}
		    });

		$.each(lines, function(nicoleNo, nicole) {
			var jiyoungs = nicole.split(' ');  //tate:                                            
			if (nicoleNo == 0) {
			    $.each(jiyoungs, function(jiyoungNo, jiyoung) {
				    if (jiyoungNo == 1 ) {
					hara.name = jiyoung;
				    }
				})
				}
		    });

		achart.series.push(hara);

	    });
    }



    // make panel
    var apanel = Ext.create('Ext.panel.Panel',{
	    title: 'Resulet',
	    //	    renderTo: Ext.getBody(),
	    items:[
		   achart
		 ]
	});

	//    achart;

	apanel;
}
