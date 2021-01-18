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
    whetherBlank() {
      if (this.stage.indexOf(" ") != -1) {
        return true;
      }
      return false;
    }
    whetherPass() {
      var memo = new Array();
      loop: for (var i = 0; i < this.stage.length; i++) {
        for (var j = 0; j < this.stage[i].length; j++) {
          var num = this.stage[i][j].indexOf(" ");
          if (num != -1) {
            var index = i * 10 + j;
            memo.push(index);
          }
        }
      }
      for (var i = 0; i < memo.length; i++) {
        var r = Math.floor(memo[i] / 10);
        var c = Math.floor(memo[i] % 10);
        var sarch = this.sarch(r, c);
        if (sarch == true) {
          return true;
        }
      }
      return false;
    }
    sarch(row, column) {
      if (this.sarchTopVertical(row, column)[1] == true || this.sarchTopRight(row, column)[1] == true || this.sarchTopLeft(row, column)[1] == true || this.sarchHorizontalRight(row, column)[1] == true || this.sarchHorizontalLeft(row, column)[1] == true || this.sarchBottomVertical(row, column)[1] == true || this.sarchBottomRight(row, column)[1] == true || this.sarchBottomLeft(row, column)[1] == true) {
        return true;
      }
      else {
        return false;
      }
    }
    outCome() {
      var black = 0;
      var white = 0;
      for (var i = 0; i < this.stage.length; i++) {
        for (var j = 0; j < this.stage[i].length; j++) {
          if (this.stage[i][j] == "●") {
            black++;
          }
          if (this.stage[i][j] == "○") {
            white++;
          }
        }
      }
      return (black > white) ? true : false;
    }
    judge(row, column) {
      var turnColor = (turn % 2 == 0) ? "○" : "●";
      if (this.stage[row][column] == turnColor) { //同じ色
        return false;
      }
      if (this.stage[row][column] == " ") {
        return -1;
      }
      return true;

    }
    sarchTopVertical(row, column) {
      var count = 0;
      var bre = 0;
      var emp = 0;
      var memo = new Array();
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
      memo[0] = count;
      if (memo[0] != 0 && bre != 0 && emp != -1) {
        memo[1] = true;
      }
      return memo;
    }
    sarchTopRight(row, column) {
      var count = 0;
      var bre = 0;
      var emp = 0;
      var memo = new Array();
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
      memo[0] = count;
      if (memo[0] != 0 && bre != 0 && emp != -1) {
        memo[1] = true;
      }
      return memo;
    }
    sarchTopLeft(row, column) {

      var count = 0;
      var bre = 0;
      var emp = 0;
      var memo = new Array();
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
      memo[0] = count;
      if (memo[0] != 0 && bre != 0 && emp != -1) {
        memo[1] = true;
      }
      return memo;
    }
    sarchHorizontalRight(row, column) {
      var count = 0;
      var bre = 0;
      var emp = 0;
      var memo = new Array();
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
      memo[0] = count;
      if (memo[0] != 0 && bre != 0 && emp != -1) {
        memo[1] = true;
      }
      return memo;
    }
    sarchHorizontalLeft(row, column) {
      var count = 0;
      var bre = 0;
      var emp = 0;
      var memo = new Array();
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
      memo[0] = count;
      if (memo[0] != 0 && bre != 0 && emp != -1) {
        memo[1] = true;
      }
      return memo;
    }
    sarchBottomVertical(row, column) {
      var count = 0;
      var bre = 0;
      var emp = 0;
      var memo = new Array();
      for (var i = row + 1; i <= 7; i++) {
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
      memo[0] = count;
      if (memo[0] != 0 && bre != 0 && emp != -1) {
        memo[1] = true;
      }
      return memo;
    }
    sarchBottomRight(row, column) {
      var count = 0;
      var bre = 0;
      var emp = 0;
      var memo = new Array();
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
      memo[0] = count;
      if (memo[0] != 0 && bre != 0 && emp != -1) {
        memo[1] = true;
      }
      return memo;
    }
    sarchBottomLeft(row, column) {
      var count = 0;
      var bre = 0;
      var emp = 0;
      var memo = new Array();
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
      memo[0] = count;
      if (memo[0] != 0 && bre != 0 && emp != -1) {
        memo[1] = true;
      }
      return memo;
    }
    setPiece(row, column) {

      var memo = this.sarchTopVertical(row, column);
      if (memo[1] == true) {
        for (var i = memo[0], r = row; i >= 0; i--) {
          var pieceColor = (turn % 2 == 0) ? "○" : "●"
          this.stage[r--][column] = pieceColor;
        }
      }

      var memo = this.sarchTopRight(row, column);
      if (memo[1] == true) {
        for (var i = memo[0], r = row, c = column; i >= 0; i--) {
          var pieceColor = (turn % 2 == 0) ? "○" : "●"
          this.stage[r--][c--] = pieceColor;
        }
      }

      var memo = this.sarchTopLeft(row, column);
      if (memo[1] == true) {
        for (var i = memo[0], r = row, c = column; i >= 0; i--) {
          var pieceColor = (turn % 2 == 0) ? "○" : "●"
          this.stage[r--][c++] = pieceColor;
        }
      }

      var memo = this.sarchHorizontalRight(row, column);
      if (memo[1] == true) {
        for (var i = memo[0], c = column; i >= 0; i--) {
          var pieceColor = (turn % 2 == 0) ? "○" : "●"
          this.stage[row][c--] = pieceColor;
        }
      }

      var memo = this.sarchHorizontalLeft(row, column);
      if (memo[1] == true) {
        for (var i = memo[0], c = column; i >= 0; i--) {
          var pieceColor = (turn % 2 == 0) ? "○" : "●"
          this.stage[row][c++] = pieceColor;
        }
      }

      var memo = this.sarchBottomVertical(row, column);
      if (memo[1] == true) {
        for (var i = memo[0], r = row; i >= 0; i--) {
          var pieceColor = (turn % 2 == 0) ? "○" : "●"
          this.stage[r++][column] = pieceColor;
        }
      }

      var memo = this.sarchBottomRight(row, column);
      if (memo[1] == true) {
        for (var i = memo[0], r = row, c = column; i >= 0; i--) {
          var pieceColor = (turn % 2 == 0) ? "○" : "●"
          this.stage[r++][c--] = pieceColor;
        }
      }

      var memo = this.sarchBottomLeft(row, column);
      if (memo[1] == true) {
        for (var i = memo[0], r = row, c = column; i >= 0; i--) {
          var pieceColor = (turn % 2 == 0) ? "○" : "●"
          this.stage[r++][c++] = pieceColor;
        }
      }

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
        if (this.whetherPass() == false) {
          console.log("おけるところがないみたい...");
          break;
        }
        let piece = parseInt(await readUserInput("どこに駒をおきますか？"));
        let row = Math.floor(piece % 10) - 1;
        let column = Math.floor(piece / 10) - 1;
        if (isNaN(piece)) {
          continue;
        }
        if (row < 0 || row > 7 || column < 0 || column > 7) {
          console.log("そこには置けません。");
          continue;
        }
        if (this.stage[row][column] == "○" || this.stage[row][column] == "●") {
          console.log("そこにはすでに駒が置かれています。");
          continue;
        }
        if (this.setPiece(row, column) == false) {
          break;
        }
      }
    }
  }
  const stage = new osero([
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



  const blackPlayer = new player(await readUserInput("1人目のPlayerの名前を入力してください。"));
  const whitePlayer = new player(await readUserInput("2人目のPlayerの名前を入力してください。"));
  let turn = 0;
  while (stage.whetherBlank() != true) {
    await stage.changePiece();
    turn++;
  }

  console.log("終了！")
  console.log((stage.outCome() == true) ? `${blackPlayer.getName()}の勝ちです！` : `${whitePlayer.getName()}の勝ちです！`);
  console.log("また遊んでね！");
})()