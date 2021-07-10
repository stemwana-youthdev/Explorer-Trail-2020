using Microsoft.EntityFrameworkCore.Migrations;

namespace StemExplorerData.Migrations
{
    public partial class AddProfileFields : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Profiles_Users_UserId",
                table: "Profiles");

            migrationBuilder.DropIndex(
                name: "IX_Profiles_UserId",
                table: "Profiles");

            migrationBuilder.DropColumn(
                name: "FirstName",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "HomeTown",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "LastName",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Region",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "Profiles");

            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "Profiles",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FirstName",
                table: "Profiles",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "HomeTown",
                table: "Profiles",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LastName",
                table: "Profiles",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Nickname",
                table: "Profiles",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PhotoUrl",
                table: "Profiles",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "ProfileCompleted",
                table: "Profiles",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "Region",
                table: "Profiles",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Email",
                table: "Profiles");

            migrationBuilder.DropColumn(
                name: "FirstName",
                table: "Profiles");

            migrationBuilder.DropColumn(
                name: "HomeTown",
                table: "Profiles");

            migrationBuilder.DropColumn(
                name: "LastName",
                table: "Profiles");

            migrationBuilder.DropColumn(
                name: "Nickname",
                table: "Profiles");

            migrationBuilder.DropColumn(
                name: "PhotoUrl",
                table: "Profiles");

            migrationBuilder.DropColumn(
                name: "ProfileCompleted",
                table: "Profiles");

            migrationBuilder.DropColumn(
                name: "Region",
                table: "Profiles");

            migrationBuilder.AddColumn<string>(
                name: "FirstName",
                table: "Users",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "HomeTown",
                table: "Users",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LastName",
                table: "Users",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Region",
                table: "Users",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "Profiles",
                type: "text",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Profiles_UserId",
                table: "Profiles",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Profiles_Users_UserId",
                table: "Profiles",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
