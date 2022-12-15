using System.Data;

namespace Health.DTO
{
    public class CustomerDTO
    {
        public List<Customer> DataList { get; set; }
    }
    public class Customer
    {
        public int CustomerId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Gender { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string PhoneNumber { get; set; }
        public string EmailAddress { get; set; }
        public string City { get; set; }
        public string PostalCode { get; set; }
        public int IsActive { get; set; }
        public string Mode { get; set; }
    }
}
