function variable_grid(responseJSON){
    var variable_grid = Ext.create('Ext.grid.Panel', {
	    store: Ext.create('Ext.data.ArrayStore', {
		    fields: [{name: 'v_id'},{name: 'path'},{name: 'value', type: 'float'},{name: 'molarconc', type: 'float'},{name: 'classname'} ]
		}),
	    pmargin: '2 2 0 1',
	    stateful: true,
	    stateId: 'stateGrid',
	    autoScroll: true,
	    title: 'Variable',
            flex: 2,
            height: '200%',
	    viewConfig: { stripeRows: true },
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
		    //width    : 150,
		    sortable : true,
		    renderer : change,
		    dataIndex: 'molarconc',
		    editor: {
			xtype: 'numberfield',
			allowBlank: false
		    }
		}],
	    plugins: [cellEditing]
	});
    
    //change Value or MolarConc
    variable_grid.getSelectionModel().on('selectionchange', function(sm, selectedRecord) {
	    if (selectedRecord.length) {
		var gridrecord = variable_grid.getSelectionModel().getSelection();
		console.log(gridrecord[0].data);
		//alert(gridrecord[0].data);

		//written by Duke
		var v_ID = gridrecord[0].data.v_id;
		var Path = gridrecord[0].data.path;
		var path_ID = Path +"/"+ v_ID;
		var set_value = gridrecord[0].data.value;

		//SetValue_sucsess
		function set_value_success(response){
		    if (response.responseText !== undefined) {
			var resultJSON = JSON.parse(response.responseText);
			variable_grid.getStore().loadData(resultJSON);
		    }
		}

		//SetValue_failure                                               
		function set_value_failure(response){
		    if (response.responseText !== undefined) {
			alert("Missed setting value")
			    }
		}
		//SetValue
		var params = { "sessionID":session_ID,"PathID":path_ID,"setValue":set_value};
		Ext.Ajax.request({
			url: "/mmA/SetValue.cgi",
			    method: "GET",
			    params: params,
			    success: set_value_success,
			    failure: set_value_failure,
			    });
		    }
	});
    variable_grid.getStore().loadData(responseJSON);
    return variable_grid;
};

function process_grid (responseJSON){
    var process_grid = Ext.create('Ext.grid.Panel', {
	    store: Ext.create('Ext.data.ArrayStore', {
		    fields: [{name: 'p_id'}, {name: 'p_path'}, {name: 'activity',  type: 'float'}, {name: 'm_activity',  type: 'float'}, {name: 'classname'}, {name: 'expression'}, {name: 'v_r_l'}, {name: 'property'}]
		}),
	    stateful: true,
	    stateId: 'stateGrid',
            flex: 2,
	    //height: Ext.getBody().getViewSize().height - 128,
	    height: '200%',
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
		    //width    : 75,
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
			this.up().down('form').down('fieldset').items[0].setValue(records[0].data.p_id);
			this.up().down('form').down('fieldset').items[1].setValue(records[0].data.expression);
			this.up().down('form').down('fieldset').items[2].setValue(records[0].data.v_r_l);
			this.up().down('form').down('fieldset').items[3].setValue(records[0].data.property);
		    }
		}
	    }
	});

    process_grid.getStore().loadData(responseJSON);
    return process_grid;
};