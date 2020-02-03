export const BASE_URL = process.env.REACT_APP_HOST 

export const formatDate = (rawDate) => {
    const longDateTime = new Date(rawDate);
  
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
  
    const month = months[longDateTime.getMonth()];
    const day = days[longDateTime.getDay()];
    const year = longDateTime.getFullYear();
    let date = longDateTime.getDate();
  
    if (date < 10) {
      date = `0${date}`;
    }
  
    return `${day} ${date} ${month} ${year}`;
  };

export const dateToString = date => {
  const mm = date.getMonth() + 1;
  const dd = date.getDate();

  return [date.getFullYear(),
          (mm>9 ? '' : '0') + mm,
          (dd>9 ? '' : '0') + dd
         ].join('-');
}