/*jslint plusplus: true, vars: true, nomen: true */
/*global $, brackets, define, Mustache */

define(function (require, exports) {
    "use strict";

    var Dialogs                    = brackets.getModule("widgets/Dialogs"),
        FileSystem                 = brackets.getModule("filesystem/FileSystem"),
        FileUtils                  = brackets.getModule("file/FileUtils"),
        StringUtils                = brackets.getModule("utils/StringUtils"),
        Preferences                = require("./Preferences"),
        Strings                    = require("../strings"),
        changelogDialogTemplate    = require("text!htmlContent/git-changelog-dialog.html");

    var dialog;

    exports.show = function () {
        Strings.EXTENSION_VERSION = Preferences.get("lastVersion");
        var title = StringUtils.format(Strings.EXTENSION_WAS_UPDATED_TITLE, Strings.EXTENSION_VERSION);
        var compiledTemplate = Mustache.render(changelogDialogTemplate, {Strings: Strings, TITLE: title});
        dialog = Dialogs.showModalDialogUsingTemplate(compiledTemplate);

        FileUtils.readAsText(FileSystem.getFileForPath(Preferences.get("extensionDirectory") + "CHANGELOG.md")).done(function (content) {
            $("#git-changelog", dialog.getElement()).text(content);
        });
    };

});
