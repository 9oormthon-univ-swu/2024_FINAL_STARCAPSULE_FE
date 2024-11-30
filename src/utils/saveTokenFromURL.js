export const saveTokenFromURL = (login) => {
    const token = new URL(window.location.href).searchParams.get('token');

    if (token) {
        login(token);
        const url = new URL(window.location.href);
        url.searchParams.delete('token');
        window.history.replaceState({}, document.title, url.pathname);
    }
};
