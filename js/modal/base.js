$ = {}

_defaultOptions = {
    title:"DEFAULT TITLE",
    body:"",
    closable: true,
    width: '800px',
    submit : function () {
        console.log('submit')
    },
    beforeOpen: () => {},
    onOpen: () => {},
    onDestroy: () => {},
    beforeDestroy: () => {},
    beforeClose: () => {},
    onClose: () => {}
}

 function _addMissedOptionsDefaultValues(options) {
    Object.keys(_defaultOptions).forEach((key)=>{
        if (!options[key]) {
            options[key] = _defaultOptions[key];
        }
    })
    return options;
}

 function _createModal(options) {
    var modal = document.createElement('div');
    modal.classList.add('modal')
    modal.appendChild(_createModalOverlay(options))
    document.body.appendChild(modal)
    return modal;
}

function _createModalOverlay(options) {
    var modalOverlay = document.createElement('div');
    modalOverlay.appendChild(_createModalWindow(options))
    modalOverlay.classList.add('modal-overlay')
    return modalOverlay;
}

function _createModalWindow(options) {
    var modalWindow = document.createElement('div');
    modalWindow.appendChild(_createModalHeader(options))
    modalWindow.appendChild(_createModalBody(options))
    modalWindow.appendChild(_createModalFooter(options))
    modalWindow.classList.add('modal-window')
    modalWindow.style.width = options.width;
    return modalWindow;
}

function _createModalHeader(options) {
    var modalHeader = document.createElement('div');
    modalHeader.appendChild(_createTitle(options));
    if (options.closable) {
        modalHeader.appendChild(_createClosingSpan(options));
    }
    modalHeader.classList.add('modal-header')
    return modalHeader;
}

function _createTitle(options) {
    var title = document.createElement('span');
    title.classList.add('modal-title')
    title.insertAdjacentHTML('afterbegin', options.title);
    return title;
}
 function _createClosingSpan(options) {
    // `<span class="modal-close">&times;</span>`
    var element = document.createElement('span');
    element.addEventListener('click', ()=> options.close(), false)
    element.classList.add('modal-close')
    element.insertAdjacentHTML('afterbegin', '&times;');
    return element;
}

function _createModalBody(options) {
    var modalBody = document.createElement('div');
    modalBody.classList.add('modal-body')
    modalBody.insertAdjacentHTML('afterbegin', options.body)
    modalBody.classList.add('modal-body')
    return modalBody;
}

function _createModalFooter(options) {
    var modalFooter = document.createElement('div');
    modalFooter.classList.add('modal-footer')
    modalFooter.appendChild(_createSubmitButton(options))
    if (options.closable) {
        modalFooter.appendChild(_createClosingButton(options))
    }
    return modalFooter;
}

function _createClosingButton(options) {
    var closingButton = document.createElement('button');
    closingButton.classList.add('button-close');
    closingButton.addEventListener('click', ()=>options.close(), true);
    closingButton.insertAdjacentHTML('afterbegin', 'close')
    return closingButton;
}

function _createSubmitButton(options) {
    var submitButton = document.createElement('button');
    submitButton.classList.add('button-submit');
    submitButton.addEventListener('click', ()=>options.submit(), true);
    submitButton.insertAdjacentHTML('afterbegin', 'submit')
    return submitButton;
}

//добавить onClose();
//добавить onOpen();
//beforeClose();
$.modal = function (options) {
    var modal;
    let destroyed = false;
    _addMissedOptionsDefaultValues(options);
    modalOperations = {
        open() {
            if (!destroyed) {
                options.beforeOpen();
                modal.classList.remove('close')
                modal.classList.add('open')
                options.onOpen();
            }
        },
        close() {
            if (!destroyed) {
                options.beforeClose();
                modal.classList.add('close')
                modal.classList.remove('open')
                options.onClose();
            }
        },
        destroy() {
            if (!destroyed) {
                options.beforeDestroy()
                this.close();
                setTimeout(() => {
                    document.body.removeChild(modal)
                    destroyed = true
                    options.onDestroy()
                }, 1000)
            }
        }
    }
    options.close = modalOperations.close.bind(this);
    modal = _createModal(options);
    return modalOperations;
}