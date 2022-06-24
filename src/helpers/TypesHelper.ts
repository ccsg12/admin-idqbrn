import type { City } from "@/stores";
import type { ApiCity } from "@/services";

export const TypesHelper = {
  cityToApiCity: (city: City): ApiCity => {
    return {
      id: city.id,
      nome: city.name,
      estado: city.state,
      codigoIBGE: city.ibgeCode,
      populacao: city.population,
      latitude: city.latitude,
      longitude: city.longitude,
    };
  },

  apiCityToCity: (city: ApiCity): City => {
    return {
      id: city.id,
      cases: undefined,
      name: city.nome,
      state: city.estado,
      ibgeCode: city.codigoIBGE,
      population: city.populacao,
      latitude: city.latitude,
      longitude: city.longitude,
    };
  },
};
