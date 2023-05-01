/* eslint-disable */
window.esmsInitOptions = {
  shimMode: true,
  mapOverrides: true,
};

const script = Object.assign(document.createElement('script'), {
  type: 'importmap-shim',
  innerHTML: JSON.stringify({
    "imports": {
      "react": "https://esm.sh/react@18.2.0?dev",
      "react-dom": "https://esm.sh/react-dom@18.2.0?dev",
      "react-dom/client": "https://esm.sh/react-dom@18.2.0/client?dev",
      "vitessce": "http://localhost:3003/packages/main/dev/dist/index.mjs"
    }
  }),
});

document.body.appendChild(script);

const shims = await import('https://ga.jspm.io/npm:es-module-shims@1.6.1/dist/es-module-shims.js');

const React = await importShim('react');
const { createRoot } = await importShim('react-dom/client');



function asEsModule(component) {
  return {
    __esModule: true,
    default: component,
  };
}

const Vitessce = React.lazy(async () => {
  const vitessce = await importShim('vitessce');

  return asEsModule(vitessce.Vitessce);
});


const e = React.createElement;

const eng2019 = {
  name: 'Eng et al., Nature 2019',
  version: '1.0.15',
  description: 'Transcriptome-scale super-resolved imaging in tissues by RNA seqFISH',
  datasets: [
    {
      uid: 'eng-2019',
      name: 'Eng 2019',
      files: [
        {
          fileType: 'obsEmbedding.csv',
          url: 'https://s3.amazonaws.com/vitessce-data/0.0.33/main/eng-2019/eng_2019_nature.cells.csv',
          coordinationValues: {
            obsType: 'cell',
            embeddingType: 't-SNE',
          },
          options: {
            obsIndex: 'cell_id',
            obsEmbedding: ['TSNE_1', 'TSNE_2'],
          },
        },
        {
          fileType: 'obsEmbedding.csv',
          url: 'https://s3.amazonaws.com/vitessce-data/0.0.33/main/eng-2019/eng_2019_nature.cells.csv',
          coordinationValues: {
            obsType: 'cell',
            embeddingType: 'UMAP',
          },
          options: {
            obsIndex: 'cell_id',
            obsEmbedding: ['UMAP_1', 'UMAP_2'],
          },
        },
        {
          fileType: 'obsLocations.csv',
          url: 'https://s3.amazonaws.com/vitessce-data/0.0.33/main/eng-2019/eng_2019_nature.cells.csv',
          coordinationValues: {
            obsType: 'cell',
          },
          options: {
            obsIndex: 'cell_id',
            obsLocations: ['X', 'Y'],
          },
        },
        {
          fileType: 'obsSets.csv',
          url: 'https://s3.amazonaws.com/vitessce-data/0.0.33/main/eng-2019/eng_2019_nature.cells.csv',
          coordinationValues: {
            obsType: 'cell',
          },
          options: {
            obsIndex: 'cell_id',
            obsSets: [
              {
                name: 'Leiden Clustering',
                column: 'Leiden',
              },
              {
                name: 'k-means Clustering',
                column: 'Kmeans',
              },
            ],
          },
        },
        {
          fileType: 'obsSegmentations.json',
          url: 'https://s3.amazonaws.com/vitessce-data/0.0.33/main/eng-2019/eng_2019_nature.cells.segmentations.json',
          coordinationValues: {
            obsType: 'cell',
          },
        },
      ],
    },
  ],
  initStrategy: 'auto',
  coordinationSpace: {
    embeddingType: {
      TSNE: 't-SNE',
      UMAP: 'UMAP',
    },
    embeddingObsSetPolygonsVisible: {
      A: false,
    },
    embeddingObsSetLabelsVisible: {
      A: true,
    },
    embeddingObsSetLabelSize: {
      A: 16,
    },
    embeddingObsRadiusMode: {
      A: 'manual',
    },
    embeddingObsRadius: {
      A: 3,
    },
    embeddingZoom: {
      TSNE: 3,
      UMAP: 3,
    },
    spatialZoom: {
      A: -4.4,
    },
    spatialTargetX: {
      A: 3800,
    },
    spatialTargetY: {
      A: -900,
    },
    spatialSegmentationLayer: {
      A: {
        opacity: 1, radius: 0, visible: true, stroked: false,
      },
    },
  },
  layout: [
    {
      component: 'description',
      x: 9,
      y: 0,
      w: 3,
      h: 2,
    },
    {
      component: 'status',
      x: 9,
      y: 2,
      w: 3,
      h: 2,
    },
    {
      component: 'obsSets',
      x: 9,
      y: 4,
      w: 3,
      h: 4,
    },
    {
      component: 'obsSetSizes',
      x: 5,
      y: 4,
      w: 4,
      h: 4,
    },
    {
      component: 'scatterplot',
      coordinationScopes: {
        embeddingType: 'TSNE',
        embeddingZoom: 'TSNE',
        embeddingObsSetLabelsVisible: 'A',
        embeddingObsSetLabelSize: 'A',
        embeddingObsSetPolygonsVisible: 'A',
        embeddingObsRadiusMode: 'A',
        embeddingObsRadius: 'A',
      },
      x: 0,
      y: 2,
      w: 5,
      h: 4,
    },
    {
      component: 'spatial',
      props: {
        cellRadius: 50,
      },
      coordinationScopes: {
        spatialZoom: 'A',
        spatialTargetX: 'A',
        spatialTargetY: 'A',
        spatialSegmentationLayer: 'A',
      },
      x: 5,
      y: 0,
      w: 4,
      h: 4,
    },
    {
      component: 'scatterplot',
      coordinationScopes: {
        embeddingType: 'UMAP',
        embeddingZoom: 'UMAP',
        embeddingObsSetLabelsVisible: 'A',
        embeddingObsSetLabelSize: 'A',
        embeddingObsSetPolygonsVisible: 'A',
        embeddingObsRadiusMode: 'A',
        embeddingObsRadius: 'A',
      },
      x: 0,
      y: 0,
      w: 5,
      h: 4,
    },
  ],
};

const height = 500;

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return e(React.Suspense, { fallback: e('div', {}, 'Loading...') },
        e(
          Vitessce,
          { config: eng2019, height: height, theme: 'light', uid: 'eng2019' },
          null
        ),
      );
  }
}

// es-react is using React v16.
const domContainer = document.getElementById('root');
const root = createRoot(domContainer);
root.render(e(App));

