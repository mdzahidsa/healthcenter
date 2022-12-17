using Health.DTO;
using System.Data.SqlClient;
using System.Data;
using System.Net.NetworkInformation;

namespace Health.DR
{
    public class DropDownDR
    {
        public DropDownDTO GetLabTest(SqlConnection connection)
        {
            DropDownDTO DropDownDTO_ = new DropDownDTO();
            List<LabTest> LabTest_ = new List<LabTest>();
            SqlDataAdapter command = new SqlDataAdapter("select * from LabTest", connection);
            connection.Open();
            SqlDataReader rdr = command.SelectCommand.ExecuteReader();
            while (rdr.Read())
            {
                LabTest _LabTest = new LabTest();
                _LabTest.LabTestID = Convert.ToInt32(rdr["LabTestID"]);
                _LabTest.TestName = rdr["TestName"].ToString();
                LabTest_.Add(_LabTest);
            }
            connection.Close();
            DropDownDTO_.LabTestList=LabTest_;
            return DropDownDTO_;
        }
        public DropDownDTO GetStatus(SqlConnection connection)
        {
            DropDownDTO DropDownDTO_ = new DropDownDTO();
            List<Status> Status_ = new List<Status>();
            SqlDataAdapter command = new SqlDataAdapter("select * from Status", connection);
            connection.Open();
            SqlDataReader rdr = command.SelectCommand.ExecuteReader();
            while (rdr.Read())
            {
                Status _Status = new Status();
                _Status.StatusID = Convert.ToInt32(rdr["StatusId"]);
                _Status.StatusName = rdr["StatusName"].ToString();
                Status_.Add(_Status);
            }
            connection.Close();
            DropDownDTO_.StatusList=Status_;
            return DropDownDTO_;
        }
    }
}