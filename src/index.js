import { en, ru } from './js/dataKeys'
import { initKeyboardRoot, createButtons } from './js/initKeyboard'

window.addEventListener('DOMContentLoaded', () => {
    initKeyboardRoot()
    if (localStorage.getItem('lang') !== null) {
        if (localStorage.getItem('lang') === 'ru') {
            createButtons(ru)
        } else {
            createButtons(en)
        }
    } else {
        localStorage.setItem('lang', 'en')
        createButtons(en)
    }
})
