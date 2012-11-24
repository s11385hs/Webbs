Ext.onReady(function(){
	
	new Ext.Viewport({
		layout:'border',
		    border: false,
		    items: [{
			region: 'north',
			    xtype: 'panel',
			    height: '10%',
			    border: false,
			    margin: '1 1 1 1',
			    //			    xtype: 'panel',
			    html: "<div><img src='../topBanner_s.png' height='100%' /></div>"			   
			    //			    html: "<div style='background: -webkit-gradient(linear, left top, left bottom, from(4682b4), to(b0c4de));'><img src='../topBanner_s.png' height='100%' /></div>"			   
			    //			    html: "<div><img src='./ecell-logo.png' height='100%' /><h1>Webbs</h1></div>"
			    },{
			region:'center',
			    autoscroll: true,
			    border: false,
			    layout:'fit',		
			    //			    height: '100%',
			    margin: '1 2 0 2',
			    items:[ tabs ]
			    },{
			region:'south',
			    id: 'south-panel',
				      border: false,
			    margin: '0 2 3 2',
			    height: '4%',
			    html: "<div align=right> &copy;webbs team</div>"
				      }]
		    });
    });
