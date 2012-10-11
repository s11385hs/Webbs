Ext.define('Company', {
        extend: 'Ext.data.Model',
            fields: [
                     {name: 'company'},
                     {name: 'price', type: 'float'},
                     {name: 'change', type: 'float'},
                     {name: 'pctChange', type: 'float'},
                     {name: 'lastChange', type: 'date', dateFormat: 'n/j h:ia'},
                     {name: 'industry'},
                     {name: 'desc'}
         ]
            });

    Ext.grid.dummyData = [
                          ['3m Co',71.72,0.02,0.03,'9/1 12:00am', 'Manufacturing'],
                          ['Alcoa Inc',29.01,0.42,1.47,'9/1 12:00am', 'Manufacturing'],
                          ['Altria Group Inc',83.81,0.28,0.34,'9/1 12:00am', 'Manufacturing'],
                          ['American Express Company',52.55,0.01,0.02,'9/1 12:00am', 'Finance'],
                          ['American International Group, Inc.',64.13,0.31,0.49,'9/1 12:00am', 'Services'],
                          ['AT&T Inc.',31.61,-0.48,-1.54,'9/1 12:00am', 'Services'],
                          ['Boeing Co.',75.43,0.53,0.71,'9/1 12:00am', 'Manufacturing'],
                          ['Caterpillar Inc.',67.27,0.92,1.39,'9/1 12:00am', 'Services'],
                          ['Citigroup, Inc.',49.37,0.02,0.04,'9/1 12:00am', 'Finance'],
                          ['E.I. du Pont de Nemours and Company',40.48,0.51,1.28,'9/1 12:00am','Manufact'],
                          ['Exxon Mobil Corp',68.1,-0.43,-0.64,'9/1 12:00am', 'Manufacturing'],
                          ['General Electric Company',34.14,-0.08,-0.23,'9/1 12:00am', 'Manufacturing'],
                          ['General Motors Corporation',30.27,1.09,3.74,'9/1 12:00am', 'Automotive'],
                          ['Hewlett-Packard Co.',36.53,-0.03,-0.08,'9/1 12:00am', 'Computer'],
                          ['Honeywell Intl Inc',38.77,0.05,0.13,'9/1 12:00am', 'Manufacturing'],
                          ['Intel Corporation',19.88,0.31,1.58,'9/1 12:00am', 'Computer'],
                          ['International Business Machines',81.41,0.44,0.54,'9/1 12:00am', 'Computer'],
                          ['Johnson & Johnson',64.72,0.06,0.09,'9/1 12:00am', 'Medical'],
                          ['JP Morgan & Chase & Co',45.73,0.07,0.15,'9/1 12:00am', 'Finance'],
                          ['McDonald\'s Corporation',36.76,0.86,2.40,'9/1 12:00am', 'Food'],
                          ['Merck & Co., Inc.',40.96,0.41,1.01,'9/1 12:00am', 'Medical'],
                          ['Microsoft Corporation',25.84,0.14,0.54,'9/1 12:00am', 'Computer'],
                          ];

// add in some dummy descriptions 
for(var i = 0; i < Ext.grid.dummyData.length; i++){
    Ext.grid.dummyData[i].push('Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Sed metus nibh, sodales a, porta at, vulputate eget, dui. Pellentesque ut nisl. ');
}

var getLocalStore = function() {
    return Ext.create('Ext.data.ArrayStore', {
            model: 'Company',
            data: Ext.grid.dummyData
        });
};


// make CheckBox 'selModel -> selection model' 
var selModel = Ext.create('Ext.selection.CheckboxModel', {
        listeners: {
            selectionchange: function(sm, selections) {
                selfmodel.down('#removeButton').setDisabled(selections.length == 0);
            }
	}
    });

var selfmodel = Ext.create('Ext.grid.Panel', {
        id:'button-grid',
        store: getLocalStore(),
        columns: [
{text: "Model Name", flex: 3, sortable: true, dataIndex: 'company'},
{text: "Add Date", flex: 1, sortable: true, renderer: Ext.util.Format.usMoney, dataIndex: 'price'},
                  ],
        columnLines: true,
        selModel: selModel,

        // inline buttons                               
        dockedItems: [{
                title: 'Uploaded Models',
                xtype: 'toolbar',
                layout:{pack:'end'},
                items: [{
                        text:'Add Something',
                        tooltip:'Add a new row',
                        iconCls:'add'
                    }]
            }],

        layout: 'fit',
        height: 150,
        frame: true,
        iconCls: 'icon-grid',
        renderTo: Ext.getBody()
    });