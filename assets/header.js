

// ハンバーガーメニュー
$(document).on('click', '.menu-trigger', function(e) {
    $('.menu-trigger').toggleClass('active-menu');
    $('#head-nav').toggleClass('active-menu');
    $('.head-icons').toggleClass('sp-active');

    // 背景にブラー処理
    $('main').toggleClass('blur');
}).on('click', '.m-title', function(e) {
    var sub_menu = $(e.target).closest('.m-title');
    sub_menu.toggleClass('sub-menu-open');
}).on('click', '#main', function() {
    $('.menu-trigger').removeClass('active-menu');
    $('#head-nav').removeClass('active-menu');
    $('.head-icons').removeClass('sp-active');
    $('main').removeClass('blur');
});






// 検索バー ************
$('#search-btn').on('click', function() {
var checkbox = document.getElementById('search-open-check');

if (checkbox.checked) {
    // 検索バーが表示された状態の場合
    $('#search_form').submit();
} else {
    // 検索アイコンのみ表示の場合
    checkbox.checked = true;
    $('#search-area').addClass('search-open');
    $('.close-btn').addClass('search-open');
    $('.search-separate').addClass('search-open');

    // 背景にブラー処理
    $('main').addClass('blur');
}
});
// 検索の×ボタン
$('.close-btn').on('click', function() {
    var checkbox = document.getElementById('search-open-check');
    clear_input();
    checkbox.checked = false;
    checkbox.defaultChecked = false;
    $('.search-open').removeClass('search-open');
    // 背景のブラー処理を削除
    $('main').removeClass('blur');
});
function clear_input() {
    var text = document.getElementById('search-box');
    text.value = "";
    text.defaultValue = "";
}
// ************ */

