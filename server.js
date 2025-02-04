const express = require("express");
const { v4: uuidv4 } = require("uuid");
const calculatePoints = require("./calculatePoints"); // Importing the function

const app = express();
const port = 3000;

// parse JSON
app.use(express.json());

// In-memory storage for receipts
const receiptStorage = {};

/**
 * POST /receipts/process
 * Accepts a receipt JSON and returns a unique ID.
 */
app.post("/receipts/process", (req, res) => {
    const receipt = req.body;

    // Validate input (ensure required fields exist)
    if (!receipt || !receipt.retailer || !receipt.purchaseDate || !receipt.purchaseTime || !receipt.items || !receipt.total) {
        return res.status(400).json({ error: "Invalid receipt data" });
    }

    // Generate a unique receipt ID
    const receiptId = uuidv4();

    // Storing the receipt in-memory
    receiptStorage[receiptId] = receipt;

    // Returns the generated ID
    res.json({ id: receiptId });
});

app.get("/receipts", (req, res) => {
    // Get all stored receipt IDs
    const allIds = Object.keys(receiptStorage);

    res.json({ receipts: allIds });
});

/**
 * GET /receipts/{id}/points
 * Retrieves the points awarded for the given receipt ID.
 */
app.get("/receipts/:id/points", (req, res) => {
    const { id } = req.params;

    // Checking if the receipt exists or not
    if (!receiptStorage[id]) {
        return res.status(404).json({ error: "No receipt found for that ID." });
    }

    const receipt = receiptStorage[id];

    // Calculating the points based on rules
    const points = calculatePoints(receipt);

    res.json({ points });
});


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
