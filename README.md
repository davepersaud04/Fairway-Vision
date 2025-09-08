# Fairway-Vision

Current flow is as follows
Router: Boot Screen -> Config -> App main page
Connection: 
- Hotspot config: 
    Over Phone Hotspot, device is considered router, port should be opened for recieving camera stream at its local IP.
- Device Wifi config
    Using the glasses as a wifi hotspot, glasses are now router, and device needs to identifiy its self to glasses over some port.
    Glasses will then preform some action to hide the netwrok and store device IP. Phone must open some port to recieve stream data.
- Bluetooth

VPC Layers and IP requirements
Layers:
- App Layer
- Storage
- DB
- Reserved

Reigons:
- US-EAST 1
- US-EAST 2
- US-WEST 1
- US-WEST 2

Accounts:
general
dev
prod

