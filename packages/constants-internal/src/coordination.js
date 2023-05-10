import { CoordinationType, ViewType } from './constants.js';

// The following coordination types should be
// initialized to independent scopes when
// initialized automatically.
// These make the resulting view config
// (after auto-initialization) behave
// like "legacy" Vitessce (pre-coordination model).
// TODO: delegate to PluginCoordinationType class
export const AUTO_INDEPENDENT_COORDINATION_TYPES = [
  CoordinationType.HEATMAP_ZOOM_X,
  CoordinationType.HEATMAP_ZOOM_Y,
  CoordinationType.HEATMAP_TARGET_X,
  CoordinationType.HEATMAP_TARGET_Y,
  CoordinationType.EMBEDDING_ZOOM,
  CoordinationType.EMBEDDING_TARGET_X,
  CoordinationType.EMBEDDING_TARGET_Y,
  CoordinationType.EMBEDDING_TARGET_Z,
  CoordinationType.EMBEDDING_OBS_SET_POLYGONS_VISIBLE,
  CoordinationType.EMBEDDING_OBS_SET_LABELS_VISIBLE,
  CoordinationType.EMBEDDING_OBS_SET_LABEL_SIZE,
  CoordinationType.EMBEDDING_OBS_RADIUS,
  CoordinationType.EMBEDDING_OBS_OPACITY,
];

/**
   * Mapping from component type to
   * supported coordination object types.
   * This mapping can be used to determine
   * which pieces of state that a component will
   * need to get/set.
   * Keys here are the component registry keys.
   */
