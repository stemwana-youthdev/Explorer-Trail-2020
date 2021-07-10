using Microsoft.EntityFrameworkCore.Migrations;

namespace StemExplorerData.Migrations
{
    public partial class ReplaceContactNumberWithRegion : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ContactNumber",
                table: "Users");

            migrationBuilder.AddColumn<string>(
                name: "Region",
                table: "Users",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Region",
                table: "Users");

            migrationBuilder.AddColumn<string>(
                name: "ContactNumber",
                table: "Users",
                type: "text",
                nullable: true);
        }
    }
}
