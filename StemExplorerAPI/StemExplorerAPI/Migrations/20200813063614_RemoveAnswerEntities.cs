using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace StemExplorerAPI.Migrations
{
    public partial class RemoveAnswerEntities : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ChallengeAnswers");

            migrationBuilder.AddColumn<List<string>>(
                name: "Answers",
                table: "ChallengeLevels",
                nullable: true);

            migrationBuilder.AddColumn<List<string>>(
                name: "PossibleAnswers",
                table: "ChallengeLevels",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Answers",
                table: "ChallengeLevels");

            migrationBuilder.DropColumn(
                name: "PossibleAnswers",
                table: "ChallengeLevels");

            migrationBuilder.CreateTable(
                name: "ChallengeAnswers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    AnswerText = table.Column<string>(type: "text", nullable: true),
                    ChallengeLevelId = table.Column<int>(type: "integer", nullable: true),
                    IsCorrect = table.Column<bool>(type: "boolean", nullable: false)
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
    }
}
