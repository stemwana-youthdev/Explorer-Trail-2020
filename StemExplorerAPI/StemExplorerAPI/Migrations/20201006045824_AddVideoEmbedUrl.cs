using Microsoft.EntityFrameworkCore.Migrations;

namespace StemExplorerAPI.Migrations
{
    public partial class AddVideoEmbedUrl : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "VideoEmbedUrl",
                table: "ChallengeLevels",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "VideoEmbedUrl",
                table: "ChallengeLevels");
        }
    }
}
