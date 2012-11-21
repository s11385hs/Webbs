// make CheckBox 'selModel -> selection model' 
var selModel = Ext.create('Ext.selection.CheckboxModel', {
        listeners: {
            selectionchange: function(sm, selections) {
                selfmodel.down('#removeButton').setDisabled(selections.length == 0);
            }
	}
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
	groupField: 'model'
    });

var premodel = Ext.create('Ext.grid.Panel', {
	autoScroll:true,
	flex: 1,
	border:false,
	iconCls:'nav',
	//	titleCollapsible: true,
	frame: true,
	store: store_model,
	title: 'E-Cell Library',
	//	selModel: selModel,
	columns: [{
		text: 'model',
		flex: 1,
		dataIndex: 'model'
	    }],
    });

premodel.getSelectionModel().on('selectionchange', function(sm, selectedRecord) {
	
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


