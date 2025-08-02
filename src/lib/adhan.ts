// lib/adhan.ts
import {
    Coordinates,
    CalculationMethod,
    PrayerTimes,
    Prayer,
    CalculationParameters
  } from "adhan";
  
  export class AdhanService {
    private params: CalculationParameters;
  
    constructor() {
      this.params = CalculationMethod.MuslimWorldLeague();
    }
  
getPrayerTimes(date: Date, coordinates: Coordinates): PrayerTimes {
  // Correct parameter order for PrayerTimes: coordinates, params, date
  return new PrayerTimes(coordinates, date, this.params);}
  
    getNextPrayer(date: Date, coordinates: Coordinates): { name: string; time: Date } | null {
      const prayerTimes = this.getPrayerTimes(date, coordinates);
      
      const prayers = [
        { name: "Subuh", time: prayerTimes.fajr },
        { name: "Dzuhur", time: prayerTimes.dhuhr },
        { name: "Ashar", time: prayerTimes.asr },
        { name: "Maghrib", time: prayerTimes.maghrib },
        { name: "Isya", time: prayerTimes.isha },
      ];
  
      // Cari sholat berikutnya
      for (const prayer of prayers) {
        if (prayer.time > date) {
          return prayer;
        }
      }
  
      // Jika sudah lewat Isya, kembalikan Subuh besok
      const tomorrow = new Date(date);
      tomorrow.setDate(tomorrow.getDate() + 1);
      return { 
        name: "Subuh", 
        time: this.getPrayerTimes(tomorrow, coordinates).fajr 
      };
    }
  
    getCurrentPrayer(date: Date, coordinates: Coordinates): { name: string; time: Date } | null {
      const prayerTimes = this.getPrayerTimes(date, coordinates);
      const current = prayerTimes.currentPrayer(date);
      
      if (!current || current === "none") return null;
  
      const prayerMap = {
        [Prayer.Fajr]: { name: "Subuh", time: prayerTimes.fajr },
        [Prayer.Sunrise]: { name: "Terbit", time: prayerTimes.sunrise },
        [Prayer.Dhuhr]: { name: "Dzuhur", time: prayerTimes.dhuhr },
        [Prayer.Asr]: { name: "Ashar", time: prayerTimes.asr },
        [Prayer.Maghrib]: { name: "Maghrib", time: prayerTimes.maghrib },
        [Prayer.Isha]: { name: "Isya", time: prayerTimes.isha }
      };
  
      return prayerMap[current] || null;
    }
  }