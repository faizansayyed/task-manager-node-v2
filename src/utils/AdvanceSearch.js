const advanceSearch = () => {
  const searchParams = "break".trim().toLocaleLowerCase();
  const searchTerms = searchParams.trim().split(" ");

  const searchKeys = ["name", "gender"]; // keys to search on

  const filteredApp = tiles
    .filter((person) => {
      return searchTerms.some((term) => {
        return searchKeys.some((key) => {
          return String(person[key]).toLowerCase().includes(term.toLowerCase());
        });
      });
    })
    .sort((a, b) => {
      // Exact matches on the "name" field.
      if (a.name.toLowerCase() === searchParams.toLowerCase() && b.name.toLowerCase() === searchParams.toLowerCase()) {
        return 0;
      } else if (a.name.toLowerCase() === searchParams.toLowerCase()) {
        return -1;
      } else if (b.name.toLowerCase() === searchParams.toLowerCase()) {
        return 1;
      }

      // Matches on the "name" field that include the search terms.
      let aNameMatch = false;
      let bNameMatch = false;
      searchTerms.forEach((term) => {
        if (a.name.toLowerCase().includes(term.toLowerCase())) {
          aNameMatch = true;
        }
        if (b.name.toLowerCase().includes(term.toLowerCase())) {
          bNameMatch = true;
        }
      });

      if (aNameMatch && bNameMatch) {
        return 0;
      } else if (aNameMatch) {
        return -1;
      } else if (bNameMatch) {
        return 1;
      }

      // Exact matches on other fields.
      for (let i = 0; i < searchKeys.length; i++) {
        const key = searchKeys[i];
        if (a[key].toLowerCase() === searchParams.toLowerCase() && b[key].toLowerCase() === searchParams.toLowerCase()) {
          return 0;
        } else if (a[key].toLowerCase() === searchParams.toLowerCase()) {
          return -1;
        } else if (b[key].toLowerCase() === searchParams.toLowerCase()) {
          return 1;
        }
      }

      // Matches on other fields that include the search terms.
      let aMatchCount = 0;
      let bMatchCount = 0;
      searchTerms.forEach((term) => {
        searchKeys.forEach((key) => {
          if (a[key].toLowerCase().includes(term.toLowerCase())) {
            aMatchCount++;
          }
          if (b[key].toLowerCase().includes(term.toLowerCase())) {
            bMatchCount++;
          }
        });
      });
      if (aMatchCount === bMatchCount) {
        return 0;
      } else if (aMatchCount > bMatchCount) {
        return -1;
      } else {
        return 1;
      }
    });
};

export { advanceSearch };
