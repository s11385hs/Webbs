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