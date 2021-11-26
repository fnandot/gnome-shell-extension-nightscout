'use strict';

const Gio = imports.gi.Gio;
const Gtk = imports.gi.Gtk;

const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();


function init() {
}

function buildPrefsWidget() {

    // Copy the same GSettings code from `extension.js`
    let gschema = Gio.SettingsSchemaSource.new_from_directory(
        Me.dir.get_child('schemas').get_path(),
        Gio.SettingsSchemaSource.get_default(),
        false
    );

    this.settings = new Gio.Settings({
        settings_schema: gschema.lookup('org.gnome.shell.extensions.nightscout', true)
    });

    // Create a parent widget that we'll return from this function
    let prefsWidget = new Gtk.Grid({
        margin_start: 18,
        margin_end: 18,
        margin_top: 18,
        margin_bottom: 18,
        column_spacing: 8,
        row_spacing: 5,
        visible: true
    });

    // Add a simple title and add it to the prefsWidget
    let title = new Gtk.Label({
        // As described in "Extension Translations", the following template
        // lit
        // prefs.js:88: warning: RegExp literal terminated too early
        //label: `<b>${Me.metadata.name} Extension Preferences</b>`,
        label: '<b>' + Me.metadata.name + ' Extension Preferences</b>',
        halign: Gtk.Align.START,
        use_markup: true,
        visible: true
    });

    prefsWidget.attach(title, 0, 0, 2, 1);

    // Create a label & switch for `nightscout`
    let toggleLabel = new Gtk.Label({
        label: 'Nightscout API:',
        halign: Gtk.Align.START,
        visible: true
    });

    prefsWidget.attach(toggleLabel, 0, 2, 1, 1);

    let toggle = new Gtk.Entry({
        text: this.settings.get_string ('nightscout'),
        halign: Gtk.Align.END,
        visible: true
    });

    prefsWidget.attach(toggle, 1, 2, 1, 1);

    // Bind the switch to the `nightscout` key
    this.settings.bind(
        'nightscout',
        toggle,
        'text',
        Gio.SettingsBindFlags.DEFAULT
    );

    return prefsWidget;
}
