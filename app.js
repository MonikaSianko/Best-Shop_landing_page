const prices = {
    products: 0.5,
    orders: 1.5,
    package: {
        basic: 0,
        professional: 50,
        premium: 100,
    },
    accounting: 10,
    terminal: 15,
}

const inputs = {
    products: document.querySelector("#products"),
    orders: document.querySelector("#orders"),
    package: document.querySelector("#package"),
    accounting: document.querySelector("#accounting"),
    terminal: document.querySelector("#terminal"),
}

const inputsArr = Object.keys(inputs)
    .map(function (key) {
        return inputs[key];
    });

const summary = {
    totalContainer: document.querySelector("#total-price"),
    totalCount: document.querySelector(".total-price"),
    items: document.querySelector(".summary").querySelector("ul").children,
    list: document.querySelector(".summary").querySelector("ul")
}


// inputs validation and summary opening

const productsSumUp = function () {
    if (inputs.products.value > 0 & inputs.products.value % 1 === 0) {
        summary.items.item(0).children[1].innerText = inputs.products.value + " * " + "$" + prices.products;
        summary.items.item(0).children[2].innerText = "$" + (inputs.products.value * prices.products);
        summary.items.item(0).classList.add("open")
    }
    else {
        alert("Value has to positive and with no decimal places")
    }
}

inputs.products.addEventListener("change", productsSumUp)

const ordersSumUp = function () {
    if (inputs.orders.value > 0 & inputs.orders.value % 1 === 0) {
        summary.items.item(1).children[1].innerText = inputs.orders.value + " * " + "$" + prices.orders;
        summary.items.item(1).children[2].innerText = "$" + (inputs.orders.value * prices.orders);
        summary.items.item(1).classList.add("open")
    }
    else {
        alert("Value has to positive and with no decimal places")
    }
}

inputs.orders.addEventListener("change", ordersSumUp)

// packages select sumUp


const packagesChoice = function (e) {

    inputs.package.classList.toggle("open")

    const value = typeof e.target.dataset.value !== "undefined" ? e.target.dataset.value : "";
    const text = typeof e.target.dataset.value !== "undefined" ? e.target.innerText : "Choose package";

    if (value.length > 0) {
        inputs.package.dataset.value = value;
        inputs.package.querySelector(".select-input").innerText = text;
    }
    if (inputs.package.querySelector(".select-input").innerText === "Basic") {
        summary.items.item(2).children[1].innerText = "Basic";
        summary.items.item(2).children[2].innerText = "$" + prices.package.basic;
    }
    if (inputs.package.querySelector(".select-input").innerText === "Professional") {
        summary.items.item(2).children[1].innerText = "Professional";
        summary.items.item(2).children[2].innerText = "$" + prices.package.professional;
    }
    if (inputs.package.querySelector(".select-input").innerText === "Premium") {
        summary.items.item(2).children[1].innerText = "Premium";
        summary.items.item(2).children[2].innerText = "$" + prices.package.premium;
    }
    if (inputs.package.querySelector(".select-input").innerText !== "Choose package") {
        summary.items.item(2).classList.add("open");
    }
}

inputs.package.addEventListener("click", packagesChoice)








// checkboxes sumUp

const accountingSumUp = function () {
    if (inputs.accounting.checked === true) {
        summary.items.item(3).children[1].innerText = "$" + prices.accounting;
        summary.items.item(3).classList.add("open");
    }
    else {
        summary.items.item(3).classList.remove("open");
    }
}

inputs.accounting.addEventListener("change", accountingSumUp);

const terminalSumUp = function () {
    if (inputs.terminal.checked === true) {
        summary.items.item(4).children[1].innerText = "$" + prices.terminal;
        summary.items.item(4).classList.add("open");
    }
    else {
        summary.items.item(4).classList.remove("open");
    }
}

inputs.terminal.addEventListener("change", terminalSumUp);

// summing up the total price summary



const updateTotalContainer = function () {
    const opened = summary.list.querySelectorAll(".open").length > 0;

    if (opened === true) { // if opened is true - if there is any open class added in the ul element

        // check if input values are positive                
        const productsSum = inputs.products.value < 0 ? 0 : inputs.products.value * prices.products;
        // (question)?(result if true):(result is false)
        // if input value is empty (shorter than 0) than write 0 if it is not empty than write the total price
        const ordersSum = inputs.orders.value < 0 ? 0 : inputs.orders.value * prices.orders;
        const packageSum = inputs.package.dataset.value.length === 0 ? 0 : prices.package[inputs.package.dataset.value];
        const accountingSum = inputs.accounting.checked ? prices.accounting : 0;
        const terminalSum = inputs.terminal.checked ? prices.terminal : 0;


        // than sumUp inputs and multiply them by products prices

        summary.totalCount.innerText = "$" + (productsSum + ordersSum + packageSum + accountingSum + terminalSum);

        // after doing that, add class open and show total sumUp
        summary.totalContainer.classList.add("open");


        // if any of the above conditions is not true than remove class open
    } else {
        summary.totalContainer.classList.remove("open");
    }
}

inputsArr.forEach(function (item) {
    item.addEventListener("change", updateTotalContainer)
})

