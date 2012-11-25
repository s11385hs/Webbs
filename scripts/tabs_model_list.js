var tabs_model_list = Ext.widget('panel',{
	height: '100%',
	border: false,
	layout: {
	    type: 'hbox',
	    pack: 'start',
	    align: 'strech'
	},
	items: [{	       
		border: false,
		flex: 4,
		items:[{
			title: 'Uploaded Models',
			frame: true,
			split: true,
			border: false,
			//height: Ext.getBody().getViewSize().height * 0.3,
			height: 300,
			autoscroll: true,
			items:[
			       selfmodel
			       ]
                    },{
			title:'Model Database',
			//			layout: 'accordion',
			frame: true,
			split: true,
			//			height: 600,
			autoscroll: true,
			items:[ premodel ]
                    }]
	    },{
		title: 'About Models',
		border: false,
		flex: 1,
		items:[{
			title: 'Annotation',
			frame: true,
			split: true,
			height: 300,
			autoscroll: true//,
                        //html: 'Under Construction' 
                    },{
			title:'Pathway Map',
			frame: true,
			split: true,
			height: 300,
			autoscroll: true//,
                        //html: 'Under Construction' 
                    }]
	    }]
    });
