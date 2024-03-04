
// ページを開いたとき
$(function() {
    // 国の初期値を表示
    var country_ele = $('.country-list');
    for (i=0; i<country_ele.length; i++) {
        init_country(country_ele[i]);
        // 都道府県のリストを追加
        set_province(country_ele[i]);
        // 都道府県の初期値を表示
        var province_ele = $(country_ele[i]).parents('form').find('.province-list')
        init_province(province_ele);
    }
});
// 国の初期値を表示
function init_country(country_ele) {
    var init = $(country_ele).attr('data-default');
    var options = $(country_ele).find('option');
    for (ir=0; ir<options.length; ir++) {
        if (init == options[ir].text) {
            options[ir].selected = true;
            break;
        }
    }
}
// 都道府県の初期値を表示
function init_province(province_ele) {
    var init = $(province_ele).attr('data-default');
    var options = $(province_ele).find('option');
    for (ir=0; ir<options.length; ir++) {
        if (init == options[ir].text) {
            options[ir].selected = true;
            break;
        }
    }
}
// 都道府県のリストを追加
function set_province(on_this) {
    var prov_arr = $(on_this).find(':selected').data('provinces');
    var change_target = $(on_this).parents('form').find('.province-list');
    change_target.html("");
    if (prov_arr.length != 0) {
        $(change_target).parents('.select-province').fadeIn(100);
        prov_arr.forEach(element => {
            let option = document.createElement('option');
            option.value = element[0];
            option.innerText = element[1];
            change_target.append(option);
        });
    } else {
        $(change_target).parents('.select-province').fadeOut(100);
    }
}


// 住所追加を開く
function open_newform() {
    $('.new-add-form').fadeIn(200);
    $('.new-address').css('height', 0);
    $('.new-address').fadeOut(200);
}
function close_newform() {
    $('.new-add-form').fadeOut(200);
    $('.new-address').css('height', "");
    $('.new-address').fadeIn(200);
}

// 住所編集を開く
function open_edit(e) {
    var edit_form = $(e).parents('.myac-addresses').find('.addresses');
    $(e).parents('.disp-address').css('display', "none");
    edit_form.fadeIn(200);
}
function close_edit(e) {
    $(e).parents('.addresses').css('display', "none");
    $(e).parents('.myac-addresses').find('.disp-address').fadeIn(200);
}


// 国を選択したときに都道府県の内容変更処理
$(document).on('change', '.country-list', function(e) {
    set_province(e.target);
});


// 更新、追加ボタンを押したとき
$(document).on('click', '.add-confirm', function(e) {
    var parent;
    var parent1 = $(e.target).parents('.new-add-form');
    var parent2 = $(e.target).parents('.myac-addresses');
    if (parent1.length != 0) {
        parent = parent1;
    } else if (parent2.length != 0) {
        parent = parent2;
    }

    // 入力内容のバリデーション
    var is_error = validate(parent);
    if (is_error) {
        $(parent).find('input[name="address[last_name]"]').next().addClass("req");
        $(parent).find('input[name="address[first_name]"]').next().addClass("req");
        $(parent).find('input[name="address[address1]"]').next().addClass("req");
        $(parent).find('.required_text').fadeIn(200);
        return false;
    }
});

function validate(parent) {
    var is_error = false;
    var val_arr = [];
    // 名字
    val_arr.push($(parent).find('input[name="address[last_name]"]').val());
    // 名前
    val_arr.push($(parent).find('input[name="address[first_name]"]').val());
    // 住所
    val_arr.push($(parent).find('input[name="address[address1]"]').val());

    val_arr.forEach(element => {
        if (!element) {
            is_error = true;
        }
    });

    // 国
    var country = $(parent).find('select[name="address[country]"]').val();
    if (country == "---") {
        $(parent).find('select[name="address[country]"]').prev().addClass("req");
        is_error = true;
    }
    return is_error;
}
function error_div(text) {
    var div = document.createElement('div');
    div.innerText = text;
    return div;
}
