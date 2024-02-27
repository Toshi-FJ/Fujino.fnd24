"use strict";
// 1行目に記載している 'use strict' は削除しないでください

//ルーレット表示
let rouletteArray = [0, 30, 2, 6, 0, 4, 8, 2, 0, 10, 4, 2, 0, 8, 6, 2]; // ルーレット番号
let roulette = document.getElementById("roulette");
let item_length = rouletteArray.length; // ルーレット要素の数
let r = roulette.clientWidth / 2; // ruletteの半径
let deg = 360.0 / item_length; // ルーレット番号を並べる角度
let rad = (deg * Math.PI) / 180.0; // ラジアン変換

// ルーレット要素の追加
for (let i = 0; i < item_length; i++) {
  let div = document.createElement("div");
  div.className = "item";
  div.id = "item" + i;
  div.innerHTML = rouletteArray[i];
  const x = Math.cos(rad * (i - 4)) * r + r;
  const y = Math.sin(rad * (i - 4)) * r + r;
  let circle = roulette.appendChild(div);
  circle.style.left = x + "px";
  circle.style.top = y + "px";
}

//bet表示
const bet2Array = [2, 4, 6];
const bet4Array = [4, 8, 12];
const bet6Array = [6, 12, 18];
const bet8Array = [8, 16, 24];
const bet10Array = [10, 20, 30];
const bet30Array = [30, 60, 90];

// bet2Arrayの配列要素をHTMLに追加
let bet2 = document.getElementById("bet2");
let bet2_length = bet2Array.length;

for (let i = 0; i < bet2_length; i++) {
  // div要素を作成
  let div = document.createElement("div");

  // div要素にクラス名とidを付与
  div.className = "bet" + bet2Array[0];
  div.id = "bet2-" + bet2Array[i];

  // div要素の中に配列の要素を挿入
  div.innerHTML = bet2Array[i];

  // div要素をHTMLに追加
  bet2.appendChild(div);
}

// bet4Arrayの配列要素をHTMLに追加
let bet4 = document.getElementById("bet4");
let bet4_length = bet4Array.length;

for (let i = 0; i < bet4_length; i++) {
  let div = document.createElement("div");
  div.className = "bet" + bet4Array[0];
  div.id = "bet4-" + bet4Array[i];
  div.innerHTML = bet4Array[i];
  bet4.appendChild(div);
}

// bet6Arrayの配列要素をHTMLに追加
let bet6 = document.getElementById("bet6");
let bet6_length = bet6Array.length;

for (let i = 0; i < bet6_length; i++) {
  let div = document.createElement("div");
  div.className = "bet" + bet6Array[0];
  div.id = "bet6-" + bet6Array[i];
  div.innerHTML = bet6Array[i];
  bet6.appendChild(div);
}

// bet8Arrayの配列要素をHTMLに追加
let bet8 = document.getElementById("bet8");
let bet8_length = bet8Array.length;

for (let i = 0; i < bet8_length; i++) {
  let div = document.createElement("div");
  div.className = "bet" + bet8Array[0];
  div.id = "bet8-" + bet8Array[i];
  div.innerHTML = bet8Array[i];
  bet8.appendChild(div);
}
//

// bet10Arrayの配列要素をHTMLに追加
let bet10 = document.getElementById("bet10");
let bet10_length = bet10Array.length;

for (let i = 0; i < bet10_length; i++) {
  let div = document.createElement("div");
  div.className = "bet" + bet10Array[0];
  div.id = "bet10-" + bet10Array[i];
  div.innerHTML = bet10Array[i];
  bet10.appendChild(div);
}
//

// bet10Arrayの配列要素をHTMLに追加
let bet30 = document.getElementById("bet30");
let bet30_length = bet30Array.length;

for (let i = 0; i < bet30_length; i++) {
  let div = document.createElement("div");
  div.className = "bet" + bet30Array[0];
  div.id = "bet30-" + bet30Array[i];
  div.innerHTML = bet30Array[i];
  bet30.appendChild(div);
}
//

