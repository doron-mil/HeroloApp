import {
  ConversionFunctionsType,
  JsonConverterConfigurationInterface
} from './json-converter/json-converter.service';



export class JsonConversionFunctions implements JsonConverterConfigurationInterface {
  conversionFunctions: ConversionFunctionsType = {};

  private dateFormat = 'YYYY-MM-DD';

  converterMainMethodOverride = undefined;

  classesMap = new Map<string, {new()}>();

  static getInstance(): JsonConversionFunctions {
    const jsonConversionFunctions = new JsonConversionFunctions();
    return jsonConversionFunctions;
  }

  getConfigurationFilePath = () => 'assets/json-converter/gong-conversion-schema.json';

  constructor() {
    // this.conversionFunctions['agendaConversion'] = this.agendaConversion;
    //
    // this.classesMap.set('ScheduledCourse', ScheduledCours);
  }

}
