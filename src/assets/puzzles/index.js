const puzzles = Array.from({ length: 32 }, (_, index) => {
    return new URL(`./puzzle_${index}.svg`, import.meta.url).href;
});

export default puzzles;
