let iconShopping = document.querySelector(".fa-cart-shopping");
let sidebbar = document.querySelector(".sidebar");
let close = document.querySelector(".close");
let myCount = document.querySelector(".count");


let cart = [];
cart = JSON.parse(localStorage.getItem("cart")) || [];

const iphones = [
    {name : "iphone11" , price : 300 , image: './imgs/0.png'},
    {name : "iphone12" , price : 350 , image: './imgs/1.png'},
    {name : "iphone13" , price : 370 , image: './imgs/2.png'},
    {name : "iphone14" , price : 320 , image: './imgs/3.png'},
    {name : "iphone15" , price : 330 , image: './imgs/4.png'}
]

function displayAll(){
    let allProducts = document.querySelector(".products")
    iphones.forEach(iphone =>{
        let proDiv = document.createElement("div");
        proDiv.className = "product";
        proDiv.innerHTML = `
         <img src="${iphone.image}" alt="${iphone.name}">
        <h2>${iphone.name}</h2>
        <p>${iphone.price}</p>
        <button onclick = "addToCard('${iphone.image}' , '${iphone.name}' , '${iphone.price}')">addToCart</button>
        `;
        allProducts.appendChild(proDiv);
    })
}


function addToCard(image , name , price){
    let existItem = cart.find(item => item.name == name);
    if (!existItem) {
        cart.push({ image, name, quantity: 1, price });
    }
    localStorage.setItem("cart" ,  JSON.stringify(cart));
    showCart();
}


function showCart(){
    let allCards = document.querySelector(".cards");
    let total = document.querySelector(".total");
    allCards.innerHTML = '';
    let totalPrice = 0;
    let count = 0;
    cart.forEach(item =>{
        totalItem = item.price * item.quantity;
        totalPrice += totalItem;
        count += item.quantity;
        let cartDiv = document.createElement("div");
        cartDiv.className = "cart-item";
        cartDiv.innerHTML = `
        <img src="${item.image}" alt="${item.name}" />
        <div>${item.name}</div> $${totalItem} <div><i onclick="minusCart('${item.name}')" class="fa-solid fa-minus"></i> ${item.quantity} <i onclick="plusCart('${item.name}')" class="fa-solid fa-plus"></i></div>
        <button onclick= "DeleteProduct('${item.name}')">Delete</button>
        `
        allCards.appendChild(cartDiv);
    })
    myCount.textContent = count; 
    total.innerHTML = `$${totalPrice}`;
}


function DeleteProduct(name){
    cart = cart.filter(item => item.name != name);
    localStorage.setItem("cart" ,  JSON.stringify(cart));
    showCart();
}

function minusCart(name){
    let existingItem = cart.find(item => item.name == name);
    if(existingItem){
        existingItem.quantity--;
        if(existingItem.quantity <= 0){
            cart = cart.filter(item => item.name != name);
        }
    }
    localStorage.setItem("cart" ,  JSON.stringify(cart));
    showCart();
}
function plusCart(name){
    let existingItem = cart.find(item => item.name == name);
    if(existingItem){
        existingItem.quantity++;
    }
    localStorage.setItem("cart" ,  JSON.stringify(cart));
    showCart();
}
    
displayAll();
showCart();


iconShopping.addEventListener("click" , function(){
    document.body.classList.add("active");
})

close.addEventListener("click" , function(){
    document.body.classList.remove("active");
})

