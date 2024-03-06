document.addEventListener('alpine:init', () => {
    Alpine.data('products', () => ({
        items: [
            {id: 1, name:'Americano', img:'1.jpg', price:10000 },
            {id: 2, name:'Cafe Late', img:'2.jpg', price:18000 },
            {id: 3, name:'Premium Coklat', img:'3.jpg', price:10000 },
            {id: 4, name:'Macchiato Coffe', img:'4.jpg', price:18000 },
            {id: 5, name:'Expresso', img:'5.jpg', price:15000 },
            {id: 6, name:'Ice Tea', img:'6.jpg', price:10000 },
        ],
    }));

    Alpine.store('cart',  {
        items:[],
        total: 0,
        quantity: 0,
        add(newItem){
            //cek item
            const cartItem = this.items.find((item)=> item.id === newItem.id);

            //jika belum ada
            if(!cartItem) {
                this.items.push({...newItem, quantity: 1, total: newItem.price });
                this.quantity ++;
                this.total += newItem.price;
            } else {
                //cek barang beda atau sama 
                this.items = this.items.map((item) => {
                //jika barang berbeda
                if (item.id !== newItem.id){
                    return item;
                }else{
                    //jika barang sudah ada 
                item.quantity++;
                item.total = item.price * item.quantity;
                this.quantity ++;
                this.total += item.price;
                return item;
                }
                });
            }
        },
        remove(id){
            // ambil item 
            const cartItem = this.items.find((item) => item.id === id);

            //jika item lebih dari 1
            if(cartItem.quantity > 1) {
                // telusuri 1 1
                this.items = this.items.map((item) => {
                //
                if(item.id != id) {
                    return item;
                } else{
                    item.quantity --;
                    item.total = item.price * item.quantity;
                    this.quantity--;
                    this.total -= item.price;
                    return item;
                }
                });
            } else if (cartItem.quantity === 1){
                //barang sisa 1
                this.items = this.items.filter((item) => item.id != id);
                this.quantity--;
                this.total -= cartItem.price;
            }
        },
    });
});

//Validation
const checkoutButton = document.querySelector('.checkout-button')
checkoutButton.disable = true ;


const form = document.querySelector('#checkoutForm');

form.addEventListener('keyup', function() {
    for (let i = 0; i < form.elements.length; i++){
        if (form.elements[i].value.length !== 0) {
            checkoutButton.classList.remove('disabled');
            checkoutButton.classList.add('disabled');
        } else {
            return false;
        }
    }
    checkoutButton.disabled = false;
    checkoutButton.classList.remove('disabled');
});

// ketika tombol di klik
checkoutButton.addEventListener('click', function (e) {
    e.preventDefault();
    const formData = new FormData(form);
    const data = new URLSearchParams(formData);
    const objData = Object.fromEntries(data);
    const message = formatMessage(objData);
    window.open('http://wa.me/6287871310326?text=' + encodeURIComponent(message));
});

// pesan
    const formatMessage = (obj) => {
        return `Data Customer
        Nama: ${obj.name}
        Email: ${obj.email}
        No Hp: ${obj.phone}
    Data Pesanan
     ${JSON.parse(obj.items).map((item) => `${item.name} (${item.quantity} x ${rupiah(item.total)})`)}
     TOTAL: ${rupiah(obj.total)}
     Terima Kasih.`;
    };

// konveksi Rupiah 
const rupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
        style : 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(number);
};