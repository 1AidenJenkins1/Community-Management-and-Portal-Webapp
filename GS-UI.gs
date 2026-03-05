/* GS-UI.gs */

// ====================================================================
// UI
// ====================================================================

/** 
 * @typedef {object} Args_UI_createErrorElement
 * 
 * @property {Enum_UI_ErrorType} type
 * The error type.
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
 * ⚠️**DEPRECATED**⚠️
 * - This function will be removed in future versions 
 * 
 * Checks if value is an instance of the given enum
 * - **Version:** *PRE-ALPHA 1.02.02 (12/2/2025)*
 * - **File:** GS-UI.gs
 * - **Section:** UI
 * 
 * @param {Args_UI_createErrorElement} Args 
 * The config arguments for the create error element function
 * 
 * @return {boolean} An error element object
 * @deprecated
*/
function createErrorElement(Args = {}) {
  const {
    type,
    permission,
    rankList = RANK.ALL,
    divisionList = DIVISION.ALL,
  } = Args;
  switch (type) {
    case ErrorType[401]:
      return {
        type: UIElementType.TEXT,
        textType: TextType.P,
        id: "error-message-401",
        content: "ERROR 401: request requires user authentication. The client must authenticate itself to get the requested response, reload to return to homepage.",
        Access: {
          permission: permission || PERMISSION.GUEST,
          rankList: rankList,
          divisionList: divisionList,
        },
      };
    break;
    case ErrorType[403]:
      return {
        type: UIElementType.TEXT,
        textType: TextType.P,
        id: "error-message-403",
        content: "ERROR 403: server understood the request but refuses to authorize it, client does not have the necessary permissions to access the resource, reload to return to homepage.",
        Access: {
          permission: permission || PERMISSION.USER,
          rankList: rankList,
          divisionList: divisionList,
        },
      };
    break;
    case ErrorType[404]:
      return {
        type: UIElementType.TEXT,
        textType: TextType.P,
        id: "error-message-404",
        content: "ERROR 404: File not found, server cannot find the requested resource, reload to return to homepage.",
        Access: {
          permission: permission || PERMISSION.ALL,
          rankList: rankList,
          divisionList: divisionList,
        },
      };
    break;
    case ErrorType[408]:
      return {
        type: UIElementType.TEXT,
        textType: TextType.P,
        id: "error-message-408",
        content: "ERROR 408: server timed out waiting for the request. The client did not produce a request within the time that the server was prepared to wait, reload to return to homepage.",
        Access: {
          permission: permission || PERMISSION.ALL,
          rankList: rankList,
          divisionList: divisionList,
        },
      };
    break;
  }
}


/* 
  i want to use something like this 
  but the code is much more bulky if you want it readable 
  or the code is unreadable if you want it to be less bulky
  making it pointless compared to what i have now.
  i will have to come back when i have new ideas for a better way to format the html serverside (without using html files).

  set up JSDOC for this
  function createUIElement(type, Properties = {}, Access = {}) {
    const DefaultAccess = {
      permission: PERMISSION.NONE,
      rankList: [ RANK.ALL ],
      divisionList: [ DIVISION.ALL ]
    }

    if (!instanceOfEnum(UIElementType, type)) {
      throw new Error(
        `\n` + 
        `(UI) Cannot create UI element;` + `\n` +
        `type (${type}) is not an instance of the UIElementType enum;` 
      );
    }

    // use validateAccessInstance once it is done to ensure anything passed is valid

    const UIElement = {
      type: type,
      ...Args.Properties,
      Access: Access,
    }

    return UIElement;
  }
*/

