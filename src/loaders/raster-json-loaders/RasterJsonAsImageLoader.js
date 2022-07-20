import { AbstractLoaderError } from '../errors';
import LoaderResult from '../LoaderResult';
import RasterLoader from './RasterJsonLoader';

export default class RasterJsonAsImageLoader extends RasterLoader {
  async load() {
    const loaderResult = await super.load().catch(reason => Promise.resolve(reason));
    if (loaderResult instanceof AbstractLoaderError) {
      return Promise.reject(loaderResult);
    }
    const { data = {}, url: urls, coordinationValues } = loaderResult;
    const { loaders: allLoaders = [], meta: allMeta = [] } = data;

    const loaders = [];
    const meta = [];

    // Only include non-bitmask items.
    allMeta.forEach((layer, i) => {
      if (!layer.metadata.isBitmask) {
        loaders.push(allLoaders[i]);
        meta.push(allMeta[i]);
      }
    });

    return new LoaderResult(
      {
        image: { loaders, meta },
      },
      urls,
      {
        // Filter coordinationValues, keeping only non-bitmask layers.
        spatialImageLayer: coordinationValues
          .spatialImageLayer.filter(l => l.type !== 'bitmask'),
      },
    );
  }
}
