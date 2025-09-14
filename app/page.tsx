'use client';

import { useState, useEffect } from 'react';
import { Clock, Calendar, ChevronLeft, ChevronRight, Settings } from 'lucide-react';

export default function Home() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: true,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  const formatPersianDate = (date: Date) => {
    return {
      persian: '۱۴۰۴ خرداد ۸ پنج شنبه',
      gregorian: date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      lunar: '۱۴۴۶ ذیالحجه ۳۰ الخمیس',
    };
  };

  const occasions = [
    'روز بهره وری و بهینه سازی مصرف',
    'روز برکزداشت ماصدرا',
    'فرورفتن ساختمان متروپل در آبادان',
    'فتح خرمشهر در عملیات بیت المقدس و رفع محاصره',
    'روز درفش، روز مقاومت و پایداری',
    'خرداد روز خلسن خردادگان',
  ];

  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days = [];
    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      days.push(date);
    }
    return days;
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      newMonth.setMonth(prev.getMonth() + (direction === 'next' ? 1 : -1));
      return newMonth;
    });
  };

  const dateInfo = formatPersianDate(currentTime);
  const calendarDays = generateCalendarDays();
  const today = new Date();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-32 overflow-hidden pointer-events-none">
        <div className="absolute -top-16 -left-16 w-64 h-64 opacity-10">
          <svg viewBox="0 0 200 200" className="w-full h-full fill-green-500 transform rotate-12">
            <path d="M100,20 Q120,40 140,60 Q120,80 100,100 Q80,80 60,60 Q80,40 100,20 Z"/>
            <path d="M80,60 Q100,80 120,100 Q100,120 80,140 Q60,120 40,100 Q60,80 80,60 Z"/>
          </svg>
        </div>
        <div className="absolute -top-8 right-16 w-48 h-48 opacity-15">
          <svg viewBox="0 0 200 200" className="w-full h-full fill-green-400 transform -rotate-45">
            <path d="M100,20 Q130,50 160,80 Q130,110 100,140 Q70,110 40,80 Q70,50 100,20 Z"/>
          </svg>
        </div>
        <div className="absolute top-8 left-1/3 w-32 h-32 opacity-20">
          <svg viewBox="0 0 100 100" className="w-full h-full fill-green-600">
            <ellipse cx="50" cy="25" rx="30" ry="15" transform="rotate(45 50 25)"/>
            <ellipse cx="30" cy="60" rx="25" ry="12" transform="rotate(-30 30 60)"/>
            <ellipse cx="70" cy="70" rx="20" ry="10" transform="rotate(60 70 70)"/>
          </svg>
        </div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-green-600">TIME.IR</h1>
                  <p className="text-sm text-gray-600">ساعت و تقویم ایران</p>
                </div>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Settings className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2" dir="rtl">
              ساعت و تقویم ایران
            </h2>
            <p className="text-green-600 font-semibold" dir="rtl">
              پنج شنبه ۸ خرداد ۱۴۰۴
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Time Display */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="text-center">
                    <div className="relative w-48 h-48 mx-auto mb-4">
                      {/* Analog Clock */}
                      <div className="absolute inset-0 rounded-full border-4 border-gray-200 bg-gradient-to-br from-white to-gray-50">
                        {/* Clock Numbers */}
                        {[12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((num, index) => (
                          <div
                            key={num}
                            className="absolute w-6 h-6 flex items-center justify-center text-sm font-semibold text-gray-700"
                            style={{
                              top: `${50 - 35 * Math.cos((index * 30 - 90) * Math.PI / 180)}%`,
                              left: `${50 + 35 * Math.sin((index * 30 - 90) * Math.PI / 180)}%`,
                              transform: 'translate(-50%, -50%)'
                            }}
                          >
                            {num}
                          </div>
                        ))}
                        
                        {/* Clock Center */}
                        <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-green-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 z-30"></div>
                        
                        {/* Hour Hand */}
                        <div
                          className="absolute top-1/2 left-1/2 w-1 bg-gray-800 rounded-full transform-gpu origin-bottom z-20"
                          style={{
                            height: '25%',
                            marginTop: '-25%',
                            marginLeft: '-2px',
                            transform: `translate(-50%, 0) rotate(${(currentTime.getHours() % 12) * 30 + currentTime.getMinutes() * 0.5}deg)`
                          }}
                        ></div>
                        
                        {/* Minute Hand */}
                        <div
                          className="absolute top-1/2 left-1/2 w-0.5 bg-gray-600 rounded-full transform-gpu origin-bottom z-20"
                          style={{
                            height: '35%',
                            marginTop: '-35%',
                            marginLeft: '-1px',
                            transform: `translate(-50%, 0) rotate(${currentTime.getMinutes() * 6}deg)`
                          }}
                        ></div>
                        
                        {/* Second Hand */}
                        <div
                          className="absolute top-1/2 left-1/2 w-0.5 bg-green-500 rounded-full transform-gpu origin-bottom z-20"
                          style={{
                            height: '40%',
                            marginTop: '-40%',
                            marginLeft: '-1px',
                            transform: `translate(-50%, 0) rotate(${currentTime.getSeconds() * 6}deg)`
                          }}
                        ></div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600" dir="rtl">برج فلکی: جوزا</p>
                  </div>

                  <div className="space-y-6">
                    <div className="text-center">
                      <h3 className="text-lg font-semibold text-gray-700 mb-2" dir="rtl">تاریخ قمری</h3>
                      <p className="text-gray-600" dir="rtl">۱۴۴۶/۱۲/۲</p>
                      <p className="text-sm text-gray-500" dir="rtl">الخمیس • ۳۰ ذیالحجه ۱۴۴۶</p>
                    </div>

                    <div className="text-center">
                      <h3 className="text-lg font-semibold text-gray-700 mb-2">تاریخ میلادی</h3>
                      <p className="text-gray-600">2025-05-29</p>
                      <p className="text-sm text-gray-500">Thursday • May 29, 2025</p>
                    </div>

                    <div className="text-center">
                      <h3 className="text-lg font-semibold text-gray-700 mb-2" dir="rtl">تاریخ خورشیدی</h3>
                      <p className="text-gray-600" dir="rtl">۱۴۰۴/۰۳/۰۸</p>
                      <p className="text-sm text-gray-500" dir="rtl">پنج شنبه ۸ خرداد ۱۴۰۴</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 text-center">
                  <div className="text-4xl font-bold text-gray-800 font-mono tracking-wider">
                    {formatTime(currentTime)}
                  </div>
                </div>

                <p className="mt-6 text-sm text-gray-600 text-center leading-relaxed" dir="rtl">
                  بچه‌ها کودک‌اند به پدر و مادرشان مهر می‌ورزند. وقتی بزرگ شدند آن‌ها را به محاکمه می‌کشند و گاهی نیز مورد بخشش قرار می‌دهند.
                </p>

                <div className="mt-4 text-center">
                  <span className="text-green-600 text-sm font-medium">امثال والدین</span>
                </div>
              </div>
            </div>

            {/* Digital Clock */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
                <div className="mb-4">
                  <div className="text-5xl font-bold text-gray-800 mb-2 font-mono">
                    01:00:07
                  </div>
                  <div className="text-lg text-gray-600">PM</div>
                </div>
                <div className="text-sm text-gray-500">Carpe Diem</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Occasions */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6 text-center" dir="rtl">
                مناسبت‌های ماه خرداد
              </h3>
              <div className="space-y-4">
                {occasions.map((occasion, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {index + 1}
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed" dir="rtl">{occasion}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Calendar */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <button 
                  onClick={() => navigateMonth('prev')}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                </button>
                <div className="text-center">
                  <h3 className="text-lg font-bold text-gray-800" dir="rtl">خرداد ۱۴۰۴</h3>
                  <p className="text-sm text-gray-600">May - June 2025</p>
                  <p className="text-xs text-gray-500" dir="rtl">۱۴۴۶ ذیالحجه • ذیالقعده</p>
                </div>
                <button 
                  onClick={() => navigateMonth('next')}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* Calendar Header */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'].map((day) => (
                  <div key={day} className="bg-green-500 text-white text-center py-2 text-sm font-medium rounded">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1">
                {[
                  { persian: '۲۷', gregorian: '17', isCurrentMonth: false },
                  { persian: '۲۸', gregorian: '18', isCurrentMonth: false },
                  { persian: '۲۹', gregorian: '19', isCurrentMonth: true },
                  { persian: '۳۰', gregorian: '20', isCurrentMonth: true },
                  { persian: '۳۱', gregorian: '21', isCurrentMonth: true },
                  { persian: '۱', gregorian: '22', isCurrentMonth: true },
                  { persian: '۲', gregorian: '23', isCurrentMonth: true, isRed: true },
                  { persian: '۳', gregorian: '24', isCurrentMonth: true },
                  { persian: '۴', gregorian: '25', isCurrentMonth: true },
                  { persian: '۵', gregorian: '26', isCurrentMonth: true },
                  { persian: '۶', gregorian: '27', isCurrentMonth: true },
                  { persian: '۷', gregorian: '28', isCurrentMonth: true },
                  { persian: '۸', gregorian: '29', isCurrentMonth: true, isToday: true },
                  { persian: '۹', gregorian: '30', isCurrentMonth: true, isRed: true },
                ].map((day, index) => (
                  <div
                    key={index}
                    className={`
                      aspect-square flex flex-col items-center justify-center text-sm rounded-lg transition-colors cursor-pointer
                      ${day.isToday ? 'bg-green-500 text-white font-bold' : ''}
                      ${day.isRed && !day.isToday ? 'text-red-500 font-semibold' : ''}
                      ${!day.isCurrentMonth ? 'text-gray-300' : day.isToday ? '' : 'text-gray-700 hover:bg-gray-100'}
                    `}
                  >
                    <span className="text-lg">{day.persian}</span>
                    <span className="text-xs opacity-60">{day.gregorian}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between mt-4 text-xs text-gray-500">
                <span dir="rtl">ماه بعد ←</span>
                <span dir="rtl">→ ماه قبل</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}