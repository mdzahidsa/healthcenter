using Health.DTO;
using System.Data.SqlClient;
using System.Data;

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
            DropDownDTO_.LabTestList=LabTest_;
            return DropDownDTO_;
        }
    }
}