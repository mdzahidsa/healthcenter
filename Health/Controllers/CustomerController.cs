using Health.DTO;
using Health.DR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Data.SqlClient;
using System.Data;

namespace Health.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        public readonly IConfiguration _configuration;
        public CustomerController(IConfiguration configuration)
        {
            _configuration=configuration;
        }

        [HttpPost]
        [Route("Registration")]
        // POST: api/Users
        public CustomerDTO Registration(Customer Customer)
        {
            CustomerDTO CustomerDTO = new CustomerDTO();
            SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("HealthcenterConn").ToString());
            CustomerDR CustomerDR = new CustomerDR();
            return CustomerDR.GetCustomers(Customer, connection);
        }
        [HttpPost]
        [Route("Booking")]
        // POST: api/Users
        public BookingDTO Booking(Booking Booking)
        {
            BookingDTO BookingDTO = new BookingDTO();
            SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("HealthcenterConn").ToString());
            BookingDR BookingDR = new BookingDR();
            return BookingDR.GetBooking(Booking, connection);
        }
    }
}
