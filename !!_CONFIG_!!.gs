/* !!_CONFIG_!!.gs*/
/*

  ⚠️ ⚠️ !  WARNING  ! ⚠️ ⚠️
  CONFIG INFORMATION BELOW
  











































*/

// ====================================================================
// JSDOC DEFINITIONS
// ====================================================================

  /**
   * @typedef {object} Security_Access
   * 
   * @property {Enum_Security_Permission} permission 
   * The permission level for the item.
   * 
   * @property {Array<Enum_Security_Rank>} rankList 
   * The list of ranks for the item.
   * 
   * @property {Array<Enum_Security_Division>} divisionList
   * The list of divisions for the item.
  */

  /**
   * @typedef {object} User_Account
   * 
   * @property {string} robloxUsername 
   * The roblox username of the user.
   * 
   * @property {string} discordUsername 
   * The discord username of the user.
   * 
   * @property {string} discordId 
   * The discord username of the user.
   * 
   * @property {Security_Access} Access 
   * The Access level the user has, used for security.
   * 
  */

// ====================================================================
// SCRIPT VARIABLES
// ====================================================================

  /**
   * **Documentation:** https://developers.google.com/apps-script/guides/properties
   * 
   * The properties service of the google script. 
   * Allows you to store and retrive secure sitewide script properties using a key.
   * Properties can be viewed in the App Script Project settings.
   * 
   * - Global Variable
   * - **Version:** *PRE-ALPHA 1.02.02 (12/2/2025)*
   * - **File:** !!_CONFIG_!!.gs
   * - **Section:** SCRIPT VARIABLES
   * 
   * @type {GoogleAppsScript.Properties.PropertiesService}
  */
  const SCRIPT_PROPERTIES_SERVICE = PropertiesService.getScriptProperties();

  /**
   * **Documentation:** https://developers.google.com/apps-script/reference/cache/cache-service
   * 
   * The cache service of the google script.
   * Allows you to store and retrive sitewide cached values using a key.
   * Cached values have a TTL (time to live) and will be destroyed once that time is up.
   * 
   * - Global Variable
   * - **Version:** *PRE-ALPHA 1.02.02 (12/2/2025)*
   * - **File:** !!_CONFIG_!!.gs
   * - **Section:** SCRIPT VARIABLES
   * 
   * @type {GoogleAppsScript.Cache.Cache}
  */
  const SCRIPT_CACHE_SERVICE = CacheService.getScriptCache();

// ====================================================================
// SITE CONFIG
// ====================================================================

  /**
   * The current version of the site.
   * The displayed value for the site version.
   * Purely for cosmetic and version tracking usage.
   * 
   * - Global Variable
   * - **Version:** *PRE-ALPHA 1.02.02 (12/2/2025)*
   * - **File:** !!_CONFIG_!!.gs
   * - **Section:** SITE CONFIG
   * 
   * @type {string}
  */
  const SITE_VERSION = "PRE-ALPHA 1.02.04";

  /**
   * ⚠️**DEPRECATED**⚠️
   * - This toggle will be removed in future versions 
   * 
   * The debug toggle.
   * Shows all page elements if user is admin.
   * Purely for debugging reasons.
   * 
   * - Global Variable
   * - **Version:** *PRE-ALPHA 1.02.02 (12/2/2025)*
   * - **File:** !!_CONFIG_!!.gs
   * - **Section:** SITE CONFIG
   * 
   * @type {boolean}
   * @deprecated
  */
  const DEBUG_MODE = false;

