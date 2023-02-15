import * as UAParser from 'ua-parser-js';

const getContext = (href): 'pwa' | 'browser' => {
  if (
    strContains(href, 'installed=true') ||
    window.matchMedia('(display-mode: standalone)').matches
  )
    return 'pwa';

  return 'browser';
};

const getPlatform = (device): 'mobile' | 'other' => {
  if (
    strContains(device?.device?.type, 'mobile') ||
    strContains(device?.os?.name, 'iOS') ||
    strContains(device?.os?.name, 'Android')
  ) {
    return 'mobile';
  }

  return 'other';
};

const isInstalled = (): boolean => {
  if (localStorage.getItem('pwa_installed') === '1') return true;
  return false;
};

const canInstall = (device): boolean => {
  if (
    strContains(device?.os?.name, 'iOS') &&
    strContains(device?.browser?.name, 'Safari')
  )
    return true;

  if (
    strContains(device?.os?.name, 'Android') &&
    strContains(device?.browser?.name, 'Chrome')
  )
    return true;

  return false;
};

const getInstallableBrowser = (device): 'chrome' | 'safari' => {
  if (strContains(device?.os?.name, 'iOS')) return 'safari';
  if (strContains(device?.os?.name, 'Android')) return 'chrome';

  return null;
};

const strContains = (strA = '', strB = '') => {
  return strA.toLowerCase().trim().indexOf(strB.toLowerCase().trim()) !== -1;
};

export const pwaContext = () => {
  const device = new UAParser().getResult();
  const href = location.href;
  const context = getContext(href);
  const platform = getPlatform(device);
  const installed = isInstalled();
  const installable = canInstall(device);
  let stage: 'install' | 'redirect' | 'reinstall' | 'show';
  let browser: 'safari' | 'chrome';

  if (getContext(href) === 'pwa') {
    localStorage.setItem('pwa_installed', '1');
  }

  if (getContext(href) === 'browser' && getPlatform(device) === 'mobile') {
    if (!isInstalled()) {
      browser = getInstallableBrowser(device);

      if (canInstall(device)) {
        stage = 'install';
      } else {
        stage = 'redirect';
      }
    } else {
      stage = 'reinstall';
    }
  } else {
    stage = 'show';
  }

  return {
    stage,
    browser,
    context,
    platform,
    installed,
    installable,
    device,
    href,
  };
};
