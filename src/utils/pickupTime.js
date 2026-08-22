/**
 * Pickup Time utilities for calculating realistic estimated preparation time
 * and dynamic scheduling time slots based on restaurant operating hours.
 */

export function getPickupScheduleInfo() {
  const now = new Date();
  const day = now.getDay(); // 0 = Sun, 1 = Mon ... 6 = Sat
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const currentMinutesFromMidnight = currentHour * 60 + currentMinute;

  // Operating Hours based on Super Crab Texas City
  let openHour = 11;
  let openMin = 30;
  let closeHour = 22;
  let closeMin = 30;

  if (day === 0) {
    // Sunday: 12:00 PM - 9:00 PM
    openHour = 12;
    openMin = 0;
    closeHour = 21;
    closeMin = 0;
  } else if (day === 5 || day === 6) {
    // Fri - Sat: 11:30 AM - 11:00 PM
    openHour = 11;
    openMin = 30;
    closeHour = 23;
    closeMin = 0;
  } else {
    // Mon - Thu: 11:30 AM - 10:30 PM
    openHour = 11;
    openMin = 30;
    closeHour = 22;
    closeMin = 30;
  }

  const openMinutes = openHour * 60 + openMin;
  const closeMinutes = closeHour * 60 + closeMin;
  const lastPickupMinutes = closeMinutes - 15; // Last pickup 15 mins before close

  const isOpenNow = currentMinutesFromMidnight >= openMinutes && currentMinutesFromMidnight <= lastPickupMinutes;
  const isBeforeOpen = currentMinutesFromMidnight < openMinutes;
  const isAfterClose = currentMinutesFromMidnight > lastPickupMinutes;

  const formatTimeSlot = (totalMinutes) => {
    const h = Math.floor(totalMinutes / 60);
    const m = totalMinutes % 60;
    const period = h >= 12 ? 'PM' : 'AM';
    const displayH = h % 12 === 0 ? 12 : h % 12;
    const displayM = m < 10 ? `0${m}` : m;
    return `${displayH}:${displayM} ${period}`;
  };

  // Calculate ASAP Display Label & Value
  let asapLabel = 'ASAP (~15-25 mins)';
  let asapValue = 'ASAP (Est. 15-25 mins)';

  if (isOpenNow) {
    const readyMin = currentMinutesFromMidnight + 20;
    const formattedReady = formatTimeSlot(readyMin);
    asapLabel = `ASAP (~15-25 mins: Ready by ~${formattedReady})`;
    asapValue = `ASAP (~${formattedReady})`;
  } else if (isBeforeOpen) {
    const openTimeStr = formatTimeSlot(openMinutes);
    asapLabel = `Today at Opening (${openTimeStr})`;
    asapValue = `Today at ${openTimeStr}`;
  } else {
    const openTimeStr = formatTimeSlot(openMinutes);
    asapLabel = `Tomorrow at Opening (${openTimeStr})`;
    asapValue = `Tomorrow at ${openTimeStr}`;
  }

  // Generate available time slots for Today
  const slots = [];
  let startSlotMinutes = openMinutes;

  if (isOpenNow) {
    // Round current + 20 mins up to next 15-min interval
    const targetMin = currentMinutesFromMidnight + 20;
    startSlotMinutes = Math.ceil(targetMin / 15) * 15;
  } else if (isAfterClose) {
    startSlotMinutes = closeMinutes + 1; // No slots available for today
  }

  for (let m = startSlotMinutes; m <= lastPickupMinutes; m += 15) {
    const formatted = formatTimeSlot(m);
    slots.push({
      value: `Today at ${formatted}`,
      timeOnly: formatted,
      label: `Today at ${formatted}`
    });
  }

  return {
    isOpenNow,
    isBeforeOpen,
    isAfterClose,
    asapLabel,
    asapValue,
    slots,
    storeHoursText: `${formatTimeSlot(openMinutes)} - ${formatTimeSlot(closeMinutes)}`
  };
}
