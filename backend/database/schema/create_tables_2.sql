-- ============================================================
-- LOOKUP / REFERENCE TABLES (no foreign deps)
-- ============================================================
CREATE TABLE roles (
  role_id   INT          PRIMARY KEY AUTO_INCREMENT,
  role_key  VARCHAR(50)  NOT NULL UNIQUE,
  role_name VARCHAR(100) NOT NULL
);

CREATE TABLE relationships (
  relationship_id    INT          PRIMARY KEY AUTO_INCREMENT,
  relationship_key   VARCHAR(50)  NOT NULL UNIQUE,
  relationship_label VARCHAR(100) NOT NULL
);

CREATE TABLE genders (
  gender_id    INT         PRIMARY KEY AUTO_INCREMENT,
  gender_key   VARCHAR(20) NOT NULL UNIQUE,
  gender_label VARCHAR(20) NOT NULL
);

CREATE TABLE civil_statuses (
  status_id    INT         PRIMARY KEY AUTO_INCREMENT,
  status_key   VARCHAR(20) NOT NULL UNIQUE,
  status_label VARCHAR(20) NOT NULL
);

CREATE TABLE education_levels (
  education_level_id    INT         PRIMARY KEY AUTO_INCREMENT,
  education_level_key   VARCHAR(20) NOT NULL UNIQUE,
  education_level_label VARCHAR(20) NOT NULL
);

CREATE TABLE vulnerable_groups (
  vulnerable_group_id    INT         PRIMARY KEY AUTO_INCREMENT,
  vulnerable_group_key   VARCHAR(20) NOT NULL UNIQUE,
  vulnerable_group_label VARCHAR(20) NOT NULL
);

CREATE TABLE occupations (
  occuaption_id   INT          PRIMARY KEY AUTO_INCREMENT,
  occupation_name VARCHAR(100) NOT NULL
);

CREATE TABLE severity_levels (
  severity_id    INT         PRIMARY KEY AUTO_INCREMENT,
  severity_key   VARCHAR(50) NOT NULL UNIQUE,
  severity_label VARCHAR(100) NOT NULL
);

CREATE TABLE household_status (
  status_id    INT         PRIMARY KEY AUTO_INCREMENT,
  status_key   VARCHAR(50) NOT NULL UNIQUE,
  status_label VARCHAR(100) NOT NULL
);

CREATE TABLE accommodation_types (
  type_id    INT         PRIMARY KEY AUTO_INCREMENT,
  type_key   VARCHAR(50) NOT NULL UNIQUE,
  type_label VARCHAR(100) NOT NULL
);

CREATE TABLE urgency_levels (
  urgency_id    INT         PRIMARY KEY AUTO_INCREMENT,
  urgency_key   VARCHAR(50) NOT NULL UNIQUE,
  urgency_label VARCHAR(100) NOT NULL
);

CREATE TABLE recurrence_types (
  type_id    INT         PRIMARY KEY AUTO_INCREMENT,
  type_key   VARCHAR(50) NOT NULL UNIQUE,
  type_label VARCHAR(100) NOT NULL
);

CREATE TABLE notification_channels (
  channel_id    INT         PRIMARY KEY AUTO_INCREMENT,
  channel_key   VARCHAR(50) NOT NULL UNIQUE,
  channel_label VARCHAR(100) NOT NULL
);

CREATE TABLE notification_statuses (
  status_id    INT         PRIMARY KEY AUTO_INCREMENT,
  status_key   VARCHAR(50) NOT NULL UNIQUE,
  status_label VARCHAR(100) NOT NULL
);

CREATE TABLE analytics_job_status (
  status_id    INT         PRIMARY KEY AUTO_INCREMENT,
  status_key   VARCHAR(50) NOT NULL UNIQUE,
  status_label VARCHAR(100) NOT NULL
);

CREATE TABLE center_issue_categories (
  category_id    INT         PRIMARY KEY AUTO_INCREMENT,
  category_key   VARCHAR(50) NOT NULL UNIQUE,
  category_label VARCHAR(100) NOT NULL
);

CREATE TABLE center_issue_report_statuses (
  status_id    INT         PRIMARY KEY AUTO_INCREMENT,
  status_key   VARCHAR(50) NOT NULL UNIQUE,
  status_label VARCHAR(100) NOT NULL
);

CREATE TABLE resource_request_status (
  status_id    INT         PRIMARY KEY AUTO_INCREMENT,
  status_key   VARCHAR(50) NOT NULL UNIQUE,
  status_label VARCHAR(100) NOT NULL
);

