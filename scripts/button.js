//Define Run Button
var runbutton = Ext.create('Ext.Button', {
        text: 'Run!!',
        scale: 'large',
        width: 100,
        //      width: Ext.getBody().getViewSize().width * 0.185,               
	//        handler: create_result_tab
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