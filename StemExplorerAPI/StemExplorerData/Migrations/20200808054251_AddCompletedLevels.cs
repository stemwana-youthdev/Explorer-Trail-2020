using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace StemExplorerData.Migrations
{
    public partial class AddCompletedLevels : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CompletedLevels",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserId = table.Column<string>(nullable: true),
                    ChallengeLevelId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CompletedLevels", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CompletedLevels_ChallengeLevels_ChallengeLevelId",
                        column: x => x.ChallengeLevelId,
                        principalTable: "ChallengeLevels",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CompletedLevels_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CompletedLevels_ChallengeLevelId",
                table: "CompletedLevels",
                column: "ChallengeLevelId");

            migrationBuilder.CreateIndex(
                name: "IX_CompletedLevels_UserId",
                table: "CompletedLevels",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CompletedLevels");
        }
    }
}
