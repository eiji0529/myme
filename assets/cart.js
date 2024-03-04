

// 数量の直接入力が出来ないようにする
$(function() {
    $('#quantity').attr('readonly', true);
});


$('.qty-minus').on('click', function(e) {
    var item_id = $(e.target).parents('.cart-item').find('.item-id').val();
    var qty_box = $(e.target).parents('.cart-item').find('.quantity');
    var num = Number(qty_box.val()) - 1;
    if (num > 0) {
        sd = {"id": item_id, "quantity": Number(num)};
        cart_update(sd, -1);
    }
});
$('.qty-plus').on('click', function(e) {
    var item_id = $(e.target).parents('.cart-item').find('.item-id').val();
    var qty_box = $(e.target).parents('.cart-item').find('.quantity');
    var max_qty = qty_box.attr('max');
    var num = Number(qty_box.val()) + 1;
    if (num <= max_qty) {
        sd = {"id": item_id, "quantity": Number(num)};
        cart_update(sd, 1);
    } else {
        add_limit_message(e.target);
    }
});
$('.delete').on('click', function(e) {
    var sd = {};
    var item_id = $(e.target).parents('.cart-item').find('.item-id').val();
    var item_num = $(e.target).parents('.cart-item').find('.quantity').val();
    sd = {updates: {}};
    sd.updates[item_id] = 0;
    cart_delete(sd, -item_num);
});


// カートの数量変更
function cart_update(sd, num) {
    connect();
    fetch(window.Shopify.routes.root + 'cart/change.js', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
    },
        body: JSON.stringify(sd)
    })
        .then(response => {
        if (response.status == 200) {
            // 通信成功時の処理
            var qty_ele = $('input[value="' + sd.id + '"]').parents('.cart-item').find('.quantity');
            // 数量の書き換え
            qty_ele.val(sd.quantity);
            subtotal_change(num);
            success();
        } else {
            // cart_error("カートの更新に失敗しました。");
            t_error();
        }
        return false;
    })
        .catch((error) => {
        console.log(error)
        // cart_error("カートの更新に失敗しました。");
            t_error();
    });
}

// カートから削除
function cart_delete(sd, num) {
    connect();
    var item_id = Object.keys(sd.updates);
    $.post(window.Shopify.routes.root + 'cart/update.js', sd)
    .done(function(response) {
        // 通信成功時の処理
        var item_ele = $('input[value="' + item_id + '"]').parents('.cart-item');
        item_ele.next().remove();
        item_ele.remove();
        subtotal_change(num);
        success();
        return true;
    })
    .fail(function(error) {
        // 通信失敗時の処理
        console.error('カートの更新に失敗しました。', error);
        t_error();
        return false;
    });
}


function subtotal_change(num) {
    $.ajax({
        type: 'GET',
        url: window.Shopify.routes.root + 'cart.js',
        cache: false,
        dataType: 'json',
        success: function(data) {
        var items = data.items;
        if (items.length != 0) {
            var total_price = 0;
            var items_ele = $('#cart_table').find('.cart-item');
            for (si=0;si<items.length;si++) {
                // 小計を更新
                for (iei=0; iei<items_ele.length; iei++) {
                    if (items[si].id == $(items_ele[iei]).find('.item-id').val()) {
                        $(items_ele[iei]).find('.subtotal').text(convertToCurrentCurrency(items[si].price * items[si].quantity));
                        break;
                    }
                }
                // 合計額用
                total_price += items[si].price * items[si].quantity;
            }
            // 合計額を更新
            var total_price_jpy = convertToCurrentCurrency(total_price)
            $('.total-price').text(total_price_jpy);
            // カートアイコンの数字を変更
            var icon = $('.cart-items').children();
            icon.text(Number(icon.text()) + num);
        } else {
            // カートが空ならリロード
            location.reload();
        }
    }
    });
}


// 通信中表示
var clearID;
function connect() {
    clearTimeout(clearID);
    t_clear_class();
    var loader = $('.cart-loader');
    loader.addClass("connecting");
    loader.find('p').text('');
}
function success() {
    var loader = $('.cart-loader');
    loader.removeClass('connecting');
    loader.addClass('success');
    loader.find('p').text('変更しました');
    tclear();
}
function t_error() {
    var loader = $('.cart-loader');
    loader.removeClass('connecting');
    loader.addClass('error');
    loader.find('p').text('変更できませんでした');
    tclear();
}
function t_clear_class() {
    var loader = $('.cart-loader');
    loader.removeClass("connecting");
    loader.removeClass("success");
    loader.removeClass("error");
}
function tclear() {
    clearTimeout(clearID);
    clearID = setTimeout(() => {
        t_clear_class();
    }, 3000);
}