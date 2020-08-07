using Microsoft.EntityFrameworkCore.Migrations;

namespace StemExplorerAPI.Migrations
{
    public partial class AddLevelHint : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Hint",
                table: "ChallengeLevels",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Hint",
                table: "ChallengeLevels");
        }
    }
}
