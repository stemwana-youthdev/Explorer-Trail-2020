using Microsoft.EntityFrameworkCore.Migrations;

namespace StemExplorerData.Migrations
{
    public partial class AddLevelInstructions : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Instructions",
                table: "ChallengeLevels",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Instructions",
                table: "ChallengeLevels");
        }
    }
}
