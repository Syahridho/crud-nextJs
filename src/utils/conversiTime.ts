const conversiTime = (timestamp: string) => {
  // Membuat objek Date dari timestamp
  const date = new Date(timestamp);

  // Mendapatkan bagian-bagian dari tanggal
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // getMonth() mengembalikan bulan dari 0-11
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  // Formatkan dengan menambahkan leading zero jika perlu
  const formattedMonth = month < 10 ? `0${month}` : month;
  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedHours = hours < 10 ? `0${hours}` : hours;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  // Gabungkan menjadi format yang lebih mudah dibaca
  return `${formattedDay}-${formattedMonth}-${year} ${formattedHours}:${formattedMinutes}`;
};

export { conversiTime };
