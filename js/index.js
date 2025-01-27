const l = new Promise((resolve, reject) => {
  setTimeout(() => resolve(1), 1000);
})
  .then((result) => {
    alert(result * 2);
    return result * 2;
  })
  .then((result) => {
    alert(result * 2);
    return result * 2;
  })
  .then((result) => {
    alert(result * 2);
    return result * 2;
  });

l.finally("finaly");
