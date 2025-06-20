
"use client";

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image'; 
import { ShoppingCart, X } from 'lucide-react';
import ordersData from '@/data/orders.json'; 
import type { OrderRecord } from '@/types/order'; 
import { cn } from '@/lib/utils';

const PROMO_STORAGE_KEY = 'ovisPromoCycleData_v2'; 
const MIN_BOXES_TO_DISPLAY_IN_PROMO = 5; 

interface PromoData {
  initialBoxesForCycle: number;
  actualBoxesRemaining: number; 
  cycleStartTime: number;
  promoKey: string;
  currentCountdownTarget: number;
}

// Sample names for randomization - expanded list
const firstNames = [
  "Cut", "Teuku", "Zulkifli", "Maimunah", "Hasan", "Darma", "Rizki", "Desi", "Putra", "Putri", "Syafril", "Yusril", "Delima", "Yanti", "Safira", "Fauzan", "Nanda", "Syarifah", "Syamsul", "Yulita", "Arizal", "Melda", "Rafli", "Afdal", "Andika", "Irma", "Rina", "Marwan", "Syarul", "Indrawati", "Budi", "Siti", "Eko", "Dewi", "Joko", "Rina", "Agus", "Lia", "Dian", "Rahmat", "Bayu", "Indah", "Adi", "Maya", "Rudi", "Fitri", "Tono", "Ayu", "Dimas", "Wati", "Slamet", "Rukmini", "Teguh", "Sulastri", "Wahyu", "Retno", "Heru", "Sri", "Parjo", "Lastri", "Syahrul", "Farida", "Udin", "Asri", "Dewanto", "Nani", "Amir", "Nurul", "Rifqi", "Mutia", "Syarif", "Halijah", "Jumadi", "Rosna", "Basri", "Zulkarnain", "Hairul", "Rusmini", "Usman", "Salmah", "Andi", "Tenri", "La Ode", "Hasni", "Muslimin", "Nur", "Rusdi", "Yusran", "Ilham", "Marni", "Syamsuddin", "Nurlina", "Ridwan", "Hamzah", "Rahma", "Saiful", "Jumria", "Sudirman", "Rahmi", "Alfian", "Putu", "Made", "Nyoman", "Ketut", "Komang", "Wayan", "Kadek", "Luh", "Gede", "Desak", "I Gede", "I Ketut", "Ni Komang", "Ni Luh", "Ngurah", "I Nyoman", "Ni Putu", "I Gusti", "Desi Ayu", "Putu Ayu", "Yohanes", "Benni", "Agnes", "Maria", "Yulianus", "Tarsisius", "Aprilia", "Fransiska", "Dominggus", "Agustinus", "Andreas", "Rofiq", "Alfrida", "Ardian", "Stefanus", "Anselmus", "Ignatius", "Evelina", "Julius", "Ruben", "Nina", "Hendra", "Dina", "Gilang", "Indra", "Lina", "Surya", "Ratna", "Taufik", "Yuni", "Farhan", "Bella", "Rian", "Wulan", "Ahmad", "Aisha", "Ali", "Fatima", "Omar", "Yusuf", "Budi", "Ani", "Siti", "Eko", "Dewi", "Joko", "Rina", "Agus", "Lia", "Putu", "Dian", "Rahmat", "Citra", "Bayu", "Indah", "Adi", "Maya", "Rudi", "Fitri", "Tono", "Ayu", "Dimas", "Wati", "Reza", "Sari", "Fajar", "Nina", "Hendra", "Dina", "Gilang", "Indra", "Lina", "Surya", "Ratna", "Taufik", "Yuni", "Farhan", "Bella", "Rian", "Wulan", "Ahmad", "Aisha", "Ali", "Fatima", "Hassan", "Khadija", "Omar", "Zainab", "Yusuf", "Mariam", "Cut", "Teuku", "Zulkifli", "Maimunah", "Hasan", "Darma", "Rizki", "Desi", "Putra", "Putri",  "Made", "Nyoman", "Ketut", "Komang", "Wayan", "Kadek", "Luh", "Gede", "Desak", "Ngurah", "Syahrul", "Farida", "Udin", "Asri", "Dewanto", "Nani", "Amir", "Nurul", "Rifqi", "Mutia", "Andi", "Tenri", "La Ode", "Hasni", "Muslimin", "Nur", "Rusdi", "Yusran", "Ilham", "Marni", "Yohanis", "Melki", "Neles", "Yuliana", "Benhard", "Kristina", "Marten", "Agustina", "Filemon", "Serafina", "Frans", "Niko", "Marlina", "Elsa", "Jemmy", "Melda", "Salmon", "Robby", "Yopi", "Serly", "Iqbal", "Zahra", "Raka", "Laras", "Aqila", "Fikri", "Hana", "Rayhan", "Tiara", "Kirana"
];

