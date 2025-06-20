
"use client";

import Image from 'next/image';
import SectionWrapper from '@/components/ui/section-wrapper';
import OrderForm from '@/components/order-form';
import CountdownTimer from '@/components/countdown-timer';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, CheckCircle, Gift, Truck, Undo2, Percent } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';

const MIN_BOXES_TO_DISPLAY = 5;
const MAX_INITIAL_BOXES = 100;
const MIN_INITIAL_BOXES = 30; // Minimum boxes to start a new promo with
const MIN_PROMO_DURATION_MINUTES = 30;
const MAX_PROMO_DURATION_MINUTES = 90; // 1 hour 30 minutes

const PROMO_STORAGE_KEY = 'ovisPromoCycleData_v2';

interface PromoData {
  initialBoxesForCycle: number; 
  actualBoxesRemaining: number;   
  cycleStartTime: number;
  promoKey: string; 
  currentCountdownTarget: number; 
}

const OrderFormSection = () => {
  const [boxesLeft, setBoxesLeft] = useState(MAX_INITIAL_BOXES);
  const [countdownTargetTime, setCountdownTargetTime] = useState(0);
  const [currentPromoKey, setCurrentPromoKey] = useState('');

  const startNewPromoCycle = useCallback((): PromoData => {
    const now = Date.now();
    const newPromoKey = now.toString();
    
    const promoDurationMinutes = Math.floor(Math.random() * (MAX_PROMO_DURATION_MINUTES - MIN_PROMO_DURATION_MINUTES + 1)) + MIN_PROMO_DURATION_MINUTES;
    const newCountdownTarget = now + promoDurationMinutes * 60 * 1000;
    
    const newInitialBoxes = Math.floor(Math.random() * (MAX_INITIAL_BOXES - MIN_INITIAL_BOXES + 1)) + MIN_INITIAL_BOXES;

    const newPromoData: PromoData = {
      initialBoxesForCycle: newInitialBoxes,
      actualBoxesRemaining: newInitialBoxes, 
      cycleStartTime: now,
      promoKey: newPromoKey,
      currentCountdownTarget: newCountdownTarget,
    };

    localStorage.setItem(PROMO_STORAGE_KEY, JSON.stringify(newPromoData));

    setBoxesLeft(newInitialBoxes); 
    setCountdownTargetTime(newCountdownTarget);
    setCurrentPromoKey(newPromoKey);
    return newPromoData;
  }, []);

  useEffect(() => {
    let promoData: PromoData | null = null;
    const storedDataRaw = localStorage.getItem(PROMO_STORAGE_KEY);

    if (storedDataRaw) {
      try {
        promoData = JSON.parse(storedDataRaw) as PromoData;
        
        if (typeof promoData.initialBoxesForCycle !== 'number' || 
            typeof promoData.actualBoxesRemaining !== 'number' || 
            typeof promoData.cycleStartTime !== 'number' ||
            typeof promoData.promoKey !== 'string' ||
            typeof promoData.currentCountdownTarget !== 'number') {
          console.warn("Promo data from localStorage has invalid structure, starting new cycle.");
          promoData = null; 
        }
      } catch (e) {
        console.warn("Failed to parse promo data from localStorage, starting new cycle.", e);
        localStorage.removeItem(PROMO_STORAGE_KEY);
      }
    }

    const now = Date.now();

    if (promoData && promoData.currentCountdownTarget > now && promoData.actualBoxesRemaining > MIN_BOXES_TO_DISPLAY) {
      setBoxesLeft(Math.max(MIN_BOXES_TO_DISPLAY, promoData.actualBoxesRemaining));
      setCountdownTargetTime(promoData.currentCountdownTarget);
      setCurrentPromoKey(promoData.promoKey);
    } else {
      promoData = startNewPromoCycle(); 
    }

    const intervalId = setInterval(() => {
      const currentNow = Date.now();
      let currentCycleData: PromoData | null = null;
      const currentPromoDataRaw = localStorage.getItem(PROMO_STORAGE_KEY);

      if (currentPromoDataRaw) {
        try {
          currentCycleData = JSON.parse(currentPromoDataRaw) as PromoData;
           if (typeof currentCycleData.initialBoxesForCycle !== 'number' || 
               typeof currentCycleData.actualBoxesRemaining !== 'number' ||
               typeof currentCycleData.cycleStartTime !== 'number' ||
               typeof currentCycleData.promoKey !== 'string' ||
               typeof currentCycleData.currentCountdownTarget !== 'number') {
             console.warn("Interval: Promo data from localStorage has invalid structure, starting new cycle.");
             currentCycleData = startNewPromoCycle();
           }
        } catch (e) {
          console.warn("Interval: Failed to parse promo data, starting new cycle.", e);
          currentCycleData = startNewPromoCycle();
        }
      } else {
        currentCycleData = startNewPromoCycle();
      }
      
      if (!currentCycleData) { 
        currentCycleData = startNewPromoCycle();
      }

      if (currentNow >= currentCycleData.currentCountdownTarget || currentCycleData.actualBoxesRemaining <= MIN_BOXES_TO_DISPLAY) {
        currentCycleData = startNewPromoCycle(); 
      } else {
        const elapsedProportion = Math.max(0, Math.min(1, (currentNow - currentCycleData.cycleStartTime) / (currentCycleData.currentCountdownTarget - currentCycleData.cycleStartTime)));
        const timeBasedSoldAmount = Math.floor((currentCycleData.initialBoxesForCycle - MIN_BOXES_TO_DISPLAY) * elapsedProportion);
        const targetBoxesAfterTimeDecay = currentCycleData.initialBoxesForCycle - timeBasedSoldAmount;

        currentCycleData.actualBoxesRemaining = Math.min(currentCycleData.actualBoxesRemaining, targetBoxesAfterTimeDecay);
        currentCycleData.actualBoxesRemaining = Math.max(MIN_BOXES_TO_DISPLAY, currentCycleData.actualBoxesRemaining);

        localStorage.setItem(PROMO_STORAGE_KEY, JSON.stringify(currentCycleData));
        setBoxesLeft(currentCycleData.actualBoxesRemaining);

        if (currentPromoKey !== currentCycleData.promoKey) {
            setCurrentPromoKey(currentCycleData.promoKey);
            setCountdownTargetTime(currentCycleData.currentCountdownTarget);
        }
      }
    }, 5000); 

    return () => clearInterval(intervalId);
  }, [startNewPromoCycle, currentPromoKey]);


  return (
    <SectionWrapper id="pesan" className="bg-gradient-to-b from-primary/5 via-orange-50 to-background">
      <div id="harga" className="scroll-mt-20"> {/* Anchor for #harga */}
        <div className="text-center mb-6">
          <h2 id="pesan-heading" className="text-4xl md:text-5xl font-bold text-primary mb-3">
            Pesan Ovisure Gold Sekarang!
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Jangan lewatkan <span className="text-primary font-semibold">diskon spesial</span> dan <span className="text-primary font-semibold">penawaran terbatas</span> kami.
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid lg:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Left Column: Offer Details */}
          <div className="space-y-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="bg-primary text-primary-foreground p-6 rounded-lg shadow-xl text-center">
              <h3 className="text-2xl font-bold mb-1">PROMO SPESIAL HARI INI</h3>
              <p className="text-4xl font-bold mb-2">DISKON BESAR</p>
              <p className="text-sm line-through opacity-80">Harga Normal Satuan: Rp 899.000</p>
              <p className="text-3xl font-bold text-yellow-300 animate-pulse-price">Mulai Rp 399.000 /box*</p>
              <p className="text-xs text-yellow-200 mt-1">*Harga spesial untuk pembelian paket.</p>
            </div>
            
            <div className="p-6 rounded-lg border border-primary/30 bg-background shadow-md">
              <h4 className="text-lg font-semibold text-foreground mb-3 text-center">Promosi Paket Akan Berakhir Dalam:</h4>
              {countdownTargetTime > 0 && <CountdownTimer key={currentPromoKey} targetTimestamp={countdownTargetTime} />}
              <Badge variant="destructive" className="mt-4 mx-auto block w-fit">
                Cuma tersisa {boxesLeft} paket promo!
              </Badge>
            </div>

            <div className="space-y-4 text-muted-foreground">
              <div className="flex items-start gap-3 p-3 bg-green-500/10 rounded-md">
                <Truck className="h-6 w-6 text-green-600 shrink-0 mt-1" />
                <div>
                  <h5 className="font-semibold text-green-700">Gratis Ongkos Kirim</h5>
                  <p className="text-sm">Jabodetabekjur</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-blue-500/10 rounded-md">
                <Undo2 className="h-6 w-6 text-blue-600 shrink-0 mt-1" />
                <div>
                  <h5 className="font-semibold text-blue-700">Garansi Uang Kembali</h5>
                  <p className="text-sm">Pengembalian dana x5 kali jika ditemukan produk palsu. 100% jika tidak efektif (S&K berlaku).</p>
                </div>
              </div>
               <div className="flex items-start gap-3 p-3 bg-yellow-500/10 rounded-md">
                <Percent className="h-6 w-6 text-yellow-600 shrink-0 mt-1" />
                <div>
                  <h5 className="font-semibold text-yellow-700">Jangan Lewatkan!</h5>
                  <p className="text-sm">Metode home treatment definitif dengan biaya paling ekonomis.</p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col items-center gap-4">
               <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2">
                <Image
                  src="https://w.ladicdn.com/5f0c07d511b52935c3db88d0/digosure-1-20230328105655-ynk6k-20230512040814-zjzrt-20230530081240-isrot-20231128032836-1easw.gif"
                  alt="Sertifikasi dan Jaminan Produk Ovisure Gold"
                  width={120}
                  height={28}
                  unoptimized
                  data-ai-hint="product guarantee animation"
                  draggable="false"
                />
                <Image
                  src="https://w.ladicdn.com/s450x400/5f0c07d511b52935c3db88d0/made-in-usa-removebg-preview-20230905050434-p5381-20231128032836-duzbf.png"
                  alt="Made in USA"
                  width={130} 
                  height={116}
                  className="object-contain"
                  data-ai-hint="made USA badge"
                  draggable="false"
                />
              </div>
               <p className="text-sm text-center text-muted-foreground">Produk bermutu, terjamin oleh sertifikasi BPOM dan HALAL. Bayar di tempat.</p>
            </div>

          </div>

          {/* Right Column: Order Form */}
          <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="mb-4 text-center">
              <Image
                src="https://w.ladicdn.com/6635dc99ef5f4900127bad81/isiform-1-1-20230512154607-yofc8-20230608094706-kpnyd-20250514082248-i0ath.gif"
                alt="Isi Formulir Pemesanan"
                width={400} 
                height={70} 
                className="mx-auto"
                unoptimized
                data-ai-hint="form fill instruction"
                draggable="false"
              />
            </div>
            <OrderForm />
             <div className="mt-6 p-4 bg-red-500/10 text-red-700 rounded-md text-sm">
              <p className="font-bold flex items-center"><AlertCircle size={18} className="mr-2"/>KERUGIAN JIKA TIDAK BELI HARI INI!</p>
              <ul className="list-disc list-inside ml-4 mt-1">
                <li>Diskon Harga BERAKHIR</li>
                <li>Gratis Ongkir BERAKHIR</li>
                <li>Kehilangan Website ini</li>
              </ul>
            </div>
            <p className="mt-4 text-sm text-center text-accent font-semibold">
             Jadilah sehat! Kesehatan adalah hal terbaik yang bisa Anda miliki. Uang sebanyak apa pun takkan bisa memberikan Anda kebahagiaan tanpa kesehatan.
            </p>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default OrderFormSection;
