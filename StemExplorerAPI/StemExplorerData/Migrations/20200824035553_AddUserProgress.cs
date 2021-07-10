using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace StemExplorerData.Migrations
{
    public partial class AddUserProgress : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CompletedLevels");

            migrationBuilder.CreateTable(
                name: "UserProgress",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Attempts = table.Column<int>(nullable: false),
                    Correct = table.Column<bool>(nullable: false),
                    UserId = table.Column<string>(nullable: true),
                    ChallengeLevelId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserProgress", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserProgress_ChallengeLevels_ChallengeLevelId",
                        column: x => x.ChallengeLevelId,
                        principalTable: "ChallengeLevels",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserProgress_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_UserProgress_ChallengeLevelId",
                table: "UserProgress",
                column: "ChallengeLevelId");

            migrationBuilder.CreateIndex(
                name: "IX_UserProgress_UserId_ChallengeLevelId",
                table: "UserProgress",
                columns: new[] { "UserId", "ChallengeLevelId" },
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserProgress");

            migrationBuilder.CreateTable(
                name: "CompletedLevels",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ChallengeLevelId = table.Column<int>(type: "integer", nullable: false),
                    UserId = table.Column<string>(type: "text", nullable: true)
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
                name: "IX_CompletedLevels_UserId_ChallengeLevelId",
                table: "CompletedLevels",
                columns: new[] { "UserId", "ChallengeLevelId" },
                unique: true);
        }
    }
}
