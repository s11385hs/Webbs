
var tabs_model_list = Ext.widget('panel',{
    default:{
	    border: false,
	    frame: true,
    },
    frame: 'true',
    layout: { type: 'hbox' },
    height: '100%',
    items: [{
		flex: 3.5,
                items:[{
                        /*title: 'Uploaded Models',
                        split: true,
			//			height: '100%',
                        autoscroll: true,
			border: false,
                        items:[ selfmodel ]
                    },{*/
                        title:'Model Database',
                        split: true,
			border: false,
			//			height: '100%',
                        items:[ premodel ]
                    }]
            },{
                title: 'About Models',
                flex: 1,
		border: false,
                items:[{
                        title: 'Annotation',
                        split: true,
			height: 250,
                        autoscroll: true,
                        html: 'Under Construction'
                    },{
                        title:'Pathway Map',
                        split: true,
                        height: 250,
                        autoscroll: true,
                        html: 'Under Construction'
                    }]
            }]
    });

var tabs_entity = Ext.createWidget('tabpanel',{
	border: false
    });

var result_tabs= Ext.createWidget('tabpanel', {
	border: false,
	items: [ {title: 'Result' + (tabs_entity.items.length + 1)} ],
	
    });

var tabs = Ext.create('Ext.tab.Panel', {
	layout: 'fit',
	items: [{
		title: 'Model List',
		height: '100%',
		items:[ tabs_model_list ]
	    }
	    /*,{
		title: 'Entity',
		items:[ tabs_entity ]
		}*/]
    });

