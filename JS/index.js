// Variables and constants
const cartcontainer = document.querySelector('.cart-container')
const productlist = document.querySelector('.product-list');
const cartList = document.querySelector('.cart-list');
const cartTotalValue = document.getElementById('cart-total-value');
const cartCountInfo = document.getElementById('cart-count-info');
let cartItemID = 1

eventListners()
function eventListners() {
        window.addEventListener('DOMContentLoaded', ()=>{
                loadJSON();
                loadCart()
        })
        // toggle Navbar when toggle button is clicked
        document.querySelector('.navbar-toggle').
        addEventListener('click', ()=>{
                document.querySelector('.navbar-collapse').classList.toggle('show-navbar');
        });
        
        // show/hide cart container
        document.getElementById('cart-btn').addEventListener('click', ()=>{
                cartcontainer.classList.toggle('show-cart-container')
        })
        // add to cart
        productlist.addEventListener('click', purchaseProduct)
        // delete from cart
        cartList.addEventListener('click', deleteProduct);
}


// Update cart Info
function updateCartInfo() {
        let cartInfo = findCartInfo();
        cartCountInfo.textContent = cartInfo.productCount;
        cartTotalValue.textContent = cartInfo.total;
}
updateCartInfo()

// function product item content from Json file
function loadJSON() {
        fetch('furniture.json')
        .then(response => response.json())
        .then(data=>{
                let html = '';
                data.forEach(product =>{
                        console.log(product);
                        html+=`<div class="product-item ${product.category}">
                                        <div class="product-img">
                                                <img src="${product.imgSrc}" alt="">
                                                <button class="add-to-cart-btn"><i class="fas fa-shopping-cart"></i>Add Cart</button>
                                        </div>

                                        <div class="product-content">
                                                <h3 class="product-name">${product.name}</h3>
                                                <span class="product-category">${product.category}</span>
                                                <p class="product-price">$${product.price}</p>
                                        </div>
                                </div>`
                })
                productlist.innerHTML = html
                filterSelect("all")
        })
        .catch(error =>{
                alert(`User live server or local server`)
                // URL Scheme must be http or https
        })
}

// Purchase product from the Productlist --> Function
function purchaseProduct(e) {
        // console.log(e.target);
        if(e.target.classList.contains('add-to-cart-btn')){
                let product = e.target.parentElement.parentElement;
                getProductInfo(product)
        }
}

// get product info after add to cart button
function getProductInfo(product){
        let productInfo = {
                id: cartItemID,
                imgSrc: product.querySelector('.product-img img').src,
                name: product.querySelector('.product-name').textContent,
                category: product.querySelector('.product-category').textContent,
                price: product.querySelector('.product-price').textContent
        }
        // console.log(productInfo);
        cartItemID++; // increasing id for the cart item list
        addToCartList(productInfo)
        saveProductInStorage(productInfo);
}

// add the delected product to the cart list
function addToCartList(product) {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item')
        cartItem.setAttribute('data-id', `${product.id}`);
        cartItem.innerHTML = `<img src="${product.imgSrc}" alt="">
                                <div class="cart-item-info">
                                        <h3 class="cart-item-name">${product.name}</h3>
                                        <span class="cart-item-category">${product.category}</span>
                                        <span class="cart-item-price">${product.price}</span>
                                </div>
                                <button type="button" class="cart-item-del-btn">
                                        <i class="fas fa-times"></i>
                                </button>`;
        cartList.appendChild(cartItem);
}

// save the product in the local storage
function saveProductInStorage(item){
        let products = getProductFromStorage();
        products.push(item);
        localStorage.setItem('products', JSON.stringify(products));
        updateCartInfo();
}


// get all the products info if there is any in the local storage

function getProductFromStorage() {
        return localStorage.getItem('products') ? JSON.parse(localStorage.getItem('products')) : [];
}

// load carts product
function loadCart(){
        let products = getProductFromStorage();
        if (products.length <1) {
                cartItemID = 1; // if there is no any product in the local storage
        }
        else{
                cartItemID = products[products.length - 1].id
                cartItemID++;
                // else get the id of the last product and increase it by 1
        }
        // console.log(cartItemID);
        products.forEach(product => addToCartList(product))

        // calculate and update UI of cart info 
        updateCartInfo();
}

// calculate total prive of the cart and other info
function findCartInfo() {
        let products = getProductFromStorage();
        let total = products.reduce((acc, product) =>{
                let price = parseFloat(product.price.substr(1))
                // removing dollar sign 
                return acc += price
        }, 0); // adding all the prices
        // console.log(products);
        return{
                total: total.toFixed(2),
                productCount: products.length
        }
}
findCartInfo()
// delete prouct from list
function deleteProduct(e){
        console.log(e.target);
        let cartItem;
        if (e.target.tagName === 'BUTTON') {
                cartItem = e.target.parentElement;
                cartItem.remove();
        }
        else if(e.target.tagName === 'I'){
                cartItem = e.target.parentElement.parentElement;
                cartItem.remove();
        }
        let products = getProductFromStorage()
        let updatedProducts = products.filter(product =>{
                return product.id !== parseInt(cartItem.dataset.id);
        })
        localStorage.setItem('products', JSON.stringify(updatedProducts))
        updateCartInfo();
        // console.log(cartItem);
}