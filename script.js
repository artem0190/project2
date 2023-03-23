const product = {
    plainBurger: {
        name: 'Гамбургер простой',
        price: 15000,
        kcall: 300,
        amount: 0,
        Summ: function () {
            return this.price * this.amount
        },
        Kcall: function () {
            return this.kcall * this.amount
        }
    },


    freshBurger: {
        name: 'Гамбургер FRESH',
        price: 22000,
        kcall: 600,
        amount: 0,
        Summ: function () {
            return this.price * this.amount
        },
        Kcall: function () {
            return this.kcall * this.amount
        }
    },
    freshCombo: {
        name: 'FRESH COMBO',
        price: 32000,
        kcall: 900,
        amount: 0,
        Summ: function () {
            return this.price * this.amount
        },
        Kcall: function () {
            return this.kcall * this.amount
        }
    }
}

const extraProduct = {
    doubleMayonnaise: {
        name: 'Двойной майонез',
        price: 2000,
        kcall: 100
    },
    lettuce: {
        name: 'Салатный лист',
        price: 1000,
        kcall: 10
    },
    cheese: {
        name: 'Сыр',
        price: 3000,
        kcall: 100
    }
}


const btnPlusOrMinus = document.querySelectorAll('.main__product-btn '),
    checkExtraProduct = document.querySelectorAll('.main__product-checkbox'),
    addCart = document.querySelector('.addCart'),
    receipt = document.querySelector('.receipt '),
    receiptWindow = receipt.querySelector('.receipt__window'),
    receiptOut = receipt.querySelector('.receipt__window-out'),
    btnReceipt = receipt.querySelector('.receipt__window-btn')

for (let i = 0; i < btnPlusOrMinus.length; i++) {
    btnPlusOrMinus[i].addEventListener('click', function () {
        plusOrMinus(this)
    })
}

function plusOrMinus(element) {
    // closest() - метод объекта, Подключается к родительскому элементу
    const parent = element.closest('.main__product'),
        parentId = parent.getAttribute('id'),
        out = parent.querySelector('.main__product-num'),
        price = parent.querySelector('.main__product-price span'),
        kcall = parent.querySelector('.main__product-kcall span'),
        elementData = element.getAttribute('data-symbol')


    if (elementData == '+' && product[parentId].amount < 10) {
        product[parentId].amount++
    } else if (elementData == '-' && product[parentId].amount > 0) {
        product[parentId].amount--
    }

    out.innerHTML = product[parentId].amount
    price.innerHTML = product[parentId].Summ()
    kcall.innerHTML = product[parentId].Kcall()
}

for (let i = 0; i < checkExtraProduct.length; i++) {

    checkExtraProduct[i].addEventListener('click', function () {

        addExtraProduct(this)

    })
}

function addExtraProduct(element) {
    const parent = element.closest('.main__product'),
        parentId = parent.getAttribute('id'),
        kcall = parent.querySelector('.main__product-kcall span'),
        price = parent.querySelector('.main__product-price span');
    elAtr = element.getAttribute('data-extra')


    product[parentId][elAtr] = element.checked

    if (product[parentId][elAtr] == true) {
        product[parentId].kcall += extraProduct[elAtr].kcall
        product[parentId].price += extraProduct[elAtr].price
    } else {
        product[parentId].kcall -= extraProduct[elAtr].kcall
        product[parentId].price -= extraProduct[elAtr].price
    }

    kcall.innerHTML = product[parentId].Kcall()
    price.innerHTML = product[parentId].Summ()
}


let arrayProduct = [],
    totalName = '',
    totalPrice = 0,
    totalKcall = 0


addCart.addEventListener('click', function () {

    for (const key in product) {

        const po = product[key]

        if (po.amount > 0) {
            arrayProduct.push(po)
            for (const infoKey in po) {
                if (po[infoKey] === true) {
                    // '\n' - это экранирование. Означает перенос строки 

                    po.name += '\n' + extraProduct[infoKey].name


                }
            }
        }
        po.price = po.Summ()
        po.kcall = po.Kcall()
    }

    for (let i = 0; i < arrayProduct.length; i++) {

        const el = arrayProduct[i]

        totalPrice += el.price
        totalKcall += el.kcall

        totalName += '\n' + el.name + '\n'
    }

    receiptOut.innerHTML = `Вы купили: \n ${totalName} \n Каллорийность ${totalKcall} \n Стоимость покупки ${totalPrice} сумм`

    receipt.style = `
    display: flex;
    opacity: 1;
    `
    receiptWindow.style.top = '50px'

})

btnReceipt.addEventListener('click', function () {
    location.reload()
})