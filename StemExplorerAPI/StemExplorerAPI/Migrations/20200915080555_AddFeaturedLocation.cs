using Microsoft.EntityFrameworkCore.Migrations;

namespace StemExplorerAPI.Migrations
{
    public partial class AddFeaturedLocation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Address",
                table: "Locations",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "Featured",
                table: "Locations",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "FeaturedImage",
                table: "Locations",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FeaturedText",
                table: "Locations",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "OfferText",
                table: "Locations",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Order",
                table: "Locations",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Address",
                table: "Locations");

            migrationBuilder.DropColumn(
                name: "Featured",
                table: "Locations");

            migrationBuilder.DropColumn(
                name: "FeaturedImage",
                table: "Locations");

            migrationBuilder.DropColumn(
                name: "FeaturedText",
                table: "Locations");

            migrationBuilder.DropColumn(
                name: "OfferText",
                table: "Locations");

            migrationBuilder.DropColumn(
                name: "Order",
                table: "Locations");
        }
    }
}
