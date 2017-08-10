"use strict";
console.clear();

//var primer=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,''];

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
      this._block.innerText = content;
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
  function stepCounter() {
    z++;
    document.querySelector(".number").innerText = z;
  }

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

    stepCounter();
  }

  window.addEventListener("keydown", function(event) {
    var shiftByKeyCodeArgs = {
      37: [-1, +0],
      38: [+0, -1],
      39: [+1, +0],
      40: [+0, +1]
    };

    var args = shiftByKeyCodeArgs[event.keyCode];
    shiftPlitkaBy(...args);
  });

  function shiftPlitkaBy(x = 0, y = 0) {
    let plitkaToMove = playbox.find(
      plitka => plitka.x === emptyPlitka.x + x && plitka.y === emptyPlitka.y + y
    );
    if (plitkaToMove !== undefined) {
      movePlitka(plitkaToMove);
    }
    console.log("shift");
  }

  function getRandomDirection() {
    var directionArgs = [[-1, +0], [+0, -1], [+1, +0], [+0, +1]];

    var randomArgIndex = Math.floor(Math.random() * directionArgs.length);
    return directionArgs[randomArgIndex];
  }

  function mix() {
    var mewanieCount = 100;
    new Array(mewanieCount)
      .fill(0)
      .map(getRandomDirection)
      .forEach(args => shiftPlitkaBy(...args));
    console.log("mix");
  }

  mix();
  
  // playbox.every( function match(plitka, index){
  //  if (plitka.text  === index && playbox[playbox.length - 1]=== '') {
  //    document.querySelector(".showtext").classList.add('win')
  //  }
  // });
  
  // playbox.toString() == arr.toString()? document.querySelector(".showtext").classList.add('win'): console.log('go');
          
                
}
//просто украл секундомер :)
var base = 60;
var clocktimer, dateObj, dh, dm, ds, ms;
var readout = "";
var h = 1,
    m = 1,
    tm = 1,
    s = 0,
    ts = 0,
    ms = 0,
    init = 0;
//функция для очистки поля
function ClearСlock() {
  clearTimeout(clocktimer);
  h = 1;
  m = 1;
  tm = 1;
  s = 0;
  ts = 0;
  ms = 0;
  init = 0;
  readout = "00:00:00.00";
  document.MyForm.stopwatch.value = readout;
}
//функция для старта секундомера
function StartTIME() {
  var cdateObj = new Date();
  var t = cdateObj.getTime() - dateObj.getTime() - s * 1000;
  if (t > 999) {
    s++;
  }
  if (s >= m * base) {
    ts = 0;
    m++;
  } else {
    ts = parseInt(ms / 100 + s);
    if (ts >= base) {
      ts = ts - (m - 1) * base;
    }
  }
  if (m > h * base) {
    tm = 1;
    h++;
  } else {
    tm = parseInt(ms / 100 + m);
    if (tm >= base) {
      tm = tm - (h - 1) * base;
    }
  }
  ms = Math.round(t / 10);
  if (ms > 99) {
    ms = 0;
  }
  if (ms == 0) {
    ms = "00";
  }
  if (ms > 0 && ms <= 9) {
    ms = "0" + ms;
  }
  if (ts > 0) {
    ds = ts;
    if (ts < 10) {
      ds = "0" + ts;
    }
  } else {
    ds = "00";
  }
  dm = tm - 1;
  if (dm > 0) {
    if (dm < 10) {
      dm = "0" + dm;
    }
  } else {
    dm = "00";
  }
  dh = h - 1;
  if (dh > 0) {
    if (dh < 10) {
      dh = "0" + dh;
    }
  } else {
    dh = "00";
  }
  readout = dh + ":" + dm + ":" + ds + "." + ms;
  document.MyForm.stopwatch.value = readout;
  clocktimer = setTimeout("StartTIME()", 1);
}
//Функция запуска и остановки
function StartStop() {
  if (init == 0) {
    ClearСlock();
    dateObj = new Date();
    StartTIME();
    init = 1;
  } else {
    clearTimeout(clocktimer);
    init = 0;
  }
}

document.querySelector(".but").addEventListener("click", function(event) {
  document.querySelector("#box").classList.remove("bg");
  StartStop();
  newGame();

  document.querySelector(".number").textContent = "000";
});
