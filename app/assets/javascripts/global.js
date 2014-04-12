function paddWithExtraZeroIfNeeded(value) {
	var intValue = parseInt(value);
	if(isNaN(intValue)) {
		return value
	} else {
		return intValue > 9 ? "" + intValue : ("0" + intValue)
	}
}