const onId = document.getElementById("on");
const medalId = document.getElementById("medal");
const starter = document.getElementById("start");
const resetter = document.getElementById("reset");
onId.addEventListener("click", on);
starter.addEventListener("click", start_set, true); //true;無効　false;有効
resetter.addEventListener("click", reset_set, false); //true;無効　false;有効
resetter.addEventListener("click", on, false); //true;無効　false;有効

// //ルーレットの処理
let interval;
let speed;
let maxSpeed;
let rouletteIndex = 0;
let round = 2;
let medal;

// ページが読み込まれたときに実行
window.onload = function () {
  // 全てのボタンを無効にする
  starter.disabled = true;
  resetter.disabled = true;
  betButton2.disabled = true;
  betButton4.disabled = true;
  betButton6.disabled = true;
  betButton8.disabled = true;
  betButton10.disabled = true;
  betButton30.disabled = true;
};

// "on"ボタンがクリックされた時の処理
function on() {
  // 全てのボタンを有効にする
  starter.disabled = false;
  resetter.disabled = false;
  betButton2.disabled = false;
  betButton4.disabled = false;
  betButton6.disabled = false;
  betButton8.disabled = false;
  betButton10.disabled = false;
  betButton30.disabled = false;
  medal = 10;
  medalId.textContent = medal;
}

// スタートボタン処理
function start_set() {
  starter.disabled = true; // スタートボタンを無効にする
  resetter.disabled = false; // リセットボタンを有効にする
  betButton2.disabled = true;
  betButton4.disabled = true;
  betButton6.disabled = true;
  betButton8.disabled = true;
  betButton10.disabled = true;
  betButton30.disabled = true;

  // "停止時の表示　pink"をリセット
  let pink_number = document.querySelector(".pink");
  if (pink_number) {
    pink_number.classList.remove("pink");
  }

  rouletteIndex = 0; // ルーレットの位置をリセット

  //speed をランダムにすることで回転速度が代わる。
  //回転数をランダムにすることで回転数が代わる。
  speed = 100;
  speed = Math.floor(Math.random() * (speed - speed / 2) + speed / 2);
  round = 4;
  round = Math.floor(Math.random() * (round - 1) + 1);
  maxSpeed = Math.floor(Math.random() * (2000 - 500) + 500);
  interval = setInterval(start_go, speed);
}

// // スタート処理
function start_go() {
  let div_number;
  for (let j = 0; j < item_length; j++) {
    div_number = document.getElementById("item" + j);
    if (div_number) {
      div_number.classList.remove("red");
    }
  }

  let grid = rouletteIndex % item_length; // ルーレットのインデックスを取得
  div_number = document.getElementById("item" + grid); // エレメントのIDを取得する際にルーレットのインデックスを使用
  div_number.classList.add("red");

  rouletteIndex++;

  if (rouletteIndex >= item_length * round) {
    // 増分を変更すると減速速度が代わる。増加させると遅くなる。
    speed += 100;
    clearInterval(interval);
    interval = setInterval(start_go, speed);
  }

  if (speed >= maxSpeed) {
    // 上限値を変更すると停止するまでの進み具合が代わる。増加させると長くなる。
    // 1000 を変数に格納して、格納した値を変更させる方が良い。
    clearInterval(interval);
    let red_number = document.querySelector(".red");
    if (red_number) {
      red_number.classList.remove("red");
      red_number.classList.add("pink");
    }
    starter.disabled = false;
    //メダル加算
    medal = medal + betObj[rouletteArray[grid]];
    medalId.textContent = medal;
    //リセット処理
    setTimeout(reset_set, 3000);
  }
}

// リセット処理
const betClassArray = ["bet2", "bet4", "bet6", "bet8", "bet10", "bet30"];