CREATE TABLE field_report_categories (
  category_id    INT         PRIMARY KEY AUTO_INCREMENT,
  category_key   VARCHAR(50) NOT NULL UNIQUE,
  category_label VARCHAR(100) NOT NULL
);

CREATE TABLE rescue_teams (
  team_id   INT          PRIMARY KEY AUTO_INCREMENT,
  team_name VARCHAR(100) NOT NULL
);

-- =============================================
-- 1. Regions
-- =============================================
CREATE TABLE regions (
    region_id   INT AUTO_INCREMENT PRIMARY KEY,
    region_code VARCHAR(20) UNIQUE NOT NULL,
    region_name VARCHAR(100) NOT NULL
);

-- =============================================
-- 2. Provinces
-- =============================================
CREATE TABLE provinces (
    province_id   INT AUTO_INCREMENT PRIMARY KEY,
    province_code VARCHAR(20) UNIQUE NOT NULL,
    province_name VARCHAR(100) NOT NULL,
    region_id     INT NOT NULL,
    CONSTRAINT fk_province_region
        FOREIGN KEY (region_id) REFERENCES regions(region_id)
);

CREATE INDEX idx_provinces_region_id ON provinces(region_id);

-- =============================================
-- 3. Cities
-- =============================================
CREATE TABLE cities (
    city_id      INT AUTO_INCREMENT PRIMARY KEY,
    city_code    VARCHAR(20) UNIQUE NOT NULL,
    city_name    VARCHAR(100) NOT NULL,
    province_id  INT NOT NULL,
    CONSTRAINT fk_city_province
        FOREIGN KEY (province_id) REFERENCES provinces(province_id)
);

CREATE INDEX idx_cities_province_id ON cities(province_id);

-- =============================================
-- 4. Barangays
-- =============================================
CREATE TABLE barangays (
    barangay_id   INT AUTO_INCREMENT PRIMARY KEY,
    barangay_code VARCHAR(20) UNIQUE NOT NULL,
    barangay_name VARCHAR(100) NOT NULL,
    city_id       INT NOT NULL,
    CONSTRAINT fk_barangay_city
        FOREIGN KEY (city_id) REFERENCES cities(city_id)
);

CREATE INDEX idx_barangays_city_id ON barangays(city_id);

-- =============================================
-- 5. Sitios
-- =============================================
CREATE TABLE sitios (
    sitio_id    INT AUTO_INCREMENT PRIMARY KEY,
    sitio_name  VARCHAR(100) NOT NULL,
    barangay_id INT NOT NULL,
    CONSTRAINT fk_sitio_barangay
        FOREIGN KEY (barangay_id) REFERENCES barangays(barangay_id)
);

CREATE INDEX idx_sitios_barangay_id ON sitios(barangay_id);

-- =============================================
-- 6. Puroks
-- =============================================
CREATE TABLE puroks (
    purok_id    INT AUTO_INCREMENT PRIMARY KEY,
    purok_name  VARCHAR(100) NOT NULL,
    sitio_id    INT NOT NULL,
    CONSTRAINT fk_purok_sitio
        FOREIGN KEY (sitio_id) REFERENCES sitios(sitio_id)
);

CREATE INDEX idx_puroks_sitio_id ON puroks(sitio_id);

-- =============================================
-- 7. Zip Codes
-- =============================================
CREATE TABLE zipcodes (
    zipcode_id  INT AUTO_INCREMENT PRIMARY KEY,
    zipcode     VARCHAR(10) UNIQUE NOT NULL,
    city_id     INT NOT NULL,
    CONSTRAINT fk_zipcode_city
        FOREIGN KEY (city_id) REFERENCES cities(city_id)
);

CREATE INDEX idx_zipcodes_city_id ON zipcodes(city_id);

-- =============================================
-- 8. Addresses
-- =============================================
CREATE TABLE addresses (
    address_id     INT AUTO_INCREMENT PRIMARY KEY,
    street_address VARCHAR(255) NULL,
    barangay_id    INT NULL,
    sitio_id       INT NULL,
    purok_id       INT NULL,
    zipcode_id     INT NULL,
    created_at     TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at     TIMESTAMP NULL DEFAULT NULL,
    deleted_at     TIMESTAMP NULL DEFAULT NULL,

    CONSTRAINT fk_address_barangay
        FOREIGN KEY (barangay_id) REFERENCES barangays(barangay_id),
    CONSTRAINT fk_address_sitio
        FOREIGN KEY (sitio_id) REFERENCES sitios(sitio_id),
    CONSTRAINT fk_address_purok
        FOREIGN KEY (purok_id) REFERENCES puroks(purok_id),
    CONSTRAINT fk_address_zipcode
        FOREIGN KEY (zipcode_id) REFERENCES zipcodes(zipcode_id)
);

