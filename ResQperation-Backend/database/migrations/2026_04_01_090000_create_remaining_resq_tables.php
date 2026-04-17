<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // ============================================================
        // 9. LOOKUP TABLES (created first — referenced by everything)
        // ============================================================

        Schema::create('StatusLookup', function (Blueprint $table) {
            $table->id('StatusID');
            $table->string('StatusKey', 50)->unique();
            $table->string('StatusLabel', 100);
        });

        Schema::create('UrgencyLevel', function (Blueprint $table) {
            $table->id('UrgencyID');
            $table->string('UrgencyKey', 50)->unique();
            $table->string('UrgencyLabel', 100);
        });

        Schema::create('SeverityLevel', function (Blueprint $table) {
            $table->id('SeverityID');
            $table->string('SeverityKey', 50)->unique();
            $table->string('SeverityLabel', 100);
        });

        Schema::create('RequestType', function (Blueprint $table) {
            $table->id('RequestTypeID');
            $table->string('TypeKey', 50)->unique();
            $table->string('TypeLabel', 100);
        });

        Schema::create('FieldReportCategory', function (Blueprint $table) {
            $table->id('CategoryID');
            $table->string('CategoryKey', 50)->unique();
            $table->string('CategoryLabel', 100);
        });

        // ============================================================
        // 2. DISASTER SYSTEM
        // ============================================================

        Schema::create('DisasterEvent', function (Blueprint $table) {
            $table->id('DisasterID');
            $table->string('DisasterType', 50);
            $table->text('Description')->nullable();
            $table->unsignedBigInteger('SeverityID')->nullable();
            $table->dateTime('StartTime')->nullable();
            $table->dateTime('EndTime')->nullable();
            $table->timestamps();

            $table->foreign('SeverityID')->references('SeverityID')->on('SeverityLevel')->nullOnDelete();
        });

        // ============================================================
        // 4. EVACUATION SITES (needed before HouseholdEvacuation & HouseholdNotification)
        // ============================================================

        Schema::create('EvacuationSite', function (Blueprint $table) {
            $table->id('EvacuationSiteID');
            $table->string('ExternalEvacuationID', 100)->nullable();
            $table->string('SiteName', 150)->nullable();
            $table->integer('Capacity')->nullable();
            $table->integer('CurrentOccupancy')->default(0);
            $table->decimal('Latitude', 10, 7)->nullable();
            $table->decimal('Longitude', 10, 7)->nullable();
        });

        // ============================================================
        // 6. EXTERNAL SYSTEMS
        // ============================================================

        Schema::create('ExternalEndpoint', function (Blueprint $table) {
            $table->id('EndpointID');
            $table->enum('SystemName', ['EVATRACK', 'TRACKINGAID', 'OTHER']);
            $table->text('EndpointURL');
            $table->string('ApiKey', 255)->nullable();
            $table->boolean('IsActive')->default(true);
            $table->timestamps();
        });

        Schema::create('EvaTrackSystem', function (Blueprint $table) {
            $table->id('EvaTrackID');
            $table->text('RequestDescription')->nullable();
            $table->timestamps();
        });

        Schema::create('TrackingAidSystem', function (Blueprint $table) {
            $table->id('TrackAidID');
            $table->text('RequestDescription')->nullable();
            $table->unsignedBigInteger('ForwardedByHQID')->nullable();
            $table->timestamps();
        });

        // ============================================================
        // 1. HOUSEHOLD MODULE (additional tables — Household already exists)
        // ============================================================

        Schema::create('HouseholdMember', function (Blueprint $table) {
            $table->id('MemberID');
            $table->unsignedBigInteger('HouseholdID');
            $table->string('FullName', 120);
            $table->integer('Age')->nullable();
            $table->string('Relationship', 50)->nullable();
            $table->boolean('IsPWD')->default(false);
            $table->boolean('IsSenior')->default(false);
            $table->boolean('HasMedicalCondition')->default(false);

            $table->foreign('HouseholdID')->references('HouseholdID')->on('Household')->cascadeOnDelete();
        });

        Schema::create('GeotaggedLocation', function (Blueprint $table) {
            $table->id('LocationID');
            $table->unsignedBigInteger('HouseholdID');
            $table->decimal('Latitude', 10, 7)->nullable();
            $table->decimal('Longitude', 10, 7)->nullable();
            $table->timestamp('UpdatedAt')->useCurrent()->useCurrentOnUpdate();

            $table->foreign('HouseholdID')->references('HouseholdID')->on('Household')->cascadeOnDelete();
        });

        Schema::create('DeviceTrackingLog', function (Blueprint $table) {
            $table->id('TrackingID');
            $table->unsignedBigInteger('HouseholdID');
            $table->decimal('Latitude', 10, 7)->nullable();
            $table->decimal('Longitude', 10, 7)->nullable();
            $table->integer('BatteryLevel')->nullable();
            $table->integer('SignalStrength')->nullable();
            $table->timestamp('LoggedAt')->useCurrent();

            $table->foreign('HouseholdID')->references('HouseholdID')->on('Household')->cascadeOnDelete();
        });

        Schema::create('EvaTrackCallback', function (Blueprint $table) {
            $table->id('CallbackID');
            $table->unsignedBigInteger('HouseholdID');
            $table->string('QRCode', 255);
            $table->timestamp('ScannedAt')->useCurrent();
            $table->string('ScannedByExternal', 255)->nullable();

            $table->foreign('HouseholdID')->references('HouseholdID')->on('Household')->cascadeOnDelete();
        });

        Schema::create('HouseholdNotification', function (Blueprint $table) {
            $table->id('NotificationID');
            $table->unsignedBigInteger('HouseholdID');
            $table->unsignedBigInteger('DisasterID');
            $table->unsignedBigInteger('EvacuationSiteID')->nullable();
            $table->enum('SourceSystem', ['EVATRACK', 'OTHER']);
            $table->string('Title', 150);
            $table->text('Message');
            $table->boolean('IsRead')->default(false);
            $table->timestamp('SentAt')->useCurrent();

            $table->foreign('HouseholdID')->references('HouseholdID')->on('Household')->cascadeOnDelete();
            $table->foreign('DisasterID')->references('DisasterID')->on('DisasterEvent');
            $table->foreign('EvacuationSiteID')->references('EvacuationSiteID')->on('EvacuationSite')->nullOnDelete();
        });

        // ============================================================
        // 2. DISASTER SYSTEM (continued)
        // ============================================================

        Schema::create('HouseholdDisaster', function (Blueprint $table) {
            $table->id('HouseholdDisasterID');
            $table->unsignedBigInteger('HouseholdID');
            $table->unsignedBigInteger('DisasterID');
            $table->unsignedBigInteger('InitialStatusID')->nullable();
            $table->timestamps();

            $table->foreign('HouseholdID')->references('HouseholdID')->on('Household');
            $table->foreign('DisasterID')->references('DisasterID')->on('DisasterEvent');
            $table->foreign('InitialStatusID')->references('StatusID')->on('StatusLookup')->nullOnDelete();
        });

        Schema::create('HouseholdStatusReport', function (Blueprint $table) {
            $table->id('StatusReportID');
            $table->unsignedBigInteger('HouseholdDisasterID');
            $table->unsignedBigInteger('StatusID');
            $table->text('Remarks')->nullable();
            $table->timestamps();

            $table->foreign('HouseholdDisasterID')->references('HouseholdDisasterID')->on('HouseholdDisaster');
            $table->foreign('StatusID')->references('StatusID')->on('StatusLookup');
        });

        // ============================================================
        // 3. RESPONDER MODULE
        // ============================================================

        Schema::create('RescueTeam', function (Blueprint $table) {
            $table->id('TeamID');
            $table->string('TeamName', 100);
        });

        Schema::create('Responder', function (Blueprint $table) {
            $table->id('ResponderID');
            $table->string('ResponderName', 100);
            $table->unsignedBigInteger('SafeTrackAccountID')->nullable();
            $table->unsignedBigInteger('TeamID')->nullable();
            $table->string('Title', 100)->nullable();
            $table->timestamps();

            $table->foreign('SafeTrackAccountID')->references('SafeTrackAccountID')->on('SafeTrackAccount')->nullOnDelete();
            $table->foreign('TeamID')->references('TeamID')->on('RescueTeam')->nullOnDelete();
        });

        Schema::create('ResponderAssignment', function (Blueprint $table) {
            $table->id('AssignmentID');
            $table->unsignedBigInteger('ResponderID');
            $table->unsignedBigInteger('DisasterID');
            $table->string('AssignedArea', 150)->nullable();
            $table->timestamp('AssignedAt')->useCurrent();

            $table->foreign('ResponderID')->references('ResponderID')->on('Responder');
            $table->foreign('DisasterID')->references('DisasterID')->on('DisasterEvent');
        });

        Schema::create('ResponderCommunicationLog', function (Blueprint $table) {
            $table->id('CommunicationID');
            $table->unsignedBigInteger('ResponderID');
            $table->unsignedBigInteger('DisasterID');
            $table->text('Message')->nullable();
            $table->timestamp('Timestamp')->useCurrent();

            $table->foreign('ResponderID')->references('ResponderID')->on('Responder');
            $table->foreign('DisasterID')->references('DisasterID')->on('DisasterEvent');
        });

        Schema::create('ResponderFieldReport', function (Blueprint $table) {
            $table->id('ReportID');
            $table->unsignedBigInteger('ResponderID');
            $table->unsignedBigInteger('DisasterID');
            $table->text('Notes')->nullable();
            $table->decimal('Latitude', 10, 7)->nullable();
            $table->decimal('Longitude', 10, 7)->nullable();
            $table->timestamps();

            $table->foreign('ResponderID')->references('ResponderID')->on('Responder');
            $table->foreign('DisasterID')->references('DisasterID')->on('DisasterEvent');
        });

        Schema::create('ResponderFieldReportDetail', function (Blueprint $table) {
            $table->id('DetailID');
            $table->unsignedBigInteger('ReportID');
            $table->unsignedBigInteger('CategoryID');
            $table->integer('Value')->nullable();
            $table->text('Notes')->nullable();

            $table->foreign('ReportID')->references('ReportID')->on('ResponderFieldReport')->cascadeOnDelete();
            $table->foreign('CategoryID')->references('CategoryID')->on('FieldReportCategory');
        });

        // ============================================================
        // 4. EVACUATION (continued)
        // ============================================================

        Schema::create('HouseholdEvacuation', function (Blueprint $table) {
            $table->id('HouseholdEvacuationID');
            $table->unsignedBigInteger('HouseholdID');
            $table->unsignedBigInteger('EvacuationSiteID');
            $table->unsignedBigInteger('EvaTrackID')->nullable();
            $table->timestamp('EvacuatedAt')->useCurrent();
            $table->unsignedBigInteger('VerifiedByResponderID')->nullable();
            $table->boolean('QRCodeScanned')->default(false);

            $table->foreign('HouseholdID')->references('HouseholdID')->on('Household')->cascadeOnDelete();
            $table->foreign('EvacuationSiteID')->references('EvacuationSiteID')->on('EvacuationSite');
            $table->foreign('EvaTrackID')->references('EvaTrackID')->on('EvaTrackSystem')->nullOnDelete();
            $table->foreign('VerifiedByResponderID')->references('ResponderID')->on('Responder')->nullOnDelete();
        });

        // ============================================================
        // 5. HQ / ADMIN MODULE
        // ============================================================

        Schema::create('HQAdmin', function (Blueprint $table) {
            $table->id('HQAdminID');
            $table->string('FullName', 100)->nullable();
            $table->string('Username', 50)->unique();
            $table->string('PasswordHash', 255);
            $table->timestamps();
        });

        Schema::create('HQFieldReport', function (Blueprint $table) {
            $table->id('HQReportID');
            $table->enum('Source', ['RESPONDER', 'HOUSEHOLD']);
            $table->unsignedBigInteger('LinkedReportID'); // polymorphic — no FK enforced
            $table->unsignedBigInteger('DisasterID');
            $table->timestamps();

            $table->foreign('DisasterID')->references('DisasterID')->on('DisasterEvent');
        });

        // ============================================================
        // 7. REQUEST SYSTEM
        // ============================================================

        Schema::create('IncomingRequest', function (Blueprint $table) {
            $table->id('RequestID');
            $table->enum('Source', ['RESPONDER', 'EVATRACK', 'HOUSEHOLD']);
            $table->unsignedBigInteger('DisasterID')->nullable();
            $table->unsignedBigInteger('SubmittedBy')->nullable();
            $table->string('SubmittedName', 100)->nullable();
            $table->unsignedBigInteger('HQAdminID')->nullable();
            $table->unsignedBigInteger('EndpointID')->nullable();
            $table->unsignedBigInteger('StatusID')->nullable();
            $table->timestamps();

            $table->foreign('DisasterID')->references('DisasterID')->on('DisasterEvent')->nullOnDelete();
            $table->foreign('HQAdminID')->references('HQAdminID')->on('HQAdmin')->nullOnDelete();
            $table->foreign('EndpointID')->references('EndpointID')->on('ExternalEndpoint')->nullOnDelete();
            $table->foreign('StatusID')->references('StatusID')->on('StatusLookup')->nullOnDelete();
        });

        Schema::create('RequestDetails', function (Blueprint $table) {
            $table->id('DetailID');
            $table->unsignedBigInteger('RequestID');
            $table->unsignedBigInteger('RequestTypeID');
            $table->text('Justification')->nullable();
            $table->unsignedBigInteger('UrgencyID')->nullable();
            $table->json('AdditionalInfo')->nullable();

            $table->foreign('RequestID')->references('RequestID')->on('IncomingRequest')->cascadeOnDelete();
            $table->foreign('RequestTypeID')->references('RequestTypeID')->on('RequestType');
            $table->foreign('UrgencyID')->references('UrgencyID')->on('UrgencyLevel')->nullOnDelete();
        });

        Schema::create('RequestItem', function (Blueprint $table) {
            $table->id('ItemID');
            $table->unsignedBigInteger('DetailID');
            $table->string('ItemName', 100);
            $table->integer('Quantity')->default(1);
            $table->string('Unit', 50)->nullable();
            $table->text('Notes')->nullable();
            $table->boolean('ForwardedToTrackingAid')->default(false);
            $table->unsignedBigInteger('TrackAidID')->nullable();

            $table->foreign('DetailID')->references('DetailID')->on('RequestDetails')->cascadeOnDelete();
            $table->foreign('TrackAidID')->references('TrackAidID')->on('TrackingAidSystem')->nullOnDelete();
        });

        Schema::create('HQRequest', function (Blueprint $table) {
            $table->id('HQRequestID');
            $table->enum('Source', ['RESPONDER', 'EVATRACK']);
            $table->unsignedBigInteger('ResponderRequestItemID')->nullable();
            $table->unsignedBigInteger('EvaTrackRequestID')->nullable();
            $table->unsignedBigInteger('RequestTypeID');
            $table->text('Description')->nullable();
            $table->unsignedBigInteger('StatusID')->nullable();
            $table->unsignedBigInteger('ValidatedBy')->nullable();
            $table->timestamps();

            $table->foreign('ResponderRequestItemID')->references('ItemID')->on('RequestItem')->nullOnDelete();
            $table->foreign('EvaTrackRequestID')->references('EvaTrackID')->on('EvaTrackSystem')->nullOnDelete();
            $table->foreign('RequestTypeID')->references('RequestTypeID')->on('RequestType');
            $table->foreign('StatusID')->references('StatusID')->on('StatusLookup')->nullOnDelete();
            $table->foreign('ValidatedBy')->references('HQAdminID')->on('HQAdmin')->nullOnDelete();
        });

        Schema::create('HQForwardedRequest', function (Blueprint $table) {
            $table->id('ForwardID');
            $table->unsignedBigInteger('HQRequestID');
            $table->unsignedBigInteger('TrackAidID');
            $table->timestamp('ForwardedAt')->useCurrent();

            $table->foreign('HQRequestID')->references('HQRequestID')->on('HQRequest');
            $table->foreign('TrackAidID')->references('TrackAidID')->on('TrackingAidSystem');
        });

        // ============================================================
        // 8. ARCHIVING
        // ============================================================

        Schema::create('IncidentArchive', function (Blueprint $table) {
            $table->id('ArchiveID');
            $table->unsignedBigInteger('DisasterID');
            $table->timestamp('ArchivedAt')->useCurrent();

            $table->foreign('DisasterID')->references('DisasterID')->on('DisasterEvent');
        });

        // ============================================================
        // SEED LOOKUP DATA
        // ============================================================

        DB::table('StatusLookup')->insert([
            ['StatusKey' => 'SAFE',        'StatusLabel' => 'Safe'],
            ['StatusKey' => 'EVACUATED',   'StatusLabel' => 'Evacuated'],
            ['StatusKey' => 'MISSING',     'StatusLabel' => 'Missing'],
            ['StatusKey' => 'INJURED',     'StatusLabel' => 'Injured'],
            ['StatusKey' => 'DECEASED',    'StatusLabel' => 'Deceased'],
            ['StatusKey' => 'PENDING',     'StatusLabel' => 'Pending'],
            ['StatusKey' => 'RESOLVED',    'StatusLabel' => 'Resolved'],
            ['StatusKey' => 'IN_PROGRESS', 'StatusLabel' => 'In Progress'],
        ]);

        DB::table('UrgencyLevel')->insert([
            ['UrgencyKey' => 'LOW',      'UrgencyLabel' => 'Low'],
            ['UrgencyKey' => 'MODERATE', 'UrgencyLabel' => 'Moderate'],
            ['UrgencyKey' => 'HIGH',     'UrgencyLabel' => 'High'],
            ['UrgencyKey' => 'CRITICAL', 'UrgencyLabel' => 'Critical'],
        ]);

        DB::table('SeverityLevel')->insert([
            ['SeverityKey' => 'MINOR',       'SeverityLabel' => 'Minor'],
            ['SeverityKey' => 'MODERATE',    'SeverityLabel' => 'Moderate'],
            ['SeverityKey' => 'SEVERE',      'SeverityLabel' => 'Severe'],
            ['SeverityKey' => 'CATASTROPHIC','SeverityLabel' => 'Catastrophic'],
        ]);

        DB::table('RequestType')->insert([
            ['TypeKey' => 'FOOD',       'TypeLabel' => 'Food & Water'],
            ['TypeKey' => 'MEDICAL',    'TypeLabel' => 'Medical Supplies'],
            ['TypeKey' => 'RESCUE',     'TypeLabel' => 'Rescue Operation'],
            ['TypeKey' => 'SHELTER',    'TypeLabel' => 'Shelter'],
            ['TypeKey' => 'EVACUATION', 'TypeLabel' => 'Evacuation Assistance'],
            ['TypeKey' => 'OTHER',      'TypeLabel' => 'Other'],
        ]);

        DB::table('FieldReportCategory')->insert([
            ['CategoryKey' => 'RESCUED',   'CategoryLabel' => 'Persons Rescued'],
            ['CategoryKey' => 'INJURED',   'CategoryLabel' => 'Persons Injured'],
            ['CategoryKey' => 'DECEASED',  'CategoryLabel' => 'Persons Deceased'],
            ['CategoryKey' => 'MISSING',   'CategoryLabel' => 'Persons Missing'],
            ['CategoryKey' => 'EVACUATED', 'CategoryLabel' => 'Persons Evacuated'],
            ['CategoryKey' => 'STRUCTURE', 'CategoryLabel' => 'Structures Damaged'],
        ]);
    }

    public function down(): void
    {
        // Drop in reverse order of creation
        Schema::dropIfExists('IncidentArchive');
        Schema::dropIfExists('HQForwardedRequest');
        Schema::dropIfExists('HQRequest');
        Schema::dropIfExists('RequestItem');
        Schema::dropIfExists('RequestDetails');
        Schema::dropIfExists('IncomingRequest');
        Schema::dropIfExists('HQFieldReport');
        Schema::dropIfExists('HQAdmin');
        Schema::dropIfExists('HouseholdEvacuation');
        Schema::dropIfExists('ResponderFieldReportDetail');
        Schema::dropIfExists('ResponderFieldReport');
        Schema::dropIfExists('ResponderCommunicationLog');
        Schema::dropIfExists('ResponderAssignment');
        Schema::dropIfExists('Responder');
        Schema::dropIfExists('RescueTeam');
        Schema::dropIfExists('HouseholdStatusReport');
        Schema::dropIfExists('HouseholdDisaster');
        Schema::dropIfExists('HouseholdNotification');
        Schema::dropIfExists('EvaTrackCallback');
        Schema::dropIfExists('DeviceTrackingLog');
        Schema::dropIfExists('GeotaggedLocation');
        Schema::dropIfExists('HouseholdMember');
        Schema::dropIfExists('TrackingAidSystem');
        Schema::dropIfExists('EvaTrackSystem');
        Schema::dropIfExists('ExternalEndpoint');
        Schema::dropIfExists('EvacuationSite');
        Schema::dropIfExists('DisasterEvent');
        Schema::dropIfExists('FieldReportCategory');
        Schema::dropIfExists('RequestType');
        Schema::dropIfExists('SeverityLevel');
        Schema::dropIfExists('UrgencyLevel');
        Schema::dropIfExists('StatusLookup');
    }
};
