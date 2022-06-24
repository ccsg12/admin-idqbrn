import type { Case, City, ResumedCity } from "@/stores";
import type { ApiCase, ApiCity, ApiResumedCity } from "@/services";

export const TypesHelper = {
  apiCaseToCase: (item: ApiCase): Case => {
    return {
      id: item.id,
      cityId: item.cidadeId,
      diseaseId: item.doencaId,
      total: item.quantidade,
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

  apiResumedCityToResumedCity: (city: ApiResumedCity): ResumedCity => {
    return {
      id: city.id,
      name: city.nome,
      state: city.estado,
    };
  },

  caseToApiCase: (item: Case): ApiCase => {
    return {
      id: item.id,
      cidadeId: item.cityId,
      doencaId: item.diseaseId,
      quantidade: item.total,
    };
  },

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

  resumedCityToApiResumedCity: (city: ResumedCity): ApiResumedCity => {
    return {
      id: city.id,
      nome: city.name,
      estado: city.state,
    };
  },
};
