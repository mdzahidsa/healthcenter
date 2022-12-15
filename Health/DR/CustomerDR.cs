using Health.DTO;
using System.Data;
using System.Data.SqlClient;
using System;
using System.Collections.Generic;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Diagnostics.Metrics;
using System.Runtime.Intrinsics.Arm;

namespace Health.DR
{
    public class CustomerDR
    {
        public CustomerDTO GetCustomers(Customer Customer, SqlConnection connection)
        {
            CustomerDTO CustomerDTO_ = new CustomerDTO();
            List<Customer> Customer_ = new List<Customer>();
            SqlDataAdapter command = new SqlDataAdapter("sp_customer", connection);
            command.SelectCommand.CommandType = CommandType.StoredProcedure;
            command.SelectCommand.Parameters.AddWithValue("@Mode", Customer.Mode);
            switch (Customer.Mode.ToLower())
            {
                case "edit":
                case "updateregistration":
                case "delete":
                    command.SelectCommand.Parameters.AddWithValue("@CustomerId", Customer.CustomerId);
                    break;
            }
            command.SelectCommand.Parameters.AddWithValue("@FirstName", Customer.FirstName);
            command.SelectCommand.Parameters.AddWithValue("@LastName", Customer.LastName);
            command.SelectCommand.Parameters.AddWithValue("@Gender", Customer.Gender);
            command.SelectCommand.Parameters.AddWithValue("@Address1", Customer.Address1);
            command.SelectCommand.Parameters.AddWithValue("@Address2", Customer.Address2);
            command.SelectCommand.Parameters.AddWithValue("@EmailAddress", Customer.EmailAddress);
            command.SelectCommand.Parameters.AddWithValue("@PhoneNumber", Customer.PhoneNumber);
            command.SelectCommand.Parameters.AddWithValue("@PostalCode", Customer.PostalCode);
            command.SelectCommand.Parameters.AddWithValue("@IsActive", Customer.IsActive);
            command.SelectCommand.Parameters.AddWithValue("@City", Customer.City);
            connection.Open();
            SqlDataReader rdr = command.SelectCommand.ExecuteReader();
            while (rdr.Read())
            {
                Customer customer = new Customer();
                customer.CustomerId = Convert.ToInt32(rdr["CustomerId"]);
                customer.FirstName = rdr["FirstName"].ToString();
                customer.LastName = rdr["LastName"].ToString();
                customer.Address1 = rdr["Address1"].ToString();
                customer.Address2 = rdr["Address2"].ToString();
                customer.Address2 = rdr["City"].ToString();
                customer.Gender = rdr["Gender"].ToString();
                customer.EmailAddress = rdr["EmailAddress"].ToString();
                customer.PhoneNumber = rdr["PhoneNumber"].ToString();
                customer.PostalCode = rdr["PostalCode"].ToString();
                customer.IsActive = Convert.ToInt32(rdr["IsActive"]);
                Customer_.Add(customer);
            }
            CustomerDTO_.DataList=Customer_;
            return CustomerDTO_;
        }
    }
}
