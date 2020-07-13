using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace StemExplorerAPI.Migrations
{
    public partial class AddAnswers : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Answer",
                table: "ChallengeLevels");

            migrationBuilder.CreateTable(
                name: "ChallengeAnswers",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    AnswerText = table.Column<string>(nullable: true),
                    IsCorrect = table.Column<bool>(nullable: false),
                    ChallengeLevelId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ChallengeAnswers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ChallengeAnswers_ChallengeLevels_ChallengeLevelId",
                        column: x => x.ChallengeLevelId,
                        principalTable: "ChallengeLevels",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ChallengeAnswers_ChallengeLevelId",
                table: "ChallengeAnswers",
                column: "ChallengeLevelId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ChallengeAnswers");

            migrationBuilder.AddColumn<string>(
                name: "Answer",
                table: "ChallengeLevels",
                type: "text",
                nullable: true);
        }
    }
}
