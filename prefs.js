'use strict';

const Gio = imports.gi.Gio;
const Gtk = imports.gi.Gtk;

const ExtensionUtils = imports.misc.extensionUtils;
const Me             = ExtensionUtils.getCurrentExtension();


function init() {
}

const buildGtkSpinButton = (settings, settingsKey, adjustment) => {
    let gtkButton = new Gtk.SpinButton(
        {
            adjustment: new Gtk.Adjustment(adjustment),
            numeric: true,
            digits: 0,
            value: settings.get_int(settingsKey),
            halign: Gtk.Align.START,
            visible: true,
        });
    settings.bind(settingsKey, gtkButton, 'value', Gio.SettingsBindFlags.DEFAULT);
    return gtkButton;
}

const buildGtkSwitch = (settings, settingsKey) => {
    let gtkSwitch = new Gtk.Switch(
        {
            active: settings.get_boolean(settingsKey),
            halign: Gtk.Align.START,
            visible: true
        });
    settings.bind(settingsKey, gtkSwitch, 'active', Gio.SettingsBindFlags.DEFAULT);
    return gtkSwitch;
}

const buildGtkLabel  = (label) => new Gtk.Label({label: label, halign: Gtk.Align.START, visible: true})
const toggleGtkEntry = (switchEntry, gtkEntry) => () => gtkEntry.set_sensitive(switchEntry.get_active())

function attachAlertBlock(prefsWidget, alertTitle, alertGtkSpinButton, alertSwitchGtkButton, gridRow) {

    const gtkSpinButtonLabel = buildGtkLabel(alertTitle)

    prefsWidget.attach(gtkSpinButtonLabel, 0, gridRow, 1, 1);
    prefsWidget.attach_next_to(alertSwitchGtkButton, gtkSpinButtonLabel, Gtk.PositionType.RIGHT, 1, 1);
    prefsWidget.attach_next_to(alertGtkSpinButton, alertSwitchGtkButton, Gtk.PositionType.BOTTOM, 1, 1);

    alertGtkSpinButton.set_sensitive(alertSwitchGtkButton.get_active())
}

