var express = require("express");
var router = express.Router();

let events = [
    {
        "eventTitle": "Open Mic @ Hebrews Coffee House",
        "eventDate": "02/23/21",
        "eventLocation": "ABC Roast, Someplace, CA",
        "eventTime": "09:00 PM",
        "eventCost": "$5",
        "eventDescription": "Open mic night",
        "id": 1
    },
    {
        "eventTitle": "Solo Event @ Holy Grounds",
        "eventDate": "03/14/21",
        "eventLocation": "ABC Roast, Someplace, CA",
        "eventTime": "08:30 PM",
        "eventCost": "$5",
        "eventDescription": "Open mic night",
        "id": 2
    },
    {
        "eventTitle": "Acoustic set @ Bean Redeemed",
        "eventDate": "05/7/21",
        "eventLocation": "ABC Roast, Someplace, CA",
        "eventTime": "07:15 PM",
        "eventCost": "$5",
        "eventDescription": "Open mic night",
        "id": 3
    }
]

router.get("/getEvents", async (req, res, next) => {
    res.json(events);
});

module.exports = router;
