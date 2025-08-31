class Bus {
    constructor(id, route, seats) {
        this.id = id;
        this.route = route;
        this.seats = seats;
        this.reservedSeats = 0;
        this.passengers = []; // Qo'shimcha: yo'lovchilar ro'yxati
    }

    getDetails() {
        return {
            id: this.id,
            route: this.route,
            totalSeats: this.seats,
            reservedSeats: this.reservedSeats,
            availableSeats: this.seats - this.reservedSeats,
            passengers: this.passengers
        };
    }

    reserveSeat(passengerName = "Anonim") {
        if (this.reservedSeats < this.seats) {
            this.reservedSeats++;
            this.passengers.push({
                name: passengerName,
                seatNumber: this.reservedSeats,
                reservationTime: new Date()
            });
            return { success: true, seatNumber: this.reservedSeats };
        }
        return { success: false, message: "Barcha o'rindon band" };
    }

    cancelReservation(seatNumber = null) {
        if (this.reservedSeats > 0) {
            if (seatNumber) {
                // Belgilangan o'rinni bo'shatish
                const index = this.passengers.findIndex(p => p.seatNumber === seatNumber);
                if (index !== -1) {
                    this.passengers.splice(index, 1);
                    this.reservedSeats--;
                    return { success: true, message: `${seatNumber}-o'rin bo'shatildi` };
                }
                return { success: false, message: "O'rin topilmadi" };
            } else {
                // Oxirgi o'rinni bo'shatish
                this.passengers.pop();
                this.reservedSeats--;
                return { success: true, message: "Oxirgi o'rin bo'shatildi" };
            }
        }
        return { success: false, message: "Band qilingan o'rin yo'q" };
    }

    getAvailableSeats() {
        return this.seats - this.reservedSeats;
    }
}

class BusSystem {
    constructor() {
        this.buses = [];
        this.nextBusId = 1;
    }

    addBus(route, seats) {
        const bus = new Bus(this.nextBusId++, route, seats);
        this.buses.push(bus);
        return bus;
    }

    listBuses() {
        return this.buses.map(bus => bus.getDetails());
    }

    searchByRoute(route) {
        return this.buses
            .filter(bus => bus.route.toLowerCase().includes(route.toLowerCase()))
            .map(bus => bus.getDetails());
    }

    findBusById(busId) {
        return this.buses.find(bus => bus.id === busId);
    }

    reserveSeat(busId, passengerName = "Anonim") {
        const bus = this.findBusById(busId);
        if (bus) {
            return bus.reserveSeat(passengerName);
        }
        return { success: false, message: "Avtobus topilmadi" };
    }

    cancelReservation(busId, seatNumber = null) {
        const bus = this.findBusById(busId);
        if (bus) {
            return bus.cancelReservation(seatNumber);
        }
        return { success: false, message: "Avtobus topilmadi" };
    }

    getBusStatus(busId) {
        const bus = this.findBusById(busId);
        if (bus) {
            return bus.getDetails();
        }
        return null;
    }

    // Qo'shimcha: barcha avtobuslarning holatini ko'rsatish
    getAllBusesStatus() {
        return this.buses.map(bus => ({
            id: bus.id,
            route: bus.route,
            availableSeats: bus.getAvailableSeats(),
            totalSeats: bus.seats
        }));
    }
}

// Tizimni sinab ko'rish
const busSystem = new BusSystem();

// Avtobuslar qo'shamiz
busSystem.addBus("Toshkent - Samarqand", 40);
busSystem.addBus("Toshkent - Buxoro", 35);
busSystem.addBus("Samarqand - Buxoro", 30);

console.log("=== Barcha Avtobuslar ===");
console.log(busSystem.listBuses());

console.log("\n=== Toshkent yo'nalishi bo'yicha qidiruv ===");
console.log(busSystem.searchByRoute("Toshkent"));

