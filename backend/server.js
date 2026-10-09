
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Homepage route
app.get("/", (req, res) => {
  res.send("Node.js Backend is Running Successfully!");
});

// Test API route
app.get("/api/message", (req, res) => {
  res.json({
    message: "Hello from Node.js Backend!"
  });
});

// Hanco Fort Heights enquiry form API
app.post("/api/submit", (req, res) => {
  const { name, phone, email, city } = req.body || {};

  // Validate form fields
  if (
    typeof name !== "string" ||
    typeof phone !== "string" ||
    typeof email !== "string" ||
    !name.trim() ||
    !/^[0-9]{10}$/.test(phone) ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    return res.status(400).json({
      success: false,
      message: "Please enter valid name, phone and email."
    });
  }

  // Display submitted form data in terminal
  console.log("New Hanco Fort Heights Enquiry:", {
    name,
    phone,
    email,
    city
  });

  // Send response to React
  res.status(200).json({
    success: true,
    message: "Enquiry submitted successfully!"
  });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
