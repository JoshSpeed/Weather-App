//jshint esversion: 8

const router = require("express").Router();
const fetch = require("node-fetch");

// Check and run date on page load

var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var today = new Date();
var currentDay = days[today.getDay()];
var currentDate = today.getDate();
var currentMonth = months[today.getMonth()];

router.get("/", function (req, res) {


    res.render("index", {
        currentDay: currentDay,
        currentDate: currentDate,
        currentMonth: currentMonth,
        city: null,
        temp: null,
        tempFL: null,
        weatherDescription: null,
        icon: null
    });

});

router.post("/", async (req, res) => {

    // Check for numbers - if so run zip code api call

    if (/\d/.test(req.body.cityName)) {
        let city = req.body.cityName.toLowerCase();
        city = city.replace(/\s/g, "");
        const apiKey = "cd37678205aac9dacd13731c94b012d4";
        const unit = "metric";
        const url = `https://api.openweathermap.org/data/2.5/weather?zip=${city},us&appid=${apiKey}&units=${unit}`;

        try {

            await fetch(url)
                .then(res => res.json())
                .then(data => {
                    if (data.message === "city not found") {
                        res.render("index", {
                            city: null,
                            temp: null,
                            tempFL: null,
                            weatherDescription: "Can't find location",
                            icon: null,
                            currentDay: currentDay,
                            currentDate: currentDate,
                            currentMonth: currentMonth
                        });
                    } else {
                        const city = data.name;
                        const temp = Math.round(data.main.temp);
                        const tempFL = Math.round(data.main.feels_like);
                        const weatherDescription = data.weather[0].description.toLowerCase()
                            .split(' ')
                            .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                            .join(' ');
                        const icon = data.weather[0].icon;

                        res.render("index", {
                            city: city,
                            temp: temp,
                            tempFL: tempFL,
                            weatherDescription: weatherDescription,
                            icon: icon,
                            currentDay: currentDay,
                            currentDate: currentDate,
                            currentMonth: currentMonth
                        });
                    }
                });

        } catch (e) {
            res.render("index", {
                city: null,
                temp: null,
                tempFL: null,
                weatherDescription: "Something went wrong",
                icon: null,
                currentDay: currentDay,
                currentDate: currentDate,
                currentMonth: currentMonth
            });
        }

    } else {
        const city = req.body.cityName.toLowerCase()
            .split(' ')
            .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
            .join(' ');
        const apiKey = "cd37678205aac9dacd13731c94b012d4";
        const unit = "metric";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;

        try {

            await fetch(url)
                .then(res => res.json())
                .then(data => {
                    if (data.message === "city not found") {
                        res.render("index", {
                            city: null,
                            temp: null,
                            tempFL: null,
                            weatherDescription: "Can't find location",
                            icon: null,
                            currentDay: currentDay,
                            currentDate: currentDate,
                            currentMonth: currentMonth
                        });
                    } else {
                        const city = data.name;
                        const temp = Math.round(data.main.temp);
                        const tempFL = Math.round(data.main.feels_like);
                        const weatherDescription = data.weather[0].description.toLowerCase()
                            .split(' ')
                            .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                            .join(' ');
                        const icon = data.weather[0].icon;

                        res.render("index", {
                            city: city,
                            temp: temp,
                            tempFL: tempFL,
                            weatherDescription: weatherDescription,
                            icon: icon,
                            currentDay: currentDay,
                            currentDate: currentDate,
                            currentMonth: currentMonth
                        });
                    }
                });

        } catch (e) {
            res.render("index", {
                city: null,
                temp: null,
                tempFL: null,
                weatherDescription: "Something went wrong",
                icon: null,
                currentDay: currentDay,
                currentDate: currentDate,
                currentMonth: currentMonth
            });
        }
    }




});

module.exports = router;