console.log("\n=== O'rin band qilish ===");
console.log(busSystem.reserveSeat(1, "Ali Valiyev"));
console.log(busSystem.reserveSeat(1, "Gulnora Xasanova"));

console.log("\n=== 1-Avtobus holati ===");
console.log(busSystem.getBusStatus(1));

console.log("\n=== O'rin bo'shatish ===");
console.log(busSystem.cancelReservation(1, 1));

console.log("\n=== Yangi holat ===");
console.log(busSystem.getBusStatus(1));

console.log("\n=== Barcha avtobuslarning umumiy holati ===");
console.log(busSystem.getAllBusesStatus());

class Product {
    constructor(id, name, price, stock) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.stock = stock;
    }

    getDetails() {
        return {
            id: this.id,
            name: this.name,
            price: this.price,
            stock: this.stock,
            inStock: this.stock > 0
        };
    }

    updateStock(quantity) {
        if (this.stock + quantity >= 0) {
            const oldStock = this.stock;
            this.stock += quantity;
            return { 
                success: true, 
                oldStock, 
                newStock: this.stock,
                message: `Zaxira yangilandi: ${oldStock} → ${this.stock}`
            };
        }
        return { 
            success: false, 
            message: "Zaxira yetarli emas" 
        };
    }
}

class OrderItem {
    constructor(product, quantity) {
        this.product = product;
        this.quantity = quantity;
        this.unitPrice = product.price;
        this.totalPrice = this.calculatePrice();
    }

    calculatePrice() {
        return this.product.price * this.quantity;
    }

    getDetails() {
        return {
            product: this.product.name,
            quantity: this.quantity,
            unitPrice: this.unitPrice,
            totalPrice: this.totalPrice
        };
    }
}

class Order {
    constructor(id) {
        this.id = id;
        this.items = [];
        this.orderDate = new Date();
        this.status = "created"; // created, processing, completed, cancelled
        this.totalAmount = 0;
    }

    addItem(orderItem) {
        this.items.push(orderItem);
        this.totalAmount = this.calculateTotal();
        return this.items.length;
    }

    calculateTotal() {
        return this.items.reduce((total, item) => total + item.calculatePrice(), 0);
    }

    getOrderDetails() {
        return {
            orderId: this.id,
            orderDate: this.orderDate,
            status: this.status,
            totalAmount: this.totalAmount,
            items: this.items.map(item => item.getDetails()),
            itemCount: this.items.length
        };
    }

    updateStatus(newStatus) {
        const validStatuses = ["created", "processing", "completed", "cancelled"];
        if (validStatuses.includes(newStatus)) {
            this.status = newStatus;
            return true;
        }
        return false;
    }
}

class Shop {
    constructor() {
        this.products = [];
        this.orders = [];
        this.nextProductId = 1;
        this.nextOrderId = 1;
    }

    addProduct(name, price, stock) {
        const product = new Product(this.nextProductId++, name, price, stock);
        this.products.push(product);
        return product;
    }

    listProducts() {
        return this.products.map(product => product.getDetails());
    }

    findProductById(productId) {
        return this.products.find(p => p.id === productId);
    }

    findProductByName(name) {
        return this.products.filter(p => 
            p.name.toLowerCase().includes(name.toLowerCase())
        );
    }

    createOrder() {
        const order = new Order(this.nextOrderId++);
        this.orders.push(order);
        return order;
    }

    addProductToOrder(order, productId, quantity) {
        const product = this.findProductById(productId);
        if (!product) {
            return { success: false, message: "Mahsulot topilmadi" };
        }

        if (product.stock < quantity) {
            return { 
                success: false, 
                message: `Zaxira yetarli emas. Mavjud: ${product.stock}, Talab: ${quantity}` 
            };
        }

        const orderItem = new OrderItem(product, quantity);
        order.addItem(orderItem);
        
        return { 
            success: true, 
            message: "Mahsulot buyurtmaga qo'shildi",
            item: orderItem.getDetails()
        };
    }

