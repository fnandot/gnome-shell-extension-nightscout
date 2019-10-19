# Nightscout for GNOME Shell
This extension integrates Nightscout into GNOME Shell.


This extension is not currently done and is in beta testing.

## Features
* Retrieve glucose values from Nightscout.
* Show a notification when your glucose readings are missing.
* High, low and missing readings notifications on your GNOME message tray.
* Glucose is falling down and raising up notifications on your GNOME message tray.

## Missing features
* Support for mmol/L
* Localized support
* Configurable levels for alerts (now 80 mg/dl for low and 180 mg/dl for high)
* Configurable delta for raising and falling alerts (now -10 for falling and +10 for raising)

## Screenshots

### Notifications
![https://github.com/letnando/gnome-shell-extension-nightscout/raw/master/notifications.screenshot.png](https://github.com/letnando/gnome-shell-extension-nightscout/raw/master/notifications.screenshot.png)

### Panel indicator
![https://github.com/letnando/gnome-shell-extension-nightscout/raw/master/panel-indicator.screenshot.png](https://github.com/letnando/gnome-shell-extension-nightscout/raw/master/panel-indicator.screenshot.png)

## To improve
* Improve preferences screen
* Improve code quality

## Installation
Clone from Git:
```
git clone https://github.com/letnando/gnome-shell-extension-nightscout.git \
~/.local/share/gnome-shell/extensions/gnome-shell-extension-nightscout@letnando
```

You will need to restart GNOME Shell (<kbd>Alt</kbd>+<kbd>F2</kbd>) and type `gnome-shell --replace` after that.

## Disclaimer
All information, thought, and code described here is intended for informational and educational purposes only. Use Nightscout GNOME Shell Extensions at your own risk, and do not use the information or code to make medical decisions.