CREATE INDEX idx_addresses_barangay_id ON addresses(barangay_id);
CREATE INDEX idx_addresses_sitio_id ON addresses(sitio_id);
CREATE INDEX idx_addresses_purok_id ON addresses(purok_id);
CREATE INDEX idx_addresses_zipcode_id ON addresses(zipcode_id);

-- Optional: index for soft-delete filtering
CREATE INDEX idx_addresses_deleted_at ON addresses(deleted_at);

-- ============================================================
-- HOUSEHOLDS & MEMBERS
-- ============================================================

CREATE TABLE households (
  household_id      VARCHAR(255) PRIMARY KEY,
  household_code    VARCHAR(255),
  household_name    VARCHAR(100) NOT NULL,
  address_id        INT NULL,
  contact_number    VARCHAR(50),
  emergency_contact VARCHAR(50),
  created_by        VARCHAR(255) NOT NULL,
  created_at        TIMESTAMP,
  updated_at        TIMESTAMP,
  deleted_at        TIMESTAMP,
  FOREIGN KEY (address_id) REFERENCES addresses (address_id)
);

CREATE TABLE household_members (
  member_id          VARCHAR(255) PRIMARY KEY,
  household_id       VARCHAR(255) NOT NULL,
  first_name         VARCHAR(100) NOT NULL,
  middle_name        VARCHAR(100),
  last_name          VARCHAR(100) NOT NULL,
  birth_date         DATE         NOT NULL,
  gender_id          INT,
  relationship_id    INT,
  civil_status_id    INT,
  occupation         INT,
  education_level_id INT,
  is_graduate        BOOLEAN      DEFAULT FALSE,
  FOREIGN KEY (household_id)       REFERENCES households      (household_id),
  FOREIGN KEY (gender_id)          REFERENCES genders         (gender_id),
  FOREIGN KEY (relationship_id)    REFERENCES relationships   (relationship_id),
  FOREIGN KEY (civil_status_id)    REFERENCES civil_statuses  (status_id),
  FOREIGN KEY (occupation)         REFERENCES occupations     (occuaption_id),
  FOREIGN KEY (education_level_id) REFERENCES education_levels (education_level_id)
);

CREATE TABLE member_vulnerable_groups (
  id                  INT          PRIMARY KEY AUTO_INCREMENT,
  member_id           VARCHAR(255) NOT NULL,
  vulnerable_group_id INT          NOT NULL,
  FOREIGN KEY (member_id)           REFERENCES household_members  (member_id),
  FOREIGN KEY (vulnerable_group_id) REFERENCES vulnerable_groups  (vulnerable_group_id)
);

-- ============================================================
-- USERS
-- ============================================================

CREATE TABLE users (
  user_id            VARCHAR(255) PRIMARY KEY,
  name               VARCHAR(100),
  username           VARCHAR(100),
  email              VARCHAR(255) NULL UNIQUE,
  password           VARCHAR(255) NOT NULL,
  role_id            INT,
  contact_number     VARCHAR(50),
  assigned_center_id VARCHAR(255),
  household_id       VARCHAR(255),
  is_active          BOOLEAN,
  updated_at         TIMESTAMP NULL,
  created_at         DATETIME,
  deleted_at         DATETIME,
  FOREIGN KEY (role_id) REFERENCES roles (role_id)
);

-- ============================================================
-- DEVICE TOKENS
-- ============================================================

CREATE TABLE device_tokens (
  id              BIGINT       PRIMARY KEY AUTO_INCREMENT,
  household_id    VARCHAR(255) NOT NULL,
  player_id       VARCHAR(255) NOT NULL UNIQUE,
  battery_level   INT,
  signal_strength INT,
  logged_at       DATETIME,
  created_at      TIMESTAMP,
  updated_at      TIMESTAMP,
  FOREIGN KEY (household_id) REFERENCES households (household_id)
);

-- ============================================================
-- DISASTER MODULE
-- ============================================================

