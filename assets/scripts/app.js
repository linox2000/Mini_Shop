class Product {
  constructor(title, image, desc, price) {
    this.title = title;
    this.imageUrl = image;
    this.description = desc;
    this.price = price;
  }
}

class ProductItem {
  constructor(product) {
    this.product = product;
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
  render(){
    const renderHook = document.getElementById("app");
    const prodList = document.createElement("ul");
    prodList.className = "product-list";
      for(const prod of this.products){
          const productItem = new ProductItem(prod);
          const prodEl = productItem.render();
          prodList.append(prodEl)

      }
      renderHook.append(prodList)
  }
}
const productList = new ProductList();
productList.render()
