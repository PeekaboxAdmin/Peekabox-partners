// Helper function to get today's day (e.g., 'Mon', 'Tue', etc.)
export const getTodayDay = (): string => {
    const today = new Date();
    const options: Intl.DateTimeFormatOptions = { weekday: "short" }; // Explicitly define the type
    return today.toLocaleDateString("en-US", options);
  };
  
  // Helper function to get tomorrow's day and date
  // Helper function to get tomorrow's day (e.g., 'Mon', 'Tue', etc.)
export const getTomorrowDay = (): string => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const options: Intl.DateTimeFormatOptions = { weekday: "short" }; // We only need the weekday name
    return tomorrow.toLocaleDateString("en-US", options);
};
  
  // Return true if the days collection matches with today
  export const isToday = (days: string): boolean => {
    const today = getTodayDay();
    return days.includes(today);
  };
  
  // Return false if the date collection matches with tomorrow 
  export const isTomorrow = (days: string): boolean => {
    const tomorrow = getTomorrowDay();
    return days.includes(tomorrow);
  };
  
  // Find the next available day after today
  export const findNextAvailableDay = (days: string[]): string | null => {
    const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const today = getTodayDay();
    const tomorrow = getTomorrowDay(); // Should be getTomorrowDay() instead
    let todayIndex = getIndexWeekDay(today);
  
    // If today is available, return today
    if (days.includes(today)) return today;
  
    // If tomorrow is available, return tomorrow
    if (days.includes(tomorrow)) return tomorrow;
  
    // Find the next available day
    for (let i = 1; i < 7; i++) {
      let nextIndex = (todayIndex + i) % 7;
      if (days.includes(weekDays[nextIndex])) {
        return weekDays[nextIndex]; // Return the next available day
      }
    }
  
    return null; // No available day found
  };
  
  // This gets the index of the weekday
  export const getIndexWeekDay = (day: string): number => {
    const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return weekDays.indexOf(day);
  };
  
  // Helper function to get the full date for a given day name (e.g., 'Mon')
  export const getDayDate = (day: string): string | null => {
    const today = new Date();
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    const todayIndex = today.getDay(); // 0 (Sun) to 6 (Sat)
    const targetIndex = daysOfWeek.indexOf(day); // Get index of requested day
  
    if (targetIndex === -1) return null; // If input is invalid, return null
  
    // Calculate days to add to reach the next occurrence of the target day
    let daysToAdd = (targetIndex - todayIndex + 7) % 7;
    if (daysToAdd === 0) daysToAdd = 7; // If the target day is today, return next week's occurrence
  
    // Get the target date
    const targetDate = new Date();
    targetDate.setDate(today.getDate() + daysToAdd);
  
    // Format the date as YYYY-MM-DD
    return targetDate.toISOString().split('T')[0];
  };
  