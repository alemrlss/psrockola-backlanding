import { Injectable, NotFoundException } from "@nestjs/common";
import axios, { AxiosRequestConfig } from "axios";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Country } from "src/entities/country.entity";
import { State } from "src/entities/state.entity";
import { City } from "src/entities/city.entity";

@Injectable()
export class SeedService {
  private readonly apiUrl = "https://www.universal-tutorial.com/api";

  constructor(
    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>,
    @InjectRepository(State)
    private readonly stateRepository: Repository<State>,
    @InjectRepository(City)
    private readonly cityRepository: Repository<City>
  ) {}

  private async makeApiRequest<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const defaultConfig: AxiosRequestConfig = {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJhbGl6b21hcnRpbmV6MDEwM0BnbWFpbC5jb20iLCJhcGlfdG9rZW4iOiJvUzF2TEU1ZjdkZnNrU2doa1cwZ3V3OGVwLWxRdUJxNnhMempoYUJTS3gzVmxPaVRKVTFRUG9WTEd3ZGNqbGU0eDhVIn0sImV4cCI6MTcwOTU3MTA3OX0.jWfG_jnWZE3nb16KtRBzRoe5dOGAURMQnw78wj_1pgU"}
    };

    const response = await axios.get<T>(url, { ...defaultConfig, ...config });
    return response.data; // Corregir aquí
  }

  private async transformAndSeedCountry(apiCountry: any): Promise<void> {
    // Transformar y guardar país en la base de datos
    const transformedCountry = {
      name: apiCountry.country_name,
      isoCode: apiCountry.country_short_name,
      phoneCode: `+${apiCountry.country_phone_code}`,
    };

    await this.countryRepository.save(transformedCountry);
  }

  private async transformAndSeedStates(
    countryId: number,
    apiStates: { state_name: string }[]
  ): Promise<void> {
    // Transformar y guardar estados en la base de datos
    const transformedStates = apiStates.map((apiState) => ({
      name: apiState.state_name,
      country: { id: countryId } as Country,
    }));
    await this.stateRepository.save(transformedStates);
  }

  private async transformAndSeedCities(
    stateId: number,
    apiCities: { city_name: string }[]
  ): Promise<void> {
    // Transformar y guardar ciudades en la base de datos
    const transformedCities = apiCities.map((apiCity) => ({
      name: apiCity.city_name,
      state: { id: stateId } as State,
    }));
    await this.cityRepository.save(transformedCities);
  }

  async seedCountryData(countryName: string): Promise<void> {
    try {
      // Paso 1: Obtener la lista de países
      const apiCountries = await this.makeApiRequest<
        {
          country_name: string;
          country_short_name: string;
          country_phone_code: number;
        }[]
      >(`${this.apiUrl}/countries`);

      // Encontrar el país solicitado en la respuesta de la API
      const apiCountry = apiCountries.find(
        (c) => c.country_name.toLowerCase() === countryName.toLowerCase()
      );
      console.log(`Countries : ${apiCountry}`);

      if (!apiCountry) {
        throw new NotFoundException(
          `No se encontró información para ${countryName}.`
        );
      }

      // Transformar y guardar el país en la base de datos
      await this.transformAndSeedCountry(apiCountry);

      // Obtener estados del país
      const apiStates = await this.makeApiRequest<{ state_name: string }[]>(
        `${this.apiUrl}/states/${countryName}`
      );

      console.log(`States: ${apiStates}`);

      // Obtener el ID del país recién guardado
      const country = await this.countryRepository.findOne({
        where: { name: countryName },
      });

      const countryId = country.id;

      // Transformar y guardar estados en la base de datos
      await this.transformAndSeedStates(countryId, apiStates);

      // Iterar por cada estado y obtener y guardar ciudades
      for (const apiState of apiStates) {
        // Obtener ciudades de un estado
        const apiCities = await this.makeApiRequest<{ city_name: string }[]>(
          `${this.apiUrl}/cities/${apiState.state_name}`
        );
        console.log(`cities: ${apiCities}`);

        // Obtener el ID del estado recién guardado
        const state = await this.stateRepository.findOne({
          where: { name: apiState.state_name, country: { id: countryId } },
        });
        const stateId = state.id;

        // Transformar y guardar ciudades en la base de datos
        await this.transformAndSeedCities(stateId, apiCities);
      }

      console.log(
        `Datos de ${countryName} cargados correctamente en la base de datos.`
      );
    } catch (error) {
      console.log(error);
      console.error(
        `Error al cargar los datos de ${countryName} en la base de datos:`,
        error.message
      );
    }
  }
}
