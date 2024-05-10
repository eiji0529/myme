document.addEventListener('DOMContentLoaded', function() {
  // 21枚の写真を見せるために、一つずつdivに入れていく。
  for (let i = 0; i < productImages.length && i < 21; i++) {
    // 写真を入れるdivを見つける。
    const divElement = document.getElementById("lookbook-" + (i + 1));
    // divが見つかったら、その中に写真を入れる。
    if (divElement) {
      divElement.innerHTML = `<img class="lazyload" src="${productImages[i]}" loading="lazy">`;
    }
  }

  // 22枚目以降の写真を扱うために、remainingImagesとしてそれらの画像のURLを別の配列に保存する。
  let remainingImages = productImages.slice(21);

  // 連番を管理するためのカウンターを設定
  let cloneCounter = 1;

  // まだ見せていない写真がある限りこの作業を続ける。
  while (remainingImages.length > 0) {
    // 新しいスペースを6つ用意して、それぞれに写真を入れていく。
    for (let lookbookNumber = 1; lookbookNumber <= 6 && remainingImages.length > 0; lookbookNumber++) {
      // 元のスペースをコピーして、新しいスペースを作る。
      const originalLookbookLayout = document.getElementById(`lookbook${lookbookNumber}`);
      const clonedLookbookLayout = originalLookbookLayout.cloneNode(true);

      // 新しいスペースには特別な名前をつけて、どれがどれかわかるようにする。
      clonedLookbookLayout.id = `lookbook${lookbookNumber}-clone-${cloneCounter}`;
      cloneCounter++; // 次の複製に備えてカウンターを1増やす

      // 新しく作ったスペースの中の各divに、残っている写真を入れていく。
      // 写真がもうなければ、そのdivは見せないようにする。
      Array.from(clonedLookbookLayout.querySelectorAll('div[id^="lookbook-"]')).forEach(div => {
        if (remainingImages.length > 0) {
          div.innerHTML = `<img class="lazyload" src="${remainingImages.shift()}" loading="lazy">`;
        } else {
          div.style.display = 'none'; // 写真が無ければ非表示
        }
      });

      // できた新しいスペースを、末尾に追加する。
      document.getElementById('lookbook-product').appendChild(clonedLookbookLayout);
    }
  }
});

// document.addEventListener('DOMContentLoaded', function() {
//   // 最初の21枚の画像を既存のdivに挿入
//   for (let i = 0; i < productImages.length && i < 21; i++) {
//     const divElement = document.getElementById("lookbook-" + (i + 1));
//     if (divElement) { // divが存在する場合のみ
//       divElement.innerHTML = `<img class="lazyload" src="${productImages[i]}" loading="lazy">`;
//     }
//   }

//   // もし22枚目以降の画像がある場合
//   if (productImages.length > 21) {
    
//       //lookbook-productを取得
//       const lookbookLayout = document.getElementById('lookbook-product');

//       //lookbook1を取得・複製
//       const lookbook1Layout = document.getElementById("lookbook1");
//       const clonedLookbook1Layout = lookbook1Layout.cloneNode(true);
//       //複製したlookbook1にIDを付与
//       clonedLookbook1Layout.id = "lookbook1Layout-clone";

//       //lookbook2を取得
//       const lookbook2Layout = document.getElementById('lookbook2')
//       const clonedLookbook2Layout = lookbook2Layout.cloneNode(true);
//       //複製したlookbook2にIDを付与
//       clonedLookbook2Layout.id = "lookbook2Layout-clone";

//       //lookbook3を取得
//       const lookbook3Layout = document.getElementById('lookbook3')
//       const clonedLookbook3Layout = lookbook3Layout.cloneNode(true);
//       //複製したlookbook3にIDを付与
//       clonedLookbook3Layout.id = "lookbook3Layout-clone";

//       //lookbook4を取得
//       const lookbook4Layout = document.getElementById('lookbook4')
//       const clonedLookbook4Layout = lookbook4Layout.cloneNode(true);
//       //複製したlookbook4にIDを付与
//       clonedLookbook4Layout.id = "lookbook4Layout-clone";