const lastNames = [
  "Siregar", "Nasution", "Harahap", "Lubis", "Ginting", "Manurung", "Simanjuntak", "Sitompul", "Saragih", "Tanjung", "Tampubolon", "Hutagalung", "Pasaribu", "Batubara", "Hasibuan", "Daulay", "Matondang", "Rambe", "Malau", "Lumbantoruan", "Santoso", "Wijaya", "Kusuma", "Rahardjo", "Setiawan", "Purnama", "Gunawan", "Susanto", "Pratama", "Wahyuni", "Nugroho", "Handayani", "Saputra", "Utami", "Permana", "Prasetyo", "Sutrisno", "Hermawan", "Wibowo", "Yulianto", "Halim", "Iskandar", "Fauzan", "Wibisono", "Juhri", "Saputra", "Yunus", "Ramadhani", "Kadir", "Samsudin", "Kahar", "Mokodompit", "Rantung", "Makmur", "Sugiarto", "Dg Malik", "Mappatunru", "Sumampouw", "Limbong", "Tumbelaka", "Adnyana", "Artawan", "Suartika", "Tunjung", "Aryawan", "Suarna", "Antara", "Mahendra", "Gunarta", "Sutisna", "Seran", "Gorang", "Hurek", "Lado", "Tukan", "Asa", "Nara", "Solu", "Saek", "Lodang", "Wakano", "Lobo", "Wurin", "Benu", "Tule", "Faot", "Boimau", "Seran", "Noning", "Bani", "Rihi", "Nale", "Bunga", "Fanggidae", "Mau", "Naikoli", "Dethan", "Pau", "Baun", "Mone", "Tan", "Lee", "Rahman", "Halim", "Saputri", "Putrawan", "Ardiansyah", "Herlambang", "Yuliana", "Effendi","Santoso", "Wijaya", "Kusuma", "Halim", "Tan", "Lee", "Rahardjo", "Setiawan", "Lestari", "Purnama", "Siregar", "Simanjuntak", "Gunawan", "Susanto", "Pratama", "Wahyuni", "Nugroho", "Handayani", "Saputra", "Utami", "Hidayat", "Patel", "Chen", "Kim", "Nguyen", "Permana", "Abdullah", "Chandra", "Salim", "Tanjung", "Nasution", "Lubis", "Maulana", "Putri", "Hartono", "Widodo", "Pangestu", "Hasan", "Bakri", "Effendi", "Khan", "Singh", "Ahmed", "Li", "Silva", "Garcia", "Rodriguez", "Martinez", "Lopez", "Gonzalez", "Harahap", "Ginting",  "Manurung", "Sitompul", "Saragih", "Hutagalung", "Simbolon", "Dalton", "Tambunan", "Hutasoit", "Patittingi", "Kahar", "Mokodompit", "Rantung", "Makmur", "Sugiarto", "Mahmud", "Adnan", "Sumarto", "Samsu", "Adnyana", "Artawan", "Suartika", "Tunjung", "Aryawan", "Suarna", "Antara", "Mahendra", "Gunarta", "Sutisna", "Wamena", "Mansoben", "Mandacan", "Tuharea", "Latumahina", "Rewarin", "Aritonang", "Yarangga", "Kambuaya", "Soway", "Saputri", "Putrawan", "Prasetyo", "Wijanarko", "Ardiansyah", "Susilowati", "Nuraini", "Herlambang", "Kuswanto", "Yuliana"
];


function generateRandomName(): string {
  const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  return `${randomFirstName} ${randomLastName}`;
}

