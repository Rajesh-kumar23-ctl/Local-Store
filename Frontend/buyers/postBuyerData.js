async function postBuyerData(data) {
  try {
    const res = await fetch("http://localhost:5000/api/buyers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    console.log("Buyer registered:", result);
    alert("Registration successful!");
    document.getElementById("buyer-form").reset();
  } catch (err) {
    console.error("Error registering buyer:", err);
    alert("Registration failed. Please try again.");
  }
}