CREATE TABLE disaster_types (
  type_id        INT          PRIMARY KEY AUTO_INCREMENT,
  type_code      VARCHAR(20)  NOT NULL UNIQUE,
  type_name      VARCHAR(100) NOT NULL,
  severity_level INT,
  is_active      BOOLEAN      DEFAULT TRUE,
  created_at     TIMESTAMP,
  updated_at     TIMESTAMP,
  deleted_at     TIMESTAMP,
  FOREIGN KEY (severity_level) REFERENCES severity_levels (severity_id)
);

CREATE TABLE disaster_events (
  event_id   VARCHAR(255) PRIMARY KEY,
  name       VARCHAR(100),
  type_id    INT          NOT NULL,
  started_at DATETIME,
  ended_at   DATETIME,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  deleted_at TIMESTAMP,
  FOREIGN KEY (type_id) REFERENCES disaster_types (type_id)
);

CREATE TABLE disaster_event_types (
  event_type_id INT          PRIMARY KEY AUTO_INCREMENT,
  event_id      VARCHAR(255) NOT NULL,
  type_id       INT          NOT NULL,
  FOREIGN KEY (event_id) REFERENCES disaster_events (event_id),
  FOREIGN KEY (type_id)  REFERENCES disaster_types  (type_id)
);

CREATE TABLE affected_areas (
  affected_area_id      INT          PRIMARY KEY AUTO_INCREMENT,
  disaster_id           VARCHAR(255) NOT NULL,
  confirmed_by_admin_id VARCHAR(255),
  severity_id           INT,
  purok_id              INT,
  sitio_id              INT,
  barangay_id           INT,
  confirmed_by_hq       BOOLEAN      NOT NULL DEFAULT FALSE,
  confirmed_at          DATETIME,
  FOREIGN KEY (disaster_id)           REFERENCES disaster_events (event_id),
  FOREIGN KEY (confirmed_by_admin_id) REFERENCES users           (user_id),
  FOREIGN KEY (severity_id)           REFERENCES severity_levels (severity_id),
  FOREIGN KEY (purok_id)              REFERENCES puroks          (purok_id),
  FOREIGN KEY (sitio_id)              REFERENCES sitios          (sitio_id),
  FOREIGN KEY (barangay_id)           REFERENCES barangays       (barangay_id)
);

CREATE TABLE household_disasters (
  household_disaster_id INT          PRIMARY KEY AUTO_INCREMENT,
  household_id          VARCHAR(255) NOT NULL,
  disaster_id           VARCHAR(255) NOT NULL,
  initial_status_id     INT,
  created_at            DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (household_id)      REFERENCES households      (household_id),
  FOREIGN KEY (disaster_id)       REFERENCES disaster_events (event_id),
  FOREIGN KEY (initial_status_id) REFERENCES household_status (status_id)
);

CREATE TABLE disaster_broadcasts (
  broadcast_id     INT          PRIMARY KEY AUTO_INCREMENT,
  disaster_id      VARCHAR(255) NOT NULL,
  sent_by_admin_id VARCHAR(255) NOT NULL,
  message          TEXT,
  allowed_statuses VARCHAR(255),
  sent_at          DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (disaster_id)      REFERENCES disaster_events (event_id),
  FOREIGN KEY (sent_by_admin_id) REFERENCES users           (user_id)
);

-- ============================================================
-- EVACUATION
-- ============================================================

CREATE TABLE evacuation_centers (
  evacuation_center_id VARCHAR(255) PRIMARY KEY,
  current_event_id     VARCHAR(255),
  name                 VARCHAR(100),
  address_id           INT NULL,
  latitude             DECIMAL(10,7),
  longitude            DECIMAL(10,7),
  capacity             INT,
  created_at           DATETIME,
  deleted_at           DATETIME,
  FOREIGN KEY (current_event_id) REFERENCES disaster_events (event_id),
  FOREIGN KEY (address_id)       REFERENCES addresses       (address_id)
);

CREATE TABLE evacuation_records (
  evacuation_id   INT          PRIMARY KEY AUTO_INCREMENT,
  event_id        VARCHAR(255) NOT NULL,
  household_id    VARCHAR(255) NOT NULL,
  center_id       VARCHAR(255) NOT NULL,
  status_id       INT,
  evacuated_count INT,
  method          ENUM('qr', 'manual'),
  verified_by     VARCHAR(255),
  verified_at     DATETIME,
  created_at      DATETIME,
  updated_at      DATETIME,
  FOREIGN KEY (event_id)     REFERENCES disaster_events    (event_id),
  FOREIGN KEY (household_id) REFERENCES households         (household_id),
  FOREIGN KEY (center_id)    REFERENCES evacuation_centers (evacuation_center_id),
  FOREIGN KEY (status_id)    REFERENCES household_status   (status_id),
  FOREIGN KEY (verified_by)  REFERENCES users              (user_id)
);