// ====================================================================
// SECURITY ENUM
// ====================================================================

  /** 
   * @typedef {object} Enum_Security_Permission
   * 
   * @property {string} ADMIN 
   * Highest permission level, cant be denied if debug mode is on.
   * - Compatable with assignment to user
   * - Compatable with assignment to element
   * 
   * @property {string} USER 
   * Default permission level, best mixed with data like ranks and divisions to filter.
   * - Compatable with assignment to user
   * - Compatable with assignment to element
   * 
   * @property {string} GUEST 
   * Lowest permission level, only for users not in the member data.
   * - Compatable with assignment to user
   * - Compatable with assignment to element
   * 
   * @property {string} ALL 
   * Will allow users of any level access.
   * - ⚠️ Conflicts with assignment to user ⚠️
   * - Compatable with assignment to element
   * 
   * @property {string} NONE 
   * Will allow no users to access, unless they are admin and debug mode is on.
   * - ⚠️ Conflicts with assignment to user ⚠️
   * - Compatable with assignment to element
  */
  /**
   * Security enum for permission level.
   * Used to determine how and if the page elements will display to the user.
   * 
   * - Global Variable
   * - **Version:** *PRE-ALPHA 1.02.02 (12/2/2025)*
   * - **File:** !!_CONFIG_!!.gs
   * - **Section:** SECURITY ENUM
   *
   * **Members:**
   * - ADMIN
   * - USER
   * - GUEST
   * - ALL
   * - NONE
   * 
   * @readonly
   * @enum {string}
   * @type {Enum_Security_Permission}
  */
  const PERMISSION = Object.freeze({
    ADMIN: "Admin",
    USER: "User",
    GUEST: "Guest",
    ALL: "All", 
    NONE: "None",
  });

  /** 
   * @typedef {object} Enum_Security_Rank
   * 
   * @property {string} ALL 
   * Will allow users of any rank access.
   * - ⚠️ Conflicts with assignment to user ⚠️
   * - Compatable with assignment to element
   * 
   * @property {string} ENLISTED
   * A rank that can be given to a user or element for security.
   * - Compatable with assignment to user
   * - Compatable with assignment to element
   *
   * @property {string} PRIVATE
   * A rank that can be given to a user or element for security.
   * - Compatable with assignment to user
   * - Compatable with assignment to element
   *
   * @property {string} PRIVATE_FIRST_CLASS
   * A rank that can be given to a user or element for security.
   * - Compatable with assignment to user
   * - Compatable with assignment to element
   *
   * @property {string} LANCE_CORPORAL
   * A rank that can be given to a user or element for security.
   * - Compatable with assignment to user
   * - Compatable with assignment to element
   *
   * @property {string} CORPORAL
   * A rank that can be given to a user or element for security.
   * - Compatable with assignment to user
   * - Compatable with assignment to element
   *
   * @property {string} SERGEANT
   * A rank that can be given to a user or element for security.
   * - Compatable with assignment to user
   * - Compatable with assignment to element
   *
   * @property {string} STAFF_SERGEANT
   * A rank that can be given to a user or element for security.
   * - Compatable with assignment to user
   * - Compatable with assignment to element
   *
   * @property {string} TECHNICAL_SERGEANT
   * A rank that can be given to a user or element for security.
   * - Compatable with assignment to user
   * - Compatable with assignment to element
   *
   * @property {string} MASTER_SERGEANT
   * A rank that can be given to a user or element for security.
   * - Compatable with assignment to user
   * - Compatable with assignment to element
   *
   * @property {string} SERGEANT_MAJOR
   * A rank that can be given to a user or element for security.
   * - Compatable with assignment to user
   * - Compatable with assignment to element
   *
   * @property {string} JUNIOR_WARRANT_OFFICER
   * A rank that can be given to a user or element for security.
   * - Compatable with assignment to user
   * - Compatable with assignment to element
   *
   * @property {string} WARRANT_OFFICER
   * A rank that can be given to a user or element for security.
   * - Compatable with assignment to user
   * - Compatable with assignment to element
   *
   * @property {string} CHIEF_WARRANT_OFFICER
   * A rank that can be given to a user or element for security.
   * - Compatable with assignment to user
   * - Compatable with assignment to element
   *
   * @property {string} LIEUTENANT
   * A rank that can be given to a user or element for security.
   * - Compatable with assignment to user
   * - Compatable with assignment to element
   *
   * @property {string} CAPTAIN
   * A rank that can be given to a user or element for security.
   * - Compatable with assignment to user
   * - Compatable with assignment to element
   *
   * @property {string} MAJOR
   * A rank that can be given to a user or element for security.
   * - Compatable with assignment to user
   * - Compatable with assignment to element
   *
   * @property {string} COLONEL
   * A rank that can be given to a user or element for security.
   * - Compatable with assignment to user
   * - Compatable with assignment to element
   *
   * @property {string} BRIGADIER_GENERAL
   * A rank that can be given to a user or element for security.
   * - Compatable with assignment to user
   * - Compatable with assignment to element
   *
   * @property {string} MAJOR_GENERAL
   * A rank that can be given to a user or element for security.
   * - Compatable with assignment to user
   * - Compatable with assignment to element
   *
   * @property {string} LIEUTENANT_GENERAL
   * A rank that can be given to a user or element for security.
   * - Compatable with assignment to user
   * - Compatable with assignment to element
  */
  /**
   * **Documentation:** https://docs.google.com/document/d/1c9vr4rb-0NhnP8wAP-WwImdy6vdhfN6Lpwq-tng41JE/edit?tab=t.0
   * 
   * Security enum for rank.
   * Used to determine how and if the page elements will display to the user.
   * 
   * - Global Variable
   * - **Version:** *PRE-ALPHA 1.02.02 (12/2/2025)*
   * - **File:** !!_CONFIG_!!.gs
   * - **Section:** SECURITY ENUM
   *
   * **Members:**
   * - ALL
   * - ENLISTED
   * - PRIVATE
   * - PRIVATE_FIRST_CLASS
   * - LANCE_CORPORAL
   * - CORPORAL
   * - SERGEANT
   * - STAFF_SERGEANT
   * - TECHNICAL_SERGEANT
   * - MASTER_SERGEANT
   * - SERGEANT_MAJOR
   * - JUNIOR_WARRANT_OFFICER
   * - WARRANT_OFFICER
   * - CHIEF_WARRANT_OFFICER
   * - LIEUTENANT
   * - CAPTAIN
   * - MAJOR
   * - COLONEL
   * - BRIGADIER_GENERAL
   * - MAJOR_GENERAL
   * - LIEUTENANT_GENERAL
   * 
   * @readonly
   * @enum {string}
   * @type {Enum_Security_Rank}
  */
  const RANK = Object.freeze({
    ALL: "All",
    ENLISTED: "Enlisted",
    PRIVATE: "Private",
    PRIVATE_FIRST_CLASS: "Private First Class",
    LANCE_CORPORAL: "Lance Corporal",
    CORPORAL: "Corporal",
    SERGEANT: "Sergeant",
    STAFF_SERGEANT: "Staff Sergeant",
    TECHNICAL_SERGEANT: "Technical Sergeant",
    MASTER_SERGEANT: "Master Sergeant",
    SERGEANT_MAJOR: "Sergeant Major",
    JUNIOR_WARRANT_OFFICER: "Junior Warrant Officer",
    WARRANT_OFFICER: "Warrant Officer",
    CHIEF_WARRANT_OFFICER: "Chief Warrant Officer",
    LIEUTENANT: "Lieutenant",
    CAPTAIN: "Captain",
    MAJOR: "Major",
    COLONEL: "Colonel",
    BRIGADIER_GENERAL: "Brigadier General",
    MAJOR_GENERAL: "Major General",
    LIEUTENANT_GENERAL: "Lieutenant General"
  });

  /** 
   * @typedef {object} Enum_UI_RankAbbreviation
   * 
   * @property {string} ENLISTED
   * A rank that can be translated into its abbreviation, [E-0].
   * - Compatable with assignment to user
   * - Compatable with assignment to element
   *
   * @property {string} PRIVATE
   * A rank that can be translated into its abbreviation, [E-1].
   * - Compatable with assignment to user
   * - Compatable with assignment to element
   *
   * @property {string} PRIVATE_FIRST_CLASS
   * A rank that can be translated into its abbreviation, [E-2].
   * - Compatable with assignment to user
   * - Compatable with assignment to element
   *
   * @property {string} LANCE_CORPORAL
   * A rank that can be translated into its abbreviation, [E-3].
   * - Compatable with assignment to user
   * - Compatable with assignment to element
   *
   * @property {string} CORPORAL
   * A rank that can be translated into its abbreviation, [E-4].
   * - Compatable with assignment to user
   * - Compatable with assignment to element
   *
   * @property {string} SERGEANT
   * A rank that can be translated into its abbreviation, [E-5].
   * - Compatable with assignment to user
   * - Compatable with assignment to element
   *
   * @property {string} STAFF_SERGEANT
   * A rank that can be translated into its abbreviation, [E-6].
   * - Compatable with assignment to user
   * - Compatable with assignment to element
   *
   * @property {string} TECHNICAL_SERGEANT
   * A rank that can be translated into its abbreviation, [E-7].
   * - Compatable with assignment to user
   * - Compatable with assignment to element
   *
   * @property {string} MASTER_SERGEANT
   * A rank that can be translated into its abbreviation, [E-8].
   * - Compatable with assignment to user
   * - Compatable with assignment to element
   *
   * @property {string} SERGEANT_MAJOR
   * A rank that can be translated into its abbreviation, [E-9].
   * - Compatable with assignment to user
   * - Compatable with assignment to element
   *
   * @property {string} JUNIOR_WARRANT_OFFICER
   * A rank that can be translated into its abbreviation, [W-0].
   * - Compatable with assignment to user
   * - Compatable with assignment to element
   *
   * @property {string} WARRANT_OFFICER
   * A rank that can be translated into its abbreviation, [W-1].
   * - Compatable with assignment to user
   * - Compatable with assignment to element
   *
   * @property {string} CHIEF_WARRANT_OFFICER
   * A rank that can be translated into its abbreviation, [O-0].
   * - Compatable with assignment to user
   * - Compatable with assignment to element
   *
   * @property {string} LIEUTENANT
   * A rank that can be translated into its abbreviation, [O-1].
   * - Compatable with assignment to user
   * - Compatable with assignment to element
   *
   * @property {string} CAPTAIN
   * A rank that can be translated into its abbreviation, [O-2].
   * - Compatable with assignment to user
   * - Compatable with assignment to element
   *
   * @property {string} MAJOR
   * A rank that can be translated into its abbreviation, [O-3].
   * - Compatable with assignment to user
   * - Compatable with assignment to element
   *
   * @property {string} COLONEL
   * A rank that can be translated into its abbreviation, [O-4].
   * - Compatable with assignment to user
   * - Compatable with assignment to element
   *
   * @property {string} BRIGADIER_GENERAL
   * A rank that can be translated into its abbreviation, [★].
   * - Compatable with assignment to user
   * - Compatable with assignment to element
   *
   * @property {string} MAJOR_GENERAL
   * A rank that can be translated into its abbreviation, [★★].
   * - Compatable with assignment to user
   * - Compatable with assignment to element
   *
   * @property {string} LIEUTENANT_GENERAL
   * A rank that can be translated into its abbreviation, [★★★].
   * - Compatable with assignment to user
   * - Compatable with assignment to element
  */
  /**
   * Display enum for rank.
   * Used to translate a rank enum into its abbreviated version.
   * 
   * - Global Variable
   * - **Version:** *PRE-ALPHA 1.02.02 (12/2/2025)*
   * - **File:** !!_CONFIG_!!.gs
   * - **Section:** SECURITY ENUM
   *
   * **Members:**
   * - ALL
   * - ENLISTED
   * - PRIVATE
   * - PRIVATE_FIRST_CLASS
   * - LANCE_CORPORAL
   * - CORPORAL
   * - SERGEANT
   * - STAFF_SERGEANT
   * - TECHNICAL_SERGEANT
   * - MASTER_SERGEANT
   * - SERGEANT_MAJOR
   * - JUNIOR_WARRANT_OFFICER
   * - WARRANT_OFFICER
   * - CHIEF_WARRANT_OFFICER
   * - LIEUTENANT
   * - CAPTAIN
   * - MAJOR
   * - COLONEL
   * - BRIGADIER_GENERAL
   * - MAJOR_GENERAL
   * - LIEUTENANT_GENERAL
   * 
   * @readonly
   * @enum {string}
   * @type {Enum_UI_RankAbbreviation}
  */
  const RANK_ABBREVIATION = Object.freeze({
    ENLISTED: "[E-0]",
    PRIVATE: "[E-1]",
    PRIVATE_FIRST_CLASS: "[E-2]",
    LANCE_CORPORAL: "[E-3]",
    CORPORAL: "[E-4]",
    SERGEANT: "[E-5]",
    STAFF_SERGEANT: "[E-6]",
    TECHNICAL_SERGEANT: "[E-7]",
    MASTER_SERGEANT: "[E-8]",
    SERGEANT_MAJOR: "[E-9]",
    JUNIOR_WARRANT_OFFICER: "[W-0]",
    WARRANT_OFFICER: "[W-1]",
    CHIEF_WARRANT_OFFICER: "[W-2]",
    LIEUTENANT: "[O-1]",
    CAPTAIN: "[O-2]",
    MAJOR: "[O-3]",
    COLONEL: "[O-4]",
    BRIGADIER_GENERAL: "[★]",
    MAJOR_GENERAL: "[★★]",
    LIEUTENANT_GENERAL: "[★★★]"
  });

  /** 
   * @typedef {object} Enum_Security_RankDeny
   * 
   * 
   * @property {string} ENLISTED
   * A rank that can be given to an element for security.
   * - ⚠️ Conflicts with assignment to user ⚠️
   * - Compatable with assignment to element
   *
   * @property {string} PRIVATE
   * A rank that can be given to an element for security.
   * - ⚠️ Conflicts with assignment to user ⚠️
   * - Compatable with assignment to element
   *
   * @property {string} PRIVATE_FIRST_CLASS
   * A rank that can be given to an element for security.
   * - ⚠️ Conflicts with assignment to user ⚠️
   * - Compatable with assignment to element
   *
   * @property {string} LANCE_CORPORAL
   * A rank that can be given to an element for security.
   * - ⚠️ Conflicts with assignment to user ⚠️
   * - Compatable with assignment to element
   *
   * @property {string} CORPORAL
   * A rank that can be given to an element for security.
   * - ⚠️ Conflicts with assignment to user ⚠️
   * - Compatable with assignment to element
   *
   * @property {string} SERGEANT
   * A rank that can be given to an element for security.
   * - ⚠️ Conflicts with assignment to user ⚠️
   * - Compatable with assignment to element
   *
   * @property {string} STAFF_SERGEANT
   * A rank that can be given to an element for security.
   * - ⚠️ Conflicts with assignment to user ⚠️
   * - Compatable with assignment to element
   *
   * @property {string} TECHNICAL_SERGEANT
   * A rank that can be given to an element for security.
   * - ⚠️ Conflicts with assignment to user ⚠️
   * - Compatable with assignment to element
   *
   * @property {string} MASTER_SERGEANT
   * A rank that can be given to an element for security.
   * - ⚠️ Conflicts with assignment to user ⚠️
   * - Compatable with assignment to element
   *
   * @property {string} SERGEANT_MAJOR
   * A rank that can be given to an element for security.
   * - ⚠️ Conflicts with assignment to user ⚠️
   * - Compatable with assignment to element
   *
   * @property {string} JUNIOR_WARRANT_OFFICER
   * A rank that can be given to an element for security.
   * - ⚠️ Conflicts with assignment to user ⚠️
   * - Compatable with assignment to element
   *
   * @property {string} WARRANT_OFFICER
   * A rank that can be given to an element for security.
   * - ⚠️ Conflicts with assignment to user ⚠️
   * - Compatable with assignment to element
   *
   * @property {string} CHIEF_WARRANT_OFFICER
   * A rank that can be given to an element for security.
   * - ⚠️ Conflicts with assignment to user ⚠️
   * - Compatable with assignment to element
   *
   * @property {string} LIEUTENANT
   * A rank that can be given to an element for security.
   * - ⚠️ Conflicts with assignment to user ⚠️
   * - Compatable with assignment to element
   *
   * @property {string} CAPTAIN
   * A rank that can be given to an element for security.
   * - ⚠️ Conflicts with assignment to user ⚠️
   * - Compatable with assignment to element
   *
   * @property {string} MAJOR
   * A rank that can be given to an element for security.
   * - ⚠️ Conflicts with assignment to user ⚠️
   * - Compatable with assignment to element
   *
   * @property {string} COLONEL
   * A rank that can be given to an element for security.
   * - ⚠️ Conflicts with assignment to user ⚠️
   * - Compatable with assignment to element
   *
   * @property {string} BRIGADIER_GENERAL
   * A rank that can be given to an element for security.
   * - ⚠️ Conflicts with assignment to user ⚠️
   * - Compatable with assignment to element
   *
   * @property {string} MAJOR_GENERAL
   * A rank that can be given to an element for security.
   * - ⚠️ Conflicts with assignment to user ⚠️
   * - Compatable with assignment to element
   *
   * @property {string} LIEUTENANT_GENERAL
   * A rank that can be given to an element for security.
   * - ⚠️ Conflicts with assignment to user ⚠️
   * - Compatable with assignment to element
  */
  /**
   * **Documentation:** https://docs.google.com/document/d/1c9vr4rb-0NhnP8wAP-WwImdy6vdhfN6Lpwq-tng41JE/edit?tab=t.0
   * 
   * Security enum for rank.
   * Used to determine how and if the page elements will display to the user.
   * Will give the rank but with a leading "!", indicating to deny users of the rank.
   * 
   * - Global Variable
   * - **Version:** *PRE-ALPHA 1.02.02 (12/2/2025)*
   * - **File:** !!_CONFIG_!!.gs
   * - **Section:** SECURITY ENUM
   *
   * **Members:**
   * - ALL
   * - ENLISTED
   * - PRIVATE
   * - PRIVATE_FIRST_CLASS
   * - LANCE_CORPORAL
   * - CORPORAL
   * - SERGEANT
   * - STAFF_SERGEANT
   * - TECHNICAL_SERGEANT
   * - MASTER_SERGEANT
   * - SERGEANT_MAJOR
   * - JUNIOR_WARRANT_OFFICER
   * - WARRANT_OFFICER
   * - CHIEF_WARRANT_OFFICER
   * - LIEUTENANT
   * - CAPTAIN
   * - MAJOR
   * - COLONEL
   * - BRIGADIER_GENERAL
   * - MAJOR_GENERAL
   * - LIEUTENANT_GENERAL
   * 
   * @readonly
   * @enum {string}
   * @type {Enum_Security_RankDeny}
  */
  const RANK_DENY = Object.freeze(
    Object.fromEntries(
      Object.entries(RANK)
        .filter(([key]) => key !== 'ALL') // filters out the 'ALL' key
        .map(([key, val]) => [key, `!${val}`]) // turns the rank enum into deny enum with "!" leading values
    )
  );

  /** 
   * @typedef {object} Enum_Security_Division
   * 
   * @property {string} ALL 
   * Will allow users of any division access.
   * - ⚠️ Conflicts with assignment to user ⚠️
   * - Compatable with assignment to element
   * 
   * @property {string} RESEARCH_AND_DEVELOPMENT
   * A division that can be given to a user or element for security.
   * - Compatable with assignment to user
   * - Compatable with assignment to element
   *
   * @property {string} BIOLOGICAL_RESEARCH
   * A division that can be given to a user or element for security.
   * - Compatable with assignment to user
   * - Compatable with assignment to element
   * 
   * @property {string} ENGINEERING_AND_LOGISTICS
   * A division that can be given to a user or element for security.
   * - Compatable with assignment to user
   * - Compatable with assignment to element
   * 
   * @property {string} ROBOTICS_AND_MANUFACTURING
   * A division that can be given to a user or element for security.
   * - Compatable with assignment to user
   * - Compatable with assignment to element
   * 
   * @property {string} SPECIAL_OPERATIONS_COMMAND
   * A division that can be given to a user or element for security.
   * - Compatable with assignment to user
   * - Compatable with assignment to element
   * 
   * @property {string} INTERNAL_SECURITY_OFFICE
   * A division that can be given to a user or element for security.
   * - Compatable with assignment to user
   * - Compatable with assignment to element
  */
  /**
   * **Documentation:** 
   * 
   * Security enum for division.
   * Used to determine how and if the page elements will display to the user.
   * 
   * - Global Variable
   * - **Version:** *PRE-ALPHA 1.02.02 (12/2/2025)*
   * - **File:** !!_CONFIG_!!.gs
   * - **Section:** SECURITY ENUM
   *
   * **Members:**
   * - ALL
   * - RESEARCH_AND_DEVELOPMENT
   * - BIOLOGICAL_RESEARCH
   * - ENGINEERING_AND_LOGISTICS
   * - ROBOTICS_AND_MANUFACTURING
   * - SPECIAL_OPERATIONS_COMMAND
   * - INTERNAL_SECURITY_OFFICE
   * 
   * @readonly
   * @enum {string}
   * @type {Enum_Security_Division}
  */
  const DIVISION = Object.freeze({
    ALL: "All",
    RESEARCH_AND_DEVELOPMENT: "Research and Development",
    BIOLOGICAL_RESEARCH: "Biological Research",
    ENGINEERING_AND_LOGISTICS: "Engineering and Logistics",
    ROBOTICS_AND_MANUFACTURING: "Robotics and Manufacturing",
    SPECIAL_OPERATIONS_COMMAND: "Special Operations Command",
    INTERNAL_SECURITY_OFFICE: "Internal Security Office",
  });

  /** 
   * @typedef {object} Enum_UI_DivisionAbbreviation
   * 
   * @property {string} ALL 
   * Will allow users of any division access.
   * - ⚠️ Conflicts with assignment to user ⚠️
   * - Compatable with assignment to element
   * 
   * @property {string} RESEARCH_AND_DEVELOPMENT
   * A division that can be given to a user or element for security.
   * - Compatable with assignment to user
   * - Compatable with assignment to element
   *
   * @property {string} BIOLOGICAL_RESEARCH
   * A division that can be given to a user or element for security.
   * - Compatable with assignment to user
   * - Compatable with assignment to element
   * 
   * @property {string} ENGINEERING_AND_LOGISTICS
   * A division that can be given to a user or element for security.
   * - Compatable with assignment to user
   * - Compatable with assignment to element
   * 
   * @property {string} ROBOTICS_AND_MANUFACTURING
   * A division that can be given to a user or element for security.
   * - Compatable with assignment to user
   * - Compatable with assignment to element
   * 
   * @property {string} SPECIAL_OPERATIONS_COMMAND
   * A division that can be given to a user or element for security.
   * - Compatable with assignment to user
   * - Compatable with assignment to element
   * 
   * @property {string} INTERNAL_SECURITY_OFFICE
   * A division that can be given to a user or element for security.
   * - Compatable with assignment to user
   * - Compatable with assignment to element
  */
  /**
   * **Documentation:** 
   * 
   * Display enum for division.
   * Used to translate a division enum into its abbreviated version.
   * 
   * - Global Variable
   * - **Version:** *PRE-ALPHA 1.02.02 (12/2/2025)*
   * - **File:** !!_CONFIG_!!.gs
   * - **Section:** SECURITY ENUM
   *
   * **Members:**
   * - ALL
   * - RESEARCH_AND_DEVELOPMENT
   * - BIOLOGICAL_RESEARCH
   * - ENGINEERING_AND_LOGISTICS
   * - ROBOTICS_AND_MANUFACTURING
   * - SPECIAL_OPERATIONS_COMMAND
   * - INTERNAL_SECURITY_OFFICE
   * 
   * @readonly
   * @enum {string}
   * @type {Enum_UI_DivisionAbbreviation}
  */
  const DIVISION_ABBREVIATION = Object.freeze({
    RESEARCH_AND_DEVELOPMENT: "R&D",
    BIOLOGICAL_RESEARCH: "BR",
    ENGINEERING_AND_LOGISTICS: "E&L",
    ROBOTICS_AND_MANUFACTURING: "R&M",
    SPECIAL_OPERATIONS_COMMAND: "SOCOM",
    INTERNAL_SECURITY_OFFICE: "ISO",
  });

  /** 
   * @typedef {object} Enum_UI_DivisionDeny
   * 
   * @property {string} RESEARCH_AND_DEVELOPMENT
   * A division that can be given to an element for security.
   * - ⚠️ Conflicts with assignment to user ⚠️
   * - Compatable with assignment to element
   *
   * @property {string} BIOLOGICAL_RESEARCH
   * A division that can be given to an element for security.
   * - ⚠️ Conflicts with assignment to user ⚠️
   * - Compatable with assignment to element
   * 
   * @property {string} ENGINEERING_AND_LOGISTICS
   * A division that can be given to an element for security.
   * - ⚠️ Conflicts with assignment to user ⚠️
   * - Compatable with assignment to element
   * 
   * @property {string} ROBOTICS_AND_MANUFACTURING
   * A division that can be given to an element for security.
   * - ⚠️ Conflicts with assignment to user ⚠️
   * - Compatable with assignment to element
   * 
   * @property {string} SPECIAL_OPERATIONS_COMMAND
   * A division that can be given to an element for security.
   * - ⚠️ Conflicts with assignment to user ⚠️
   * - Compatable with assignment to element
   * 
   * @property {string} INTERNAL_SECURITY_OFFICE
   * A division that can be given to an element for security.
   * - ⚠️ Conflicts with assignment to user ⚠️
   * - Compatable with assignment to element
  */
  /**
   * **Documentation:** 
   * 
   * Security enum for division.
   * Used to determine how and if the page elements will display to the user.
   * Will give the division but with a leading "!", indicating to deny users of the division.
   * 
   * - Global Variable
   * - **Version:** *PRE-ALPHA 1.02.02 (12/2/2025)*
   * - **File:** !!_CONFIG_!!.gs
   * - **Section:** SECURITY ENUM
   *
   * **Members:**
   * - ALL
   * - RESEARCH_AND_DEVELOPMENT
   * - BIOLOGICAL_RESEARCH
   * - ENGINEERING_AND_LOGISTICS
   * - ROBOTICS_AND_MANUFACTURING
   * - SPECIAL_OPERATIONS_COMMAND
   * - INTERNAL_SECURITY_OFFICE
   * 
   * @readonly
   * @enum {string}
   * @type {Enum_UI_DivisionDeny}
  */
  const DIVISION_DENY = Object.freeze(
    Object.fromEntries(
      Object.entries(DIVISION)
        .filter(([key]) => key !== 'ALL') // filters out the 'ALL' key
        .map(([key, val]) => [key, `!${val}`]) // turns the division enum into deny enum with "!" leading values
    )
  );

