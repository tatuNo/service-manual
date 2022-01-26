# Service-manual

Service manual api to help factories to document their service tasks. Factory can have several devices and tasks related to these devices. 
Device has a name, year, type and tasks related to device. Task has date, description, criticalness (1-3, 3 being highest) and ready (boolean, meaning task status). 
Both models have automatically generated identifying IDs.

# Installation
Make sure to have Node.js version atleast '15.0.1' and npm version astlest '7.19.1' installed. Api uses MongoDB, so place your MongoDB_URI in .env file and if you wish to use
tests provide URI for tests. MongoDB Atlas recommended.

Clone the project. Install dependencies with `npm install`. Run tests `npm test` and start server with `npm start`.

# Usage

`POST` `http://localhost:3001/api/devices`
Adds new device. Provide information in JSON format, for example: 
{
    "name": "Device 9",
    "year": 2009,
    "type": "Type 7"
}
Name, year and type are all required.

`GET` `http://localhost:3001/api/devices`
Returns all devices

`GET` `http://localhost:3001/api/devices/:id`
Returns device related to id.

`POST` `http://localhost:3001/api/tasks`
Adds new task. Provide information in JSON format, for example: {
    "device": "61f02dd91cfd8744cb52e539",
    "description": "Broken...",
    "criticalness": 1,
    "ready": true
}
Date is automatically created, all other fields are required.

`GET` `http://localhost:3001/api/tasks`
Returns all tasks sorted primarily by criticalness and secondarily by date (newest first). Task can be filtered using query parameters, for example

`GET` `http://localhost:3001/api/tasks?device.name=Device+0`

`GET` `http://localhost:3001/api/tasks?ready=false&device.year=2011`

`PUT` `http://localhost:3001/api/devices/:id`
Update device related to id. Provide atleast one field to be updateded in JSON format, for example: { "ready": true }
Date is automatically updated.

`DELETE` `http://localhost:3001/api/devices/:id`
Deletes task related to id.

Feel free to use postman collection located in docs folder.
