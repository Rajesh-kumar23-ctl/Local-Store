
function validateBuyerForm() {
  const name = document.getElementById("buyer-name").value.trim();
  const email = document.getElementById("buyer-email").value.trim();
  const pin = document.getElementById("pin").value.trim();
  const place = document.getElementById("place").value.trim();
  const city = document.getElementById("city").value.trim();
  const state = document.getElementById("state").value.trim();
  const products = document.getElementById("product_name").value.trim();
  if (!name || !pin || !place || !city || !state || products.length === 0) {
    alert("All buyer fields are required.");
    return false;
  }
  return { 
    name,
    location: { pin, place, city, state },
    products 
  };
}