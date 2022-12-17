namespace Health.DTO
{
    public class DropDownDTO
    {
        public List<LabTest> LabTestList { get; set; }
        public List<Status> StatusList { get; set; }

    }
    public class LabTest
    {
        public int LabTestID { get; set; }
        public string TestName { get; set; }
    }
    public class Status
    {
        public int StatusId { get; set; }
        public string StatusName { get; set; }
    }
}