import { sendMessage } from './sendMessage';
import { setMessage } from './setMessage';
import { getData } from './getData';
import { config } from 'src/config/config';
import {
  translateCountryToEs,
  translateCountryFromEs
} from './translateCountry';
import { countries } from 'src/config/countries';
import { CountryData } from 'src/types/Types';

const { uri, pageToken } = config;

export const command = {
  countries: async (senderId: string, allCountries?: boolean) => {
    const data = await getData('/countries');
    const countries = [];
    data.forEach((el: { Country: any }) => {
      countries.push(el.Country);
    });
    if (!allCountries) {
      sendMessage(
        setMessage(
          senderId,
          `Actualmente el virus se encuentra en ${countries.length} países.\n\n[Escribe la palabra "!country [Nombre del país]" para mostrar los países donde se encuentra.]`
        ),
        uri,
        pageToken
      );
    } else {
      // console.log(countries);
      // sendMessage(
      //   setMessage(
      //     senderId,
      //     `Los países donde el virus ha afectado son ${countries}`
      //   ),
      //   uri,
      //   pageToken
      // );
    }
  },

  country: async (senderId: string, country: string) => {
    const data = await getData('/summary');
    let thisCountry: string, thisCountryES: string, countryData: CountryData;
    country = country.toLowerCase();

    if (country.includes('estados unidos' || 'estadosunidos' || 'usa')) {
      country = 'united states of america';
    }

    countries.forEach((c) => {
      if (country.includes(c.nombre.toLowerCase())) {
        thisCountryES = c.nombre;
      }
    });

    try {
      thisCountryES = thisCountryES.toLowerCase();
    } catch (error) {}

    if (!thisCountryES) {
      data.Countries.forEach(async (el: { Country: string }) => {
        if (country.includes(el.Country.toLowerCase())) {
          thisCountry = el.Country;
          thisCountry = thisCountry.toLowerCase();
        }
      });
    }

    if (country.includes(thisCountry) || country.includes(thisCountryES)) {
      try {
        if (thisCountryES) {
          thisCountryES = translateCountryFromEs(thisCountryES);
        }
      } catch (error) {}

      if (thisCountry) {
        data.Countries.forEach((element) => {
          if (thisCountry == element.Country.toLowerCase()) {
            countryData = element;
          }
        });
      } else if (thisCountryES) {
        data.Countries.forEach((element) => {
          if (thisCountryES.toLowerCase() == element.Country.toLowerCase()) {
            countryData = element;
          }
        });
      }

      try {
        sendMessage(
          setMessage(
            senderId,
            `Actualmente en ${translateCountryToEs(
              countryData.Country
            )} hay de ${countryData.TotalConfirmed} casos confirmados, ${
              countryData.TotalDeaths
            } muertes y ${countryData.TotalRecovered} personas recuperadas.`
          ),
          uri,
          pageToken
        );
      } catch (e) {
        console.log(e);
      }
    }
  }
};
