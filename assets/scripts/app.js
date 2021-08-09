class Product {
  constructor(title, image, desc, price) {
    this.title = title;
    this.imageUrl = image;
    this.description = desc;
    this.price = price;
  }
}
class ElementAttribute {
  constructor(attrName, attrValue) {
    this.name = attrName;
    this.value = attrValue;
  }
}
class Component {
  constructor(renderHookId,shouldRender =true) {
    this.hookId = renderHookId;
    if(shouldRender)
    this.render();
  }
  render() {}

  createRootElement(tag, cssClasses, attributes) {
    const rootElement = document.createElement(tag);
    if (cssClasses) rootElement.className = cssClasses;
    if (attributes && attributes.length > 0) {
      for (const attr of attributes) {
        rootElement.setAttribute(attr.name, attr.value);
      }
    }
    document.getElementById(this.hookId).append(rootElement);
    return rootElement;
  }
}

class Shopping extends Component {
  constructor(renderHookId) {
    super(renderHookId);
  }
  items = [];
  set cartItems(value) {
    this.items = value;
    this.totalOutput.innerHTML = `<h2>Total:\$${this.totalAmount.toFixed(
      2
    )}</h2`;
  }
  get totalAmount() {
    const sum = this.items.reduce(
      (prevValue, curItem) => prevValue + curItem.price,
      0
    );
    return sum;
  }
  addProduct(product) {
    const updatedCart = [...this.items];
    updatedCart.push(product);
    this.cartItems = updatedCart;
  }
  render() {
    const cartEl = this.createRootElement("section", "cart");
    cartEl.innerHTML = `<h2>Total:\$${0}</h2>
                         <button>Order Now</button>`;
    this.totalOutput = cartEl.querySelector("h2");
  }
}
class ProductItem extends Component {
  constructor(product, renderHookId) {
    super(renderHookId,false);
    this.product = product;
    this.render()
  }
  addToCart() {
    App.addproductToCart(this.product);
  }
  render() {
    const prodEl = this.createRootElement("li", "product-item");
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
  }
}

class ProductList extends Component {
  products = [];
  constructor(renderHookId) {
    super(renderHookId);
    this.fetchProducts();
  }

  fetchProducts() {
    this.products = [
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
    this.renderProducts()
  }

  renderProducts() {
    for (const prod of this.products) {
      new ProductItem(prod, "prod-list");
    }
  }

  render() {
    this.createRootElement("ul", "product-list", [
      new ElementAttribute("id", "prod-list"),
    ]);
    if (this.products && this.products.length > 0) this.renderProducts();
  }
}

class Shop {
  constructor() {
    this.render();
  }
  render() {
    this.cart = new Shopping("app");
    new ProductList("app");
  }
}
class App {
  static init() {
    const shop = new Shop();
    this.cart = shop.cart;
  }
  static addproductToCart(product) {
    this.cart.addProduct(product);
  }
}
App.init();
