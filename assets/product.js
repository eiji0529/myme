

var stock_by_size = {};
var stock_by_color = {};
var stock_by_one = {};

function no_stock_span() {
  var word = $('#word_out_of_stock').val();
  const span = document.createElement('span');
  span.classList = "out-of-stock"
  span.innerText = "(" + word + ")";
  return span;
}
// var word_out_of_stock = no_stock_span();
var word_out_of_stock = $('#word_out_of_stock').val();

// ページ読み込み後
$(function () {
  // 在庫数をそれぞれ代入
  var inventory_ele = $('.option_inventory');

  for (i=0; i<inventory_ele.length; i++) {
    var arr = inventory_ele[i].id.split("-");
    if (stock_by_size[arr[1]]) {
      stock_by_size[arr[1]] += Number(inventory_ele[i].value);
    } else {
      stock_by_size[arr[1]] = Number(inventory_ele[i].value);
    }
    if (stock_by_color[arr[2]]) {
      stock_by_color[arr[2]] += Number(inventory_ele[i].value);
    } else {
      stock_by_color[arr[2]] = Number(inventory_ele[i].value);
    }

    stock_by_one[arr[1] + "-" + arr[2]] = Number(inventory_ele[i].value);
  }

  // 在庫数が０のものは選択不可にする
  for (key in stock_by_size) {
    if (stock_by_size[key] == 0) {
      var target = document.getElementById('id_value_' + key);
      var word_out_of_stock = no_stock_span();
      target.disabled = true;
      target.nextElementSibling.innerText = target.nextElementSibling.innerText;
      target.nextElementSibling.append(word_out_of_stock);
    }
  }
  for (key in stock_by_color) {
    if (stock_by_color[key] == 0) {
      var target = document.getElementById('id_value_' + key);
      var word_out_of_stock = no_stock_span();
      target.disabled = true;
      target.nextElementSibling.innerText = target.nextElementSibling.innerText;
      target.nextElementSibling.append(word_out_of_stock);
    }
  }

  // SKUが選択された状態なら送信データにも加える
  var selected_key = set_selected_key();
  if (typeof(selected_key) != "undefined") {
    var selected_id = $('#id-' + selected_key).val();
    $('#buy-id').val(selected_id);
  }
});



$(document).on('change', 'input[type="radio"]', function(e) {
  for (key in stock_by_one) {
    if (key.match(e.target.value)) {
      // 数量が0の分は選択不可にする
      if (stock_by_one[key] == 0) {
        var target_arr = key.split("-");  // 数量０の在庫SKU
        target_arr.forEach(element => {
          if (element != e.target.value) {
            if (element != "none") {
              var target = document.getElementById('id_value_' + element);
              var word_out_of_stock = no_stock_span();
              target.disabled = true;
              target.nextElementSibling.innerText = target.value;
              target.nextElementSibling.append(word_out_of_stock);
            }
          }
        });
      } else {
        // 在庫0以外の表示を戻す
        var target_arr = key.split("-");
        target_arr.forEach(element => {
          if (element != e.target.value) {
            if (element != "none") {
              var target = document.getElementById('id_value_' + element);
              target.disabled = false;
              target.nextElementSibling.innerText = target.value;
            }
          }
        });
      }
    }
  }

  // 購入できる数量の最大値をセット
  var checked = $('.selected-option:checked');
  var selected_key = set_selected_key();
  if (typeof(selected_key) != "undefined") {
    $('#quantity').prop("max", stock_by_one[selected_key]);
    $('#quantity').attr("data-max", stock_by_one[selected_key]);
    // 入力された数量が最大値を超えてる場合は最大値へ変更する
    if ($('#quantity').val() > stock_by_one[selected_key]) {
      $('#quantity').val(stock_by_one[selected_key]);
      $('#buy-qty').val(stock_by_one[selected_key]);
    }

    // 在庫10個以下の場合の表示を出す
    remain_display(stock_by_one[selected_key]);

    // 送信データをセット
    var selected_id = $('#id-' + selected_key).val();
    $('#buy-id').val(selected_id);

    // 金額部分を変更
    change_price(selected_key);
  }

  // 注意表示が有れば消す
  $(e.target).parents('.details').find('.select-notice').remove();

}).on('change', '#quantity', function() {
  // 数量を変更時
  var selected_key = set_selected_key();

  // 数量が変更されたら送信データにもセット
  var qty = $('#quantity').val();
  if (qty != "") {
    $('#buy-qty').val(qty);
  }

  // 表示金額を変更
  if (typeof(selected_key) != "undefined") {
    change_total_amount(selected_key);
  }
});


