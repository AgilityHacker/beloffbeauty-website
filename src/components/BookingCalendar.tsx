'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Clock, Calendar as CalendarIcon } from 'lucide-react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, isBefore, isAfter, addDays } from 'date-fns';

interface TimeSlot {
  time: string;
  available: boolean;
}

interface BookingCalendarProps {
  selectedService?: string;
  onSelectDateTime?: (date: Date, time: string) => void;
}

export default function BookingCalendar({ selectedService, onSelectDateTime }: BookingCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);

  // Generate time slots (this would come from your backend)
  const generateTimeSlots = (date: Date): TimeSlot[] => {
    const slots: TimeSlot[] = [];
    const startHour = 9; // 9 AM
    const endHour = 18; // 6 PM
    
    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        // Mock availability - in real app, fetch from backend
        const available = Math.random() > 0.3;
        slots.push({ time, available });
      }
    }
    
    return slots;
  };

  useEffect(() => {
    if (selectedDate) {
      setAvailableSlots(generateTimeSlots(selectedDate));
    }
  }, [selectedDate]);

  const handleDateSelect = (date: Date) => {
    if (isBefore(date, new Date()) && !isToday(date)) return;
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    if (selectedDate && onSelectDateTime) {
      const [hours, minutes] = time.split(':').map(Number);
      const dateTime = new Date(selectedDate);
      dateTime.setHours(hours, minutes, 0, 0);
      onSelectDateTime(dateTime, time);
    }
  };

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Add padding days for calendar grid
  const startPadding = monthStart.getDay();
  const paddingDays = Array(startPadding).fill(null);

  return (
    <div className="bg-white rounded-2xl shadow-soft p-6">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-charcoal-900">
          Select Date & Time
        </h3>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Previous month"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-charcoal-700 font-medium min-w-[150px] text-center">
            {format(currentMonth, 'MMMM yyyy')}
          </span>
          <button
            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Next month"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="mb-6">
        {/* Day headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="text-center text-sm font-medium text-charcoal-600 py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar days */}
        <div className="grid grid-cols-7 gap-1">
          {paddingDays.map((_, index) => (
            <div key={`padding-${index}`} className="aspect-square" />
          ))}
          {monthDays.map((day) => {
            const isDisabled = isBefore(day, new Date()) && !isToday(day);
            const isSelected = selectedDate && day.toDateString() === selectedDate.toDateString();
            const isCurrentDay = isToday(day);

            return (
              <motion.button
                key={day.toString()}
                whileHover={!isDisabled ? { scale: 1.05 } : {}}
                whileTap={!isDisabled ? { scale: 0.95 } : {}}
                onClick={() => handleDateSelect(day)}
                disabled={isDisabled}
                className={`
                  aspect-square rounded-lg flex items-center justify-center
                  transition-all duration-200 text-sm font-medium
                  ${isDisabled ? 'text-gray-300 cursor-not-allowed' : 'hover:bg-blush-50 cursor-pointer'}
                  ${isSelected ? 'bg-blush-600 text-white hover:bg-blush-700' : ''}
                  ${isCurrentDay && !isSelected ? 'bg-blush-100 text-blush-700' : ''}
                  ${!isDisabled && !isSelected && !isCurrentDay ? 'text-charcoal-700' : ''}
                `}
              >
                {format(day, 'd')}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Time Slots */}
      <AnimatePresence mode="wait">
        {selectedDate && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="border-t pt-6">
              <div className="flex items-center mb-4">
                <CalendarIcon className="w-5 h-5 text-charcoal-600 mr-2" />
                <span className="text-charcoal-700 font-medium">
                  {format(selectedDate, 'EEEE, MMMM d, yyyy')}
                </span>
              </div>

              <h4 className="text-sm font-medium text-charcoal-700 mb-3">
                Available Time Slots
              </h4>

              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {availableSlots.map((slot) => (
                  <motion.button
                    key={slot.time}
                    whileHover={slot.available ? { scale: 1.05 } : {}}
                    whileTap={slot.available ? { scale: 0.95 } : {}}
                    onClick={() => slot.available && handleTimeSelect(slot.time)}
                    disabled={!slot.available}
                    className={`
                      py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200
                      ${!slot.available ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : ''}
                      ${slot.available && selectedTime === slot.time 
                        ? 'bg-blush-600 text-white' 
                        : slot.available 
                          ? 'bg-blush-50 text-charcoal-700 hover:bg-blush-100' 
                          : ''
                      }
                    `}
                  >
                    {slot.time}
                  </motion.button>
                ))}
              </div>

              {selectedTime && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-6 p-4 bg-blush-50 rounded-lg"
                >
                  <div className="flex items-center text-blush-700">
                    <Clock className="w-5 h-5 mr-2" />
                    <span className="font-medium">
                      Selected: {format(selectedDate, 'MMM d')} at {selectedTime}
                    </span>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}