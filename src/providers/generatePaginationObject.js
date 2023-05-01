module.exports = (sizeOfPage =12, page = 1, sortBy = "_id", isReverse = false) => {
    return {
        sizeOfPage: sizeOfPage,
        page: page,
        sortBy: sortBy,
        isReverse :isReverse
    }
};