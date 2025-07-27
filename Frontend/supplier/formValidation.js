function validateSupplierForm() {
  const name = document.getElementById("name").value.trim();
  const pin = document.getElementById("pin").value.trim();
  const place = document.getElementById("place").value.trim();
  const city = document.getElementById("city").value.trim();
  const state = document.getElementById("state").value.trim();
  const products = document.getElementById("products").value.split(',').map(p => p.trim()).filter(p => p);

  if (!name || !pin || !place || !city || !state || products.length === 0) {
    alert("Please fill all required fields correctly.");
    return null;
  }

  return {
    name,
    location: { pin, place, city, state },
    products
  };
}