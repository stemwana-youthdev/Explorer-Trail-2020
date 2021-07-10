using Microsoft.EntityFrameworkCore.Migrations;

namespace StemExplorerData.Migrations
{
    public partial class AddImageFieldsForLevels : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "InstructionsImage",
                table: "ChallengeLevels",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "InstructionsImageHelperText",
                table: "ChallengeLevels",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "QuestionImage",
                table: "ChallengeLevels",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "QuestionImageHelperText",
                table: "ChallengeLevels",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "InstructionsImage",
                table: "ChallengeLevels");

            migrationBuilder.DropColumn(
                name: "InstructionsImageHelperText",
                table: "ChallengeLevels");

            migrationBuilder.DropColumn(
                name: "QuestionImage",
                table: "ChallengeLevels");

            migrationBuilder.DropColumn(
                name: "QuestionImageHelperText",
                table: "ChallengeLevels");
        }
    }
}
