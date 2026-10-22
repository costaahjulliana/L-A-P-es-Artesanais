// EDITE esta lista com os produtos, descrições, preços e fotos reais da LeA.
const products = [
  {
    id: 1, name: "Pão rústico", category: "classicos", tag: "Clássico",
    description: "Casquinha dourada e miolo macio, perfeito para compartilhar.",
    price: 18.00, image: "https://images.unsplash.com/photo-1585478259715-876acc5be8eb?auto=format&fit=crop&w=800&q=85"
  },
  {
    id: 2, name: "Pão de sementes", category: "especiais", tag: "Especial",
    description: "Uma combinação saborosa com sementes e textura irresistível.",
    price: 22.00, image: "https://images.unsplash.com/photo-1598373182133-52452f7691ef?auto=format&fit=crop&w=800&q=85"
  },
  {
    id: 3, name: "Pão artesanal", category: "classicos", tag: "Feito à mão",
    description: "Receita artesanal para deixar qualquer café mais gostoso.",
    price: 16.00, image: "https://images.unsplash.com/photo-1608198093002-ad4e005484a0?auto=format&fit=crop&w=800&q=85"
  },
  {
    id: 4, name: "Pão doce", category: "doces", tag: "Doce carinho",
    description: "Macio, delicado e ideal para acompanhar um café fresquinho.",
    price: 20.00, image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=85"
  }
];

const WHATSAPP_NUMBER = "5519999574256";

const grid = document.querySelector("#product-grid");
const search = document.querySelector("#search");
let activeFilter = "todos";

const money = value => value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

function productCard(product) {
  return `
    <article class="product-card">
      <div class="product-image">
        <img src="${product.image}" alt="${product.name}" loading="lazy">
        <span class="product-tag">${product.tag}</span>
      </div>
      <div class="product-info">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <div class="product-bottom">
          <span class="product-price">${money(product.price)}</span>
          <button class="add-button" type="button" aria-label="Pedir ${product.name}" data-product="${product.id}">+</button>
        </div>
      </div>
    </article>`;
}

function renderProducts() {
  const term = search.value.trim().toLocaleLowerCase("pt-BR");
  const filtered = products.filter(product => {
    const categoryMatch = activeFilter === "todos" || product.category === activeFilter;
    const textMatch = `${product.name} ${product.description} ${product.tag}`.toLocaleLowerCase("pt-BR").includes(term);
    return categoryMatch && textMatch;
  });
  grid.innerHTML = filtered.length
    ? filtered.map(productCard).join("")
    : '<div class="empty-state">Não encontramos produtos com essa busca. Tente outro termo ♡</div>';
}

document.querySelectorAll(".filter").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach(item => item.classList.remove("active"));
    button.classList.add("active");
    activeFilter = button.dataset.filter;
    renderProducts();
  });
});
search.addEventListener("input", renderProducts);

function makeWhatsAppLink(message) {
  const number = WHATSAPP_NUMBER.replace(/\D/g, "");
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

grid.addEventListener("click", event => {
  const button = event.target.closest("[data-product]");
  if (!button) return;
  const product = products.find(item => item.id === Number(button.dataset.product));
  if (!product) return;
  if (WHATSAPP_NUMBER === "5511999999999") {
    alert("Antes de receber pedidos, configure o número real do WhatsApp no arquivo script.js.");
    return;
  }
  window.open(makeWhatsAppLink(`Olá! Gostaria de pedir: ${product.name} — ${money(product.price)}. Poderia confirmar a disponibilidade?`), "_blank", "noopener");
});

const mainWhatsApp = document.querySelector("#whatsapp-main");
mainWhatsApp.href = makeWhatsAppLink("Olá! Vim pelo site da LeA Pães Artesanais e gostaria de saber mais sobre os produtos.");
mainWhatsApp.addEventListener("click", event => {
  if (WHATSAPP_NUMBER === "5511999999999") {
    event.preventDefault();
    alert("Configure o número real do WhatsApp no arquivo script.js antes de publicar o site.");
  }
});

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));

document.querySelector("#year").textContent = new Date().getFullYear();
renderProducts();
