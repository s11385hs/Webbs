//Ajax request annotation of selected model                                                                           
function annotationSuccess(response){
    if (response.responseText !== undefined) {
        var responseJSON = JSON.parse(response.responseText);
        //alert(responseJSON)                                                                                         
        tabs.getRefItems()[1].getRefItems()[0].getRefItems()[1].getRefItems()[1].body.dom.innerText =  responseJSON;
    }
}

//Ajax failed                                                                                                         
function annotationFailure(response){
    if (response.responseText !== undefined) {
        alert("Missed loadeing annotation")
            }
}

//Ajax request pathway map of selected model                                                                          
function mapSuccess(response){
    if (response.responseText !== undefined) {
        var responseJSON = JSON.parse(response.responseText);
        tabs.getRefItems()[1].getRefItems()[0].getRefItems()[1].getRefItems()[2].body.dom.innerHTML = "<div style='background: -webkit-gradient(linear, left top, left bottom, from(4682b4),　to(b0c4de));'><img src='../../ecell/pathway_map/" + responseJSON + "' alt='' width='92%' height='69%'/></div>"
	    }
}

//Ajax failed                                                                                                         
function mapFailure(response){
    if (response.responseText !== undefined) {
        alert("Missed loadeing pathway map")
            }
}


//Ajax request "load list of model"                                                                      
function load_model_success(response){
    if (response.responseText !== undefined) {
	var responseJSON = JSON.parse(response.responseText);
	var responseJSON_model_name = responseJSON.model_name;
	premodel.getStore().loadData(responseJSON.model_name);
    }
}

//Ajax failed
function load_model_failure(response){
    if (response.responseText !== undefined) {
	alert("Missed loading files")
	    }
}

var params = { "ID": "test" };
Ext.Ajax.request({
	//url: "/ecell/list_models.cgi",
	url: "/ecell/marco.cgi",
	    method: "GET",
	    params: params,
	    success: load_model_success,
	    failure: load_model_failure,
	    })



//Ajax request for "Entity Data"
var session_ID = "";

var tabs_entity = Ext.createWidget('tabpanel',{
	border: false
    });

function handleSuccess(response) {
    if (response.responseText !== undefined) {
	var responseJSON = JSON.parse(response.responseText);
	var responseJSON_process  = responseJSON.Process;
	var responseJSON_variable = responseJSON.Variable;
	session_ID = responseJSON.ID;
	//	console.log(responseJSON_process);
	//	alert(session_ID);

	if (tabs_entity.items.length == 0) {
	    tabs.add({
		    title: 'Entity',
			items:[ tabs_entity ]
			}).show;
	};
	
	tabs_entity.add({
		title: 'Entity ' + (tabs_entity.items.length + 1),
		    layout: 'hbox',
		    border: false,		    
		    items: [
			    variable_grid( responseJSON_variable ),
			    process_grid(  responseJSON_process  ),
			    {   
				xtype: 'form',
                                border: false,
                                flex: 1,
                                items: [{
					title: 'Property Details(editable)',
					    xtype: 'fieldset',            
					    defaultType: 'textfield',
					    items: [{
						fieldLabel: 'ID',
						    name: 'p_id',
						    disabled: false,
						    editable: false,						 
						    width: 220,
						    value: ''
						    },{
						fieldLabel: 'Expression',
						    name: 'expression',
						    editable: false,
						    disabled: false,
						    xtype: 'textareafield',
						    width: 220,
						    height: 150
						    },{
						fieldLabel: 'Variable Reference List',
						    name: 'v_r_l',
						    disabled: false,
						    editable: false,
						    xtype: 'textareafield',
						    width: 220
						    },{
						fieldLabel: 'Property List',
						    xtype: 'textareafield',
						    width: 220						      
							      }]
					    },{
					xtype: 'panel',
					    border: false,
					    style: { "background-color": '#ffffff', "text-align": 'center'  },
					    items: [
						    Ext.create('Ext.Button', {
							    text: 'Run!!',
								scale: 'large',
								width: 100,
								handler: function() {
								var params = { "session_ID": session_ID };
								Ext.Ajax.request({
									url: "/ecell/python_jy3.cgi",
									    method: "GET",
									    params: params,
									    success: result_graph_success,
									    failure: result_graph_failure
									    });
							    }
							})
						    ]
					    }
					]
				    }]
		    }).show;
    }
};

//Ajax failed  
function handleFailure(response) {
    if (response.responseText !== undefined) {
	alert('Sorry!! Failed (T_T)');
    }
}

//Click Process -> show property 
function getPropertySuccess(response){
    console.log(this);
    if (response.responseText !== undefined) {
        var responseJSON = JSON.parse(response.responseText);
        var responseJSON_process  = responseJSON.Process;
	console.log(responseJSON.Expression);

    };

}

function getPropertyFailure(response){
    if (response.responseText !== undefined) {
	alert("fuck!!");
    };

}

var charts = Array();
var result_tabs= Ext.createWidget('tabpanel', {
	border: false,
    
});


function result_graph_success(response) {
    if (response.responseText !== undefined) {
	var resultJSON = JSON.parse(response.responseText);
	if ( result_tabs.items.length == 0 ){
	    tabs.add({  
		    title: 'Result',
			layout: 'fit',
			items: [ result_tabs ]
			}).show();
	};
	
	result_tabs.add({
                title: 'Result' + (result_tabs.items.length + 1),
		    layout: 'fit',
		    items:[ show_graph(resultJSON[0].Data, resultJSON[0].Title) ]
		    }).show();
    };
};

//Ajax failed
function result_graph_failure(response){ 
    if (response.responseText !== undefined) {
	alert('Sorry!! Missed (T_T)');
    }
}
