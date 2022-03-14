const customersList = document.querySelector(".customers-list");
const ordersList = document.querySelector(".orders-list");
const clientId = document.querySelector("#clientId");
const userHeader = document.querySelector("#userHeader");
const foodsSelect = document.querySelector("#foodsSelect");
const userAddForm = document.querySelector("#userAdd");
const usernameInput = document.querySelector("#usernameInput");
const telephoneInput = document.querySelector("#telephoneInput");
const foodsForm = document.querySelector("#foodsForm");
const foodsCount = document.querySelector("#foodsCount");
const hostName = "https://look-sequelize.herokuapp.com";
// const hostName = "http://localhost:5000";

function createElements(...array) {
    return array.map((el) => {
        return document.createElement(el);
    });
}

async function renderUsers() {
    const response = await fetch(hostName + "/users");
    const users = await response.json();
    customersList.innerHTML = null;
    for (let user of users) {
        const [li, span, a, btn, i] = createElements(
            "li",
            "span",
            "a",
            "button",
            "i"
        );

        li.className = "customer-item";
        span.className = "customer-name";
        a.className = "customer-phone";
        btn.className = "user-btn";
        i.innerHTML = `<i class='bx bxs-message-square-x'></i>`;

        span.textContent = user.username;
        a.textContent = "+" + user.contact;

        a.setAttribute("href", "tel:+" + user.contact);
        btn.onclick = async (event) => {
            event.preventDefault();
            const deleteuser = await fetch(hostName + "/users", {
                method: "DELETE",
                headers: {
                    "Content-Type": "Application/json",
                },
                body: JSON.stringify({
                    user_id: user.user_id,
                }),
            });
            ordersList.innerHTML = null;
            clientId.textContent = null
            userHeader.textContent = null
            li.remove();
        };
        btn.append(i);
        li.append(span, a, btn);
        customersList.append(li);

        li.onclick = () => {
            renderOrders(user.user_id);
            clientId.textContent = user.user_id;
            userHeader.textContent = user.username;
        };
    }
}

async function renderOrders(userId) {
    const response = await fetch(hostName + "/orders/" + userId);
    const orders = await response.json();

    ordersList.innerHTML = null;

    for (let order of orders) {
        const [li, img, div, foodName, foodCount, btn, i] = createElements(
            "li",
            "img",
            "div",
            "span",
            "span",
            "button",
            "i"
        );
        li.className = "order-item";
        foodName.className = "order-name";
        foodCount.className = "order-count";
        btn.className = "order-btn";
        i.innerHTML = `<i class='bx  bx-trash'></i>`;

        img.src = hostName + order.FoodModel.food_img;

        foodName.textContent = order.FoodModel.food_name;
        foodCount.textContent = order.count;
        btn.onclick = async (event) => {
            event.preventDefault();
            const deleteorder = await fetch(hostName + "/orders", {
                method: "DELETE",
                headers: {
                    "Content-Type": "Application/json",
                },
                body: JSON.stringify({
                    order_id: order.order_id,
                }),
            });
            li.remove();
        };

        btn.append(i);
        div.append(foodName, foodCount, btn);
        li.append(img, div);
        ordersList.append(li);
    }
}

async function renderFoods() {
    const response = await fetch(hostName + "/foods");
    const foods = await response.json();

    for (let food of foods) {
        const [option] = createElements("option");

        option.value = food.food_id;
        option.textContent = food.food_name;

        foodsSelect.append(option);
    }
}

userAddForm.onsubmit = async (event) => {
    event.preventDefault();
    if (!usernameInput.value || !telephoneInput.value) return;
    if (usernameInput.value.length > 20 || usernameInput.value.length < 3)
        return;
    let number = new RegExp(/^9989[012345789][0-9]{7}$/);
    if (!number.test(telephoneInput.value))
        throw new Error("You must enter number exemple : 998941234567");
    try {
        let data = await fetch(hostName + "/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: usernameInput.value,
                contact: telephoneInput.value,
            }),
        });

        usernameInput.value = null;
        telephoneInput.value = null;

        renderUsers();
    } catch (error) {
        alert(error.message);
    }
};

foodsForm.onsubmit = async (event) => {
    event.preventDefault();
    if (!clientId.textContent || !foodsCount.value) return;

    try {
        await fetch(hostName + "/orders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user_id: clientId.textContent,
                food_id: foodsSelect.value,
                count: foodsCount.value,
            }),
        });

        foodsSelect.value = 1;
        foodsCount.value = null;
        renderOrders(clientId.textContent);
    } catch (error) {
        alert(error.message);
    }
};

renderFoods();
renderUsers();
