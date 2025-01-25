document.addEventListener('DOMContentLoaded', () => {
    const startpage = document.querySelector(".start_page");
    const gamepage = document.querySelector(".game_page");
    const startbutton = document.querySelector(".start_button");
    const resetbutton = document.querySelector(".reset_button");

    startbutton.addEventListener('click', () => {
        startpage.style.display = "none";
        gamepage.classList.add("active");
        resetGmae();
    });

    resetbutton.addEventListener('click', () => {
        gamepage.classList.remove("active");
        startpage.style.display = "flex";
        resetGame();
    })
    let play = false;
    const cells = document.querySelectorAll(".cell");
    const winningpattens = [
        [0, 1, 2],
        [0, 3, 6],
        [0, 4, 8],
        [1, 4, 7],
        [2, 5, 8],
        [2, 4, 6],
        [3, 4, 5],
        [6, 7, 8]
    ];
    const resetGame = () => {
        play = false;
        cells.forEach(cell => {
            cell.textContent = "";
            cell.setAttribute("aria-disabled", "true");
        })
        const messages = gamepage.querySelectorAll("p");
        messages.forEach(message => message.remove());
    }
    for (let cell of cells) {
        cell.addEventListener('click', () => {
            if (play == false && cell.ariaDisabled == "true") {
                cell.innerHTML = "X"
                cell.ariaDisabled = "false";
                play = true;
            } else if (play == true && cell.ariaDisabled == "true") {
                cell.innerHTML = "O";
                cell.ariaDisabled = "false";
                play = false;
            }
            checkWinner();
            checkGame();
        })
    }
    const checkWinner = () => {
        for (let patterns of winningpattens) {
            let pos1val = cells[patterns[0]].innerHTML;
            let pos2val = cells[patterns[1]].innerHTML;
            let pos3val = cells[patterns[2]].innerHTML;
            if (pos1val != "" && pos2val != "" && pos3val != "") {
                if (pos1val == pos2val && pos2val == pos3val) {
                    let ele = document.createElement("p");
                    ele.innerHTML = "Player " + ((pos1val == "X") ? "1" : "2") + " Wins!";
                    ele.style.color = "black";
                    ele.style.fontFamily = "'Caveat', serif"
                    ele.style.fontSize = "150px";
                    gamepage.insertBefore(ele, gamepage.firstChild);
                }
            }
        }
    }
    const checkGame = () => {
        let gameover = true;
        for (let box of cells) {
            if (box.innerHTML == "") {
                gameover = false;
            }
        }
        if (gameover) {
            let ele = document.createElement("p");
            ele.innerHTML = "No Player Wins!";
            ele.style.color = "black";
            ele.style.fontFamily = "'Caveat', serif"
            ele.style.fontSize = "150px";
            gamepage.insertBefore(ele, gamepage.firstChild);
            setTimeout(() => {
                resetGame();
            }, 1000);
        }
    }
})