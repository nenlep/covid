// select all elements
const countryName = document.querySelector('.country .name');
const totalCases = document.querySelector('.total-cases .title');
const totalCasesVal = document.querySelector('.total-cases .value');
const totalCasesNew = document.querySelector('.total-cases .new-value');
const recovered = document.querySelector('.recovered .value');
const recoveredNew = document.querySelector('.recovered .new-value');
const deaths = document.querySelector('.deaths .value');
const deathsNew = document.querySelector('.deaths .new-value');


// app variables
let app_data = [],
    cases_list = [],
    recovered_list = [],
    deaths_list = [],
    formatedDates = [];

// get country code
let country_code = geoplugin_countryCode();
let userCountry;

country_list.forEach((country) => {
  if(country.code == country_code){
    userCountry = country.name
  }
});

function fetchData(country){
  userCountry = country;
  countryName.innerHTML = "Loading...";

  (cases_list = []),
    (recovered_list = []),
    (deaths_list = []),
    (dates = []),
    (formatedDates = []);

  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const api_fetch = async (country) => {
    await fetch(
      "https://api.covid19api.com/total/country/" +
        country +
        "/status/confirmed",
      requestOptions
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        
        data.forEach((entry) => {
          dates.push(entry.Date);
          cases_list.push(entry.Cases);
        });
        
      });

      await fetch(
        "https://api.covid19api.com/total/country/" +
          country +
          "/status/recovered",
        requestOptions
      )
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          data.forEach((entry) => {
            recovered_list.push(entry.Cases);
          });
        });
  
      await fetch(
        "https://api.covid19api.com/total/country/" + country + "/status/deaths",
        requestOptions
      )
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          data.forEach((entry) => {
            deaths_list.push(entry.Cases);
          });
        });
        updateUI();
  };
    api_fetch(country);
      
}
fetchData(userCountry);

// UpdateUI
function updateUI(){
  updateStats();
}

// updateStats
function updateStats(){
  const total_cases = cases_list[cases_list.length - 1];
  const new_confirmed_cases = total_cases - cases_list[cases_list.length - 2];

  const total_recovered = recovered_list[recovered_list.length - 1];
  const new_recovered_cases = total_recovered - recovered_list[recovered_list.length - 2];

  const total_deaths = deaths_list[deaths_list.length - 1];
  const new_deaths_cases = total_deaths - deaths_list[deaths_list.length - 2];

  countryName.innerHTML = userCountry;
  totalCasesVal.innerHTML = total_cases;
  totalCasesNew.innerHTML = `+${new_confirmed_cases}`;
  recovered.innerHTML = total_recovered;
  recoveredNew.innerHTML = `+${new_recovered_cases}`;
  deaths.innerHTML = total_deaths;
  deathsNew.innerHTML = `+${new_deaths_cases}`;
}

