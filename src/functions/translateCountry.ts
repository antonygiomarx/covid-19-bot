import { countries } from 'src/config/countries';

export const translateCountryToEs = (fcountry: string) => {
  let country: string;
  countries.forEach((aCountry) => {
    if (fcountry.toLowerCase() == aCountry.name.toLowerCase()) {
      country = aCountry.nombre;
    }
  });
  return country;
};

export const translateCountryFromEs = (fcountry: string) => {
  let country: string;
  countries.forEach((aCountry) => {
    if (fcountry == aCountry.nombre.toLowerCase()) {
      country = aCountry.name;
    } else if (fcountry == aCountry.name.toLowerCase()) {
      country = aCountry.name;
    }
  });
  return country;
};
