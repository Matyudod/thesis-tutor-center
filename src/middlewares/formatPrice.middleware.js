module.exports = function (price) {
    price = price.toString();
    price = price.replace(/[^\d]/g, "");
    return price.length > 0
        ? new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price)
        : "";
};
