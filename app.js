// Avtobus klassi - har bir avtobus haqida ma'lumot saqlaydi
class Avtobus {
    constructor(id, yoonalish, orinlarSoni) {
        this.id = id;
        this.yoonalish = yoonalish;
        this.orinlarSoni = orinlarSoni;
        this.bandOrinlar = 0;
    }

    // Avtobus haqida to'liq ma'lumot beradi
    malumotOlish() {
        return {
            id: this.id,
            yoonalish: this.yoonalish,
            jamiOrinlar: this.orinlarSoni,
            bandOrinlar: this.bandOrinlar,
            bosOrinlar: this.orinlarSoni - this.bandOrinlar
        };
    }

    // Orin band qilish
    orinBandQilish() {
        if (this.bandOrinlar < this.orinlarSoni) {
            this.bandOrinlar++;
            return true; // Muvaffaqiyatli
        }
        return false; // Barcha orinlar band
    }

    // Band qilingan orinni bo'shatish (XATO TUZATILDI)
    orinBoshatish() {
        if (this.bandOrinlar > 0) {
            this.bandOrinlar--;
            return true; // Muvaffaqiyatli
        }
        return false; // Band orin yo'q
    }
}

// Avtobus tizimi - barcha avtobuslarni boshqaradi
class AvtobusTizimi {
    constructor() {
        this.avtobuslar = [];
    }

    // Yangi avtobus qo'shish
    avtobusQoshish(avtobus) {
        this.avtobuslar.push(avtobus);
        console.log(`✅ Yangi avtobus qo'shildi: ${avtobus.yoonalish} (ID: ${avtobus.id})`);
    }

    // Barcha avtobuslarni ko'rsatish (XATO TUZATILDI)
    avtobuslarRoyxati() {
        console.log("\n🚌 BARCHA AVTOBUSLAR:");
        console.log("=".repeat(50)); // NUQTA VERGULDAN OLDIN BO'SHLIQ OLIB TASHLANDI
        
        this.avtobuslar.forEach(avtobus => {
            const malumot = avtobus.malumotOlish();
            console.log(`ID: ${malumot.id} | ${malumot.yoonalish} | ${malumot.bandOrinlar}/${malumot.jamiOrinlar} band`);
        });
        
        return this.avtobuslar;
    }

    // Yo'nalish bo'yicha qidirish
    yoonalishBoyichaQidirish(yoonalishQismi) {
        const topilganAvtobuslar = this.avtobuslar.filter(avtobus => 
            avtobus.yoonalish.toLowerCase().includes(yoonalishQismi.toLowerCase())
        );
        
        console.log(`\n🔍 "${yoonalishQismi}" bo'yicha topilgan avtobuslar:`);
        console.log("-".repeat(50));
        
        if (topilganAvtobuslar.length === 0) {
            console.log("Hech narsa topilmadi 😔");
        } else {
            topilganAvtobuslar.forEach(avtobus => {
                const malumot = avtobus.malumotOlish();
                console.log(`ID: ${malumot.id} | ${malumot.yoonalish} | ${malumot.bosOrinlar} ta bo'sh orin`);
            });
        }
        
        return topilganAvtobuslar;
    }

    // Orin band qilish
    orinBandQilish(avtobusId) {
        const avtobus = this.avtobuslar.find(a => a.id === avtobusId);
        
        if (!avtobus) {
            console.log(`❌ ID: ${avtobusId} bo'yicha avtobus topilmadi`);
            return false;
        }

        const muvaffaqiyatli = avtobus.orinBandQilish();
        
        if (muvaffaqiyatli) {
            const malumot = avtobus.malumotOlish();
            console.log(`✅ Avtobus ${avtobusId} da orin band qilindi. ${malumot.bosOrinlar} ta orin bo'sh qoldi`);
        } else {
            console.log(`❌ Avtobus ${avtobusId} da barcha orinlar band`);
        }
        
        return muvaffaqiyatli;
    }

    // Band orinni bo'shatish (XATO TUZATILDI)
    orinBoshatish(avtobusId) {
        const avtobus = this.avtobuslar.find(a => a.id === avtobusId);
        
        if (!avtobus) {
            console.log(`❌ ID: ${avtobusId} bo'yicha avtobus topilmadi`);
            return false;
        }

        const muvaffaqiyatli = avtobus.orinBoshatish(); // METOD NOMI O'ZGARTIRILDI
        
        if (muvaffaqiyatli) {
            const malumot = avtobus.malumotOlish();
            console.log(`✅ Avtobus ${avtobusId} dan band orin bo'shatildi. ${malumot.bosOrinlar} ta orin bo'sh`);
        } else {
            console.log(`❌ Avtobus ${avtobusId} da band orin yo'q`);
        }
        
        return muvaffaqiyatli;
    }
}

// ==================== FOYDALANISH MISOLI ====================

// Avtobus tizimini yaratamiz
const tizim = new AvtobusTizimi();

