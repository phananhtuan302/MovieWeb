
USE MovieWeb;
GO

---------------------------------------------------
-- TABLE USERS
---------------------------------------------------
CREATE TABLE Users (
    UserID INT PRIMARY KEY IDENTITY(1,1),

    Email NVARCHAR(255) NOT NULL UNIQUE,
    PasswordHash NVARCHAR(500) NOT NULL,

    FullName NVARCHAR(255) NOT NULL,

    AvatarUrl NVARCHAR(1000) NULL,

    IsEmailVerified BIT DEFAULT 0,

    CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME DEFAULT GETDATE()
);

---------------------------------------------------
-- TABLE MOVIES
---------------------------------------------------
CREATE TABLE Movies (
    MovieID INT PRIMARY KEY,

    Title NVARCHAR(255) NOT NULL,
    OriginalTitle NVARCHAR(255),

    PosterPath NVARCHAR(1000),
    BackdropPath NVARCHAR(1000),

    ReleaseDate DATE,

    VoteAverage FLOAT,
    Popularity FLOAT,

    Overview NVARCHAR(MAX),

    CreatedAt DATETIME DEFAULT GETDATE()
);

---------------------------------------------------
-- TABLE WATCH HISTORY
---------------------------------------------------
CREATE TABLE WatchHistory (
    HistoryID INT PRIMARY KEY IDENTITY(1,1),

    UserID INT NOT NULL,
    MovieID INT NOT NULL,

    WatchedAt DATETIME DEFAULT GETDATE(),

    WatchDuration INT NULL,

    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (MovieID) REFERENCES Movies(MovieID)
);

---------------------------------------------------
-- TABLE USER FAVORITES
---------------------------------------------------
CREATE TABLE Favorites (
    FavoriteID INT PRIMARY KEY IDENTITY(1,1),

    UserID INT NOT NULL,
    MovieID INT NOT NULL,

    CreatedAt DATETIME DEFAULT GETDATE(),

    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (MovieID) REFERENCES Movies(MovieID)
);

---------------------------------------------------
-- TABLE USER PROFILE SETTINGS
---------------------------------------------------
CREATE TABLE UserProfiles (
    ProfileID INT PRIMARY KEY IDENTITY(1,1),

    UserID INT NOT NULL UNIQUE,

    Bio NVARCHAR(1000),
    Gender NVARCHAR(20),

    Country NVARCHAR(100),
    DateOfBirth DATE,

    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);