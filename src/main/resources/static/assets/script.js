let d = new Date();
let hour = d.getHours();
let minute = d.getMinutes();
let month = d.getMonth() + 1;
let day = d.getDate();
let output = d.getFullYear() + '-' +
    (('' + month).length < 2 ? '0' : '') + month + '-' +
    (('' + day).length < 2 ? '0' : '') + day;
let output2 = hour + ':' + minute ;
$("#date").dropdownDatepicker({
    defaultDate: output,
    displayFormat: 'ymd',
    monthFormat: 'short',
    minYear: d.getFullYear(),
    maxYear: 2035
});






//get data to add to Menu
$.get("/api/foods", function (data) {


    //add Soup to menu and lines
    $("#Menu_container").append(`<hr class="big_black_line" >
            <b class="menu_cate_name" >Soup</b>
            <hr class="big_black_line" >`);

    //add Soup-type foods
    data.forEach(i => {
        if (i.foodGroupId === 1) {
            let item = `<div class="fooditem">
                            <div class="foodname" >${i.foodName}</div>
                            <div class="dotted_line_length" ><hr class="dotted_line"></div>
                            <div class="foodprice">${i.cost}$</div>
                        </div>`
            $("#Menu_container").append(item);
        }
    });

    //add Dumpling to menu
    $("#Menu_container").append(`<hr class="big_black_line" >
            <b class="menu_cate_name" >Dumpling</b>
            <hr class="big_black_line" >`);

    //add Dumpling-type foods
    data.forEach(i => {
        if (i.foodGroupId === 2) {
            let item = `<div class="fooditem">
                            <div class="foodname" >${i.foodName}</div>
                            <div class="dotted_line_length" ><hr class="dotted_line"></div>
                            <div class="foodprice">${i.cost}$</div>
                        </div>`
            $("#Menu_container").append(item);
        }
    });
});



