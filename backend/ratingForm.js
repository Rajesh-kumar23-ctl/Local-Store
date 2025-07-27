
document.getElementById("review-form").addEventListener("submit", async function (e) {
  e.preventDefault();
  const vendorId = document.getElementById("vendor-id").value.trim();
  const rating = parseInt(document.getElementById("rating").value);
  const comment = document.getElementById("comment").value.trim();
  if (!vendorId || !rating || !comment) {
    alert("Please fill all fields.");
    return;
  }
  const res = await fetch("http://localhost:5000/api/reviews", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ vendorId, rating, comment })
  });
  const result = await res.json();
  console.log("Review submitted:", result);
});
