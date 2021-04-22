$ = {}

_text = function (text, defaultText = ""){
    return text ? text : defaultText;
}

_createModal = function (options) {
    var modal = document.createElement('div');
    modal.classList.add('modal')
    modal.insertAdjacentHTML('afterbegin', `
        <div class="modal-overlay">
            <div class="modal-window">
                <div class="modal-header">
                    <span class="modal-title">${_text(options.title)}</span>
                    <span class="modal-close">&times;</span>
                </div>
                <div class="modal-body">
                    ${_text(options.body)}
                </div>
                <div class="modal-footer">
                    <button class="button-submit">submit</button>
                    <button class="button-close">close</button>
                </div>
            </div>
        </div>
    `)
    document.body.appendChild(modal)
    return modal;
}

$.modal = function (options) {
    let modal = _createModal(options);
    let destroyed = false;
    return {
        open() {
            if(!destroyed) {
                console.log("opening")
                modal.classList.remove('close')
                modal.classList.add('open')
            }
        },
        close() {
            if (!destroyed) {
                console.log("closing")
                modal.classList.add('close')
                modal.classList.remove('open')
            }
        },
        destroy() {
            if(!destroyed) {
                this.close();
                setTimeout(() => {
                    document.body.removeChild(modal)
                    destroyed = true
                }, 1000)
            }
        }
    }
}