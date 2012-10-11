Ext.require(['*']);
Ext.Loader.setPath('Ext.ux', '../ux/');
Ext.Loader.setConfig({
        enabled : true,
            disableCaching : true, // For debug only                                   
            paths : { 'Chart' : 'Chart' }
    });
Ext.require('Chart.ux.HighChart');
Ext.QuickTips.init();