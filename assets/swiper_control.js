


$(function () {
    //swiper 900以下で起動
    var swiper;
    $(window).on('load resize', function () {
        var w = $(window).width();
        if (w <= 900) {
            if (swiper) {
                return;
            } else {
                // data-originalからsrcへ画像URLをコピー
                var img_ele = $('img.lazyload');
                for (i=0; i<img_ele.length; i++) {
                    var src_url = $(img_ele[i]).attr("data-original");
                    $(img_ele[i]).attr("src", src_url);
                }

                swiper = new Swiper('.swiper', {
                    slidesPerView: 1,
                    slidesPerGroup: 1,
                    lazyPreloadPrevNext: 1,
                    loop: true,
                    pagination: {
                        el: '.swiper-pagination',
                        type: "bullets",
                        clickable: false,
                    },
                });
            }
        } else {
            if (swiper) {
                swiper.destroy();
                swiper = undefined;
            }
        }
    });
}); 