// 購入ボタンを押したときの動作
$(function() {
  document.getElementById('add-to-cart').addEventListener('click', add_to_cart);
});
function add_to_cart() {
  var ad_connect = new add_cart_connect();

  // 選択されたSKUが正しいかチェック
  var bool = submit_buy();
  if (!bool) {return false;} else {
    // 通信中の表示
    ad_connect.start();

    var buy_id = $('#buy-id').val();
    var buy_qty = $('#buy-qty').val();
    if (buy_id != "") {
        var sd = {"items": [{"id": buy_id, "quantity": buy_qty}]}
        $.post(window.Shopify.routes.root + 'cart/add.js', sd)
        .done(function(response) {
            // 通信成功時の処理
            console.log('カートが正常に更新されました。');
            var count_ele = $('.cart-link').find('.cart-items');
            if (count_ele.length == 0) {
              var num = Number(buy_qty);
            } else {
              var num = Number(buy_qty) + Number(count_ele.children().text());
              count_ele.remove();
            }

            var new_count = item_count(num);
            $('.cart-link').append(new_count);

            ad_connect.end();
            return true;
        })
        .fail(function(error) {
            // 通信失敗時の処理
            console.error('カートの更新に失敗しました。add', error);
            ad_connect.error();
            return false;
        });
    }
  }
}
$('#buy-now').on('click', function() {
  var bool = submit_buy();
  if (!bool) {return false;} else {
    var buy_id = $('#buy-id').val();
    var buy_qty = $('#buy-qty').val();
    if (buy_id != "") {
        var sd = {"items": [{"id": buy_id, "quantity": buy_qty}]}
        $.post(window.Shopify.routes.root + 'cart/add.js', sd)
        .done(function(response) {
            // 通信成功時の処理
            console.log('カートが正常に更新されました。', JSON.parse(response));
            window.location.href = '/checkout';
            return true;
        })
        .fail(function(error) {
            // 通信失敗時の処理
            console.error('カートの更新に失敗しました。', error);
            return false;
        });
    }
  }
})

function submit_buy(){
  var bool = buy_set();

  var selected_key = set_selected_key();
  if (typeof(selected_key) == "undefined") {
    bool = false;
  }
  return bool;
}
function buy_set() {
  var bool = true;
  var size_val = $('.item-size').find('input:checked').val();
  var color_val = $('.item-color').find('input:checked').val();

  if (typeof(size_val) == "undefined") {
    add_notice($('.item-size'));
    bool = false;
  }
  if (typeof(color_val) == "undefined") {
    add_notice($('.item-color'));
    bool = false;
  }
  return bool;
}
function add_notice(ele) {
  var clone = $('.select-notice').clone();
  if (ele.find('.select-notice').length == 0) {
    clone.removeClass('hidden');
    ele.append(clone);
  }
}
class add_cart_connect {
  constructor() {
    this.add_text = add_text;
    this.add_error_text = add_error_text;
    this.btn_ele = $('#add-to-cart');
    this.add_text_span = $('#add-to-cart').find('span');
    this.original_text = this.add_text_span.text();
    this.loader = loader_span();
  }
  start() {
    document.getElementById('add-to-cart').removeEventListener('click', add_to_cart);
    this.add_text_span.fadeOut(200);
    setTimeout(() => {
      this.btn_ele.append(this.loader);
    }, 220);
  }
  end() {
    $('.add-loader').fadeOut(200);
    setTimeout(() => {
      $('.add-loader').remove();
      this.add_text_span.text(this.add_text);
      this.add_text_span.fadeIn(200);
      this.btn_ele.addClass('add-success')
      document.getElementById('add-to-cart').addEventListener('click', add_to_cart);
      setTimeout(() => {
        this.btn_ele.removeClass('add-success')
        this.add_text_span.text(this.original_text);
      }, 3000);
    }, 230);
  }
  error() {
    $('.add-loader').fadeOut(200);
    setTimeout(() => {
      $('.add-loader').remove();
      this.add_text_span.text(this.add_error_text);
      this.add_text_span.css('color', 'red');
      this.btn_ele.css('border-color', 'red');
      this.add_text_span.fadeIn(200);
      this.btn_ele.addClass('add-error')
      document.getElementById('add-to-cart').addEventListener('click', add_to_cart);
      setTimeout(() => {
        this.btn_ele.removeClass('add-error')
        this.add_text_span.css('color', '');
        this.btn_ele.css('border-color', '');
        this.add_text_span.text(this.original_text);
      }, 3000);
    }, 230);
  }
}
function loader_span() {
  const span = document.createElement('span');
  span.classList = "add-loader";
  return span;
}

