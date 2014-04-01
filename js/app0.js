var
    // Configuration variable
    applicationRoot = './',

    // Load native UI library
    gui = require('nw.gui'),

    // Debug flag
    isDebug = gui.App.argv.indexOf('--debug') > -1,

    // browser window object
    win = gui.Window.get(),

    // os object
    os = require('os'),

    // path object
    path = require('path'),

    // fs object
    fs = require('fs'),

    // url object
    url = require('url'),

    // TMP Folder
    tmpFolder = path.join(os.tmpDir(), 'Popcorn-Time'),

    // i18n module (translations)
    i18n = require("i18n");

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}


// Set the app title (for Windows mostly)
win.title = 'MP3-Xtreme';


// Focus the window when the app opens
win.focus();

// Cancel all new windows (Middle clicks / New Tab)
//win.on('new-win-policy', function (frame, url, policy) {
//    policy.ignore();
//});


var preventDefault = function(e) {
    e.preventDefault();
}

// Prevent dropping files into the window
window.addEventListener("dragover", preventDefault, false);
window.addEventListener("drop", preventDefault, false);
// Prevent dragging files outside the window
window.addEventListener("dragstart", preventDefault, false);


/**
 * Show 404 page on uncaughtException
 */
//process.on('uncaughtException', function(err) {
    //if (console) {
        //console.log(err);
    //}
//});
