let fruits = [
    {id: 1, title: 'xndzor', price: 20, img: 'https://avatars.mds.yandex.net/get-zen_doc/1852523/pub_6058f07522736207675ce8ae_6058f0d9ca702b174addb111/scale_1200'},
    {id: 2, title: 'apelsini', price: 30, img: 'https://catherineasquithgallery.com/uploads/posts/2021-02/1613039441_172-p-oranzhevii-fon-apelsin-247.jpg'},
    {id: 3, title: 'mango', price: 40, img: 'https://veronikaa.ru/wp-content/uploads/2020/06/510010_main813.jpg'}
]

    // dinamikoren stexcum enq shablon sax kartochkeqi hamar vor html-um nuyn@ an@ndhat chgrenq
const toHTML = fruit => ` 
    <div class="col">
        <div class="card">
            <img class="card-img-top" src="${fruit.img}" alt="">
            <div class="card-body">
                <h5 class="card-title">${fruit.title}</h5>
                <a href="#" class="btn btn-primary" data-btn="price" data-id="${fruit.id}">nayel gin@</a>
                <a href="#" class="btn btn-danger" data-btn="remove" data-id="${fruit.id}">jnjel</a>
            </div>
        </div>
    </div>
`


function render() {
    const html = fruits.map(fruit => toHTML(fruit)).join('') // vekalum enq fruits zangvaci amen andam@ u dnum enq toHTML i mej vorn el dzevavorum a et andami structuran
    document.querySelector('#fruits').innerHTML = html
}

render()


const priceModal = $.modal({
    title: 'apranqi gin@',
    closable: true,
    width: '400px',
    footerButtons: [
        {text: 'lav', type: 'primary', handler() {
            priceModal.close()
        }}
    ]
})


document.addEventListener('click', event => {
    event.preventDefault()
    const btnType = event.target.dataset.btn
    const id = +event.target.dataset.id
    const fruit = fruits.find(f => f.id === id)

    if(btnType === 'price') {
        priceModal.setContent(`
        <p>gin@ ${fruit.title}: <strong>${fruit.price}$</strong></p>
        `)
        priceModal.open()
    } else if (btnType === 'remove') {
        $.confirm({
            title: 'hastat jnjem ? ',
            content: `<p>Duq jnjum eq: <strong>${fruit.title}</strong></p>`
        }).then(() => {
            fruits = fruits.filter(f => f.id !== id)
            render()
        }).catch(() => {
            console.log('Cancel')
        })
    }
})