function item_count(count) {
  const div = document.createElement('div');
  div.classList = "cart-items";
  const span = document.createElement('span');
  span.innerText = count;
  div.append(span);
  return div;
}



// 選択されてるSKU
function set_selected_key() {
  var checked = $('.selected-option:checked');
  var selected_key;
  if (checked.length >= 2) {
    selected_key = checked[0].value + "-" + checked[1].value;
  }/* else if (checked.length == 1) {
    selected_key = checked[0].value + "-none";
  }*/
  return selected_key;
}
// 合計金額欄の変更
function change_total_amount(selected_key) {
  var select_price = Number($('#price-' + selected_key).val());
  var total = Number($('#quantity').val()) * select_price;
  $('#total-amount').text(convertToCurrentCurrency(total));
}
// 単価部分を変更
function change_price(selected_key) {
  var select_price = Number($('#price-' + selected_key).val());
  // 割引時の表示
  var compare = Number($('#compare_at_price-' + selected_key).val());
  var price = Number($('#price-' + selected_key).val());
  if (compare > price) {
    $('.origin-price').text(convertToCurrentCurrency(compare));
    $('.off-price').text(convertToCurrentCurrency(compare - price) + "off");
  }
  $('#main-price').text(convertToCurrentCurrency(select_price));
  $('#amount').text(convertToCurrentCurrency(select_price));
  change_total_amount(selected_key);
}




// アコーディオン
$('.item-description-title').on('click', function(e) {
  if ($(e.target).next().is(":hidden")) {
    $(e.target).next().slideDown('selected');
  } else {
    $(e.target).next().slideUp('selected');
  }
});



// 購入数量の処理
// 数量の最大値以上を入れれないようにする
var ini_value;
$('#quantity').on("focus", function(e) {
  ini_value = e.target.value;
}).on('change', function(e) {
  var input_value = Number(e.target.value);
  var max = Number($('#quantity').prop('max'));

    // 数字以外が入力されたら元に戻す
  if (input_value == 0) {
    e.target.value = ini_value;
  }

  if (max) {
    if (input_value > max){
      e.target.value = max;
    }
  }
});
// 数量プラスボタン
$('#qty-plus').on('click', function(e) {
  var qty_e = $('#quantity');
  var in_val = Number(qty_e.val());
  var max = Number($('#quantity').prop('max'));
  var selected_key = set_selected_key();

  if (max) {
    if (in_val < max) {
      qty_e.val(in_val + 1);
      $('#buy-qty').val(in_val + 1);
      change_price(selected_key);
    } else {
      add_limit_message(e.target)
    }
  } else {
    qty_e.val(in_val + 1);
    $('#buy-qty').val(in_val + 1);
    change_price(selected_key);
  }
});
// 数量マイナスボタン
$('#qty-minus').on('click', function() {
  var qty_e = $('#quantity');
  var in_val = Number(qty_e.val());
  var selected_key = set_selected_key();

  if (in_val > 1) {
    qty_e.val(in_val - 1);
    $('#buy-qty').val(in_val - 1);
    change_price(selected_key);
  }
});




/* 在庫残数表示 */
function remain_display(num) {
  $('.remain_notice').css('display', "none");

  if (Number(num) <= 10) {
    $('.remain_stock').text(num);
    $('.remain_notice').fadeIn(200);
  }
}










/*
// 商品情報を取得
function get_product_information() {
  url = window.Shopify.routes.root + "products/" + product_handle + ".js";
  let ajaxOBJ = $.ajax({
    type: "GET",
    url: url,
    cache: false,
    dataType: 'json'
  });
  
  $.when(ajaxOBJ).done(function(data){
    var priceInLocalCurrency = convertToCurrentCurrency(data.price);
    console.log("Price in local currency: " + priceInLocalCurrency);
}).fail(function(xhr, status, error){
    console.log("NG", xhr, status, error)
});
return ajaxOBJ;
}
*/