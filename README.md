# Babybox Panel Backend

This repository contains a backend server in Node.js for the Babybox Panel Frontend. This project solves several problems:

- Dealing with CORS issues when requesting data from Babybox
- TODO: Accessing camera feed

## API

The API starts with `http://IP:PORT/api/v1/`; and then there are 3 main endpoints:

- `engine/` - for communicating with the engine unit
  - `data/` - to **GET** all the data from the unit
  - `settings/` - to **POST** settings to the unit
  - `actions/` - these endpoints don't follow the standard RESTful practices; they execute some action when GET request comes
    - `open/` - opens the front doors
    - `openServiceDoors/` - opens the service doors (mainly for reseting the babybox state)
- `thermal/` - for communicating with the thermal unit
  - `data/` - to **GET** all the data from the unit
  - `settings/` - to **POST** settings to the unit
- `camera/` - for communicating with the camera