CREATE TABLE evacuated_members (
  evacuated_member_id INT          PRIMARY KEY AUTO_INCREMENT,
  evacuation_id       INT          NOT NULL,
  member_id           VARCHAR(255) NOT NULL,
  verified_at         DATETIME,
  FOREIGN KEY (evacuation_id) REFERENCES evacuation_records (evacuation_id),
  FOREIGN KEY (member_id)     REFERENCES household_members  (member_id)
);

CREATE TABLE accommodation_units (
  unit_id           INT          PRIMARY KEY AUTO_INCREMENT,
  center_id         VARCHAR(255) NOT NULL,
  name              VARCHAR(100),
  type_id           INT,
  max_capacity      INT,
  current_occupancy INT,
  created_at        DATETIME,
  deleted_at        DATETIME,
  FOREIGN KEY (center_id) REFERENCES evacuation_centers  (evacuation_center_id),
  FOREIGN KEY (type_id)   REFERENCES accommodation_types (type_id)
);

CREATE TABLE unit_allocations (
  allocation_id        INT          PRIMARY KEY AUTO_INCREMENT,
  evacuation_id        INT          NOT NULL,
  unit_id              INT          NOT NULL,
  assigned_by          VARCHAR(255),
  selected_by_resident BOOLEAN,
  created_at           DATETIME,
  FOREIGN KEY (evacuation_id) REFERENCES evacuation_records  (evacuation_id),
  FOREIGN KEY (unit_id)       REFERENCES accommodation_units (unit_id),
  FOREIGN KEY (assigned_by)   REFERENCES users               (user_id)
);

CREATE TABLE center_occupancies (
  id                   INT          PRIMARY KEY AUTO_INCREMENT,
  evacuation_center_id VARCHAR(255) NOT NULL,
  current_occupancy    INT,
  last_updated         DATETIME,
  FOREIGN KEY (evacuation_center_id) REFERENCES evacuation_centers (evacuation_center_id)
);

-- ============================================================
-- NOTIFICATIONS
-- ============================================================

CREATE TABLE notifications (
  notif_id             INT          PRIMARY KEY AUTO_INCREMENT,
  message              TEXT,
  sent_by              VARCHAR(255) NOT NULL,
  evacuation_event_id  VARCHAR(255),
  evacuation_center_id VARCHAR(255),
  urgency_level_id     INT,
  scheduled_at         DATETIME,
  is_recurring         BOOLEAN      DEFAULT FALSE,
  recurrence_type_id   INT,
  recurrence_end_at    DATETIME,
  last_sent_at         DATETIME,
  created_at           DATETIME,
  FOREIGN KEY (sent_by)              REFERENCES users              (user_id),
  FOREIGN KEY (evacuation_event_id)  REFERENCES disaster_events    (event_id),
  FOREIGN KEY (evacuation_center_id) REFERENCES evacuation_centers (evacuation_center_id),
  FOREIGN KEY (urgency_level_id)     REFERENCES urgency_levels     (urgency_id)
);

CREATE TABLE notification_recipients (
  id              INT          PRIMARY KEY AUTO_INCREMENT,
  notification_id INT          NOT NULL,
  household_id    VARCHAR(255) NOT NULL,
  read_at         DATETIME,
  acknowledged_at DATETIME,
  FOREIGN KEY (notification_id) REFERENCES notifications (notif_id),
  FOREIGN KEY (household_id)    REFERENCES households    (household_id)
);

CREATE TABLE notification_logs (
  log_id              INT          PRIMARY KEY AUTO_INCREMENT,
  notification_id     INT          NOT NULL,
  household_id        VARCHAR(255) NOT NULL,
  channel_id          INT          NOT NULL,
  status_id           INT          NOT NULL,
  sent_at             DATETIME,
  retry_count         INT,
  external_message_id VARCHAR(255),
  FOREIGN KEY (notification_id) REFERENCES notifications        (notif_id),
  FOREIGN KEY (household_id)    REFERENCES households           (household_id),
  FOREIGN KEY (channel_id)      REFERENCES notification_channels (channel_id),
  FOREIGN KEY (status_id)       REFERENCES notification_statuses (status_id)
);

