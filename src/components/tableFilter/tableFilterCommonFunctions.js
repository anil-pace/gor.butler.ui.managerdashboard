export function handelTokenClick(field,value,state,data) {
        var selectedToken = data.tokenSelected;
        var defaultToken = data.defaultToken[field];
        if(selectedToken[field]) {
            if(state === "add") {                           // when user select a token adds in state and remove default selected token
                selectedToken[field].push(value);
                var removeDefaultFieldIndex = selectedToken[field].indexOf(defaultToken[0]);
                if (removeDefaultFieldIndex >= 0) {
                    selectedToken[field].splice( removeDefaultFieldIndex, 1 );
                }
            }
            else if(state === "addDefault") {              // when user add the default token
                selectedToken[field] = [];
                selectedToken[field].push(value);
            }
            else {
                var index = selectedToken[field].indexOf(value);  // when user removing token
                if (index >= 0) {
                    selectedToken[field].splice( index, 1 );
                }
                if (selectedToken[field] && !selectedToken[field].length) { // checks when none is selected, checks default option
                    selectedToken[field].push(defaultToken[0])
                }
            }
        }

        else {
            selectedToken[field] = [];
            selectedToken[field].push(value);
        }
        return selectedToken;
}


export function handleInputQuery(inputQuery,queryField,data) {
        var currentSearchState = data.searchQuery;
        currentSearchState[queryField] = inputQuery;
        return currentSearchState;
}