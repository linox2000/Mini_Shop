class Product {
  constructor(title, image, desc, price) {
    this.title = title;
    this.imageUrl = image;
    this.description = desc;
    this.price = price;
  }
}

class Shopping {
  items = [];
  get totalAmount() {
    const sum = this.items.reduce(
      (prevValue, curItem) => prevValue + curItem.price,
      0
    );
    return sum
  }
  addProduct(product) {
    this.totalOutput.innerHTML = `<h2>Total:\$${this.totalAmount.toFixed(2)}</h2`;
    this.items.push(product);
    console.log(this.items);
  }
  render() {
    const cartEl = document.createElement("section");
    cartEl.innerHTML = `<h2>Total:\$${0}</h2>
                         <button>Order Now</button>`;
    cartEl.className = "cart";
    this.totalOutput = cartEl.querySelector("h2");
    return cartEl;
  }
}
class ProductItem {
  constructor(product) {
    this.product = product;
  }
  addToCart() {
    App.addproductToCart(this.product);
  }
  render() {
    const prodEl = document.createElement("li");
    prodEl.className = "product-item";
    prodEl.innerHTML = `
         <div>
          <img src='${this.product.imageUrl}' alt='${this.product.title}' />
        <div class ='product-item__content'>
          <h2>${this.product.title}</h2>
             <h3>${this.product.price}</h3>
                <p>${this.product.description}</p>
                  <button>Add to Cart</button>
                 </div>
                  </div>
              `;
    const addBtn = prodEl.querySelector("button");
    addBtn.addEventListener("click", this.addToCart.bind(this));
    return prodEl;
  }
}

class ProductList {
  products = [
    new Product(
      "A Carpet",
      "https://www.tapislux.com/2101-medium_default/carpet-modern-design-border-ornament-marble-optical-black-red-white.jpg",
      "Melis Collection",
      89.99
    ),
    new Product(
      "Desktop",
      "https://5.imimg.com/data5/SELLER/Default/2020/10/SP/RR/QR/7559691/hp-desktops-500x500.jpg",
      "Hp Desktop",
      234.99
    ),
  ];
  render() {
    const prodList = document.createElement("ul");
    prodList.className = "product-list";
    for (const prod of this.products) {
      const productItem = new ProductItem(prod);
      const prodEl = productItem.render();
      prodList.append(prodEl);
    }
    return prodList;
  }
}

class Shop {
  render() {
    const renderHook = document.getElementById("app");
    this.cart = new Shopping();
    const cartEl = this.cart.render();
    const productList = new ProductList();
    const prodEl = productList.render();
    renderHook.append(cartEl, prodEl);
  }
}
class App {
  static init() {
    const shop = new Shop();
    shop.render();
    this.cart = shop.cart;
  }
  static addproductToCart(product) {
    this.cart.addProduct(product);
  }
}
App.init();
