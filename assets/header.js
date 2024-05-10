
var menu_timeID = [];
function slide_in(in_menu, wait) {
    var id = setTimeout(() => {
        in_menu.addClass('menu_slide_in');
    }, wait);
    menu_timeID.push(id);
}


// メニューの動作
$(document).on("mouseover", '.head-main-menu', function(e) {
    if (h_w <= 900) {
        //900以下は終了
        return false;
    } else {
        // PCサイズで起動
        var target = $(e.target).closest('.head-main-menu').children('.head-sub-menu-list')
        var is_have = false;
        var classlist = target[0].classList;
        
        // 子要素が無い場合は終了
        if (target.children().length == 0) {
            return false;
        }
        
        // 背景にブラー処理
        $('main').addClass('blur');

        for (i=0; i<classlist.length; i++) {
            if (classlist[i] == "is_open") {
                is_have = true;
            }
        }
        if (is_have) {
        } else {
            target.addClass('is_open');
            target.fadeIn(200);
            var menus = target.children('li');
            var wait = 100;
            var nextwait = 100;
            for (i=0; i<menus.length; i++) {
                var in_menu = $(menus[i]);
                slide_in(in_menu, wait)
                wait = wait + nextwait;
            }
        }
    }
// メニューから離れたら元に戻す
}).on("mouseleave", '.head-main-menu', function(e) {
    // 背景のブラー処理を削除
    $('main').removeClass('blur');
    for (iid=0;iid<menu_timeID.length;iid++) {
        clearTimeout(menu_timeID[iid]);
    }
    menu_timeID = [];
    var target = $(e.target).closest('.head-main-menu').children('.head-sub-menu-list')
    target.fadeOut(150);
    target.removeClass('is_open');
    var menus = target.children('li');
    for (i=0; i<menus.length; i++) {
        $(menus[i]).removeClass('menu_slide_in');
    }
}).on("mouseover", '.head-sub-menu', function(e) {
    // 孫メニューのを開く
    var target = $(e.target).closest('.head-sub-menu')
    console.log(target)
    if (h_w <= 900) {
        //900以下は終了
        return false;
    } else {
        // 孫要素が無い場合は終了
        if (target.find('.s2-menu').length == 0) {
            return false;
        }

        target.find('.sub-menu-title').addClass('s2-menu-open');
    }
}).on("mouseleave", '.head-sub-menu', function(e) {
    var target = $(e.target).closest('.head-sub-menu')
    target.find('.sub-menu-title').removeClass('s2-menu-open');
});







/* スマホ用の操作 */
// メニューボタン開閉
$(document).on('click', '.menu-list-btn', function() {
    // ユーザーメニューを閉じる
    $('.user-icon').removeClass('user-open');

    $('.menu-list-btn').toggleClass("open");
});

// ユーザーメニューの開閉
var h_w;
$(function () {
    $(window).on('load resize', function () {
        h_w = $(window).width();
    });
}); 
$('.account-link').on('click', function(e){
    if (h_w <= 900) {
        //900以下で起動
        // メインメニューを閉じる
        $('.menu-list-btn').removeClass('open');
        // ユーザーメニューの開閉
        $(e.target).parents('.account-btn').toggleClass('user-open');
        return false;
    } else {
        // PCサイズの場合は終了
        return false;
    }
});