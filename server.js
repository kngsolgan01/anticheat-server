const express = require('express');
const app = express();
app.use(express.json());

const reports = [];
const banned = new Set();

app.post('/report', (req, res) => {
    const { deviceId, reason, timestamp } = req.body;
    console.log(`[REPORT] ${deviceId} | ${reason} | ${timestamp}`);
    reports.push({ deviceId, reason, timestamp });

    const count = reports.filter(r => r.deviceId === deviceId).length;
    if (count >= 3) {
        banned.add(deviceId);
        console.log(`[BAN] ${deviceId}`);
    }
    res.json({ received: true });
});

app.get('/check/:deviceId', (req, res) => {
    res.json({ banned: banned.has(req.params.deviceId) });
});

app.listen(3000, () => console.log('Serveur anti-cheat actif'));