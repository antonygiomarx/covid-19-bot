import { sendMessage } from "./sendMessage";
import { setMessage } from "./setMessage";
import { getData } from "./getData";
import { config } from "src/config/config";

const { uri, pageToken } = config;

export const command = {
  countries: async (senderId: string, allCountries?: boolean) => {
    const data = await getData("/countries");
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
      console.log(countries);

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
    const data = await getData("/countries");
    let thisCountry;
    data.forEach(async el => {
      thisCountry = el.Country;

      thisCountry = thisCountry.toLowerCase();

      if (country.includes(thisCountry)) {
        const getCountryData = async () => {
          const data = await getData(
            `/live/country/${thisCountry}/status/confirmed`
          );
          return data;
        };
        const countryData = await getCountryData();
        sendMessage(
          setMessage(
            senderId,
            `Actualmente en ${countryData[0].Country} hay ${countryData[0].Confirmed} casos confirmados, de los cuales ${countryData[0].Active} casos están activos, hay ${countryData[0].Deaths} muertes y ${countryData[0].Recovered} personas recuperadas.`
          ),
          uri,
          pageToken
        );
      }
    });
  }
};
