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
            height: '100%',
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
	    height: '100%',
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
			var gridrecord = process_grid.getSelectionModel().getSelection();
			console.log(gridrecord[0].data.p_path);

			var PATH = gridrecord[0].data.p_path + ":" + gridrecord[0].data.p_id;

			params.PATH = PATH;
			params.sessionID = session_ID;

		    if (records[0]) {
			Ext.Ajax.request({
				url: "/dysuke/es/getEachProcessProperty.cgi",
				method: "GET",
				params: params,
 			        success: this.getPropertySuccess,
				failure: getPropertyFailure,
			    });

		    }
		}
	    }
	});


    process_grid.getPropertySuccess = function(response){
	if (response.responseText !== undefined) {
	    var responseJSON = JSON.parse(response.responseText);
	    console.log(responseJSON.PropertyList.length);
	    plist = new String();
	    
	    for (i=0; i < responseJSON.PropertyList.length; i = i+1){
		plist += responseJSON.PropertyList[i].Name;
		plist += ":"+"\t";
	        plist += responseJSON.PropertyList[i].Value;
		plist += "\n";
	    }
	    tabs_entity.getActiveTab().getRefItems()[2].getRefItems()[0].getRefItems()[1].setValue(responseJSON.ReactionName);
	    tabs_entity.getActiveTab().getRefItems()[2].getRefItems()[0].getRefItems()[2].setValue(responseJSON.Expression);
	    tabs_entity.getActiveTab().getRefItems()[2].getRefItems()[0].getRefItems()[3].setValue(responseJSON.VariableReferenceList);
	    tabs_entity.getActiveTab().getRefItems()[2].getRefItems()[0].getRefItems()[4].setValue(plist);	    
	}
    };

    process_grid.getStore().loadData(responseJSON);
    return process_grid;
};