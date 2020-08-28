using Microsoft.EntityFrameworkCore.Migrations;

namespace StemExplorerAPI.Migrations
{
    public partial class ConstrainCompletedLevels : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_CompletedLevels_UserId",
                table: "CompletedLevels");

            migrationBuilder.CreateIndex(
                name: "IX_CompletedLevels_UserId_ChallengeLevelId",
                table: "CompletedLevels",
                columns: new[] { "UserId", "ChallengeLevelId" },
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_CompletedLevels_UserId_ChallengeLevelId",
                table: "CompletedLevels");

            migrationBuilder.CreateIndex(
                name: "IX_CompletedLevels_UserId",
                table: "CompletedLevels",
                column: "UserId");
        }
    }
}
