Ext.Loader.setConfig({
  enabled : true,
  disableCaching : true, // For debug only
  paths : {
    'Chart' : 'Chart'
  }
});

Ext.require('Chart.ux.HighChart');

Ext.application({
  name : 'HighChart',
  launch : function() {

	///////perse ECDfile(jQuery)////////                                                    
    //for (i = 0; i< Data.length; i++) {
    //    $.get(Data[i], function(data) {;
    var hara = {  data: [] }
    $.get('../../../cory/Variable_CELL_CYTOPLASM_M_Value.ecd', function(data) { 
	    //Split the lines
	    var lines = data.split('\n');    //yoko:line
	    
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
	    
	});
    hara.name = "This";


    var panel = Ext.create('Ext.panel.Panel', {
      width : 800,
      height : 600,
      minHeight : 400,
      minWidth : 550,
      hidden : false,
      shadow : false,
      maximizable : true,
      title : 'Result',
      renderTo : Ext.getBody(),
      layout : 'fit',
      items : [ {
	xtype : 'highchart',
        id : 'chart',
        series : [
		  hara,
		  /*		  
    {
	name: 'Tokyo',
	data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
    }, {
	name: 'New York',
	data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
    }, {
	name: 'Berlin',
	data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
    }, {
	name: 'London',
	data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
    }
		  */
			],
        chartConfig : {
			chart : {
			    marginRight : 220,
			    marginBottom : 120,
			    zoomType : 'xy',
			    animation : {
				duration : 1500,
				easing : 'swing'
			    }
                        },
			title : {
			    text : 'Class1',
			    x : -20 //center                                                                                   
			},
       			xAxis : [{
				title : {
				    text : 'Time',
				    margin : 20
				}
			    }],
			yAxis : {
			    title : {
				text : 'Value'
			    },
			    gridLineWidth: 0,
			    plotLines : [{
				    value : 0,
				    width : 1,
				    color : '#808080'
				}]
			},
			plotOptions : {
			    series : {
				animation : {
				    duration : 3000,
				    easing : 'swing'
				},
			    }
			    },
			tooltip : {
			    crosshairs: true,
			    shared: true
			    /*    formatter : function() {
				return '<b>' + this.series.name + '</b><br/>' + this.x + ': ' + this.y;
				}*/
			},
      			legend : {
			    layout : 'vertical',
			    align : 'right',
			    verticalAlign : 'top',
			    x : 20,    
			    y : 100,
			    borderWidth : 0
			}
	  }
      }]
    });
    
    //	panel.items[0].series.push(hara);
    ////////////////////////////////////
    
    panel.show();
	}
	
    });
