var tabs_model_list = Ext.widget('panel',{
    default:{
	    border: false,
	    frame: true,
    },
    frame: 'true',
    layout: {
            type: 'hbox',
	    //            align: 'top'
	},
    items: [{
		flex: 3.5,
                items:[{
                        title: 'Uploaded Models',
                        split: true,
			height: 300,
                        autoscroll: true,
                        items:[ selfmodel ]
                    },{
                        title:'Model Database',
                        split: true,
                        autoscroll: true,
                        items:[ premodel ]
                    }]
            },{
                title: 'About Models',
                flex: 1,
                items:[{
                        title: 'Annotation',
                        split: true,
                        height: 300,
                        autoscroll: true,
                        html: 'Under Construction'
                    },{
                        title:'Pathway Map',
                        split: true,
                        height: 300,
                        autoscroll: true,
                        html: 'Under Construction'
                    }]
            }]
    });

var tabs_entity = Ext.createWidget('tabpanel',{
    });

var result_tabs= Ext.createWidget('tabpanel', {
	//	layout:'fit',
	items: [ {title: 'Result' + (tabs_entity.items.length + 1)} ],

    });

//
var tabs = Ext.create('Ext.tab.Panel', {
	layout: 'fit',
	width: '100%',
	//???	renderTo: document.body,
	items: [{
		title: 'Model List',
		items:[ tabs_model_list ]
	    },{
		title: 'Entity',
		items:[ tabs_entity ]
	    }]
    });

