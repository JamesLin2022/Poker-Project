FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["4952-project.csproj", "./"]
RUN dotnet restore "4952-project.csproj"
COPY . .
WORKDIR "/src/"
RUN dotnet build "4952-project.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "4952-project.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "4952-project.dll"]
