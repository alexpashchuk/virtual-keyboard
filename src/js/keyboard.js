import { en, enShift, ru, ruShift, special } from './dataKeys'
import { createButtons } from './initKeyboard'

let capsLock = false
let shift = false

const printValue = (code, event) => {
    const buttons = document.querySelectorAll('.key')
    const textArea = document.querySelector('.textarea')
    buttons.forEach((btn) => {
        if (btn.dataset.code === code) {
            event.preventDefault()
            textArea.focus()
            textArea.setRangeText(btn.innerHTML, textArea.selectionStart, textArea.selectionEnd, 'end')
        }
    })
}

const isSpecial = (code) => special.includes(code)

const handleTab = (event) => {
    event.preventDefault()
    const textArea = document.querySelector('.textarea')
    textArea.setRangeText('    ', textArea.selectionStart, textArea.selectionEnd, 'end')
}

const handleSpace = (event) => {
    event.preventDefault()
    const textArea = document.querySelector('.textarea')
    textArea.setRangeText(' ', textArea.selectionStart, textArea.selectionEnd, 'end')
}

const handleEnter = (event) => {
    event.preventDefault()
    const textArea = document.querySelector('.textarea')
    textArea.setRangeText('\n', textArea.selectionStart, textArea.selectionEnd, 'end')
}

const handleBackspace = (event) => {
    event.preventDefault(event)
    const textArea = document.querySelector('.textarea')
    if (textArea.selectionStart && textArea.selectionStart === textArea.selectionEnd) {
        textArea.setRangeText('', textArea.selectionStart - 1, textArea.selectionEnd)
    } else if (textArea.selectionStart !== textArea.selectionEnd) {
        textArea.setRangeText('', textArea.selectionStart, textArea.selectionEnd)
    }
}

const handleDelete = (event) => {
    event.preventDefault()
    const textArea = document.querySelector('.textarea')
    textArea.setRangeText('', textArea.selectionStart, textArea.selectionEnd + 1)
}

const handleCapsLock = () => {
    const buttons = document.querySelectorAll('.key')
    const capsBtn = document.querySelector('.CapsLock')
    capsBtn.classList.toggle('on')
    buttons.forEach((btn) => {
        const BTN = btn
        if (btn.innerHTML.length === 1) {
            if (!capsLock) {
                BTN.innerHTML = btn.innerHTML.toUpperCase()
            } else {
                BTN.innerHTML = btn.innerHTML.toLowerCase()
            }
        }
    })
    capsLock = !capsLock
}

const handleCapsLockShift = () => {
    const buttons = document.querySelectorAll('.key')
    const capsBtn = document.querySelector('.CapsLock')
    capsBtn.classList.toggle('on')
    buttons.forEach((btn) => {
        const BTN = btn
        if (btn.innerHTML.length === 1) {
            if (!capsLock && !shift) {
                BTN.innerHTML = btn.innerHTML.toLowerCase()
            } else if (!capsLock && shift) {
                BTN.innerHTML = btn.innerHTML.toUpperCase()
            }
        }
    })
    capsLock = !capsLock
}

const getActive = (code) => {
    const buttons = document.querySelectorAll('.key')
    buttons.forEach((btn) => {
        if (btn.dataset.code === code) {
            btn.classList.add('active')
        }
    })
}

const renderKeyboard = (arr) => {
    if (!shift) {
        createButtons(arr)
    } else {
        createButtons(localStorage.getItem('lang') === 'en' ? en : ru)
    }
    if (capsLock) {
        capsLock = !capsLock
        handleCapsLockShift()
    }
    shift = !shift
}

const changeLanguage = (event) => {
    if (event.repeat) {
        return
    }
    if (localStorage.getItem('lang') === 'ru') {
        createButtons(en)
        localStorage.setItem('lang', 'en')
    } else {
        createButtons(ru)
        localStorage.setItem('lang', 'ru')
    }
    if (capsLock) {
        capsLock = !capsLock
        handleCapsLock()
    }
    if (shift) {
        shift = !shift
        renderKeyboard(localStorage.getItem('lang') === 'en' ? enShift : ruShift)
    }
}

const initListeners = () => {
    document.addEventListener('keydown', (event) => {
        const textArea = document.querySelector('.textarea')
        const { code } = event
        if (code === 'Tab') {
            handleTab(event)
        } else if (code === 'CapsLock') {
            handleCapsLock()
        } else if (code === 'ShiftLeft' || code === 'ShiftRight') {
            renderKeyboard(localStorage.getItem('lang') === 'en' ? enShift : ruShift)
        } else if (code === 'AltLeft' || code === 'AltRight') {
            event.preventDefault()
        } else if (event.altKey && event.ctrlKey) {
            changeLanguage(event)
        } else if (code === 'ArrowLeft' || code === 'ArrowUp' || code === 'ArrowRight' || code === 'ArrowDown') {
            printValue(code, event)
        }
        if (isSpecial(code)) {
            textArea.focus()
        } else {
            printValue(code, event)
        }
        getActive(code)
    })

    document.addEventListener('keyup', (event) => {
        const { code } = event
        const buttons = document.querySelectorAll('.key')
        if (code === 'ShiftLeft' || code === 'ShiftRight') {
            renderKeyboard(localStorage.getItem('lang') === 'en' ? en : ru)
        }
        buttons.forEach((btn) => {
            if (btn.dataset.code === code) {
                btn.classList.remove('active')
            }
        })
    })

    document.addEventListener('mousedown', (event) => {
        const { code } = event.target.dataset
        const textArea = document.querySelector('.textarea')
        const buttons = document.querySelectorAll('.key')
        buttons.forEach((btn) => {
            if (btn.dataset.code === code) {
                btn.classList.add('active')
            }
        })
        if (code === 'Tab') {
            handleTab(event)
        } else if (code === 'MetaLeft') {
            changeLanguage(event)
        } else if (code === 'ShiftLeft' || code === 'ShiftRight') {
            renderKeyboard(localStorage.getItem('lang') === 'en' ? enShift : ruShift)
        } else if (code === 'Space') {
            handleSpace(event)
        } else if (code === 'Enter') {
            handleEnter(event)
        } else if (code === 'Backspace') {
            handleBackspace(event)
        } else if (code === 'Delete') {
            handleDelete(event)
        } else if (code === 'CapsLock') {
            handleCapsLock(event)
        } else if (code === 'ArrowLeft' || code === 'ArrowUp' || code === 'ArrowRight' || code === 'ArrowDown') {
            printValue(code, event)
        }
        if (isSpecial(code)) {
            textArea.focus()
        } else {
            printValue(code, event)
        }
        getActive(code)
    })

    document.addEventListener('mouseup', (event) => {
        const buttons = document.querySelectorAll('.key')
        const { code } = event.target.dataset
        if (code === 'ShiftLeft' || code === 'ShiftRight') {
            renderKeyboard(localStorage.getItem('lang') === 'en' ? en : ru)
        }
        buttons.forEach((btn) => {
            if (btn.dataset.code === code) {
                btn.classList.remove('active')
            }
        })
    })
}

export { initListeners }