// ====================================================================
// UI ENUM
// ====================================================================
  /**
   * @typedef {object} Enum_UI_UIGroup
   * 
   * @property {string} HUB 
   * The main landing page for the webportal.
   * 
   * @property {string} WEBPORTAL_INFO
   * Where the webportal information is stored on how it is used.
   * 
   * @property {string} USER
   * Where the user can view their information and logout.
   * 
   * @property {string} JOIN_REQUEST
   * Where requests to join the group are filled out and submitted.
   * 
   * @property {string} JOIN_REQUEST_MANAGER
   * Where join requests can be viewed, accepted, or denied.
   * 
   * @property {string} DISCORD_LOGIN
   * Where the user can sign into discord.
   * 
   * @property {string} VERSION_HISTORY
   * Where the webapp version information and history is able to be viewed.
   * 
   * @property {string} ARCHIVES
   * Where the group archives are accessed.
   * 
   * @property {string} MEMBER_ARCHIVE
   * Where all the members in the group are viewed, and managed.
   * 
   * @property {string} LOGISTICS_ARCHIVE
   * Where the group logistics information is stored.
   * 
   * @property {string} GROUP_INFORMATION
   * Where the group information is accessed.
   * 
   * @property {string} GROUP_LORE
   * Where the lore of the group is able to be viewed.
   * 
   * @property {string} MAP
   * Where users can access the game map.
   * 
  */
  /**
   * UI enum for UI groups.
   * Used to request a UI group.
   * 
   * - Global Variable
   * - **Version:** *PRE-ALPHA 1.02.02 (12/2/2025)*
   * - **File:** !!_CONFIG_!!.gs
   * - **Section:** UI ENUM
   *
   * **Members:**
   * - HUB
   * - WEBPORTAL_INFO
   * - USER
   * - JOIN_REQUEST
   * - JOIN_REQUEST_MANAGER
   * - DISCORD_LOGIN
   * - VERSION_HISTORY
   * - ARCHIVES
   * - MEMBER_ARCHIVE
   * - LOGISTICS_ARCHIVE
   * - GROUP_INFORMATION
   * - GROUP_LORE
   * - MAP
   * 
   * @readonly
   * @enum {string}
   * @type {Enum_UI_UIGroup}
  */
  const UIGroup = Object.freeze({
    HUB: "hub",
    WEBPORTAL_INFO: "webportal_info",
    USER: "user",
    JOIN_REQUEST: "join_request",
    JOIN_REQUEST_MANAGER: "join_request_manager",
    DISCORD_LOGIN: "discord_login",
    VERSION_HISTORY: "version_history",
    ARCHIVES: "archives",
    MEMBER_ARCHIVE: "member_archive",
    LOGISTICS_ARCHIVE: "logistics_archive",
    GROUP_INFORMATION: "group_information",
    GROUP_LORE: "group_lore",
    MAP: "map",
  });

  /**
   * @typedef {object} Enum_UI_UIElementType
   * 
   * @property {string} RAW_HTML
   * An element to directly inject raw HTML content into the UI as a string.
   * 
   * @property {string} CONTAINER
   * A generic element used to group or hold other UI elements (e.g., a div).
   * 
   * @property {string} LINE
   * A simple horizontal line separator element
   * 
   * @property {string} SHEET_EMBED
   * A custom element for embedding content from a Google Sheet.
   * 
   * @property {string} CAROUSEL_EMBED
   * A custom element for displaying a rotating set of elements or images.
   * 
   * @property {string} BUTTON
   * A button element to trigger an action or event.
   * 
   * @property {string} HEADER
   * A text element used for titles or section headings.
   * 
   * @property {string} TEXT
   * A generic element for displaying blocks of plain or formatted text.
   * 
   * @property {string} INPUT
   * An element for user data entry.
   * 
   * @property {string} IMAGE
   * An element used to display a picture or graphic from a url.
  */
  /**
   * UI enum for client JS to use to format elements.
   *
   * - Global Variable
   * - **Version:** *PRE-ALPHA 1.02.02 (12/2/2025)*
   * - **File:** !!_CONFIG_!!.gs
   * - **Section:** UI ENUM
   *
   * **Members:**
   * - RAW_HTML
   * - CONTAINER
   * - LINE
   * - SHEET_EMBED
   * - CAROUSEL_EMBED
   * - BUTTON
   * - HEADER
   * - TEXT
   * - INPUT
   * - IMAGE
   *
   * @readonly
   * @enum {string}
   * @type {Enum_UI_UIElementType}
  */
  const UIElementType = Object.freeze({
    RAW_HTML: "raw_html",
    CONTAINER: "container",
    LINE: "line",
    SHEET_EMBED: "sheet_embed",
    CAROUSEL_EMBED: "carousel_embed",
    BUTTON: "button",
    HEADER: "header",
    TEXT: "text",
    INPUT: "input",
    IMAGE: "image",
  });

  /**
   * @typedef {object} Enum_UI_InputType
   * 
   * @property {string} TEXT_AREA
   * A large text box for the user.
   * 
   * @property {string} CHECKBOX
   * A simple check box for the user.
  */
  /**
   * UI enum for client JS to use to format input elements.
   *
   * - Global Variable
   * - **Version:** *PRE-ALPHA 1.02.02 (12/2/2025)*
   * - **File:** !!_CONFIG_!!.gs
   * - **Section:** UI ENUM
   *
   * **Members:**
   * - TEXT_AREA
   * - CHECKBOX
   *
   * @readonly
   * @enum {string}
   * @type {Enum_UI_InputType}
  */
  const InputType = Object.freeze({
    // TEXT: "text",
    TEXT_AREA: "text",
    CHECKBOX: "checkbox",
    // SEARCH: "search",
    // RADIO: "radio",
    // DATE: "date",
    // TIME: "time",
    // DATE_TIME: "date_time",
    // RANGE: "range",
  })

  /**
   * @typedef {object} Enum_UI_TextType
   * 
   * @property {string} P
   * Simple paragraph text.
   * 
   * @property {string} H1
   * Header text, as number increases, the font size decreases.
   * 
   * @property {string} H2
   * Header text, as number increases, the font size decreases.
   * 
   * @property {string} H3
   * Header text, as number increases, the font size decreases.
   * 
  */
  /**
   * UI enum for client JS to use to format text elements.
   *
   * - Global Variable
   * - **Version:** *PRE-ALPHA 1.02.02 (12/2/2025)*
   * - **File:** !!_CONFIG_!!.gs
   * - **Section:** UI ENUM
   *
   * **Members:**
   * - TEXT_AREA
   * - CHECKBOX
   *
   * @readonly
   * @enum {string}
   * @type {Enum_UI_TextType}
  */
  const TextType = Object.freeze({
    P: "p",
    H1: "h1",
    H2: "h2",
    H3: "h3",
  });

  /**
   * @typedef {object} Enum_UI_TextAlign
   * 
   * @property {string} CENTER
   * text center.
   * 
   * @property {string} LEFT
   * text left.
   * 
   * @property {string} RIGHT
   * text right.
   * 
  */
  /**
   * ⚠️**DEPRECATED**⚠️
   * - This enum will be removed in future versions 
   * 
   * UI enum for client JS to use to format text elements.
   *
   * - Global Variable
   * - **Version:** *PRE-ALPHA 1.02.02 (12/2/2025)*
   * - **File:** !!_CONFIG_!!.gs
   * - **Section:** UI ENUM
   *
   * **Members:**
   * - CENTER
   * - LEFT
   * - RIGHT
   *
   * @readonly
   * @enum {string}
   * @type {Enum_UI_TextAlign}
   * @deprecated
  */
  const TextAlign = Object.freeze({
    CENTER: "text-align: center;",
    LEFT: "text-align: left;",
    RIGHT: "text-align: right;",
  });

  /** 
   * @typedef {object} Enum_UI_ErrorType
   * @property {string} 401
   * Unauthorized.
   * 
   * @property {string} 403
   * Forbidden.
   * 
   * @property {string} 404
   * Not Found.
   * 
   * @property {string} 408
   * Request Timeout.
   * 
  */
  /**
   * ⚠️**DEPRECATED**⚠️
   * - This enum will be removed in future versions 
   * 
   * UI enum for client JS to display errors
   *
   * - Global Variable
   * - **Version:** *PRE-ALPHA 1.02.02 (12/2/2025)*
   * - **File:** !!_CONFIG_!!.gs
   * - **Section:** UI ENUM
   *
   * **Members:**
   * - 401
   * - 403
   * - 404
   * - 408
   *
   * @readonly
   * @enum {string}
   * @type {Enum_UI_ErrorType}
   * @deprecated
  */
  const ErrorType = Object.freeze({
    401: "Unauthorized",
    403: "Forbidden",
    404: "Not Found",
    408: "Request Timeout",
  });

