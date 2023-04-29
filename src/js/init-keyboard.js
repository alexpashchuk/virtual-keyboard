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

export { initKeyboardRoot }
