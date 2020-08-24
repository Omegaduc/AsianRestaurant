$(document).ready(function () {

    // get customer reservation data and add into table
    $.ajax({
        type: 'GET',
        url: '/api/customers',
        success: function (data) {
            data.forEach(customer => {
                $('#reserve_list').append("<tr>"
                    + "<th scope=\"row\">" + customer.id + "</th>"
                    + "<td>" + customer.customerName + "</td>"
                    + "<td>" + customer.phone + "</td>"
                    + "<td>" + customer.email + "</td>"
                    + "<td>" + customer.createdDate + "</td>"
                    + "<td>" + customer.partySize + "</td>"
                    + "<td>" + customer.tableNum + "</td>"
                    + "<td>" + `<button class='delete_customer_button' value="${customer.id}">Delete</button>` + "</td>"
                    + "</tr>")
            });
        }
    });

    // get food data and add into table
    $.ajax({
        type: 'GET',
        url: '/api/foods',
        success: function (data) {
            data.forEach(food => {
                $('#food_list').append("<tr>"
                    + "<th scope=\"row\">" + food.id + "</th>"
                    + "<td>" + food.foodName + "</td>"
                    + "<td>" + `<img src='${food.image}' >` + "</td>"
                    + "<td>" + food.cost +"$" + "</td>"
                    + "<td>" + food.foodGroupId + "</td>"
                    //+ "<td>" + `<button class='delete_food_button' value="${food.id}">Delete</button>` + "</td>"
                    + "</tr>")
            });
        }
    });

    // get delivery data and add into table
    $.ajax({
        type: 'GET',
        url: '/api/delivery',
        success: function (data) {
            data.forEach(deli => {
                $('#deli_list').append("<tr>"
                    + "<th scope=\"row\">" + deli.id + "</th>"
                    + "<td>" + deli.customer + "</td>"
                    + "<td>" + deli.phone + "</td>"
                    + "<td>" + deli.description + "</td>"
                    + "<td>" + deli.price + "</td>"
                    + "<td>" + deli.destination + "</td>"
                    + "<td>" + `<button class='delete_deli_button' value="${deli.id}">Delete</button>` + "</td>"
                    + "</tr>")
            });
        }
    });

    //script for delete customer button
    $('body').on('click', '.delete_customer_button', function (e) {
        var target = $(e.target);
        var id = target.val();
        $.post("/api/delete_reserve_by_id", {
            id
        }).done(function () {
            alert("Data Deleted: ");
            location.reload();
            return false;
        });
    });

    //script for delete delivery button
    $('body').on('click', '.delete_deli_button', function (e) {
        var target = $(e.target);
        var id = target.val();
        $.post("/api/delete_delivery_order_by_id", {
            id
        }).done(function () {
            alert("Data Deleted: ");
            location.reload();
            return false;
        });
    });

    //script for upload image button
    $('body').on('click', '#upload', function (e) {
        var name = $('#name').val();
        var cost = $('#cost').val();
        var img = $('#image_name').val().split("\\").pop();
        var image_name = 'http://localhost:8080/upload/' +  img;
        var cate = $('#cate').val();
        localStorage.removeItem('cart');
        $.post("/api/add", {
            "foodName": name,
            "image":image_name ,
            "cost": cost,
            "foodGroupId": cate
        }).done(function () {
            alert("Data Loaded: ");
            location.reload();
            return false;
        });
    });
    return false;
});