function buildPrefsWidget() {

    // Copy the same GSettings code from `extension.js`
    let gschema = Gio.SettingsSchemaSource.new_from_directory(
        Me.dir.get_child('schemas').get_path(),
        Gio.SettingsSchemaSource.get_default(),
        false
    );

    this.settings = new Gio.Settings(
        {
            settings_schema: gschema.lookup('org.gnome.shell.extensions.nightscout', true)
        }
    );

    // Create a parent widget that we'll return from this function
    let prefsWidget = new Gtk.Grid(
        {
            margin: 18,
            column_spacing: 8,
            row_spacing: 8,
            visible: true
        });

    // Add a simple title and add it to the prefsWidget
    let title = new Gtk.Label(
        {
            label: '<b>' + Me.metadata.name + ' Extension Preferences</b>',
            halign: Gtk.Align.START,
            use_markup: true,
            visible: true
        });

    let nightscoutUrlLabel = new Gtk.Label({label: 'Nightscout API', halign: Gtk.Align.START, visible: true});
    let nightscoutUrl      = new Gtk.Entry(
        {
            text: this.settings.get_string('nightscout-url'),
            halign: Gtk.Align.START,
            visible: true,
            widthChars: 56
        });
    let alertsLabel        = new Gtk.Label(
        {
            label: '<b>Alerts</b>',
            halign: Gtk.Align.START,
            use_markup: true,
            visible: true
        });

    // Urgent low
    const urgentLowAlertSpin   = buildGtkSpinButton(settings, 'urgent-low-alert', {
        lower: 50,
        upper: 59,
        stepIncrement: 1
    });
    const urgentLowAlertSwitch = buildGtkSwitch(settings, "urgent-low-alert-enabled");

    // Low
    const lowAlertSpin   = buildGtkSpinButton(settings, 'low-alert', {lower: 60, upper: 100, stepIncrement: 1});
    const lowAlertSwitch = buildGtkSwitch(settings, "low-alert-enabled");

    // High
    const highAlertSpin   = buildGtkSpinButton(settings, 'high-alert', {lower: 120, upper: 279, stepIncrement: 1});
    const highAlertSwitch = buildGtkSwitch(settings, "high-alert-enabled");

    // Urgent high
    const urgentHighAlertSpin   = buildGtkSpinButton(settings, 'urgent-high-alert', {
        lower: 280,
        upper: 400,
        stepIncrement: 1
    });
    const urgentHighAlertSwitch = buildGtkSwitch(settings, "urgent-high-alert-enabled");

    const glucoseVariabilityAlertLabel  = new Gtk.Label(
        {
            label: '<b>Variability alert</b>',
            halign: Gtk.Align.START,
            use_markup: true,
            visible: true
        });
    const glucoseVariabilityAlertSwitch = buildGtkSwitch(settings, "glucose-variability-alert-enabled");

    // Falling glucose
    const raisingGlucoseAlertLabel = buildGtkLabel('Falling');
    const raisingGlucoseAlertSpin  = buildGtkSpinButton(settings, 'falling-glucose-alert', {
        lower: -20,
        upper: -1,
        stepIncrement: 1
    });

    // Raising glucose
    const fallingGlucoseAlertLabel = buildGtkLabel('Raising');
    const fallingGlucoseAlertSpin  = buildGtkSpinButton(settings, 'raising-glucose-alert', {
        lower: 1,
        upper: 20,
        stepIncrement: 1
    });

    this.settings.bind('nightscout-url', nightscoutUrl, 'text', Gio.SettingsBindFlags.DEFAULT);

    prefsWidget.attach(nightscoutUrlLabel, 0, 2, 1, 1);
    prefsWidget.attach(title, 0, 0, 2, 1);
    prefsWidget.attach(nightscoutUrl, 1, 2, 1, 1);

    prefsWidget.attach(alertsLabel, 0, 14, 1, 1);

    attachAlertBlock(prefsWidget, "Urgent Low", urgentLowAlertSpin, urgentLowAlertSwitch, 16);
    attachAlertBlock(prefsWidget, "Low", lowAlertSpin, lowAlertSwitch, 20);
    attachAlertBlock(prefsWidget, "High", highAlertSpin, highAlertSwitch, 24);
    attachAlertBlock(prefsWidget, "Urgent High", urgentHighAlertSpin, urgentHighAlertSwitch, 28);

    prefsWidget.attach(glucoseVariabilityAlertLabel, 0, 30, 1, 1);
    prefsWidget.attach_next_to(glucoseVariabilityAlertSwitch, glucoseVariabilityAlertLabel, Gtk.PositionType.RIGHT, 1, 1);

    prefsWidget.attach(fallingGlucoseAlertLabel, 0, 34, 1, 1);
    prefsWidget.attach(fallingGlucoseAlertSpin, 1, 34, 1, 1);

    prefsWidget.attach(raisingGlucoseAlertLabel, 0, 36, 1, 1);
    prefsWidget.attach(raisingGlucoseAlertSpin, 1, 36, 1, 1);

    urgentLowAlertSwitch.connect("state-set", toggleGtkEntry(urgentLowAlertSwitch, urgentLowAlertSpin))
    lowAlertSwitch.connect("state-set", toggleGtkEntry(lowAlertSwitch, lowAlertSpin))
    highAlertSwitch.connect("state-set", toggleGtkEntry(highAlertSwitch, highAlertSpin))
    urgentHighAlertSwitch.connect("state-set", toggleGtkEntry(urgentHighAlertSwitch, urgentHighAlertSpin))

    glucoseVariabilityAlertSwitch.connect("state-set", toggleGtkEntry(glucoseVariabilityAlertSwitch, raisingGlucoseAlertSpin))
    glucoseVariabilityAlertSwitch.connect("state-set", toggleGtkEntry(glucoseVariabilityAlertSwitch, fallingGlucoseAlertSpin))

    return prefsWidget;
}
