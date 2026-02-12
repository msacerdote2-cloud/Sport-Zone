const MARGIN = 5000;

const products = [
  { name: 'COMBO CREATINA OPTIMUM 300G + WHEY OPTIMUM 310G', category: 'Combos', transferPrice: 97315 },
  { name: 'WHEY PROTEIN STAR NUTRITION 2 LB', category: 'Proteínas', transferPrice: 113100 },
  { name: 'CARNIVOR BEEF PROTEIN 4 LB', category: 'Proteínas', transferPrice: 169000 },
  { name: 'CREATINA ENA MONOHIDRATO 300G', category: 'Creatinas', transferPrice: 41600 },
  { name: 'CREATINA STAR NUTRITION 300G', category: 'Creatinas', transferPrice: 43500 },
  { name: 'PRE ENTRENAMIENTO C4 ORIGINAL', category: 'Pre-entreno', transferPrice: 70500 },
  { name: 'BCAA XTEND 30 SERVICIOS', category: 'Aminoácidos', transferPrice: 61200 },
  { name: 'GLUTAMINA 300G ENA', category: 'Recuperación', transferPrice: 28600 },
  { name: 'L-CARNITINA LÍQUIDA NUTREX', category: 'Definición', transferPrice: 37800 },
  { name: 'MASS GAINER STAR NUTRITION 3 KG', category: 'Ganadores', transferPrice: 89200 },
  { name: 'PROTEIN BAR ENA (CAJA x12)', category: 'Snacks', transferPrice: 24500 },
  { name: 'MULTIVITAMÍNICO UNIVERSAL', category: 'Vitaminas', transferPrice: 31500 },
];

const productsGrid = document.getElementById('productsGrid');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
document.getElementById('year').textContent = new Date().getFullYear();

const currency = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  maximumFractionDigits: 0,
});

const categories = [...new Set(products.map((p) => p.category))].sort((a, b) => a.localeCompare(b));
categories.forEach((category) => {
  const option = document.createElement('option');
  option.value = category;
  option.textContent = category;
  categoryFilter.appendChild(option);
});

function finalPrice(transferPrice) {
  return transferPrice + MARGIN;
}

function productCardTemplate(product) {
  const salePrice = finalPrice(product.transferPrice);
  return `
    <article class="product-card">
      <h3>${product.name}</h3>
      <p class="category">${product.category}</p>
      <div class="price-block">
        <div class="price-label">Precio Sport Zone</div>
        <div class="price-value">${currency.format(salePrice)}</div>
        <div class="source">Base proveedor (transferencia): ${currency.format(product.transferPrice)}</div>
      </div>
    </article>
  `;
}

function renderProducts() {
  const search = searchInput.value.toLowerCase().trim();
  const category = categoryFilter.value;

  const filtered = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(search) || product.category.toLowerCase().includes(search);
    const matchesCategory = category === 'all' || product.category === category;
    return matchesSearch && matchesCategory;
  });

  if (!filtered.length) {
    productsGrid.innerHTML = '<p class="empty">No encontramos productos con ese filtro.</p>';
    return;
  }

  productsGrid.innerHTML = filtered.map(productCardTemplate).join('');
}

searchInput.addEventListener('input', renderProducts);
categoryFilter.addEventListener('change', renderProducts);

renderProducts();
