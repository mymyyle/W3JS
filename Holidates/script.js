const API_KEY = "d06ac405-89a6-4e0a-beb3-800d37172570";

const getCountries = async () => {
  try {
    const url = `https://holidayapi.com/v1/countries?pretty&key=${API_KEY}`;
    const res = await fetch(url);
    const data = await res.json();
    console.log("data", data);
    return data;
  } catch (err) {
    console.log("err", err);
  }
};
const renderCountries = async () => {
  try {
    const data = await getCountries();
    const countriesList = document.getElementById("countries-list");
    const ulCountriesList = countriesList.children[2];
    ulCountriesList.innerHTML = "";
    data.countries.forEach((country, index) => {
      const x = document.createElement("li");
      x.innerHTML = `<div class="bullet">${index + 1}</div>
              <div class="li-wrapper">
                  <div class="li-title">${country.name}</div>
                  <div>Code: ${country.code}</div>
              </div>`;
      ulCountriesList.appendChild(x);
    });
  } catch (err) {
    console.log("err", err);
  }
};

document.getElementById("countries-list-btn").addEventListener("click", () => {
  renderCountries();
});

// 1. render Languages list

const getLanguages = async () => {
  try {
    const url = `https://holidayapi.com/v1/languages?pretty&key=${API_KEY}`;
    const res = await fetch(url);
    const data = await res.json();
    console.log("data", data);
    return data;
  } catch (err) {
    console.log("err", err);
  }
};

const renderLanguages = async () => {
  try {
    const data = await getLanguages();
    const languagesList = document.getElementById("languages-list");
    const ulLanguagesList = languagesList.children[2];
    ulLanguagesList.innerHTML = "";
    data.languages.forEach((language, index) => {
      const x = document.createElement("li");
      x.innerHTML = `<div class="bullet">${index + 1}</div>
              <div class="li-wrapper">
                  <div class="li-title">${language.name}</div>
                  <div>Code: ${language.code}</div>
              </div>`;
      ulLanguagesList.appendChild(x);
    });
  } catch (err) {
    console.log("err", err);
  }
};

document
  .querySelector("#languages-list-btn")
  .addEventListener("click", renderLanguages);

//2 RENDER HOLIDAY

const getHolidays = async (country, year, month, day, search) => {
  try {
    const url = search
      ? `https://holidayapi.com/v1/holidays?pretty&key=${API_KEY}&search=${search}&year=${year}&month=${month}&day=${day}`
      : `https://holidayapi.com/v1/holidays?pretty&key=${API_KEY}&country=${country}&year=${year}&month=${month}&day=${day}`;
    const res = await fetch(url);
    const data = await res.json();
    console.log("data", data);
    return data;
  } catch (err) {
    console.log("err", err);
  }
};

const renameCountry = async (countryInput) => {
  const holidaysList = document.getElementById("holidays-list");
  const heading = holidaysList.children[0];
  try {
    const arr = await getCountries();
    console.log(arr);
    const country = arr.countries.find((obj) => obj.code === countryInput);
    console.log(country);
    if (country) {
      heading.innerHTML = `Holidays of ${country.name}`;
    } else {
      heading.innerHTML = `Holidays of Countries`;
    }
  } catch (error) {
    console.log(error);
  }
};

const renderHolidays = async () => {
  const countryInputValue =
    document.querySelector("#country-query").value || "VN";

  const yearInputValue =
    Number(document.querySelector("#year-query").value) || 2021;
  const monthInputValue = Number(document.querySelector("#month-query").value);
  const dayInputValue = Number(document.querySelector("#day-query").value);
  const searchInputValue = document.querySelector("#search-query").value;

  if (!searchInputValue) {
    renameCountry(countryInputValue.toUpperCase());
  } else {
    renameCountry();
  }
  try {
    const data = await getHolidays(
      countryInputValue,
      yearInputValue,
      monthInputValue,
      dayInputValue,
      searchInputValue
    );
    const holidaysList = document.getElementById("holidays-list");
    const ulHolidaysList = holidaysList.children[1];
    console.log(ulHolidaysList);
    ulHolidaysList.innerHTML = "";
    data.holidays.forEach((holiday, index) => {
      const x = document.createElement("li");
      x.innerHTML = `<div class="bullet">${index + 1}</div>
      <div class="li-wrapper">
        <div class="li-title">${holiday.name}</div>
        <div class="li-text">${holiday.weekday.date.name} - ${
        holiday.date
      }</div>
      </div>`;
      ulHolidaysList.appendChild(x);
    });
  } catch (error) {
    console.log("err", error);
  }
};

document
  .querySelector("#holidays-btn")
  .addEventListener("click", renderHolidays);