/**
 * retrives security filtered UI elements.
 * - **Version:** *PRE-ALPHA 1.02.02 (12/2/2025)*
 * - **File:** GS-UI.gs
 * - **Section:** UI
 * 
 * @param {Enum_UI_UIGroup} uiGroup 
 * The UI group to request
 * 
 * @return {Array<object>} The filtered UI elements.
*/
function requestUI(uiGroup) {
  let UIElements = [];
  switch (uiGroup) {
    // ***************************************************************************************************
    case UIGroup.HUB:
      UIElements = 
      [
        // R&D section
        { 
          type: UIElementType.BUTTON, id: "archives", label: "ARCHIVES", description: "View group archives", 
          Access: { permission: PERMISSION.USER, rankList:[ RANK.ALL ], divisionList:[ DIVISION.ALL ] }, 
          onClick: () => { 
            setMenuUI(UIGroup.ARCHIVES);
          }, 
        },
        // map
        { 
          type: UIElementType.BUTTON, id: "map", label: "MAP", description: "Access regional navigation", 
          Access: { permission: PERMISSION.USER, rankList:[ RANK.ALL ], divisionList:[ DIVISION.RESEARCH_AND_DEVELOPMENT ] },
          onClick: () => { 
            setMenuUI(UIGroup.MAP);
          },
        },
        // events discord menu stuff
        { 
          type: UIElementType.BUTTON, id: "events", label: "EVENTS", description: "See current events", 
          Access: { permission: PERMISSION.NONE, rankList:[ RANK.ALL ], divisionList:[ DIVISION.ALL ] },
          onClick: () => { 
            setMenuUI();
          },
        },
        // member archive
        { 
          type: UIElementType.BUTTON, id: "member-archive", label: "MEMBER ARCHIVE", description: "View member archive", 
          Access: { permission: PERMISSION.ALL, rankList:[ RANK.ALL ], divisionList:[ DIVISION.ALL ] },
          onClick: () => { 
            setMenuUI(UIGroup.MEMBER_ARCHIVE);
          },
        },
        // join request manager
        { 
          type: UIElementType.BUTTON, id: "join-request-manager", label: "JOIN REQUEST MANAGER", description: "Accept and deny join requests", 
          Access: { permission: PERMISSION.USER, rankList:[ RANK.ALL ], divisionList:[ DIVISION.ALL ] },
          onClick: () => { 
            setMenuUI(UIGroup.JOIN_REQUEST_MANAGER);
          },
        },
        // information button
        { 
          type: UIElementType.BUTTON, id: "information", label: "INFORMATION", description: "Access group and webportal information", 
          Access: { permission: PERMISSION.ALL, rankList:[ RANK.ALL ], divisionList:[ DIVISION.ALL ] },
          onClick: () => { 
            setMenuUI(UIGroup.GROUP_INFORMATION);
          },
        },
        // join request button
        { 
          type: UIElementType.BUTTON, id: "join-request", label: "CREATE JOIN REQUEST", description: "Become USPA member", 
          Access: { permission: PERMISSION.GUEST, rankList:[ RANK.ALL ], divisionList:[ DIVISION.ALL ] },
          onClick: () => { 
            setMenuUI(UIGroup.JOIN_REQUEST);
          },
        },
        // login to discord
        { 
          type: UIElementType.BUTTON, id: "discord-login", label: "LOGIN", description: "Link discord account", 
          Access: { permission: PERMISSION.GUEST, rankList:[ RANK.ALL ], divisionList:[ DIVISION.ALL ] },
          onClick: () => { 
            setMenuUI(UIGroup.DISCORD_LOGIN);
          },
        },
        // user info 
        { 
          type: UIElementType.BUTTON, id: "user-view", label: "USER", description: "View account informtion", 
          Access: { permission: PERMISSION.USER, rankList:[ RANK.ALL ], divisionList:[ DIVISION.ALL ] },
          onClick: () => { 
            setMenuUI(UIGroup.USER);
          },
        },
        // settings button - will do later
        { 
          type: UIElementType.BUTTON, id: "settings", label: "SETTINGS", description: "System configuration", 
          Access: { permission: PERMISSION.NONE, rankList:[ RANK.ALL ], divisionList:[ DIVISION.ALL ] },
          onClick: () => { 
            setMenuUI();
          },
        },
        // version history button for site so people can see the updates and changes
        { 
          type: UIElementType.BUTTON, id: "version-history", label: "VERSION HISTORY", description: "Version history and credits", 
          Access: { permission: PERMISSION.ALL, rankList:[ RANK.ALL ], divisionList:[ DIVISION.ALL ] },
          onClick: () => { 
            setMenuUI(UIGroup.VERSION_HISTORY);
          },
        },
        // privacy policy link button
        { 
          type: UIElementType.BUTTON, id: "privacy-policy", label: "PRIVACY POLICY", description: "Link to the webportal privacy policy", 
          Access: { permission: PERMISSION.ALL, rankList:[ RANK.ALL ], divisionList:[ DIVISION.ALL ] },
          onClick: () => { 
            window.open('https://docs.google.com/document/d/1yCVY0hXhuB6vJVKAWnVKYnGhOxgaFzyeepYLLBQHwLw/edit?usp=sharing', '_blank');
          },
        },
        
      ];
    break;
    // ***************************************************************************************************
    case UIGroup.WEBPORTAL_INFO:
      UIElements = 
      [
        { 
          type: UIElementType.HEADER, id: "webportal-information-header",
          Access: { permission: PERMISSION.ALL, rankList:[ RANK.ALL ], divisionList:[ DIVISION.ALL ] }, 
          content: "WEBPORTAL INFORMATION", 
        },
        {
          type: UIElementType.CONTAINER, id:"webportal-information-textBox", className:"textBox",
          Access: { permission: PERMISSION.ALL, rankList:[ RANK.ALL ], divisionList:[ DIVISION.ALL ] } ,
          content: [
            { 
              type: UIElementType.TEXT, textType:TextType.P, id: "webportal-information-text",  
              Access: { permission: PERMISSION.ALL, rankList:[ RANK.ALL ], divisionList:[ DIVISION.ALL ] },
              content: `
                The USPA Web Portal is a management tool designed for the USPA faction within the Roblox game Wasteland Blues. 
                This application integrates with Google Sheets to streamline administrative tasks for faction leaders and members.
                
                Key Features:
                Member Directory: Displays real-time status and information directly from our faction's Google Sheets.
                Join Requests: Allows prospective members to submit applications that are automatically stored and organized in a secure Google Sheet.
                Administrative Approval: Enables faction leaders to review, accept, or decline pending requests directly through the portal, updating the source Google Sheet instantly.
                This portal ensures that our community data stays accurate and accessible only to authorized members."
              `,
            },
          ]
        },
        { 
          type: UIElementType.BUTTON, id: "back", label: "BACK", description: "Back to previous menu", 
          Access: { permission: PERMISSION.ALL, rankList:[ RANK.ALL ], divisionList:[ DIVISION.ALL ] },
          onClick: () => {
            setMenuUI(UIGroup.GROUP_INFORMATION);
          }, 
        },
      ];
    break;
    // ***************************************************************************************************
    case UIGroup.USER:
      const UserData = getUserData();
      UIElements = 
      [
        ...createUserProfileUI({ UserData }),
        { 
          type: UIElementType.TEXT, textType:TextType.H3, id: "join-request-user-id-text",  
          Access: { permission: PERMISSION.USER, rankList:[ RANK.ALL ], divisionList:[ DIVISION.ALL ] },
          content: `RANK: ${UserData.rankList[0]}`,
        },
        { 
          type: UIElementType.TEXT, textType:TextType.H3, id: "join-request-user-id-text",  
          Access: { permission: PERMISSION.USER, rankList:[ RANK.ALL ], divisionList:[ DIVISION.ALL ] },
          content: `DIVISION: ${UserData.divisionList[0]}`,
        },
        // logout of discord
        { 
          type: UIElementType.BUTTON, id: "discord-logout", label: "LOGOUT", description: "Log out of your discord account", 
          Access: { permission: PERMISSION.USER, rankList:[ RANK.ALL ], divisionList:[ DIVISION.ALL ] },
          onClick: () => {
            if (!confirm("Are you sure you want to log out of your account?\nThis action cannot be undone without logging back in.")) {
              return;
            }
            console.log("TEST LOG OUT");
            menuContainer.innerHTML = "";
            bootMessage.add({ bootMessage: ["INITIALIZING USER LOGOUT..."] });
            google.script.run
            .withFailureHandler(() => {
              bootMessage.add({ 
                bootMessage: ["USER LOGOUT FAILURE.", "EMERGENCY FALLBACK INITIALIZING...", "RETURNING TO HUB..."], 
                withSuccessHandler: () => {
                  bootMessage.clear();
                  setMenuUI(UIGroup.HUB);
                } 
              });
            })
            .withSuccessHandler(() => {
              bootMessage.add({ 
                bootMessage: ["USER LOGOUT SUCCESSFUL.", "OPENING HUB..."], 
                withSuccessHandler: () => {
                  bootMessage.clear();
                  pageStartUp();
                } 
              });
            })
            .resetDiscordAuth(); // wipes discord login info   
          },
        },
        { 
          type: UIElementType.BUTTON, id: "back", label: "BACK", description: "Back to previous menu", 
          Access: { permission: PERMISSION.ALL, rankList:[ RANK.ALL ], divisionList:[ DIVISION.ALL ] },
          onClick: () => {
            setMenuUI(UIGroup.HUB);
          },
        },
      ]
    break;
    // ***************************************************************************************************
    case UIGroup.JOIN_REQUEST:
      UIElements = 
      [
        ...((!checkAccess()) ? // check if site has user Discord login info
          [ // if site does not have Discord login info direct to Discord login
            { 
              type: UIElementType.HEADER, id: "discord-login-header",
              Access: { permission: PERMISSION.GUEST, rankList:[ RANK.ALL ], divisionList:[ DIVISION.ALL ] }, 
              content: "DISCORD LOGIN REQUIRED FOR JOIN REQUEST", 
            },
            { 
              type: UIElementType.BUTTON, id: "discord-login", label: "LOGIN", description: "Continue to discord login", 
              Access: { permission: PERMISSION.GUEST, rankList:[ RANK.ALL ], divisionList:[ DIVISION.ALL ] },
              onClick: () => {
                setMenuUI(UIGroup.DISCORD_LOGIN);
              }, 
            },
            { 
              type: UIElementType.BUTTON, id: "cancel", label: "CANCEL JOIN REQUEST", description: "Cancel request and return to hub", 
              Access: { permission: PERMISSION.GUEST, rankList:[ RANK.ALL ], divisionList:[ DIVISION.ALL ] },
              onClick: () => { 
                setMenuUI(UIGroup.HUB);
              },
            }
          ] 
          : 
          [
            ...((false) ? // check if site has user Roblox login info (NOT SET UP YET) (FALSE TO SKIP)
              [ // if site does not have Roblox login info direct to roblox login 
                { 
                  type: UIElementType.HEADER, id: "rover-login-header",  
                  Access: { permission: PERMISSION.GUEST, rankList:[ RANK.ALL ], divisionList:[ DIVISION.ALL ] },
                  content: "ROBLOX LOGIN REQUIRED FOR JOIN REQUEST",
                },
              ] 
              : 
              [
                ...((
                  // check if user has already filled join request  
                  // request join request google sheet data then check if it contains the users discord id
                  SheetServiceAPI.requestData({
                    spreadsheetId: Spreadsheet.UserData.id, 
                    sheetName: Spreadsheet.UserData.Sheet.Join_Request.name,
                    range: "B2:B"
                  }).includes(fetchDiscordUser_().id)
                ) ? 
                  [ // if user is in join request sheet let them know the form has been filled and to wait
                    { 
                      type: UIElementType.TEXT, textType:TextType.H1, id: "join-request-success-header",  
                      Access: { permission: PERMISSION.GUEST, rankList:[ RANK.ALL ], divisionList:[ DIVISION.ALL ] },
                      content: "SUCCESS!",
                    },
                    { 
                      type: UIElementType.TEXT, textType:TextType.P, id: "join-request-success-text",  
                      Access: { permission: PERMISSION.GUEST, rankList:[ RANK.ALL ], divisionList:[ DIVISION.ALL ] },
                      content: `
                        Your join request is in our system 
                        Please wait for staff to make a decision
                      `,
                    },
                    { 
                      type: UIElementType.BUTTON, id: "back", label: "BACK", description: "Back to hub page", 
                      Access: { permission: PERMISSION.GUEST, rankList:[ RANK.ALL ], divisionList:[ DIVISION.ALL ] },
                      onClick: () => {
                        setMenuUI(UIGroup.HUB);
                      }, 
                    },
                  ]
                  :
                  [ // if user is not in join request sheet allow to create join request
                    { 
                      type: UIElementType.TEXT, textType:TextType.H3, id: "join-request-text",  
                      Access: { permission: PERMISSION.GUEST, rankList:[ RANK.ALL ], divisionList:[ DIVISION.ALL ] },
                      content: "Create a join request for the USPA",
                    },
                    { 
                      type: UIElementType.TEXT, textType:TextType.P, id: "join-request-text",  
                      Access: { permission: PERMISSION.GUEST, rankList:[ RANK.ALL ], divisionList:[ DIVISION.ALL ] },
                      content: `
                      Your join request will be sent to **USPA** staff and will include information such as 
                      your **discord username**, **discord id**, and **roblox username** for user validation purposes 
                      `,
                    },
                    { 
                      type: UIElementType.TEXT, textType:TextType.P, id: "join-request-text",  
                      Access: { permission: PERMISSION.GUEST, rankList:[ RANK.ALL ], divisionList:[ DIVISION.ALL ] },
                      content: `
                        Please answer all questions below to complete your join request.
                      `,
                    },
                    { 
                      type: UIElementType.LINE,  
                      Access: { permission: PERMISSION.GUEST, rankList:[ RANK.ALL ], divisionList:[ DIVISION.ALL ] },
                    },
                    { 
                      type: UIElementType.TEXT, textType:TextType.H3, id: "join-request-text",  
                      Access: { permission: PERMISSION.GUEST, rankList:[ RANK.ALL ], divisionList:[ DIVISION.ALL ] },
                      content: `
                        What is the United States Provisional Authority?
                      `,
                    },
                    { 
                      type: UIElementType.INPUT, inputType: InputType.TEXT_AREA, id: "textInput-Q1-what-is-uspa", 
                      Access: { permission: PERMISSION.GUEST, rankList:[ RANK.ALL ], divisionList:[ DIVISION.ALL ] },
                      placeholder:"Response here...",
                    },
                    { 
                      type: UIElementType.TEXT, textType:TextType.H3, id: "join-request-text",  
                      Access: { permission: PERMISSION.GUEST, rankList:[ RANK.ALL ], divisionList:[ DIVISION.ALL ] },
                      content: `
                        How long have you been in Wasteland Blues?
                      `,
                    },
                    { 
                      type: UIElementType.INPUT, inputType: InputType.TEXT_AREA, id: "textInput-Q2-how-long-wasteland-blues", 
                      Access: { permission: PERMISSION.GUEST, rankList:[ RANK.ALL ], divisionList:[ DIVISION.ALL ] },
                      placeholder:"Response here...",
                    },
                    { 
                      type: UIElementType.TEXT, textType:TextType.H3, id: "join-request-text",  
                      Access: { permission: PERMISSION.GUEST, rankList:[ RANK.ALL ], divisionList:[ DIVISION.ALL ] },
                      content: `
                        How where you introduced to the United States Provisional Authority?
                      `,
                    },
                    { 
                      type: UIElementType.INPUT, inputType: InputType.TEXT_AREA, id: "textInput-Q3-how-introduced-uspa",
                      Access: { permission: PERMISSION.GUEST, rankList:[ RANK.ALL ], divisionList:[ DIVISION.ALL ] },
                      placeholder:"Response here...", 
                      // text that may be used when mention is done: 
                      // , If you were recruited by a member use @username (discord or roblox) to mention/ping the user who recruited you
                    },
                    { 
                      type: UIElementType.TEXT, textType:TextType.H3, id: "join-request-text",  
                      Access: { permission: PERMISSION.GUEST, rankList:[ RANK.ALL ], divisionList:[ DIVISION.ALL ] },
                      content: `
                        Do you have any experience you have in the wasteland genre?
                      `,
                    },
                    { 
                      type: UIElementType.INPUT, inputType: InputType.TEXT_AREA, id: "textInput-Q4-wasteland-experience", 
                      Access: { permission: PERMISSION.GUEST, rankList:[ RANK.ALL ], divisionList:[ DIVISION.ALL ] },
                      placeholder:"Response here...",
                    },
                    { 
                      type: UIElementType.TEXT, textType:TextType.H3, id: "join-request-text",  
                      Access: { permission: PERMISSION.GUEST, rankList:[ RANK.ALL ], divisionList:[ DIVISION.ALL ] },
                      content: `
                        Your application may be denied due to any reason seen fit by reviewers.
                      `,
                    },
                    {
                      type: UIElementType.INPUT, inputType: InputType.CHECKBOX, id: "checkboxInput-Q5-understood",
                      Access: { permission: PERMISSION.GUEST, rankList:[ RANK.ALL ], divisionList:[ DIVISION.ALL ] },
                      label: "Understood",
                    },
                    { 
                      type: UIElementType.TEXT, textType:TextType.H3, id: "join-request-text",  
                      Access: { permission: PERMISSION.GUEST, rankList:[ RANK.ALL ], divisionList:[ DIVISION.ALL ] },
                      content: `
                      You are fully aware of all the regulations and you are actively willing to abide by them.
                      `,
                    },
                    {
                      type: UIElementType.INPUT, inputType: InputType.CHECKBOX, id: "checkboxInput-Q6-yes",
                      Access: { permission: PERMISSION.GUEST, rankList:[ RANK.ALL ], divisionList:[ DIVISION.ALL ] },
                      label: "Yes",
                    },
                    { 
                      type: UIElementType.LINE,  
                      Access: { permission: PERMISSION.GUEST, rankList:[ RANK.ALL ], divisionList:[ DIVISION.ALL ] },
                    },
                    { 
                      type: UIElementType.BUTTON, id: "submit", label: "SUBMIT", description: "Submit join arequest", 
                      Access: { permission: PERMISSION.GUEST, rankList:[ RANK.ALL ], divisionList:[ DIVISION.ALL ] },
                      onClick: () => {

                        const Q1_Response = getInputById("textInput-Q1-what-is-uspa");
                        const Q2_Response = getInputById("textInput-Q2-how-long-wasteland-blues");
                        const Q3_Response = getInputById("textInput-Q3-how-introduced-uspa");
                        const Q4_Response = getInputById("textInput-Q4-wasteland-experience");
                        const Q5_Response = getInputById("checkboxInput-Q5-understood-checkbox");
                        const Q6_Response = getInputById("checkboxInput-Q6-yes-checkbox");
                        // ensure all sections filled
                        if (
                          Q1_Response == null || 
                          Q2_Response == null || 
                          Q3_Response == null || 
                          Q4_Response == null || 
                          Q5_Response == false ||
                          Q6_Response == false
                        ) {
                          bootMessage.clear();
                          bootMessage.add({ 
                            bootMessage: [
                              "YOU MUST FILL OUT ALL SECTIONS TO CONTINUE", 
                              `Q1: ${(Q1_Response == null) ? "NO ANSWER": "FILLED"}`, 
                              `Q2: ${(Q2_Response == null) ? "NO ANSWER": "FILLED"}`, 
                              `Q3: ${(Q3_Response == null) ? "NO ANSWER": "FILLED"}`, 
                              `Q4: ${(Q4_Response == null) ? "NO ANSWER": "FILLED"}`,
                              `Q5: ${(Q5_Response == false) ? "NO ANSWER": "FILLED"}`,
                              `Q6: ${(Q6_Response == false) ? "NO ANSWER": "FILLED"}`,
                            ]
                          })
                        } else {
                          bootMessage.clear();
                          // send to sheet
                          google.script.run
                            .withSuccessHandler(() => {
                              setMenuUI(UIGroup.JOIN_REQUEST);
                            })
                            .withFailureHandler((e) => {
                              bootMessage.add({ bootMessage: ["JOIN REQUEST SUBMISSION FAILED", `ERROR:${e}`] })
                            })
                            .createJoinRequest({ Q1_Response, Q2_Response, Q3_Response, Q4_Response })
                        };
                      }, 
                    },
                    { 
                      type: UIElementType.BUTTON, id: "back", label: "BACK", description: "Back to previous menu", 
                      Access: { permission: PERMISSION.GUEST, rankList:[ RANK.ALL ], divisionList:[ DIVISION.ALL ] },
                      onClick: () => {
                        bootMessage.clear();
                        setMenuUI(UIGroup.HUB);
                      }, 
                    },
                  ] 
                ),
              ]
            )
          ]
        )
      ];
    break;
    // ***************************************************************************************************
    case UIGroup.JOIN_REQUEST_MANAGER:
      UIElements = [
        { 
          type: UIElementType.HEADER, id: "join-request-manager-header",  
          Access: { permission: PERMISSION.ALL, rankList:[ RANK.ALL ], divisionList:[ DIVISION.ALL ] },
          content: "Join request manager",
        },
        ...getjoinRequestManagerCarouselUI(),
        { 
          type: UIElementType.BUTTON, id: "back", label: "BACK", description: "Back to previous menu", 
          Access: { permission: PERMISSION.ALL, rankList:[ RANK.ALL ], divisionList:[ DIVISION.ALL ] },
          onClick: () => {
            setMenuUI(UIGroup.HUB);
          },
        },
      ];
    break;
    // ***************************************************************************************************
    case UIGroup.DISCORD_LOGIN:
      UIElements = 
      [
        ...((!checkAccess()) ? // check if site has user discord login info
          [
            { 
              type: UIElementType.HEADER, id: "discord-login-header",
              Access: { permission: PERMISSION.GUEST, rankList:[ RANK.ALL ], divisionList:[ DIVISION.ALL ] }, 
              content: "PLEASE LINK DISCORD", 
            },
            { 
              type: UIElementType.TEXT, textType:TextType.H3, id: "discord-login-text",  
              Access: { permission: PERMISSION.GUEST, rankList:[ RANK.ALL ], divisionList:[ DIVISION.ALL ] },
              content: "Discord account linking is powered by the Oauth2 API system for secure authorization.",
            },
            { 
              type: UIElementType.BUTTON, id: "discord-login", label: "SIGN IN WITH DISCORD", description: "Authorize with your Discord account", 
              Access: { permission: PERMISSION.GUEST, rankList:[ RANK.ALL ], divisionList:[ DIVISION.ALL ] },
              onClick: () => {
                discordloginPopup();
              }, 
            },
            { 
              type: UIElementType.BUTTON, id: "cancel", label: "CANCEL LOGIN", description: "Cancel discord login and return to hub", 
              Access: { permission: PERMISSION.GUEST, rankList:[ RANK.ALL ], divisionList:[ DIVISION.ALL ] },
              onClick: () => { 
                setMenuUI(UIGroup.HUB);
              },
            }
           ] 
           : 
           [
            {
              type: UIElementType.TEXT, textType: TextType.P, id: "message",
              Access: { permission: PERMISSION.USER, rankList:[ RANK.ALL ], divisionList:[ DIVISION.ALL ] },
              content: "User is logged into discord",
            },
            { 
              type: UIElementType.BUTTON, id: "back_to_hub", label: "BACK TO HUB", description: "return to hub page", 
              Access: { permission: PERMISSION.USER, rankList:[ RANK.ALL ], divisionList:[ DIVISION.ALL ] },
              onClick: () => { 
                setMenuUI(UIGroup.HUB);
              },
            },
           ] 
        ),
        
      ];
    break;
    // ***************************************************************************************************
    case UIGroup.ARCHIVES:
      UIElements = 
      [
        { 
          type: UIElementType.HEADER, id: "archive-header", content: "ARCHIVES", 
          Access: { permission: PERMISSION.USER, rankList:[ RANK.ALL ], divisionList:[ DIVISION.RESEARCH_AND_DEVELOPMENT ] }
        },
        { 
          type: UIElementType.BUTTON, id: "resource", label: "RESOURCE", description: "View resource archive", 
          Access: { permission: PERMISSION.USER, rankList:[ RANK.ALL ], divisionList:[ DIVISION.RESEARCH_AND_DEVELOPMENT ] },
          onClick: () => {
            setMenuUI(UIGroup.LOGISTICS_ARCHIVE);
          }, 
        },
        { 
          type: UIElementType.BUTTON, id: "weapon", label: "WEAPON", description: "View weapon archive", 
          Access: { permission: PERMISSION.NONE, rankList:[ RANK.ALL ], divisionList:[ DIVISION.RESEARCH_AND_DEVELOPMENT ] },
          onClick: () => { 
            setMenuUI();
          },
        },
        { type: UIElementType.BUTTON, id: "medical", label: "MEDICAL", description: "View weapon archive", 
          Access: { permission: PERMISSION.NONE, rankList:[ RANK.ALL ], divisionList:[ DIVISION.RESEARCH_AND_DEVELOPMENT ] },
          onClick: () => { 
            setMenuUI();
          },
        },
        { 
          type: UIElementType.BUTTON, id: "robotics", label: "ROBOTICS", description: "View robotics archive", 
          Access: { permission: PERMISSION.NONE, rankList:[ RANK.ALL ], divisionList:[ DIVISION.RESEARCH_AND_DEVELOPMENT ] },
          onClick: () => { 
            setMenuUI();
          },
        },
        { 
          type: UIElementType.BUTTON, id: "biological", label: "BIOLOGICAL", description: "View biological archive", 
          Access: { permission: PERMISSION.NONE, rankList:[ RANK.ALL ], divisionList:[ DIVISION.RESEARCH_AND_DEVELOPMENT ] },
          onClick: () => { 
            setMenuUI();
          },
        },
        { 
          type: UIElementType.BUTTON, id: "back", label: "BACK", description: "Back to previous menu", 
          Access: { permission: PERMISSION.USER, rankList:[ RANK.ALL ], divisionList:[ DIVISION.RESEARCH_AND_DEVELOPMENT ] },
          onClick: () => {
            setMenuUI(UIGroup.HUB);
          }, 
        },
        createErrorElement({ type: ErrorType[403], divisionList: [ DIVISION.ALL, DIVISION_DENY.RESEARCH_AND_DEVELOPMENT ]}),
        createErrorElement({ type: ErrorType[401] }),
      ];
    break;
    // ***************************************************************************************************
    case UIGroup.LOGISTICS_ARCHIVE:
      UIElements = 
      [
        { 
          type: UIElementType.HEADER, id: "logistics-header", content: "LOGISTICS ARCHIVE", 
          Access: { permission: PERMISSION.USER, rankList:[ RANK.ALL ], divisionList:[ DIVISION.RESEARCH_AND_DEVELOPMENT ] }
        },
        { 
          type: UIElementType.SHEET_EMBED, 
          Access: { permission: PERMISSION.USER, rankList:[ RANK.ALL ], divisionList:[ DIVISION.RESEARCH_AND_DEVELOPMENT ] }, // sheets are security filtered but this is backup
          spreadsheetId: Spreadsheet.Archives.id,
          sheetName: Spreadsheet.Archives.Sheet.Logistics.name,
        },
        { 
          type: UIElementType.BUTTON, id: "back", label: "BACK", description: "Back to previous menu", 
          Access: { permission: PERMISSION.USER, rankList:[ RANK.ALL ], divisionList:[ DIVISION.RESEARCH_AND_DEVELOPMENT ] },
          onClick: () => {
            setMenuUI(UIGroup.ARCHIVES);
          },
        },
        createErrorElement({ type: ErrorType[403], divisionList: [ DIVISION.ALL, DIVISION_DENY.RESEARCH_AND_DEVELOPMENT ]}),
        createErrorElement({ type: ErrorType[401] }),
      ];
    break;
    // ***************************************************************************************************
    case UIGroup.MEMBER_ARCHIVE:
      UIElements = 
      [
        { 
          type: UIElementType.HEADER, id: "member-header", content: "MEMBER ARCHIVE", 
          Access: { permission: PERMISSION.ALL, rankList:[ RANK.ALL ], divisionList:[ DIVISION.ALL ] }
        },
        { 
          type: UIElementType.SHEET_EMBED, 
          Access: { permission: PERMISSION.ALL, rankList:[ RANK.ALL ], divisionList:[ DIVISION.ALL ] }, // sheets are security filtered but this is backup
          spreadsheetId: Spreadsheet.UserData.id,
          sheetName: Spreadsheet.UserData.Sheet.Member_Archive.name,
        },
        { 
          type: UIElementType.BUTTON, id: "back", label: "BACK", description: "Back to previous menu", 
          Access: { permission: PERMISSION.ALL, rankList:[ RANK.ALL ], divisionList:[ DIVISION.ALL ] },
          onClick: () => {
            setMenuUI(UIGroup.HUB);
          },
        },
      ];
    break;
    // ***************************************************************************************************
    case UIGroup.GROUP_INFORMATION:
      UIElements = 
      [
        { 
          type: UIElementType.BUTTON, id: "webportal-info", label: "WEBPORTAL INFO", description: "Access information regarding the webportal and how its used", 
          Access: { permission: PERMISSION.ALL, rankList:[ RANK.ALL ], divisionList:[ DIVISION.ALL ] },
          onClick: () => { 
            setMenuUI(UIGroup.WEBPORTAL_INFO);
          },
        },
        { 
          type: UIElementType.BUTTON, id: "lore", label: "LORE", description: "Access group lore information", 
          Access: { permission: PERMISSION.NONE, rankList:[ RANK.ALL ], divisionList:[ DIVISION.ALL ] },
          onClick: () => { 
            setMenuUI(UIGroup.GROUP_LORE);
          },
        },
        { 
          type: UIElementType.BUTTON, id: "ranks", label: "RANKS", description: "Access group rank information", 
          Access: { permission: PERMISSION.NONE, rankList:[ RANK.ALL ], divisionList:[ DIVISION.ALL ] },
          onClick: () => { 
            setMenuUI();
          },
        },
        { 
          type: UIElementType.BUTTON, id: "back", label: "BACK", description: "Back to previous menu", 
          Access: { permission: PERMISSION.ALL, rankList:[ RANK.ALL ], divisionList:[ DIVISION.ALL ] },
          onClick: () => {
            setMenuUI(UIGroup.HUB);
          }, 
        },
      ];
    break;
    // ***************************************************************************************************
    case UIGroup.GROUP_LORE:
      UIElements = 
      [
        {
          type: UIElementType.CONTAINER, id:"lore-textBox", className:"textBox",
          Access: { permission: PERMISSION.NONE, rankList:[ RANK.ALL ], divisionList:[ DIVISION.ALL ] } ,
          content: [
            ...parseDocContentToUI_({ content: getDocContentById_(LORE_DOC_ID) }),
          ]
        },
        { 
          type: UIElementType.BUTTON, id: "back", label: "BACK", description: "Back to previous menu", 
          Access: { permission: PERMISSION.ALL, rankList:[ RANK.ALL ], divisionList:[ DIVISION.ALL ] },
          onClick: () => {
            setMenuUI(UIGroup.GROUP_INFORMATION);
          }, 
        },
        
      ];
    break;
    // ***************************************************************************************************
    case UIGroup.MAP:
      UIElements = 
      [
        // map embed from canva
        { 
          type: UIElementType.RAW_HTML, 
          id: "map", 
          html:`
            <div style="position: relative; width: 100%; height: 0; padding-top: 83.5137%;
              padding-bottom: 0; box-shadow: 0 2px 8px 0 rgba(63,69,81,0.16); margin-top: 1.6em; margin-bottom: 0.9em; overflow: hidden;
              border-radius: 8px; will-change: transform;">
              <iframe loading="lazy" style="position: absolute; width: 100%; height: 100%; top: 0; left: 0; border: none; padding: 0;margin: 0;"
                src="REMOVED FOR GITHUB" allowfullscreen="allowfullscreen" allow="fullscreen">
              </iframe>
            </div>
          `,
          Access: { permission: PERMISSION.USER, rankList:[ RANK.ALL ], divisionList:[ DIVISION.RESEARCH_AND_DEVELOPMENT ] },
        },
        { 
          type: UIElementType.BUTTON, id: "back", label: "BACK", description: "Back to previous menu", 
          Access: { permission: PERMISSION.USER, rankList:[ RANK.ALL ], divisionList:[ DIVISION.RESEARCH_AND_DEVELOPMENT ] },
          onClick: () => {
            setMenuUI(UIGroup.HUB);
          }, 
        },
        createErrorElement({ type: ErrorType[403], divisionList: [ DIVISION.ALL, DIVISION_DENY.RESEARCH_AND_DEVELOPMENT ]}),
        createErrorElement({ type: ErrorType[401] }),
      ];
    break;
    // ***************************************************************************************************
    case UIGroup.VERSION_HISTORY: 
      UIElements = VersionHistory;
    break;
    // ***************************************************************************************************
    default:
      throw new Error("ERROR 404: File not found, server cannot find the requested resource.");
    // ***************************************************************************************************
  }
  let FilteredUIElements = securityFilter_(UIElements);
  return FilteredUIElements;
}
