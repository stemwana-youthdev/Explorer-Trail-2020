FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS build-stage

WORKDIR /app

# copy csproj and restore as distinct layers
COPY *.sln .
COPY StemExplorerAPI/*.csproj ./StemExplorerAPI/
RUN dotnet restore

# copy everything else and build app
COPY StemExplorerAPI/. ./StemExplorerAPI/
WORKDIR /app/StemExplorerAPI
RUN dotnet publish -c Release -o out


# build the runtime image

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1 as runtime-stage

WORKDIR /app

COPY --from=build-stage /app/StemExplorerAPI/out ./

CMD ASPNETCORE_URLS=http://+:$PORT dotnet StemExplorerAPI.dll
