Ext.onReady(function(){
	
	//Ext.state.Manager.setProvider(Ext.create('Ext.state.CookieProvider'));	
	var viewport = Ext.create('Ext.Viewport', {
		layout:'border',
		border: false,
		items: [{
			region: 'north',
			id: 'north-panel',
			height: 80,
			width: 100,
			margin: '1 1 1 1',
			html: "<div><h1>Webbs</h1></div>"
		    },{
			region:'center',
			autoscroll: true,
			layout:'column',		
			margin: '1 2 0 2',
			defaults: {
			    layout: 'anchor',
			    defaults: {anchor: '100%'}
			},
				items:[ tabs ]
		    },{
			region:'south',
			id: 'south-panel',
			margin: '0 2 3 2',
			height: 25,
			html: "<div> webbs team</div>"
		    }]
	    });
    });
