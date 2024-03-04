// Put your application javascript here

// デバッグ用
(() => {
  if (!document.querySelector('.pre-json')) return;
  class BuetifyPreJson {
    constructor(obj) {
      this.elms = document.querySelectorAll(`${obj.selector}`)
    }
    buetify() {
      [...this.elms].forEach(_elm => {
        const jsonText = _elm.textContent
        const jsonTextParse = JSON.parse(jsonText)
        _elm.textContent = JSON.stringify(jsonTextParse, null, 2)
      })
    }
    init() {
      this.buetify()
    }
  }
  const buetifyPreJson = new BuetifyPreJson({
    selector: '.pre-json',
  })
  buetifyPreJson.init()
})();
// ************ */


$(function() {
  add_limit = add_limit.replace("&#39;", "\'");
});



// 背景の高さ調整 ************
const resizeObserver = new ResizeObserver((entries) => {
const h = entries[0].contentRect.height;
background_resize();
});
resizeObserver.observe($('body')[0]);

window.addEventListener('load', function() {
background_resize();
});
window.addEventListener('resize', function() {
// リサイズ時に実行したい処理をここに記述
background_resize();
});
function background_resize() {
// ヘッダーの高さを取得
var top_height = $('#header').height();
// トップ画像の高さを取得
var top_img_height = getComputedStyle(document.documentElement).getPropertyValue('--main-logo-height');

var one_vh = get_window_height();

// 背景のtopの位置
top_height += get_m_vh(top_img_height, one_vh) - get_m_px(top_img_height);

// 背景の高さ
var bk_height = calc_bk_height(top_height);

// $('#base_background').css("top", top_height);
$('#base_background').css("height", bk_height);
$('#base_background').css("top", top_height);
}
function get_window_height() {
// ウィンドウの高さを取得
var windowHeight = window.innerHeight;
// 1vhを求める
return windowHeight / 100;
}
function get_m_vh(top_img_height, one_vh) {
var height = 0;
if (top_img_height != "") {
  var m_vh = top_img_height.match(/(\d+vh)/g);
  m_vh = m_vh[0].match(/\d{1,}/g);
  if (m_vh != null) {
    height += (Number(m_vh[0]) * one_vh);
  }
}
return height;
}
function get_m_px(top_img_height) {
var height = 0;
if (top_img_height != "") {
  var m_px = top_img_height.match(/(\d+px)/g);
  m_px = m_px[0].match(/\d{1,}/g);
  if (m_px != null) {
    height += Number(m_px[0]);
  }
}
return height;
}
function calc_bk_height(top_height) {
// ページの高さ
var totalHeight = document.documentElement.offsetHeight;
// ヘッダーの高さ
var header_height = $('#header').height();
// フッターの高さ
var footer_height = $('#footer').height() + 30;

// rootにフッターの高さをセット
const root = document.documentElement;
root.style.setProperty('--footer-height', footer_height + "px");


var bk_height = totalHeight - footer_height - top_height;
return bk_height;
}
// ************ */



// 言語切替 ************
$('#lang-btn').on('click', function() {
$('#lang-btn').find('.lang-selecter').fadeToggle(200);
})
$('#sp-lang-btn').on('click', function() {
$('#sp-lang-btn').find('.lang-selecter').fadeToggle(200);
})
function language_selecter(e) {
var lang_val = document.getElementById('lang-val');
lang_val.value = e;
var submit_form = document.getElementById('SelectLanguageForm');
submit_form.submit()
}
// ************ */



// お知らせ ************
// お知らせが有れば表示
$(function() {
  if($('#is_popup').val() == "true") {
    setTimeout(() => {
      $('#popup-container').fadeIn(1400);
    }, 200);
  }

  //window.sessionStorage.clear(); // セッションを全削除
  // 海外発送の注意表示
  if (window.localStorage.getItem(["is_os_n"]) != "close") {
    $('.overseas').fadeIn(500);
  }
});
// ダイアログを消す
$('.popup-circle').on('click', function() {
$('#popup-container').fadeOut(200);
});
// 海外発送の注意表示を消す
$('.os-head-circle').on('click', function() {
  var key = "is_os_n";
  $('.overseas').fadeOut(300);
  // 状態をセッションへ保存
  window.localStorage.setItem([key],["close"]);
})

// ************ */


/* 購入数量追加時の在庫リミットメッセージ */
function add_limit_message(ele) {
  var add_ele = $(ele).parents('.qty-select');
  var balloon = create_balloon(add_limit);
  add_ele.append(balloon)
  setTimeout(() => {
    balloon.remove();
  }, 3900);
}
function create_balloon(text) {
  const div = document.createElement('div');
  div.classList = "balloon";
  div.innerText = text;
  return div;
}
$(document).on('mouseover', '.balloon', function(e) {
  $(e.target).fadeOut(200);
});



// 動画ファイルを使用する場合はcanplayで表示する
if(document.getElementById('video') != null){
  document.getElementById('video').addEventListener('canplay', function(e) {
    $('#video').css('opacity', '1');
  }, false);
}
$(function() {
  var video = $('video').get(0);
  if (video == undefined) {return false;}
  video.muted = true;
});
