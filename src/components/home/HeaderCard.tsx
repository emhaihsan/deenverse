// components/Home/HeaderCard.tsx
"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { AdhanService } from "@/lib/adhan";
import { Coordinates } from "adhan";
import { MapPin, RefreshCw } from "lucide-react";

// Hari dalam Arab (urutan Senin-Minggu: Senin=0 di JS)
const hariArab = [
  "الاثنين", // Senin
  "الثلاثاء", // Selasa
  "الأربعاء", // Rabu
  "الخميس", // Kamis
  "الجمعة", // Jumat
  "السبت", // Sabtu
  "الأحد", // Minggu
];

// Nama bulan hijriah dalam Arab
const bulanHijriArab = [
  "محرم",
  "صفر",
  "ربيع الأول",
  "ربيع الآخر",
  "جمادى الأولى",
  "جمادى الآخرة",
  "رجب",
  "شعبان",
  "رمضان",
  "شوال",
  "ذو القعدة",
  "ذو الحجة",
];

export default function HeaderCard() {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [location, setLocation] = useState<Coordinates | null>(null);
  const [loadingLocation, setLoadingLocation] = useState(true);
  const [locationName, setLocationName] = useState<string>(
    "Mengambil lokasi..."
  );
  const [errorLocation, setErrorLocation] = useState<boolean>(false);
  const [nextPrayer, setNextPrayer] = useState<{
    name: string;
    time: Date;
  } | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<string>("");
  const [isPrayerTime, setIsPrayerTime] = useState<boolean>(false);

  const fetchLocation = () => {
    setLoadingLocation(true);
    setErrorLocation(false);
    setLocationName("Mengambil lokasi...");

    const getLocationName = async (lat: number, lng: number) => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`
        );
        const data = await response.json();
        const address = data.address;
        const locationString = `${
          address.city || address.town || address.village
        }, ${address.state}`;
        setLocationName(locationString);
      } catch (err: unknown) {
        console.error("Error fetching location name:", err);
        setLocationName("Gagal mengambil nama lokasi");
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const coords = new Coordinates(latitude, longitude);
          setLocation(coords);
          await getLocationName(latitude, longitude);
          setLoadingLocation(false);
        },
        () => {
          setErrorLocation(true);
          setLocationName(
            "Lokasi tidak ditemukan. Coba refresh & izinkan akses lokasi."
          );
          setLoadingLocation(false);
        }
      );
    } else {
      setErrorLocation(true);
      setLocationName("Geolocation tidak didukung oleh browser ini.");
      setLoadingLocation(false);
    }
  };

  useEffect(() => {
    fetchLocation();

    // Timer for date and prayer times
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentDate(now);

      if (nextPrayer) {
        const diff = nextPrayer.time.getTime() - now.getTime();

        // Jika waktu sholat sudah tiba (dalam 1 menit pertama)
        if (diff <= 0 && diff > -60000) {
          setIsPrayerTime(true);
          setTimeRemaining(`${nextPrayer.name} telah tiba!`);
        } else {
          setIsPrayerTime(false);
          // Hitung waktu tersisa
          const seconds = Math.floor(Math.abs(diff) / 1000);
          const minutes = Math.floor(seconds / 60);
          const hours = Math.floor(minutes / 60);
          const remainingMinutes = minutes % 60;
          const remainingSeconds = seconds % 60;

          if (diff > 0) {
            setTimeRemaining(
              `${
                hours > 0 ? `${hours}j ` : ""
              }${remainingMinutes}m ${remainingSeconds}s lagi`
            );
          } else {
            setTimeRemaining(
              `Terlewat ${
                hours > 0 ? `${hours}j ` : ""
              }${remainingMinutes}m ${remainingSeconds}s`
            );
          }
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [nextPrayer]);

  useEffect(() => {
    if (!location) return;

    const adhanService = new AdhanService();
    const next = adhanService.getNextPrayer(currentDate, location);
    setNextPrayer(next);
  }, [location, currentDate]);

  // Format tanggal Gregorian
  const formatGregorian = (date: Date) => {
    return format(date, "d MMMM yyyy", { locale: id });
  };

  // Dapatkan nama hari
  const getHari = (date: Date) => {
    return format(date, "EEEE", { locale: id });
  };

  // Dapatkan hari dalam Arab (Senin=0, Minggu=6 di JS: getDay())
  const getHariArab = (date: Date) => {
    // JS: Minggu=0, Senin=1, ..., Sabtu=6
    const jsDay = date.getDay(); // 0-6
    // urutan arab: Senin(0), ..., Minggu(6)
    // kita mapping: JS(0/Minggu) => Arab(6), JS(1/Senin) => Arab(0), dst
    const mapJsToArab = [6, 0, 1, 2, 3, 4, 5];
    return hariArab[mapJsToArab[jsDay]];
  };

  if (loadingLocation) {
    return (
      <div className="bg-[#03533d] rounded-xl overflow-hidden border-b-6 border-gray-900-900 p-6 animate-pulse">
        <div className="h-6 bg-white/10 rounded-lg w-1/2 mb-4"></div>
        <div className="h-4 bg-white/10 rounded-lg w-3/4"></div>
      </div>
    );
  }

  if (errorLocation) {
    return (
      <div className="bg-[#03533d] text-white rounded-xl overflow-hidden border-b-6 border-gray-900 p-6 flex flex-col items-center space-y-3">
        <div className="flex items-center text-yellow-300 text-sm space-x-2">
          <MapPin className="w-4 h-4" />
          <span>{locationName}</span>
        </div>
        <button
          className="flex items-center px-4 py-2 bg-white/10 rounded-lg text-emerald-100 hover:bg-white/20 transition-colors"
          onClick={fetchLocation}
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh Lokasi
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#03533d] text-white rounded-xl overflow-hidden border-b-6 border-gray-900 p-6 transition-all duration-300">
      <div className="flex flex-col space-y-4">
        {/* Top Bar - Date and Location */}
        <div className="flex justify-between items-start">
          {/* Date Section */}
          <div>
            <div className="text-3xl font-bold mb-1 flex items-center space-x-3">
              <span>{getHari(currentDate).toUpperCase()}</span>/&nbsp;
              <span className="text-2xl text-white font-normal" dir="rtl">
                {getHariArab(currentDate)}
              </span>
            </div>
            <div className="text-emerald-100">
              {formatGregorian(currentDate)}
              <span className="mx-1">/</span>
              {/* Hijriah: Indonesia dan Arab */}
              <span>
                {(() => {
                  const hijriFormatter = new Intl.DateTimeFormat(
                    "en-TN-u-ca-islamic",
                    {
                      day: "numeric",
                      month: "numeric",
                      year: "numeric",
                    }
                  );
                  const parts = hijriFormatter.formatToParts(currentDate);
                  const day = parts.find((p) => p.type === "day")?.value || "";
                  const monthIdx =
                    parseInt(
                      parts.find((p) => p.type === "month")?.value || "1",
                      10
                    ) - 1;
                  const year =
                    parts.find((p) => p.type === "year")?.value || "";
                  const bulanArab = bulanHijriArab[monthIdx] || "";
                  return (
                    <>
                      <span
                        dir="rtl"
                        lang="ar"
                        className="font-arabic"
                      >{`${day} ${bulanArab} ${year} هـ`}</span>
                    </>
                  );
                })()}
              </span>
            </div>
          </div>

          {/* Location Section */}
          <div className="text-right">
            <div className="flex items-center justify-end space-x-1 text-emerald-100">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{locationName}</span>
            </div>
          </div>
        </div>

        {/* Next Prayer Section */}
        {nextPrayer && (
          <div
            className={`bg-white/10 p-4 rounded-lg ${
              isPrayerTime ? "animate-pulse" : ""
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-emerald-100 mb-1">
                  Sholat Berikutnya
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xl font-bold">{nextPrayer.name}</span>
                  <span className="text-emerald-200">•</span>
                  <span className="text-xl font-mono">
                    {format(nextPrayer.time, "HH:mm")}
                  </span>
                </div>
              </div>
              <div
                className={`text-sm font-medium ${
                  isPrayerTime
                    ? "text-yellow-300 font-bold"
                    : "text-emerald-100"
                }`}
              >
                {timeRemaining}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
