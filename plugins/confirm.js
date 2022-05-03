$.confirm = function(options) {
    return new Promise((resolve, reject) => {
        const modal = $.modal({
            title: options.title,
            width: '400px',
            closable: false,
            content: options.content,
            onClose() {
                modal.destroy()
            },
            footerButtons: [
                {text: 'otmena', type: 'secondary', handler() {
                    priceModal.close()
                    reject()
                }},
                {text: 'Jnjel', type: 'danger', handler() {
                    priceModal.close()
                    resolve()
                }}
            ]
        })

        setTimeout(() => modal.open(), 100)
    })
}