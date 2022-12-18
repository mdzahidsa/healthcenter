# healthcenter
This is Git commit from Jeevan and Mohamed Zahid
# Designing the project flow
working on with API's and stored procedures.
Techonologies used for our project:
Front End: HTML 5,Bootstrap 5,Javascript
Back End:.netcore 6.0,WebAPI.
Tools :Microsoft SQL server Management Studio,Swagger,Postman.

                                                         Introduction
Modern terminology refers to developments or advancements. The topics that require the most care are now those related to speed, accuracy, dependability and efficiency.

​The owners of medical establishments will find our project HEALTHCENTER to be a significant help in running their businesses. Our proposal, which promises to meet their need for contemporary health care services.

​This project primarily focuses on the registration, appointment scheduling, and test completion results.

                                                         Existing System
​Time consuming
​Expensive
​Man power
​Stationary and miscellaneous
​Scanning through infinite registers
​Obsolete security

                                                          Proposed system
​Our project was created to address the flaws in the existing system.
​The proposed system's biggest benefit is that it will require less labor and money to operate.
​The proposed solution will drastically cut down on the tedious manual paper processing.

                                                          Technologies Used 
Visual Studio 2022 / Visual studio code
​.NET CORE 6.0 framework ,C# .,WEBAPI.
​Microsoft SQL Server Management Studio
​Store procedures 
​HTML,Bootstrap–Jquery ,Ajax 

                                                          Main Features
​Create-Created a registartion form need to fill the details like customer First name, Last name, select gender,email address,phone number,Address1,Address2,city,Postal code, after filling the details all information will be stored in database and it will dispalyed in the table. 
​Update -User can alter/update the data in registration form. For example if customer changes their  new mobile number, old nobile number should be deleted and must update the new mobile number.  
​Delete- Admin can delete the customer's data
​View- The customer can view their details in table, booking details and results can view in the from of table.
​Sorting -The data which is present in a table will be displayed in sorting format in ascending order.
​Filter-	FILTER operation helps the user to search details of the customer. It is a problem in the existing system because the user must look through hundreds of records in a register to find a certain consumer But by using filter operation we can search for a customer’s  appropriate information in just few seconds .
​Validation -For every input/details that has been entering by customer that has been validated for example: some times customer will enter wrong  mobile number, in order to avoid used validation for mobile number should be between 1-9 and it must contains 9 digits of numeric. 
Search-


This project gives 4 main scenarios for the user:
1. Customer registration
2. Booking Test
3. Admin 
4. Lab

                                                         MODULE DESCRIPTION

1.	Customer registration
The customer's first name, last name, phone number, email address,address,city and postal code are entered into the customer registration  form.
2.	Booking Test 
The customer’s details are fetched by id and name. Here, the customer description is entered. The booking created date and time is auto generated by the system.
3.	Admin 
The customer’s booking is retrieved, and test date slot is allotted. The admin is also authorized to edit, delete the customers.
4.	Lab 
The Lab staff after the test is done, submits the result.

                                                          DATABASE DESIGN:
Microsoft SQL server management studio has been used to design the database system by stored procedure concept.
It consists of 3 main tables ,namely: customer table ,booking table and lab test table.

1.Customer table :
It consist of [CustomerId],[FirstName] ,[LastName], [Gender], [Address1],[Address2], [PhoneNumber] ,[EmailAddress] ,[City]  and [PostalCode].Where CustomerID is the primary key.

2. booking table :
It consist of [BookingOrderID] ,[LabTestID], [CustomerId],[Description],[TimeSlot], [Result],[IsActive], [CreatedOn],[UpdatedOn] and [DateSlot] .Where BookingOrder is the primary key.LabTestID ,CustomerId is referred as foreign keys .

3.Lab test table:
It consist of  [LabTestID],[TestName].Where LabTestID is the primary key.


                                                          SYSTEM REQUIREMENTS:

Operating System :windows 10 / 11
Hardware minimun :4GB
Visual Studio 2022
Visual Studio Code
Microsoft SQL Server 2019
Microsoft SQL Server Management Studio


                                                         CREATION OF THIS PROJECT
How we created a project visual studio project.
Install --> Visual Studio 2022
Create a new projet --> .Net Core Web API VERSION 
create a project name->Health centre
selected the framework ->.net 6.0 and click on create button.

controller->
Right click and select and add controller->select API->API controller-EMPTY.
By default packages was installed,for swagger installed package ->Swashbuckle.AspNetCore for swagger.
click on project right click->Manage NuGet pacakges->new window will be dispalyed install System.Ddata.sqlClient
To enable all the ports we added cors method Services.AddCors build.WithOrigins("*").AllowAnyMethod().AllowAnyHeader(); in program.cs file.
To establish the conection within database->
click on appsetting .json->"ConnectionStrings": {
    "HealthcenterConn": "Data Source=jeevan\\MSSQLSERVER01;Initial Catalog=HealthCenterDB;User ID=sa;password=123456;Integrated Security=true"
  },
