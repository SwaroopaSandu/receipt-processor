/**
 * Calculates points for a given receipt based on the specified rules.
 */
function calculatePoints(receipt) {
    let points = 0;

    // 1. One point for every alphanumeric character in the retailer name
    points += (receipt.retailer.match(/[a-zA-Z0-9]/g) || []).length;

    // 2. 50 points if the total is a round dollar amount with no cents
    if (Number(receipt.total) % 1 === 0) {
        points += 50;
    }

    // 3. 25 points if the total is a multiple of 0.25
    if (Number(receipt.total) % 0.25 === 0) {
        points += 25;
    }

    // 4. 5 points for every two items on the receipt
    points += Math.floor(receipt.items.length / 2) * 5;

    // 5. If trimmed length of item description is a multiple of 3, multiply price by 0.2 and round up
    receipt.items.forEach(item => {
        const trimmedDescription = item.shortDescription.trim();
        if (trimmedDescription.length % 3 === 0) {
            points += Math.ceil(Number(item.price) * 0.2);
        }
    });

    // 6. 6 points if the day in the purchase date is odd
    const purchaseDay = parseInt(receipt.purchaseDate.split("-")[2], 10);
    if (purchaseDay % 2 !== 0) {
        points += 6;
    }

    // 7. 10 points if the time of purchase is between 2:00 PM and 4:00 PM
    const [hour, minute] = receipt.purchaseTime.split(":").map(Number);
    if (hour === 14 || (hour === 15 && minute < 60)) {
        points += 10;
    }

    return points;
}

module.exports = calculatePoints;