-- ============================================================
-- ANALYTICS
-- ============================================================

CREATE TABLE analytics (
  analytic_id          VARCHAR(255) PRIMARY KEY,
  evacuation_center_id VARCHAR(255),
  purok_id             INT,
  sitio_id             INT,
  total_population     INT,
  total_household      INT,
  children_count       INT,
  adult_count          INT,
  elderly_count        INT,
  pwd_count            INT,
  pregnant_count       INT,
  male_count           INT,
  female_count         INT,
  recorded_at          DATETIME,
  FOREIGN KEY (evacuation_center_id) REFERENCES evacuation_centers (evacuation_center_id),
  FOREIGN KEY (purok_id)             REFERENCES puroks              (purok_id),
  FOREIGN KEY (sitio_id)             REFERENCES sitios              (sitio_id)
);

CREATE TABLE analytics_job_logs (
  job_id      INT PRIMARY KEY AUTO_INCREMENT,
  status_id   INT NOT NULL,
  started_at  DATETIME,
  finished_at DATETIME,
  message     TEXT,
  FOREIGN KEY (status_id) REFERENCES analytics_job_status (status_id)
);

-- ============================================================
-- CENTER ISSUES & RESOURCE REQUESTS
-- ============================================================

CREATE TABLE center_issue_reports (
  report_id            VARCHAR(255) PRIMARY KEY,
  evacuation_center_id VARCHAR(255) NOT NULL,
  reported_by          VARCHAR(255) NOT NULL,
  handled_by           VARCHAR(255),
  category_id          INT          NOT NULL,
  title                VARCHAR(150),
  description          TEXT,
  severity_id          INT,
  status_id            INT,
  created_at           DATETIME,
  updated_at           DATETIME,
  FOREIGN KEY (evacuation_center_id) REFERENCES evacuation_centers         (evacuation_center_id),
  FOREIGN KEY (reported_by)          REFERENCES users                       (user_id),
  FOREIGN KEY (handled_by)           REFERENCES users                       (user_id),
  FOREIGN KEY (category_id)          REFERENCES center_issue_categories     (category_id),
  FOREIGN KEY (severity_id)          REFERENCES severity_levels             (severity_id),
  FOREIGN KEY (status_id)            REFERENCES center_issue_report_statuses (status_id)
);

CREATE TABLE resource_requests (
  request_id           VARCHAR(255) PRIMARY KEY,
  evacuation_center_id VARCHAR(255) NOT NULL,
  requested_by         VARCHAR(255) NOT NULL,
  handled_by           VARCHAR(255),
  resource_type        VARCHAR(100),
  quantity             INT,
  description          TEXT,
  urgency_id           INT,
  status_id            INT,
  created_at           DATETIME,
  updated_at           DATETIME,
  FOREIGN KEY (evacuation_center_id) REFERENCES evacuation_centers  (evacuation_center_id),
  FOREIGN KEY (requested_by)         REFERENCES users                (user_id),
  FOREIGN KEY (handled_by)           REFERENCES users                (user_id),
  FOREIGN KEY (urgency_id)           REFERENCES urgency_levels       (urgency_id),
  FOREIGN KEY (status_id)            REFERENCES resource_request_status (status_id)
);

-- ============================================================
-- CSV & DATA SOURCE TRACKING
-- ============================================================

CREATE TABLE data_sources (
  id          BIGINT       PRIMARY KEY AUTO_INCREMENT,
  type        VARCHAR(20)  NOT NULL,
  uploaded_by VARCHAR(255) NOT NULL,
  created_at  TIMESTAMP,
  updated_at  TIMESTAMP
);

CREATE TABLE csv_uploads (
  id                 BIGINT       PRIMARY KEY AUTO_INCREMENT,
  data_source_id     BIGINT       NOT NULL,
  file_name          VARCHAR(255),
  total_records      INT,
  successful_records INT,
  failed_records     INT,
  created_at         TIMESTAMP,
  updated_at         TIMESTAMP,
  FOREIGN KEY (data_source_id) REFERENCES data_sources (id)
);

