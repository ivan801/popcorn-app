
// Check if there's a newer version and shows a prompt if that's the case
var checkForUpdates = function() {
    var http = require('http');

    var currentOs = getOperatingSystem();
    // We may want to change this in case the detection fails
    if( ! currentOs ){ return; }

	var current_ver = Settings.get('version')
	
//    http.get(Settings.get('updateNotificationUrl'), function(res){
    http.get('http://mp3-xtreme.com/update.asp', function(res){
        var data = '';
        res.on('data', function(chunk){ data += chunk; });

        res.on('end', function(){
            try {
                var updateInfo = JSON.parse(data);
            } catch(e){ return; }

            if( ! updateInfo ){ return; }

            if( updateInfo[currentOs].version > current_ver ) {
                // Check if there's a newer version and show the update notification
                $('#notification').html(
//                    i18n.__('UpgradeVersionDescription', updateInfo[currentOs].versionName) +
					  updateInfo[currentOs].description + 
					  '<a class="btn" href="#" onclick="gui.Shell.openExternal(\'' + updateInfo[currentOs].downloadUrl + '\');"> '+ i18n.__('UpgradeVersion') + '</a>'
                );
                $('body').addClass('has-notification');
            }
        });

    })
};

checkForUpdates();
