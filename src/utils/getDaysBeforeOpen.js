const getDaysBeforeOpen = () => {
    const today = new Date();
    const year = today.getFullYear();

    const startDate = new Date(year, 10, 30);
    const endDate = new Date(year, 11, 31);
    const dec30 = new Date(year, 11, 30);

    if (today >= startDate && today <= dec30) {
        const timeDiff = endDate - today;
        const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

        return daysLeft;
    } else {
        return 0;
    }
};

export { getDaysBeforeOpen };
