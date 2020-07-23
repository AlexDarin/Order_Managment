public with sharing class AccountController {

	@AuraEnabled(cacheable=true)
	public static String getAccountName(Id id) {
		return [SELECT Name FROM Account WHERE OwnerId = :id LIMIT 1].Name;
	}

	@AuraEnabled(cacheable=true)
	public static String getAccountNumber(Id id) {
		return String.valueOf([SELECT AccountNumber FROM Account WHERE OwnerId = :id][0].AccountNumber);
	}

	@AuraEnabled(cacheable=true)
	public static String getAccountId(Id id) {
		return String.valueOf([SELECT Id FROM Account WHERE OwnerId = :id][0].Id);
	}

	@AuraEnabled(cacheable=true)
	public static Boolean checkIsManager(Id id) {
		String accId = [SELECT OwnerId FROM Account WHERE OwnerId = :id][0].OwnerId;

		return ([SELECT isManager__c FROM User WHERE Id = :accId][0].isManager__c);
	}
}