// Avtobuslar qo'shamiz
tizim.avtobusQoshish(new Avtobus(1, "Toshkent - Samarqand", 40));
tizim.avtobusQoshish(new Avtobus(2, "Toshkent - Buxoro", 35));
tizim.avtobusQoshish(new Avtobus(3, "Samarqand - Buxoro", 30));
tizim.avtobusQoshish(new Avtobus(4, "Toshkent - Andijon", 45));
tizim.avtobusQoshish(new Avtobus(5, "Buxoro - Urganch", 25));

console.log("\n");

// Barcha avtobuslarni ko'rsatamiz
tizim.avtobuslarRoyxati();

console.log("\n");

// Yo'nalish bo'yicha qidiramiz
tizim.yoonalishBoyichaQidirish("Toshkent");
tizim.yoonalishBoyichaQidirish("Buxoro");

console.log("\n");

// Orin band qilamiz
tizim.orinBandQilish(1); // Toshkent - Samarqand
tizim.orinBandQilish(1);
tizim.orinBandQilish(2); // Toshkent - Buxoro
tizim.orinBandQilish(5); // Buxoro - Urganch

console.log("\n");

// Band orinni bo'shatamiz (XATO TUZATILDI)
tizim.orinBoshatish(1);

console.log("\n");

// Yangi holatni ko'ramiz
tizim.avtobuslarRoyxati();

console.log("\n");

// Mavjud bo'lmagan avtobusga urinib ko'ramiz
tizim.orinBandQilish(99);
tizim.orinBoshatish(99); // METOD NOMI O'ZGARTIRILDI

// Mahsulot klassi - har bir mahsulot haqida ma'lumot saqlaydi
class Mahsulot {
    constructor(id, nomi, narxi, ombor) {
        this.id = id;
        this.nomi = nomi;
        this.narxi = narxi;
        this.ombor = ombor;
    }

    // Mahsulot haqida to'liq ma'lumot beradi
    malumotOlish() {
        return {
            id: this.id,
            nomi: this.nomi,
            narxi: this.narxi,
            ombor: this.ombor,
            holati: this.ombor > 0 ? "🟢 Omborda bor" : "🔴 Omborda yo'q"
        };
    }

    // Ombordagi miqdorni yangilaydi
    omborYangila(soni) {
        const yangiMiqdor = this.ombor + soni;
        if (yangiMiqdor >= 0) {
            this.ombor = yangiMiqdor;
            console.log(`✅ ${this.nomi} ombori yangilandi: ${this.ombor} ta`);
            return true;
        } else {
            console.log(`❌ Noto'g'ri miqdor. Omborda faqat ${this.ombor} ta bor`);
            return false;
        }
    }
}

// Buyurtma elementi klassi - har bir buyurtmadagi mahsulotni ifodalaydi
class BuyurtmaElementi {
    constructor(mahsulot, soni) {
        this.mahsulot = mahsulot;
        this.soni = soni;
    }

    // Shu mahsulot uchun jami summani hisoblaydi
    summaHisobla() {
        return this.mahsulot.narxi * this.soni;
    }

    // Element haqida ma'lumot beradi
    malumotOlish() {
        const jamiSumma = this.summaHisobla();
        return {
            mahsulot: this.mahsulot.nomi,
            soni: this.soni,
            narxi: this.mahsulot.narxi,
            jamiSumma: jamiSumma
        };
    }
}

// Buyurtma klassi - bitta buyurtmani boshqaradi
class Buyurtma {
    constructor(id) {
        this.id = id;
        this.elementlar = [];
        this.holati = "Yangi";
        this.yaratilganVaqt = new Date();
    }

    // Buyurtmaga yangi mahsulot qo'shadi
    mahsulotQoshish(element) {
        // Mahsulot omborda bormi tekshiramiz
        if (element.mahsulot.ombor >= element.soni) {
            this.elementlar.push(element);
            console.log(`✅ ${element.soni} ta ${element.mahsulot.nomi} buyurtmaga qo'shildi`);
            return true;
        } else {
            console.log(`❌ ${element.mahsulot.nomi} dan omborda faqat ${element.mahsulot.ombor} ta bor`);
            return false;
        }
    }

    // Buyurtma uchun jami summani hisoblaydi
    jamiSummaHisobla() {
        let jami = 0;
        this.elementlar.forEach(element => {
            jami += element.summaHisobla();
        });
        return jami;
    }

    // Buyurtmani tasdiqlaydi va ombordan chiqaradi
    tasdiqlash() {
        // Avval barcha mahsulotlar omborda bormi tekshiramiz
        for (const element of this.elementlar) {
            if (element.mahsulot.ombor < element.soni) {
                console.log(`❌ ${element.mahsulot.nomi} yetarli emas. Buyurtma bekor qilindi`);
                this.holati = "Bekor qilindi";
                return false;
            }
        }

        // Barcha mahsulotlarni ombordan chiqaramiz
        this.elementlar.forEach(element => {
            element.mahsulot.omborYangila(-element.soni);
        });

        this.holati = "Tasdiqlandi";
        console.log(`✅ Buyurtma ${this.id} muvaffaqiyatli tasdiqlandi!`);
        return true;
    }

