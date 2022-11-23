import { menuArray } from "./data.js";

let items = document.getElementById("items");
let orderSummary = document.getElementById("orders");
let ordersContainer = document.getElementById("order_container");
let total = 0;
let totalContainer = document.getElementById("total");
let itemString = '';
let paymentDiv = document.getElementById("payment-div");
let orderMsg = document.getElementById('msg');
let pay = document.getElementById('sub');

initialRender()

document.addEventListener('click', e => {

    if (e.target.dataset.add) {
        addClick(e)
        orderMsg.style.display = 'block'
    }
    else if(e.target.dataset.delete) {
        deleteClick(e)
    }
    else if(e.target.id == "complete-btn") {
        paymentDiv.style.display = 'block'
    }
    else if(e.target.id == "sub") {
        orderMsg.style.display = 'block'
    }
})

// initial render 

function initialRender() {
    
    menuArray.forEach(menu => {

    let flavors = '';
    menu.ingredients.forEach(flavor => {
        flavors += `${flavor},`;
    })

    itemString += `
            <div class="item">
                <p class="emoji">${menu.emoji}</p>
                <div>
                    <h2>${menu.name}</h2>
                    <p class="flavors">${flavors}</p>
                    <h3>$${menu.price}</h3>
                </div>
                <button class="add" data-add="${menu.id}">+</button>
            </div>`
})

items.innerHTML = itemString;
}

// handles only adding of items and rendering the orders summary

function addClick(e) {

    // get menu object when item is added
    let menuObj = getMenuObjAdd(e);

    // update menuObj quantity
    menuObj.quantity++;

    // if no item added, render order summary
    if (total === 0) {
        orderSummary.style.display = 'block';
    }

    // calculate total
    total += menuObj.price;

    // render order summary
    renderOrderSummary(menuObj);

}

function deleteClick(e) {

    // get menu object when item is removed
    let menuObj = getMenuObjDel(e);

    // update menuObj quantity
    menuObj.quantity--;

    // calculate total
    total -= menuObj.price;

    // render order summary
    renderOrderSummary(menuObj);

}

function getMenuObjAdd(e) {
    let menuObj = menuArray.filter((menu) => {
        return menu.id == e.target.dataset.add
    })[0];
    return menuObj;
}

function getMenuObjDel(e) {
    let menuObj = menuArray.filter((menu) => {
        return menu.id == e.target.dataset.delete
    })[0];
    return menuObj;
}

function renderOrderSummary(menu) {
    
    let summaryString = "";

    menuArray.forEach(menu => {
        if (menu.quantity > 0) {
            summaryString += `
            <div class="order">
                <h2>${menu.name}</h2>
                <p class="remove" data-delete=${menu.id}>remove</p>
                <h3>$${menu.price * menu.quantity}</h3>
            </div>
            `
        }
    })
    ordersContainer.innerHTML = summaryString 

    if (total === 0) {
        orderSummary.style.display = 'none';
    }
    else {
        totalContainer.innerHTML = `
                <h2>Total price:</h2>
                <h3>$${total}</h3>
                `
    }
}