export const COMPONENT_COORDINATION_TYPES = {
  [ViewType.SCATTERPLOT]: [
    CoordinationType.DATASET,
    CoordinationType.OBS_TYPE,
    CoordinationType.FEATURE_TYPE,
    CoordinationType.FEATURE_VALUE_TYPE,
    CoordinationType.OBS_LABELS_TYPE,
    CoordinationType.EMBEDDING_TYPE,
    CoordinationType.EMBEDDING_ZOOM,
    CoordinationType.EMBEDDING_ROTATION,
    CoordinationType.EMBEDDING_TARGET_X,
    CoordinationType.EMBEDDING_TARGET_Y,
    CoordinationType.EMBEDDING_TARGET_Z,
    CoordinationType.EMBEDDING_OBS_SET_POLYGONS_VISIBLE,
    CoordinationType.EMBEDDING_OBS_SET_LABELS_VISIBLE,
    CoordinationType.EMBEDDING_OBS_SET_LABEL_SIZE,
    CoordinationType.EMBEDDING_OBS_RADIUS,
    CoordinationType.EMBEDDING_OBS_RADIUS_MODE,
    CoordinationType.EMBEDDING_OBS_OPACITY,
    CoordinationType.EMBEDDING_OBS_OPACITY_MODE,
    CoordinationType.OBS_FILTER,
    CoordinationType.OBS_HIGHLIGHT,
    CoordinationType.OBS_SET_SELECTION,
    CoordinationType.OBS_SET_HIGHLIGHT,
    CoordinationType.OBS_SET_COLOR,
    CoordinationType.FEATURE_HIGHLIGHT,
    CoordinationType.FEATURE_SELECTION,
    CoordinationType.FEATURE_VALUE_COLORMAP,
    CoordinationType.FEATURE_VALUE_COLORMAP_RANGE,
    CoordinationType.OBS_COLOR_ENCODING,
    CoordinationType.ADDITIONAL_OBS_SETS,
  ],
  [ViewType.GATING]: [
    CoordinationType.DATASET,
    CoordinationType.OBS_TYPE,
    CoordinationType.FEATURE_TYPE,
    CoordinationType.FEATURE_VALUE_TYPE,
    CoordinationType.EMBEDDING_TYPE,
    CoordinationType.EMBEDDING_ZOOM,
    CoordinationType.EMBEDDING_ROTATION,
    CoordinationType.EMBEDDING_TARGET_X,
    CoordinationType.EMBEDDING_TARGET_Y,
    CoordinationType.EMBEDDING_TARGET_Z,
    CoordinationType.EMBEDDING_OBS_SET_POLYGONS_VISIBLE,
    CoordinationType.EMBEDDING_OBS_SET_LABELS_VISIBLE,
    CoordinationType.EMBEDDING_OBS_SET_LABEL_SIZE,
    CoordinationType.EMBEDDING_OBS_RADIUS,
    CoordinationType.EMBEDDING_OBS_RADIUS_MODE,
    CoordinationType.EMBEDDING_OBS_OPACITY,
    CoordinationType.EMBEDDING_OBS_OPACITY_MODE,
    CoordinationType.OBS_FILTER,
    CoordinationType.OBS_HIGHLIGHT,
    CoordinationType.OBS_SET_SELECTION,
    CoordinationType.OBS_SET_HIGHLIGHT,
    CoordinationType.OBS_SET_COLOR,
    CoordinationType.FEATURE_HIGHLIGHT,
    CoordinationType.FEATURE_SELECTION,
    CoordinationType.FEATURE_VALUE_COLORMAP,
    CoordinationType.FEATURE_VALUE_COLORMAP_RANGE,
    CoordinationType.OBS_COLOR_ENCODING,
    CoordinationType.ADDITIONAL_OBS_SETS,
    CoordinationType.FEATURE_VALUE_TRANSFORM,
    CoordinationType.FEATURE_VALUE_TRANSFORM_COEFFICIENT,
    CoordinationType.GATING_FEATURE_SELECTION_X,
    CoordinationType.GATING_FEATURE_SELECTION_Y,
  ],
  [ViewType.SPATIAL]: [
    CoordinationType.DATASET,
    CoordinationType.OBS_TYPE,
    CoordinationType.OBS_LABELS_TYPE,
    CoordinationType.FEATURE_TYPE,
    CoordinationType.FEATURE_VALUE_TYPE,
    CoordinationType.SPATIAL_ZOOM,
    CoordinationType.SPATIAL_ROTATION,
    CoordinationType.SPATIAL_IMAGE_LAYER,
    CoordinationType.SPATIAL_SEGMENTATION_LAYER,
    CoordinationType.SPATIAL_POINT_LAYER,
    CoordinationType.SPATIAL_NEIGHBORHOOD_LAYER,
    CoordinationType.SPATIAL_TARGET_X,
    CoordinationType.SPATIAL_TARGET_Y,
    CoordinationType.SPATIAL_TARGET_Z,
    CoordinationType.SPATIAL_ROTATION_X,
    CoordinationType.SPATIAL_ROTATION_Y,
    CoordinationType.SPATIAL_ROTATION_Z,
    CoordinationType.SPATIAL_ROTATION_ORBIT,
    CoordinationType.SPATIAL_ORBIT_AXIS,
    CoordinationType.SPATIAL_AXIS_FIXED,
    CoordinationType.OBS_FILTER,
    CoordinationType.OBS_HIGHLIGHT,
    CoordinationType.OBS_SET_SELECTION,
    CoordinationType.OBS_SET_HIGHLIGHT,
    CoordinationType.OBS_SET_COLOR,
    CoordinationType.FEATURE_HIGHLIGHT,
    CoordinationType.FEATURE_SELECTION,
    CoordinationType.FEATURE_VALUE_COLORMAP,
    CoordinationType.FEATURE_VALUE_COLORMAP_RANGE,
    CoordinationType.OBS_COLOR_ENCODING,
    CoordinationType.ADDITIONAL_OBS_SETS,
    CoordinationType.MOLECULE_HIGHLIGHT,
  ],
  [ViewType.HEATMAP]: [
    CoordinationType.DATASET,
    CoordinationType.OBS_TYPE,
    CoordinationType.OBS_LABELS_TYPE,
    CoordinationType.FEATURE_TYPE,
    CoordinationType.FEATURE_VALUE_TYPE,
    CoordinationType.HEATMAP_ZOOM_X,
    CoordinationType.HEATMAP_ZOOM_Y,
    CoordinationType.HEATMAP_TARGET_X,
    CoordinationType.HEATMAP_TARGET_Y,
    CoordinationType.OBS_FILTER,
    CoordinationType.OBS_HIGHLIGHT,
    CoordinationType.OBS_SET_SELECTION,
    CoordinationType.OBS_SET_HIGHLIGHT,
    CoordinationType.OBS_SET_COLOR,
    CoordinationType.FEATURE_FILTER,
    CoordinationType.FEATURE_HIGHLIGHT,
    CoordinationType.FEATURE_SELECTION,
    CoordinationType.FEATURE_VALUE_COLORMAP,
    CoordinationType.FEATURE_VALUE_COLORMAP_RANGE,
    CoordinationType.OBS_COLOR_ENCODING,
    CoordinationType.ADDITIONAL_OBS_SETS,
  ],
  [ViewType.OBS_SETS]: [
    CoordinationType.DATASET,
    CoordinationType.OBS_TYPE,
    CoordinationType.FEATURE_TYPE,
    CoordinationType.OBS_SET_SELECTION,
    CoordinationType.OBS_SET_EXPANSION,
    CoordinationType.OBS_SET_HIGHLIGHT,
    CoordinationType.OBS_SET_COLOR,
    CoordinationType.OBS_COLOR_ENCODING,
    CoordinationType.ADDITIONAL_OBS_SETS,
    CoordinationType.FEATURE_SELECTION,
  ],
  [ViewType.OBS_SET_SIZES]: [
    CoordinationType.DATASET,
    CoordinationType.OBS_TYPE,
    CoordinationType.OBS_SET_SELECTION,
    CoordinationType.OBS_SET_EXPANSION,
    CoordinationType.OBS_SET_HIGHLIGHT,
    CoordinationType.OBS_SET_COLOR,
    CoordinationType.ADDITIONAL_OBS_SETS,
  ],
  [ViewType.STATUS]: [
    CoordinationType.DATASET,
    CoordinationType.OBS_HIGHLIGHT,
    CoordinationType.FEATURE_HIGHLIGHT,
    CoordinationType.OBS_SET_HIGHLIGHT,
    CoordinationType.MOLECULE_HIGHLIGHT,
  ],
  [ViewType.FEATURE_LIST]: [
    CoordinationType.DATASET,
    CoordinationType.OBS_TYPE,
    CoordinationType.FEATURE_TYPE,
    CoordinationType.FEATURE_VALUE_TYPE,
    CoordinationType.FEATURE_FILTER,
    CoordinationType.FEATURE_HIGHLIGHT,
    CoordinationType.FEATURE_SELECTION,
    CoordinationType.OBS_COLOR_ENCODING,
    CoordinationType.OBS_SET_SELECTION,
  ],
  [ViewType.OBS_SET_FEATURE_VALUE_DISTRIBUTION]: [
    CoordinationType.DATASET,
    CoordinationType.OBS_TYPE,
    CoordinationType.FEATURE_TYPE,
    CoordinationType.FEATURE_VALUE_TYPE,
    CoordinationType.FEATURE_SELECTION,
    CoordinationType.FEATURE_VALUE_TRANSFORM,
    CoordinationType.FEATURE_VALUE_TRANSFORM_COEFFICIENT,
    CoordinationType.OBS_SET_SELECTION,
    CoordinationType.OBS_SET_HIGHLIGHT,
    CoordinationType.OBS_SET_COLOR,
    CoordinationType.ADDITIONAL_OBS_SETS,
  ],
  [ViewType.FEATURE_VALUE_HISTOGRAM]: [
    CoordinationType.DATASET,
    CoordinationType.OBS_TYPE,
    CoordinationType.FEATURE_TYPE,
    CoordinationType.FEATURE_VALUE_TYPE,
    CoordinationType.FEATURE_SELECTION,
    CoordinationType.ADDITIONAL_OBS_SETS,
    CoordinationType.OBS_SET_COLOR,
    CoordinationType.OBS_COLOR_ENCODING,
    CoordinationType.OBS_SET_SELECTION,
  ],
  [ViewType.LAYER_CONTROLLER]: [
    CoordinationType.DATASET,
    CoordinationType.OBS_TYPE,
    CoordinationType.FEATURE_TYPE,
    CoordinationType.FEATURE_VALUE_TYPE,
    CoordinationType.SPATIAL_IMAGE_LAYER,
    CoordinationType.SPATIAL_SEGMENTATION_LAYER,
    CoordinationType.SPATIAL_POINT_LAYER,
    CoordinationType.SPATIAL_NEIGHBORHOOD_LAYER,
    CoordinationType.SPATIAL_ZOOM,
    CoordinationType.SPATIAL_TARGET_X,
    CoordinationType.SPATIAL_TARGET_Y,
    CoordinationType.SPATIAL_TARGET_Z,
    CoordinationType.SPATIAL_ROTATION_X,
    CoordinationType.SPATIAL_ROTATION_Y,
    CoordinationType.SPATIAL_ROTATION_Z,
    CoordinationType.SPATIAL_ROTATION_ORBIT,
    CoordinationType.SPATIAL_ORBIT_AXIS,
    CoordinationType.OBS_SET_SELECTION,
    CoordinationType.OBS_SET_COLOR,
  ],
  [ViewType.GENOMIC_PROFILES]: [
    CoordinationType.DATASET,
    CoordinationType.OBS_TYPE,
    CoordinationType.FEATURE_TYPE,
    CoordinationType.FEATURE_VALUE_TYPE,
    CoordinationType.GENOMIC_ZOOM_X,
    CoordinationType.GENOMIC_ZOOM_Y,
    CoordinationType.GENOMIC_TARGET_X,
    CoordinationType.GENOMIC_TARGET_Y,
    CoordinationType.FEATURE_FILTER,
    CoordinationType.FEATURE_HIGHLIGHT,
    CoordinationType.FEATURE_SELECTION,
    CoordinationType.OBS_SET_SELECTION,
    CoordinationType.OBS_SET_HIGHLIGHT,
    CoordinationType.OBS_SET_COLOR,
    CoordinationType.ADDITIONAL_OBS_SETS,
  ],
  [ViewType.DESCRIPTION]: [
    CoordinationType.DATASET,
    CoordinationType.SPATIAL_IMAGE_LAYER,
  ],
  higlass: [
    CoordinationType.DATASET,
    CoordinationType.GENOMIC_ZOOM_X,
    CoordinationType.GENOMIC_ZOOM_Y,
    CoordinationType.GENOMIC_TARGET_X,
    CoordinationType.GENOMIC_TARGET_Y,
    CoordinationType.FEATURE_FILTER,
    CoordinationType.FEATURE_HIGHLIGHT,
    CoordinationType.FEATURE_SELECTION,
  ],
};
