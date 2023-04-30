import { keyCode } from './dataKeys'

const initKeyboardRoot = () => {
    document.body.insertAdjacentHTML(
        'afterbegin',
        `<main class="wrapper">
      <div class="header">
      <h1 class="title">Virtual Keyboard</h1>
      <div class="info">
        <p>Keyboard created in Ubuntu operating system</p>
        <p>You can change the language using [LEFT CTRL] + [LEFT ALT]</p>
        </div>
      </div>
      <textarea rows="10" cols="50" class="textarea"></textarea>
        <div class="keyboard">
        </div>
    </main>`
    )
}

const createButtons = (arr) => {
    const keysRoot = document.querySelector('.keyboard')
    keysRoot.innerHTML = ''
    arr.forEach((rowKey, i) => {
        const row = document.createElement('div')
        row.className = 'keyboard-row'
        rowKey.forEach((key, j) => {
            row.insertAdjacentHTML(
                'beforeend',
                `<div class="key ${keyCode[i][j]}" data-code="${keyCode[i][j]}" id="${keyCode[i][j]}">${key}</div>`
            )
        })
        keysRoot.append(row)
    })
    document.querySelector('.CapsLock').insertAdjacentHTML('beforeend', `<div class="indicator"></div>`)
}

export { initKeyboardRoot, createButtons }
