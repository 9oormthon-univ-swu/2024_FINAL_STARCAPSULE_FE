export const isPwaInstalled = () => {
    if (window.matchMedia('(display-mode: standalone)').matches) {
        return true;
    }

    if (
        typeof window.navigator.standalone !== 'undefined' &&
        window.navigator.standalone
    ) {
        return true;
    }

    const pwaInstalledFlag = localStorage.getItem('pwaInstalled');
    if (pwaInstalledFlag === 'true') {
        return true;
    }

    return false;
};
