
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

function LoadGrid(GridList) {
    if (!($("#tblMain").data("kendoGrid") == null)) {
        $("#tblMain").data("kendoGrid").destroy();
        $("#tblMain").html("");
    };
    kendo.ui.progress($("#tblMain"), true);
    $("#tblMain").kendoGrid({
        dataSource: {
            data: GridList,
            pageSize: 10
        },
        sortable: true,
        filterable: true,
        groupable: false,
        pageable: {
            refresh: false,
            pageSizes: true,
            buttonCount: 3
        },
        columns: [
                { field: "firstName", title: "First Name", width: 150 },
                { field: "lastName", title: "Last Name", width: 100 },
                { field: "phoneNumber", title: "Phone Number", width: 100 },
                { field: "emailAddress", title: "Email Address", width: 100 },
                { title: "Edit", width: 100, filterable: false, template: EditTemplate },
                { title: "Delete", width: 100, filterable: false, template: DeleteTemplate }
        ],
        dataBound: function (e) {
            if (e.node == undefined) {
                kendo.ui.progress($("#tblMain"), false);
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
            LoadGrid(data.dataList);
            CustomerClear();
        },
        error: function (err) {
            alert(err);
        }
    });
}
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

let startDate = document.getElementById('startDate')
startDate.addEventListener('change',(e)=>{
  let startDateVal = e.target.value
  document.getElementById('startDateSelected').innerText = startDateVal
})