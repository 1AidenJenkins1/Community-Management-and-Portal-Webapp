  /* GS-Main.gs */

// ====================================================================
// MISC
// ====================================================================
  /**
   * Checks if value is an instance of the target enum
   * - **Version:** *PRE-ALPHA 1.02.02 (12/2/2025)*
   * - **File:** GS-Main.gs
   * - **Section:** MISC
   * 
   * @property {object} Target
   * The enum to check if the value is an instance of.
   * - Must be a frozen object to conform to enum structure.
   * 
   * @property {any} value
   * The value to check if it is an instance of enum.
   * 
   * @return {boolean} 
   * If the value is an instance of the given enum
  */
  function instanceOfEnum(Target, value) {
    if (typeof Target !== `object`) {
      throw new Error(
        `\n` + 
        `(Main) Cannot check if value is instance of target enum` + `\n` +
        `Target enum is not of type object;` 
      );
    } 
    else if (!Object.isFrozen(Target)) {
      throw new Error(
        `\n` + 
        `(Main) Cannot check if value is instance of target enum` + `\n` +
        `Target does not conform to enum structure` + `\n` +
        `Target enum is not a frozen object;` 
      );
    }
    return Object.values(Target).includes(value);
  }

// ====================================================================
// CONVERSION
// ====================================================================

  /**
   * ⚠️**DEPRECATED**⚠️
   * - This will be removed in future versions 
   * 
   * Parses google doc markdown into text based markdown.
   * - **Version:** *PRE-ALPHA 1.02.02 (12/2/2025)*
   * - **File:** GS-Main.gs
   * - **Section:** CONVERSION
   * 
   * **Parse:**
   * bold -> \*\*(text)\*\*
   * 
   * @param {object} paragraph 
   * The paragraph to parse.
   * 
   * @return {string} 
   * The parsed text.
   * 
   * @deprecated
  */
  function parseDocTextMarkdown_(paragraph) {
    let text = paragraph.editAsText();
    let fullText = text.getText();
    let result = "";
    
    let boldActive = false;
    

    for (let i = 0; i < fullText.length; i++) {
      let char = fullText[i];
      let isBold = text.isBold(i);

      // Manage bold start/end
      if (isBold !== boldActive) {
        result += "**";
        boldActive = isBold;
      }

      // Append current char
      result += char;
    }

    if (boldActive) {
      result += "**"; // close any open bold at end
    }

    return result;
  }

  /**
   * ⚠️**DEPRECATED**⚠️
   * - This will be removed in future versions 
   * 
   * Gets time between two dates
   * - **Version:** *PRE-ALPHA 1.02.02 (12/2/2025)*
   * - **File:** GS-Main.gs
   * - **Section:** CONVERSION
   * 
   * 
   * @param {} lastDate 
   * The first date.
   * 
   * @param {} lastDate 
   * The second date.
   * 
   * @return {string} 
   * The time between.
   * 
   * @deprecated
  */
  function getTimeBetween(lastDate, currentDate) {
    let olderDate = lastDate < currentDate ? lastDate : currentDate;
    let newerDate = lastDate < currentDate ? currentDate : lastDate;

    let years = newerDate.getFullYear() - olderDate.getFullYear();
    let months = newerDate.getMonth() - olderDate.getMonth();
    let days = newerDate.getDate() - olderDate.getDate();

    if (days < 0) {
      months--;
      const daysInLastMonth = new Date(newerDate.getFullYear(), newerDate.getMonth(), 0).getDate();
      days += daysInLastMonth;
    }
    
    if (months < 0) {
      years--;
      months += 12;
    }
    
    return `${years} years, ${months} months, ${days} days`;
  }

  /**
   * ⚠️**DEPRECATED**⚠️
   * - This will be removed in future versions 
   * @deprecated
   */
  var userProperties = PropertiesService.getUserProperties();
  userProperties.deleteProperty("allow_boot")

  /**
   * Convert seconds to miliseconds
   * - **Version:** *PRE-ALPHA 1.02.02 (12/2/2025)*
   * - **File:** GS-Main.gs
   * - **Section:** CONVERSION
   * 
   * @param {number} seconds 
   * Seconds to convert to miliseconds.
   * 
   * @return {number} 
   * The value of seconds converted into miliseconds.
  */
  function sec_to_ms(seconds) {
    return seconds * 1000;
  }

  /**
   * Convert minutes to seconds
   * - **Version:** *PRE-ALPHA 1.02.02 (12/2/2025)*
   * - **File:** GS-Main.gs
   * - **Section:** CONVERSION
   * 
   * @param {number} minutes 
   * Minutes to convert to seconds.
   * 
   * @return {number} 
   * The value of minutes converted into seconds.
  */
  function min_to_sec(minutes) {
    return minutes * 60;
  }

// ====================================================================
// MAIN
// ====================================================================

  /**
   * Includes an html file.
   * 
   * - **Version:** *PRE-ALPHA 1.02.02 (12/2/2025)*
   * - **File:** GS-Main.gs
   * - **Section:** MAIN
   * 
   * @param {number} fileName 
   * The file's name passed without the ".html" extension.
   * 
   * @return {number} 
   * The content of the html file.
  */
  function include(fileName) {
    return HtmlService.createTemplateFromFile(fileName).evaluate().getContent();
  }

  /**
   * Displays the webapp to the user requesting it.
   * 
   * - **Version:** *PRE-ALPHA 1.02.02 (12/2/2025)*
   * - **File:** GS-Main.gs
   * - **Section:** MAIN
   * 
   * @param {object} eventObject 
   * Object that contains detailed information about the user's request.
   * 
   * @return {object} 
  */
  function doGet(eventObject) {
    // getDiscordService_().reset(); // for debugging login (clears all login info on site open)
    // var service = getDiscordService_();

    const faviconId = "1Bz2ny8qfrWlQhTaFbAaEM-Jg-r1XhziT"
    let html = HtmlService.createTemplateFromFile('HTML-Main')
      .evaluate()
      .setTitle('USPA Web Portal')
      .setFaviconUrl(`https://drive.google.com/uc?id=${faviconId}&export=download&format=png`);
    return html; 
  }

