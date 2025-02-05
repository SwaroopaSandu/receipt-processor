
# Receipt Processor API

This is a **Node.js application** that processes receipts and calculates points based on specific rules.  
It is **Dockerized**, so you can run it easily without installing Node.js manually.

---------------------------------------------------------------------------------------------------------
# How to Run the Project

### 1. Install Docker
Before running this project, make sure **Docker** is installed.  
- **[Download Docker for Mac/Windows/Linux](https://www.docker.com/products/docker-desktop/)**
- Install and **start Docker Desktop**.

### 2. Clone the Project
Open **Terminal** (or Command Prompt) and run:

git clone <https://github.com/SwaroopaSandu/receipt-processor.git>

cd receipt-processor

### 3. Now Run the Project with Docker
docker-compose up --build

This will: Build the application
Runs on http://localhost:3000

### 4. API Endpoints 
Once the server is running, you can test the API's - 

* Request Type: POST
* URL: http://localhost:3000/receipts/process
* Description: Submits a receipt and returns a unique receipt ID.
What Happens?
* The API stores the receipt in memory.
* Returns a unique receipt ID that can be used to fetch points.


* Request Type: GET
* URL: http://localhost:3000/receipts/{id}/points
* Description: Retrieves the points awarded for a submitted receipt.
Here, replace {id} with the actual receipt ID from the POST response.
How Are Points Calculated?
1 point for every alphanumeric character in the retailer name.
50 points if the total is a round dollar amount.
25 points if the total is a multiple of 0.25.
5 points for every two items on the receipt.
More points based on specific rules.


* Request Type: GET
* URL: http://localhost:3000/receipts
* Description: Returns all stored receipt IDs.
  


