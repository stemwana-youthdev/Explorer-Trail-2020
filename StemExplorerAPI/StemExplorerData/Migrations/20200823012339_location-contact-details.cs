using Microsoft.EntityFrameworkCore.Migrations;

namespace StemExplorerData.Migrations
{
    public partial class locationcontactdetails : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "Locations",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Phone",
                table: "Locations",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Email",
                table: "Locations");

            migrationBuilder.DropColumn(
                name: "Phone",
                table: "Locations");
        }
    }
}