    processOrder(order) {
        // Zaxirani tekshirish
        for (const item of order.items) {
            if (item.product.stock < item.quantity) {
                return { 
                    success: false, 
                    message: `${item.product.name} uchun zaxira yetarli emas` 
                };
            }
        }

        // Zaxirani yangilash
        for (const item of order.items) {
            item.product.updateStock(-item.quantity);
        }

        order.updateStatus("completed");
        return { 
            success: true, 
            message: "Buyurtma muvaffaqiyatli bajarildi",
            order: order.getOrderDetails()
        };
    }

    cancelOrder(order) {
        if (order.status === "completed") {
            // Buyurtma bekor qilinsa, zaxirani qaytarish
            for (const item of order.items) {
                item.product.updateStock(item.quantity);
            }
        }
        order.updateStatus("cancelled");
        return { success: true, message: "Buyurtma bekor qilindi" };
    }

    getOrderById(orderId) {
        return this.orders.find(o => o.id === orderId);
    }

    getAllOrders() {
        return this.orders.map(order => order.getOrderDetails());
    }

    getInventoryStatus() {
        return this.products.map(product => ({
            id: product.id,
            name: product.name,
            stock: product.stock,
            status: product.stock > 0 ? "Mavjud" : "Tugagan",
            needsRestock: product.stock < 5
        }));
    }
}

// Tizimni sinab ko'rish
const shop = new Shop();

// Mahsulotlar qo'shamiz
shop.addProduct("Laptop", 1000, 10);
shop.addProduct("Smartphone", 500, 20);
shop.addProduct("Tablet", 300, 15);
shop.addProduct("Printer", 200, 8);

console.log("=== Barcha Mahsulotlar ===");
console.log(shop.listProducts());

console.log("\n=== Yangi Buyurtma Yaratish ===");
const order1 = shop.createOrder();

console.log("=== Buyurtmaga Mahsulot Qo'shish ===");
console.log(shop.addProductToOrder(order1, 1, 2)); // Laptop
console.log(shop.addProductToOrder(order1, 2, 1)); // Smartphone
console.log(shop.addProductToOrder(order1, 3, 3)); // Tablet

console.log("\n=== Buyurtma Tafsilotlari ===");
console.log(order1.getOrderDetails());

console.log("\n=== Buyurtmani Qayta Ishlash ===");
console.log(shop.processOrder(order1));

console.log("\n=== Yangi Zaxira Holati ===");
console.log(shop.getInventoryStatus());

console.log("\n=== Yangi Buyurtma (Zaxira Yetmasligi) ===");
const order2 = shop.createOrder();
console.log(shop.addProductToOrder(order2, 1, 15)); // Juda ko'p laptop

console.log("\n=== Barcha Buyurtmalar ===");
console.log(shop.getAllOrders());

console.log("\n=== Mahsulot Qidirish ===");
console.log(shop.findProductByName("phone"));

// Agar siz ikkala tizimni birlashtirmoqchi bo'lsangiz
class CombinedSystem {
    constructor() {
        this.busSystem = new BusSystem();
        this.shopSystem = new Shop();
    }

    // Bu yerda ikkala tizim o'rtasida integratsiya metodlari yozishingiz mumkin
    // Masalan: avtobus chiptasini buyurtma qilganda do'kondan mahsulot ham buyurtma qilish
}

// Misol: Integratsiya
const combinedSystem = new CombinedSystem();

// Avtobus qo'shish
combinedSystem.busSystem.addBus("Toshkent - Samarqand", 40);

// Mahsulot qo'shish
combinedSystem.shopSystem.addProduct("Sayohat sumkasi", 50, 100);

console.log("=== Kombinatsiya Tizimi ===");
console.log("Avtobuslar:", combinedSystem.busSystem.listBuses());
console.log("Mahsulotlar:", combinedSystem.shopSystem.listProducts());