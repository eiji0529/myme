document.addEventListener("DOMContentLoaded",function() {
    var images = document.querySelectorAll('.lazyload');
    for(let i =0; i < images.length; i++){
        var newSrc = '/images/product/image' + i + '.jpg';
        images[i].src = newSrc; // ここで src 属性を更新
    }
})