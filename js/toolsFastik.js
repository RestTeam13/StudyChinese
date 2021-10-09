function changingUsefulBlocks() {
    if (document.querySelector(".conversation-club") !== null) {
        let btns = document.querySelector(".conversation-club").querySelectorAll(".conversation-select__element")
        let usefulBlocks = document.querySelector(".conversation-club").querySelectorAll(".useful-block__row")
        btns.forEach((btn, btnI) => {
            btn.addEventListener("click", evt => {
                btns.forEach(currentBtn => {
                    currentBtn.classList.remove("active")
                })
                btn.classList.add("active")
                usefulBlocks.forEach((currentBlock, i) => {
                    if (i === btnI) {
                        usefulBlocks.forEach(usefulBlock => {
                            usefulBlock.classList.remove("active")
                        })
                        currentBlock.classList.add("active")
                    }
                })
            })
        })
    }
}
changingUsefulBlocks()


