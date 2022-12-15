namespace Health.DTO
{
    public class BookingDTO
    {
        public List<Booking> DataList { get; set; }
    }
    public class Booking
    {
        public string Mode { get; set; }
        public int BookingOrderID { get; set; }
        public int LabTestID { get; set; }
        public int CustomerId { get; set; }
        public int StatusId { get; set; }
        public string Description { get; set; }
        public string TimeSlot { get; set; }
        public string DateSlot { get; set; }
        public string Result { get; set; }
        public int IsActive { get; set; }
        public string createdOn { get; set; }
        public string UpdatedOn { get; set; }
    }
}
