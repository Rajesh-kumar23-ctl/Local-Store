
document.getElementById("search-btn").addEventListener("click", async function () {
  const query = document.getElementById("search-input").value.trim().toLowerCase();
  const res = await fetch("http://localhost:5000/api/suppliers");
  const data = await res.json();
  const filtered = data.filter(vendor => 
    vendor.name.toLowerCase().includes(query) ||
    vendor.location.toLowerCase().includes(query)
  );
  console.log("Search results:", filtered);
});