CREATE TABLE import_logs (
  id             BIGINT      PRIMARY KEY AUTO_INCREMENT,
  data_source_id BIGINT      NOT NULL,
  row_num        INT,
  status         VARCHAR(20),
  error_message  TEXT,
  created_at     TIMESTAMP,
  updated_at     TIMESTAMP,
  FOREIGN KEY (data_source_id) REFERENCES data_sources (id)
);

-- ============================================================
-- LOCATION & TRACKING
-- ============================================================

CREATE TABLE geotagged_locations (
  location_id  INT          PRIMARY KEY AUTO_INCREMENT,
  household_id VARCHAR(255) NOT NULL,
  latitude     DECIMAL(10,7),
  longitude    DECIMAL(10,7),
  updated_at   DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (household_id) REFERENCES households (household_id)
);

CREATE TABLE device_tracking_logs (
  tracking_id     INT          PRIMARY KEY AUTO_INCREMENT,
  household_id    VARCHAR(255) NOT NULL,
  latitude        DECIMAL(10,7),
  longitude       DECIMAL(10,7),
  battery_level   INT,
  signal_strength INT,
  logged_at       DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (household_id) REFERENCES households (household_id)
);

-- ============================================================
-- RESPONDER MODULE
-- ============================================================

CREATE TABLE responders (
  responder_id        INT          PRIMARY KEY AUTO_INCREMENT,
  created_by_admin_id VARCHAR(255) NOT NULL,
  team_id             INT,
  username            VARCHAR(100) NOT NULL UNIQUE,
  password_hash       VARCHAR(255) NOT NULL,
  full_name           VARCHAR(100) NOT NULL,
  title               VARCHAR(100),
  contact_number      VARCHAR(20),
  date_of_birth       DATE,
  gender              VARCHAR(20),
  address             TEXT,
  is_validated        BOOLEAN      NOT NULL DEFAULT FALSE,
  is_deployed         BOOLEAN      NOT NULL DEFAULT FALSE,
  created_at          DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by_admin_id) REFERENCES users        (user_id),
  FOREIGN KEY (team_id)             REFERENCES rescue_teams (team_id)
);

CREATE TABLE responder_location_logs (
  log_id          INT PRIMARY KEY AUTO_INCREMENT,
  responder_id    INT          NOT NULL,
  latitude        DECIMAL(10,7),
  longitude       DECIMAL(10,7),
  battery_level   INT,
  signal_strength INT,
  logged_at       DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (responder_id) REFERENCES responders (responder_id)
);

CREATE TABLE responder_assignments (
  assignment_id    INT          PRIMARY KEY AUTO_INCREMENT,
  responder_id     INT          NOT NULL,
  disaster_id      VARCHAR(255) NOT NULL,
  affected_area_id INT,
  assigned_area    VARCHAR(150),
  route_notes      TEXT,
  status           VARCHAR(50)  NOT NULL DEFAULT 'Pending',
  assigned_at      DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (responder_id)     REFERENCES responders     (responder_id),
  FOREIGN KEY (disaster_id)      REFERENCES disaster_events (event_id),
  FOREIGN KEY (affected_area_id) REFERENCES affected_areas  (affected_area_id)
);

CREATE TABLE responder_routes (
  route_id      INT PRIMARY KEY AUTO_INCREMENT,
  assignment_id INT          NOT NULL,
  route_name    VARCHAR(150),
  created_at    DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (assignment_id) REFERENCES responder_assignments (assignment_id)
);

CREATE TABLE route_coordinates (
  coordinate_id  INT PRIMARY KEY AUTO_INCREMENT,
  route_id       INT          NOT NULL,
  latitude       DECIMAL(10,7),
  longitude      DECIMAL(10,7),
  sequence_order INT          NOT NULL,
  FOREIGN KEY (route_id) REFERENCES responder_routes (route_id)
);

CREATE TABLE responder_communication_logs (
  communication_id INT          PRIMARY KEY AUTO_INCREMENT,
  responder_id     INT          NOT NULL,
  team_id          INT,
  team_name        VARCHAR(100),
  disaster_id      VARCHAR(255) NOT NULL,
  message          TEXT,
  timestamp        DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (responder_id) REFERENCES responders     (responder_id),
  FOREIGN KEY (team_id)      REFERENCES rescue_teams   (team_id),
  FOREIGN KEY (disaster_id)  REFERENCES disaster_events (event_id)
);

