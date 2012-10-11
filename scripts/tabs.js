var tabs_entity = Ext.createWidget('tabpanel',{
	//        layout: 'fit',
	//        renderTo: document.body,
	//        deferredRender: false,
	border: false,
    });

var result_tabs= Ext.createWidget('tabpanel', {
	//	layout:'fit',
	items: [ {title: 'Result' + (tabs_entity.items.length + 1)} ],

    });

//
var tabs = Ext.create('Ext.tab.Panel', {
	width: '100%',
	//	height: 600,
	renderTo: document.body,
	items: [{
		title: 'Model List',
		items:[ tabs_model_list ]
	    },{
		title: 'Entity',
		items:[ tabs_entity ]
	    }]
    });

