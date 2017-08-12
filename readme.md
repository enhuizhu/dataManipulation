### how to use it ?

```
const dataService = require('index');

const baseObj = { 
   "count":15,
   "amount_total":425,
   "num_items_total":3,
   "gender":{  
      "F":{  
         "count":5,
         "amount_total":225,
         "num_items_total":3
      },
      "M":{  
         "count":10,
         "amount_total":200,
         "num_items_total":5
      }
   },
   "currency":{  
      "EUR":{  
         "count":13,
         "amount_total":175,
         "num_items_total":6
      },
      "USD":{  
         "count":2,
         "amount_total":250,
         "num_items_total":6
      }
   }
};

const entry = {
   "gender": "M",
   "amount": 17.0,
   "num_items": 2,
   "currency": "EUR"
};


let updatedBaseObj = dataService.dataManipulation(baseObj, entry);

/*
updatedBaseObj will be:
{
	"count": 16,
	"amount_total": 442,
	"num_items_total": 5,
	"gender": {
		"F": {
			"count": 5,
			"amount_total": 225,
			"num_items_total": 3
		},
		"M": {
			"count": 11,
			"amount_total": 217,
			"num_items_total": 7
		}
	},
	"currency": {
		"EUR": {
			"count": 14,
			"amount_total": 192,
			"num_items_total": 8
		},
		"USD": {
			"count": 2,
			"amount_total": 250,
			"num_items_total": 6
		}
	}
}
*/
```

### unit test

```
npm test
```