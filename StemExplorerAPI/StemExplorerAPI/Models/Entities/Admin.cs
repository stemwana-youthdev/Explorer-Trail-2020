namespace StemExplorerAPI.Models.Entities
{
    public class Admin
    {
        // The firebase user id
        public string Id { get; set; }
        // Only used for humans to identify who it is
        public string Name { get; set; }
        // ATM this must be manually set
        public bool Approved { get; set; }
    }
}
