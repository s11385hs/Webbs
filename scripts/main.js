Ext.onReady(function(){
	
	new Ext.Viewport({
		layout:'border',
		    //		border: false,
		    items: [{
			region: 'north',
			    height: '10%',
			    margin: '1 1 1 1',
			    html: "<div><h1>Webbs</h1></div>"
			    },{
			region:'center',
			    autoscroll: true,
			    layout:'fit',		
			    //			    height: '100%',
			    margin: '1 2 0 2',
			    items:[ tabs ]
			    },{
			region:'south',
			    id: 'south-panel',
			    margin: '0 2 3 2',
			    height: '4%',
			    html: "<div> webbs team</div>"
				      }]
		    });
    });
