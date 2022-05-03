Element.prototype.appendAfter = function(element) { // stexcum enq function-ov vor karoxananq hesht texavorel modal-body__ic heto
    element.parentNode.insertBefore(this, element.nextSibling);
}

function noop() {} // function vor@ vochinch chi anum
function _createModalFooter(buttons = []) { // function -ov stexcum enq footeri elementner@ dinamik kerpov
    if(buttons.length === 0) { // stugum enq massivi mej ban ka te che
        return document.createElement('div')
    }

    const wrap = document.createElement('div')
    wrap.classList.add('modal-footer') // div-in class enq avelacnum modal-footer

    buttons.forEach(btn => { // ciklov pttvum enq buttons zangvaci vrayov 
        const $btn = document.createElement('button') // stexcum enq button
        $btn.textContent = btn.text // stexcac buttoni vra grumenq mer text@, nayel footerbuttons i mej
        $btn.classList.add('btn') // avelacnum enq class btn
        $btn.classList.add(`btn-${btn.type || 'secondary'}`) // ete type voroshvac chi uremn vercnel secondary(esi bootstrapic a)
        $btn.onclick = btn.handler || noop // individualni abrabotchik sobitiya, ete menq chenq talis uremn tox vercni noop vor@ vochinch chi anum

        wrap.appendChild($btn) // verevi divi mej avelacnum enq amen knopken(nayi verev@ wrap :))
    })

    return wrap
}


function _createModal(options) {
    const DEFAULT_WIDTH = '600px'
    const modal = document.createElement('div')
    modal.classList.add('vmodal')
    modal.insertAdjacentHTML('afterbegin', `
    <div class="modal-overlay" data-close="true">
        <div class="modal-window" style="width: ${options.width || DEFAULT_WIDTH}">
            <div class="modal-header">
                <span class="modal-title">${options.title || Patuhan}</span>
                ${options.closable ? `<span class="modal-close" data-close="true">&times;</span>` : ''}
            </div>
            <div class="modal-body" data-content>
                ${options.content || ''}
            </div>
        </div>
    </div>
    `)

    const footer = _createModalFooter(options.footerButtons)
    footer.appendAfter(modal.querySelector('[data-content]'))
    document.body.appendChild(modal)
    return modal
}


$.modal = function(options) {
    const ANIMATION_SPEED = 200
    const $modal = _createModal(options)
    let closing = false; // vor chkaroxananq bacvac modali jamanak urish modal bacel
    const destroyed = false

    const modal = {
        open() {
            if(destroyed) {
                return console.log('jnjaca')
            }
            !closing && $modal.classList.add('open')
        },
        close() {
            close = true;
            $modal.classList.remove('open')
            $modal.classList.add('hide')
            setTimeout(() => {
                $modal.classList.remove('hide')
                closing = false
                if(typeof options.onClose === 'function') {
                    options.onClose()
                }
            }, ANIMATION_SPEED)
        }
    }

    const listener = event => { // sarqum enq arandzin function patuhan@ pakelu hamar vor karoxananq ogtagorcel heto jnjel ayd function@ 
        if(event.target.dataset.close) {
            modal.close()
        }
    }

    $modal.addEventListener('click', listener) // ogtagorcum enq jnjox knopkeqi hamar mer sarqac listener function@

    return Object.assign(modal, { // modal objecti mej avelacnum enq destroy metod@ vor@ petq a jnji DOMic mer modal@ 
        destroy() {
            $modal.parentNode.removeChild($modal) // jnji $modali cnoxi erexun u talis enq henc $modal 
            $modal.removeEventListener('click', listener)
            destroyed = true
        },
        setContent(html) { // sra shnorhiv menq karoxanum enq poxel modal-contenti parunakutyun@
            $modal.querySelector('[data-content]').innerHTML = html
        }
    })
}
