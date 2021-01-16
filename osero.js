function readUserInput(question) {
  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve, reject) => {
    readline.question(question, (answer) => {
      resolve(answer);
      readline.close();
    });
  });
}
// メイン処理
(async function main() {
  class player {
    constructor(name) {
      this.name = name;
    }
    getName() {
      return this.name;
    }
  }

  class osero {
    constructor(stage) {
      this.stage = stage;
    }
    getStage() {
      return this.stage;
    }
    outPut() {
      console.log("  8   7   6   5   4   3   2   1   c/r")
      for (var i = 0; i < this.stage.length; i++) {
        process.stdout.write(`| `)
        for (var j = this.stage[i].length - 1; j >= 0; j--) {
          process.stdout.write(`${this.stage[i][j]} | `)
        }
        process.stdout.write(` ${i + 1}\n`);
      }
    }
    judge(row, column) {
      console.log(`[${row}][${column}]`);

      var turnColor = (turn % 2 == 0) ? "○" : "●";
      if (this.stage[row][column] == turnColor) { //同じ色
        return false;
      }
      if (this.stage[row][column] == " ") {
        return -1;
      }
      return true;

    }
    cJ(count, bre, emp) {
      if (bre != 0 && emp != -1 && count != 0) {
        console.log("全部ok")
        console.log("||||||||||||||||||")
        console.log("------------------")
        return false;
      } else {
        console.log((count != 0) ? "countはyes" : count);
        console.log((bre != 0) ? "breはyes" : bre);
        console.log((emp != 1) ? "empはyes" : emp);
        console.log("-----------------")
        return true;
      }
    }
    checkPosition(row, column) {
      let count = 0;
      let bre = 0;
      let emp = 0;
      //上シリーズ
      for (var i = row - 1; i >= 0; i--) { //上
        if (this.judge(i, column) == false) {
          bre = -1;
          break;
        } else if (this.judge(i, column) == -1) {
          emp = -1;
          break;
        } else {
          count++;
        }
      }
      if (bre != 0 && emp != -1 && count != 0) {
        console.log("上は" + count);
        for (var i = count; i >= 0; i--) {
          var pieceColor = (turn % 2 == 0) ? "○" : "●"
          this.stage[row][column] = pieceColor;
          row--;
        }
      }
      this.cJ(count, bre, emp);

      count = 0;
      bre = 0;
      emp = 0;
      for (var i = row - 1, j = column - 1; i >= 0 && j >= 0; i--, j--) { //右上
        if (this.judge(i, j) == false) {
          bre = -1;
          break;
        } else if (this.judge(i, j) == -1) {
          emp = -1;
          break;
        } else {
          count++;
        }
      }
      if (bre != 0 && emp != -1 && count != 0) {
        console.log("右上は" + count);
        for (var i = count; i >= 0; i--) {
          var pieceColor = (turn % 2 == 0) ? "○" : "●"
          this.stage[row][column] = pieceColor;
          row--;
          column--;
        }
      }
      this.cJ(count, bre, emp);

      count = 0;
      bre = 0;
      emp = 0;
      for (var i = row - 1, j = column + 1; i >= 0 && j >= 0; i--, j++) { //左上
        if (this.judge(i, j) == false) {
          bre = -1;
          break;
        } else if (this.judge(i, j) == -1) {
          emp = -1;
          break;
        } else {
          count++;
        }
      }
      if (bre != 0 && emp != -1 && count != 0) {
        console.log("左上は" + count);
        for (var i = count; i >= 0; i--) {
          var pieceColor = (turn % 2 == 0) ? "○" : "●"
          this.stage[row][column] = pieceColor;

          row--;
          column++;
        }
      }
      this.cJ(count, bre, emp);

      //横シリーズ
      count = 0;
      bre = 0;
      emp = 0;
      for (var j = column - 1; j >= 0; j--) { //右
        if (this.judge(row, j) == false) {
          bre = -1;
          break;
        } else if (this.judge(row, j) == -1) {
          emp = -1;
          break;
        } else {
          count++;
        }
      }
      if (bre != 0 && emp != -1 && count != 0) {
        console.log("右は" + count);
        for (var i = count; i >= 0; i--) {
          var pieceColor = (turn % 2 == 0) ? "○" : "●"
          this.stage[row][column] = pieceColor;
          column--;
        }
      }
      this.cJ(count, bre, emp);

      count = 0;
      bre = 0;
      emp = 0;
      for (var j = column + 1; j <= 7; j++) { //左
        if (this.judge(row, j) == false) {
          bre = -1;
          break;
        } else if (this.judge(row, j) == -1) {
          emp = -1;
          break;
        } else {
          count++;
        }
      }
      if (bre != 0 && emp != -1 && count != 0) {
        console.log("左は" + count);
        for (var i = count; i >= 0; i--) {
          var pieceColor = (turn % 2 == 0) ? "○" : "●"
          this.stage[row][column] = pieceColor;
          column++;
        }
      }
      this.cJ(count, bre, emp);

      //下シリーズ
      count = 0;
      bre = 0;
      emp = 0;
      for (var i = row + 1; i <= 7; i++) { //下
        if (this.judge(i, column) == false) {
          bre = -1;
          break;
        } else if (this.judge(i, column) == -1) {
          emp = -1;
          break;
        } else {
          count++;
        }
      }
      if (bre != 0 && emp != -1 && count != 0) {
        console.log("下は" + count);
        for (var i = count; i >= 0; i--) {
          var pieceColor = (turn % 2 == 0) ? "○" : "●"
          this.stage[row][column] = pieceColor;
          row++;
        }
      }
      this.cJ(count, bre, emp);

      count = 0;
      bre = 0;
      emp = 0;
      for (var i = row + 1, j = column - 1; i <= 7 && j >= 0; i++, j--) { //右下
        if (this.judge(i, j) == false) {
          bre = -1;
          break;
        } else if (this.judge(i, j) == -1) {
          emp = -1;
          break;
        } else {
          count++;
        }
      }
      if (bre != 0 && emp != -1 && count != 0) {
        console.log("右下は" + count);
        for (var i = count; i >= 0; i--) {
          var pieceColor = (turn % 2 == 0) ? "○" : "●"
          this.stage[row][column] = pieceColor;
          row++;
          column--;
        }
      }
      this.cJ(count, bre, emp);

      count = 0;
      bre = 0;
      emp = 0;
      for (var i = row + 1, j = column + 1; i <= 7 && j <= 7; i++, j++) { //左下
        if (this.judge(i, j) == false) {
          bre = -1;
          break;
        } else if (this.judge(i, j) == -1) {
          emp = -1;
          break;
        } else {
          count++;
        }
      }
      if (bre != 0 && emp != -1 && count != 0) {
        console.log("左下は" + count);
        for (var i = count; i >= 0; i--) {
          var pieceColor = (turn % 2 == 0) ? "○" : "●"
          this.stage[row][column] = pieceColor;
          row++;
          column++;
        }
      }
      this.cJ(count, bre, emp);

      if (this.stage[row][column] == " ") {
        return true;
      }
      return false;
    }
    async changePiece() {
      while (true) {
        this.outPut();
        var remainder = turn % 2;
        console.log((remainder == 0) ? `\n${blackPlayer.getName()}の番です。駒...○` : `\n${whitePlayer.getName()}の番です。駒...●`); //○...黒 ●...白
        var piece = parseInt(await readUserInput("どこに駒をおきますか？"));
        var row = Math.floor(piece % 10) - 1;
        var column = Math.floor(piece / 10) - 1;
        if (row < 0 || row > 7 || column < 0 || column > 7) {
          console.log("そこには置けません。");
          continue;
        }
        if (this.stage[row][column] == "○" || this.stage[row][column] == "●") {
          console.log("そこにはすでに駒が置かれています。");
          continue;
        }
        if (this.checkPosition(row, column) == false) {
          break;
        }
      }
    }
  }

  var stage = new osero([
    [
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
    ],
    [
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
    ],
    [
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
    ],
    [
      " ",
      " ",
      " ",
      "○",
      "●",
      " ",
      " ",
      " ",
    ],
    [
      " ",
      " ",
      " ",
      "●",
      "○",
      " ",
      " ",
      " ",
    ],
    [
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
    ],
    [
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
    ],
    [
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
    ]
  ]);

  const blackPlayer = new player(await readUserInput("1人目のPlayerの名前を入力してください。")); //黒のPlayer
  const whitePlayer = new player(await readUserInput("2人目のPlayerの名前を入力してください。")); //白のPlayer
  turn = 0;
  while (turn < 60) {
    await stage.changePiece();
    turn++;
  }
})()