CREATE TABLE responder_field_reports (
  report_id    INT          PRIMARY KEY AUTO_INCREMENT,
  responder_id INT          NOT NULL,
  disaster_id  VARCHAR(255) NOT NULL,
  household_id VARCHAR(255),
  latitude     DECIMAL(10,7),
  longitude    DECIMAL(10,7),
  notes        TEXT,
  created_at   DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (responder_id) REFERENCES responders     (responder_id),
  FOREIGN KEY (disaster_id)  REFERENCES disaster_events (event_id),
  FOREIGN KEY (household_id) REFERENCES households      (household_id)
);

CREATE TABLE responder_field_report_details (
  detail_id   INT PRIMARY KEY AUTO_INCREMENT,
  report_id   INT NOT NULL,
  category_id INT NOT NULL,
  value       INT,
  notes       TEXT,
  FOREIGN KEY (report_id)   REFERENCES responder_field_reports (report_id),
  FOREIGN KEY (category_id) REFERENCES field_report_categories (category_id)
);

-- ============================================================
-- CHECK-IN MODULE
-- ============================================================

CREATE TABLE responder_check_ins (
  check_in_id      INT          PRIMARY KEY AUTO_INCREMENT,
  responder_id     INT          NOT NULL,
  disaster_id      VARCHAR(255) NOT NULL,
  team_id          INT,
  affected_area_id INT,
  household_id     VARCHAR(255),
  member_id        VARCHAR(255),
  latitude         DECIMAL(10,7),
  longitude        DECIMAL(10,7),
  check_in_method  VARCHAR(10)  NOT NULL DEFAULT 'manual',
  status_id        INT,
  notes            TEXT,
  checked_in_at    DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  checked_out_at   DATETIME,
  verified_by      VARCHAR(255),
  FOREIGN KEY (responder_id)     REFERENCES responders       (responder_id),
  FOREIGN KEY (disaster_id)      REFERENCES disaster_events  (event_id),
  FOREIGN KEY (team_id)          REFERENCES rescue_teams     (team_id),
  FOREIGN KEY (affected_area_id) REFERENCES affected_areas   (affected_area_id),
  FOREIGN KEY (household_id)     REFERENCES households       (household_id),
  FOREIGN KEY (member_id)        REFERENCES household_members (member_id),
  FOREIGN KEY (status_id)        REFERENCES household_status  (status_id),
  FOREIGN KEY (verified_by)      REFERENCES users             (user_id)
);

-- ============================================================
-- HQ REPORTS & ARCHIVE
-- ============================================================

CREATE TABLE hq_field_reports (
  hq_report_id     INT          PRIMARY KEY AUTO_INCREMENT,
  disaster_id      VARCHAR(255) NOT NULL,
  household_id     VARCHAR(255),
  source           VARCHAR(20)  NOT NULL,
  linked_report_id INT          NOT NULL,
  created_at       DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (disaster_id)  REFERENCES disaster_events (event_id),
  FOREIGN KEY (household_id) REFERENCES households      (household_id)
);

CREATE TABLE situation_reports (
  sit_rep_id          INT          PRIMARY KEY AUTO_INCREMENT,
  disaster_id         VARCHAR(255) NOT NULL,
  created_by_admin_id VARCHAR(255) NOT NULL,
  household_id        VARCHAR(255),
  summary             TEXT,
  escalated_to        VARCHAR(150),
  is_archived         BOOLEAN      NOT NULL DEFAULT FALSE,
  generated_at        DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (disaster_id)         REFERENCES disaster_events (event_id),
  FOREIGN KEY (created_by_admin_id) REFERENCES users           (user_id),
  FOREIGN KEY (household_id)        REFERENCES households      (household_id)
);

CREATE TABLE incident_archives (
  archive_id           INT          PRIMARY KEY AUTO_INCREMENT,
  disaster_id          VARCHAR(255) NOT NULL,
  archived_by_admin_id VARCHAR(255),
  archive_note         TEXT,
  archived_at          DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (disaster_id)          REFERENCES disaster_events (event_id),
  FOREIGN KEY (archived_by_admin_id) REFERENCES users           (user_id)
);

-- ============================================================
-- MAPPING MODULE
-- ============================================================

CREATE TABLE map_tile_metadata (
  tile_id    INT          PRIMARY KEY AUTO_INCREMENT,
  zoom_level INT          NOT NULL,
  tile_x     INT          NOT NULL,
  tile_y     INT          NOT NULL,
  tile_url   VARCHAR(500) NOT NULL,
  cached_at  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  expires_at DATETIME,
  UNIQUE KEY uq_tile (zoom_level, tile_x, tile_y)
);
