'use client';

import { useState, useEffect } from 'react';
import { Clock, Calendar, ChevronLeft, ChevronRight, Settings, Globe, Sun, Moon, MapPin } from 'lucide-react';

interface TimeZoneOption {
  id: string;
  name: string;
  nameLocal: string;
  timezone: string;
  flag: string;
}

const timeZones: TimeZoneOption[] = [
  {
    id: 'afghanistan',
    name: 'Afghanistan Time',
    nameLocal: 'وقت افغانستان',
    timezone: 'Asia/Kabul',
    flag: '🇦🇫'
  },
  {
    id: 'iran',
    name: 'Iran Time',
    nameLocal: 'وقت ایران',
    timezone: 'Asia/Tehran',
    flag: '🇮🇷'
  }
];

export default function Home() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedTimezone, setSelectedTimezone] = useState<TimeZoneOption>(timeZones[0]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [showSettings, setShowSettings] = useState(false);
  const [calendarType, setCalendarType] = useState<'solar' | 'lunar' | 'gregorian'>('solar');

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const localTime = new Date(now.toLocaleString("en-US", {timeZone: selectedTimezone.timezone}));
      setCurrentTime(localTime);
    }, 1000);

    return () => clearInterval(timer);
  }, [selectedTimezone]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: true,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  const formatAfghanDate = (date: Date) => {
    // Afghanistan uses Solar Hijri calendar (similar to Iran but with some differences)
    const solarMonths = [
      'حمل', 'ثور', 'جوزا', 'سرطان', 'اسد', 'سنبله',
      'میزان', 'عقرب', 'قوس', 'جدی', 'دلو', 'حوت'
    ];
    
    const lunarMonths = [
      'محرم', 'صفر', 'ربیع الاول', 'ربیع الثانی', 'جمادی الاول', 'جمادی الثانی',
      'رجب', 'شعبان', 'رمضان', 'شوال', 'ذیقعده', 'ذیالحجه'
    ];

    const weekDays = ['یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه', 'شنبه'];
    
    return {
      solar: '۱۴۰۳ جوزا ۹ پنج‌شنبه',
      gregorian: date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      lunar: '۱۴۴۶ ذیالحجه ۱ الخمیس',
      weekDay: weekDays[date.getDay()],
      currentMonth: solarMonths[5] // Jauza (Gemini)
    };
  };

  const afghanOccasions = [
    'روز استقلال افغانستان',
    'روز شهدای مقاومت',
    'روز زبان دری',
    'روز فرهنگ و تمدن افغانستان',
    'روز وحدت ملی',
    'روز صلح و آشتی',
    'روز کارگر افغانستان',
    'روز زن افغان'
  ];

  const generateCalendarDays = () => {
    // Generate Afghan solar calendar days
    const days = [];
    for (let i = 1; i <= 31; i++) {
      days.push({
        solar: convertToAfghanNumerals(i.toString()),
        gregorian: (i + 20).toString(),
        isToday: i === 9,
        isHoliday: i === 1 || i === 15 || i === 28,
        isCurrentMonth: true
      });
    }
    return days;
  };

  const convertToAfghanNumerals = (num: string) => {
    const afghanNumerals = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return num.replace(/\d/g, (digit) => afghanNumerals[parseInt(digit)]);
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      newMonth.setMonth(prev.getMonth() + (direction === 'next' ? 1 : -1));
      return newMonth;
    });
  };

  const dateInfo = formatAfghanDate(currentTime);
  const calendarDays = generateCalendarDays();

  const getPrayerTimes = () => {
    return {
      fajr: '۰۴:۳۰',
      sunrise: '۰۵:۴۵',
      dhuhr: '۱۲:۱۵',
      asr: '۱۶:۳۰',
      maghrib: '۱۹:۰۰',
      isha: '۲۰:۳۰'
    };
  };

  const prayerTimes = getPrayerTimes();

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 relative overflow-hidden">
      {/* Enhanced Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Top decorative leaves */}
        <div className="absolute -top-8 left-0 w-full h-32">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className={`absolute opacity-20 transform rotate-${i * 15}`}
              style={{
                left: `${i * 8 + 5}%`,
                top: `${Math.sin(i) * 20 + 10}px`,
                transform: `rotate(${i * 30}deg) scale(${0.8 + Math.random() * 0.4})`
              }}
            >
              <svg width="40" height="60" viewBox="0 0 40 60" className="fill-green-400">
                <path d="M20 5 Q30 15 35 30 Q30 45 20 55 Q10 45 5 30 Q10 15 20 5 Z" />
                <path d="M20 5 Q25 20 20 35 Q15 20 20 5" className="fill-green-500" />
              </svg>
            </div>
          ))}
        </div>

        {/* Floating elements */}
        <div className="absolute top-20 right-10 w-16 h-16 opacity-10 animate-pulse">
          <div className="w-full h-full bg-gradient-to-br from-green-400 to-emerald-500 rounded-full"></div>
        </div>
        <div className="absolute top-40 left-20 w-12 h-12 opacity-15 animate-bounce">
          <div className="w-full h-full bg-gradient-to-br from-teal-400 to-green-500 rounded-full"></div>
        </div>
      </div>

      <div className="relative z-10">
        {/* Enhanced Header */}
        <header className="bg-white/90 backdrop-blur-lg shadow-lg border-b border-green-100">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Clock className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                    TIME.AF
                  </h1>
                  <p className="text-sm text-gray-600" dir="rtl">ساعت و تقویم افغانستان</p>
                </div>
              </div>
              
              {/* Timezone Selector */}
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <select
                    value={selectedTimezone.id}
                    onChange={(e) => setSelectedTimezone(timeZones.find(tz => tz.id === e.target.value) || timeZones[0])}
                    className="appearance-none bg-white border border-green-200 rounded-lg px-4 py-2 pr-8 text-sm font-medium text-gray-700 hover:border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    {timeZones.map((tz) => (
                      <option key={tz.id} value={tz.id}>
                        {tz.flag} {tz.name}
                      </option>
                    ))}
                  </select>
                  <Globe className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
                
                <button 
                  onClick={() => setShowSettings(!showSettings)}
                  className="p-2 hover:bg-green-50 rounded-full transition-colors relative"
                >
                  <Settings className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Settings Panel */}
            {showSettings && (
              <div className="mt-4 p-4 bg-white rounded-lg shadow-lg border border-green-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-3" dir="rtl">تنظیمات</h3>
                <div className="flex flex-wrap gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2" dir="rtl">نوع تقویم</label>
                    <select
                      value={calendarType}
                      onChange={(e) => setCalendarType(e.target.value as 'solar' | 'lunar' | 'gregorian')}
                      className="border border-gray-300 rounded-md px-3 py-1 text-sm"
                    >
                      <option value="solar">تقویم خورشیدی</option>
                      <option value="lunar">تقویم قمری</option>
                      <option value="gregorian">تقویم میلادی</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-800 mb-3" dir="rtl">
              ساعت و تقویم افغانستان
            </h2>
            <div className="flex items-center justify-center space-x-4 mb-2">
              <span className="text-2xl">{selectedTimezone.flag}</span>
              <p className="text-green-600 font-semibold text-lg" dir="rtl">
                {selectedTimezone.nameLocal}
              </p>
            </div>
            <p className="text-gray-600" dir="rtl">
              پنج‌شنبه ۹ جوزا ۱۴۰۳
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8 mb-8">
            {/* Enhanced Time Display */}
            <div className="xl:col-span-2">
              <div className="bg-white rounded-3xl shadow-xl p-8 border border-green-100">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Analog Clock */}
                  <div className="text-center">
                    <div className="relative w-56 h-56 mx-auto mb-6">
                      <div className="absolute inset-0 rounded-full border-8 border-gradient-to-br from-green-200 to-emerald-200 bg-gradient-to-br from-white to-gray-50 shadow-inner">
                        {/* Enhanced Clock Numbers */}
                        {[12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((num, index) => (
                          <div
                            key={num}
                            className="absolute w-8 h-8 flex items-center justify-center text-lg font-bold text-gray-700 bg-white rounded-full shadow-sm"
                            style={{
                              top: `${50 - 38 * Math.cos((index * 30 - 90) * Math.PI / 180)}%`,
                              left: `${50 + 38 * Math.sin((index * 30 - 90) * Math.PI / 180)}%`,
                              transform: 'translate(-50%, -50%)'
                            }}
                          >
                            {num}
                          </div>
                        ))}
                        
                        {/* Clock Center */}
                        <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full transform -translate-x-1/2 -translate-y-1/2 z-30 shadow-lg"></div>
                        
                        {/* Enhanced Clock Hands */}
                        <div
                          className="absolute top-1/2 left-1/2 w-1.5 bg-gradient-to-t from-gray-800 to-gray-600 rounded-full transform-gpu origin-bottom z-20 shadow-lg"
                          style={{
                            height: '28%',
                            marginTop: '-28%',
                            marginLeft: '-3px',
                            transform: `translate(-50%, 0) rotate(${(currentTime.getHours() % 12) * 30 + currentTime.getMinutes() * 0.5}deg)`
                          }}
                        ></div>
                        
                        <div
                          className="absolute top-1/2 left-1/2 w-1 bg-gradient-to-t from-gray-700 to-gray-500 rounded-full transform-gpu origin-bottom z-20 shadow-md"
                          style={{
                            height: '38%',
                            marginTop: '-38%',
                            marginLeft: '-2px',
                            transform: `translate(-50%, 0) rotate(${currentTime.getMinutes() * 6}deg)`
                          }}
                        ></div>
                        
                        <div
                          className="absolute top-1/2 left-1/2 w-0.5 bg-gradient-to-t from-green-500 to-emerald-500 rounded-full transform-gpu origin-bottom z-20 shadow-sm"
                          style={{
                            height: '42%',
                            marginTop: '-42%',
                            marginLeft: '-1px',
                            transform: `translate(-50%, 0) rotate(${currentTime.getSeconds() * 6}deg)`
                          }}
                        ></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-lg font-semibold text-gray-700" dir="rtl">برج فلکی: جوزا</p>
                      <p className="text-sm text-gray-500" dir="rtl">فصل: بهار</p>
                    </div>
                  </div>

                  {/* Date Information */}
                  <div className="space-y-6">
                    <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
                      <h3 className="text-lg font-semibold text-gray-700 mb-2" dir="rtl">تاریخ خورشیدی</h3>
                      <p className="text-xl font-bold text-green-600" dir="rtl">۱۴۰۳/۰۳/۰۹</p>
                      <p className="text-sm text-gray-600" dir="rtl">پنج‌شنبه ۹ جوزا ۱۴۰۳</p>
                    </div>

                    <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
                      <h3 className="text-lg font-semibold text-gray-700 mb-2" dir="rtl">تاریخ قمری</h3>
                      <p className="text-xl font-bold text-blue-600" dir="rtl">۱۴۴۶/۱۲/۰۱</p>
                      <p className="text-sm text-gray-600" dir="rtl">الخمیس ۱ ذیالحجه ۱۴۴۶</p>
                    </div>

                    <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
                      <h3 className="text-lg font-semibold text-gray-700 mb-2">تاریخ میلادی</h3>
                      <p className="text-xl font-bold text-purple-600">2025-05-30</p>
                      <p className="text-sm text-gray-600">Thursday, May 30, 2025</p>
                    </div>
                  </div>
                </div>

                {/* Digital Time Display */}
                <div className="mt-8 text-center">
                  <div className="text-6xl font-bold text-gray-800 font-mono tracking-wider mb-2 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                    {formatTime(currentTime)}
                  </div>
                  <p className="text-lg text-gray-600 font-medium">
                    {selectedTimezone.name}
                  </p>
                </div>

                <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                  <p className="text-sm text-gray-700 text-center leading-relaxed" dir="rtl">
                    «وقت مانند طلا است، آن را هدر ندهید و از هر لحظه‌اش بهترین استفاده را بکنید.»
                  </p>
                  <div className="mt-2 text-center">
                    <span className="text-green-600 text-xs font-medium">حکمت افغانی</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Prayer Times */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-green-100">
                <h3 className="text-xl font-bold text-gray-800 mb-6 text-center flex items-center justify-center gap-2" dir="rtl">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <Sun className="w-4 h-4 text-white" />
                  </div>
                  اوقات شرعی
                </h3>
                <div className="space-y-4">
                  {[
                    { name: 'فجر', time: prayerTimes.fajr, icon: '🌅' },
                    { name: 'طلوع آفتاب', time: prayerTimes.sunrise, icon: '☀️' },
                    { name: 'ظهر', time: prayerTimes.dhuhr, icon: '🌞' },
                    { name: 'عصر', time: prayerTimes.asr, icon: '🌇' },
                    { name: 'مغرب', time: prayerTimes.maghrib, icon: '🌅' },
                    { name: 'عشاء', time: prayerTimes.isha, icon: '🌙' }
                  ].map((prayer, index) => (
                    <div key={index} className="flex items-center justify-between p-3 hover:bg-green-50 rounded-lg transition-colors">
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{prayer.icon}</span>
                        <span className="font-medium text-gray-700" dir="rtl">{prayer.name}</span>
                      </div>
                      <span className="font-bold text-green-600" dir="rtl">{prayer.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Weather Widget */}
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-green-100">
                <h3 className="text-lg font-bold text-gray-800 mb-4 text-center" dir="rtl">آب و هوای کابل</h3>
                <div className="text-center">
                  <div className="text-4xl mb-2">☀️</div>
                  <div className="text-2xl font-bold text-gray-800 mb-1">۲۸°C</div>
                  <p className="text-sm text-gray-600" dir="rtl">آفتابی</p>
                  <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                    <div className="text-center">
                      <p className="text-gray-500" dir="rtl">رطوبت</p>
                      <p className="font-semibold">۴۵٪</p>
                    </div>
                    <div className="text-center">
                      <p className="text-gray-500" dir="rtl">باد</p>
                      <p className="font-semibold" dir="rtl">۱۲ کم/س</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Enhanced Occasions */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-green-100">
              <h3 className="text-xl font-bold text-gray-800 mb-6 text-center" dir="rtl">
                مناسبت‌های ماه جوزا
              </h3>
              <div className="space-y-4">
                {afghanOccasions.map((occasion, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 hover:bg-green-50 rounded-xl transition-colors group">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 group-hover:scale-110 transition-transform">
                      {convertToAfghanNumerals((index + 1).toString())}
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-700 font-medium leading-relaxed" dir="rtl">{occasion}</p>
                      <p className="text-xs text-gray-500 mt-1" dir="rtl">
                        {convertToAfghanNumerals((index + 5).toString())} جوزا
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Enhanced Calendar */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-green-100">
              <div className="flex items-center justify-between mb-6">
                <button 
                  onClick={() => navigateMonth('prev')}
                  className="p-3 hover:bg-green-50 rounded-full transition-colors group"
                >
                  <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-green-600" />
                </button>
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-800" dir="rtl">جوزا ۱۴۰۳</h3>
                  <p className="text-sm text-gray-600">May - June 2025</p>
                  <p className="text-xs text-gray-500" dir="rtl">ذیالحجه ۱۴۴۶</p>
                </div>
                <button 
                  onClick={() => navigateMonth('next')}
                  className="p-3 hover:bg-green-50 rounded-full transition-colors group"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-600 group-hover:text-green-600" />
                </button>
              </div>

              {/* Calendar Header */}
              <div className="grid grid-cols-7 gap-1 mb-3">
                {['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'].map((day) => (
                  <div key={day} className="bg-gradient-to-br from-green-500 to-emerald-600 text-white text-center py-3 text-sm font-bold rounded-lg shadow-sm">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1">
                {calendarDays.slice(0, 35).map((day, index) => (
                  <div
                    key={index}
                    className={`
                      aspect-square flex flex-col items-center justify-center text-sm rounded-lg transition-all cursor-pointer group
                      ${day.isToday ? 'bg-gradient-to-br from-green-500 to-emerald-600 text-white font-bold shadow-lg scale-105' : ''}
                      ${day.isHoliday && !day.isToday ? 'text-red-500 font-semibold bg-red-50' : ''}
                      ${!day.isToday && !day.isHoliday ? 'text-gray-700 hover:bg-green-50 hover:scale-105' : ''}
                    `}
                  >
                    <span className="text-lg group-hover:scale-110 transition-transform">{day.solar}</span>
                    <span className="text-xs opacity-60">{day.gregorian}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between mt-6 text-xs text-gray-500">
                <span dir="rtl">ماه بعد ←</span>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span dir="rtl">امروز</span>
                  <div className="w-3 h-3 bg-red-500 rounded-full ml-4"></div>
                  <span dir="rtl">تعطیل</span>
                </div>
                <span dir="rtl">→ ماه قبل</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}