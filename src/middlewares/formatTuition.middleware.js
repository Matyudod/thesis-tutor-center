module.exports = function (number) {
    let tuition = "";
    if (number.toString().length > 6) {
        tuition =
            Math.floor(number / 1000000).toString() +
            "tr" +
            Math.floor(number % 1000000)
                .toString()
                .replace(/0+$/, "");
    } else {
        tuition = Math.floor(number / 1000).toString() + "k";
    }
    return tuition;
};
