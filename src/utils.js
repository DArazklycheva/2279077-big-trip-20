import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

// Функции для поиска случайного числа из диапазона

const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const createRandomIdFromRangeGenerator = (min, max) => {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

const getRandomNumber = (min, max) => getRandomInteger(min, max);
const getRandomArrayElement = (items) => items[Math.floor(Math.random() * items.length)];


//Функция для генерации дополнительных предложений

const getRandomOffersByType = (offers, type) => {
  const offersByType = offers.find((offer) => offer.type === type);
  const offersIDs = [];

  if (offersByType) {
    for (let i = 0; i < offersByType.length; i++) {
      if (Math.random() > 0.5) {
        offersIDs.push(offersByType[i].id.toString());
      }
    }
  }

  return offersIDs;
};


//Функция для генерации случайных дат

const getRandomDate = () => {
  const minCount = 1;
  const maxCountDays = 15;
  const maxCountHours = 23;
  const maxCountMinutes = 59;

  const startDate = dayjs()
    .add(getRandomNumber(minCount, maxCountDays), 'day')
    .add(getRandomNumber(minCount, maxCountHours), 'hour')
    .add(getRandomNumber(minCount, maxCountMinutes), 'minute');

  const endDate = startDate.clone()
    .add(getRandomInteger(0, maxCountDays), 'day')
    .add(getRandomInteger(0, maxCountHours), 'hour')
    .add(getRandomInteger(0, maxCountMinutes), 'minute');

  return {
    start: startDate.toDate(),
    end: endDate.toDate()
  };
};

const calculateDuration = (start, end) => {
  const diff = dayjs.duration(dayjs(start).diff(dayjs(end)));

  let result = '';

  if (diff.days() >= 0) {
    result += `${diff.days()} D`;
  }
  if (diff.hours() >= 0) {
    result += `${diff.hours()} H`;
  }
  if (diff.minutes() >= 0) {
    result += `${diff.minutes()} M`;
  }

  return result;
};

export {
  getRandomArrayElement,
  getRandomNumber,
  getRandomDate,
  getRandomOffersByType,
  createRandomIdFromRangeGenerator,
  calculateDuration
};