// ====================================================================
// GOOGLE DOC CONFIG
// ====================================================================

  /**
   * ⚠️**DEPRECATED**⚠️
   * - This will be removed in future versions 
   * 
   * Group lore doc ID
   *
   * - Global Variable
   * - **Version:** *PRE-ALPHA 1.02.02 (12/2/2025)*
   * - **File:** !!_CONFIG_!!.gs
   * - **Section:** GOOGLE DOC CONFIG
   *
   * @readonly
   * @type {string}
   * @deprecated
  */
  const LORE_DOC_ID = "1BAB_6DITCoWlcID0AunO8qBzV0-Tt8-z8YD9GPZm3m4"

// ====================================================================
// GOOGLE SPREADSHEET CONFIG
// ====================================================================

  /**
   * The cache time to live for sheets in seconds.
   *
   * - Global Variable
   * - **Version:** *PRE-ALPHA 1.02.02 (12/2/2025)*
   * - **File:** !!_CONFIG_!!.gs
   * - **Section:** GOOGLE SPREADSHEET CONFIG
   *
   * @readonly
   * @type {number}
  */
  const SHEET_CACHE_TTL_S = min_to_sec(1); // value should be 10 min by default

  /**
   * The cache time to live for sheet ranges in seconds.
   *
   * - Global Variable
   * - **Version:** *PRE-ALPHA 1.02.02 (12/2/2025)*
   * - **File:** !!_CONFIG_!!.gs
   * - **Section:** GOOGLE SPREADSHEET CONFIG
   *
   * @readonly
   * @type {number}
  */
  const SHEET_RANGE_CACHE_TTL_S = min_to_sec(1);

  /**
   * @typedef {object} Enum_serviceAccountAPI_Spreadsheet_MemberType_Sheet
   * 
   * @property {string} id
   * The gid of the sheet.
   * 
   * @property {string} name
   * The name of the sheet.
   * 
   * @property {Security_Access} Access
   * The security needed to access the sheet.
   * 
  */
  /**
   * @typedef {object} Enum_serviceAccountAPI_Spreadsheet_MemberType_SpreadSheet
   * 
   * @property {string} id
   * The id of the spreadsheet.
   * 
   * @property {string} name
   * The name of the spreadsheet.
   * 
   * @property {Security_Access} Access
   * The security needed to access the spreadsheet.
   * 
   * @property {Object.<string, Enum_serviceAccountAPI_Spreadsheet_MemberType_Sheet>} Sheet
   * The sheets contained in this spreadsheet.
  */
  /**
   * @typedef {object} Enum_serviceAccountAPI_Spreadsheet
   * 
   * @property {Enum_serviceAccountAPI_Spreadsheet_MemberType_SpreadSheet} UserData
   * A spreadsheet containing all of the user data for the site
   * 
   * **Sheets:**
   * - Member_Archive
   * - Admin_Archive
   * - Join_Request
   * 
   * @property {Enum_serviceAccountAPI_Spreadsheet_MemberType_SpreadSheet} Archives
   * A spreadsheet containing all of the archives for the site
   * 
   * **Sheets:**
   * - Logistics
   * 
  */
  /**
   * A complex nested enum that stores all the hardcoded avalible spreadsheet information the webapp has access to, including the information of the sheets they store.
   *
   * - Global Variable
   * - **Version:** *PRE-ALPHA 1.02.02 (12/2/2025)*
   * - **File:** !!_CONFIG_!!.gs
   * - **Section:** GOOGLE SPREADSHEET CONFIG
   *
   * **Example:** Spreadsheet.(spreadsheetName).Sheet.(sheetName);
   * 
   * **Member types:**
   * 
   * - **MemberType:** Spreadsheet
   * - - id {string}
   * - - name {string}
   * - - Access {Security_Access}
   * - - Sheet {Object.<string, MemberType_Sheet>}
   * 
   * - **MemberType:** Sheet
   * - - name {string}
   * - - Access {Security_Access}
   * 
   * **Members:**
   * 
   * - UserData {MemberType_Spreadsheet}
   * - - Member_Archive {MemberType_Sheet}
   * - - Admin_Archive {MemberType_Sheet}
   * - - Join_Request {MemberType_Sheet}
   * 
   * - Archives {MemberType_Spreadsheet}
   * - - Logistics {MemberType_Sheet}
   * 
   * @readonly
   * @enum {enum}
   * @type {Enum_serviceAccountAPI_Spreadsheet}
  */
  const Spreadsheet = Object.freeze({

    UserData:  Object.freeze({
      id: "REMOVED FOR GITHUB",
      name: "REMOVED FOR GITHUB",
      Access:  Object.freeze({ permission: PERMISSION.ALL, rankList:[ RANK.ALL ], divisionList:[ DIVISION.ALL ] }),
      Sheet: Object.freeze({
        Member_Archive: Object.freeze({ id: "REMOVED FOR GITHUB", name: "REMOVED FOR GITHUB", Access: { permission: PERMISSION.ALL, rankList:[ RANK.ALL ], divisionList:[ DIVISION.ALL ] } }),
        Admin_Archive: Object.freeze({ id: "REMOVED FOR GITHUB", name: "REMOVED FOR GITHUB", Access: { permission: PERMISSION.ADMIN, rankList:[ RANK.ALL ], divisionList:[ DIVISION.ALL ] } }),
        Join_Request: Object.freeze({ id: "REMOVED FOR GITHUB", name: "REMOVED FOR GITHUB", Access: { permission: PERMISSION.USER, rankList:[ RANK.ALL ], divisionList:[ DIVISION.ALL ] } }),
      })
    }),

    Archives: Object.freeze({
      id: "REMOVED FOR GITHUB",
      name: "REMOVED FOR GITHUB",
      Access: Object.freeze({ permission: PERMISSION.ALL, rankList:[ RANK.ALL ], divisionList:[ DIVISION.ALL ] }),
      Sheet: Object.freeze({
        Logistics: Object.freeze({ id: "REMOVED FOR GITHUB", name: "REMOVED FOR GITHUB", Access: { permission: PERMISSION.USER, rankList:[ RANK.ALL ], divisionList:[ DIVISION.RESEARCH_AND_DEVELOPMENT ] } }),
      })
    })

  });
