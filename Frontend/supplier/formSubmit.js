document.getElementById("supplierForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const supplierData = validateSupplierForm();
  if (!supplierData) return;

  try {
    await submitSupplierData(supplierData);
    document.getElementById("status").innerText = "Supplier registered successfully!";
    document.getElementById("supplierForm").reset();
  } catch (err) {
    document.getElementById("status").innerText = "Error: " + err.message;
  }
});