public with sharing class ItemCartController {

	@AuraEnabled(cacheable=true)
	public static String getItemInCart(String[] arrOfIds) {

		Map<Id, Integer> items = new Map<Id, Integer>{};

		for (Product__c item : [SELECT Id, Name FROM Product__c WHERE Id IN :arrOfIds]) {

			Integer i = 0;

			for (String id : arrOfIds) 
				if (id.compareTo(item.Id) == 0) i++;
				
				items.put(item.Id, i);
		}

		return JSON.serialize(items);
	}
}