module.exports = (query, filter) => {
    if (filter != null) {
        let sizeOfPage = 12;
        let page = 1;
        if (filter != null) {
            if (typeof filter.sizeOfPage != "undefined") {
                sizeOfPage = filter.sizeOfPage;
                if (typeof filter.page != "undefined") {
                    page = filter.page;
                }
            }
            if (typeof filter.sortBy != "undefined") {
                let sortBy = filter.sortBy;
                let isReverse = 1;
                if (typeof filter.isReverse != "undefined") {
                    isReverse = filter.isReverse ? -1 : 1;
                }
                let sorting = [];
                sorting[sortBy] = isReverse;
                query.sort(Object.assign({}, sorting));
            }
        }
        query.limit(sizeOfPage);
        query.skip(sizeOfPage * (page - 1));
        return page;
    }
};
