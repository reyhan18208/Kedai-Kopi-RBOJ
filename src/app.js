document.addEventListener('alpine:init', () => {
    Alpine.data('products', () => ({
        items: [
            {id: 1, name:'Americano', img:'1.img', price:10000 },
            {id: 2, name:'Cafe Late', img:'2.img', price:18000 },
            {id: 3, name:'Expresso', img:'3.img', price:10000 },
            {id: 4, name:'Macchiato Coffe', img:'4.img', price:18000 },
            {id: 5, name:'Premium Coklat', img:'5.img', price:15000 },
            {id: 6, name:'Ice Tea', img:'6.img', price:10000 },
        ],
    }));
});