//function that begin at load in Order
$(document).ready(function () {

        $("#soup_tab").addClass("active");

        // add soups-type food to default panel in Order
        $.get("/api/foods", function (data) {
            document.getElementById("p1").textContent = "Soup";
            $("#order_menu .wrapper").empty();
            data.forEach(i => {
                if (i.foodGroupId === 1) {
                    let item = `
                <div class="image_container" style="background-image: url('${i.image}')">
                    <div class="description" style="display: block">
                        <div>
                            <div>${i.foodName}</div>
                            <div>${i.cost}$</div>
                        </div>
                        <div style="display: flex; float: right">
                            <button class="button_add" data-name="${i.foodName}" data-cost="${i.cost}" >+</button>
                            <button class="button_subtract" data-name="${i.foodName}" data-cost="${i.cost}" >-</button>
                            <!--<div class="button_remove" data-name="${i.foodName} data-cost="${i.cost}" >x</div>-->
                         </div>
                    </div>
                </div>`
                    $("#order_menu .wrapper").append(item);
                }
            })
        });


    let fullPrice = 0;
    let cart;

    //add data to local storage
    if (localStorage.getItem('cart') == null) {
        let arr = [];
        $.get("/api/foods", function (data) {
            data.forEach(i => {
                arr.push({
                    foodname: i.foodName,
                    amount: 0,
                    cost: i.cost
                });
            });
            localStorage.setItem('cart', JSON.stringify(arr));
        }).then(function () {
            cart = getOrder();
        });
    } else {
        cart = getOrder();
    }


    //add format to bill using localStorage
    function getOrder() {
        let cart = JSON.parse(localStorage.cart);
        let fullPrice = 0;
        $("#full_price").empty();
        $("#bill").empty();

        //update foods in bill using data from localStorage
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].amount > 0) {
                let price = parseInt(cart[i].amount) * parseInt(cart[i].cost);
                fullPrice += price;
                let item = `  <div style="display: flex;padding: 10px">
                                    <div style="width: 12em; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${cart[i].amount} x ${cart[i].foodname}</div>
                                    <div style="margin-left: auto">${price}$</div>
                                    <button class="button_remove" data-name="${cart[i].foodname}" data-cost="${i.cost}" >x</button>
                                </div>`
                $("#bill").append(item);
            }
        }
        let item2 = `<div>Total : ${fullPrice}$</div><div style="display: none" id="price">${fullPrice}</div>
                <div style="display: none" id="full_price">${fullPrice}$</div>`
        $("#full_price").append(item2);
        return cart;
    }

        //display soup-type food if clicked
        $("#soup_tab").on("click", function () {
            $("#dumpling_tab").removeClass("active");
            $("#soup_tab").addClass("active");
            $.get("/api/foods", function (data) {
                $("#order_menu .wrapper").empty();

                //display food with image in grid display and change category name to Soup
                data.forEach(i => {
                    if (i.foodGroupId === 1) {
                        let item = `<div class="image_container" style="background-image: url('${i.image}')">
                                <div class="description" style="display: block">
                                    <div>
                                        <div>${i.foodName}</div>
                                        <div>${i.cost}$</div>
                                    </div>
                                    <div style="display: flex; float: right">
                                        <button class="button_add" data-name="${i.foodName}" data-cost="${i.cost}">+</button>
                                        <button class="button_subtract" data-name="${i.foodName}" data-cost="${i.cost}">-</button>
                                    </div>
                                </div>
                            </div>`
                        $("#order_menu .wrapper").append(item);
                        document.getElementById("p1").textContent = "Soup";
                    }
                })
            });
        })

        //display dumpling-type food if clicked
        $("#dumpling_tab").on("click", function () {

            //make soup tab inactive and make dumpling tab active
            $("#soup_tab").removeClass("active");
            $("#dumpling_tab").addClass("active");

            // get data to add dumpling-type food to panel
            $.get("/api/foods", function (data) {
                $("#order_menu .wrapper").empty();

                //display food with image in grid display and change category name to Dumpling
                data.forEach(i => {
                    if (i.foodGroupId === 2) {
                        let item = `
                    <div class="image_container" style="background-image: url('${i.image}')">
                        <div class="description" style="display: block">
                            <div>
                                <div>${i.foodName}</div>
                                <div>${i.cost}$</div>
                            </div>
                            <div style="display: flex; float: right">
                                 <button class="button_add" data-name="${i.foodName}" data-cost="${i.cost}">+</button>
                                 <button class="button_subtract" data-name="${i.foodName}" data-cost="${i.cost}">-</button>
                            </div>
                        </div>
                    </div>`
                        $("#order_menu .wrapper").append(item);
                        document.getElementById("p1").textContent = "Dumpling";
                    }
                })
            });
        })

        //script for add button
        $('body').on('click', '.button_add', function (e) {
            let target = $(e.target);
            let foodname_input = target.data('name');

            //increase chosen food by 1 if that food's amount >= 0 and increase total cost
            for (let i = 0; i < cart.length; i++) {
                if (foodname_input === cart[i].foodname) {
                    if (cart[i].amount >= 0) {
                        cart[i].amount += 1;
                        break;
                    } else {
                        cart[i].amount = 0;
                        break;
                    }
                }
            }

            //reset bill and price
            fullPrice = 0;
            $("#full_price").empty();
            $("#bill").empty();

            //update bill
            for (let i = 0; i < cart.length; i++) {
                if (cart[i].amount > 0) {

                    let price = parseInt(cart[i].amount) * parseInt(cart[i].cost);
                    fullPrice += price;
                    let item = `  
                    <div style="display: flex;padding: 10px">
                        <div style="width: 12em; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${cart[i].amount} x ${cart[i].foodname}</div>
                        <div style="margin-left: auto">${price}$</div>
                        <button class="button_remove" data-name="${cart[i].foodname}" data-cost="${i.cost}" >x</button>
                    </div>`
                    $("#bill").append(item);
                }
            }

            //update price and localStorage
            let item2 = `<div>Total : ${fullPrice}$</div><div style="display: none" id="price">${fullPrice}</div>`
            $("#full_price").append(item2);
            localStorage.setItem("cart", JSON.stringify(cart));
        });

        //script for subtract button
        $('body').on('click', '.button_subtract', function (e) {
            let target = $(e.target);
            let foodname_input = target.data('name');

            //subtract chosen food by 1 if that food's amount is > 0 and decrease total cost
            for (let i = 0; i < cart.length; i++) {
                if (foodname_input === cart[i].foodname) {
                    if (cart[i].amount > 0) {
                        cart[i].amount -= 1;
                        break;
                    } else {
                        cart[i].amount = 0;
                        break;
                    }
                }
            }

            //reset bill and price
            fullPrice = 0;
            $("#full_price").empty();
            $("#bill").empty();

            //update bill
            for (let i = 0; i < cart.length; i++) {
                if (cart[i].amount > 0) {
                    let price = parseInt(cart[i].amount) * parseInt(cart[i].cost);
                    fullPrice += price;
                    let item = `  
                <div style="display: flex;padding: 10px">
                    <div style="width: 12em; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${cart[i].amount} x ${cart[i].foodname}</div>
                    <div style="margin-left: auto">${price}$</div>
                    <button class="button_remove" data-name="${cart[i].foodname}" data-cost="${i.cost}" >x</button>
                </div>`
                    $("#bill").append(item);
                }
            }

            //update price and localStorage
            let item2 = `<div>Total : ${fullPrice}$</div><div style="display: none" id="price">${fullPrice}</div>`
            $("#full_price").append(item2);
            localStorage.setItem("cart", JSON.stringify(cart));
        });

        //script for remove all button
        $('body').on('click', '.button_removeAll', function () {
            for (let i = 0; i < cart.length; i++) {
                cart[i].amount = 0;
            }

            //reset bill and price and update localStorage
            $("#full_price").empty();
            let item2 = `<div>Total : 0$</div><div style="display: none" id="price">0</div>`
            $("#full_price").append(item2);
            $("#bill").empty();
            localStorage.setItem("cart", JSON.stringify(cart));
        });

        //script for button_remove to change the selected food's amount to 0
        $('body').on('click', '.button_remove', function (e) {
            let target = $(e.target);
            let foodname_input = target.data('name');

            for (let i = 0; i < cart.length; i++) {
                if (foodname_input === cart[i].foodname) {
                    cart[i].amount = 0;
                    break;
                }
            }

            //reset bill and price
            fullPrice = 0;
            $("#full_price").empty();
            $("#bill").empty();

            //update bill
            for (let i = 0; i < cart.length; i++) {
                if (cart[i].amount > 0) {
                    let price = parseInt(cart[i].amount) * parseInt(cart[i].cost);
                    fullPrice += price;
                    let item = `  <div style="display: flex;padding: 10px">
                                        <div style="width: 12em; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${cart[i].amount} x ${cart[i].foodname}</div>
                                        <div style="margin-left: auto">${price}$</div>
                                        <button class="button_remove" data-name="${cart[i].foodname}" data-cost="${i.cost}" > x </button>
                                    </div>`
                    $("#bill").append(item);
                }
            }

            //update price and localStorage
            let item2 = `<div>Total : ${fullPrice}$</div><div style="display: none" id="price">${fullPrice}</div>`
            $("#full_price").append(item2);
            localStorage.setItem("cart", JSON.stringify(cart));
        });

        //script for confirm button for reservation
        $('body').on('click', '#confirm_button', function () {
            let createdDate = $('[name=date]').val();
            let time = $('#time').val();
            if ((createdDate <= output && time < output2) || (createdDate < output && time > output2) ) {
                alert("invalid date");
                return false;
            }
            else {
                $('body').on('click', '#OK_button', function () {
                    let partySize = $('#party_size').find(":selected").text();
                    let tableNum = $('#available_table').find(":selected").text();

                    let phoneNumber = $('#phone_number').val();
                    let email = $('#rep_email').val();
                    let customerName = $('#customer_name').val();
                    if(phoneNumber != "" || email != ""){
                    $.post("/api/reserve", {
                        "customerName": customerName,
                        "phone": phoneNumber,
                        "email": email,
                        "createdDate": createdDate + " " + time,
                        "partySize": partySize,
                        "tableNum": tableNum
                    }).done(function () {
                        alert("Data Is Loaded: ");
                    });} else alert("Data is not loaded, please provide a phone number or an email address ");
                });
            }
        });

        //script for order button after choosing food
        $('body').on('click', '#Order_button', function () {
            if(fullPrice != 0){
            let customer = $('#customer').val();
            let phone = $('#phone').val();
            let destination = $('#destination').val();
            let description = document.getElementById('bill').textContent;
            let price = document.getElementById('price').textContent;
            if(phone != "" && destination != ""){
            $.post("/api/delivery_order", {
                "customer": customer,
                "phone": phone,
                "description": description,
                "price": price,
                "destination": destination,
            }).done(function () {
                alert("Data Is Loaded: ");
            });} else alert("Data is not loaded, please provide a phone number and a destination");} else alert("Choose some foods first");
        });

    $('body').on('click', '#button_order', function () {
        if(fullPrice == 0) {
            alert("Choose some foods first");
            return false;
        }
    });
    }
);