function reset_set() {
  clearInterval(interval);
  starter.disabled = false;
  betButton2.disabled = false;
  betButton4.disabled = false;
  betButton6.disabled = false;
  betButton8.disabled = false;
  betButton10.disabled = false;
  betButton30.disabled = false;
  for (let k = 0; k < 16; k++) {
    let all = document.getElementById("item" + k);
    all.classList.remove("pink");
    all.classList.remove("red");
  }
  rouletteIndex = 0;
  speed = 50;
  round = 2;

  //betのリセット
  for (let i = 0; i < betClassArray.length; i++) {
    let betItems = document.getElementsByClassName(betClassArray[i]);
    for (let item of betItems) {
      item.classList.remove("changedColor");
    }
  }
  //betのリセット
  for (let i = 0; i < Object.keys(betObj).length; i++) {
    betObj[Object.keys(betObj)[i]] = 0;
  }

  counter2 = 0;
  counter4 = 0;
  counter6 = 0;
  counter8 = 0;
  counter10 = 0;
  counter30 = 0;
}

// bet-button処理
// bet buttonを取得
let betButton2 = document.getElementById("bet-Button2");
let betButton4 = document.getElementById("bet-Button4");
let betButton6 = document.getElementById("bet-Button6");
let betButton8 = document.getElementById("bet-Button8");
let betButton10 = document.getElementById("bet-Button10");
let betButton30 = document.getElementById("bet-Button30");

// // リセットボタンを取得
// let resetButton = document.getElementById("reset");

// クリック回数を管理するカウンター
let counter2 = 0;
let counter4 = 0;
let counter6 = 0;
let counter8 = 0;
let counter10 = 0;
let counter30 = 0;

const betObj = { 2: 0, 4: 0, 6: 0, 8: 0, 10: 0, 30: 0, 0: 0 };

// bet2 buttonをクリックしたときの処理
betButton2.onclick = function () {
  // クリック上限を3回に制限
  if (counter2 >= 3 || medal === 0) {
    return;
  }
  let items = document.getElementsByClassName("bet2");
  // 全てのbet2クラスの要素の色を初期状態に戻す。先に戻さないとクリック時に変更しない。
  for (let item of items) {
    item.classList.remove("changedColor");
  }
  // クリック回数に応じて色を変更する要素を選ぶ
  let id;
  if (counter2 === 0) {
    id = "bet2-" + bet2Array[0];
    counter2 += 1;
    betObj[2] = bet2Array[0];
    medal = medal - 1;
    medalId.textContent = medal;
  } else if (counter2 === 1) {
    id = "bet2-" + bet2Array[1]; //'bet4';
    counter2 += 1;
    betObj[2] = bet2Array[1];
    medal = medal - 1;
    medalId.textContent = medal;
  } else if (counter2 === 2) {
    id = "bet2-" + bet2Array[2]; //'bet6';
    counter2 += 1;
    betObj[2] = bet2Array[2];
    medal = medal - 1;
    medalId.textContent = medal;
  }
  // 色を変更する要素を取得
  let targetItem = document.getElementById(id);
  // 色を変更
  if (targetItem) {
    targetItem.classList.add("changedColor");
  }
};

// bet4 buttonをクリックしたときの処理
betButton4.onclick = function () {
  if (counter4 >= 3 || medal === 0) {
    return;
  }
  let items = document.getElementsByClassName("bet4");
  for (let item of items) {
    item.classList.remove("changedColor");
  }
  let id;
  if (counter4 === 0) {
    id = "bet4-" + bet4Array[0];
    counter4 += 1;
    betObj[4] = bet4Array[0];
    medal = medal - 1;
    medalId.textContent = medal;
  } else if (counter4 === 1) {
    id = "bet4-" + bet4Array[1];
    counter4 += 1;
    betObj[4] = bet4Array[1];
    medal = medal - 1;
    medalId.textContent = medal;
  } else if (counter4 === 2) {
    id = "bet4-" + bet4Array[2];
    counter4 += 1;
    betObj[4] = bet4Array[2];
    medal = medal - 1;
    medalId.textContent = medal;
  }
  let targetItem = document.getElementById(id);
  if (targetItem) {
    targetItem.classList.add("changedColor");
  }
};

