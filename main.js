    var reg={
    customerId: 0,
    firstName: "",
    lastName: "",
    gender: "",
    address1: "",
    address2: "",
    phoneNumber: "",
    emailAddress: "",
    city: "",
    postalCode: "",
    isActive: 1,
    mode: ""
  }
  var Booking ={
    mode: "string",
    bookingOrderID: 0,
    labTestID: 0,
    customerId: 0,
    statusId: 0,
    description: "string",
    timeSlot: "string",
    dateSlot: "string",
    result: "string",
    isActive: 0,
    createdOn: "string",
    updatedOn: "string"
  }
var CustomerData = [];
var BookingData = [];
var labTestList =[];
var statusList =[
    {
      statusId: 1,
      statusName: "Send To Admin"
    },
    {
      statusId: 2,
      statusName: "Allocated Appointment"
    },
    {
      statusId: 3,
      statusName: "RESULT"
    }
  ]
  var LabTestDDL = $('#LabTest');
  var CustomerListDDL = $('#CustomerList');
// on submit registration of customer
function InsertCustomer(){ 
    reg.firstName = $('#firstName').val();
    reg.lastName = $('#lastName').val();
    reg.gender = $('input[name="gender"]:checked').val();
    reg.emailAddress = $('#emailAddress').val();
    reg.phoneNumber = $('#phoneNumber').val();
    reg.address1 = $('#address1').val();
    reg.address2 = $('#address2').val();
    reg.city = $('#city').val();
    reg.postalCode = $('#postalCode').val();
    reg.isActive = 1;
    if(reg.customerId == 0){
        CustomerAJAX(reg,'registration')
    }
    else{
        CustomerAJAX(reg,'updateregistration')
    }
}
//Kendo UI Grid Binding
function LoadGrid(GridList,TableName) {
    var columnsData =[];
    switch(TableName){
        case "#tblMain":
            columnsData =  [
                { field: "firstName", title: "First Name", width: 150 },
                { field: "lastName", title: "Last Name", width: 100 },
                { field: "phoneNumber", title: "Phone Number", width: 100 },
                { field: "emailAddress", title: "Email Address", width: 100 },
                { title: "Edit", width: 100, filterable: false, template: EditTemplate },
                { title: "Delete", width: 100, filterable: false, template: DeleteTemplate }
            ];
            break;
        case '#tblLabbooking':
        case '#tblbooking':
            columnsData =[
                { field: "CustomerInfo", title: "Customer Infomation", width: 150 },
                { field: "labTest", title: "lab Test Name", width: 100 },
                { field: "description", title: "Description", width: 150 },
                { field: "dateSlot", title: "Date", width: 100 },
                { field: "timeSlot", title: "Time", width: 100 },
                { field: "result", title: "Result", width: 150 },
                { field: "Status", title: "Status", width: 150 }
            ];
            break;
        case "#tblAdminbooking":
            columnsData =[
                { field: "CustomerInfo", title: "Customer Infomation", width: 200 },
                { field: "labTest", title: "lab Test Name", width: 100 },
                { field: "description", title: "Description", width: 150 },
                { field: "Status", title: "Status", width: 150 },
            ];
            break;
    }
    if (!($(TableName).data("kendoGrid") == null)) {
        $(TableName).data("kendoGrid").destroy();
        $(TableName).html("");
    };
    kendo.ui.progress($(TableName), true);
    $(TableName).kendoGrid({
        dataSource: {
            data: GridList,
            pageSize: 10
        },
        sortable: true,
        filterable: true,
        groupable: false,
        reorderable: true,
        resizable: true,
        pageable: true,
        noRecords: true,
        messages: {
            noRecords: "There is no data on current Tab"
          },
        pageable: {
            refresh: false,
            pageSizes: true,
            buttonCount: 3
        },
        columns: columnsData,
        dataBound: function (e) {
            if (e.node == undefined) {
                kendo.ui.progress($(TableName), false);
            }
        }
    }).data("kendoGrid");
    
};
// edit template
function EditTemplate(e) {
    var tmpCol = "<span onclick='edit(" + e.customerId + ")' title='Edit'>Edit</span>";
    return tmpCol;
}

function DeleteTemplate (e) {
    var tmpCol = "<span onclick='regdelete(" + e.customerId + ")' title='Deleted'>Delete</span>";
    return tmpCol;
}

//edit functin
window.edit = function (Id) {
    reg.customerId=Id;
    CustomerAJAX(reg,'Edit');
};
//delete functin
window.regdelete = function (Id) {
    reg.customerId=Id;
    CustomerAJAX(reg,'delete');
};
// allocate function
window.allocate=function(Id){

}

