import type {
  Case,
  City,
  Disease,
  ResumedCity,
  ResumedDisease,
} from "@/stores";
import type {
  ApiCase,
  ApiCity,
  ApiDisease,
  ApiResumedCity,
  ApiResumedDisease,
} from "@/services";

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

  apiDiseaseToDisease: (disease: ApiDisease): Disease => {
    return {
      id: disease.id,
      cities: undefined,
      name: disease.nome,
      prevention: disease.prevencao,
      treatment: disease.tratamento,
    };
  },

  apiResumedCityToResumedCity: (city: ApiResumedCity): ResumedCity => {
    return {
      id: city.id,
      name: city.nome,
      state: city.estado,
    };
  },

  apiResumedDiseaseToResumedDisease: (
    disease: ApiResumedDisease
  ): ResumedDisease => {
    return {
      id: disease.id,
      name: disease.nome,
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

  diseaseToApiDisease: (disease: Disease): ApiDisease => {
    return {
      id: disease.id,
      nome: disease.name,
      prevencao: disease.prevention,
      tratamento: disease.treatment,
    };
  },

  resumedCityToApiResumedCity: (city: ResumedCity): ApiResumedCity => {
    return {
      id: city.id,
      nome: city.name,
      estado: city.state,
    };
  },

  resumedDiseaseToApiResumedDisease: (
    disease: ResumedDisease
  ): ApiResumedDisease => {
    return {
      id: disease.id,
      nome: disease.name,
    };
  },
};
