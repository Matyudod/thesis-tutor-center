$(document).ready(function () {
    if (document.querySelector("table.table-allow-pagination")) {
        let headerTags = document.querySelectorAll("th");
        let length = 10;
        if (
            document.querySelector("table.table-allow-pagination").getAttribute("page-length") !=
            null
        ) {
            length = parseInt(
                document.querySelector("table.table-allow-pagination").getAttribute("page-length")
            );
        }
        let options = [];
        headerTags.forEach(x => {
            let optionColumns = {};
            if (x.classList.contains("non-orderable")) {
                optionColumns.orderable = false;
            }
            if (x.classList.contains("non-searchable")) {
                optionColumns.searchable = false;
            }
            options.push(Object.keys(optionColumns).length === 0 ? null : optionColumns);
        });
        $("table.table-allow-pagination").dataTable({
            bInfo: false,
            bLengthChange: false,
            paginate: true,
            paging: true,
            responsive: true,
            pageLength: 10,
            colReorder: true,
            columns: options,
            pagingTag: "button",
        });
    }
});
