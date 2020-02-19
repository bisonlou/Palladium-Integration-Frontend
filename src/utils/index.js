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
  const yy = date.getFullYear().toString().substr(-2)

  return [
    (dd > 9 ? '' : '0') + dd,
    (mm > 9 ? '' : '0') + mm,
    yy,
  ].join('-');
};

export const saveSessionInfo = ({ user, access_token }) => {
  localStorage.setItem('email', user.email);
  localStorage.setItem('first_name', user.first_name);
  localStorage.setItem('last_name', user.last_name);
  localStorage.setItem('token', access_token);
};

export const getSessionInfo = key => {
  return localStorage.getItem(key);
};

export const getEmployeeName = () => {
  return `${getSessionInfo('first_name')} ${getSessionInfo('last_name')}`
};

export const clearSessionInfo = () => {
  localStorage.clear();
};

const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
      return -1;
  }
  if (b[orderBy] > a[orderBy]) {
      return 1;
  }
  return 0;
};

export const getComparator = (order, orderBy) => {
  return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
};

export const stableSort = (array, comparator) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
};
