FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src
COPY ["GameBackend.csproj", "./"]
RUN dotnet restore "GameBackend.csproj"
COPY . .
RUN dotnet publish "GameBackend.csproj" -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:10.0
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "GameBackend.dll"]
