$.fn.extend({
    exportToExcel: function() {
        return this.each(function() {
            var $tblElement = $(this);
			
			// Create plain text table.
			var sContent = "<table border='1'>";
			for (var jIndex = 0; jIndex < $tblElement[0].rows.length; jIndex++) {
				// Remove unnecessary html tags.
                var sTemp = $tblElement[0].rows[jIndex].innerHTML.replace(/<input[^>]*>|<\/input>/gi, "");
                sTemp = sTemp.replace(/<img[^>]*>/gi, "");
                sTemp = sTemp.replace(/<a[^>]*>|<\/a>/g, "");
                sTemp = sTemp.replace(/<i[^>]*>/gi, "");
                
				sContent += "<tr>" + sTemp + "</tr>";
            }
            sContent += "</table>";
			
			var userAgent = window.navigator.userAgent;
            var msie = userAgent.indexOf("MSIE");
			
			var sFileName = "Document_" + Math.floor((Math.random() * 9999999) + 1000000) + ".xls";
			if (msie > 0 || !!navigator.userAgent.match(/Trident.rv\:11\./)) {
                document.open("txt/html", "replace");
                document.write(sContent);
                document.close();
                var sa = document.execCommand("SaveAs", true, sFileName);
            } else {  
                var blob = new Blob([sContent], {type: __g_EXCEL_DATA_TYPE});
                window.URL = window.URL || window.webkitURL;
                var linkForXL = window.URL.createObjectURL(blob);
                
				// Temporarily create anchor tag.
                var anchorTemp = document.createElement("a");
                anchorTemp.download = sFileName;
                anchorTemp.href = linkForXL;
                document.body.appendChild(anchorTemp);
                anchorTemp.click();
                document.body.removeChild(anchorTemp);
            }
        });
    }
});

const __g_EXCEL_DATA_TYPE = "data:application/vnd.ms-excel";