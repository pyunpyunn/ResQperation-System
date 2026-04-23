-- ResQperation Database Schema v1.0
-- Last Updated: April 23, 2026
-- Database: resqperation

-- ============================================================================
-- 0. EXTERNAL SYSTEM ACCOUNTS
-- ============================================================================

CREATE TABLE SafeTrackAccount (
    SafeTrackAccountID BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    ExternalUUID VARCHAR(100) NOT NULL,
    AccountType ENUM('HOUSEHOLD', 'RESPONDER') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- 1. HOUSEHOLD MODULE
-- ============================================================================

CREATE TABLE Household (
    HouseholdID BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    SafeTrackAccountID BIGINT UNSIGNED NULL,
    HouseholdHeadName VARCHAR(100) NOT NULL,
    PhoneNumber VARCHAR(30) NULL,
    Barangay VARCHAR(100) NULL,
    Address TEXT NULL,
    QRCode VARCHAR(255) UNIQUE NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (SafeTrackAccountID) REFERENCES SafeTrackAccount(SafeTrackAccountID) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE HouseholdMember (
    MemberID BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    HouseholdID BIGINT UNSIGNED NOT NULL,
    FullName VARCHAR(120) NOT NULL,
    Age INT NULL,
    Relationship VARCHAR(50) NULL,
    IsPWD BOOLEAN DEFAULT FALSE,
    IsSenior BOOLEAN DEFAULT FALSE,
    HasMedicalCondition BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (HouseholdID) REFERENCES Household(HouseholdID) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE GeotaggedLocation (
    LocationID BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    HouseholdID BIGINT UNSIGNED NOT NULL,
    Latitude DECIMAL(10, 7) NULL,
    Longitude DECIMAL(10, 7) NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (HouseholdID) REFERENCES Household(HouseholdID) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE DeviceTrackingLog (
    TrackingID BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    HouseholdID BIGINT UNSIGNED NOT NULL,
    Latitude DECIMAL(10, 7) NULL,
    Longitude DECIMAL(10, 7) NULL,
    BatteryLevel INT NULL,
    SignalStrength INT NULL,
    LoggedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (HouseholdID) REFERENCES Household(HouseholdID) ON DELETE CASCADE,
    INDEX (LoggedAt)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE EvaTrackCallback (
    CallbackID BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    HouseholdID BIGINT UNSIGNED NOT NULL,
    QRCode VARCHAR(255) NOT NULL,
    ScannedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ScannedByExternal VARCHAR(255) NULL,
    FOREIGN KEY (HouseholdID) REFERENCES Household(HouseholdID) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- 2. LOOKUP TABLES (Reference Data)
-- ============================================================================

CREATE TABLE StatusLookup (
    StatusID BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    StatusKey VARCHAR(50) UNIQUE NOT NULL,
    StatusLabel VARCHAR(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE UrgencyLevel (
    UrgencyID BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    UrgencyKey VARCHAR(50) UNIQUE NOT NULL,
    UrgencyLabel VARCHAR(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE SeverityLevel (
    SeverityID BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    SeverityKey VARCHAR(50) UNIQUE NOT NULL,
    SeverityLabel VARCHAR(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE RequestType (
    RequestTypeID BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    TypeKey VARCHAR(50) UNIQUE NOT NULL,
    TypeLabel VARCHAR(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE FieldReportCategory (
    CategoryID BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    CategoryKey VARCHAR(50) UNIQUE NOT NULL,
    CategoryLabel VARCHAR(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- 3. DISASTER EVENT SYSTEM
-- ============================================================================

CREATE TABLE DisasterEvent (
    DisasterID BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    DisasterType VARCHAR(50) NOT NULL,
    Description TEXT NULL,
    SeverityID BIGINT UNSIGNED NULL,
    StartTime DATETIME NULL,
    EndTime DATETIME NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (SeverityID) REFERENCES SeverityLevel(SeverityID) ON DELETE SET NULL,
    INDEX (StartTime),
    INDEX (EndTime)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE HouseholdDisaster (
    HouseholdDisasterID BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    HouseholdID BIGINT UNSIGNED NOT NULL,
    DisasterID BIGINT UNSIGNED NOT NULL,
    InitialStatusID BIGINT UNSIGNED NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (HouseholdID) REFERENCES Household(HouseholdID) ON DELETE CASCADE,
    FOREIGN KEY (DisasterID) REFERENCES DisasterEvent(DisasterID) ON DELETE CASCADE,
    FOREIGN KEY (InitialStatusID) REFERENCES StatusLookup(StatusID) ON DELETE SET NULL,
    UNIQUE KEY (HouseholdID, DisasterID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE HouseholdStatusReport (
    StatusReportID BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    HouseholdDisasterID BIGINT UNSIGNED NOT NULL,
    StatusID BIGINT UNSIGNED NOT NULL,
    Remarks TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (HouseholdDisasterID) REFERENCES HouseholdDisaster(HouseholdDisasterID) ON DELETE CASCADE,
    FOREIGN KEY (StatusID) REFERENCES StatusLookup(StatusID) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- 4. EVACUATION SITES
-- ============================================================================

CREATE TABLE EvacuationSite (
    EvacuationSiteID BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    ExternalEvacuationID VARCHAR(100) NULL,
    SiteName VARCHAR(150) NULL,
    Capacity INT NULL,
    CurrentOccupancy INT DEFAULT 0,
    Latitude DECIMAL(10, 7) NULL,
    Longitude DECIMAL(10, 7) NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE HouseholdNotification (
    NotificationID BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    HouseholdID BIGINT UNSIGNED NOT NULL,
    DisasterID BIGINT UNSIGNED NOT NULL,
    EvacuationSiteID BIGINT UNSIGNED NULL,
    SourceSystem ENUM('EVATRACK', 'OTHER') NOT NULL,
    Title VARCHAR(150) NOT NULL,
    Message TEXT NOT NULL,
    IsRead BOOLEAN DEFAULT FALSE,
    SentAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (HouseholdID) REFERENCES Household(HouseholdID) ON DELETE CASCADE,
    FOREIGN KEY (DisasterID) REFERENCES DisasterEvent(DisasterID) ON DELETE CASCADE,
    FOREIGN KEY (EvacuationSiteID) REFERENCES EvacuationSite(EvacuationSiteID) ON DELETE SET NULL,
    INDEX (IsRead)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- 5. RESPONDER MODULE
-- ============================================================================

CREATE TABLE RescueTeam (
    TeamID BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    TeamName VARCHAR(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE Responder (
    ResponderID BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    ResponderName VARCHAR(100) NOT NULL,
    SafeTrackAccountID BIGINT UNSIGNED NULL,
    TeamID BIGINT UNSIGNED NULL,
    Title VARCHAR(100) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (SafeTrackAccountID) REFERENCES SafeTrackAccount(SafeTrackAccountID) ON DELETE SET NULL,
    FOREIGN KEY (TeamID) REFERENCES RescueTeam(TeamID) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE ResponderAssignment (
    AssignmentID BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    ResponderID BIGINT UNSIGNED NOT NULL,
    DisasterID BIGINT UNSIGNED NOT NULL,
    AssignedArea VARCHAR(150) NULL,
    AssignedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (ResponderID) REFERENCES Responder(ResponderID) ON DELETE CASCADE,
    FOREIGN KEY (DisasterID) REFERENCES DisasterEvent(DisasterID) ON DELETE CASCADE,
    INDEX (AssignedAt)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE ResponderCommunicationLog (
    CommunicationID BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    ResponderID BIGINT UNSIGNED NOT NULL,
    DisasterID BIGINT UNSIGNED NOT NULL,
    Message TEXT NULL,
    Timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (ResponderID) REFERENCES Responder(ResponderID) ON DELETE CASCADE,
    FOREIGN KEY (DisasterID) REFERENCES DisasterEvent(DisasterID) ON DELETE CASCADE,
    INDEX (Timestamp)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE ResponderFieldReport (
    ReportID BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    ResponderID BIGINT UNSIGNED NOT NULL,
    DisasterID BIGINT UNSIGNED NOT NULL,
    Notes TEXT NULL,
    Latitude DECIMAL(10, 7) NULL,
    Longitude DECIMAL(10, 7) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (ResponderID) REFERENCES Responder(ResponderID) ON DELETE CASCADE,
    FOREIGN KEY (DisasterID) REFERENCES DisasterEvent(DisasterID) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE ResponderFieldReportDetail (
    DetailID BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    ReportID BIGINT UNSIGNED NOT NULL,
    CategoryID BIGINT UNSIGNED NOT NULL,
    Value INT NULL,
    Notes TEXT NULL,
    FOREIGN KEY (ReportID) REFERENCES ResponderFieldReport(ReportID) ON DELETE CASCADE,
    FOREIGN KEY (CategoryID) REFERENCES FieldReportCategory(CategoryID) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- 6. EVACUATION TRACKING
-- ============================================================================

CREATE TABLE HouseholdEvacuation (
    HouseholdEvacuationID BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    HouseholdID BIGINT UNSIGNED NOT NULL,
    EvacuationSiteID BIGINT UNSIGNED NOT NULL,
    EvaTrackID BIGINT UNSIGNED NULL,
    EvacuatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    VerifiedByResponderID BIGINT UNSIGNED NULL,
    QRCodeScanned BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (HouseholdID) REFERENCES Household(HouseholdID) ON DELETE CASCADE,
    FOREIGN KEY (EvacuationSiteID) REFERENCES EvacuationSite(EvacuationSiteID) ON DELETE CASCADE,
    FOREIGN KEY (VerifiedByResponderID) REFERENCES Responder(ResponderID) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- 7. EXTERNAL SYSTEM INTEGRATIONS
-- ============================================================================

CREATE TABLE ExternalEndpoint (
    EndpointID BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    SystemName ENUM('EVATRACK', 'TRACKINGAID', 'OTHER') NOT NULL,
    EndpointURL TEXT NOT NULL,
    ApiKey VARCHAR(255) NULL,
    IsActive BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE EvaTrackSystem (
    EvaTrackID BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    RequestDescription TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE TrackingAidSystem (
    TrackAidID BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    RequestDescription TEXT NULL,
    ForwardedByHQID BIGINT UNSIGNED NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- 8. HQ / ADMIN MODULE
-- ============================================================================

CREATE TABLE HQAdmin (
    HQAdminID BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    FullName VARCHAR(100) NULL,
    Username VARCHAR(50) UNIQUE NOT NULL,
    PasswordHash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE HQFieldReport (
    HQReportID BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    Source ENUM('RESPONDER', 'HOUSEHOLD') NOT NULL,
    LinkedReportID BIGINT UNSIGNED NOT NULL,
    DisasterID BIGINT UNSIGNED NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (DisasterID) REFERENCES DisasterEvent(DisasterID) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- 9. INCOMING REQUESTS (DISASTER RESPONSE)
-- ============================================================================

CREATE TABLE IncomingRequest (
    IncomingRequestID BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    HouseholdID BIGINT UNSIGNED NOT NULL,
    DisasterID BIGINT UNSIGNED NOT NULL,
    RequestTypeID BIGINT UNSIGNED NOT NULL,
    UrgencyID BIGINT UNSIGNED NULL,
    StatusID BIGINT UNSIGNED NULL,
    Description TEXT NULL,
    AssignedResponderID BIGINT UNSIGNED NULL,
    Latitude DECIMAL(10, 7) NULL,
    Longitude DECIMAL(10, 7) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (HouseholdID) REFERENCES Household(HouseholdID) ON DELETE CASCADE,
    FOREIGN KEY (DisasterID) REFERENCES DisasterEvent(DisasterID) ON DELETE CASCADE,
    FOREIGN KEY (RequestTypeID) REFERENCES RequestType(RequestTypeID) ON DELETE CASCADE,
    FOREIGN KEY (UrgencyID) REFERENCES UrgencyLevel(UrgencyID) ON DELETE SET NULL,
    FOREIGN KEY (StatusID) REFERENCES StatusLookup(StatusID) ON DELETE SET NULL,
    FOREIGN KEY (AssignedResponderID) REFERENCES Responder(ResponderID) ON DELETE SET NULL,
    INDEX (StatusID),
    INDEX (UrgencyID),
    INDEX (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- 10. INDEXES FOR PERFORMANCE
-- ============================================================================

CREATE INDEX idx_household_barangay ON Household(Barangay);
CREATE INDEX idx_household_qrcode ON Household(QRCode);
CREATE INDEX idx_disaster_status ON DisasterEvent(StartTime, EndTime);
CREATE INDEX idx_request_household_disaster ON IncomingRequest(HouseholdID, DisasterID);
CREATE INDEX idx_responder_team ON Responder(TeamID);
CREATE INDEX idx_evacuation_site_occupancy ON EvacuationSite(Capacity, CurrentOccupancy);

-- ============================================================================
-- TABLE SUMMARY
-- ============================================================================
-- Total Tables: 31
--
-- User Management: Household, HouseholdMember, SafeTrackAccount, Responder, RescueTeam, HQAdmin
-- Disaster Operations: DisasterEvent, HouseholdDisaster, HouseholdStatusReport, IncomingRequest
-- Evacuation: EvacuationSite, HouseholdEvacuation, HouseholdNotification
-- Responder Operations: ResponderAssignment, ResponderCommunicationLog, ResponderFieldReport, ResponderFieldReportDetail
-- Tracking & Geo: GeotaggedLocation, DeviceTrackingLog, EvaTrackCallback
-- External Systems: ExternalEndpoint, EvaTrackSystem, TrackingAidSystem, HQFieldReport
-- Reference Data: StatusLookup, UrgencyLevel, SeverityLevel, RequestType, FieldReportCategory
-- ============================================================================