// bet6 buttonをクリックしたときの処理
betButton6.onclick = function () {
  if (counter6 >= 3 || medal === 0) {
    return;
  }
  let items = document.getElementsByClassName("bet6");
  for (let item of items) {
    item.classList.remove("changedColor");
  }
  let id;
  if (counter6 === 0) {
    id = "bet6-" + bet6Array[0];
    counter6 += 1;
    betObj[6] = bet6Array[0];
    medal = medal - 1;
    medalId.textContent = medal;
  } else if (counter6 === 1) {
    id = "bet6-" + bet6Array[1];
    counter6 += 1;
    betObj[6] = bet4Array[1];
    medal = medal - 1;
    medalId.textContent = medal;
  } else if (counter6 === 2) {
    id = "bet6-" + bet6Array[2];
    counter6 += 1;
    betObj[6] = bet6Array[2];
    medal = medal - 1;
    medalId.textContent = medal;
  }
  let targetItem = document.getElementById(id);
  if (targetItem) {
    targetItem.classList.add("changedColor");
  }
};

// bet8 buttonをクリックしたときの処理
betButton8.onclick = function () {
  if (counter8 >= 3 || medal === 0) {
    return;
  }
  let items = document.getElementsByClassName("bet8");
  for (let item of items) {
    item.classList.remove("changedColor");
  }
  let id;
  if (counter8 === 0) {
    id = "bet8-" + bet8Array[0];
    counter8 += 1;
    betObj[8] = bet8Array[0];
    medal = medal - 1;
    medalId.textContent = medal;
  } else if (counter8 === 1) {
    id = "bet8-" + bet8Array[1];
    counter8 += 1;
    betObj[8] = bet8Array[1];
    medal = medal - 1;
    medalId.textContent = medal;
  } else if (counter8 === 2) {
    id = "bet8-" + bet8Array[2];
    counter8 += 1;
    betObj[8] = bet8Array[2];
    medal = medal - 1;
    medalId.textContent = medal;
  }
  let targetItem = document.getElementById(id);
  if (targetItem) {
    targetItem.classList.add("changedColor");
  }
};

// bet10 buttonをクリックしたときの処理
betButton10.onclick = function () {
  if (counter10 >= 3 || medal === 0) {
    return;
  }
  let items = document.getElementsByClassName("bet10");
  for (let item of items) {
    item.classList.remove("changedColor");
  }
  let id;
  if (counter10 === 0) {
    id = "bet10-" + bet10Array[0];
    counter10 += 1;
    betObj[10] = bet10Array[0];
    medal = medal - 1;
    medalId.textContent = medal;
  } else if (counter10 === 1) {
    id = "bet10-" + bet10Array[1];
    counter10 += 1;
    betObj[10] = bet10Array[1];
    medal = medal - 1;
    medalId.textContent = medal;
  } else if (counter10 === 2) {
    id = "bet10-" + bet10Array[2];
    counter10 += 1;
    betObj[10] = bet10Array[2];
    medal = medal - 1;
    medalId.textContent = medal;
  }
  let targetItem = document.getElementById(id);
  if (targetItem) {
    targetItem.classList.add("changedColor");
  }
};

// bet30 buttonをクリックしたときの処理
betButton30.onclick = function () {
  if (counter30 >= 3 || medal === 0) {
    return;
  }
  let items = document.getElementsByClassName("bet30");
  for (let item of items) {
    item.classList.remove("changedColor");
  }
  let id;
  if (counter30 === 0) {
    id = "bet30-" + bet30Array[0];
    counter30 += 1;
    betObj[30] = bet30Array[0];
    medal = medal - 1;
    medalId.textContent = medal;
  } else if (counter30 === 1) {
    id = "bet30-" + bet30Array[1];
    counter30 += 1;
    betObj[30] = bet30Array[1];
    medal = medal - 1;
    medalId.textContent = medal;
  } else if (counter30 === 2) {
    id = "bet30-" + bet30Array[2];
    counter30 += 1;
    betObj[30] = bet30Array[2];
    medal = medal - 1;
    medalId.textContent = medal;
  }
  let targetItem = document.getElementById(id);
  if (targetItem) {
    targetItem.classList.add("changedColor");
  }
};
