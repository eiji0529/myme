




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
    