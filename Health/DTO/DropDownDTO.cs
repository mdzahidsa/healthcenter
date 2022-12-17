namespace Health.DTO
{
    public class DropDownDTO
    {
        public List<LabTest> LabTestList { get; set; }
    }
    public class LabTest
    {
        public int LabTestID { get; set; }
        public string TestName { get; set; }



    }
}