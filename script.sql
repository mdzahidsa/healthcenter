Create Database [HealthCenterDB]
USE [HealthCenterDB]
GO
/****** Object:  XmlSchemaCollection [dbo].[EducationSchemaCollection]    Script Date: 12/18/2022 3:03:02 PM ******/
CREATE XML SCHEMA COLLECTION [dbo].[EducationSchemaCollection] AS N'<xsd:schema xmlns:xsd="http://www.w3.org/2001/XMLSchema"><xsd:element name="certification"><xsd:complexType><xsd:complexContent><xsd:restriction base="xsd:anyType"><xsd:sequence><xsd:element name="year" type="xsd:int" /><xsd:element name="qualification" type="xsd:string" /></xsd:sequence></xsd:restriction></xsd:complexContent></xsd:complexType></xsd:element><xsd:element name="education_history"><xsd:complexType><xsd:complexContent><xsd:restriction base="xsd:anyType"><xsd:sequence><xsd:element ref="certification" maxOccurs="unbounded" /></xsd:sequence></xsd:restriction></xsd:complexContent></xsd:complexType></xsd:element></xsd:schema>'
GO
/****** Object:  Table [dbo].[BookingOrders]    Script Date: 12/18/2022 3:03:02 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[BookingOrders](
	[BookingOrderID] [int] IDENTITY(1,1) NOT NULL,
	[LabTestID] [int] NOT NULL,
	[CustomerId] [int] NOT NULL,
	[Description] [varchar](max) NULL,
	[TimeSlot] [time](0) NULL,
	[StatusId] [int] NOT NULL,
	[Result] [varchar](max) NULL,
	[IsActive] [bit] NULL,
	[CreatedOn] [datetime] NULL,
	[UpdatedOn] [datetime] NULL,
	[DateSlot] [date] NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Customer]    Script Date: 12/18/2022 3:03:02 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Customer](
	[CustomerId] [int] IDENTITY(1,1) NOT NULL,
	[FirstName] [nvarchar](50) NOT NULL,
	[LastName] [nvarchar](50) NULL,
	[Gender] [nvarchar](50) NOT NULL,
	[Address1] [nvarchar](100) NOT NULL,
	[Address2] [nvarchar](100) NULL,
	[PhoneNumber] [nvarchar](22) NOT NULL,
	[EmailAddress] [varchar](100) NOT NULL,
	[City] [varchar](100) NULL,
	[PostalCode] [nvarchar](100) NULL,
	[IsActive] [bit] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[LabTest]    Script Date: 12/18/2022 3:03:02 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[LabTest](
	[LabTestID] [int] IDENTITY(1,1) NOT NULL,
	[TestName] [nvarchar](50) NOT NULL
) ON [PRIMARY]
GO
INSERT INTO LabTest (TestName) VALUES ('Covid Test');
INSERT INTO LabTest (TestName) VALUES ('Blood Test');
INSERT INTO LabTest (TestName) VALUES ('CT Scan');
INSERT INTO LabTest (TestName) VALUES ('MRI Test');


/****** Object:  Table [dbo].[Status]    Script Date: 12/18/2022 3:03:02 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Status](
	[StatusId] [int] IDENTITY(1,1) NOT NULL,
	[StatusCode] [nchar](10) NOT NULL,
	[StatusName] [nvarchar](50) NOT NULL
) ON [PRIMARY]
GO
INSERT INTO Status (StatusCode,StatusName) VALUES ('New','Send to Admin');
INSERT INTO Status (StatusCode,StatusName) VALUES ('AA','Allocated Appointment');
INSERT INTO Status (StatusCode,StatusName) VALUES ('RS','Result');
/****** Object:  StoredProcedure [dbo].[sp_Booking]    Script Date: 12/18/2022 3:03:02 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE proc [dbo].[sp_Booking]
(
	@Mode VARCHAR(100),
	@BookingOrderID int = NULL,
	@LabTestID	int=NULL,
	@CustomerId int=NULL,
	@Description nvarchar(max) =NULL,
	@TimeSlot TIME (0) =NULL,
	@DateSlot DATE =NULL,
	@StatusId int =NULL,
	@Result nvarchar(max) =NULL,
	@IsActive bit =NULL
)
AS
BEGIN
	if @Mode='Book' begin
			insert into BookingOrders(LabTestID,CustomerId,Description, StatusId,IsActive, CreatedOn)
				values(	@LabTestID,@CustomerId,	@Description,@StatusId,1,GETDATE())	
	end
	else if @Mode='Search' begin
			Select * from BookingOrders order by BookingOrderID 
	end else if @Mode='AdminBook' begin
			Update BookingOrders set TimeSlot=@TimeSlot,DateSlot=@DateSlot,StatusId=@StatusId,UpdatedOn=GETDATE() where BookingOrderID= @BookingOrderID
	end else if @Mode='LabTech' begin
			Update BookingOrders set Result=@Result,StatusId=@StatusId where BookingOrderID= @BookingOrderID
	end
END
GO
/****** Object:  StoredProcedure [dbo].[sp_customer]    Script Date: 12/18/2022 3:03:02 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[sp_customer]
(
	@Mode VARCHAR(100),
	@CustomerId int = NULL,
	@FirstName	nvarchar(50)=NULL,
	@LastName nvarchar(50)=NULL,
	@Gender nvarchar(50) =NULL,
	@Address1 nvarchar(100) =NULL,
	@Address2 nvarchar(100) =NULL,
	@PhoneNumber nvarchar(22) =NULL,
	@EmailAddress varchar(100) =NULL,
	@City varchar(100) =NULL,
	@PostalCode nvarchar(100) =NULL,
	@IsActive BIT=NULL
)
AS
BEGIN
	if @Mode='registration' begin
			insert into Customer(FirstName,LastName,Gender,Address1,Address2,PhoneNumber,EmailAddress,City,PostalCode,IsActive)
				values(	@FirstName,@LastName,@Gender,@Address1,@Address2,@PhoneNumber,@EmailAddress,@City,@PostalCode,@IsActive)
			
end else if @Mode='Edit' begin
		select * from Customer where CustomerId= @CustomerId;
end else if @Mode='search' begin
		select * from Customer ORDER BY CustomerId DESC;
end else if @Mode='updateregistration' begin
		update Customer set FirstName= @FirstName,LastName= @LastName,Gender= @Gender,Address1= @Address1,Address2=@Address2,
				PhoneNumber=@PhoneNumber,EmailAddress=@EmailAddress,City= @City,PostalCode=@PostalCode 	
				where CustomerId= @CustomerId
end else if @Mode='delete' begin
		DELETE FROM Customer WHERE CustomerId= @CustomerId;

end else if @Mode='RegistrationActive' begin
		update Customer set IsActive= @IsActive	where CustomerId= @CustomerId;
end
		select * from Customer

END
GO
