
async function postBuyerData(data) {
  try {
    const res = await fetch("http://localhost:5000/api/buyers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    console.log("Buyer registered:", result);
  } catch (err) {
    console.error("Error registering buyer:", err);
  }
}
