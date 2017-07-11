"use strict";
console.clear();

function newGame() {
  var size = 4;

  var arr = new Array(size * size).fill(0).map(function(el, i) {
    return i + 1;
  });

  arr[arr.length - 1] = "";

  var table = document.createElement("div");
  document.querySelector("#box").innerHTML = "";
  document.querySelector("#box").appendChild(table);
  table.classList.add("table");

  class PLITKA {
    constructor(x, y, content, container) {
      this._block = document.createElement("div");
      this._block.classList.add("block");
      this._block.innerText = content; //arr.shift();
      container.appendChild(this._block);

      this._block.plitka = this;

      this.x = x;
      this.y = y;
    }

    get x() {
      return this._x;
    }

    set x(value) {
      this._x = value;
      this._block.style.left = this._x * 2 + "em";
    }

    get y() {
      return this._y;
    }

    set y(value) {
      this._y = value;
      this._block.style.top = this._y * 2 + "em";
    }
  } //PLITKA

  var playbox = [];
  for (var y = 0; y < size; y++) {
    for (var x = 0; x < size; x++) {
      playbox.push(new PLITKA(x, y, arr.shift(), table));
    }
  }

  var emptyPlitka = playbox[playbox.length - 1];

  // счетчик количества ходов
  var z = 0;
  var stepCounter = () => {
    z = z + 1;
    document.querySelector(".number").innerText = z;
  };

  // переназначение содержимого ячеек
  table.addEventListener("click", function(event) {
    var target = event.target;
    if (target == table) return;
    if (target.textContent === "") return;

    movePlitka(target.plitka);
  });

  function movePlitka(plitka) {
    var tx = plitka.x;
    var ty = plitka.y;
    var ex = emptyPlitka.x;
    var ey = emptyPlitka.y;

    if (
      (Math.abs(tx - ex) != 1 || Math.abs(ty - ey) != 0) &&
      (Math.abs(tx - ex) != 0 || Math.abs(ty - ey) != 1)
    )
      return;

    var tempLeft = emptyPlitka.x;
    var tempTop = emptyPlitka.y;

    emptyPlitka.x = plitka.x;
    emptyPlitka.y = plitka.y;

    plitka.x = tempLeft;
    plitka.y = tempTop;

    //console.log("tx-ex " + Math.abs(tx - ex) + ", ty-ey " + Math.abs(ty - ey));

    stepCounter();
  }

  window.addEventListener("keydown", function(event) {
    var plitkaToMove;

    if (event.keyCode == 37) {
      plitkaToMove = playbox.find(
        plitka => plitka.x === emptyPlitka.x - 1 && plitka.y === emptyPlitka.y
      );
      console.log("left");
    }
    if (event.keyCode == 38) {
      plitkaToMove = playbox.find(
        plitka => plitka.x === emptyPlitka.x && plitka.y === emptyPlitka.y - 1
      );
      console.log("up");
    }
    if (event.keyCode == 39) {
      plitkaToMove = playbox.find(
        plitka => plitka.x === emptyPlitka.x + 1 && plitka.y === emptyPlitka.y
      );
      console.log("right");
    }
    if (event.keyCode == 40) {
      plitkaToMove = playbox.find(
        plitka => plitka.x === emptyPlitka.x && plitka.y === emptyPlitka.y + 1
      );
      console.log("down");
    }

    if (plitkaToMove !== undefined) {
      movePlitka(plitkaToMove);
    }
  });
}

document.querySelector(".but").addEventListener("click", function(event) {
  document.querySelector("#box").classList.remove("bg");
  document.querySelector(".number").textContent = "0";

  newGame();
});
//здесь будем получать значение кейкода для перемешивания
function randomKeyCode() {
  var rand = 37 + Math.random() * 4;
  rand = Math.floor(rand);
  return rand;
}
function mix() {
  $("button").on("click", function() {
    //допустим, хочу вверх нажать
    var e = $.Event("keydown", { keyCode: 38 });
    // а на .table ли вешать? если на бади - то, по идее, экран скроллить попытается
    $(".table").trigger(e);
    console.log("click");
  });
}
mix();
