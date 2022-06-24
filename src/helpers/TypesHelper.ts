import type { City, Disease } from "@/stores";
import type { ApiCity, ApiDisease } from "@/services";

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
  diseaseToApiDisease: (disease: Disease): ApiDisease => {
    return {
      id: disease.id,
      nome: disease.name,
      prevencao: disease.prevention,
      tratamento: disease.treatment,
    };
  },

  apiDiseaseToDisease: (disease: ApiDisease): Disease => {
    return {
      id: disease.id,
      cities: undefined,
      name: disease.nome,
      prevention: disease.prevencao,
      treatment: disease.tratamento,
    };
  },
};
