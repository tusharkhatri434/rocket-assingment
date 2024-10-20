export function useDateFinder(value){
    const date = new Date(value);
    const time = getISTTime(date);
    const obj = {
        date:date.getDate(),
        month:date.getMonth(),
        year:date.getFullYear(),
        hour:date.getHours(),
        minute:date.getMinutes(),
        time:time
    }

    return obj;
}
function getISTTime(date) {
    // Get the UTC time from the Date object
    const utcHours = date.getUTCHours();
    const utcMinutes = date.getUTCMinutes();
  
    // Convert to Indian Standard Time (UTC + 5:30)
    let istHours = utcHours + 5;
    let istMinutes = utcMinutes + 30;
  
    // Handle minute overflow
    if (istMinutes >= 60) {
      istMinutes -= 60;
      istHours += 1;
    }
  
    // Handle hour overflow
    if (istHours >= 24) {
      istHours -= 24;
    }
  
    // Convert to 12-hour format with AM/PM
    const period = istHours >= 12 ? 'PM' : 'AM';
    istHours = istHours % 12 || 12; // Converts 0 to 12
  
    // Format hours and minutes to be two digits
    const formattedHours = String(istHours).padStart(2, '0');
    const formattedMinutes = String(istMinutes).padStart(2, '0');
  
    return `${formattedHours}:${formattedMinutes} ${period}`;
  }