// Ajax call
CustomerAJAX(reg,"search");
function CustomerAJAX(reg,mode){
    reg.mode=mode;
    $.ajax({
        url: 'http://localhost:47995/api/Customer/Registration',
        method: 'POST',
        data: JSON.stringify(reg),
        contentType: "application/json; charset=utf-8",
        success: function (data) { 
            if(mode=='Edit'){
              var EditReg= data.dataList[0]; 
              reg.customerId=EditReg.customerId;
              $('#firstName').val(EditReg.firstName) ;
              $('#lastName').val(EditReg.lastName);
              $('#emailAddress').val(EditReg.emailAddress);
              $('#phoneNumber').val(EditReg.phoneNumber);
              $('#address1').val(EditReg.address1);
              $('#address2').val(EditReg.address2);
              $('#city').val(EditReg.city);
              $('#postalCode').val(EditReg.postalCode);
              if(EditReg.gender == "male"){
                  $("#male").prop("checked", true);
              }else{
                  $("#female").prop("checked", true);
              } 
              $('#register').html("Update");  
            return;
            }
            CustomerData = data.dataList;
            LoadGrid(data.dataList,'#tblMain');

            $('#CustomerList').empty();
            $('#CustomerList').append($('<option/>', { value: -1, text: 'Select Customer' }));
            $(data.dataList).each(function (index, item) {
                $('#CustomerList').append($('<option/>', { value: item.customerId, text: item.firstName + "  ( " + item.emailAddress + " )" }));                           
                });
                $('#CustomerList').val('-1');
            CustomerClear();
        },
        error: function (err) {
            alert(err);
        }
    });
}
// insert booking function
function InsertBooking(mode){
    switch(mode){
        case "Book":
            Booking.labTestID = $('#LabTest').val();
            Booking.customerId = $('#CustomerList').val();
            Booking.description = $('#description').val();
            Booking.StatusId = 1;
            break;
        case "AdminBook":
            Booking.bookingOrderID = $('#AdminBookingOrder').val();
            Booking.dateSlot = $('#dateSlot').val();
            Booking.timeSlot = $('#timeSlot').val();
            Booking.StatusId = 2;
            break;
        case "LabTech":
            Booking.bookingOrderID = $('#LabBookingOrder').val();
            Booking.result = $('#Result').val();
            Booking.StatusId = 3;
            break;

    }
    BookingAJAX(Booking,mode)
}
// Ajax call
function BookingAJAX(Booking,mode){
    Booking.mode=mode;
    $.ajax({
        url: 'http://localhost:47995/api/Customer/Booking',
        method: 'POST',
        data: JSON.stringify(Booking),
        contentType: "application/json; charset=utf-8",
        success: function (data) { 
            // GetStatus()
            BookingClear();
            if(mode == "search"){
                BookingData = data.dataList;
                BookingData.forEach((element) => { 
                    if(CustomerData.filter(x => x.customerId === element.customerId)[0]){
                        let CustomerObj = CustomerData.filter(x => x.customerId === element.customerId)[0]; 
                         element.CustomerInfo = CustomerObj.firstName+ " " + CustomerObj.lastName + " ("+CustomerObj.emailAddress+")";
                    }else {
                        element.CustomerInfo ="Deleted  customer Cannot be Shown";
                    }
                    element.labTest = labTestList.filter(x => x.labTestID === element.labTestID)[0].testName;
                    element.Status = statusList.filter(x => x.statusId === element.statusId)[0].statusName;
                });
                let BookingDataAdminTab = BookingData.filter(x => x.statusId === 1);
                let BookingDataLabTab = BookingData.filter(x => x.statusId === 2);
                // grid load functions
                LoadGrid(BookingData,'#tblbooking');
                LoadGrid(BookingDataAdminTab,'#tblAdminbooking');
                LoadGrid(BookingDataLabTab,'#tblLabbooking');
                // Admin tab dropdown binding
                $('#AdminBookingOrder').empty();
                $('#AdminBookingOrder').append($('<option/>', { value: -1, text: 'Select Booking Order' }));
                $(BookingDataAdminTab).each(function (index, item) {
                $('#AdminBookingOrder').append($('<option/>', { value: item.bookingOrderID, text: item.CustomerInfo + "  ( " + item.labTest + " )" }));                           
                });
                $('#AdminBookingOrder').val('-1');
                // Lab tap drop down Binding
                $('#LabBookingOrder').empty();
                $('#LabBookingOrder').append($('<option/>', { value: -1, text: 'Select Booking Order' }));
                $(BookingDataLabTab).each(function (index, item) {
                $('#LabBookingOrder').append($('<option/>', { value: item.bookingOrderID, text: item.CustomerInfo + "  ( " + item.labTest + " )" }));                           
                });
                $('#LabBookingOrder').val('-1');

            }else{
                BookingAJAX(Booking,"search");
            }
        },
        error: function (err) {
            alert(err);
        }
    });
}
// reset or cler data fields
function CustomerClear(){
    $('#firstName').val("") ;
    $('#lastName').val("");
    $('#emailAddress').val("");
    $('#phoneNumber').val("");
    $('#address1').val("");
    $('#address2').val("");
    $('#city').val("");
    $('#postalCode').val("")
    $("#male").prop("checked", false);
    $("#female").prop("checked", false);
    reg={
        customerId: 0,
        firstName: "",
        lastName: "",
        gender: "",
        address1: "",
        address2: "",
        phoneNumber: "",
        emailAddress: "",
        city: "",
        postalCode: "",
        isActive: 1,
        mode: ""
      }
      $('#register').html('Register');
}
//Lab test Dropdown getting and binding function
GetTest()
function GetTest(){
    $.ajax({
        url: 'http://localhost:47995/api/Customer/LabTest',
        method: 'GET',
        success: function (data) { 
            labTestList = data.labTestList;
            $('#LabTest').empty();
            $('#LabTest').append($('<option/>', { value: -1, text: 'Select Test Type' }));
                        $(data.labTestList).each(function (index, item) {
                            $('#LabTest').append($('<option/>', { value: item.labTestID, text: item.testName }));                           
                        });
                        $('#LabTest').val('-1');
        },
        error: function (err) {
            alert(err);
        }
    });
}
// // get status from database
// function GetStatus(){
//     $.ajax({
//         url: 'http://localhost:47995/api/Customer/Status',
//         method: 'GET',
//         success: function (data) { 
//             statusList = data.statusList;
//         },
//         error: function (err) {
//             alert(err);
//         }
//     });
// }
function BookingClear(){
    $('#LabTest').val('-1');
    $('#CustomerList').val('-1');
    $('#description').val("");
    $('#dateSlot').val("");
    $('#timeSlot').val("");
    $('#AdminBookingOrder').val('-1');
    $('#LabBookingOrder').val('-1');
    $('#Result').val("")
}