//       //lookbook5を取得
//       const lookbook5Layout = document.getElementById('lookbook5')
//       const clonedLookbook5Layout = lookbook5Layout.cloneNode(true);
//       //複製したlookbook5にIDを付与
//       clonedLookbook5Layout.id = "lookbook5Layout-clone";

//       //lookbook6を取得
//       const lookbook6Layout = document.getElementById('lookbook6')
//       const clonedLookbook6Layout = lookbook6Layout.cloneNode(true);
//       //複製したlookbook4にIDを付与
//       clonedLookbook6Layout.id = "lookbook6Layout-clone";


//       let imageIndex = 21;
//       ['lookbook-1', 'lookbook-2', 'lookbook-3', 'lookbook-4'].forEach(function(id, index) {
//         const clonedDiv1 = clonedLookbook1Layout.querySelector('#' + id);
//         if (productImages.length > imageIndex) {
//           clonedDiv1.innerHTML = `<img class="lazyload" src="${productImages[imageIndex++]}" loading="lazy">`;
//         } else {
//           // 画像がない場合は要素を非表示にする
//           clonedDiv1.style.display = 'none';
//         }
//       });

//       ['lookbook-5', 'lookbook-6', 'lookbook-7',].forEach(function(id, index) {
//         const clonedDiv2 = clonedLookbook2Layout.querySelector('#' + id);
//         if (productImages.length > imageIndex) {
//           clonedDiv2.innerHTML = `<img class="lazyload" src="${productImages[imageIndex++]}" loading="lazy">`;
//         } else {
//           // 画像がない場合は要素を非表示にする
//           clonedDiv2.style.display = 'none';
//         }
//       });

//       ['lookbook-8', 'lookbook-9', 'lookbook-10', 'lookbook-11',].forEach(function(id, index) {
//         const clonedDiv3 = clonedLookbook3Layout.querySelector('#' + id);
//         if (productImages.length > imageIndex) {  
//           clonedDiv3.innerHTML = `<img class="lazyload" src="${productImages[imageIndex++]}" loading="lazy">`;
//         } else {
//           // 画像がない場合は要素を非表示にする
//           clonedDiv3.style.display = 'none';
//         }
//       });

//       ['lookbook-12', 'lookbook-13', 'lookbook-14',].forEach(function(id, index) {
//         const clonedDiv4 = clonedLookbook4Layout.querySelector('#' + id);
//         if (productImages.length > imageIndex) {
//           clonedDiv4.innerHTML = `<img class="lazyload" src="${productImages[imageIndex++]}" loading="lazy">`;
//         } else {
//           // 画像がない場合は要素を非表示にする
//           clonedDiv4.style.display = 'none';
//         }
//       });

//       ['lookbook-15', 'lookbook-16', 'lookbook-17', 'lookbook-18',].forEach(function(id, index) {
//         const clonedDiv5 = clonedLookbook5Layout.querySelector('#' + id);
//         if (productImages.length > imageIndex) {
//           clonedDiv5.innerHTML = `<img class="lazyload" src="${productImages[imageIndex++]}" loading="lazy">`;
//         } else {
//           // 画像がない場合は要素を非表示にする
//           clonedDiv5.style.display = 'none';
//         }
//       });

//       ['lookbook-19', 'lookbook-20', 'lookbook-21',].forEach(function(id, index) {
//         const clonedDiv6 = clonedLookbook6Layout.querySelector('#' + id);
//         if (productImages.length > imageIndex) {
//           clonedDiv6.innerHTML = `<img class="lazyload" src="${productImages[imageIndex++]}" loading="lazy">`;
//         } else {
//           // 画像がない場合は要素を非表示にする
//           clonedDiv6.style.display = 'none';
//         }
//     });

//     //複製したlookbook1~lookbook6を末尾に配置する
//     lookbookLayout.appendChild(clonedLookbook1Layout);
//     lookbookLayout.appendChild(clonedLookbook2Layout);
//     lookbookLayout.appendChild(clonedLookbook3Layout);
//     lookbookLayout.appendChild(clonedLookbook4Layout);
//     lookbookLayout.appendChild(clonedLookbook5Layout);
//     lookbookLayout.appendChild(clonedLookbook6Layout);
//   }
// });
