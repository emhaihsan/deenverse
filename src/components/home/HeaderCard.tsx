// components/Home/HeaderCard.tsx
"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { AdhanService } from "@/lib/adhan";
import { Coordinates } from "adhan";
import { Loader2, MapPin } from "lucide-react";

// Fungsi untuk format tanggal Hijriah
const formatHijri = (date: Date) => {
  const formatter = new Intl.DateTimeFormat("id-u-ca-islamic", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return formatter.format(date);
};

export default function HeaderCard() {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [location, setLocation] = useState<Coordinates | null>(null);
  const [locationName, setLocationName] = useState<string>(
    "Mengambil lokasi..."
  );
  const [nextPrayer, setNextPrayer] = useState<{
    name: string;
    time: Date;
  } | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<string>("");
  const [isPrayerTime, setIsPrayerTime] = useState<boolean>(false);

  useEffect(() => {
    const getLocationName = async (lat: number, lng: number) => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`
        );
        const data = await response.json();

        // Try to get the most specific location name available
        const locationName =
          data.address.city ||
          data.address.town ||
          data.address.village ||
          data.address.county ||
          data.address.state ||
          "Lokasi tidak diketahui";

        setLocationName(locationName);
      } catch (error) {
        console.error("Error getting location name:", error);
        setLocationName("Lokasi tidak diketahui");
      }
    };

    if (location) {
      getLocationName(location.latitude, location.longitude);
    }
  }, [location]);

  // Update waktu setiap detik
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

  // Ambil lokasi pengguna
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = new Coordinates(
            position.coords.latitude,
            position.coords.longitude
          );
          setLocation(coords);
        },
        (error) => {
          console.error("Error getting location:", error);
          // Default ke Jakarta
          setLocation(new Coordinates(-6.2088, 106.8456));
        }
      );
    } else {
      // Default ke Jakarta
      setLocation(new Coordinates(-6.2088, 106.8456));
    }
  }, []);

  // Hitung jadwal sholat
  useEffect(() => {
    if (!location) return;

    const adhanService = new AdhanService();
    const next = adhanService.getNextPrayer(currentDate, location);
    setNextPrayer(next);
  }, [location, currentDate]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const coords = new Coordinates(
            position.coords.latitude,
            position.coords.longitude
          );
          setLocation(coords);
        },
        (error) => {
          console.error("Error getting location:", error);
          // Default to Jakarta
          const jakartaCoords = new Coordinates(-6.2088, 106.8456);
          setLocation(jakartaCoords);
          setLocationName("Jakarta, Indonesia");
        }
      );
    } else {
      // Default to Jakarta if geolocation is not supported
      const jakartaCoords = new Coordinates(-6.2088, 106.8456);
      setLocation(jakartaCoords);
      setLocationName("Jakarta, Indonesia");
    }
  }, []);

  // Format tanggal Gregorian
  const formatGregorian = (date: Date) => {
    return format(date, "d MMMM yyyy", { locale: id });
  };

  // Dapatkan nama hari
  const getHari = (date: Date) => {
    return format(date, "EEEE", { locale: id });
  };

  if (!location) {
    return (
      <div className="bg-[#03533d] rounded-xl overflow-hidden border-b-6 border-gray-900-900 p-6 animate-pulse">
        <div className="h-6 bg-white/10 rounded-lg w-1/2 mb-4"></div>
        <div className="h-4 bg-white/10 rounded-lg w-3/4"></div>
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
            <div className="text-3xl font-bold mb-1">
              {getHari(currentDate).toUpperCase()}
            </div>
            <div className="text-emerald-100">
              {formatGregorian(currentDate)} / {formatHijri(currentDate)}
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