    // Buyurtma haqida ma'lumot beradi
    malumotOlish() {
        const jamiSumma = this.jamiSummaHisobla();
        return {
            id: this.id,
            holati: this.holati,
            elementlarSoni: this.elementlar.length,
            jamiSumma: jamiSumma,
            vaqt: this.yaratilganVaqt.toLocaleString()
        };
    }
}

// Do'kon klassi - barcha mahsulot va buyurtmalarni boshqaradi
class Dokon {
    constructor() {
        this.mahsulotlar = [];
        this.buyurtmalar = [];
        this.keyingiBuyurtmaId = 1;
    }

    // Yangi mahsulot qo'shadi
    mahsulotQoshish(mahsulot) {
        this.mahsulotlar.push(mahsulot);
        console.log(`✅ Yangi mahsulot qo'shildi: ${mahsulot.nomi}`);
    }

    // Barcha mahsulotlarni ko'rsatadi
    mahsulotlarniKorsatish() {
        console.log("\n🛍️  BARCHA MAHSULOTLAR:");
        console.log("=" .repeat(70));
        
        this.mahsulotlar.forEach(mahsulot => {
            const malumot = mahsulot.malumotOlish();
            console.log(`ID: ${malumot.id} | ${malumot.nomi} | ${malumot.narxi} so'm | ${malumot.ombor} ta | ${malumot.holati}`);
        });
        
        return this.mahsulotlar;
    }

    // ID bo'yicha mahsulot qidiradi
    mahsulotTopish(id) {
        return this.mahsulotlar.find(m => m.id === id);
    }

    // Yangi buyurtma yaratadi
    yangiBuyurtma() {
        const yangiId = this.keyingiBuyurtmaId++;
        const yangiBuyurtma = new Buyurtma(yangiId);
        this.buyurtmalar.push(yangiBuyurtma);
        console.log(`🆕 Yangi buyurtma yaratildi: #${yangiId}`);
        return yangiBuyurtma;
    }

    // Barcha buyurtmalarni ko'rsatadi
    buyurtmalarniKorsatish() {
        console.log("\n📦 BARCHA BUYURTMALAR:");
        console.log("=" .repeat(60));
        
        if (this.buyurtmalar.length === 0) {
            console.log("Hali buyurtmalar mavjud emas");
            return;
        }
        
        this.buyurtmalar.forEach(buyurtma => {
            const malumot = buyurtma.malumotOlish();
            console.log(`Buyurtma #${malumot.id} | ${malumot.holati} | ${malumot.elementlarSoni} ta mahsulot | ${malumot.jamiSumma} so'm | ${malumot.vaqt}`);
        });
    }
}

// ==================== FOYDALANISH MISOLI ====================

// Do'kon yaratamiz
const meningDokonim = new Dokon();

// Mahsulotlar qo'shamiz
meningDokonim.mahsulotQoshish(new Mahsulot(1, "Smartfon", 2500000, 10));
meningDokonim.mahsulotQoshish(new Mahsulot(2, "Noutbuk", 7500000, 5));
meningDokonim.mahsulotQoshish(new Mahsulot(3, "Telefon qoplamasi", 50000, 50));
meningDokonim.mahsulotQoshish(new Mahsulot(4, "Simsiz quloqchinlar", 350000, 15));
meningDokonim.mahsulotQoshish(new Mahsulot(5, "Aqlli soat", 1200000, 8));

console.log("\n");

// Barcha mahsulotlarni ko'rsatamiz
meningDokonim.mahsulotlarniKorsatish();

console.log("\n");

// Yangi buyurtma yaratamiz
const buyurtma1 = meningDokonim.yangiBuyurtma();

// Buyurtmaga mahsulotlar qo'shamiz
const smartphone = meningDokonim.mahsulotTopish(1);
const qopqon = meningDokonim.mahsulotTopish(3);
const quloqchin = meningDokonim.mahsulotTopish(4);

if (smartphone && qopqon && quloqchin) {
    buyurtma1.mahsulotQoshish(new BuyurtmaElementi(smartphone, 2));
    buyurtma1.mahsulotQoshish(new BuyurtmaElementi(qopqon, 3));
    buyurtma1.mahsulotQoshish(new BuyurtmaElementi(quloqchin, 1));
}

console.log("\n");

// Buyurtmani tasdiqlaymiz
buyurtma1.tasdiqlash();

console.log("\n");

// Yangi holatda mahsulotlarni ko'rsatamiz
meningDokonim.mahsulotlarniKorsatish();

console.log("\n");

// Barcha buyurtmalarni ko'rsatamiz
meningDokonim.buyurtmalarniKorsatish();

console.log("\n");

// Ikkinchi buyurtma yaratamiz (yetarli mahsulot bo'lmagan holat)
const buyurtma2 = meningDokonim.yangiBuyurtma();
const noutbuk = meningDokonim.mahsulotTopish(2);

if (noutbuk) {
    buyurtma2.mahsulotQoshish(new BuyurtmaElementi(noutbuk, 10)); // Omborda faqat 5 ta bor
}

console.log("\n");

// Buyurtma holatini ko'rsatamiz
console.log("Buyurtma 1 holati:", buyurtma1.malumotOlish());
console.log("Buyurtma 2 holati:", buyurtma2.malumotOlish());