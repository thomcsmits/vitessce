import range from 'lodash/range';
import sum from 'lodash/sum';
import moleculesSchema from '../../schemas/molecules.schema.json';
import JsonLoader from '../JsonLoader';
import { AbstractLoaderError } from '../errors';
import LoaderResult from '../LoaderResult';
import { DEFAULT_MOLECULES_LAYER } from '../../components/spatial/constants';

export default class MoleculesJsonAsObsLocationsLoader extends JsonLoader {
  constructor(dataSource, params) {
    super(dataSource, params);

    this.schema = moleculesSchema;
  }

  loadFromCache(data) {
    if (this.locations) {
      return this.locations;
    }
    const moleculesValues = Object.values(data);
    const obsIndex = range(sum(moleculesValues.map(v => v.length))).map(i => String(i));
    const obsLocationsX = new Float32Array(obsIndex.length);
    const obsLocationsY = new Float32Array(obsIndex.length);
    let startAt = 0;
    moleculesValues.forEach((locations) => {
      obsLocationsX.set(locations.map(l => l[0]), startAt);
      obsLocationsY.set(locations.map(l => l[1]), startAt);
      startAt += locations.length;
    });
    const obsLocations = {
      data: [obsLocationsX, obsLocationsY],
      shape: [2, obsLocationsX.length],
    };
    this.locations = { obsLocations, obsIndex };
    return this.locations;
  }

  async load() {
    const payload = await super.load().catch(reason => Promise.resolve(reason));
    if (payload instanceof AbstractLoaderError) {
      return Promise.reject(payload);
    }
    const { data, url } = payload;
    const locations = this.loadFromCache(data);
    const coordinationValues = {
      // TODO: do this for anndata segmentation loader
      spatialPointLayer: DEFAULT_MOLECULES_LAYER,
    };
    return Promise.resolve(new LoaderResult(locations, url, coordinationValues));
  }
}