creation of database->
Install SQL server and Microsoft sql server mangement studio
Sql server was used->Langugae used (MSSQL)
created a database files 
Testing an api->inbulit packages to install swagger,to test an api swagger was used
Installed visual studio code for front end
created a project health center and written html file and json file ,javascript file.
We used library references for bootstrap href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css" ,https://getbootstrap.com/ taken form website.
We used library references for bootstrap href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap-theme.min.css"  ,https://getbootstrap.com/ taken form website.
We used library references for Jquery "https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"  ,https://jquery.com/ taken form website.
We used library references for BootStrap "https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/js/bootstrap.min.js",https://getbootstrap.com/  taken form website.
We used library references for Kendo "https://kendo.cdn.telerik.com/2022.3.1109/styles/kendo.default-main.min.css",https://demos.telerik.com/kendo-ui/grid/index taken form website.
We used library references for Kendo "https://kendo.cdn.telerik.com/2022.3.1109/js/jquery.min.js",https://demos.telerik.com/kendo-ui/grid/index taken form website.
We used library references for Kendo "https://kendo.cdn.telerik.com/2022.3.1109/js/kendo.all.min.js",https://demos.telerik.com/kendo-ui/grid/index taken form website.kendo links for grid binding.
We used library references for font "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css", https://fontawesome.com/ form website.

                                                            EXECUTION

Open Visual studio 2022
Run the project by double clicking on Health.sln which can be found in Health folder.
  
The user must configure the connection string which can be found in appsettings.json file.

  "ConnectionStrings": {
    "HealthcenterConn": "Data Source=DELL\\SQLEXPRESS;Initial Catalog=HealthCenterDB;Integrated Security=true"
  },


Open MS SQL Server Management studio copy the server’s name and paste it at Data source. This must have  ” \\”. Initial Catalog should be your Database name. In this .NET CORE project it is HealthCenterDB.

Create database name HealthCenterDB in the MS SQL Management studio then Run the script.sql file consisting of creation of tables and stored procedures .

In Visual studio 2022 ,Run the project by pressing the START button.
Open the front .html file in visual studio code 
Run the front.html file , Right click and choose Open with live server.

MS SQL Stored procedure :
The database consist of 4 tables namely customer,booking,labtest and status
Mode parameter which  various functions assigned to it like registration ,Edit ,updateregistration,delete and RegistrationActive in storedprocedure customer .
And book,search, Adminbook and Labtech in stored procedure booking.

Mode:registration - it inserts details provided in customer registration .updateregistration is used to edit customer information .delete is used to remove a customer.

After registration the next tab is book .Where the booking is proceeded by entering description of the customer.Then it is submited to Admin to Allot time.
Mode:book - it inserts details provided in booking tab i.e description ,CreatedOn date is the system generated current date which can be achived by using GETDATE() .Once the description is filled then is awaits admin to allocate appontment time slot.

Mode: Admin ,updates the booking  table by allocating the date and time slot.The updateon date is updated by auto generated current system time by GETDATE().

Mode:LabTest,The result is entered in result section.

The book user can view the status of result ,appointment allocated or send to admin in the table present in UI.



                                                                TESTING
Firstly ,Swagger was used to test APIs for GET ,POST  methods and the database connection .It also helped us to check for bugs and resolve them.Debugger was used to trace the bugs in the program.

Secondly, Postman was also used to test the overall working of the environment including APIs ,AJAX Calls ,GET,POST,UPDATE and DELETE .
During the process we faced challenges like CORS policy error,HTTP 400 Bad request, ,AJAX calls not responding as expected and we resolved them.
To test the data flow of API debugger points were used.
We encountered a bug called CORS policy error. This issue was caused due to cross platform hosting. This is issue is fixed  from the backend  .net core (Visual studio 2022). This can be done by configuring the  Program.cs.

Services.AddCors
build.WithOrigins("*").AllowAnyMethod().AllowAnyHeader();

                                                         TEAM CONTRIBUTION
                                                                         
Makam Jeevan Sai   :


Mohammed Zahid     :



Kallepu Meena Kumari  (10627538)     :
Contribution:Kallepu Meena Kumari
Designed layout for project , started creating a web page, with techonologies Html 5 and bootstrap 4 tabs ,Customer,Booking,Admin,Lab and Results,After created Customer tab created registartion form with inputs for text ,First Name ,Last Name,radio button for select gender male, female, created text input for email address,Phone number,Address1, Address2,City,Postal code,created a button register
and clear button for register button had implemented Insert Customer() and clear button for customerclear(), register button has link that hits ajax calls thats registration form user has to enter details that details will be stored in database and used kendo for creating a tables the user details will be displayed in the table.
Created Booking table with select customer dropdown ,select test dropdown and text area for description, button for book ,used kendo for creating table, In Admin tab created  select booking order dropdown datapicker and time picker in Html and written javascript code in main.js and allocate button .In Lab table created select booking dropdown and text area for result to write the result and created button. written main.js file with functions for Insertcustomer ,Load grib for creating and fetching data for tables and ajax calls for customer,Booking function and ajax call and booking clear function.
Helped in creating API and tested api using swagger post call, get call, update call, delete call.
Helped while creating databse in microsoft Microsoft sql server management studio and also establishing connection between front end and backend.

Kesoju Vineeth     :






