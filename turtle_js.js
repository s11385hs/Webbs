Ext.require(['*']);
Ext.Loader.setPath('Ext.ux', '../ux/');
Ext.Loader.setConfig({
	enabled : true,
	    disableCaching : true, // For debug only
	    paths : { 'Chart' : 'Chart' }
    });
Ext.require('Chart.ux.HighChart');
Ext.QuickTips.init();
/*
///////////
document.onkeydown = function(e) { 
    var ctrl;    
    // Mozilla(Firefox, NN) and Opera 
    if (e != null) { 
        keycode = e.which; 
        ctrl = typeof e.modifiers == 'undefined' ? e.ctrlKey : e.modifiers & Event.CONTROL_MASK;
	// キーコードの文字を取得 
	keychar = String.fromCharCode(keycode).toUpperCase(); 
	
	// Ctrl同時押し
	if (ctrl) { 
	    if (keychar == "Z") { 
		alert('Ctrl+Z'); 
	    } 
	}
        // イベントの上位伝播を防止 
        e.preventDefault(); 
        e.stopPropagation(); 
	// Internet Explorer 
    } else { 
        keycode = event.keyCode; 
        ctrl = event.ctrlKey;
	// キーコードの文字を取得 
	keychar = String.fromCharCode(keycode).toUpperCase(); 
	
	// Ctrl同時押し
	if (ctrl) { 
	    if (keychar == "Z") { 
		alert('Ctrl+Z'); 
	    } 
	}
        // イベントの上位伝播を防止 
        event.returnValue = false; 
        event.cancelBubble = true; 
    } 
    

}
/////////     
*/
Ext.onReady(function(){
	    
	Ext.state.Manager.setProvider(Ext.create('Ext.state.CookieProvider'));
	
	//make the cell to edit
	var cellEditing = Ext.create('Ext.grid.plugin.CellEditing', {
		clicksToEdit: 1
		});
	
	
	
	// sample static data for the store
	var grid1_null = [
			  ['                  ',          ,    ,   ,   '    '],
			  ['                  ',          ,    ,   ,   '    '],
			  ['                  ',          ,    ,   ,   '    '],
			  ['                  ',          ,    ,   ,   '    '],
			  ['                  ',          ,    ,   ,   '    '],
			  ['                  ',          ,    ,   ,   '    '],
			  ['                  ',          ,    ,   ,   '    '],
			  ['                  ',          ,    ,   ,   '    '],
			  ['                  ',          ,    ,   ,   '    '],
			  ['                  ',          ,    ,   ,   '    '],
			  ['                  ',          ,    ,   ,   '    '],
			  ['                  ',          ,    ,   ,   '    '],
			  ['                  ',          ,    ,   ,   '    '],
			  ['                  ',          ,    ,   ,   '    '],
			  ['                  ',          ,    ,   ,   '    '],
			  ['                  ',          ,    ,   ,   '    '],
			  ['                  ',          ,    ,   ,   '    '],
			  ['                  ',          ,    ,   ,   '    '],
			  ['                  ',          ,    ,   ,   '    '],
			  ['                  ',          ,    ,   ,   '    '],
			  ['                  ',          ,    ,   ,   '    '],
			  ['                  ',          ,    ,   ,   '    '],
			  ['                  ',          ,    ,   ,   '    '],
			  ['                  ',          ,    ,   ,   '    '],
			  ['                  ',          ,    ,   ,   '    '],
			  ['                  ',          ,    ,   ,   '    '],
			  ['                  ',          ,    ,   ,   '    '],
			  ['                  ',          ,    ,   ,   '    '],
			  ]; 
	
	var myData4 = [
		       ['                  ',          ,    ,   ,   '    '],
		       ['                  ',          ,    ,   ,   '    '],
		       ['                  ',          ,    ,   ,   '    '],
		       ['                  ',          ,    ,   ,   '    '],
		       ['                  ',          ,    ,   ,   '    '],
		       ['                  ',          ,    ,   ,   '    '],
		       ['                  ',          ,    ,   ,   '    '],
		       ['                  ',          ,    ,   ,   '    '],
		       ['                  ',          ,    ,   ,   '    '],
		       ['                  ',          ,    ,   ,   '    '],
		       ['                  ',          ,    ,   ,   '    '],
		       ['                  ',          ,    ,   ,   '    '],
		       ['                  ',          ,    ,   ,   '    '],
		       ['                  ',          ,    ,   ,   '    '],
		       ['                  ',          ,    ,   ,   '    '],
		       ['                  ',          ,    ,   ,   '    '],
		       ['                  ',          ,    ,   ,   '    '],
		       ['                  ',          ,    ,   ,   '    '],
		       ['                  ',          ,    ,   ,   '    '],
		       ['                  ',          ,    ,   ,   '    '],
		       ['                  ',          ,    ,   ,   '    '],
		       ['                  ',          ,    ,   ,   '    '],
		       ['                  ',          ,    ,   ,   '    '],
		       ['                  ',          ,    ,   ,   '    '],
		       ['                  ',          ,    ,   ,   '    '],
		       ['                  ',          ,    ,   ,   '    '],
		       ['                  ',          ,    ,   ,   '    '],
		       ['                  ',          ,    ,   ,   '    '],
		       ]; 
	
	var myData5 = [];
	
	/**
	 * Custom function used for column renderer
	 * @param {Object} val
	 */
	function change(val) {
	    if (val > 0) {
		return '<span style="color:green;">' + val + '</span>';
	    } else if (val < 0) {
		return '<span style="color:red;">' + val + '</span>';
	    }
	    return val;
	}
	
	var session_ID = "";
	
	//Ajax Successed
	function handleSuccess(response) { 
	    if (response.responseText !== undefined) { 
		var responseJSON = JSON.parse(response.responseText);
		var responseJSON_process  = responseJSON.Process;
		var responseJSON_variable = responseJSON.Variable;
		
		session_ID = responseJSON.ID; 
		//console.log(responseJSON_process);		
		grid1.getStore().loadData(responseJSON_variable);
		grid2.getStore().loadData(responseJSON_process);
	       	alert(session_ID)
	    }
	}


	//Ajax failed
	function handleFailure(response) { 
	    if (response.responseText !== undefined) {
		alert('Sorry!! Failed (T_T)');
	    }
	}
	
	/**
	 * Custom function used for column renderer
	 * @param {Object} val
	 */
	function pctChange(val) {
	    if (val > 0) {
		return '<span style="color:green;">' + val + '%</span>';
	    } else if (val < 0) {
		return '<span style="color:red;">' + val + '%</span>';
	    }
	    return val;
	}
    
	var store3 = Ext.create('Ext.data.ArrayStore', {
		fields: [
	{name: 'v_id'},
	{name: 'path'},
	{name: 'value', type: 'float'},
	{name: 'molarconc', type: 'float'},
			 ],
		data: grid1_null
	    });
	
	var store4 = Ext.create('Ext.data.ArrayStore', {
		fields: [
	{name: 'p_id'},
	{name: 'p_path'},
	{name: 'activity',  type: 'float'},
	{name: 'm_activity',  type: 'float'},
	{name: 'classname'},
	{name: 'expression'},
	{name: 'v_r_l'},
	{name: 'property'}    
			 ],
		data: myData4	    
	    });
	
	// create the Grid
	var grid1 = Ext.create('Ext.grid.Panel', {
		store: Ext.create('Ext.data.ArrayStore', {
			fields: [
	{name: 'ID'},
	{name: 'Path'},
	{name: 'Value', type: 'float'},
	{name: 'Molar Conc', type: 'float'},
	{name: 'ClassName'}
				 ]
		    }), 
		store: store3,
		margin: '2 2 0 1',
		stateful: true,
		stateId: 'stateGrid',
		//width: Ext.getBody().getViewSize().width * 0.28,
		columnWidth: 1.5/4,
		height: Ext.getBody().getViewSize().height -150,
		autoScroll: true,
		title: 'Variable',
		viewConfig: {
		    stripeRows: true
		},
		columns: [{
			text     : 'ID',
			//width: '15%',
			sortable : true,
			dataIndex: 'v_id',
		    },{
			text     : 'Path',
			//width: '35%',
			sortable : true,
			dataIndex: 'path'
		    },{
			text     : 'Value',
			//width: '25%',
			sortable : true,
			dataIndex: 'value',
			renderer : change,
			editor: {
			    xtype: 'numberfield',
			    allowBlank: false
			}
		    },{
			text     : 'Molar Conc',
			width    : 150,
			sortable : true,
			renderer : change,
			dataIndex: 'molarconc',
			editor: {
			    xtype: 'numberfield',
			    allowBlank: false
			}
		    }],
		plugins: [cellEditing],
	    });
	
	//change Value or MolarConc
       	grid1.getSelectionModel().on('selectionchange', function(sm, selectedRecord) {
		if (selectedRecord.length) {
		    var gridrecord = grid1.getSelectionModel().getSelection();
		    console.log(gridrecord[0].data);
		    //alert(gridrecord[0].data);
		}
		//send Ajax Request
		/* 
		   Ext.Ajax.request({
		   url: "/ecell/test.cgi",
		   method: "GET",
		   params: params,
		   success: handleSuccess,
		   failure: handleFailure,
		   });*/
            });
	
	console.log(Ext.getBody().getViewSize().height);
	console.log(Ext.getBody().getViewSize().width);

	var grid2 = Ext.create('Ext.grid.Panel', {
		store: store4,
		stateful: true,
		stateId: 'stateGrid',
		margin: '2 1 0 1',
		columnWidth: 1.5/4,
		height: Ext.getBody().getViewSize().height - 150,
		autoScroll: true,
		title: 'Process',
		viewConfig: {
		    stripeRows: true
		},
		columns: [{
			text     : 'ID',
        
			sortable : true,
			dataIndex: 'p_id'
		    },{
			text     : 'Path',
        
			sortable : true,
			dataIndex: 'p_path'
		    },{
			text     : 'Activity',
			sortable : true,
			renderer : change,
			dataIndex: 'activity',
		    },{
			text     : 'Molar Activity',
			width    : 75,
			sortable : true,
			renderer : change,
			dataIndex: 'm_activity',
		    },{
			text     : 'ClassName',
			sortable : true,
			dataIndex: 'classname'
		    }],
		listeners:{
		    selectionchange: function(model, records) {
			if (records[0]) {
			    this.up().down('form').down('fieldset').items.items[0].setValue(records[0].data.p_id);
			    console.log(this.up().down('form').down('fieldset').items.items[0].setValue(records[0].data.p_id));
			    this.up().down('form').down('fieldset').items.items[1].setValue(records[0].data.expression);
			    this.up().down('form').down('fieldset').items.items[2].setValue(records[0].data.v_r_l);
			    this.up().down('form').down('fieldset').items.items[3].setValue(records[0].data.property);
			}
		    }
		}
	    });

	// make button to run the model
	var mybutton = Ext.create('Ext.Button', {
		text: 'Run!!',
		scale: 'large',
		width: Ext.getBody().getViewSize().width * 0.185,
      		handler: function() {
		
		    var params = { "session_ID": session_ID };            
		    
		    //send Ajax Request
		    Ext.Ajax.request({ 
			    url: "/ecell/python_jy3.cgi",
				method: "GET", 
				params: params, 
				success: result_graph_success, 
				failure: result_graph_failure, 
				}); 
		}
	    });
	
	//Entity of tab
	var tabs = Ext.createWidget('tabpanel', {
		resizeTabs: false,
		enableTabScroll: true,
		border: false,
		margins:'0 0 5 5',
		width: '100%',
		height: Ext.getBody().getViewSize().height -100,
		items: [{
			title: 'Entity',
			iconCls: 'tabs',
			closable: false,
			autoscroll: true,
			border: false,
			layout: {
			    type: 'column',
			    pack: 'start',
			    align: 'stretch'
			},
			items: [
				grid1, grid2,{
				    xtype: 'form',
				    columnWidth: 1/4,
				    border: false,
				    items: [{
					    title: 'Property Details(editable)',
					    xtype: 'fieldset',
					    defaultType: 'textfield',
					    items: [{
						    fieldLabel: 'ID',
						    width: Ext.getBody().getViewSize().width * 0.185,
						    name: 'p_id',
						    disabled: true,
						    editable: false,
						    allowBlank: false,
						},{
						    fieldLabel: 'Expression',
						    name: 'expression',
						    height: Ext.getBody().getViewSize().height * 0.2,
						    width: Ext.getBody().getViewSize().width * 0.185,
						    editable: false,
						    disabled: true,
						    xtype: 'textareafield',
						    allowBlank: false,
						},{
						    fieldLabel: 'Variable Reference List',
						    name: 'v_r_l',
						    height: Ext.getBody().getViewSize().height * 0.2,
						    width: Ext.getBody().getViewSize().width * 0.185,
						    disabled: true,
						    xtype: 'textareafield',
						    editable: false
						},{
						    fieldLabel: 'Property List',
						    name: 'property',
						    height: Ext.getBody().getViewSize().height * 0.2,
						    width: Ext.getBody().getViewSize().width * 0.185,
						    xtype: 'textareafield'
						}]
					},{
					    xtype: 'panel',
					    border: false,
					    style: { "background-color": '#ffffff', "text-align": 'center'  },
					    //html: "<div style='background-color: #ffffff'></div>",
					    items: [ mybutton ]
					}]
				}]
		    }]
	    });
    
	function result_graph_success(response) {	
	    if (response.responseText !== undefined) {
		var resultJSON = JSON.parse(response.responseText);
		var charts = Array();
		charts.push(show_graph(resultJSON[0].Data, resultJSON[0].Title));
		tabs.add({  
			title: 'Result',
			    layout : 'fit',
			    width: '100%',
			    height: '100%',
			    iconCls: 'tabs',
			    items: [ charts ],
			    closable: true,
			    }).show();
	    }
	}
    
	//Ajax failed
	function result_graph_failure(response) { 
	    if (response.responseText !== undefined) {
		alert('Sorry!! Missed (T_T)');
	    }
	}
	/*   Ext.define('Restaurant', {
	     extend: 'Ext.data.Model',
	     fields: ['name', 'cuisine']
	     });
		    
	     // make list of models
	     var Restaurants = Ext.create('Ext.data.Store', {
	     storeId: 'restaraunts',
	     model: 'Restaurant',
	     sorters: ['cuisine','name'],
	     groupField: 'cuisine',
	     data: [{
	     name: '2,3-BPG',
	     cuisine: 'Metabolite'
	     },{
	     name: 'BAND3',
	     cuisine: 'Metabolite'
	     },{
	     name: 'JAK2-STAT5',
	     cuisine: 'Signal Trunsduction'

	     }]
	     });
		    
	     var groupingFeature = Ext.create('Ext.grid.feature.Grouping',{
	     groupHeaderTpl: 'Cuisine: {name} ({rows.length} Item{[values.rows.length > 1 ? "s" : ""]})'
	     });*/
	       
	//load list model Ajax succesed
	function load_model_success(response){
	    if (response.responseText !== undefined) {
		var resultJSON = JSON.parse(response.responseText);
		grid3.getStore().loadData(resultJSON);
	    }
	}
		   
	//Ajax failed
	function load_model_failure(response){
	    if (response.responseText !== undefined) {
		alert("Missed loading files")
		    }
	}
		   
	/*var model_store = Ext.create('Ext.data.Store', {
	  model: 'User',
	  data: [],
	  proxy: {
	  type: 'ajax',
	  url : '/ecell/list_models.cgi',
	  method: "GET",
	  params: params,
	  success: load_model_success,
	  failure: load_model_failure
	  }
	  });*/

    	var params = { "ID": "test" };

	Ext.Ajax.request({
		url: "/ecell/list_models.cgi",
		    method: "GET",
		    params: params,
		    success: load_model_success,
		    failure: load_model_failure,
		    });
   
	Ext.define('StoreModel', {
		extend: 'Ext.data.Model',
		    fields: ['model']
		    });
    
	// make list of models
	var store_model = Ext.create('Ext.data.Store', {
		storeId: 'store_model',
		model: 'StoreModel',
		sorters: ['model'],
		groupField: 'model',
	    });

	var grid3 = Ext.create('Ext.grid.Panel', {
		autoScroll:true,
		width: 500,
		border:false,
		iconCls:'nav',
		titleCollapsible: true,
		frame: true,
		store: store_model,
		title: 'E-Cell Library',
		//	features: [groupingFeature],
		columns: [{
			text: 'model',
			flex: 1,
			dataIndex: 'model'
		    }],
		/*	fbar  : ['->', {
			text:'Clear Grouping',
			iconCls: 'icon-clear-group',
			handler : function(){
			groupingFeature.disable();
			}
			}]*/
	    });

	grid3.getSelectionModel().on('selectionchange', function(sm, selectedRecord) {

		params = { "ID": selectedRecord[0].data.model };

		//send Ajax Request
		Ext.Ajax.request({ 
			url: "/ecell/test.cgi",
			    method: "GET", 
			    params: params, 
			    success: handleSuccess, 
			    failure: handleFailure, 
			    }); 
	    });

	var viewport = Ext.create('Ext.Viewport', {
		layout:'border',
		border: false,
		items: [{
			  region: 'north',
			  id: 'north-panel',
			  height: 80,
			  width: 100,
			  xtype: 'panel',
			  html: "<div style='background: -webkit-gradient(linear, left top, left bottom, from(khaki), to(white));'><img src='./pinus_logo.png' height='100%' /></div>",
			  
			  style: {
				}
			},{
			region:'west',
			title: 'Selection Model',
			id:'west-panel',
			split:true,
			height: 400,
			width: 300,
			collapsible: true,
			margin: '1 0 3 3',
			layout: 'fit',
			border: false,
			items: [{
				region: 'north',
				title: 'Model Database',
				layout: 'accordion',
				maxHeight: Ext.getBody().getViewSize().height * 0.50,
				items: [ grid3,{
					title:'BioModels',
					html: 'Under Construction',
					frame: true,
					border: false,
					autoScroll:true,
					iconCls:'settings'
				    }]
			    },{
				region:'south',
				title: 'About Model',

				height: Ext.getBody().getViewSize().height * 0.47,
				//			    layout: 'fit',
				items: [{
					title: 'Annotation',                        
					frame: true,
					split:true,
					height: Ext.getBody().getViewSize().height * 0.20,
					autoscroll: true,
					html: 'Under Construction<br>Description of Model',
					//					html: Ext.example.shortBogusMarkup
					//iconCls:'settings'
				    },{
					title: 'Pathway Map',
					autoscroll: true,
					split:true,
					frame: true,
					height: Ext.getBody().getViewSize().height * 0.20,
					html: 'Under Construction<br>Show a Picture of Pathwaymap'
				    }]
			    }]
		    }, {
			region:'center',
			autoscroll: true,
			layout:'column',
			margin: '1 3 3 0',
			defaults: {
			    layout: 'anchor',
			    defaults: {
				anchor: '100%'
			    }
			},
			items:[
			       tabs
			       ]
		    }]
	    });
    });	