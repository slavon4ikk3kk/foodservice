const generateWorkingDays = () => {
  const result = [];
  const today = new Date();
  let start = new Date(today);
  const dayOfWeek = today.getDay();

  // Якщо субота або неділя → починаємо з наступного понеділка
  if (dayOfWeek === 6) {
    start.setDate(start.getDate() + 2);
  } else if (dayOfWeek === 0) {
    start.setDate(start.getDate() + 1);
  } else {
    // Інакше — понеділок–п’ятниця → з понеділка цього тижня
    start.setDate(start.getDate() - (dayOfWeek - 1));
  }

  // Додаємо 5 робочих днів (Пн–Пт)
  while (result.length < 5) {
    const current = new Date(start);
    const currentDay = current.getDay();
    if (currentDay >= 1 && currentDay <= 5) {
      result.push(current);
    }
    start.setDate(start.getDate() + 1);
  }

  return result;
};

export default generateWorkingDays;
