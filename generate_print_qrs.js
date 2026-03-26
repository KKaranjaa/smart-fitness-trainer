const mongoose = require('mongoose');
const Machine = require('./src/models/Machine');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const generatePrintableQRs = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to DB');

        const machines = await Machine.find({});
        console.log(`Found ${machines.length} machines`);

        let html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Printable Machine QR Codes</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            text-align: center;
            background: #fff;
            color: #000;
            padding: 20px;
        }
        h1 { margin-bottom: 40px; }
        .grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 40px;
            max-width: 800px;
            margin: 0 auto;
        }
        .card {
            border: 2px dashed #ccc;
            padding: 20px;
            border-radius: 12px;
            page-break-inside: avoid;
        }
        .card img {
            width: 200px;
            height: 200px;
        }
        .card h2 {
            margin: 15px 0 5px 0;
            font-size: 1.5rem;
        }
        .card p {
            margin: 0;
            color: #555;
            font-size: 1rem;
        }
        @media print {
            body { padding: 0; }
            .grid { max-width: 100%; gap: 20px; }
            h1 { display: none; }
            .card { border: 1px solid #000; }
        }
    </style>
</head>
<body>
    <h1>Gym Machine QR Codes</h1>
    <p style="margin-bottom: 30px;">Print this page and attach the codes to the respective machines.</p>
    <div class="grid">
`;

        for (let m of machines) {
            html += `
        <div class="card">
            <img src="${m.qrCode}" alt="${m.name} QR Code">
            <h2>${m.name}</h2>
            <p>Scan to start workout</p>
        </div>
`;
        }

        html += `
    </div>
    <script>
        // Auto-trigger print dialog when opened
        window.onload = () => { window.print(); }
    </script>
</body>
</html>`;

        const outputPath = path.join(__dirname, 'src', 'public', 'qr-print.html');
        fs.writeFileSync(outputPath, html);
        console.log(`Successfully generated printable QR codes at: ${outputPath}`);

        process.exit(0);
    } catch (e) {
        console.error('Error generating QR printable page:', e);
        process.exit(1);
    }
};

generatePrintableQRs();
