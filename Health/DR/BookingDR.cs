using Health.DTO;
using System.Data.SqlClient;
using System.Data;

namespace Health.DR
{
    public class BookingDR
    {
        public BookingDTO GetBooking(Booking Booking, SqlConnection connection)
        {
            BookingDTO BookingDTO_ = new BookingDTO();
            List<Booking> Booking_ = new List<Booking>();
            SqlDataAdapter command = new SqlDataAdapter("sp_Booking", connection);
            command.SelectCommand.CommandType = CommandType.StoredProcedure;
            command.SelectCommand.Parameters.AddWithValue("@Mode", Booking.Mode);
            switch (Booking.Mode.ToLower())
            {
                case "book":
                    command.SelectCommand.Parameters.AddWithValue("@LabTestID", Booking.LabTestID);
                    command.SelectCommand.Parameters.AddWithValue("@CustomerId", Booking.CustomerId);
                    command.SelectCommand.Parameters.AddWithValue("@Description", Booking.Description);
                    break;
                case "adminbook":
                    command.SelectCommand.Parameters.AddWithValue("@TimeSlot", Booking.TimeSlot);
                    command.SelectCommand.Parameters.AddWithValue("@DateSlot", Booking.DateSlot);
                    command.SelectCommand.Parameters.AddWithValue("@BookingId", Booking.BookingOrderID);
                    break;
                case "adminrejected":
                    command.SelectCommand.Parameters.AddWithValue("@BookingId", Booking.BookingOrderID);
                    break;
                case "labtech":
                    command.SelectCommand.Parameters.AddWithValue("@Result", Booking.Result);
                    break;
            }
            command.SelectCommand.Parameters.AddWithValue("@StatusId", Booking.StatusId);
            connection.Open();
            SqlDataReader rdr = command.SelectCommand.ExecuteReader();
            while (rdr.Read())
            {
                Booking booking = new Booking();
                booking.BookingOrderID = Convert.ToInt32(rdr["BookingOrderID"]);
                booking.LabTestID = Convert.ToInt32(rdr["BookingOrderID"]);
                booking.CustomerId = Convert.ToInt32(rdr["CustomerId"]);
                booking.StatusId = Convert.ToInt32(rdr["StatusId"]);
                booking.Description = rdr["Description"].ToString();
                booking.TimeSlot = rdr["TimeSlot"].ToString();
                booking.DateSlot = rdr["DateSlot"].ToString();
                booking.Result = rdr["Result"].ToString();
                booking.createdOn = rdr["createdOn"].ToString();
                booking.UpdatedOn = rdr["UpdatedOn"].ToString();
                Booking_.Add(booking);
            }
            BookingDTO_.DataList=Booking_;
            return BookingDTO_;
        }
    }
}
