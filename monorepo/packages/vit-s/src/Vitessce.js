/* eslint-disable camelcase */
import React, { useEffect, useMemo } from 'react';
import {
  ThemeProvider, StylesProvider,
  createGenerateClassName,
} from '@material-ui/core/styles';
import isEqual from 'lodash/isEqual';
import { muiTheme } from './shared-mui/styles';
import {
  ViewConfigProvider, createViewConfigStore,
  AuxiliaryProvider, createAuxiliaryStore,
} from './state/hooks';

import VitessceGrid from './VitessceGrid';
import { Warning } from './Warning';
import CallbackPublisher from './CallbackPublisher';
import { getComponent } from './component-registry';
import { checkTypes, initialize, upgradeAndValidate } from './view-config-utils';

// TODO(monorepo): figure out how to load the bootstrap and the react-grid-layout styles
// import styles from './css/index.scss';

// TODO(monorepo): figure out how to get the current package version from package.json
// import packageJson from '../package.json';
const packageJson = { version: 'unk' };

const generateClassName = createGenerateClassName({
  disableGlobal: true,
});

function logConfig(config, name) {
  console.groupCollapsed(`🚄 Vitessce (${packageJson.version}) ${name}`);
  console.info(`data:,${JSON.stringify(config)}`);
  console.info(JSON.stringify(config, null, 2));
  console.groupEnd();
}

/**
 * The Vitessce component.
 * @param {object} props
 * @param {object} props.config A Vitessce view config.
 * If the config is valid, the VitessceGrid will be rendered as a child.
 * If the config is invalid, a Warning will be rendered instead.
 * @param {number} props.rowHeight Row height for grid layout. Optional.
 * @param {number} props.height Total height for grid layout. Optional.
 * @param {string} props.theme The theme, used for styling as
 * light or dark. Optional. By default, "dark"
 * @param {function} props.onWarn A callback for warning messages. Optional.
 * @param {function} props.onConfigChange A callback for view config
 * updates. Optional.
 * @param {function} props.onLoaderChange A callback for loader
 * updates. Optional.
 * @param {boolean} props.validateOnConfigChange Whether to validate
 * against the view config schema when publishing changes. Use for debugging
 * purposes, as this may have a performance impact. By default, false.
 */
export function Vitessce(props) {
  const {
    config,
    rowHeight,
    height,
    theme,
    onWarn,
    onConfigChange,
    onLoaderChange,
    validateOnConfigChange = false,
    onConfigUpgrade,
    isBounded = false,
  } = props;

  // Process the view config and memoize the result:
  // - Validate.
  // - Upgrade, if legacy schema.
  // - Validate after upgrade, if legacy schema.
  // - Initialize (based on initStrategy).
  const [configOrWarning, success] = useMemo(() => {
    // If the config value is undefined, show a warning message.
    if (!config) {
      return [{
        title: 'No such dataset',
        unformatted: 'The dataset configuration could not be found.',
      }, false];
    }
    // If the view config is missing a version, show a warning message.
    if (!config.version) {
      return [{
        title: 'Missing version',
        unformatted: 'The dataset configuration is missing a version, preventing validation.',
      }, false];
    }
    logConfig(config, 'input view config');
    // Check if this is a "legacy" view config.
    const [upgradedConfig, upgradeSuccess] = upgradeAndValidate(config, onConfigUpgrade);
    if (upgradeSuccess) {
      logConfig(upgradedConfig, 'upgraded view config');
      // Initialize the view config according to the initStrategy.
      const [typeCheckSuccess, typeCheckMessage] = checkTypes(upgradedConfig);
      if (typeCheckSuccess) {
        try {
          const initializedConfig = initialize(upgradedConfig);
          logConfig(initializedConfig, 'initialized view config');
          return [initializedConfig, true];
        } catch (e) {
          return [{
            title: 'View config initialization failed.',
            unformatted: e.message,
          }, false];
        }
      }
      return [{
        title: 'View config checks failed.',
        unformatted: typeCheckMessage,
      }, false];
    }
    return [upgradedConfig, false];
  }, [config, onConfigUpgrade]);

  // Emit the upgraded/initialized view config
  // to onConfigChange if necessary.
  useEffect(() => {
    if (success && !isEqual(configOrWarning, config) && onConfigChange) {
      onConfigChange(configOrWarning);
    }
  }, [success, config, configOrWarning, onConfigChange]);

  return success ? (
    <StylesProvider generateClassName={generateClassName}>
      <ThemeProvider theme={muiTheme[theme]}>
        <ViewConfigProvider createStore={createViewConfigStore}>
          <AuxiliaryProvider createStore={createAuxiliaryStore}>
            <VitessceGrid
              config={configOrWarning}
              getComponent={getComponent}
              rowHeight={rowHeight}
              height={height}
              theme={theme}
              isBounded={isBounded}
            />
            <CallbackPublisher
              onWarn={onWarn}
              onConfigChange={onConfigChange}
              onLoaderChange={onLoaderChange}
              validateOnConfigChange={validateOnConfigChange}
            />
          </AuxiliaryProvider>
        </ViewConfigProvider>
      </ThemeProvider>
    </StylesProvider>
  ) : (
    <Warning
      theme={theme}
      {...configOrWarning}
    />
  );
}
