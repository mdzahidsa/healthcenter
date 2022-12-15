
   var customerId = 0;
   //------------inserting register function-------------------

    function customerreg(){
    var reg = {};
    
    reg.customerId=0;
    if(customerId == 0){
        reg.mode = 'registration';
    }
    else{
        reg.mode = 'registration';
    }
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
    // method: 'post',
    // data: '{data: ' + JSON.stringify(data) + '}',
    contentType: "application/json; charset=utf-8",
    $.ajax({
        url: 'http://localhost:47995/api/Customer/Registration',
        method: 'POST',
        // dataType: 'json',
        data: JSON.stringify(reg),
        contentType: "application/json; charset=utf-8",
        success: function (data) { 
                alert("inserted");
        },
        error: function (err) {
            console.log(err);
        }
    });
}

// $.ajax({
//     url: 'DataService.asmx/InsertRegister',
//     method: 'post',
//     data: '{data: ' + JSON.stringify(data) + '}',
//     contentType: "application/json; charset=utf-8",
//     success: function () { 
//         if (data.Id == 0) {
//             alert("inserted");
//             openTab(event, 'Record');
//             loadData();
//         } else {
//             alert("updated");
//             openTab(event, 'Record');
//             loadData();
            
//         }
//     },
//     error: function (err) {
//         alert(err);
//     }
// });