const timePhrases = [
  "beberapa detik yang lalu",
  "30 detik yang lalu",
  "1 menit yang lalu",
  "2 menit yang lalu",
  "3 menit yang lalu",
  "5 menit yang lalu",
  "7 menit yang lalu",
  "10 menit yang lalu",
];

const LiveOrderNotification: React.FC = () => {
  const [displayedName, setDisplayedName] = useState<string>("");
  const [displayedQuantity, setDisplayedQuantity] = useState<number>(1);
  const [currentOrderTimePhrase, setCurrentOrderTimePhrase] = useState<string>("");
  const [isVisible, setIsVisible] = useState(false);
  const [orders, setOrders] = useState<OrderRecord[]>([]);

  useEffect(() => {
    if (Array.isArray(ordersData)) {
      setOrders(ordersData as OrderRecord[]);
    }
  }, []);

  const showRandomOrder = useCallback(() => {
    if (isVisible || orders.length === 0) return;

    try {
      const storedPromoDataRaw = localStorage.getItem(PROMO_STORAGE_KEY);
      if (storedPromoDataRaw) {
        let promoData = JSON.parse(storedPromoDataRaw) as PromoData;
        if (promoData && promoData.currentCountdownTarget > Date.now() && promoData.actualBoxesRemaining > MIN_BOXES_TO_DISPLAY_IN_PROMO) {
          promoData.actualBoxesRemaining = Math.max(MIN_BOXES_TO_DISPLAY_IN_PROMO, promoData.actualBoxesRemaining - 1);
          localStorage.setItem(PROMO_STORAGE_KEY, JSON.stringify(promoData));
        }
      }
    } catch (e) {
      console.warn("LiveOrderNotification: Could not update promo data", e);
    }

    const randomIndex = Math.floor(Math.random() * orders.length);
    const randomOrderFromData = orders[randomIndex]; 
    const randomTimePhrase = timePhrases[Math.floor(Math.random() * timePhrases.length)];
    
    let nameToDisplay = "";
    // 50% chance to use name from orders.json, 50% chance to generate a new random name
    if (orders.length > 0 && Math.random() < 0.5) { 
        nameToDisplay = randomOrderFromData.name; 
    } else {
        nameToDisplay = generateRandomName(); 
    }
    
    setDisplayedName(nameToDisplay);
    setDisplayedQuantity(randomOrderFromData.quantity || 1); 
    setCurrentOrderTimePhrase(randomTimePhrase);
    setIsVisible(true);

    const hideTimeout = setTimeout(() => {
      setIsVisible(false);
    }, 7000); 

    const randomInterval = Math.floor(Math.random() * (100 * 1000)) + 20000; // 20s to 120s (2 mins)
    const nextShowTimeout = setTimeout(showRandomOrder, randomInterval);

    return () => {
      clearTimeout(hideTimeout);
      clearTimeout(nextShowTimeout);
    };
  }, [isVisible, orders]);

  useEffect(() => {
    if (orders.length === 0) return;

    // Initial delay: 5s to 30s
    const initialDelayTimeout = setTimeout(() => {
      showRandomOrder(); 
    }, Math.floor(Math.random() * 25000) + 5000); 

    return () => clearTimeout(initialDelayTimeout);
  }, [orders, showRandomOrder]); 

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!displayedName || !isVisible) { 
      return null; 
  }

  return (
    <div
      className={cn(
        "fixed top-4 left-4 z-[100] w-auto max-w-sm p-0 overflow-hidden transition-all duration-500 ease-in-out",
        isVisible ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
      )}
    >
        <div className="bg-background border border-border rounded-lg shadow-2xl p-3">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 bg-primary/10 p-2 rounded-full mt-1">
              <ShoppingCart className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-grow">
              <p className="text-sm font-semibold text-foreground">
                {displayedName}
              </p>
              <p className="text-xs text-muted-foreground">
                Lakukan pembelian Ovisure Gold ({displayedQuantity} box)
              </p>
              <p className="text-xs text-primary mt-0.5">
                {currentOrderTimePhrase}
              </p>
            </div>
            <button
              onClick={handleClose}
              aria-label="Tutup notifikasi"
              className="p-1 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        </div>
    </div>
  );
};

export default LiveOrderNotification;
