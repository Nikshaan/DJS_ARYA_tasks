const { add, subtract } = require("./math")

// 1 
console.log("Directory name/path: ", __dirname)
console.log("File name/path: ", __filename)

// 2
s = add(1, 2, 3, 4, 5);
console.log("Sum = ", s)

d = subtract(10, 1, 2, 3);
console.log("Difference = ", d)

// 3
const os = require('os');
const systemUptime = os.uptime();
console.log("System uptime: ", systemUptime, "s");

// 4
const path1 = require('path');

const pathJoin = path1.join('/data', 'telemetry.json');
console.log("Joined path: ", pathJoin);

// 5
const fs = require('fs');
const path = require('path');

let data = [{temperature: 24, voltage: 3.7}];

const filePath = path.join(__dirname,'/telemetry.json');
fs.writeFileSync(filePath, JSON.stringify(data));
console.log('Telemetry data saved');

// 6
const readData = fs.readFileSync(filePath);
const parsedData = JSON.parse(readData);

console.log("Read data: ", parsedData);

// 7
const newData = {pressure: 200, altitude: 100};

parsedData.push(newData);

fs.writeFileSync(filePath, JSON.stringify(parsedData));
console.log('New data appended')

// 8 & 9
const express = require('express');
const app = express();
app.use(express.json());
const port = 4321;

app.get('/', (req, res) => {
    res.send('Satellite link active');
});

app.get('/status', (req, res) => {
    res.json({status: 'online'});
});

app.get('/telemetry', (req, res) => {
  const data = fs.readFileSync(filePath);
  res.send(JSON.parse(data));
});

app.post('/telemetry', (req, res) => {
    const newTeleData = req.body;
    const fileData = fs.readFileSync(filePath);
    const teleArray = JSON.parse(fileData);
    teleArray.push(newTeleData);
    fs.writeFileSync(filePath, JSON.stringify(teleArray));

    res.send(`New data had been added`)
})

app.listen(port, () => {
  console.log(`Server listening to port: ${port}`);
});