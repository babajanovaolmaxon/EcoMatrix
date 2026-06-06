// 1. HAVO SIFATI INDEKSI (AQI) LOGIKASI
function tekshirAQI() {
    const pm25 = Number(document.getElementById("aqiZarracha").value);
    const natija = document.getElementById("aqiNatija");

    if (document.getElementById("aqiZarracha").value === "" || pm25 < 0) {
        chiqarEcoNatija(natija, "eco-bad", "Zarrachalar miqdorini to'g'ri kiriting!");
        return;
    }

    if (pm25 <= 12) {
        chiqarEcoNatija(natija, "eco-good", `PM2.5 = ${pm25} mkg/m³. Havo sifati a'lo darajada! Toza havodan to'yib nafas oling. 🍃`);
    } else if (pm25 > 12 && pm25 <= 35) {
        chiqarEcoNatija(natija, "eco-warn", `PM2.5 = ${pm25} mkg/m³. Havo qoniqarli. Sezuvchan insonlarda yengil allergiya qo'zg'ashi mumkin.`);
    } else if (pm25 > 35 && pm25 <= 55) {
        chiqarEcoNatija(natija, "eco-warn", `PM2.5 = ${pm25} mkg/m³. Havo biroz zararli. Tashqarida uzoq vaqt jismoniy mashg'ulot qilmagan ma'qul ⚠️`);
    } else {
        chiqarEcoNatija(natija, "eco-bad", `PM2.5 = ${pm25} mkg/m³. Xavfli havo darajasi! Niqob taqish va xonadan chiqmaslik tavsiya etiladi 🛑`);
    }
}

// 2. EKOLOGIK TRANSPORT TAHLILI
function tahlilTransport() {
    const masofa = Number(document.getElementById("ecoMasofa").value);
    const transport = document.getElementById("transportTuri").value;
    const natija = document.getElementById("ecoNatija");

    if (!masofa || masofa <= 0 || !transport) {
        chiqarEcoNatija(natija, "eco-bad", "Masofani kiriting va transport turini tanlang!");
        return;
    }

    if (transport === "velosiped") {
        chiqarEcoNatija(natija, "eco-good", `Siz ${masofa} km masofani mutloq toza bosib o'tdingiz. 0g CO₂ ajraldi. Tabiat sizdan minnatdor! 🚲💚`);
    } else if (transport === "elektromobil") {
        // Taxminan 1 km ga 50g bilvosta CO2 (elektr ishlab chiqarishdan)
        let co2 = (masofa * 50) / 1000;
        chiqarEcoNatija(natija, "eco-good", `Elektromobil bilan ${masofa} km uchun atigi ${co2.toFixed(2)} kg CO₂ ajraldi. Yashil kelajak sari yaxshi qadam! ⚡️`);
    } else if (transport === "benzin") {
        // O'rtacha benzinli mashina 1 km ga 120g CO2 chiqaradi
        let co2 = (masofa * 120) / 1000;
        if (masofa > 50) {
            chiqarEcoNatija(natija, "eco-bad", `Atrof-muhitga jiddiy zarar! ${masofa} km masofada ${co2.toFixed(2)} kg CO₂ ajraldi. Jamoat transportidan foydalanishni o'ylab ko'ring 🚗🛑`);
        } else {
            chiqarEcoNatija(natija, "eco-warn", `Benzinli mashina bilan ${masofa} km masofada ${co2.toFixed(2)} kg CO₂ ajraldi. Imkon bo'lsa piyoda yuring.`);
        }
    }
}

// 3. QUYOSH ENERGIYASI SAMORADORLIGI
function hisoblaQuyosh() {
    const maydon = Number(document.getElementById("paneliMaydon").value);
    const soat = Number(document.getElementById("quyoshSoat").value);
    const natija = document.getElementById("quyoshNatija");

    if (!maydon || maydon <= 0 || !soat || soat <= 0) {
        chiqarEcoNatija(natija, "eco-bad", "Maydon va quyoshli soatni to'g'ri kiriting!");
        return;
    }

    // Formula: O'rtacha 1 m² quyosh paneli 1 soatda 150 vatt (0.15 kVt) energiya beradi. Foydali ish koeffitsiyenti: 0.18
    let kunlikEnergiyaKvt = maydon * soat * 0.15 * 0.85; // 0.85 — tizimdagi yo'qotishlar hisobi

    if (kunlikEnergiyaKvt >= 10) {
        chiqarEcoNatija(natija, "eco-good", `Ajoyib ko'rsatkich! Siz kuniga ${kunlikEnergiyaKvt.toFixed(1)} kVt-soat yashil energiya olasiz. Bu butun bir xonadonni ta'minlay oladi! ☀️🔌`);
    } else {
        chiqarEcoNatija(natija, "eco-warn", `Kunlik olinadigan energiya: ${kunlikEnergiyaKvt.toFixed(1)} kVt-soat. Kichik maishiy texnikalar yoki yoritish tizimi uchun yetarli.`);
    }
}

// Global yordamchi funksiya
function chiqarEcoNatija(element, statusStil, matn) {
    element.style.display = "block";
    element.className = "result " + statusStil;
    element.innerText = matn;
}
