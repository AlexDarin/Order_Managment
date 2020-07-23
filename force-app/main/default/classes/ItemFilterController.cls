public class ItemFilterController {

	@AuraEnabled(cacheable=true)
	public static List<String> getFamilies() {

		Set<String> families = new Set<String>{};
		List<String> resultFam = new List<String>{};

		for (Product__c prod :[SELECT Family__c FROM Product__c]) 
			families.add(prod.Family__c);
		
		resultFam.addAll(families);
		resultFam.sort();
		return resultFam;
	}


	@AuraEnabled(cacheable=true)
	public static List<String> getTypes() {

		Set<String> types = new Set<String>{};
		List<String> resultTypes = new List<String>{};

		for (Product__c prod :[SELECT Type__c FROM Product__c])
			types.add(prod.Type__c);
		
		resultTypes.addAll(types);
		resultTypes.sort();
		return resultTypes;
	}


	@AuraEnabled(cacheable=true)
	public static List<Product__c> getResults(String[] familyFilters, String[] typeFilters, String searchKey) {

		if (familyFilters == null && typeFilters == null && searchKey == null)
			return ([SELECT Name, Description__c,Image__c FROM Product__c]);

		List<String> criteria = new List<String>{};
		
		String condition = '';
		String newSearchKey = '%' + searchKey + '%';

		if (familyFilters != null && familyFilters.size() != 0)
			criteria.add('Family__c IN :familyFilters');
		
		if (typeFilters != null && typeFilters.size() != 0)
			criteria.add('Type__c in :typeFilters');
		
		if (searchKey != null && searchKey.length() != 0) 
			criteria.add('Name LIKE :newSearchKey');
	
		if (criteria.size() > 0) 
			condition = 'WHERE ' + String.join(criteria, ' AND ');
		
		return Database.query('SELECT Name, Description__c,Image__c FROM Product__c ' + condition);
	}
}