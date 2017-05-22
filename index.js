var taskRunner = function(params) {
    var that = this;
    $("#datePicker").datepicker();
    this.displayTable(params);
    $('#addTask').on('submit', function(e) {
        e.preventDefault();
        var str = $(this).serializeArray();
        var rowData = that.newRow(str);
        $.each(rowData,function(key,value){
           if ($.trim(value["name"]).length === 0 || value["date"] === '' || $.trim(value["assigned"]).length === 0 ) {
                return false;
            }
            else{
                that.displayTable(rowData);
            } 
        });
    });

}
taskRunner.prototype.displayTable = function(params) {
        var html = '';
        $.each(params, function(key, value) {
                html += '<tr><td>' +
                    value["name"] +
                    '</td><td>' +
                    value["date"] +
                    '</td><td>' +
                    value["assigned"] +
                    '</td></tr>';
            });
        $('#dataTable').prepend(html);

    };
taskRunner.prototype.newRow = function(str) {
        var newObj = {};
        var newArr = [];
        var i = 0;
        for (var i in str) {
            newObj[str[i].name] = str[i].value;
        }
        newArr.push(newObj);
      return newArr;
   };